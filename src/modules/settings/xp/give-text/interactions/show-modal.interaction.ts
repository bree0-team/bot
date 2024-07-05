import {TextInputBuilder, TextInputStyle} from 'discord.js'
import {ButtonHandlerOptions, ModalHandler} from '../../../../../handlers/interaction.js'
import {Modal} from '../../../../../services/interaction.js'
import SettingsXpManager from '../../managers/settings-xp.manager.js'
import {
    TEXT_GIVE,
    TEXT_GIVE_MODAL,
    TEXT_GIVE_MODAL_VALUE_FROM,
    TEXT_GIVE_MODAL_VALUE_TO
} from '../enums/CustomIds.enum.js'

class ShowModalInteraction extends ModalHandler {
    protected async run({interaction}: ButtonHandlerOptions) {
        const {textGive} = await SettingsXpManager.getOne(interaction.guildId)
        const [from, to] = textGive
        return Modal(interaction, TEXT_GIVE_MODAL,
            interaction.t('settings:xp:count'), [
                new TextInputBuilder({
                    customId: TEXT_GIVE_MODAL_VALUE_FROM,
                    style: TextInputStyle.Short,
                    label: interaction.t('from'),
                    value: from.toString(),
                    minLength: 1, maxLength: 4
                }),
                new TextInputBuilder({
                    customId: TEXT_GIVE_MODAL_VALUE_TO,
                    style: TextInputStyle.Short,
                    label: interaction.t('to'),
                    value: to.toString(),
                    minLength: 1, maxLength: 4
                })
            ]
        )
    }
}

export default new ShowModalInteraction(TEXT_GIVE)