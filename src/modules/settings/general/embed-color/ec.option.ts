import {SelectBuilder} from '../../../../builders/select.js'
import {SelectEmoji} from '../../../../enums/SelectEmoji.enum.js'
import {GENERAL_SELECT, SettingsGeneralSelectValuesCustomIds} from '../enums/CustomIds.enum.js'
import {EmbedColor} from './EmbedColor.js'

export default new SelectBuilder(GENERAL_SELECT, EmbedColor, {
    emoji: SelectEmoji.EmbedColor,
    label: 'settings:general:options:embed_color',
    value: SettingsGeneralSelectValuesCustomIds.EmbedColor,
})