import {PrivateHandler, SelectOneValueHandlerOptions} from '../../../../../handlers/interaction.js'
import {ClanRank} from '../../../../clan/enums/ClanRank.enum.js'
import {CommandRankAccess} from '../CommandRankAccess.js'
import {CRA_RANK} from '../enums/CustomIds.enum.js'
import SettingsClanCommandRankAccessManager from '../managers/settings-clan-command-rank-access.manager.js'

class CRARankInteraction extends PrivateHandler {
    protected async runValue({interaction, value}: SelectOneValueHandlerOptions<ClanRank>) {
        const craManager = await SettingsClanCommandRankAccessManager
            .getOne(interaction.guildId)
        return new CommandRankAccess(interaction).run(value, craManager[value])
    }
}

export default new CRARankInteraction(CRA_RANK)