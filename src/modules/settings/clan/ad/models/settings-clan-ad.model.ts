import {AllowNull, Column, Default, Table} from 'sequelize-typescript'
import {ChannelId, GuildId} from '../../../../../types/base.type.js'
import {BaseGuildModel} from '../../../../../models/base-guild.model.js'
import {defaultAd, defaultCooldown} from '../constants/defaults.js'

interface SettingsClanAdAttrs {
    guildId: GuildId
    value: boolean
    channelId: ChannelId
    cooldown: number
}

interface SettingsClanAdCreationAttrs extends Pick<SettingsClanAdAttrs, 'guildId'> {}

@Table({tableName: 'settings_clan_ad'})
export class SettingsClanAdModel extends BaseGuildModel<SettingsClanAdAttrs, SettingsClanAdCreationAttrs> {
    @AllowNull(false)
    @Default(defaultAd)
    @Column
    value: boolean

    @Column
    channelId: ChannelId

    @AllowNull(false)
    @Default(defaultCooldown)
    @Column
    cooldown: number
}