import {APIInteractionGuildMember, GuildMember, PermissionFlagsBits} from 'discord.js'
import _ from 'lodash'
import {RoleId} from '../../../types/base.type.js'

export function createRoleAccess(member: GuildMember, roles: RoleId[]): boolean {
    const memberRoles = member.roles.cache.map(role => role.id)
    const admin = member.permissions.has(PermissionFlagsBits.Administrator)
    const accessArray = _.intersection(memberRoles, roles) as RoleId[]
    return admin || !!accessArray.length
}