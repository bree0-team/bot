import {createCanvas, loadImage} from '@napi-rs/canvas'
import {ActivityType, ChannelType, Collection, Guild, GuildMember, Snowflake} from 'discord.js'
import {join} from 'node:path'
import {request} from 'undici'
import {defaultLocale} from '../../helpers/defaults.js'
import {__dirname} from '../../services/file.js'
import {SplitUtils} from '../../utils/split.js'
import {AppLocale} from '../locale/helpers/consts.js'
import {defaultMaxX, defaultMaxY} from '../settings/banner/constants/defaults.js'
import SettingsBannerDataManager from '../settings/banner/managers/settings-banner-data.manager.js'
import SettingsBannerManager from '../settings/banner/managers/settings-banner.manager.js'
import {
    AlignType,
    BannerChannelsData,
    BannerChannelsType,
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
    GraphData,
    ValignType
} from '../settings/banner/types/banner.type.js'
import SettingsGeneralManager from '../settings/general/managers/settings-general.manager.js'
import {BannerImageManager} from './managers/banner-image.manager.js'

interface TextOptions extends Omit<GraphData, 'type' | 'align' | 'valign'>{
    text: string
}

interface TextSize {
    width: number
    height: number
}

export class BannerImage {
    private readonly grid = join(__dirname(import.meta.url), 'assets', 'grid.png')
    private readonly canvas = createCanvas(defaultMaxX*2, defaultMaxY*2)
    private readonly context = this.canvas.getContext('2d')
    constructor(private readonly guild: Guild) {}
    async run(forced: boolean = false, grid: boolean = true): Promise<Buffer> {
        const imageManager = BannerImageManager.findOne(this.guild.id)
        const dataManager = SettingsBannerDataManager.findAllByGuildId(this.guild.id)
        const bannerManager = SettingsBannerManager.findOne(this.guild.id)
        if (imageManager && !forced) {
            const filteredData = dataManager
                .filter(i => i.updatedAt > imageManager.updatedAt)
            if (!filteredData.size && bannerManager?.updatedAt < imageManager.updatedAt)
                return imageManager.attachment
        }
        if (bannerManager?.url) await this.setBg(bannerManager.url)
        if (grid) {
            const background = await loadImage(this.grid)
            this.context.drawImage(background, 0, 0, this.canvas.width, this.canvas.height)
        }
        if (this.guild.members.cache.size !== this.guild.memberCount) await this.guild.members.fetch()
        const generalManager = SettingsGeneralManager.findOne(this.guild.id)
        dataManager.map(i => i.data)
            .map(i => {
                let count: string;
                let align: number;
                let valign: number;
                const {scale, color} = i
                let {x, y} = i
                x += defaultMaxX
                y += defaultMaxY
                switch (i.type) {
                    case BannerType.Channels: count = this.channels(i); break
                    case BannerType.DateTime:
                        count = this.dateTime(
                            i, generalManager?.server_language ?? defaultLocale, generalManager?.timezone
                        ); break
                    case BannerType.Members: count = this.members(i); break
                    case BannerType.MembersInRole: count = this.membersInRole(i); break
                    case BannerType.MembersWithStatus: count = this.membersWithStatus(i); break
                    case BannerType.Roles: count = this.roles(i); break
                    case BannerType.Voice: count = this.voice(i); break
                }
                const {width, height} = this.textSize(count, scale)
                switch (i.align) {
                    case AlignType.Left: align = x; break
                    case AlignType.Center: align = (x - width / 2); break
                    case AlignType.Right: align = (x - width); break
                }
                switch (i.valign) {
                    case ValignType.Top: valign = y; break
                    case ValignType.Middle: valign = (y + height / 2); break
                    case ValignType.Bottom: valign = (y + height); break
                }
                return this.text({text: count, x: align, y: valign, scale, color})
            })
        const attachment = await this.canvas.encode('png')
        BannerImageManager.set(this.guild.id, {attachment, grid, updatedAt: new Date()})
        return attachment
    }
    private async setBg(url: string): Promise<void> {
        const bg = await this.request(url);
        const background = await loadImage(await bg.arrayBuffer());
        this.context.drawImage(background, 0, 0, this.canvas.width, this.canvas.height);
    }
    private text(options: TextOptions): void {
        const {text, x, y, scale, color} = options
        this.context.font = `bold ${scale}px sans-serif`
        this.context.fillStyle = '#' + SplitUtils.decimalToHex(color)
        return this.context.fillText(text, x, y)
    }
    private textSize(text: string, scale: number): TextSize {
        this.context.font = `bold ${scale}px sans-serif`
        const measure = this.context.measureText(text)
        const {width, actualBoundingBoxAscent, actualBoundingBoxDescent} = measure
        const height = actualBoundingBoxAscent + actualBoundingBoxDescent
        return {width, height}
    }
    private async request(url: string) {
        const { body } = await request(url)
        return body
    }
    private channels(data: BannerChannelsData): string {
        const channels = this.guild.channels.cache.filter(i => {
            if (data.channelTypes.includes(BannerChannelsType.Text) && i.isTextBased()) return true
            if (data.channelTypes.includes(BannerChannelsType.Voice) && i.isVoiceBased()) return true
            return data.channelTypes.includes(BannerChannelsType.Category) && i.type === ChannelType.GuildCategory
        })
        return channels.size.toString()
    }
    private dateTime(data: BannerDateTimeData, locale: AppLocale, timeZone: string): string {
        const date = new Date()
        switch (data.style) {
            case DateTimeConst.ShortTime: return date.toLocaleTimeString(locale, {
                hour: '2-digit', minute: '2-digit', timeZone
            })
            case DateTimeConst.LongTime: return date.toLocaleTimeString(locale, {
                hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone
            })
            case DateTimeConst.ShortDate: return date.toLocaleDateString(locale, {
                day: '2-digit', month: '2-digit', year: 'numeric', timeZone
            })
            case DateTimeConst.LongDate: return date.toLocaleDateString(locale, {
                day: '2-digit', month: 'long', year: 'numeric', timeZone
            })
            case DateTimeConst.ShortDateTime: return date.toLocaleDateString(locale, {
                day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZone
            })
            case DateTimeConst.LongDateTime: return date.toLocaleDateString(locale, {
                weekday: 'long', day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit',
                minute: '2-digit', timeZone
            })
        }
    }
    private members(data: BannerMembersData): string {
        const members = this.guild.members.cache.filter(i => {
            if (data.memberTypes.includes(BannerMembersType.Users) && !i.user.bot) return true
            return !!(data.memberTypes.includes(BannerMembersType.Apps) && i.user.bot)
        })
        return members.size.toString()
    }
    private membersInRole(data: BannerMembersInRoleData): string {
        const members = this.guild.members.cache
            .filter(i => i.roles.cache.filter(role => data.roles.includes(role.id)).size)
        return this.$withStatusSize(members, data)
    }
    private membersWithStatus(data: BannerMembersWithStatusData): string {
        const members = this.guild.members.cache
        return this.$withStatusSize(members, data)
    }
    private $withStatusSize(
        members: Collection<Snowflake, GuildMember>,
        data: BannerMembersInRoleData | BannerMembersWithStatusData
    ): string {
        const membersData = members.filter(i => {
            if (data.statuses.includes(BannerMembersWithStatusType.Offline) && !i.presence) return true
            if (!i.presence) return false
            const {status, activities} = i.presence
            const streaming = activities.filter(i => i.type === ActivityType.Streaming)
            if (data.statuses.includes(BannerMembersWithStatusType.Streaming) && streaming.length) return true
            const statuses = Object.values(BannerMembersWithStatusType)
                .filter(i => data.statuses.includes(i) && status === i)
            return statuses.length
        })
        return membersData.size.toString()
    }
    private roles(data: BannerRolesData): string {
        const roles = this.guild.roles.cache.filter(i => {
            if (data.roleTypes.includes(BannerRolesType.Unmanaged) && !i.managed) return true
            return !!(data.roleTypes.includes(BannerRolesType.Managed) && i.managed)
        })
        return roles.size.toString()
    }
    private voice(data: BannerVoiceData): string {
        const voice = this.guild.channels.cache
            .filter(i => data.channels.includes(i.id))
            .map(i => {
                if (i.isVoiceBased()) return i.members.size
                return 0
            })
            .reduce((acc, item) => acc + item, 0)
        return voice.toString()
    }
}