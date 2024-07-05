import {TextInputBuilder, TextInputStyle} from 'discord.js'
import {ButtonHandlerOptions, ModalHandler} from '../../../../../handlers/interaction.js'
import {Modal} from '../../../../../services/interaction.js'
import SettingsXpManager from '../../managers/settings-xp.manager.js'
import {REWARD_EDIT_ROLE, REWARD_EDIT_ROLE_MODAL, REWARD_EDIT_ROLE_MODAL_VALUE} from '../enums/CustomIds.enum.js'
import {RewardRoleData} from '../types/data.type.js'

class EditShowModalInteraction extends ModalHandler {
    protected async run({interaction, data}: ButtonHandlerOptions<RewardRoleData>) {
        const {roleId} = data
        const xpManager = await SettingsXpManager.getOne(interaction.guildId)
        let value: string;
        Object.entries(xpManager.rewardRole).map(([level, roles]) => {
            if (roles.includes(roleId)) value = level
        })
        const textInput = new TextInputBuilder({
            customId: REWARD_EDIT_ROLE_MODAL_VALUE, value,
            style: TextInputStyle.Short,
            label: interaction.t('level'),
            minLength: 1, maxLength: 3
        })
        return Modal(interaction, REWARD_EDIT_ROLE_MODAL,
            interaction.t('edit'), [textInput]
        )
    }
}

export default new EditShowModalInteraction(REWARD_EDIT_ROLE)