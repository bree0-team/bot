import {SelectBuilder} from '../../../../builders/select.js'
import {GENERAL_SELECT, SettingsGeneralSelectValuesCustomIds} from '../enums/CustomIds.enum.js'
import {Timezone} from './Timezone.js'

export default new SelectBuilder(GENERAL_SELECT, Timezone, {
    //emoji: '🏳️',
    label: 'settings:general:options:timezone',
    value: SettingsGeneralSelectValuesCustomIds.TimeZone
})