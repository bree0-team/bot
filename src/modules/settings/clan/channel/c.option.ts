import {SelectBuilder} from '../../../../builders/select.js'
import {CLAN_SELECT, SettingsClanSelectValuesCustomIds} from '../enums/CustomIds.enum.js'
import {SelectEmoji} from '../enums/SelectEmoji.enum.js'
import {Channel} from './Channel.js'

export default new SelectBuilder(CLAN_SELECT, Channel, {
    emoji: SelectEmoji.Channels,
    label: 'settings:clan:options:channels',
    value: SettingsClanSelectValuesCustomIds.Channel
})