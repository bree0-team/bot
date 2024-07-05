import {ApiPropertyOptional, IntersectionType} from '@nestjs/swagger'
import {IsObject, IsOptional} from 'class-validator'
import {BaseGuildDto} from '../../../dto/base-guild.dto.js'
import {BaseMessageDto} from '../../../dto/base-message.dto.js'
import {BaseUserDto} from '../../../dto/base-user.dto.js'
import {InteractionData} from '../../../types/data.type.js'

export class InteractionDto extends IntersectionType(BaseGuildDto, BaseMessageDto, BaseUserDto) {
    @ApiPropertyOptional({
        description: 'Data',
        type: Object,
        example: {clanId: 1}
    })
    @IsOptional()
    @IsObject()
    readonly data?: InteractionData
}