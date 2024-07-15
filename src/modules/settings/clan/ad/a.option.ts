import {SelectBuilder} from '../../../../builders/select.js'
import {SelectEmoji} from '../../../../enums/SelectEmoji.enum.js'
import {CLAN_SELECT, SettingsClanSelectValuesCustomIds} from '../enums/CustomIds.enum.js'
import {Ad} from './Ad.js'

export default new SelectBuilder(CLAN_SELECT, Ad, {
    emoji: SelectEmoji.Ad,
    label: 'settings:clan:options:ad',
    value: SettingsClanSelectValuesCustomIds.Ad
})