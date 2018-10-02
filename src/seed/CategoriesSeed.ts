import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import Category from '../entity/Category';
import AbstractSeed from './AbstractSeed';

@Service()
export default class CategoriesSeed extends AbstractSeed<Category> {
    @InjectRepository(Category)
    private categoriesRepo: Repository<Category>;

    public seed() {
        const categoriesData: Category[] = [
            { name: 'weapons' },
            { name: 'outerwear' },
        ];

        return this.categoriesRepo.save(categoriesData);
    }
}
