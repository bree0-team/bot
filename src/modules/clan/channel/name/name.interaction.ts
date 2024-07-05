import {TextInputBuilder, TextInputStyle} from 'discord.js'
import {ButtonHandlerOptions, ModalHandler} from '../../../../handlers/interaction.js'
import {Modal} from '../../../../services/interaction.js'
import {ClanChannelButtonCustomIds} from '../enums/CustomIds.enum.js'
import {allCheck} from '../helpers/allCheck.js'
import {CLAN_CHANNEL_NAME_MODAL, CLAN_CHANNEL_NAME_MODAL_VALUE} from './enums/CustomIds.enum.js'

class NameInteraction extends ModalHandler {
    protected async run({interaction}: ButtonHandlerOptions) {
        await allCheck(interaction)
        return Modal(interaction, CLAN_CHANNEL_NAME_MODAL,
            interaction.t('clan:channel:name:modal:title'), [
                new TextInputBuilder()
                    .setCustomId(CLAN_CHANNEL_NAME_MODAL_VALUE)
                    .setLabel(interaction.t('name'))
                    .setStyle(TextInputStyle.Short)
                    .setMinLength(0)
                    .setMaxLength(100)
            ]
        )
    }
}

export default new NameInteraction(ClanChannelButtonCustomIds.Name, false)