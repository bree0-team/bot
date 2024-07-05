import _ from 'lodash'
import {ModalHandlerOptions, PrivateHandler} from '../../../../../handlers/interaction.js'
import {ChannelRankAccessData} from '../../types/data.type.js'
import {Channel} from '../Channel.js'
import {
    CHANNEL_EDIT_LIMIT_MODAL,
    CHANNEL_EDIT_LIMIT_MODAL_VALUE
} from '../enums/CustomIds.enum.js'
import SettingsClanChannelManager from '../managers/settings-clan-channel.manager.js'

class ChannelEditLimitEditInteraction extends PrivateHandler {
    protected async runFields({interaction, fields, data}: ModalHandlerOptions<ChannelRankAccessData>) {
        const limit = fields.getTextInputValue(CHANNEL_EDIT_LIMIT_MODAL_VALUE)
        await SettingsClanChannelManager.createOrUpdate(interaction.guildId, {limit: _.toLength(limit)})
        const {rank, rights} = data
        return new Channel(interaction).run(rank, rights)
    }
}

export default new ChannelEditLimitEditInteraction(CHANNEL_EDIT_LIMIT_MODAL)