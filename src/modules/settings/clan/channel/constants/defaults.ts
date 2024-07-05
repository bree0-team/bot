import {AllChannelAccess, AllChannelRights, CaptainChannelAccess, ChiefChannelAccess} from '../types/rights.type.js'

export const defaultEnabled: AllChannelRights[] = Object.values(AllChannelRights)
export const defaultLimit: number = 1
export const defaultOwner: AllChannelAccess[] = Object.values(AllChannelRights)
export const defaultChief: ChiefChannelAccess[] = [
    AllChannelRights.limitMembers,
    AllChannelRights.rights,
    AllChannelRights.kickUser,
]
export const defaultCaptain: CaptainChannelAccess[] = [AllChannelRights.kickUser]
export const defaultRecruiter: AllChannelAccess[] = []
export const defaultMember: AllChannelAccess[] = []