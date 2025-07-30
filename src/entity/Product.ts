import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm'
import { Item } from './Item'
@Entity({ name: 'product' })
export class Product {
    @PrimaryGeneratedColumn()
    id!: number

    @Column('varchar', { length: 100 })
    name!: string

    @Column('varchar', { length: 100, unique: true })
    description!: string

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

    @OneToMany(() => Item, (item) => item.product)
    items!: Item[]
}
