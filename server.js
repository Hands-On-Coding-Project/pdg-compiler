import express from 'express';
import fs from 'fs';
import cors from 'cors';
import bodyParser from 'body-parser';
import { execute } from './compiler.js'
import { createLanguageObject } from './languageObject.js';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDocs from 'swagger-jsdoc';
import {swaggerJsDocOptions, swaggerUIOptions} from './config/swaggerOptions.js';

const app = express();

const PORT = 12345;
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());

/**
 * @swagger
 * /compileInput:
 *  post:
 *    summary: Compile code written in a particular programming language.
 *    tags: [Compile]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Input'
 *    responses:
 *      201:
 *        description: The output of the compiled program.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Output'
 *      400:
 *        description: An error occurred due to a bad request.
 */
app.post('/compileInput', async (req, res) => {
    let lang = req.body.language;
    let code = req.body.code;
    let input = req.body.input || "";

    // Request error
    let output = {
        code: 40,
        msg: "There was a problem with your request"
    };

    let langObject = createLanguageObject(lang);

    if (langObject === null) {
        output.code = 50,
        output.msg = "Invalid language"
    }
    else {
        console.log(`filename: ${langObject.filename}`);
        console.log(`command: ${langObject.command}`);
    
        fs.writeFileSync('input.txt', input);
    
        fs.writeFileSync(langObject.filename, code, (err) => {
            if (err) return console.log(`Error: ${err}`);
            console.log("File saved successfully");
        });
    
        output = await execute(langObject.command);
    }

    console.log(output);

    res.send(output);
});


app.post('/judgeInput', async (req, res) => {
    let lang = req.body.language;
    let code = req.body.code;
    let input = req.body.input || "";
    let answer = req.body.answer;

    // Request error
    let output = {
        code: 40,
        msg: "There was a problem with your request"
    };

    let langObject = createLanguageObject(lang);

    if (langObject === null) {
        output.code = 50,
        output.msg = "Invalid language"
    }
    else {
        console.log(`filename: ${langObject.filename}`);
        console.log(`command: ${langObject.command}`);
    
        fs.writeFileSync('input.txt', input);
    
        fs.writeFileSync(langObject.filename, code, (err) => {
            if (err) return console.log(`Error: ${err}`);
            console.log("File saved successfully");
        });
    
        output = await execute(langObject.command);
    }

    console.log(output);

    let responseObject = {
        code: -1,
        msg: "Internal error",
        expected: answer,
        result: "ERROR"
    }

    
    if (answer === undefined) {
        responseObject = {
            code: 60,
            msg: "Error: please specify an answer",
            expected: "NA",
            result: "ERROR"
        }
    }
    else if (output.code === 10) {
        if (output.msg === answer) {
            responseObject = {
                code: output.code,
                msg: output.msg,
                expected: answer,
                result: "CORRECT"
            }
        }
        else {
            responseObject = {
                code: output.code,
                msg: output.msg,
                expected: answer,
                result: "INCORRECT"
            }
        }
    }
    else {
        responseObject = {
            code: output.code,
            msg: output.msg,
            expected: answer,
            result: "ERROR"
        }
    }

    res.send(responseObject);
});


app.listen(PORT, () => {
    console.log(`Started on port: ${PORT}.\nGo to /docs for more information.`);
});

// Swagger
/**
 * @swagger
 * components:
 *   schemas:
 *     Input:
 *       type: object
 *       properties:
 *        language:
 *          type: string
 *          description: The identifier of the programming language. They are defined in the `languages.js` file.
 *          example: python
 *        code:
 *          type: string
 *          description: The code that is going to be compiled.
 *          example: print(input())
 *        input:
 *          type: string
 *          description: If necessary, the console input for the submitted code.
 *          example: Hello World!
 *       required:
 *         - language
 *         - code
 *     Output:
 *       type: object
 *       properties:
 *         code:
 *           $ref: '#/components/schemas/StatusCode'
 *         msg:
 *           type: number
 *           description: The output of the compiled program, if the code value is 10. If it isn't, a more descriptive message of the error code.
 *           example: Hello world!
 *       required:
 *         - code
 *         - msg
 *     StatusCode:
 *       type: number
 *       enum:
 *         - -1
 *         - 10
 *         - 11
 *         - 20
 *         - 21
 *         - 30
 *         - 40
 *         - 50
 *       description: >
 *         Codes:
 *          * `-1` - Internal Error
 *          * `10` - Compiled correctly
 *          * `11` - Syntax error
 *          * `20` - Shell error
 *          * `21` - Compilation error
 *          * `30` - Timed Out
 *          * `40` - Request error
 *          * `50` - Invalid language
 *       example: 10
 * 
 * tags:
 *   name: Compile
 *   description: Compile endpoint.
 */
const specs = swaggerJSDocs(swaggerJsDocOptions)

fs.writeFileSync('docs/swagger.json', JSON.stringify(specs));

app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs,swaggerUIOptions))
// ...

export default app;