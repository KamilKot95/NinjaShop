import * as jwt from 'jsonwebtoken';
import * as passport from 'passport';
import { BodyParam, Controller, Post, Req, Res } from 'routing-controllers';
import { Inject } from 'typedi';
import AuthService from '../services/AuthService';
import { createError, updateError } from '../tools/errorTools';

@Controller('/auth')
export default class AuthController {

    @Inject()
    private authService: AuthService;

    @Post('/login')
    public async login(
        @Req() req: any,
        @Res() res,
        @BodyParam('email', { required: true }) email: string,
        @BodyParam('password', { required: true }) password: string,
    ) {
        try {
            return await new Promise((resolve, reject) => {
                passport.authenticate('local', { session: false }, async (err, user, info) => {
                    try {
                        if (!user) {
                            throw createError('Invalid credentials', false, undefined, 403); // todo update
                        }
                        const token = jwt.sign(user, process.env.JWT_SECRET_KEY);
                        resolve({ user, token });
                    } catch (e) {
                        const errorMsg = 'Authenticate error';
                        reject(updateError(e, errorMsg));
                    }
                })(req, res);
            });
        } catch (e) {
            const errorMsg = 'Can\'t handle request - login user';
            throw updateError(e, errorMsg);
        }
    }

    @Post('/register')
    public async register(
        @BodyParam('email', { required: true }) email: string,
        @BodyParam('name', { required: true }) name: string,
        @BodyParam('password', { required: true }) password: string,
    ) {
        try {
            await this.authService.register(email, name, password)
                .catch(e => {
                    throw updateError(e, 'Can\'t login user');
                });

            return { success: true };
        } catch (e) {
            const errorMsg = 'Can\'t handle request - register user';
            throw updateError(e, errorMsg);
        }
    }

}
