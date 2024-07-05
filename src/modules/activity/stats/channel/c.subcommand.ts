import {ChannelType} from 'discord.js'
import {ChannelOptionBuilder, Subcommand} from '../../../../builders/subcommands.js'
import {STATS_COMMAND, StatsSubcommands} from '../enums/StatsCommands.enum.js'
import {Channel} from './Channel.js'

export default new Subcommand(STATS_COMMAND, Channel, {
    subcommand: StatsSubcommands.Channel
}, [
    ChannelOptionBuilder('channel', {
        required: true,
        channelTypes: [
            ChannelType.GuildAnnouncement,
            ChannelType.GuildVoice,
            ChannelType.GuildText,
            ChannelType.GuildStageVoice
        ]
    })
])