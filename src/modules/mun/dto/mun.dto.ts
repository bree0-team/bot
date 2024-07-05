import {ApiProperty, ApiPropertyOptional, IntersectionType} from '@nestjs/swagger'
import {IsEnum, IsOptional, IsString} from 'class-validator'
import {BaseChannelDto} from '../../../dto/base-channel.dto.js'
import {BaseGuildDto} from '../../../dto/base-guild.dto.js'
import {BaseMessageDto} from '../../../dto/base-message.dto.js'
import {BaseUserDto} from '../../../dto/base-user.dto.js'
import {UserId} from '../../../types/base.type.js'
import {MunStatus} from '../enums/MunStatus.enum.js'

export class MunDto extends IntersectionType(BaseGuildDto, BaseChannelDto, BaseMessageDto, BaseUserDto) {
    @ApiProperty({
        description: 'Old value of nickname',
        type: String,
        example: 'Baby Shark'
    })
    @IsString()
    readonly oldValue: string

    @ApiProperty({
        description: 'New value of nickname',
        type: String,
        example: 'Baby Shark'
    })
    @IsString()
    readonly newValue: string

    @ApiPropertyOptional({
        description: 'User ID',
        type: String,
        example: '370169617039228928'
    })
    @IsOptional()
    @IsString()
    readonly changerId?: UserId

    @ApiPropertyOptional({
        description: 'Status MUN',
        type: String,
        enum: MunStatus,
        example: MunStatus.ACCEPT
    })
    @IsOptional()
    @IsEnum(MunStatus)
    readonly status?: MunStatus
}