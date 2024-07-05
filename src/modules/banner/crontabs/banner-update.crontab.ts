import {Client, GuildFeature} from 'discord.js'
import {CrontabBuilder} from '../../../builders/crontab.js'
import SettingsBannerManager from '../../settings/banner/managers/settings-banner.manager.js'
import {BannerImage} from '../BannerImage.js'

class BannerUpdateCrontab extends CrontabBuilder {
    run(client: Client<true>) {
        if (!client.isReady()) return;
        const managers = SettingsBannerManager.findAll()
        managers.filter(i => i.enabled)
            .map(async i => {
                const {guildId} = i
                const guild = client.guilds.resolve(guildId)
                if (!guild) return SettingsBannerManager.createOrUpdate(guildId, {enabled: false})
                if (!guild.available) return;
                if (!guild.features.includes(GuildFeature.Banner))
                    return SettingsBannerManager.createOrUpdate(guildId, {enabled: false})
                const buffer = await new BannerImage(guild).run(true)
                return guild.setBanner(buffer)
            })
    }
}

export default new BannerUpdateCrontab('*/10 * * * *')