import {PublicHandler} from '../../../../handlers/interaction.js'
import {ClanChannelButtonCustomIds} from '../enums/CustomIds.enum.js'

class SkipInteraction extends PublicHandler {}

export default new SkipInteraction([ClanChannelButtonCustomIds.Skip1, ClanChannelButtonCustomIds.Skip2])