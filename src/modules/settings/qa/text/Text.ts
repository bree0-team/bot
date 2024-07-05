import {bold, codeBlock, InteractionReplyOptions} from 'discord.js'
import {InteractionReplyComponent} from '../../../../services/interaction.js'
import {ChannelId} from '../../../../types/base.type.js'
import {MAIN_SELECT} from '../../enums/CustomIds.enum.js'
import {QaSelectValues} from '../enums/CustomIds.enum.js'
import SettingsQaManager from '../managers/settings-qa.manager.js'
import {BaseSettingsQa} from '../structures/BaseSettingsQa.js'
import {QaData} from '../types/data.type.js'
import {QA_TEXT} from './enums/CustomIds.enum.js'

export class Text extends BaseSettingsQa {
    async run(channelId: ChannelId) {
        const qaManager = SettingsQaManager.findOne(this.guildId, channelId)
        const embed = this.embed
            .setDescription([
                bold(this.t('settings:qa:options:text') + ':'),
                codeBlock(qaManager.text)
            ].join('\n'))
        const components: InteractionReplyComponent[] = [
            this.channelRow(channelId),
            this.select(QaSelectValues.Text),
            this.back(MAIN_SELECT, [this.editButton(QA_TEXT)])
        ]
        const replyData: InteractionReplyOptions = {embeds: [embed], components}
        const data: QaData = {channelId}
        return this.reply({replyData, data})
    }
}