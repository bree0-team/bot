import {Collection, RepliableInteraction} from 'discord.js'
import {ModelManager} from '../../../../managers/model.js'
import {ChannelId, GuildId} from '../../../../types/base.type.js'
import {defaultRoles} from '../../mun/constants/defaults.js'
import {defaultAddsResp, defaultResp, defaultText} from '../constants/defaults.js'
import {CreateOrUpdateSettingsQaDto} from '../dto/create-or-update-settings-qa.dto.js'
import {SettingsQaModel} from '../models/settings-qa.model.js'

const collection = new Collection<number, SettingsQaModel>()

class SettingsQaManager extends ModelManager<number, SettingsQaModel> {
    createOrUpdate(
        interaction: RepliableInteraction,
        channelId: ChannelId,
        dto?: CreateOrUpdateSettingsQaDto
    ): Promise<SettingsQaModel> {
        // todo: ValidationErrorItem
        const defaultDto: CreateOrUpdateSettingsQaDto = {
            text: defaultText(interaction),
            resp: defaultResp(interaction),
            addsResp: defaultAddsResp(interaction),
            roles: defaultRoles
        }
        const {guildId} = interaction
        return super.$createOrUpdate(this.findOne(guildId, channelId),
            {guildId, channelId, ...defaultDto, ...dto},
            {guildId, channelId, ...dto})
    }
    findOne = (guildId: GuildId, channelId: ChannelId): SettingsQaModel | undefined => this.collection
        .find(i => i.guildId === guildId && i.channelId === channelId)
    remove(guildId: GuildId, channelId: ChannelId): Promise<boolean> {
        const modelId = this.resolveId(this.findOne(guildId, channelId))
        return super.$remove(modelId, {guildId, channelId})
    }
}

export default new SettingsQaManager(collection, SettingsQaModel)