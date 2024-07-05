import {CustomError} from '../general.js'

abstract class ForbiddenError extends CustomError {
    public name = 'ForbiddenError'
}

export abstract class MissingPermissionError extends ForbiddenError {
    public name = 'MissingPermissionError'
}