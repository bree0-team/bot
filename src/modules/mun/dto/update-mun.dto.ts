import {ApiProperty, PickType} from '@nestjs/swagger'
import {UserId} from '../../../types/base.type.js'
import {MunStatus} from '../enums/MunStatus.enum.js'
import {MunDto} from './mun.dto.js'

export class UpdateMunDto extends PickType(MunDto, ['newValue', 'changerId', 'status'] as const) {
    @ApiProperty()
    readonly changerId: UserId

    @ApiProperty()
    readonly status: MunStatus
}