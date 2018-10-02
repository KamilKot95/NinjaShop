import {EntityRepository, Repository} from 'typeorm';
import Order from '../entity/Order';

@EntityRepository(Order)
export default class OrdersRepository extends Repository<Order> {

    public findWithDetails() {
        return this.createQueryBuilder('order')
            .innerJoinAndSelect('order.user', 'user')
            .innerJoinAndSelect('order.product', 'product')
            .getMany();
    }

}
