import {ActivityData} from '../modules/activity/types/data.type.js'
import {ClanData} from '../modules/clan/types/data.type.js'
import {MembersData} from '../modules/members/types/data.type.js'
import {QaGlobalData} from '../modules/qa/types/data.type.js'
import {SettingsData} from '../modules/settings/types/data.type.js'
import {XpData} from '../modules/xp/types/data.type.js'

export interface PageData {
    page: number
    size: number
}

interface CountData {
    count: number
}

export type InteractionData =
    {} |
    PageData |
    CountData |
    ClanData |
    SettingsData |
    MembersData |
    ActivityData |
    XpData |
    QaGlobalData