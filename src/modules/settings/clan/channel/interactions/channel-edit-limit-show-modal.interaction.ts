import {TextInputBuilder, TextInputStyle} from 'discord.js'
import {ButtonHandlerOptions, ModalHandler} from '../../../../../handlers/interaction.js'
import {Modal} from '../../../../../services/interaction.js'
import {
    CHANNEL_EDIT_LIMIT,
    CHANNEL_EDIT_LIMIT_MODAL,
    CHANNEL_EDIT_LIMIT_MODAL_VALUE
} from '../enums/CustomIds.enum.js'
import SettingsClanChannelManager from '../managers/settings-clan-channel.manager.js'

class ChannelEditLimitShowModalInteraction extends ModalHandler {
    protected async run({interaction}: ButtonHandlerOptions) {
        const channelManager = await SettingsClanChannelManager.getOne(interaction.guildId)
        return Modal(interaction, CHANNEL_EDIT_LIMIT_MODAL,
            interaction.t('settings:clan:channel:edit_limit:modal:title'), [
                new TextInputBuilder({
                    customId: CHANNEL_EDIT_LIMIT_MODAL_VALUE,
                    style: TextInputStyle.Short,
                    label: interaction.t('limit'),
                    value: channelManager.limit.toString(),
                    minLength: 1, maxLength: 2
                })
            ]
        )
    }
}

export default new ChannelEditLimitShowModalInteraction(CHANNEL_EDIT_LIMIT)