import {Channels} from './channels/Channels.js'
import {DateTime} from './date-time/DateTime.js'
import {MembersInRole} from './members-in-role/MembersInRole.js'
import {MembersWithStatus} from './members-with-status/MembersWithStatus.js'
import {Members} from './members/Members.js'
import {Roles} from './roles/Roles.js'
import {BaseSettingsBanner} from './structures/BaseSettingsBanner.js'
import {BannerType} from './types/banner.type.js'
import {Voice} from './voice/Voice.js'

export class ItemType extends BaseSettingsBanner {
    async run(itemId: number, type: BannerType) {
        switch (type) {
            case BannerType.Channels: return new Channels(this.i).run(itemId)
            case BannerType.DateTime: return new DateTime(this.i).run(itemId)
            case BannerType.Members: return new Members(this.i).run(itemId)
            case BannerType.MembersInRole: return new MembersInRole(this.i).run(itemId)
            case BannerType.MembersWithStatus: return new MembersWithStatus(this.i).run(itemId)
            case BannerType.Roles: return new Roles(this.i).run(itemId)
            case BannerType.Voice: return new Voice(this.i).run(itemId)
        }
    }
}