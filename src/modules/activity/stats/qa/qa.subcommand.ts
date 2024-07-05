import {ChannelType} from 'discord.js'
import {ChannelOptionBuilder, Subcommand, UserOptionBuilder} from '../../../../builders/subcommands.js'
import {STATS_COMMAND, StatsSubcommands} from '../enums/StatsCommands.enum.js'
import {User} from './User.js'

export default new Subcommand(STATS_COMMAND, User, {
    subcommand: StatsSubcommands.Qa
}, [
    ChannelOptionBuilder('channel', {required: true, channelTypes: [ChannelType.GuildText]}),
    UserOptionBuilder('user')
])