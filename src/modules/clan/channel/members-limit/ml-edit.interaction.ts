import {ChannelType} from 'discord.js'
import _ from 'lodash'
import {ModalHandlerOptions, PublicHandler} from '../../../../handlers/interaction.js'
import {ClanChannelLimitMoreLessError} from '../errors/clan-channel.error.js'
import {allCheck} from '../helpers/allCheck.js'
import {SelectChannel} from '../SelectChannel.js'
import {ChannelMemberLimitData} from '../types/data.type.js'
import {CLAN_CHANNEL_ML_MODAL, CLAN_CHANNEL_ML_MODAL_VALUE, CLAN_CHANNEL_ML_SELECT} from './enums/CustomIds.enum.js'

class MlEditInteraction extends PublicHandler {
    protected async runFields({interaction, fields}: ModalHandlerOptions) {
        await allCheck(interaction)
        const limit = fields.getTextInputValue(CLAN_CHANNEL_ML_MODAL_VALUE)
        const finalLimit = _.toLength(limit) as number
        if (0 > finalLimit || finalLimit > 99) throw new ClanChannelLimitMoreLessError(interaction)
        const data: ChannelMemberLimitData = {limit: finalLimit}
        return new SelectChannel(interaction).run(CLAN_CHANNEL_ML_SELECT, ChannelType.GuildVoice, data)
    }
}

export default new MlEditInteraction(CLAN_CHANNEL_ML_MODAL)