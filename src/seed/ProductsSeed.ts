import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import Category from '../entity/Category';
import Product from '../entity/Product';
import { Currency } from '../types/Currency';
import AbstractSeed from './AbstractSeed';

export default class ProductsSeed extends AbstractSeed<Product> {

    @InjectRepository(Product)
    private productsRepo: Repository<Product>;

    @InjectRepository(Category)
    private categoriesRepo: Repository<Category>;

    public async seed() {
        const weapons = await this.categoriesRepo.findOneOrFail('weapons');
        const outerwear = await this.categoriesRepo.findOneOrFail('outerwear');

        const products: Product[] = [
            {
                name: 'ninja-tō',
                description: 'Short sword',
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Ninto.png',
                price: this.getSeedPrice(120),
                category: weapons,
            },
            {
                name: 'karuta',
                description: 'lightweight, folding armor',
                imageUrl: `https://upload.wikimedia.org/wikipedia/commons/\
thumb/b/be/Tatami_gusoku_Met_14.100.538_n2.jpg/800px-Tatami_gusoku_Met_14.100.538_n2.jpg`,
                price: this.getSeedPrice(20),
                category: outerwear,
            },
            {
                name: 'kunai',
                description: 'multi-functional weapon, popular before the wide spread of firearms',
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Kunai05.jpg',
                price: this.getSeedPrice(21.20),
                category: weapons,
            },
            {
                name: 'kusari',
                description: 'chain mail armour',
                imageUrl: `https://upload.wikimedia.org/wikipedia/commons/\
thumb/a/a9/Japanese_kusari_armor.JPG/675px-Japanese_kusari_armor.JPG`,
                price: this.getSeedPrice(13.99),
                category: outerwear,
            },
            {
                name: 'kusari-gama',
                description: `weapon that consists of a kama (the Japanese equivalent of a sickle)\
on a kusari-fundo – a type of metal chain with a heavy iron weight`,
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Kusarigama.jpg/675px-Kusarigama.jpg',
                price: this.getSeedPrice(50),
                category: weapons,
            },
            {
                name: 'shinobi shōzoku',
                imageUrl: 'https://i.pinimg.com/236x/f2/08/0f/f2080fa1f2c2c4fba5d271ef01a2f9e6--real-ninja-warriors.jpg',
                description: 'popular black garb',
                price: this.getSeedPrice(40),
                category: outerwear,
            },
            {
                name: 'tessen',
                description: 'war fan',
                imageUrl: `https://upload.wikimedia.org/wikipedia/commons/thumb\
/5/56/Gunsen_Asian_Art_Museum_SF.JPG/1059px-Gunsen_Asian_Art_Museum_SF.JPG`,
                price: this.getSeedPrice(12.80),
                category: weapons,
            },
            {
                name: 'tenugui',
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Tenugui.jpg',
                description: 'headbands',
                price: this.getSeedPrice(9999),
                category: outerwear,
            },
        ];

        return this.productsRepo.save(products);
    }

    private getSeedPrice(value: number) {
        return {
            value,
            currency: Currency.NINJOLLARS,
        };
    }
}
