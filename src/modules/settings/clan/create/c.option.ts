import {SelectBuilder} from '../../../../builders/select.js'
import {CLAN_SELECT, SettingsClanSelectValuesCustomIds} from '../enums/CustomIds.enum.js'
import {SelectEmoji} from '../enums/SelectEmoji.enum.js'
import {Create} from './Create.js'

export default new SelectBuilder(CLAN_SELECT, Create, {
    emoji: SelectEmoji.WhoCreated,
    label: 'settings:clan:options:create_roles',
    value: SettingsClanSelectValuesCustomIds.Create
})