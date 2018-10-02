import { Controller, Get, Param, QueryParam } from 'routing-controllers';
import { Inject } from 'typedi';
import ProductsService from '../services/ProductsService';
import { updateError } from '../tools/errorTools';
import paginationResolver from '../tools/PaginationResolver';
import PaginationParams from '../validators/PaginationParams';

@Controller('/products')
export default class ProductsController {

    @Inject()
    private productsService: ProductsService;

    @Get('/')
    public async getProducts(
        @QueryParam('category') categoryName: string,
        @QueryParam('searchProduct') searchProductName: string,
        @QueryParam('pagination') paginationParams: PaginationParams,
    ) {
        try {
            const pagination = paginationResolver(paginationParams);

            return  {
                ...await this.productsService.find(searchProductName, categoryName, pagination),
                paginationParams,
            };
        } catch (e) {
            const errorMsg = 'Can\'t handle request - get products';
            throw updateError(e, errorMsg);
        }
    }

    @Get('/:name')
    public async getProductsByName(@Param('name') name: string) {
        try {
            return await this.productsService.findByName(name);
        } catch (e) {
            const errorMsg = 'Can\'t handle request - get product by name';
            throw updateError(e, errorMsg);
        }
    }

}
