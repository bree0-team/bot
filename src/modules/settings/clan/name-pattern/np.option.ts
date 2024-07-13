import {SelectBuilder} from '../../../../builders/select.js'
import {SelectEmoji} from '../../../../enums/SelectEmoji.enum.js'
import {CLAN_SELECT, SettingsClanSelectValuesCustomIds} from '../enums/CustomIds.enum.js'
import {NamePattern} from './NamePattern.js'

export default new SelectBuilder(CLAN_SELECT, NamePattern, {
    emoji: SelectEmoji.NamePattern,
    label: 'settings:clan:options:name_pattern',
    value: SettingsClanSelectValuesCustomIds.NamePattern
})