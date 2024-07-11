import {PrivateHandler, SelectOneValueHandlerOptions} from '../../../../handlers/interaction.js'
import {Delete} from '../Delete.js'
import {DELETE_SELECT_CLAN} from '../enums/CustomIds.enum.js'

class DeleteClanSelectInteraction extends PrivateHandler {
    protected runValue = ({interaction, value}: SelectOneValueHandlerOptions) =>
        new Delete(interaction).members(Number(value))
}

export default new DeleteClanSelectInteraction(DELETE_SELECT_CLAN)