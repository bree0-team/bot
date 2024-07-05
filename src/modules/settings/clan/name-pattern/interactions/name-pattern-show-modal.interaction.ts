import {TextInputBuilder, TextInputStyle} from 'discord.js'
import {ButtonHandlerOptions, ModalHandler} from '../../../../../handlers/interaction.js'
import {Modal} from '../../../../../services/interaction.js'
import SettingsClanManager from '../../managers/settings-clan.manager.js'
import {NAME_PATTERN, NAME_PATTERN_MODAL, NAME_PATTERN_MODAL_VALUE} from '../enums/CustomIds.enum.js'

class NamePatternShowModalInteraction extends ModalHandler {
    protected async run({interaction}: ButtonHandlerOptions) {
        const {name_pattern} = await SettingsClanManager.getOne(interaction.guildId)
        return Modal(interaction, NAME_PATTERN_MODAL,
            interaction.t('settings:clan:name_pattern:modal:title'), [
                new TextInputBuilder({
                    customId: NAME_PATTERN_MODAL_VALUE,
                    style: TextInputStyle.Short,
                    label: interaction.t('settings:clan:name_pattern:pattern'),
                    value: name_pattern,
                    minLength: 1, maxLength: 20
                }),
            ]
        )
    }
}

export default new NamePatternShowModalInteraction(NAME_PATTERN)