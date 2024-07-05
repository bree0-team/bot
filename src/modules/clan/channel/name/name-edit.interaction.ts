import {ModalHandlerOptions, PublicHandler} from '../../../../handlers/interaction.js'
import {allCheck} from '../helpers/allCheck.js'
import {SelectChannel} from '../SelectChannel.js'
import {ChannelNameData} from '../types/data.type.js'
import {
    CLAN_CHANNEL_NAME_MODAL,
    CLAN_CHANNEL_NAME_MODAL_VALUE,
    CLAN_CHANNEL_NAME_SELECT
} from './enums/CustomIds.enum.js'

class NameEditInteraction extends PublicHandler {
    protected async runFields({interaction, fields}: ModalHandlerOptions) {
        await allCheck(interaction)
        const name = fields.getTextInputValue(CLAN_CHANNEL_NAME_MODAL_VALUE)
        const data: ChannelNameData = {name}
        return new SelectChannel(interaction).run(CLAN_CHANNEL_NAME_SELECT, undefined, data)
    }
}

export default new NameEditInteraction(CLAN_CHANNEL_NAME_MODAL)