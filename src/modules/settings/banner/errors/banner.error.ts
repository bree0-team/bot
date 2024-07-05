import {RepliableInteraction} from 'discord.js'
import {CustomError} from '../../../../errors/general.js'
import {
    defaultMaxScale,
    defaultMaxX,
    defaultMaxY,
    defaultMinScale,
    defaultMinX,
    defaultMinY
} from '../constants/defaults.js'

abstract class BannerError extends CustomError {}

export class GraphXMinMaxError extends BannerError {
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('settings:error:banner_graph_min_max:x', {min: defaultMinX, max: defaultMaxX}))
    }
}

export class GraphYMinMaxError extends BannerError {
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('settings:error:banner_graph_min_max:y', {min: defaultMinY, max: defaultMaxY}))
    }
}

export class GraphScaleMinMaxError extends BannerError {
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('settings:error:banner_graph_min_max:scale', {min: defaultMinScale, max: defaultMaxScale}))
    }
}