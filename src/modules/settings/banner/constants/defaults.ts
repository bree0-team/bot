import {
    BannerChannelsData,
    BannerChannelsType,
    BannerData,
    BannerDateTimeData,
    BannerMembersData,
    BannerMembersInRoleData,
    BannerMembersType,
    BannerMembersWithStatusData,
    BannerMembersWithStatusType,
    BannerRolesData,
    BannerRolesType,
    BannerType,
    BannerVoiceData,
    DateTimeConst,
    PositionType
} from '../types/banner.type.js'

export const defaultEnabled: boolean = true
export const defaultMinX: number = -480
export const defaultMaxX: number = 480
export const defaultMinY: number = -270
export const defaultMaxY: number = 270
export const defaultMinScale: number = 0
export const defaultMaxScale: number = 200
export const defaultX: number = 0
export const defaultY: number = 0
export const defaultScale: number = defaultMaxScale/2
export const defaultColor: number = 16777215
export const defaultPosition: PositionType = PositionType.Left
const defaultGraphData: Omit<BannerData, 'type'> = {
    x: defaultX,
    y: defaultY,
    scale: defaultScale,
    color: defaultColor,
    position: defaultPosition
}
export const defaultChannelsData: BannerChannelsData = {
    type: BannerType.Channels,
    channelTypes: [
        BannerChannelsType.Text,
        BannerChannelsType.Voice
    ],
    ...defaultGraphData
}
export const defaultDateTimeData: BannerDateTimeData = {
    type: BannerType.DateTime,
    style: DateTimeConst.ShortTime,
    ...defaultGraphData
}
export const defaultMembersDate: BannerMembersData = {
    type: BannerType.Members,
    memberTypes: [BannerMembersType.Users],
    ...defaultGraphData
}
export const defaultMembersInRoleData: BannerMembersInRoleData = {
    type: BannerType.MembersInRole,
    roles: [],
    statuses: [
        BannerMembersWithStatusType.Online,
        BannerMembersWithStatusType.Idle,
        BannerMembersWithStatusType.Dnd
    ],
    ...defaultGraphData
}
export const defaultMembersWithStatusData: BannerMembersWithStatusData = {
    type: BannerType.MembersWithStatus,
    statuses: [
        BannerMembersWithStatusType.Online,
        BannerMembersWithStatusType.Idle,
        BannerMembersWithStatusType.Dnd
    ],
    ...defaultGraphData
}
export const defaultRoles: BannerRolesData = {
    type: BannerType.Roles,
    roleTypes: [BannerRolesType.Unmanaged],
    ...defaultGraphData
}
export const defaultVoice: BannerVoiceData = {
    type: BannerType.Voice,
    channels: [],
    ...defaultGraphData
}