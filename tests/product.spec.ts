import { DataSource } from 'typeorm'
import { app } from '../src/server'
import request from 'supertest'
import { AppDataSource } from '../src/config/Data_Source'
describe('POST /product', () => {
     let connection: DataSource
    beforeAll(async () => {
        connection = await AppDataSource.initialize()
    })

    beforeEach(async () => {
        await connection.dropDatabase()
        await connection.synchronize()
    })

    afterAll(async () => {
        await connection.destroy()
    })
describe('give all fields', () => {
    it("should give all the fields", async()=>{
       const productData = {
        name: "codebite",
        description: "ed tech"
       }
       const response = await request(app).post('/product').send(productData)

       expect(response.statusCode).toBe(201)
    })
})
})
