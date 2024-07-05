import {EmbedBuilder, User} from 'discord.js'
import {ChannelId, UserId} from '../../../../../types/base.type.js'
import {PagesItems, SplitUtils} from '../../../../../utils/split.js'
import QaManager from '../../../../qa/managers/qa.manager.js'
import {QaModel} from '../../../../qa/models/qa.model.js'
import {BaseStats} from '../../structures/BaseStats.js'

export abstract class BaseQa extends BaseStats {
    embed = (user: User, after: string): EmbedBuilder => super.embed(user, after)
        .setAuthor({name: user.displayName, iconURL: user.avatarURL()})
    getQa(userId: UserId, channelId: ChannelId, after: Date, page: number, limit: number): PagesItems<QaModel> {
        const allData = QaManager.findAll().reverse()
            .filter(i => i.userId === userId && i.channelId === channelId && i.createdAt >= after)
            .map(i => i)
        return SplitUtils.getPages(allData, page, limit)
    }
}