import {EmbedBuilder, GuildMember, User} from 'discord.js'
import _ from 'lodash'
import {GuildEmbed} from '../../../helpers/embed.js'
import {BaseStructure} from '../../../structures/base.js'
import {MessageId, RoleId} from '../../../types/base.type.js'
import {PermissionUtils} from '../../../utils/permission.js'
import SettingsQaManager from '../../settings/qa/managers/settings-qa.manager.js'
import {SettingsQaModel} from '../../settings/qa/models/settings-qa.model.js'
import {QaStatus} from '../enums/QaStatus.enum.js'
import {QaAlreadyResolvedError, QaNotInThisChannelError, QaYouDontHaveRightsError} from '../errors/qa.error.js'
import QaManager from '../managers/qa.manager.js'

export abstract class BaseQa extends BaseStructure {
    protected staffAccess(doThrow: true): never | SettingsQaModel;
    protected staffAccess(doThrow: false): boolean | SettingsQaModel;
    protected staffAccess(doThrow: boolean): never | boolean | SettingsQaModel {
        const qaManager = SettingsQaManager.findOne(this.guildId, this.channelId)
        if (!qaManager) {
            if (doThrow) throw new QaNotInThisChannelError(this.i)
            else return false
        }
        const member = this.i.member as GuildMember
        const roleIds = member.roles.cache.map(role => role.id)
        const staffRoles = _.intersection(qaManager.roles, roleIds) as RoleId[]
        if (!(!!staffRoles.length || PermissionUtils.isAdmin(member))) {
            if (doThrow) throw new QaYouDontHaveRightsError(this.i)
            else return false
        }
        return qaManager
    }
    insertData = (messageId: MessageId, status: QaStatus, description?: string, title?: string) => QaManager
        .create(this.guildId, this.channelId, messageId, this.userId, {status, title, description})
    protected embed = (authorName: string, description: string): EmbedBuilder =>
        GuildEmbed(this.guildId, {author: {name: authorName}, description})
    protected async finalEmbed(messageId: MessageId): Promise<never | EmbedBuilder> {
        const qaSettingsManager = this.staffAccess(true)
        const qaManager = QaManager.findAllByMessageId(messageId)
        if (qaManager.find(i => i.status === QaStatus.RESOLVE)) throw new QaAlreadyResolvedError(this.i)
        const qaWriter = qaManager.find(i => i.status === QaStatus.WRITE)
        const writer = await this.fetchClientUser(qaWriter.userId)
        const embed = this.embed(this.text(qaSettingsManager.text, writer), qaWriter.description)
        if (qaWriter.title) embed.setTitle(qaWriter.title)
        const qaStaffs = qaManager.filter(i => i.status !== QaStatus.WRITE)
        await Promise.all(qaStaffs.map(async i => {
            const user = await this.fetchClientUser(i.userId)
            const field = i.status === QaStatus.RESPONSE ? {
                name: qaSettingsManager.resp,
                value: this.respContent(qaSettingsManager.respContent, user, i.description)
            } : {
                name: qaSettingsManager.addsResp,
                value: this.respContent(qaSettingsManager.addsRespContent, user, i.description)
            }
            embed.addFields(field)
        }))
        return embed
    }
    protected text = (text: string, user: User): string => text.replaceAll('{user}', user.displayName)
    protected respContent = (text: string, user: User, content: string): string => text
        .replaceAll('{user}', user.toString())
        .replaceAll('{content}', content)
}