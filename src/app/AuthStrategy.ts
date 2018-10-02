import { pick } from 'lodash';
import * as passport from 'passport';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';
import { IVerifyOptions, Strategy as LocalStrategy } from 'passport-local';
import { UnauthorizedError } from 'routing-controllers';
import { Inject, Service } from 'typedi';
import User from '../entity/User';
import AuthService from '../services/AuthService';
import UsersService from '../services/UsersService';

@Service()
export default class AuthStrategy {

    @Inject()
    private authService: AuthService;

    @Inject()
    private usersService: UsersService;

    private mapUserToJwtPayload(user: User) {
        return pick(user, ['email', 'isAdmin']);
    }

    public init() {
        passport.use(
            new LocalStrategy(
                {
                    usernameField: 'email',
                    passwordField: 'password',
                },
                async (email, password, done: (error: any, user?: any, options?: IVerifyOptions) => void) => {
                    const user = await this.authService.login(email, password)
                        .catch(err => done(err, null));

                    const jwtPayload = this.mapUserToJwtPayload(user);

                    return done(null, jwtPayload, { message: 'Logged In Successfully' }); // todo
                },
            ),
        );

        passport.use(new JWTStrategy({
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: process.env.JWT_SECRET_KEY,
            },
            async (jwtPayload, done) => {
                try {
                    const user = await this.usersService.getUser(jwtPayload.email);

                    return done(null, user);
                } catch (e) {
                    done(new UnauthorizedError('Invalid token'));
                }
            },
        ));
    }
}
