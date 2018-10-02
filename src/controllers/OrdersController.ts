import { Controller, Get, Param, Post, QueryParams, Req, Res } from 'routing-controllers';
import { Inject } from 'typedi';
import OrdersService from '../services/OrdersService';
import { createError, updateError } from '../tools/errorTools';

@Controller('/orders')
export default class OrdersController {

    @Inject()
    private ordersService: OrdersService;

    @Get('/')
    public async getOrders(@QueryParams() params, @Req() req, @Res() res) {
        try {
            if (req.user.isAdmin) {
                return await this.ordersService.getOrders();
            } else {
                throw createError('No access to get orders', false, undefined, 403);
            }
        } catch (e) {
            const errorMsg = 'Can\'t handle request - get orders';
            throw updateError(e, errorMsg);
        }
    }

    @Post('/:productName')
    public async createOrder(
        @Param('productName') productName: string,
        @Req() req,
    ) {
        try {
            return await this.ordersService.createOrder(productName, req.user.email);
        } catch (e) {
            const errorMsg = 'Can\'t handle request - create order';
            throw updateError(e, errorMsg);
        }
    }

}
