import {AllowNull, Column, DataType, Default, Table} from 'sequelize-typescript'
import {ChannelId, GuildId, MessageId} from '../../../../../types/base.type.js'
import {BaseGuildModel} from '../../../../../models/base-guild.model.js'
import {defaultEnabled, defaultLimit} from '../constants/defaults.js'
import {AllChannelRights} from '../types/rights.type.js'

interface SettingsClanChannelAttrs {
    guildId: GuildId
    enabled: string
    categoryId: ChannelId
    channelId: ChannelId
    messageId: MessageId
    limit: number
}

interface SettingsClanChannelCreationAttrs extends Pick<SettingsClanChannelAttrs, 'guildId'> {
    enabled?: AllChannelRights[]
}

@Table({tableName: 'settings_clan_channel'})
export class SettingsClanChannelModel
    extends BaseGuildModel<SettingsClanChannelAttrs, SettingsClanChannelCreationAttrs> {
    @AllowNull(false)
    @Default(defaultEnabled)
    @Column(DataType.TEXT)
    get enabled(): AllChannelRights[] {
        const value = this.getDataValue('enabled')
        if (value) return JSON.parse(value)
        return defaultEnabled
    }
    set enabled(value: AllChannelRights[]) {
        this.setDataValue('enabled', JSON.stringify(value))
    }

    @Column
    categoryId: ChannelId

    @Column
    channelId: ChannelId

    @Column
    messageId: MessageId

    @AllowNull(false)
    @Default(defaultLimit)
    @Column
    limit: number
}