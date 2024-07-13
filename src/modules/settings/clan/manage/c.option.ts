import {SelectBuilder} from '../../../../builders/select.js'
import {SelectEmoji} from '../../../../enums/SelectEmoji.enum.js'
import {CLAN_SELECT, SettingsClanSelectValuesCustomIds} from '../enums/CustomIds.enum.js'
import {Create} from './Create.js'

export default new SelectBuilder(CLAN_SELECT, Create, {
    emoji: SelectEmoji.Manage,
    label: 'settings:clan:options:manage',
    value: SettingsClanSelectValuesCustomIds.Create
})