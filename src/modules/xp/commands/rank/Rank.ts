import {BaseCommands} from '../structures/BaseCommands.js'
import {View} from './View.js'

export class Rank extends BaseCommands {
    async run() {
        const user = this.getUser('user', false) ?? this.user
        return new View(this.i).run(user.id)
    }
}