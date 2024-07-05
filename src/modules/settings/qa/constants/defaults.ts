import {RepliableInteraction} from 'discord.js'
import {RoleId} from '../../../../types/base.type.js'

export const defaultRespContent: string = '{user} — {content}'
export const defaultAddsRespContent: string = '{user} — {content}'
export const defaultRoles: RoleId[] = []
export const defaultText = (interaction: RepliableInteraction): string => interaction.t('settings:qa:db:text')
export const defaultResp = (interaction: RepliableInteraction): string => interaction.t('settings:qa:db:resp')
export const defaultAddsResp = (interaction: RepliableInteraction): string => interaction.t('settings:qa:db:addsResp')