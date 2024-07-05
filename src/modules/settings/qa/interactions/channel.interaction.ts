import {PrivateHandler} from '../../../../handlers/interaction.js'
import {SelectOneValuePageOptions} from '../../../../handlers/paginator.js'
import {ChannelId} from '../../../../types/base.type.js'
import {QA_CHANNEL} from '../enums/CustomIds.enum.js'
import {Qa} from '../Qa.js'

class ChannelInteraction extends PrivateHandler {
    protected runValue = ({interaction, value}: SelectOneValuePageOptions<ChannelId>) =>
        new Qa(interaction).run(value)
}

export default new ChannelInteraction(QA_CHANNEL)