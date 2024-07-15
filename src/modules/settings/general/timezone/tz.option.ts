import {SelectBuilder} from '../../../../builders/select.js'
import {SelectEmoji} from '../../../../enums/SelectEmoji.enum.js'
import {GENERAL_SELECT, SettingsGeneralSelectValuesCustomIds} from '../enums/CustomIds.enum.js'
import {Timezone} from './Timezone.js'

export default new SelectBuilder(GENERAL_SELECT, Timezone, {
    emoji: SelectEmoji.Timezone,
    label: 'settings:general:options:timezone',
    value: SettingsGeneralSelectValuesCustomIds.TimeZone
})