import * as bcrypt from 'bcrypt-nodejs';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import User from '../entity/User';
import AbstractSeed from './AbstractSeed';

export default class UsersSeed extends AbstractSeed<User> {

    @InjectRepository(User)
    private usersRepo: Repository<User>;

    public async seed() {
        const usersWithNotHashedPass = [
            {
                email: `user@mail.com`,
                name: 'Jacek',
                password: `hardPassword`,
                isAdmin: false,
            },
            {
                email: `admin@mail.com`,
                name: 'Michał',
                password: `adminPassword`,
                isAdmin: true,
            },
        ];

        const users: any[] = usersWithNotHashedPass.map(
            user => ({
                email: user.email,
                name: user.name,
                passwordHash: bcrypt.hashSync(user.password),
                isAdmin: user.isAdmin,
            }),
        );

        return this.usersRepo.save(users);
    }
}
