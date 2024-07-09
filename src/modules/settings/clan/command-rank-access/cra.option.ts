import {SelectBuilder} from '../../../../builders/select.js'
import {SelectEmoji} from '../../../../enums/SelectEmoji.enum.js'
import {CLAN_SELECT, SettingsClanSelectValuesCustomIds} from '../enums/CustomIds.enum.js'
import {CommandRankAccess} from './CommandRankAccess.js'

export default new SelectBuilder(CLAN_SELECT, CommandRankAccess, {
    emoji: SelectEmoji.Apps,
    label: 'settings:clan:options:command_rank_access',
    value: SettingsClanSelectValuesCustomIds.CommandRankAccess
})