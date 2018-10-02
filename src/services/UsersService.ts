import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import User from '../entity/User';

@Service()
export default class UsersService {

    @InjectRepository(User)
    private usersRepo: Repository<User>;

    public getUser(email: string) {
        return this.usersRepo.findOneOrFail({ where: { email } });
    }
}
