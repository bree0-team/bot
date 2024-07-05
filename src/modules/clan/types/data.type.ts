import {UserId} from '../../../types/base.type.js'
import {AdData} from '../ad/types/data.type.js'
import {ChannelData} from '../channel/types/data.type.js'
import {ClanId} from './clan.type.js'

export interface CreateData {
    emoji: string
    name: string
    ownerId?: UserId
}

interface ClanIdData {
    clanId: ClanId
}

interface UserIdData {
    userId: UserId
}

export type InviteData = ClanIdData & UserIdData

export type KickData = ClanIdData & UserIdData

export type LeaveData = ClanIdData

export type TransferData = ClanIdData & UserIdData

export type AppearanceData = ClanIdData

export type ClanData =
    CreateData |
    InviteData |
    KickData |
    LeaveData |
    TransferData |
    AppearanceData |
    ChannelData |
    AdData

