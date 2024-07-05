import {ClanAdEditOptions} from '../enums/CustomIds.enum.js'

export interface ClanAdId {
    clanAdId: number
    option?: ClanAdEditOptions
    fieldId?: number
}

export type AdEditData = ClanAdId

export type AdData = AdEditData