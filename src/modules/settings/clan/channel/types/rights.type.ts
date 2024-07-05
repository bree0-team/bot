export enum AllChannelRights {
    voiceChannel = 'voiceChannel', // owner
    textChannel = 'textChannel', // owner
    userRights = 'userRights', // owner
    name = 'name', // owner
    delete = 'delete', // owner
    limitMembers = 'limitMembers', // chief
    rights = 'rights', // chief
    kickUser = 'kickUser', // captain
}

export type AllChannelAccess = AllChannelRights
export type ChiefChannelAccess = Exclude<AllChannelAccess,
    AllChannelRights.voiceChannel |
    AllChannelRights.textChannel |
    AllChannelRights.userRights |
    AllChannelRights.name |
    AllChannelRights.delete>
export type CaptainChannelAccess = Extract<ChiefChannelAccess, AllChannelRights.kickUser>