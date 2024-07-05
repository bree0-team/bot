import {PickType} from '@nestjs/swagger'
import {MunDto} from './mun.dto.js'

export class CreateMunDto extends PickType(MunDto, ['userId', 'oldValue', 'newValue'] as const) {}