import {AllowNull, Column, Default, Table} from 'sequelize-typescript'
import {BaseGuildModel} from '../../../../models/base-guild.model.js'
import {GuildId} from '../../../../types/base.type.js'
import {defaultValue} from '../constants/defaults.js'

interface SettingsInteractionAttrs {
    guildId: GuildId
    value: number
}

interface SettingsInteractionCreationAttrs extends Pick<SettingsInteractionAttrs, 'guildId'> {}

@Table({tableName: 'settings_interaction'})
export class SettingsInteractionModel
    extends BaseGuildModel<SettingsInteractionAttrs, SettingsInteractionCreationAttrs> {
    @AllowNull(false)
    @Default(defaultValue)
    @Column
    value: number
}