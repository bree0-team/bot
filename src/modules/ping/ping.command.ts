import {ChatInputCommandInteraction} from 'discord.js'
import {iReply} from '../../services/interaction.js'
import {Command, CommandBuilder} from '../../builders/slash.js'

const slashCommand = new CommandBuilder('ping')

class PingCommand extends Command {
    chatInputRun = (interaction: ChatInputCommandInteraction) => iReply({
        interaction, replyData: {content: `🏓 Pong... Latency is ${Math.round(interaction.client.ws.ping)}ms.`}
    })
}

export default new PingCommand(slashCommand)