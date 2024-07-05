import {SelectBuilder} from '../../../builders/select.js'
import {MAIN_SELECT, MainSelectValuesCustomIds} from '../enums/CustomIds.enum.js'
import {Interaction} from './Interaction.js'

export default new SelectBuilder(MAIN_SELECT, Interaction, {
    //emoji: SelectEmoji.Command,
    label: 'settings:options:interaction',
    value: MainSelectValuesCustomIds.Interaction
})