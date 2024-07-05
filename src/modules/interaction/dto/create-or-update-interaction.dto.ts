import {PickType} from '@nestjs/swagger'
import {InteractionDto} from './interaction.dto.js'

export class CreateOrUpdateInteractionDto extends PickType(InteractionDto, ['data'] as const) {}