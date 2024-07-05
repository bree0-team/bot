import {RepliableInteraction} from 'discord.js'
import {BannerData, BannerType} from '../types/banner.type.js'

export function description(interaction: RepliableInteraction, data: BannerData): string {
    const {type} = data
    switch (type) {
        case BannerType.Channels: return data.channelTypes.map(i =>
            interaction.t('settings:banner:channels:types:' + i)).join(', ')
        case BannerType.DateTime: return interaction.t('settings:banner:date_time:styles:' + data.style)
        case BannerType.Members: return data.memberTypes.map(i =>
            interaction.t('settings:banner:members:types:' + i)).join(', ')
        case BannerType.MembersInRole: return data.statuses.map(i =>
            interaction.t('statuses:' + i)).join(', ')
        case BannerType.MembersWithStatus: return data.statuses.map(i =>
            interaction.t('statuses:' + i)).join(', ')
        case BannerType.Roles: return data.roleTypes.map(i =>
            interaction.t('settings:banner:roles:types:' + i)).join(', ')
        case BannerType.Voice: return data.channels.map(i =>
            interaction.guild.channels.resolve(i).name).slice(0, 3).join(', ')
    }
}