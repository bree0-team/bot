import _ from 'lodash'
import {AllowNull, Column, DataType, Default, IsIn, Table} from 'sequelize-typescript'
import {GuildId, RoleId} from '../../../../../types/base.type.js'
import {BaseGuildModel} from '../../../../../models/base-guild.model.js'
import {WhoManage} from '../enums/WhoManage.enum.js'
import {defaultRoles, defaultWho} from '../constants/defaults.js'

interface SettingsClanCreateAttrs {
    guildId: GuildId
    who: WhoManage
    roles: string
}

interface SettingsClanCreateCreationAttrs extends Pick<SettingsClanCreateAttrs, 'guildId'> {
    roles?: RoleId[]
}

const whoValues: WhoManage[] = _.values(WhoManage)

@Table({tableName: 'settings_clan_manage'})
export class SettingsClanManageModel extends BaseGuildModel<SettingsClanCreateAttrs, SettingsClanCreateCreationAttrs> {
    @AllowNull(false)
    @Default(defaultWho)
    @IsIn([whoValues])
    @Column(DataType.ENUM(...whoValues))
    who: WhoManage

    @AllowNull(false)
    @Default(defaultRoles)
    @Column(DataType.TEXT)
    get roles(): RoleId[] {
        const value = this.getDataValue('roles')
        if (value) return JSON.parse(value)
        return defaultRoles
    }
    set roles(value: RoleId[]) {
        this.setDataValue('roles', JSON.stringify(value))
    }
}