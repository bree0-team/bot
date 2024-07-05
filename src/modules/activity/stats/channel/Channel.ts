import {Rank} from './Rank.js'
import {BaseChannel} from './structures/BaseChannel.js'

export class Channel extends BaseChannel {
    async run() {
        const channel = this.getChannel('channel')
        return new Rank(this.i).run(channel.id)
    }
}