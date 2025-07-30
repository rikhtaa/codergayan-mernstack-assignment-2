import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Manager } from './Manager'
@Entity({ name: 'admin' })
export class Admin {
    @PrimaryGeneratedColumn()
    id!: number

    @Column('varchar', { length: 100 })
    firstName!: string

    @Column('varchar', { length: 100, unique: true })
    email!: string

    @Column('varchar', { length: 255 })
    password!: string

    @Column()
    role!: string

    @OneToMany(() => Manager, (manager) => manager.createdBy)
    managers!: Manager[]
}
