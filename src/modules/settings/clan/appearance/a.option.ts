import {SelectBuilder} from '../../../../builders/select.js'
import {SelectEmoji} from '../../enums/SelectEmoji.enum.js'
import {CLAN_SELECT, SettingsClanSelectValuesCustomIds} from '../enums/CustomIds.enum.js'
import {Appearance} from './Appearance.js'

export default new SelectBuilder(CLAN_SELECT, Appearance, {
    emoji: SelectEmoji.Appearance,
    label: 'settings:clan:options:appearance',
    value: SettingsClanSelectValuesCustomIds.Appearance
})