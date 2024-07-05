import {ButtonBuilder, ButtonStyle, InteractionReplyOptions} from 'discord.js'
import {ActionButtonRow, ButtonRowBuilder, InteractionReplyComponent} from '../../../services/interaction.js'
import {ChannelId} from '../../../types/base.type.js'
import {MAIN_SELECT} from '../enums/CustomIds.enum.js'
import {QA_CREATE, QA_DELETE} from './enums/CustomIds.enum.js'
import SettingsQaManager from './managers/settings-qa.manager.js'
import {BaseSettingsQa} from './structures/BaseSettingsQa.js'
import {QaData} from './types/data.type.js'

export class Qa extends BaseSettingsQa {
    private buttons(create: boolean): ButtonBuilder {
        const createButton = new ButtonBuilder({
            customId: QA_CREATE,
            style: ButtonStyle.Success,
            label: this.t('create')
        })
        const deleteButton = new ButtonBuilder({
            customId: QA_DELETE,
            style: ButtonStyle.Danger,
            label: this.t('delete')
        })
        return create ? createButton : deleteButton
    }
    async run(channelId?: ChannelId) {
        const embed = this.embed
            .setDescription(this.t('settings:qa:description'))
        const components: InteractionReplyComponent[] = [this.channelRow(channelId)]
        const qaManager = SettingsQaManager.findOne(this.guildId, channelId)
        if (qaManager) components.push(this.select())
        if (channelId) components.push(this.back(MAIN_SELECT, [this.buttons(!qaManager)]))
        else components.push(this.back(MAIN_SELECT))
        const replyData: InteractionReplyOptions = {embeds: [embed], components}
        const data: QaData = {channelId}
        return this.reply({replyData, data})
    }
}