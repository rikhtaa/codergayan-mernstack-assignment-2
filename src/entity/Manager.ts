import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Admin } from './Admin'
@Entity({ name: 'manager' })
export class Manager {
    @PrimaryGeneratedColumn()
    id!: number

    @Column('varchar', { length: 100, unique: true })
    email!: string

    @Column('varchar', { length: 255 })
    password!: string

    @ManyToOne(() => Admin, (admin) => admin.managers)
    createdBy!: Admin
}
