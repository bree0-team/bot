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

class AppearanceAvatarShowModalInteraction extends ModalHandler {
    protected run({interaction, data}: ButtonHandlerOptions<AppearanceData>) {
        const {clanId} = data
        const clan = ClanManager.findOne(clanId)
        const textInput = new TextInputBuilder({
            customId: ClanAppearanceModalValuesCustomIds.Avatar,
            label: interaction.t('clan:appearance:options:avatar'),
            style: TextInputStyle.Short,
            required: false,
            minLength: 0, maxLength: 100,
        })
        if (clan.avatar) textInput.setValue(clan.avatar)
        return Modal(interaction, ClanAppearanceModalCustomIds.AvatarEdit,
            interaction.t('clan:appearance:modification'), [textInput]
        )
    }
}

export default new AppearanceAvatarShowModalInteraction(ClanAppearanceButtonCustomIds.AvatarModal)