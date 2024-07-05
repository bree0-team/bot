import {EmbedBuilder, GuildMember, InteractionReplyOptions, Role} from 'discord.js'
import {UnknownRoleError} from '../../errors/notfound.js'
import {GuildEmbed, EmbedField} from '../../helpers/embed.js'
import {BaseStructure} from '../../structures/base.js'
import {InteractionReplyComponent, PaginatorButtons} from '../../services/interaction.js'
import {RoleId} from '../../types/base.type.js'
import {PageData} from '../../types/data.type.js'
import {MEMBERS_INDEX, MEMBERS_NEXT, MEMBERS_PREV} from './enums/CustomIds.enum.js'
import {MembersEveryoneError} from './errors/members.error.js'
import {MembersData} from './types/data.type.js'

export class Members extends BaseStructure {
    getField = (data: GuildMember[]): EmbedField => EmbedField('\u200B', data.join('\n'), true)
    getFields = (members: GuildMember[], size: number): EmbedField[] =>
        this.chunk(members, size).map(item => this.getField(item))
    async run() {
        const role = this.getRole('role')
        if (role.id === this.guildId) throw new MembersEveryoneError(this.i)
        if (!(role instanceof Role)) throw new UnknownRoleError(this.i)
        return this.page(role.id)
    }
    async page(roleId: RoleId, page: number = 0) {
        if (this.guild.members.cache.size !== this.guild.memberCount) await this.guild.members.fetch()
        const role = this.guild.roles.resolve(roleId)
        const members = role.members.map(i => i)
        const membersString = members.join('\n')
        let embeds: EmbedBuilder[];
        const embed = GuildEmbed(this.guildId)
            .setTitle(this.t('members:title', {role: role.name}))
            .setFooter({text: this.t('members:size', {size: role.members.size})})
        if (role.color) embed.setColor(role.color)
        if (membersString.length > 6000) embeds = this.chunk(this.getFields(members, 20), 6)
            .map(item => new EmbedBuilder({...embed.data, fields: item}))
        else if (membersString.length > 1024) embeds = [embed.addFields(this.getFields(members, 15))];
        else {
            if (membersString.length) {
                const membersList = this.chunk(members, 10);
                if (membersList.length > 1) embeds = [embed.addFields(this.getFields(members, 10))];
                else embeds = [embed.setDescription(membersString)];
            } else {
                embeds = [embed.setDescription(this.t('no'))];
            }
        }
        /*embeds = this.chunk(this.getFields(members, 3), 1)
            .map(item => new EmbedBuilder({...embed.data, fields: item}))*/
        const components: InteractionReplyComponent[] = []
        if (embeds.length > 1) components.push(PaginatorButtons({
            page, size: embeds.length,
            prevId: MEMBERS_PREV, indexId: MEMBERS_INDEX, nextId: MEMBERS_NEXT
        }))
        const replyData: InteractionReplyOptions = {embeds: [embeds[page]], components}
        const data: PageData & MembersData = {page, size: embeds.length, roleId}
        return this.reply({replyData, data})
    }
}