import {SelectBuilder} from '../../../../builders/select.js'
import {SelectEmoji} from '../../enums/SelectEmoji.enum.js'
import {CLAN_SELECT, SettingsClanSelectValuesCustomIds} from '../enums/CustomIds.enum.js'
import {Transfer} from './Transfer.js'

export default new SelectBuilder(CLAN_SELECT, Transfer, {
    emoji: SelectEmoji.Transfer,
    label: 'settings:clan:options:transfer',
    value: SettingsClanSelectValuesCustomIds.Transfer
})