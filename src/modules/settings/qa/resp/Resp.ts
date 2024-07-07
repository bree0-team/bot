import {bold, codeBlock, InteractionReplyOptions} from 'discord.js'
import {InteractionReplyComponent} from '../../../../services/interaction.js'
import {ChannelId} from '../../../../types/base.type.js'
import {MAIN_SELECT} from '../../enums/CustomIds.enum.js'
import {QaSelectValues} from '../enums/CustomIds.enum.js'
import SettingsQaManager from '../managers/settings-qa.manager.js'
import {BaseSettingsQa} from '../structures/BaseSettingsQa.js'
import {QaData} from '../types/data.type.js'
import {QA_RESP} from './enums/CustomIds.enum.js'

export class Resp extends BaseSettingsQa {
    async run(channelId: ChannelId) {
        const qaManager = SettingsQaManager.findOne(this.guildId, channelId)
        const embed = this.embed
            .setDescription([
                bold(this.t('settings:qa:resp:title') + ':'),
                codeBlock(qaManager.resp),
                bold(this.t('settings:qa:resp:content') + ':'),
                codeBlock(qaManager.respContent)
            ].join('\n'))
        const components: InteractionReplyComponent[] = [
            this.channelRow(channelId),
            this.select(QaSelectValues.Resp),
            this.back(MAIN_SELECT, [this.editButton(QA_RESP)])
        ]
        const replyData: InteractionReplyOptions = {embeds: [embed], components}
        const data: QaData = {channelId}
        return this.reply({replyData, data})
    }
}