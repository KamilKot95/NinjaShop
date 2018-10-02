import { CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('categories')
export default class Category {

    @PrimaryColumn({ length: 20 })
    public name!: string;

    @CreateDateColumn()
    // tslint:disable-next-line:no-unused-variable
    private createdAt?: Date;

}
