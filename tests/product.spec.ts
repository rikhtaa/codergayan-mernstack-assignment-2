import { DataSource } from 'typeorm'
import { app } from '../src/server'
import request from 'supertest'
import { AppDataSource } from '../src/config/Data_Source'
describe("Product Routes", ()=>{
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
    describe('POST /product', () => {
    describe('given all fields', () => {
        it("should give all the fields", async()=>{
           const productData = {
            name: "codebite",
            description: "ed tech"
           }
           const response = await request(app).post('/product').send(productData)
    
           expect(response.statusCode).toBe(201)
        })
         it("should return return valid json", async()=>{
             const productData = {
            name: "mac book",
            description: "The mac book"
           }
           const response = await request(app).post('/product').send(productData)
    
           expect((response.headers as Record<string, string>)['content-type'], 
        ).toEqual(expect.stringContaining('json'))
        })
        it('should return the id of the created user', async()=>{
             const productData = {
            id: 1,
            name: "macbook",
            description: "The mac book"
           }
           const response = await request(app).post('/product').send(productData)
            console.log(response.body)
           expect(response.body).toHaveProperty('id')
             expect(response.statusCode).toBe(201);
    
        })
    })
    describe('Fields are missing', () => {
        it("should return 400 if name field is missing", async()=>{
             const productData = {
            name: "",
            description: "ed tech"
           }
           const response = await request(app).post('/product').send(productData)
    
           expect(response.statusCode).toBe(400)
        })
        it("should return 400 if description field is missing", async()=>{
             const productData = {
            name: "mac book",
            description: ""
           }
           const response = await request(app).post('/product').send(productData)
           expect(response.statusCode).toBe(400)
        })
    })
    })
    describe('GET /product',()=>{
      describe("Given all fields", ()=>{
      it("Should return all products", async()=>{

        await request(app).post('/product').send({ name: "codebite1", description: "ed tech1" });
        await request(app).post('/product').send({ name: "codebite2", description: "ed tech2" });
         await request(app).post('/product').send({ name: "codebite3", description: "ed tech3" });

           const response = await request(app).get("/product")
           expect(response.body.allProducts).toHaveLength(3)  
      })
      it("Should return 200 statusCode", async()=>{

         await request(app).post('/product').send({ name: "codebite3", description: "ed tech3" });

           const response = await request(app).get("/product")
           expect(response.statusCode).toBe(200) 
      })
      })
    })
})