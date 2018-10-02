import * as bcrypt from 'bcrypt-nodejs';
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import User from '../entity/User';
import { createError, updateError } from '../tools/errorTools';

@Service()
export default class AuthService {

    @InjectRepository(User)
    private usersRepo: Repository<User>;

    public async login(email: string, password: string) {
        try {
            let user;
            try {
                user = await this.usersRepo.findOneOrFail(email);
            } catch (e) {
                throw new Error('Invalid credentials'); // todo
            }
            if (bcrypt.compareSync(password, user.passwordHash)) {
                return user;
            }
            throw new Error('Invalid credentials'); // todo
        } catch (e) {
            throw updateError(e, 'Can\'t login');
        }
    }

    public async register(email: string, name: string, password: string) {
        try {
            const user = await this.usersRepo.findOne(email);
            if (user) {
                throw createError('Account with this email already exist', false);
            }

            const passwordHash = bcrypt.hashSync(password);

            const newUser: User = {
                email,
                name,
                passwordHash,
            };

            return this.usersRepo.insert(newUser);
        } catch (e) {
            throw updateError(e, 'Can\'t register');
        }
    }
}
