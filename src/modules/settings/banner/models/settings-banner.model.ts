import {AllowNull, Column, Default, Table} from 'sequelize-typescript'
import {BaseGuildModel} from '../../../../models/base-guild.model.js'
import {GuildId} from '../../../../types/base.type.js'
import {defaultEnabled} from '../constants/defaults.js'

interface SettingsBannerAttrs {
    guildId: GuildId
    url: string
    enabled: boolean
}

interface SettingsBannerCreationAttrs extends Pick<SettingsBannerAttrs, 'guildId'> {}

@Table({tableName: 'settings_banner'})
export class SettingsBannerModel extends BaseGuildModel<SettingsBannerAttrs, SettingsBannerCreationAttrs> {
    @Column
    url: string

    @AllowNull(false)
    @Default(defaultEnabled)
    @Column
    enabled: boolean
}