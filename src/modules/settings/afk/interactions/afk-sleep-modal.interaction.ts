import {TextInputBuilder, TextInputStyle} from 'discord.js'
import {ButtonHandlerOptions, ModalHandler} from '../../../../handlers/interaction.js'
import {Modal} from '../../../../services/interaction.js'
import {AFK_SLEEP_EDIT, AFK_SLEEP_EDIT_MODAL, AFK_SLEEP_EDIT_MODAL_VALUE} from '../enums/CustomIds.enum.js'
import SettingsAfkManager from '../managers/settings-afk.manager.js'

class AfkSleepModalInteraction extends ModalHandler {
    protected async run({interaction}: ButtonHandlerOptions) {
        const afkManager = await SettingsAfkManager.getOne(interaction.guildId)
        return Modal(interaction, AFK_SLEEP_EDIT_MODAL,
            interaction.t('settings:afk:modal'), [
                new TextInputBuilder({
                    customId: AFK_SLEEP_EDIT_MODAL_VALUE,
                    style: TextInputStyle.Short,
                    label: interaction.t('cooldown'),
                    value: afkManager.sleep.toString(),
                    minLength: 1, maxLength: 6
                })
            ]
        )
    }
}

export default new AfkSleepModalInteraction(AFK_SLEEP_EDIT)