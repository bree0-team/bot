import {SelectBuilder} from '../../../../builders/select.js'
import {SelectEmoji} from '../../enums/SelectEmoji.enum.js'
import {CLAN_SELECT, SettingsClanSelectValuesCustomIds} from '../enums/CustomIds.enum.js'
import {Role} from './Role.js'

export default new SelectBuilder(CLAN_SELECT, Role, {
    emoji: SelectEmoji.Role,
    label: 'settings:clan:options:role',
    value: SettingsClanSelectValuesCustomIds.Role
})