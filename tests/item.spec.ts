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
    describe('POST /item', () => {
         const itemData = {
            price: 400,
            productId: 1 
            }
        const productData = { 
            name: "codebite1", 
            description: "ed tech1" 
        }
    describe('given all fields', () => {
        it("should retrun 201 statusCode", async()=>{

        await request(app).post('/product').send(productData);
       
        const response = await request(app).post('/item').send(itemData)
        expect(response.statusCode).toBe(201)
        })
        it("should return return valid json", async()=>{
           const response = await request(app).post('/item').send(itemData)
                   
            expect((response.headers as Record<string, string>)['content-type'], 
                       ).toEqual(expect.stringContaining('json'))
        })
         it('should return the id of the created item', async()=>{
                const productResponse = await request(app).post('/product').send(productData);
                    const productId = productResponse.body.id
                     const itemData1 = {
                    price: 400,
                    productId, 
                   }
                   const response = await request(app).post('/item').send(itemData1)
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
      it("should return 400 if productId field is missing", async()=>{
            const itemData = {
            price: 200
            }
                 const response = await request(app).post('/item').send(itemData)
          
                 expect(response.statusCode).toBe(400)
        })
    })
    describe('GET /item', ()=>{
       describe("Given all fields", ()=>{
            it("Should return all items", async()=>{
              const productResponse = await request(app).post('/product').send(productData);
              const productId = productResponse.body.id 
      
              await request(app).post('/item').send({ price: 200, productId }); 
              await request(app).post('/item').send({ price: 300, productId });
               await request(app).post('/item').send({ price: 400, productId });
               
               const response = await request(app).get("/item")
                 expect(response.body.allItems).toHaveLength(3)  
            })
             it("Should return 200 statusCode", async()=>{
            const productResponse = await request(app).post('/product').send(productData);
            const productId = productResponse.body.id

            await request(app).post('/item').send({ price: 400, productId });
            
            const response = await request(app).get(`/item/${productId}`)
            console.log(response.status)
            expect(response.statusCode).toBe(200) 
            })
            it("should return the array if there is no items", async()=>{
                     const response = await request(app).get('/item')
                
                    expect(response.body.allItems).toEqual([])
                  })
       })
    })
})
})