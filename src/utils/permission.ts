import {GuildMember, PermissionFlagsBits} from 'discord.js'

export type PermissionFlagsBitsKeys = keyof typeof PermissionFlagsBits
type PermissionKeys = {
    [p in PermissionFlagsBitsKeys]: p
}

export class PermissionUtils {
    static isAdmin = (member: GuildMember) => member.permissions.has(PermissionFlagsBits.Administrator)
}

export const PermissionKeys: PermissionKeys = Object.keys(PermissionFlagsBits)
    .map(permission => ({[permission]: permission}))
    .reduce((result: PermissionKeys, currentObject: PermissionKeys) =>
        ({ ...result, ...currentObject }), {}) as PermissionKeys