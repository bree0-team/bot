import {TextInputBuilder, TextInputStyle} from 'discord.js'
import {ButtonHandlerOptions, ModalHandler} from '../../../../../../handlers/interaction.js'
import {Modal} from '../../../../../../services/interaction.js'
import {CLAN_AD_NAME, CLAN_AD_NAME_MODAL, CLAN_AD_NAME_MODAL_VALUE} from '../../../enums/CustomIds.enum.js'
import ClanAdManager from '../../../managers/clan-ad-manager.js'
import {AdEditData} from '../../../types/data.type.js'

class EditNameShowModalInteraction extends ModalHandler {
    protected async run({interaction, data}: ButtonHandlerOptions<AdEditData>) {
        const {clanAdId} = data
        const clanAd = ClanAdManager.findOne(clanAdId)
        return Modal(interaction, CLAN_AD_NAME_MODAL,
            interaction.t('clan:ad:edit'), [
                new TextInputBuilder({
                    customId: CLAN_AD_NAME_MODAL_VALUE,
                    style: TextInputStyle.Short,
                    label: interaction.t('name'),
                    value: clanAd.title,
                    minLength: 0, maxLength: 100,
                })
            ]
        )
    }
}

export default new EditNameShowModalInteraction(CLAN_AD_NAME)