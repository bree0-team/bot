import {TextInputBuilder, TextInputStyle} from 'discord.js'
import {ButtonHandlerOptions, ModalHandler} from '../../../../handlers/interaction.js'
import {Modal} from '../../../../services/interaction.js'
import ClanManager from '../../managers/clan.manager.js'
import {AppearanceData} from '../../types/data.type.js'
import {
    ClanAppearanceButtonCustomIds,
    ClanAppearanceModalCustomIds,
    ClanAppearanceModalValuesCustomIds
} from '../enums/CustomIds.enum.js'

class AppearanceDescriptionShowModalInteraction extends ModalHandler {
    protected run({interaction, data}: ButtonHandlerOptions<AppearanceData>) {
        const {clanId} = data
        const clan = ClanManager.findOne(clanId)
        const textInput = new TextInputBuilder({
            customId: ClanAppearanceModalValuesCustomIds.Description,
            label: interaction.t('clan:appearance:options:description'),
            style: TextInputStyle.Paragraph,
            required: false,
        })
        if (clan.description) textInput.setValue(clan.description)
        return Modal(interaction, ClanAppearanceModalCustomIds.DescriptionEdit,
            interaction.t('clan:appearance:modification'), [textInput]
        )
    }
}

export default new AppearanceDescriptionShowModalInteraction(ClanAppearanceButtonCustomIds.DescriptionModal)