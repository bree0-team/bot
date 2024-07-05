import {SelectBuilder} from '../../../../builders/select.js'
import {SelectEmoji} from '../../enums/SelectEmoji.enum.js'
import {CLAN_SELECT, SettingsClanSelectValuesCustomIds} from '../enums/CustomIds.enum.js'
import {MemberLimit} from './MemberLimit.js'

export default new SelectBuilder(CLAN_SELECT, MemberLimit, {
    emoji: SelectEmoji.Limit,
    label: 'settings:clan:options:limit',
    value: SettingsClanSelectValuesCustomIds.MembersLimit
})