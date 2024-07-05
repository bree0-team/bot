import {TextInputBuilder, TextInputStyle} from 'discord.js'
import {ButtonHandlerOptions, ModalHandler} from '../../../../../handlers/interaction.js'
import {Modal} from '../../../../../services/interaction.js'
import SettingsClanManager from '../../managers/settings-clan.manager.js'
import {
    MEMBER_LIMIT_MODAL,
    MEMBER_LIMIT_MODAL_VALUE,
    MEMBER_LIMIT
} from '../enums/CustomIds.enum.js'

class MemberLimitShowModalInteraction extends ModalHandler {
    protected async run({interaction}: ButtonHandlerOptions) {
        const {member_limit} = await SettingsClanManager.getOne(interaction.guildId)
        const textInput = new TextInputBuilder({
            customId: MEMBER_LIMIT_MODAL_VALUE,
            style: TextInputStyle.Short,
            label: interaction.t('limit'),
            minLength: 1, maxLength: 6
        })
        if (member_limit !== null) textInput.setValue(member_limit.toString())
        return Modal(interaction, MEMBER_LIMIT_MODAL,
            interaction.t('settings:clan:members_limit:modal:title'), [textInput]
        )
    }
}

export default new MemberLimitShowModalInteraction(MEMBER_LIMIT)