import {CustomError} from '../general.js'

abstract class ForbiddenError extends CustomError {}

export abstract class MissingPermissionError extends ForbiddenError {}