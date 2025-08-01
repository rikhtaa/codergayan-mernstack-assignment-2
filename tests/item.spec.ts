import { DataSource } from 'typeorm'
import { AppDataSource } from '../src/config/Data_Source'
import { app } from '../src/server'
import request from 'supertest'

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
        it("should retrun 201 statusCode", async()=>{

        await request(app).post('/product').send({ name: "codebite1", description: "ed tech1" });
        const itemData = {
            price: 400,
            productId: 1 
            }
        const response = await request(app).post('/item').send(itemData)
        expect(response.statusCode).toBe(201)
        })
        it("should return return valid json", async()=>{
            const itemData = {
                price: 400,
                productId: 1 
                }
           const response = await request(app).post('/item').send(itemData)
                   
            expect((response.headers as Record<string, string>)['content-type'], 
                       ).toEqual(expect.stringContaining('json'))
        })
         it('should return the id of the created item', async()=>{
                const productResponse = await request(app).post('/product').send({ name: "codebite001", description: "codebite001" });
                    const productId = productResponse.body.id
                     const itemData = {
                    price: 400,
                    productId, 
                   }
                   const response = await request(app).post('/item').send(itemData)
                   expect(response.body.item).toHaveProperty('id')
                     expect(response.statusCode).toBe(201);
            
        })
    })
     describe('Fields are missing', () => {
      it("should return 400 if price field is missing", async()=>{
            const itemData = {
            productId: 1 
            }
                 const response = await request(app).post('/item').send(itemData)
          
                 expect(response.statusCode).toBe(400)
        })
    })
})
})