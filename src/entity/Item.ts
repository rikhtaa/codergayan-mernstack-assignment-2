import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm'
import { Product } from './Product'
@Entity({ name: 'item' })
export class Item {
    @PrimaryGeneratedColumn()
    id!: number

    @Column('decimal')
    price!: number

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

    @ManyToOne(() => Product, (product) => product.items)
    product!: Product
}
