import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import Order from '../entity/Order';
import Product from '../entity/Product';
import User from '../entity/User';
import AbstractSeed from './AbstractSeed';

export default class OrdersSeed extends AbstractSeed<Order> {

    @InjectRepository(Order)
    private ordersRepo: Repository<Order>;

    @InjectRepository(User)
    private usersRepo: Repository<User>;

    @InjectRepository(Product)
    private productsRepo: Repository<Product>;

    public async seed() {
        const user_1 = await this.usersRepo.findOneOrFail('user@mail.com');
        const orders: Order[] = [
            {
                user: user_1,
                product: await this.productsRepo.findOneOrFail('ninja-tō'),
            },
            {
                user: user_1,
                product: await this.productsRepo.findOneOrFail('shinobi shōzoku'),
            },
        ];

        return this.ordersRepo.save(orders);
    }
}
