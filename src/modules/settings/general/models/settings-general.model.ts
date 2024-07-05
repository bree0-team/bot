import {Locale} from 'discord.js'
import {AllowNull, Column, Default, Table} from 'sequelize-typescript'
import {GuildId} from '../../../../types/base.type.js'
import {BaseGuildModel} from '../../../../models/base-guild.model.js'
import {defaultEmbedColor, defaultTimezone} from '../constants/defaults.js'

interface SettingsGeneralAttrs {
    guildId: GuildId
    server_language: Locale
    embed_color: number
    timezone: string
}

interface SettingsGeneralCreationAttrs extends Pick<SettingsGeneralAttrs, 'guildId'> {}

@Table({tableName: 'settings_general'})
export class SettingsGeneralModel extends BaseGuildModel<SettingsGeneralAttrs, SettingsGeneralCreationAttrs> {
    @Column
    server_language: Locale

    @AllowNull(false)
    @Default(defaultEmbedColor)
    @Column
    embed_color: number

    @AllowNull(false)
    @Default(defaultTimezone)
    @Column
    timezone: string
}