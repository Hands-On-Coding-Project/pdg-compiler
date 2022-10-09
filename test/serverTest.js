import { expect } from 'chai'
import chai from 'chai'
import supertest from 'supertest'
import server from '../server.js'

describe('Hola', () => {

    describe('/GET Hola', () => {
        it('it should get Hola', async () => {
            const response = await supertest(server).get('/hola');
            console.log('hello');
            expect(response.status).to.eql(200);
            expect(response.body.msg).to.eql('hola');
        });
    });
});