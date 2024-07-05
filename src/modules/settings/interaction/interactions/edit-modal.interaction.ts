import {TextInputBuilder, TextInputStyle} from 'discord.js'
import {ButtonHandlerOptions, ModalHandler} from '../../../../handlers/interaction.js'
import {Modal} from '../../../../services/interaction.js'
import {SplitUtils} from '../../../../utils/split.js'
import {INTERACTION_EDIT, INTERACTION_EDIT_MODAL, INTERACTION_EDIT_MODAL_VALUE} from '../enums/CustomIds.enum.js'
import SettingsInteractionManager from '../managers/settings-interaction.manager.js'

class EditModalInteraction extends ModalHandler {
    protected async run({interaction}: ButtonHandlerOptions) {
        const {value} = await SettingsInteractionManager.getOne(interaction.guildId)
        return Modal(interaction, INTERACTION_EDIT_MODAL, interaction.t('interaction:title'), [
            new TextInputBuilder({
                customId: INTERACTION_EDIT_MODAL_VALUE,
                style: TextInputStyle.Paragraph,
                label: interaction.t('interaction:label'),
                value: SplitUtils.durationToString(value),
                placeholder: interaction.t('interaction:placeholder'),
                minLength: 2, maxLength: 15
            })
        ])
    }
}

export default new EditModalInteraction(INTERACTION_EDIT)