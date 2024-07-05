import {ButtonHandlerOptions, PrivateHandler} from '../../../../../handlers/interaction.js'
import {Ad} from '../../Ad.js'
import {CLAN_AD_DELETE} from '../../enums/CustomIds.enum.js'
import {enabledAd} from '../../helpers/enabledAd.js'
import {getOwner} from '../../helpers/getOwner.js'
import ClanAdManager from '../../managers/clan-ad-manager.js'
import {AdEditData} from '../../types/data.type.js'

class DeleteInteraction extends PrivateHandler {
    protected async run({interaction, data}: ButtonHandlerOptions<AdEditData>) {
        getOwner(interaction)
        await enabledAd(interaction)
        const {clanAdId} = data
        await ClanAdManager.remove(clanAdId)
        return new Ad(interaction).run()
    }
}

export default new DeleteInteraction(CLAN_AD_DELETE)