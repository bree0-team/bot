import _ from 'lodash'
import {ChannelId, RoleId} from '../../../../types/base.type.js'
import {MemberType} from '../enums/MemberType.enum.js'
import {VoiceStates} from '../../enums/VoiceStates.enum.js'

export const defaultShowDeleted: boolean = true
export const defaultMemberTypes: MemberType[] = [MemberType.USERS]
export const defaultVoiceStates: VoiceStates[] = _.values(VoiceStates)
export const defaultChannels: ChannelId[] = []
export const defaultRoles: RoleId[] = []