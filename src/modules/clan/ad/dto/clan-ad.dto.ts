import {ApiProperty, ApiPropertyOptional, IntersectionType} from '@nestjs/swagger'
import {IsArray, IsNumber, IsOptional, IsString, IsUrl} from 'class-validator'
import {BaseGuildDto} from '../../../../dto/base-guild.dto.js'
import {EmbedField} from '../../../../helpers/embed.js'
import {BaseClanIdDto} from '../../dto/base-clan-id.dto.js'
import {defaultFields} from '../constants/defaults.js'

export class ClanAdDto extends IntersectionType(BaseGuildDto, BaseClanIdDto) {
    @ApiProperty({
        description: 'Ad pattern title',
        type: String,
        example: 'General ad'
    })
    @IsString()
    readonly title: string

    @ApiPropertyOptional({
        description: 'Embed Author',
        type: String,
        example: 'Author'
    })
    @IsOptional()
    @IsString()
    readonly author?: string

    @ApiPropertyOptional({
        description: 'Embed Author Url',
        type: String,
        example: 'https://example.com'
    })
    @IsOptional()
    @IsUrl()
    readonly authorUrl?: string

    @ApiPropertyOptional({
        description: 'Embed Author Icon Url',
        type: String,
        example: 'https://example.com/author.png'
    })
    @IsOptional()
    @IsUrl()
    readonly authorIcon?: string

    @ApiPropertyOptional({
        description: 'Embed Color',
        type: Number,
        example: 123
    })
    @IsOptional()
    @IsNumber()
    readonly color?: number

    @ApiPropertyOptional({
        description: 'Embed Title',
        type: String,
        example: 'Title'
    })
    @IsOptional()
    @IsString()
    readonly bodyTitle?: string

    @ApiPropertyOptional({
        description: 'Embed Description',
        type: String,
        example: 'Description'
    })
    @IsOptional()
    @IsString()
    readonly bodyDescription?: string

    @ApiPropertyOptional({
        description: 'Embed Url',
        type: String,
        example: 'Url'
    })
    @IsOptional()
    @IsUrl()
    readonly bodyUrl?: string

    @ApiPropertyOptional({
        description: 'Embed Description',
        type: String,
        example: defaultFields
    })
    @IsOptional()
    @IsArray()
    readonly fields?: EmbedField[]

    @ApiPropertyOptional({
        description: 'Embed Image Url',
        type: String,
        example: 'https://example.com/banner.png'
    })
    @IsOptional()
    @IsUrl()
    readonly imageUrl?: string

    @ApiPropertyOptional({
        description: 'Embed Thumbnail Url',
        type: String,
        example: 'https://example.com/thumbnail.png'
    })
    @IsOptional()
    @IsUrl()
    readonly thumbnailUrl?: string

    @ApiPropertyOptional({
        description: 'Embed Footer',
        type: String,
        example: 'Footer'
    })
    @IsOptional()
    @IsString()
    readonly footerText?: string

    @ApiPropertyOptional({
        description: 'Embed Footer Icon Url',
        type: String,
        example: 'https://example.com/footer.png'
    })
    @IsOptional()
    @IsUrl()
    readonly footerIcon?: string
}