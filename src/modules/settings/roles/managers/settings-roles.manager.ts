import {Collection} from 'discord.js'
import {ModelManager} from '../../../../managers/model.js'
import {GuildId, RoleId} from '../../../../types/base.type.js'
import {defaultRoles} from '../constants/defaults.js'
import {CreateOrUpdateSettingsRolesDto} from '../dto/create-or-update-settings-roles.dto.js'
import {SettingsRolesModel} from '../models/settings-roles.model.js'

const collection = new Collection<number, SettingsRolesModel>()

class SettingsRolesManager extends ModelManager<number, SettingsRolesModel> {
    async createOrUpdate(
        guildId: GuildId,
        roleId: RoleId,
        dto: CreateOrUpdateSettingsRolesDto
    ): Promise<SettingsRolesModel> {
        // todo: ValidationErrorItem
        const defaultDto: CreateOrUpdateSettingsRolesDto = {
            roles: defaultRoles
        }
        return super.$createOrUpdate(this.findOne(guildId, roleId),
            {guildId, roleId, ...defaultDto, ...dto},
            {guildId, roleId, ...dto})
    }
    findOne = (guildId: GuildId, roleId: RoleId): SettingsRolesModel | undefined => this.collection
        .find(i => i.guildId === guildId && i.roleId === roleId)
    findAllIn = (guildId: GuildId, roleIds: RoleId[]): Collection<number, SettingsRolesModel> => this.collection
        .filter(i => i.guildId === guildId && roleIds.includes(i.roleId))
    remove(guildId: GuildId, roleId: RoleId): Promise<boolean> {
        const modelId = this.resolveId(this.findOne(guildId, roleId))
        return super.$remove(modelId, {guildId, roleId})
    }
}

export default new SettingsRolesManager(collection, SettingsRolesModel)