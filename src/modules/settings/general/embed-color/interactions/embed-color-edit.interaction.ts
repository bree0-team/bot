import {ModalHandlerOptions, PrivateHandler} from '../../../../../handlers/interaction.js'
import {SplitUtils} from '../../../../../utils/split.js'
import SettingsGeneralManager from '../../managers/settings-general.manager.js'
import {EmbedColor} from '../EmbedColor.js'
import {EMBED_COLOR_MODAL, EMBED_COLOR_MODAL_VALUE} from '../enums/CustomIds.enum.js'

class EmbedColorEditInteraction extends PrivateHandler {
    protected async runFields({interaction, fields}: ModalHandlerOptions) {
        const color = fields.getTextInputValue(EMBED_COLOR_MODAL_VALUE)
        const embed_color = SplitUtils.hexToDecimal(color)
        await SettingsGeneralManager.createOrUpdate(interaction.guildId, {embed_color})
        return new EmbedColor(interaction).run()
    }
}

export default new EmbedColorEditInteraction(EMBED_COLOR_MODAL)