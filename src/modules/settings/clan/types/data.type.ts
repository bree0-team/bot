import {ClanRank} from '../../../clan/enums/ClanRank.enum.js'
import {AllChannelAccess} from '../channel/types/rights.type.js'

export interface CommandRankAccessData {
    rank: ClanRank
}

export interface ChannelRankAccessData {
    rank: ClanRank
    rights: AllChannelAccess[]
}

export type SettingsClanData = CommandRankAccessData | ChannelRankAccessData