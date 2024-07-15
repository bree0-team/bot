import {SelectBuilder} from '../../../builders/select.js'
import {SelectEmoji} from '../../../enums/SelectEmoji.enum.js'
import {MAIN_SELECT, MainSelectValuesCustomIds} from '../enums/CustomIds.enum.js'
import {Interaction} from './Interaction.js'

export default new SelectBuilder(MAIN_SELECT, Interaction, {
    emoji: SelectEmoji.Cooldown,
    label: 'settings:options:interaction',
    value: MainSelectValuesCustomIds.Interaction
})