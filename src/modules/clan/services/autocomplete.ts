import {EmojiService} from 'emoji-library'
import {Autocomplete, AutocompleteChoice} from '../../../services/interaction.js'
import ClanMemberManager from '../managers/clan-member.manager.js'
import ClanManager from '../managers/clan.manager.js'
import ClanRoleManager from '../role/managers/clan-role.manager.js'

export class ClanAutocomplete extends Autocomplete {
	clan(): void {
		this.choices = ClanManager.findAll()
			.filter(i => i.guildId === this.i.guildId)
			.map(i => ({ name: `${i.emoji} ${i.name}`, value: i.id.toString() } as AutocompleteChoice))
	}
	role(): void {
		const memberManager = ClanMemberManager.findOneByGuildId(this.guildId, this.userId)
		const roleManager = ClanRoleManager.findAll()
			.filter(i => i.guildId === this.guildId && i.clanId === memberManager.clanId)
		const sortedNames = roleManager
			.sort((a, b) => {
				if (a.isDefault === b.isDefault) return 0;
				if (b.isDefault !== null) return -1;
				return 1;
			})
		this.choices = sortedNames
			.map(item => ({ name: item.name, value: item.id.toString() } as AutocompleteChoice));
	}
	emoji(): void {
		this.choices = new EmojiService().getEmojiList()
			.map(i => ({ name: `${i.symbol} ${i.title}`, value: i._id } as AutocompleteChoice))
	}
}