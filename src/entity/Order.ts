import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Product from './Product';
import User from './User';

@Entity('orders')
export default class Order {

    @PrimaryGeneratedColumn()
    // tslint:disable-next-line:no-unused-variable
    private id?: number;

    @ManyToOne(() => User, user => user.email, { nullable: false })
    public user!: User;

    @ManyToOne(() => Product, product => product.name, { nullable: false })
    public product!: Product;

    @CreateDateColumn()
    // tslint:disable-next-line:no-unused-variable
    private createdAt?: Date;

}
