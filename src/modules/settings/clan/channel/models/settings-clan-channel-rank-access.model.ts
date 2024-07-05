import {AllowNull, Column, DataType, Default, Table} from 'sequelize-typescript'
import {GuildId} from '../../../../../types/base.type.js'
import {BaseGuildModel} from '../../../../../models/base-guild.model.js'
import {defaultCaptain, defaultChief, defaultMember, defaultOwner, defaultRecruiter} from '../constants/defaults.js'
import {AllChannelAccess} from '../types/rights.type.js'

interface SettingsClanChannelRankAccessAttrs {
    guildId: GuildId
    owner: string
    chief: string
    captain: string
    recruiter: string
    member: string
}

interface SettingsClanChannelRankAccessCreationAttrs extends Pick<SettingsClanChannelRankAccessAttrs, 'guildId'> {
    owner?: AllChannelAccess[]
    chief?: AllChannelAccess[]
    captain?: AllChannelAccess[]
    recruiter?: AllChannelAccess[]
    member?: AllChannelAccess[]
}

@Table({tableName: 'settings_clan_channel_rank_access'})
export class SettingsClanChannelRankAccessModel
    extends BaseGuildModel<SettingsClanChannelRankAccessAttrs, SettingsClanChannelRankAccessCreationAttrs> {
    @AllowNull(false)
    @Default(defaultOwner)
    @Column(DataType.TEXT)
    get owner(): AllChannelAccess[] {
        const value = this.getDataValue('owner')
        if (value) return JSON.parse(value)
        return defaultOwner
    }
    set owner(value: AllChannelAccess[]) {
        this.setDataValue('owner', JSON.stringify(value))
    }

    @AllowNull(false)
    @Default(defaultChief)
    @Column(DataType.TEXT)
    get chief(): AllChannelAccess[] {
        const value = this.getDataValue('chief')
        if (value) return JSON.parse(value)
        return defaultChief
    }
    set chief(value: AllChannelAccess[]) {
        this.setDataValue('chief', JSON.stringify(value))
    }

    @AllowNull(false)
    @Default(defaultCaptain)
    @Column(DataType.TEXT)
    get captain(): AllChannelAccess[] {
        const value = this.getDataValue('captain')
        if (value) return JSON.parse(value)
        return defaultCaptain
    }
    set captain(value: AllChannelAccess[]) {
        this.setDataValue('captain', JSON.stringify(value))
    }

    @AllowNull(false)
    @Default(defaultRecruiter)
    @Column(DataType.TEXT)
    get recruiter(): AllChannelAccess[] {
        const value = this.getDataValue('recruiter')
        if (value) return JSON.parse(value)
        return defaultRecruiter
    }
    set recruiter(value: AllChannelAccess[]) {
        this.setDataValue('recruiter', JSON.stringify(value))
    }

    @AllowNull(false)
    @Default(defaultMember)
    @Column(DataType.TEXT)
    get member(): AllChannelAccess[] {
        const value = this.getDataValue('member')
        if (value) return JSON.parse(value)
        return defaultMember
    }
    set member(value: AllChannelAccess[]) {
        this.setDataValue('member', JSON.stringify(value))
    }
}