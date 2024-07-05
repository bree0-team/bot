import {EmbedColors} from '../../../../../enums/EmbedColors.enum.js'
import {ButtonHandlerOptions, PrivateHandler} from '../../../../../handlers/interaction.js'
import SettingsGeneralManager from '../../managers/settings-general.manager.js'
import {EmbedColor} from '../EmbedColor.js'
import {EMBED_COLOR_RESET} from '../enums/CustomIds.enum.js'

class EmbedColorReset extends PrivateHandler {
    protected async run({interaction}: ButtonHandlerOptions) {
        await SettingsGeneralManager.createOrUpdate(interaction.guildId, {embed_color: EmbedColors.EMPTY})
        return new EmbedColor(interaction).run()
    }
}

export default new EmbedColorReset(EMBED_COLOR_RESET)