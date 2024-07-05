import {TextInputBuilder, TextInputStyle} from 'discord.js'
import {DiscordLimits} from '../../../../enums/DiscordLimits.enum.js'
import {ButtonHandlerOptions, ModalHandler} from '../../../../handlers/interaction.js'
import {Modal} from '../../../../services/interaction.js'
import {MUN_EDIT, MUN_EDIT_MODAL, MUN_EDIT_MODAL_DESCRIPTION, MUN_EDIT_MODAL_TITLE} from '../enums/CustomIds.enum.js'
import SettingsMunManager from '../managers/settings-mun.manager.js'

class EditModalInteraction extends ModalHandler {
    protected async run({interaction}: ButtonHandlerOptions) {
        const {title, description} = await SettingsMunManager.getOne(interaction.guildId)
        const titleInput = new TextInputBuilder({
            customId: MUN_EDIT_MODAL_TITLE,
            label: interaction.t('embed:body:options:title'),
            style: TextInputStyle.Short,
            required: false,
            minLength: 0, maxLength: DiscordLimits.EMBED_TITLE_LENGTH
        })
        const descriptionInput = new TextInputBuilder({
            customId: MUN_EDIT_MODAL_DESCRIPTION,
            label: interaction.t('embed:body:options:description'),
            style: TextInputStyle.Short,
            required: false,
            minLength: 0, maxLength: 4000
        })
        if (title) titleInput.setValue(title)
        if (description) descriptionInput.setValue(description)
        return Modal(interaction, MUN_EDIT_MODAL, interaction.t('settings:mun:modal'), [
            titleInput, descriptionInput
        ])
    }
}

export default new EditModalInteraction(MUN_EDIT)