import {AllowNull, Column, DataType, Default, Table} from 'sequelize-typescript'
import {GuildId} from '../../../../../types/base.type.js'
import {BaseGuildModel} from '../../../../../models/base-guild.model.js'
import {defaultCaptain, defaultChief, defaultMember, defaultOwner, defaultRecruiter} from '../constants/defaults.js'
import {AllCommandsAccess} from '../types/access.type.js'

interface SettingsClanCommandRankAccessAttrs {
    guildId: GuildId
    owner: string
    chief: string
    captain: string
    recruiter: string
    member: string
}

interface SettingsClanCommandRankAccessCreationAttrs extends Pick<SettingsClanCommandRankAccessAttrs, 'guildId'> {
    owner?: AllCommandsAccess[]
    chief?: AllCommandsAccess[]
    captain?: AllCommandsAccess[]
    recruiter?: AllCommandsAccess[]
    member?: AllCommandsAccess[]
}

@Table({tableName: 'settings_clan_command_rank_access'})
export class SettingsClanCommandRankAccessModel
    extends BaseGuildModel<SettingsClanCommandRankAccessAttrs, SettingsClanCommandRankAccessCreationAttrs> {
    @AllowNull(false)
    @Default(defaultOwner)
    @Column(DataType.TEXT)
    get owner(): AllCommandsAccess[] {
        const value = this.getDataValue('owner')
        if (value) return JSON.parse(value)
        return defaultOwner
    }
    set owner(value: AllCommandsAccess[]) {
        this.setDataValue('owner', JSON.stringify(value))
    }

    @AllowNull(false)
    @Default(defaultChief)
    @Column(DataType.TEXT)
    get chief(): AllCommandsAccess[] {
        const value = this.getDataValue('chief')
        if (value) return JSON.parse(value)
        return defaultChief
    }
    set chief(value: AllCommandsAccess[]) {
        this.setDataValue('chief', JSON.stringify(value))
    }

    @AllowNull(false)
    @Default(defaultCaptain)
    @Column(DataType.TEXT)
    get captain(): AllCommandsAccess[] {
        const value = this.getDataValue('captain')
        if (value) return JSON.parse(value)
        return defaultCaptain
    }
    set captain(value: AllCommandsAccess[]) {
        this.setDataValue('captain', JSON.stringify(value))
    }

    @AllowNull(false)
    @Default(defaultRecruiter)
    @Column(DataType.TEXT)
    get recruiter(): AllCommandsAccess[] {
        const value = this.getDataValue('recruiter')
        if (value) return JSON.parse(value)
        return defaultRecruiter
    }
    set recruiter(value: AllCommandsAccess[]) {
        this.setDataValue('recruiter', JSON.stringify(value))
    }

    @AllowNull(false)
    @Default(defaultMember)
    @Column(DataType.TEXT)
    get member(): AllCommandsAccess[] {
        const value = this.getDataValue('member')
        if (value) return JSON.parse(value)
        return defaultMember
    }
    set member(value: AllCommandsAccess[]) {
        this.setDataValue('member', JSON.stringify(value))
    }
}