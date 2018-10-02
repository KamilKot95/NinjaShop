import 'reflect-metadata';
import { Container, Service } from 'typedi';
import { createConnection, useContainer } from 'typeorm';
import { Logger } from 'winston';
import InitLogger from '../app/InitLogger';
import AbstractSeed from './AbstractSeed';
import CategoriesSeed from './CategoriesSeed';
import OrdersSeed from './OrdersSeed';
import ProductsSeed from './ProductsSeed';
import UsersSeed from './UsersSeed';

@Service()
class SeedExecutor {

    private logger: Logger;

    constructor() {
        useContainer(Container);
        this.logger = new InitLogger().init();
    }

    public async seed() {
        try {
            await createConnection();
            const seedList: Array<AbstractSeed<object>> = [
                Container.get<CategoriesSeed>(CategoriesSeed),
                Container.get<ProductsSeed>(ProductsSeed),
                Container.get<UsersSeed>(UsersSeed),
                Container.get<OrdersSeed>(OrdersSeed),
            ];
            for (const seedElement of seedList) {
                await seedElement.seed();
            }
        } catch (e) {
            this.logger.error(e);
        }
    }
}

new SeedExecutor().seed();
