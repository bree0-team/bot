import {TextInputBuilder, TextInputStyle} from 'discord.js'
import {EmbedColors} from '../../../../../enums/EmbedColors.enum.js'
import {ButtonHandlerOptions, ModalHandler} from '../../../../../handlers/interaction.js'
import {Modal} from '../../../../../services/interaction.js'
import {SplitUtils} from '../../../../../utils/split.js'
import SettingsGeneralManager from '../../managers/settings-general.manager.js'
import {EMBED_COLOR, EMBED_COLOR_MODAL, EMBED_COLOR_MODAL_VALUE} from '../enums/CustomIds.enum.js'

class EmbedColorShowModalInteraction extends ModalHandler {
    protected async run({interaction}: ButtonHandlerOptions) {
        const {embed_color} = await SettingsGeneralManager.getOne(interaction.guildId)
        return Modal(interaction, EMBED_COLOR_MODAL,
            interaction.t('settings:general:system_color:modal:title'), [
                new TextInputBuilder({
                    customId: EMBED_COLOR_MODAL_VALUE,
                    style: TextInputStyle.Short,
                    label: interaction.t('hex'),
                    value: SplitUtils.decimalToHex(embed_color),
                    placeholder: SplitUtils.decimalToHex(EmbedColors.EMPTY),
                    minLength: 1, maxLength: 7,
                })
            ]
        )
    }
}

export default new EmbedColorShowModalInteraction(EMBED_COLOR)