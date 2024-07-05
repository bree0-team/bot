import {InteractionReplyOptions, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, User} from 'discord.js'
import {InteractionReplyComponent, StringSelectRowBuilder} from '../../../services/interaction.js'
import {MessageId} from '../../../types/base.type.js'
import SettingsQaManager from '../../settings/qa/managers/settings-qa.manager.js'
import {QaStatus} from '../enums/QaStatus.enum.js'
import QaManager from '../managers/qa.manager.js'
import {BaseQa} from '../structures/BaseQa.js'
import {QaData} from '../types/data.type.js'
import {QA_EDIT_SELECT} from './enums/CustomIds.enum.js'

export class BeforeEdit extends BaseQa {
    async run(messageId: MessageId) {
        const qaSettingsManager = SettingsQaManager.findOne(this.guildId, this.channelId)
        const qaManager = QaManager.findAllByMessageId(messageId)
            .filter(i => i.userId === this.userId)
            .map(i => i)
        const labels = (user: User): Record<string, string> => ({
            [QaStatus.WRITE]: this.text(qaSettingsManager.text, user),
            [QaStatus.RESPONSE]: qaSettingsManager.resp,
            [QaStatus.ADDITIONAL]: qaSettingsManager.addsResp
        })
        const select = new StringSelectMenuBuilder({customId: QA_EDIT_SELECT})
            .setOptions(qaManager.map((i, index) => new StringSelectMenuOptionBuilder({
                label: `#${index+1} ${labels(this.getClientUser(i.userId))[i.status]}`,
                value: i.id.toString()
            })))
        const components: InteractionReplyComponent[] = [StringSelectRowBuilder(select)]
        const replyData: InteractionReplyOptions = {components}
        const data: QaData = {messageId}
        return this.reply({replyData, data})
    }
}