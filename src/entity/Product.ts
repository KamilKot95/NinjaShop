import {
    Column, CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryColumn,
} from 'typeorm';
import Price from '../types/Price';
import Category from './Category';

@Entity('products')
export default class Product {

    @PrimaryColumn({ length: 30 })
    public name!: string;

    @Column({ nullable: true, length: 300 })
    public imageUrl?: string;

    @Column('simple-json')
    public price!: Price;

    @Column({ nullable: true, length: 500 })
    public description?: string;

    @ManyToOne(() => Category, category => category.name, { nullable: false })
    public category!: Category;

    @CreateDateColumn()
    // tslint:disable-next-line:no-unused-variable
    private createdAt?: Date;

}
