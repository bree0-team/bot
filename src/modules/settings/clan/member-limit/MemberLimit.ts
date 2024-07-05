import {bold, InteractionReplyOptions} from 'discord.js'
import _ from 'lodash'
import {InteractionReplyComponent} from '../../../../services/interaction.js'
import {MAIN_SELECT} from '../../enums/CustomIds.enum.js'
import {SettingsClanSelectValuesCustomIds} from '../enums/CustomIds.enum.js'
import SettingsClanManager from '../managers/settings-clan.manager.js'
import {BaseSettingsClan} from '../structures/BaseSettingsClan.js'
import {MEMBER_LIMIT_RESET, MEMBER_LIMIT} from './enums/CustomIds.enum.js'

export class MemberLimit extends BaseSettingsClan {
    async run() {
        const {member_limit} = await SettingsClanManager.getOne(this.guildId)
        const embed = this.embed()
            .setDescription([
                this.t('settings:clan:members_limit:description'),
                '',
                bold(this.t('settings:clan:options:limit') + ': ')
                + (_.isInteger(member_limit) ? `\`${member_limit}\`` : this.t('no')),
            ].join('\n'))
        const components: InteractionReplyComponent[] = [
            this.select(SettingsClanSelectValuesCustomIds.MembersLimit),
            this.back(MAIN_SELECT,
                this.editReset(MEMBER_LIMIT, MEMBER_LIMIT_RESET,
                    member_limit === null)
            )
        ]
        const replyData: InteractionReplyOptions = {embeds: [embed], components}
        return this.reply({replyData})
    }
}