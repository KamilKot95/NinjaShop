import { get, pick } from 'lodash';
import { ExpressErrorMiddlewareInterface, Middleware } from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { Logger } from 'winston';
import { BetterError } from '../common/BetterError';

@Middleware({ type: 'after' })
@Service()
export default class ErrorHandler implements ExpressErrorMiddlewareInterface {

    @Inject('logger')
    private logger: Logger;

    private errorToResponse(error: BetterError & { errors }) {
        return error.msgForUser ||
            get(
                {
                    BadRequestError: pick(error, ['message', 'errors']),
                    ParamRequiredError: error.message,
                    NotFoundError: 'NotFoundError',
                    EntityNotFound: 'EntityNotFound',
                    UnauthorizedError: 'UnauthorizedError',
                    AuthenticationError: 'AuthenticationError',
                },
                error.name,
                'Unknown error',
            );
    }

    public error(error: BetterError & { errors }, request: any, response: any, next: (err: any) => any) {
        this.logger.error(error);
        response
            .status(error.httpCode || 500)
            .send({ error: this.errorToResponse(error) });
    }

}
