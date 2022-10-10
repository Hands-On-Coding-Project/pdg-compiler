import { expect } from 'chai';
import chai from 'chai';
import supertest from 'supertest';
import server from '../server.js';

describe('Hello World Python', () => {

    describe('/POST Correct code in Python', () => {
        it('it should return an output and a 10 code', async () => {
            const code = `print('hello world')` 
            const data = {
                language: "python",
                code: code
            };
            const response = await supertest(server).post('/compileInput')
                                            .send(data)
            expect(response.status).to.eql(200);
            expect(response.body.msg).to.eql('hello world\n');
            expect(response.body.code).to.eql(10);
        });
    });
});

describe('Hello World C++', () => {

    describe('/POST Correct code in C++', () => {
        it('it should return an output and a 10 code', async () => {
            const code = `#include <iostream>
            int main() {
                std::cout << "hello world" << std::endl;
                return 0;
            }
            `
            const data = {
                language: "cpp",
                code: code
            };
            const response = await supertest(server).post('/compileInput')
                                            .send(data)
            expect(response.status).to.eql(200);
            expect(response.body.msg).to.eql('hello world\n');
            expect(response.body.code).to.eql(10);
        });
    });
});

describe('Hello World Node', () => {

    describe('/POST Correct code in Node', () => {
        it('it should return an output and a 10 code', async () => {
            const code = `console.log('hello world')`
            const data = {
                language: "javascript",
                code: code
            };
            const response = await supertest(server).post('/compileInput')
                                            .send(data)
            expect(response.status).to.eql(200);
            expect(response.body.msg).to.eql('hello world\n');
            expect(response.body.code).to.eql(10);
        });
    });
});