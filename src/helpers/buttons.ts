import {InteractionEmoji} from '../enums/InteractionEmoji.enum.js'

export const RadioEmoji = (bool: boolean): string => InteractionEmoji[bool ? 'RADIO_ON' : 'RADIO_OFF']
export const SwitchEmoji = (bool: boolean): string => InteractionEmoji[bool ? 'SWITCH_ON' : 'SWITCH_OFF']
export const CheckEmoji = (bool: boolean): string => InteractionEmoji[bool ? 'CHECK_ON' : 'CHECK_OFF']