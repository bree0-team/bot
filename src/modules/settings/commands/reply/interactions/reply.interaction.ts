import {ButtonHandlerOptions, PrivateHandler} from '../../../../../handlers/interaction.js'
import SettingsCommandsManager from '../../managers/settings-commands.manager.js'
import {CommandData} from '../../types/data.type.js'
import {REPLY_SWITCH} from '../enums/CustomIds.enum.js'
import {Reply} from '../Reply.js'

class ReplyInteraction extends PrivateHandler {
    protected async run({interaction, data}: ButtonHandlerOptions<CommandData>) {
        const {command} = data
        const {reply} = await SettingsCommandsManager.getOne(interaction.guildId, command)
        await SettingsCommandsManager.createOrUpdate(interaction.guildId, command, {reply: !reply})
        return new Reply(interaction).run(command)
    }
}

export default new ReplyInteraction(REPLY_SWITCH)