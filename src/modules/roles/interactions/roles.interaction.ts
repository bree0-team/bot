import _ from 'lodash'
import {PrivateHandler} from '../../../handlers/interaction.js'
import {SelectManyValuesPageOptions} from '../../../handlers/paginator.js'
import {RoleId} from '../../../types/base.type.js'
import {ROLES_SELECT} from '../enums/CustomIds.enum.js'
import {Roles} from '../Roles.js'
import {EditData} from '../types/data.type.js'

class RolesInteraction extends PrivateHandler {
    protected async runValues({interaction, values, data}: SelectManyValuesPageOptions<RoleId, EditData>) {
        const {userId, roles, page} = data
        const {members} = interaction.guild
        const user = await members.fetch(userId)
        const memberRoles = user.roles.cache.map(i => i.id)
        const addRoles = (_.difference(values, memberRoles) as RoleId[])
            .map(i => interaction.guild.roles.resolve(i))
            .filter(i => i?.editable)
        const preRemoveRoles = _.difference(roles, values) as RoleId[]
        const removeRoles = (_.intersection(preRemoveRoles, memberRoles) as RoleId[])
            .map(i => interaction.guild.roles.resolve(i))
            .filter(i => i?.editable)
        if (addRoles) await user.roles.add(addRoles, interaction.t('roles:add', {user: user.displayName, id: user.id}))
        if (removeRoles) await user.roles.remove(removeRoles, interaction.t('roles:remove', {
            user: user.displayName, id: user.id
        }))
        return new Roles(interaction).run(userId, page)
    }
}

export default new RolesInteraction(ROLES_SELECT)