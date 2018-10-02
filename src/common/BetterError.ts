export type BetterError = Error & { msgForUser: string, simpleStack?: string, httpCode: number };
