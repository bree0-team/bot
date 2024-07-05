import {TextInputBuilder, TextInputStyle} from 'discord.js'
import {ButtonHandlerOptions, ModalHandler} from '../../../../../handlers/interaction.js'
import {Modal} from '../../../../../services/interaction.js'
import SettingsCommandsManager from '../../managers/settings-commands.manager.js'
import {CommandData} from '../../types/data.type.js'
import {COOLDOWN_EDIT, COOLDOWN_EDIT_MODAL, COOLDOWN_EDIT_MODAL_VALUE} from '../enums/CustomIds.enum.js'

class CooldownShowModalInteraction extends ModalHandler {
    protected async run({interaction, data}: ButtonHandlerOptions<CommandData>) {
        const {command} = data
        const commandManager = await SettingsCommandsManager.getOne(interaction.guildId, command)
        return Modal(interaction, COOLDOWN_EDIT_MODAL,
            interaction.t('cooldown'), [
                new TextInputBuilder({
                    customId: COOLDOWN_EDIT_MODAL_VALUE,
                    label: interaction.t('settings:commands:cooldown:modal:label'),
                    value: commandManager.cooldown.toString(),
                    style: TextInputStyle.Short,
                    minLength: 1, maxLength: 10
                }),
            ]
        )
    }
}

export default new CooldownShowModalInteraction(COOLDOWN_EDIT)