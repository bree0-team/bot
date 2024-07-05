import {SelectBuilder} from '../../../../builders/select.js'
import {XP_SELECT, XpSelectValues} from '../enums/CustomIds.enum.js'
import {Rewards} from './Rewards.js'

export default new SelectBuilder(XP_SELECT, Rewards, {
    label: 'settings:xp:options:rewards',
    value: XpSelectValues.Rewards
})