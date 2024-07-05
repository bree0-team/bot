import {ModalHandlerOptions, PrivateHandler} from '../../../../handlers/interaction.js'
import {MUN_EDIT_MODAL, MUN_EDIT_MODAL_DESCRIPTION, MUN_EDIT_MODAL_TITLE} from '../enums/CustomIds.enum.js'
import SettingsMunManager from '../managers/settings-mun.manager.js'
import {Mun} from '../Mun.js'

class EditInteraction extends PrivateHandler {
    protected async runFields({interaction, fields}: ModalHandlerOptions) {
        const title = fields.getTextInputValue(MUN_EDIT_MODAL_TITLE) || null
        const description = fields.getTextInputValue(MUN_EDIT_MODAL_DESCRIPTION) || null
        await SettingsMunManager.createOrUpdate(interaction.guildId, {title, description})
        return new Mun(interaction).run()
    }
}

export default new EditInteraction(MUN_EDIT_MODAL)