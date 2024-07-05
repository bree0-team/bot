import {TimestampStyles, TimestampStylesString} from 'discord.js'
import {ChannelId, RoleId} from '../../../../types/base.type.js'

export enum BannerType {
    Channels = 'channels',
    DateTime = 'data_time',
    Members = 'members',
    MembersWithStatus = 'members_with_status',
    MembersInRole = 'members_in_role',
    Roles = 'roles',
    Voice = 'voice'
}

export enum PositionType {
    Left = 'left',
    Center = 'center',
    Right = 'right'
}

export interface GraphData {
    type: BannerType
    x: number
    y: number
    scale: number
    color: number
    position: PositionType
}

export enum BannerChannelsType {
    Text = 'text',
    Voice = 'voice',
    Category = 'category'
}

export interface BannerChannelsData extends GraphData {
    type: BannerType.Channels
    channelTypes: BannerChannelsType[]
}

export type DateTimeStyles = Exclude<TimestampStylesString, 'R'>
const {RelativeTime, ...dtStyles} = TimestampStyles
export const DateTimeConst = dtStyles

export interface BannerDateTimeData extends GraphData {
    type: BannerType.DateTime
    style: DateTimeStyles
}

export enum BannerMembersType {
    Users = 'users',
    Apps = 'apps'
}

export interface BannerMembersData extends GraphData {
    type: BannerType.Members
    memberTypes: BannerMembersType[]
}

export enum BannerMembersWithStatusType {
    Online = 'online',
    Idle = 'idle',
    Dnd = 'dnd',
    Streaming = 'streaming',
    Offline = 'offline'
}

export interface BannerMembersWithStatusData extends GraphData {
    type: BannerType.MembersWithStatus
    statuses: BannerMembersWithStatusType[]
}

export interface BannerMembersInRoleData extends GraphData {
    type: BannerType.MembersInRole
    roles: RoleId[]
    statuses: BannerMembersWithStatusType[]
}

export enum BannerRolesType {
    Unmanaged = 'unmanaged',
    Managed = 'managed'
}

export interface BannerRolesData extends GraphData {
    type: BannerType.Roles
    roleTypes: BannerRolesType[]
}

export interface BannerVoiceData extends GraphData {
    type: BannerType.Voice
    channels: ChannelId[]
}

export type BannerData =
    BannerChannelsData |
    BannerDateTimeData |
    BannerMembersData |
    BannerMembersWithStatusData |
    BannerMembersInRoleData |
    BannerRolesData |
    BannerVoiceData