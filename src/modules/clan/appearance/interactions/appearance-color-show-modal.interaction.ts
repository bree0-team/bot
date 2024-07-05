import {TextInputBuilder, TextInputStyle} from 'discord.js'
import _ from 'lodash'
import {ButtonHandlerOptions, ModalHandler} from '../../../../handlers/interaction.js'
import {Modal} from '../../../../services/interaction.js'
import {SplitUtils} from '../../../../utils/split.js'
import ClanManager from '../../managers/clan.manager.js'
import {AppearanceData} from '../../types/data.type.js'
import {
    ClanAppearanceButtonCustomIds,
    ClanAppearanceModalCustomIds,
    ClanAppearanceModalValuesCustomIds
} from '../enums/CustomIds.enum.js'

class AppearanceColorShowModalInteraction extends ModalHandler {
    protected run({interaction, data}: ButtonHandlerOptions<AppearanceData>) {
        const {clanId} = data
        const clan = ClanManager.findOne(clanId)
        const textInput = new TextInputBuilder({
            customId: ClanAppearanceModalValuesCustomIds.Color,
            label: interaction.t('hex'),
            style: TextInputStyle.Short,
            required: false,
            minLength: 1, maxLength: 7,
        })
        if (clan.color || _.isFinite(clan.color)) textInput.setValue(SplitUtils.decimalToHex(clan.color))
        return Modal(interaction, ClanAppearanceModalCustomIds.ColorEdit,
            interaction.t('clan:appearance:modification'), [textInput]
        )
    }
}

export default new AppearanceColorShowModalInteraction(ClanAppearanceButtonCustomIds.ColorModal)