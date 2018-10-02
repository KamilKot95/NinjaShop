import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import Pagination from '../common/Pagination';
import Product from '../entity/Product';
import ProductsRepository from '../repositories/ProductsRepository';
import { updateError } from '../tools/errorTools';

@Service()
export default class ProductsService {

    @InjectRepository(Product)
    private productsRepo: ProductsRepository;

    public async find(searchProductName?: string, categoryName?: string, pagination?: Pagination) { // todo
        try {
            return await this.productsRepo.findMany(searchProductName, categoryName, pagination);
        } catch (e) {
            throw updateError(e, 'Can\'t find product');
        }
    }

    public async findByName(name: string) {
        try {
            return await this.productsRepo.findOneOrFail(name);
        } catch (e) {
            const msg = 'Can\'t find product by name';
            throw updateError(e, msg, msg, e.name === 'EntityNotFound' ? 404 : undefined);
        }
    }

}
