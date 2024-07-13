import {fetchRecommendedShardCount, ShardingManager} from 'discord.js'
import {config} from 'dotenv'
import _ from 'lodash'
import {createRequire} from 'node:module'
import {Logger, Logs} from './services/logger.js'

config()
const require = createRequire(import.meta.url)
const Config = require('../config/config.json')

async function start() {
    Logger.info(Logs.info.appStarted);

    let shardList: number[] = []
    let totalShards: number = 0

    try {
        const recommendedShardCount = await fetchRecommendedShardCount(process.env.DISCORD_TOKEN,
            {guildsPerShard: Config.sharding.serversPerShard}
        )
        shardList = _.range(0, recommendedShardCount) as number[]
        totalShards = recommendedShardCount
    } catch (error) {
        return Logger.error(Logs.error.retrieveShards, error)
    }

    if (shardList.length === 0) return Logger.warn(Logs.warn.managerNoShards)

    const manager = new ShardingManager('dist/bot.js', {
        token: process.env.DISCORD_TOKEN,
        respawn: true,
        totalShards,
        shardList,
    })

    manager.on('shardCreate', shard => {
        Logger.setShardId(shard.id)
        Logger.info(
            Logs.info.managerLaunchedShard
                .replaceAll('{SHARD_ID}', shard.id.toString()),
        )
    })

    try {
        Logger.info(
            Logs.info.managerSpawningShards
                .replaceAll('{SHARD_COUNT}', shardList.length.toLocaleString())
                .replaceAll('{SHARD_LIST}', shardList.join(', '))
        )
        await manager.spawn({
            amount: totalShards,
            delay: Config.sharding.spawnDelay * 1000,
            timeout: Config.sharding.spawnTimeout * 1000,
        })
        Logger.info(Logs.info.managerAllShardsSpawned)
    } catch (error) {
        return Logger.error(Logs.error.managerSpawningShards, error)
    }
}

process.on('unhandledRejection', (reason, _promise) =>
    Logger.error(Logs.error.unhandledRejection, reason)
)

start().catch(error => console.error(error)/*Logger.error(Logs.error.unspecified, error)*/)