import _ from 'lodash'

export const MAIN_SELECT: string = 'suGTRS-iYgW4c-6h5exJ-6kAMWN'

export enum MainSelectValuesCustomIds {
    General = 'general',
    Commands = 'commands',
    Activity = 'activity',
    Xp = 'xp',
    Clan = 'clan',
    Qa = 'qa',
    Mun = 'mun',
    Banner = 'banner',
    Afk = 'afk',
    Roles = 'roles',
    Interaction = 'interaction'
}
export const MainSelectValuesSorted: string[] = _.values(MainSelectValuesCustomIds)