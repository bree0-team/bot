import {EmbedBuilder, User} from 'discord.js'
import {UserId} from '../../../../../types/base.type.js'
import {PagesItems, SplitUtils} from '../../../../../utils/split.js'
import MunManager from '../../../../mun/managers/mun.manager.js'
import {MunModel} from '../../../../mun/models/mun.model.js'
import {BaseStats} from '../../structures/BaseStats.js'

export abstract class BaseMun extends BaseStats {
    embed = (user: User, after: string): EmbedBuilder => super.embed(user, after)
        .setAuthor({name: user.displayName, iconURL: user.avatarURL()})
    getMun(userId: UserId, after: Date, page: number, limit: number): PagesItems<MunModel> {
        const allData = MunManager.findAll().reverse()
            .filter(i => i.changerId === userId && i.guildId === this.guildId && i.createdAt >= after)
            .map(i => i)
        return SplitUtils.getPages(allData, page, limit)
    }
}