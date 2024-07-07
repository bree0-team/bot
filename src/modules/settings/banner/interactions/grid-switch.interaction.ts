import {ButtonHandlerOptions, PrivateHandler} from '../../../../handlers/interaction.js'
import {BannerImage} from '../../../banner/BannerImage.js'
import {BannerImageManager} from '../../../banner/managers/banner-image.manager.js'
import {Banner} from '../Banner.js'
import {GRID_SWITCH} from '../enums/CustomIds.enum.js'

class GridSwitchInteraction extends PrivateHandler {
    protected async run({interaction}: ButtonHandlerOptions) {
        const imageManager = BannerImageManager.findOne(interaction.guildId)
        await new BannerImage(interaction.guild).run(true, !imageManager?.grid)
        return new Banner(interaction).run()
    }
}

export default new GridSwitchInteraction(GRID_SWITCH)