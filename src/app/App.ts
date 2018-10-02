import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as fs from 'fs';
import * as https from 'https';
import * as methodOverride from 'method-override';
import * as passport from 'passport';
import 'reflect-metadata';
import { useExpressServer } from 'routing-controllers';
import {useContainer as routingUseContainer} from 'routing-controllers';
import { Container } from 'typedi';
import { createConnection, useContainer } from 'typeorm';
import AuthController from '../controllers/AuthController';
import OrdersController from '../controllers/OrdersController';
import ProductsController from '../controllers/ProductsController';
import ErrorHandler from '../middlewares/ErrorHandler';
import AuthStrategy from './AuthStrategy';
import InitLogger from './InitLogger';

(async () => {
    const logger = new InitLogger().init();
    Container.set('logger', logger);

    useContainer(Container);
    routingUseContainer(Container);

    await createConnection()
        .catch(error => logger.error(error));

    Container.get(AuthStrategy).init();

    let app: express.Application = express();
    app = configureApp(app);

    useExpressServer(app, {
        defaultErrorHandler: false, // disable default error handler, only if you have your own error handler\
        routePrefix: '/api/v1',
        controllers: [AuthController, ProductsController, OrdersController],
        middlewares: [ErrorHandler],
    });

    const PORT = 3000;
    https.createServer({
        key: fs.readFileSync('data/httpsKeys/server.key'),
        cert: fs.readFileSync('data/httpsKeys/server.cert'),
    }, app)
        .listen(PORT, () => {
            logger.info('Express server listening on port ' + PORT);
        });
})();

function configureApp(app: express.Application) {
    app.use(bodyParser.json());
    // support application/x-www-form-urlencoded post data
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(/^((?!auth).)*/, passport.authenticate('jwt', { session: false, failWithError: true }));
    app.use(methodOverride());
    // app.use(flash());

    return app;
}
