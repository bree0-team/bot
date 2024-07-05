import {bold, ButtonBuilder, ButtonStyle, InteractionReplyOptions} from 'discord.js'
import {InteractionReplyComponent} from '../../../../services/interaction.js'
import {ChannelId} from '../../../../types/base.type.js'
import {MAIN_SELECT} from '../../enums/CustomIds.enum.js'
import {QaSelectValues} from '../enums/CustomIds.enum.js'
import SettingsQaManager from '../managers/settings-qa.manager.js'
import {BaseSettingsQa} from '../structures/BaseSettingsQa.js'
import {QaData} from '../types/data.type.js'
import {QA_INTERFACE, QA_SEND} from './enums/CustomIds.enum.js'

export class Interface extends BaseSettingsQa {
    async run(channelId: ChannelId) {
        const qaManager = SettingsQaManager.findOne(this.guildId, channelId)
        const embed = this.embed
            .setDescription([
                bold(this.t('embed:body:options:title') + ': ') + (qaManager.title || this.t('no')),
                bold(this.t('embed:body:options:description') + ': ')
                + (qaManager.description || this.t('no'))
            ].join('\n'))
        const buttons = [
            new ButtonBuilder({
                customId: QA_SEND,
                style: ButtonStyle.Success,
                label: this.t('settings:send_interface')
            }),
            this.editButton(QA_INTERFACE)
        ]
        const components: InteractionReplyComponent[] = [
            this.channelRow(channelId),
            this.select(QaSelectValues.Interface),
            this.back(MAIN_SELECT, buttons)
        ]
        const replyData: InteractionReplyOptions = {embeds: [embed], components}
        const data: QaData = {channelId}
        return this.reply({replyData, data})
    }
}