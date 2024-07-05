import {TextInputBuilder, TextInputStyle} from 'discord.js'
import {ButtonHandlerOptions, ModalHandler} from '../../../../handlers/interaction.js'
import {Modal} from '../../../../services/interaction.js'
import {ClanChannelButtonCustomIds} from '../enums/CustomIds.enum.js'
import {allCheck} from '../helpers/allCheck.js'
import {CLAN_CHANNEL_ML_MODAL, CLAN_CHANNEL_ML_MODAL_VALUE} from './enums/CustomIds.enum.js'

class MlShowModalInteraction extends ModalHandler {
    protected async run({interaction}: ButtonHandlerOptions) {
        await allCheck(interaction)
        return Modal(interaction, CLAN_CHANNEL_ML_MODAL,
            interaction.t('clan:channel:members_limit:modal:title'), [
                new TextInputBuilder()
                    .setCustomId(CLAN_CHANNEL_ML_MODAL_VALUE)
                    .setLabel(interaction.t('limit'))
                    .setStyle(TextInputStyle.Short)
                    .setMinLength(1)
                    .setMaxLength(2)
            ]
        )
    }
}

export default new MlShowModalInteraction(ClanChannelButtonCustomIds.LimitMembers, false)