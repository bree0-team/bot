import {GuildMember, User} from 'discord.js'
import _ from 'lodash'
import {EmbedColors} from '../../enums/EmbedColors.enum.js'
import {TickEmoji} from '../../enums/TickEmoji.enum.js'
import {EmbedField} from '../../helpers/embed.js'
import {RoleId} from '../../types/base.type.js'
import {PermissionUtils} from '../../utils/permission.js'
import SettingsMunManager from '../settings/mun/managers/settings-mun.manager.js'
import {MunStatus} from './enums/MunStatus.enum.js'
import {
    MunAlreadyManagedError,
    MunNoRightsError,
    MunNotInThisChannelError,
    MunYouDontHaveRightsError
} from './errors/mun.error.js'
import MunManager from './managers/mun.manager.js'
import {BaseMun} from './structures/BaseMun.js'

const color: Record<MunStatus, EmbedColors> = {
    [MunStatus.ACCEPT]: EmbedColors.SUCCESS,
    [MunStatus.REJECT]: EmbedColors.DENIED,
    [MunStatus.CLEAR]: EmbedColors.WARNING,
    [MunStatus.ASSIGN]: EmbedColors.SECONDARY
}
const emoji: Record<MunStatus, TickEmoji> = {
    [MunStatus.ACCEPT]: TickEmoji.CHECK,
    [MunStatus.REJECT]: TickEmoji.CROSS,
    [MunStatus.CLEAR]: TickEmoji.BRUSH,
    [MunStatus.ASSIGN]: TickEmoji.WRITE
}

export class Mun extends BaseMun {
    async access(): Promise<void> {
        const {channelId, roles} = await SettingsMunManager.getOne(this.guildId)
        const member = this.i.member as GuildMember
        const roleIds = member.roles.cache.map(role => role.id)
        const staffRoles = _.intersection(roles, roleIds) as RoleId[]
        if (channelId !== this.channelId) throw new MunNotInThisChannelError(this.i)
        if (!(!!staffRoles.length || PermissionUtils.isAdmin(member))) throw new MunYouDontHaveRightsError(this.i)
    }
    async run(status: MunStatus, value?: string) {
        await this.access()
        const {
            userId, status: assignedStatus, oldValue, newValue
        } = MunManager.findOne(this.message.id)
        if (assignedStatus) throw new MunAlreadyManagedError(this.i)
        const member = await this.fetchGuildMemberOrGetUser(userId)
        const embed = this.embed(member, oldValue, newValue)
        if (member instanceof User) {
            embed.addFields(
                EmbedField(this.t('mun:status'), this.t('mun:error:not_on_server'))
            )
        } else {
            const nickname: Record<MunStatus, string | null> = {
                [MunStatus.ACCEPT]: newValue,
                [MunStatus.REJECT]: oldValue,
                [MunStatus.CLEAR]: null,
                [MunStatus.ASSIGN]: value
            }
            if (status !== MunStatus.REJECT) await member.setNickname(nickname[status]).catch(error => {
                if ([50013].includes(error.code)) throw new MunNoRightsError(this.i);
                throw error
            })
            if (status === MunStatus.ASSIGN) embed.addFields(
                EmbedField(this.t('mun:statuses:assigned'), value)
            )
            embed.setColor(color[status])
                .addFields(
                    EmbedField(
                        this.t('mun:status'),
                        emoji[status] + ' ' + this.t('mun:statuses:' + status.toLowerCase() + 'ed'),
                        true
                    ),
                    EmbedField(this.t('mun:executer'), this.user.toString(), true)
                )
                .setFooter({
                    text: this.t('mun:' + (status === MunStatus.REJECT ? 'rejected_at' : 'changed_at')) + ':'
                })
                .setTimestamp(new Date())
        }
        await MunManager.update(this.message.id, {newValue: value ?? newValue, changerId: this.user.id, status})
        return this.message.edit({embeds: [embed], components: []})
    }
}