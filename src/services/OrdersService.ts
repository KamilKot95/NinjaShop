import { Inject, Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { newOrderEmail } from '../emailTemplates/NewOrderEmail';
import Order from '../entity/Order';
import Product from '../entity/Product';
import User from '../entity/User';
import SendEmailProvider from '../providers/SendEmailProvider';
import OrdersRepository from '../repositories/OrdersRepository';
import { updateError } from '../tools/errorTools';

@Service()
export default class OrdersService {

    @InjectRepository(Order)
    private ordersRepo: OrdersRepository;

    @InjectRepository(Product)
    private productsRepo: Repository<Product>;

    @InjectRepository(User)
    private usersRepo: Repository<User>;

    @Inject()
    private sendEmailProvider: SendEmailProvider;

    public async getOrders() {
        try {
            return this.ordersRepo.findWithDetails();
        } catch (e) {
            throw updateError(e, 'Can\'t get orders');
        }
    }

    public async createOrder(productName: string, userEmail: string) {
        try {
            const product = await this.productsRepo.findOneOrFail(productName);
            const user = await this.usersRepo.findOneOrFail(userEmail);
            const order: Order = { product, user };

            const price = product.price;
            const emailText = newOrderEmail.render(user.name, productName, price.value, price.currency);
            await this.sendEmailProvider.sendEmail(userEmail, newOrderEmail.subject, emailText);

            return this.ordersRepo.create(order);
        } catch (e) {
            throw updateError(e, 'Can\'t create order');
        }
    }
}
