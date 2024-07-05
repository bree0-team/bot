import {ButtonBuilder, ButtonStyle, InteractionReplyOptions} from 'discord.js'
import {ButtonRowBuilder, InteractionReplyComponent} from '../../services/interaction.js'
import {MessageId} from '../../types/base.type.js'
import {QA_DELETE, QA_EDIT, QA_REPLY, QA_RESOLVE} from './enums/CustomIds.enum.js'
import {QaEmoji} from './enums/QaEmoji.enum.js'
import {QaUserDontHaveRightsToModifyError} from './errors/qa.error.js'
import QaManager from './managers/qa.manager.js'
import {BaseQa} from './structures/BaseQa.js'
import {QaData} from './types/data.type.js'

export class Action extends BaseQa {
    async run(messageId: MessageId) {
        const staff = this.staffAccess(false)
        const writerOrReplier = QaManager.findAllByMessageId(messageId)
            .filter(i => i.userId === this.userId)
        const buttons: ButtonBuilder[] = []
        if (staff) buttons.push(new ButtonBuilder({
            customId: QA_REPLY,
            style: ButtonStyle.Secondary,
            emoji: QaEmoji.reply,
            label: this.t('qa:actions:reply')
        }))
        if (writerOrReplier.size) buttons.push(new ButtonBuilder({
            customId: QA_EDIT,
            style: ButtonStyle.Primary,
            emoji: QaEmoji.edit,
            label: this.t('qa:actions:edit')
        }))
        if (staff) buttons.push(new ButtonBuilder({
            customId: QA_RESOLVE,
            style: ButtonStyle.Success,
            emoji: QaEmoji.resolve,
            label: this.t('qa:actions:resolve')
        }))
        if (!buttons.length) throw new QaUserDontHaveRightsToModifyError(this.i)
        buttons.push(new ButtonBuilder({
            customId: QA_DELETE,
            style: ButtonStyle.Danger,
            emoji: QaEmoji.delete,
            label: this.t('qa:actions:delete')
        }))
        const components: InteractionReplyComponent[] = [ButtonRowBuilder(...buttons)]
        const replyData: InteractionReplyOptions = {components, ephemeral: true}
        const data: QaData = {messageId}
        return this.followUp({replyData, data})
    }
}