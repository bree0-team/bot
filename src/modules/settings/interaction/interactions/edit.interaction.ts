import {ModalHandlerOptions, PrivateHandler} from '../../../../handlers/interaction.js'
import {SplitUtils} from '../../../../utils/split.js'
import {INTERACTION_EDIT_MODAL, INTERACTION_EDIT_MODAL_VALUE} from '../enums/CustomIds.enum.js'
import {Interaction} from '../Interaction.js'
import SettingsInteractionManager from '../managers/settings-interaction.manager.js'

class EditInteraction extends PrivateHandler {
    protected async runFields({interaction, fields}: ModalHandlerOptions) {
        const value = fields.getTextInputValue(INTERACTION_EDIT_MODAL_VALUE)
        await SettingsInteractionManager.createOrUpdate(interaction.guildId, SplitUtils.stringToDuration(value))
        return new Interaction(interaction).run()
    }
}

export default new EditInteraction(INTERACTION_EDIT_MODAL)