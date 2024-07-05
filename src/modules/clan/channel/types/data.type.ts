import {ChannelId} from '../../../../types/base.type.js'
import {UserRight} from "../user-rights/enums/UserRight.enum";

export interface ChannelNameData {
    name: string
}

export interface ChannelMemberLimitData {
    limit: number
}

export interface ChannelRightsData {
    channels: ChannelId[]
}

export type ChannelUserRightsData = ChannelRightsData & {right: UserRight}

export type ChannelData = ChannelNameData | ChannelMemberLimitData | ChannelRightsData | ChannelUserRightsData