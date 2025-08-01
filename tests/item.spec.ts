import { DataSource } from 'typeorm'
import { AppDataSource } from '../src/config/Data_Source'
describe("Item Routes", ()=>{
  let connection: DataSource
    beforeAll(async () => {
        connection = await AppDataSource.initialize()
    })

    beforeEach(async () => {
        await connection.dropDatabase()
        await connection.synchronize(true)
    })

    afterAll(async () => {
        await connection.destroy()
    })
    describe('POST /Item', () => {
    describe('given all fields', () => {
       
    })
})
})