import { BetterError } from '../common/BetterError';

export function updateError(e: Error, simpleStack: string, msgForUser?: string, httpCode?: number) {
    if (msgForUser) {
        e['msgForUser'] = (msgForUser && e['msgForUser']) ?
            `${msgForUser} <= ${e['msgForUser']}` :
            msgForUser;
    }

    /** stacktrace in js is actually not readable and incomplete with async code,
     * keeping own 'simple stack' is solution
     * but we must remember to not return error details to front
     */
    e['simpleStack'] = e['simpleStack'] ?
        `${simpleStack} <= ${e['simpleStack']}` :
        simpleStack;

    if (httpCode) {
        e['httpCode'] = httpCode;
    }

    return e;
}

export function createError(message: string, isMsgSecret: boolean = true, msgForUser?: string, httpCode?: number): BetterError {
    return {
        ...new Error(),
        message,
        simpleStack: undefined,
        msgForUser: isMsgSecret ? msgForUser : message,
        httpCode,
    };
}
