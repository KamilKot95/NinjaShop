import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
export default class User {

    @PrimaryColumn({ length: 40 })
    public email!: string;

    @Column({ length: 15 })
    public name!: string;

    @Column()
    public passwordHash!: string;

    @Column({ default: false })
    public isAdmin?: boolean;

    @CreateDateColumn()
    // tslint:disable-next-line:no-unused-variable
    private createdAt?: Date;

}
