import { get } from 'lodash';
import {EntityRepository, Repository} from 'typeorm';
import Pagination from '../common/Pagination';
import Product from '../entity/Product';
import { updateError } from '../tools/ErrorTools';

@EntityRepository(Product)
export default class ProductsRepository extends Repository<Product> {

    public async findMany(searchProductName?: string, categoryName?: string, pagination?: Pagination) {
        try {
            const query = this.createQueryBuilder('product')
                .innerJoinAndSelect('product.category', 'category');

            if (categoryName) {
                query.where('category.name = :categoryName', { categoryName });
            }

            if (searchProductName) {
                query.andWhere(`product.name LIKE :searchProductName`, { searchProductName: `%${searchProductName}%` });
            }

            const products = await query
                .skip(get(pagination, 'skip'))
                .take(get(pagination, 'take'))
                .getMany();

            return {
                products,
            };
        } catch (e) {
            throw updateError(e, 'Can\'t find product');
        }
    }

}
