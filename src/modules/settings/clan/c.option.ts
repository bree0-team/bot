import {SelectBuilder} from '../../../builders/select.js'
import {MAIN_SELECT, MainSelectValuesCustomIds} from '../enums/CustomIds.enum.js'
import {Clan} from './Clan.js'

export default new SelectBuilder(MAIN_SELECT, Clan, {
    emoji: '⚔️',
    label: 'settings:options:clan',
    value: MainSelectValuesCustomIds.Clan
})