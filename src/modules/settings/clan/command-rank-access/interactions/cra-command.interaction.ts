import {PrivateHandler, SelectManyValuesHandlerOptions} from '../../../../../handlers/interaction.js'
import {CommandRankAccessData} from '../../types/data.type.js'
import {CommandRankAccess} from '../CommandRankAccess.js'
import {CRA_COMMAND} from '../enums/CustomIds.enum.js'
import SettingsClanCommandRankAccessManager from '../managers/settings-clan-command-rank-access.manager.js'
import {AllCommandsAccess} from '../types/access.type.js'

class CRACommandInteraction extends PrivateHandler {
    protected async runValues(
        {interaction, values, data}: SelectManyValuesHandlerOptions<AllCommandsAccess, CommandRankAccessData>
    ) {
        const {rank} = data
        await SettingsClanCommandRankAccessManager.createOrUpdate(interaction.guildId, {[rank]: values.sort()})
        return new CommandRankAccess(interaction).run(rank, values)
    }
}

export default new CRACommandInteraction(CRA_COMMAND)