import {PickType} from '@nestjs/swagger'
import {QaDto} from './qa.dto.js'

export class CreateQaDto extends PickType(QaDto, ['status', 'title', 'description'] as const) {}