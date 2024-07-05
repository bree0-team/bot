import {AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, Model, Table} from 'sequelize-typescript'
import {DiscordLimits} from '../../../../enums/DiscordLimits.enum.js'
import {EmbedField} from '../../../../helpers/embed.js'
import {GuildId} from '../../../../types/base.type.js'
import {ClanModel} from '../../models/clan.model.js'
import {ClanId} from '../../types/clan.type.js'
import {defaultFields} from '../constants/defaults.js'

interface ClanAdAttrs {
    id: number
    guildId: GuildId
    title: string
    author: string
    authorUrl: string
    authorIcon: string
    color: number
    bodyTitle: string
    bodyDescription: string
    bodyUrl: string
    fields: string
    imageUrl: string
    thumbnailUrl: string
    footerText: string
    footerIcon: string
    clanId: ClanId
}

interface ClanAdCreationAttrs extends Pick<ClanAdAttrs, 'guildId' | 'clanId'> {
    fields?: EmbedField[]
}

@Table({tableName: 'clan_ad'})
export class ClanAdModel extends Model<ClanAdAttrs, ClanAdCreationAttrs> {
    @AllowNull(false)
    @Column
    guildId: GuildId

    @Column
    title: string

    @Column(DataType.STRING(DiscordLimits.EMBED_AUTHOR_LENGTH))
    author: string

    @Column
    authorUrl: string

    @Column
    authorIcon: string

    @Column
    color: number

    @Column(DataType.STRING(DiscordLimits.EMBED_TITLE_LENGTH))
    bodyTitle: string

    @Column(DataType.STRING(DiscordLimits.EMBED_DESCRIPTION_LENGTH))
    bodyDescription: string

    @Column
    bodyUrl: string

    @AllowNull(false)
    @Default(defaultFields)
    @Column(DataType.TEXT)
    get fields(): EmbedField[] {
        const value = this.getDataValue('fields')
        if (value) return JSON.parse(value)
        return defaultFields
    }
    set fields(value: EmbedField[]) {
        this.setDataValue('fields', JSON.stringify(value))
    }

    @Column
    imageUrl: string

    @Column
    thumbnailUrl: string

    @Column(DataType.STRING(DiscordLimits.EMBED_FOOTER_LENGTH))
    footerText: string

    @Column
    footerIcon: string

    @ForeignKey(() => ClanModel)
    @Column
    clanId: ClanId

    @BelongsTo(() => ClanModel)
    clan: ReturnType<() => ClanModel>
}