import {
    bold,
    GuildMember,
    inlineCode,
    InteractionReplyOptions,
    Role,
    roleMention,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    time
} from 'discord.js'
import {DiscordLimits} from '../../enums/DiscordLimits.enum.js'
import {UnknownMemberError} from '../../errors/notfound.js'
import {EmbedField, GuildEmbed} from '../../helpers/embed.js'
import {BaseStructure} from '../../structures/base.js'
import {ActionStringSelectRow, InteractionReplyComponent, StringSelectRowBuilder} from '../../services/interaction.js'
import {RoleId, UserId} from '../../types/base.type.js'
import {PageData} from '../../types/data.type.js'
import {PermissionUtils} from '../../utils/permission.js'
import SettingsRolesManager from '../settings/roles/managers/settings-roles.manager.js'
import {ROLES_INDEX, ROLES_NEXT, ROLES_PREV, ROLES_SELECT} from './enums/CustomIds.enum.js'
import {RolesNoAccessError} from './errors/roles.error.js'
import {EditData} from './types/data.type.js'

const limit = 25

export class Roles extends BaseStructure {
    private rolesRow(roleIds: Role[], userRoles: RoleId[]): ActionStringSelectRow {
        const select = new StringSelectMenuBuilder({
            customId: ROLES_SELECT,
            placeholder: this.t('select:roles'),
            minValues: DiscordLimits.SELECT_MIN_ITEM_CHOSEN,
            maxValues: roleIds.length
        }).setOptions(roleIds.map(i => new StringSelectMenuOptionBuilder({
            label: i.name,
            value: i.id,
            default: userRoles.includes(i.id)
        })))
        return StringSelectRowBuilder(select)
    }
    async run(userId: UserId, page: number = 0) {
        const guildMember = await this.fetchGuildMember(userId)
        if (!guildMember) throw new UnknownMemberError(this.i)
        const member = this.i.member as GuildMember
        let rolesAccess: Role[]
        if (PermissionUtils.isAdmin(member)) rolesAccess = this.guild.roles.cache
            .filter(i => i.id !== this.guildId)
            .sort((a, b) => b.position - a.position)
            .map(i => i)
        else {
            const editManager = SettingsRolesManager
                .findAllIn(this.guildId, member.roles.cache.map(i => i.id))
            if (!editManager.size) throw new RolesNoAccessError(this.i)
            rolesAccess = editManager.map(i => i.roles)
                .reduce((acc, val) => acc.concat(val), [])
                .filter((val, index, arr) => arr.indexOf(val) === index)
                .map(i => this.getGuildRole(i))
                .filter(i => i)
        }
        const guildMemberRoles = guildMember.roles.cache.map(i => i.id)
        const embed = GuildEmbed(this.guildId, {
            author: {name: guildMember.displayName, iconURL: guildMember.displayAvatarURL()},
            description: [
                bold('ID: ') + inlineCode(userId),
                '',
                bold(this.t('roles') + ':'),
                guildMemberRoles.filter(i => i !== this.guildId)
                    .map(i => roleMention(i)).join('\n') ?? this.t('no')
            ].join('\n'),
        }).setFields(
            EmbedField(
                this.t('created_at'),
                time(guildMember.user.createdAt, 'f'),
                true
            ),
            EmbedField(
                this.t('joined_at'),
                time(guildMember.joinedAt, 'f'),
                true
            )
        )
        const components: InteractionReplyComponent[] = []
        const data: EditData & PageData = {
            userId, roles: rolesAccess.map(i => i.id), page, size: rolesAccess.length
        }
        if (rolesAccess.length > limit) {
            const roles = this.chunk(rolesAccess, limit)
            Object.assign(data, {roles: roles[page].map(i => i.id), size: roles.length})
            components.push(
                this.rolesRow(roles[page], guildMemberRoles),
                this.paginator({
                    page, size: roles.length,
                    prevId: ROLES_PREV, indexId: ROLES_INDEX, nextId: ROLES_NEXT
                })
            )
        } else components.push(this.rolesRow(rolesAccess, guildMemberRoles))
        const replyData: InteractionReplyOptions = {embeds: [embed], components}
        return this.reply({replyData, data})
    }
}