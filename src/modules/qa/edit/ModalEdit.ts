import {AnySelectMenuInteraction, ButtonInteraction, TextInputBuilder, TextInputStyle} from 'discord.js'
import {DiscordLimits} from '../../../enums/DiscordLimits.enum.js'
import {Modal} from '../../../services/interaction.js'
import InteractionManager from '../../interaction/managers/interaction.manager.js'
import {QaStatus} from '../enums/QaStatus.enum.js'
import QaManager from '../managers/qa.manager.js'
import {BaseQa} from '../structures/BaseQa.js'
import {QA_EDIT_MODAL, QA_EDIT_MODAL_DESCRIPTION, QA_EDIT_MODAL_TITLE} from './enums/CustomIds.enum.js'
import {QaItemData} from './types/data.type.js'

export class ModalEdit extends BaseQa {
    async run(id: number) {
        const item = QaManager.findOne(id)
        const inputs: TextInputBuilder[] = []
        if (item.status === QaStatus.WRITE) inputs.push(new TextInputBuilder({
            customId: QA_EDIT_MODAL_TITLE,
            style: TextInputStyle.Short,
            label: this.t('qa:modal:label'),
            value: item.title,
            required: false,
            minLength: DiscordLimits.MODAL_TEXT_INPUT_MIN_VALUE,
            maxLength: DiscordLimits.EMBED_TITLE_LENGTH
        }))
        inputs.push(new TextInputBuilder({
            customId: QA_EDIT_MODAL_DESCRIPTION,
            style: TextInputStyle.Paragraph,
            label: this.t('description'),
            value: item.description,
            maxLength: 4000
        }))
        const data: QaItemData = {itemId: id}
        await InteractionManager.createOrUpdate(this.guildId, this.message.id, this.userId, {data})
        return Modal(
            this.i as (ButtonInteraction | AnySelectMenuInteraction), QA_EDIT_MODAL,
            this.t('modal:title'), inputs
        )
    }
}