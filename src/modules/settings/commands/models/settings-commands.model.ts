import _ from 'lodash'
import {AllowNull, Column, DataType, Default, IsIn, Model, Table} from 'sequelize-typescript'
import {CommandName} from '../../../../builders/slash.js'
import {GuildId} from '../../../../types/base.type.js'
import {defaultCooldown, defaultEphemeral, defaultReply, defaultUsage} from '../constants/defaults.js'
import {CooldownType} from '../enums/CooldownType.enum.js'

interface SettingsCommandsAttrs {
    guildId: GuildId
    name: CommandName
    ephemeral: boolean // скрытые сообщения
    cooldownType: CooldownType // тип кулдауна
    cooldown: number // кулдаун
    usage: boolean // показывать использование команды
    reply: boolean // отвечать ли на сообщение
}

interface SettingsCommandsCreationAttrs extends Pick<SettingsCommandsAttrs, 'guildId'> {}

const cooldownTypeValues: CooldownType[] = _.values(CooldownType)

@Table({tableName: 'settings_commands'})
export class SettingsCommandsModel extends Model<SettingsCommandsAttrs, SettingsCommandsCreationAttrs> {
    @AllowNull(false)
    @Column
    guildId: GuildId

    @AllowNull(false)
    @Column
    name: CommandName

    @AllowNull(false)
    @Default(defaultEphemeral)
    @Column
    ephemeral: boolean

    @IsIn([cooldownTypeValues])
    @Column(DataType.ENUM(...cooldownTypeValues))
    cooldownType: CooldownType

    @AllowNull(false)
    @Default(defaultCooldown)
    @Column
    cooldown: number

    @AllowNull(false)
    @Default(defaultUsage)
    @Column
    usage: boolean

    @AllowNull(false)
    @Default(defaultReply)
    @Column
    reply: boolean
}