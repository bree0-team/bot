import {ApiProperty, ApiPropertyOptional, IntersectionType} from '@nestjs/swagger'
import {IsEnum, IsOptional, IsString} from 'class-validator'
import {BaseChannelDto} from '../../../dto/base-channel.dto.js'
import {BaseGuildDto} from '../../../dto/base-guild.dto.js'
import {BaseMessageDto} from '../../../dto/base-message.dto.js'
import {BaseUserDto} from '../../../dto/base-user.dto.js'
import {QaStatus} from '../enums/QaStatus.enum.js'

export class QaDto extends IntersectionType(BaseGuildDto, BaseChannelDto, BaseMessageDto, BaseUserDto) {
    @ApiProperty({
        description: 'Status QA',
        type: String,
        enum: QaStatus,
        example: QaStatus.RESOLVE
    })
    @IsEnum(QaStatus)
    readonly status: QaStatus

    @ApiPropertyOptional({
        description: 'Qa title',
        type: String,
        example: 'Baby\'s'
    })
    @IsOptional()
    @IsString()
    readonly title?: string

    @ApiPropertyOptional({
        description: 'Qa description',
        type: String,
        example: 'Hi, idk what you need'
    })
    @IsOptional()
    @IsString()
    readonly description?: string
}