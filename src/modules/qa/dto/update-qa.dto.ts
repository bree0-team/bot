import {OmitType} from '@nestjs/swagger'
import {CreateQaDto} from './create-qa.dto.js'

export class UpdateQaDto extends OmitType(CreateQaDto, ['status'] as const) {}