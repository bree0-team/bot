import {bold, codeBlock, InteractionReplyOptions} from 'discord.js'
import {InteractionReplyComponent} from '../../../../services/interaction.js'
import {ChannelId} from '../../../../types/base.type.js'
import {MAIN_SELECT} from '../../enums/CustomIds.enum.js'
import {QaSelectValues} from '../enums/CustomIds.enum.js'
import SettingsQaManager from '../managers/settings-qa.manager.js'
import {BaseSettingsQa} from '../structures/BaseSettingsQa.js'
import {QaData} from '../types/data.type.js'
import {QA_ADDS_RESP} from './enums/CustomIds.enum.js'

export class AddsResp extends BaseSettingsQa {
    async run(channelId: ChannelId) {
        const qaManager = await SettingsQaManager.findOne(this.guildId, channelId)
        const embed = this.embed
            .setDescription([
                bold(this.t('settings:qa:adds_resp:title') + ':'),
                codeBlock(qaManager.addsResp),
                bold(this.t('settings:qa:adds_resp:content') + ':'),
                codeBlock(qaManager.addsRespContent)
            ].join('\n'))
        const components: InteractionReplyComponent[] = [
            this.channelRow(channelId),
            this.select(QaSelectValues.AddsResp),
            this.back(MAIN_SELECT, [this.editButton(QA_ADDS_RESP)])
        ]
        const replyData: InteractionReplyOptions = {embeds: [embed], components}
        const data: QaData = {channelId}
        return this.reply({replyData, data})
    }
}