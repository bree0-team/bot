import {Collection} from 'discord.js'
import {ModelManager} from '../../../managers/model.js'
import {GuildId, MessageId, UserId} from '../../../types/base.type.js'
import {defaultData} from '../constants/defaults.js'
import {CreateOrUpdateInteractionDto} from '../dto/create-or-update-interaction.dto.js'
import {InteractionModel} from '../models/interaction.model.js'

const collection = new Collection<MessageId, InteractionModel>()

class InteractionManager extends ModelManager<MessageId, InteractionModel> {
    async createOrUpdate(
        guildId: GuildId,
        messageId: MessageId,
        userId: UserId,
        dto: CreateOrUpdateInteractionDto
    ): Promise<InteractionModel> {
        // todo: ValidationErrorItem
        const defaultDto: CreateOrUpdateInteractionDto = {
            data: defaultData
        }
        return super.$createOrUpdate(this.findOne(messageId),
            {guildId, messageId, userId, ...defaultDto, ...dto, updatedAt: new Date()},
            {guildId, messageId, userId, ...dto, updatedAt: new Date()})
    }
    findOne = (messageId: MessageId): InteractionModel | undefined => super.$findOne(messageId)
    remove = (messageId: MessageId): Promise<boolean> => super.$remove(messageId, {messageId})
}

export default new InteractionManager(collection, InteractionModel, 'messageId')