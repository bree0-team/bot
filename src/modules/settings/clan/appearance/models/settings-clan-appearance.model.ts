import {AllowNull, Column, Default, Table} from 'sequelize-typescript'
import {GuildId} from '../../../../../types/base.type.js'
import {BaseGuildModel} from '../../../../../models/base-guild.model.js'
import {defaultAvatar, defaultBanner, defaultColor, defaultDescription} from '../constants/defaults.js'

interface SettingsClanAppearanceAttrs {
    guildId: GuildId
    color: boolean
    description: boolean
    avatar: boolean
    banner: boolean
}

interface SettingsClanAppearanceCreationAttrs extends Pick<SettingsClanAppearanceAttrs, 'guildId'> {}

@Table({tableName: 'settings_clan_appearance'})
export class SettingsClanAppearanceModel
    extends BaseGuildModel<SettingsClanAppearanceAttrs, SettingsClanAppearanceCreationAttrs> {
    @AllowNull(false)
    @Default(defaultColor)
    @Column
    color: boolean

    @AllowNull(false)
    @Default(defaultDescription)
    @Column
    description: boolean

    @AllowNull(false)
    @Default(defaultAvatar)
    @Column
    avatar: boolean

    @AllowNull(false)
    @Default(defaultBanner)
    @Column
    banner: boolean
}