import _ from 'lodash'
import {ChannelId, RoleId} from '../../../../types/base.type.js'
import {VoiceStates} from '../../enums/VoiceStates.enum.js'
import {RewardType} from '../enums/RewardType.enum.js'
import {XpType} from '../enums/XpType.enum.js'
import {RewardRoleRecord} from '../models/settings-xp.model.js'

export const defaultXpType: XpType[] = _.values(XpType)
export const defaultVoiceStates: VoiceStates[] = _.values(VoiceStates)
export const defaultRoles: RoleId[] = []
export const defaultChannels: ChannelId[] = []
export const defaultTextGive: [number, number] = [20, 35]
export const defaultVoiceGive: [number, number] = [50, 90]
export const defaultFormula: string = '({level}**2)*33+77*({level}*19)+1288*{level}'
export const defaultRewardType: RewardType = RewardType.STACKED
export const defaultRewardRole: RewardRoleRecord = {}
