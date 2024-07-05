import {ButtonHandlerOptions, PrivateHandler} from '../../../../../handlers/interaction.js'
import SettingsClanManager from '../../managers/settings-clan.manager.js'
import {TRANSFER_SWITCH} from '../enums/CustomIds.enum.js'
import {Transfer} from '../Transfer.js'

class TransferSwitchInteraction extends PrivateHandler {
    protected async run({interaction}: ButtonHandlerOptions) {
        const {transfer} = await SettingsClanManager.getOne(interaction.guildId)
        await SettingsClanManager.createOrUpdate(interaction.guildId, {transfer: !transfer})
        return new Transfer(interaction).run()
    }
}

export default new TransferSwitchInteraction(TRANSFER_SWITCH)