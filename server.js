import express from 'express';
import fs from 'fs';
import cors from 'cors';
import bodyParser from 'body-parser';
import { execute } from './compiler.js'
import { createLanguageObject } from './test.js';

const app = express();

const PORT = 12345;
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());

app.post('/compileInput', async (req, res) => {
    let lang = req.body.language;
    let code = req.body.code;
    let input = req.body.input || "";

    // Request error
    let output = {
        code: 40,
        msg: "There was a problem with your request"
    };

    let langObject = createLanguageObject('cpp');

    console.log(`filename: ${langObject.filename}`);
    console.log(`command: ${langObject.command}`);

    console.log(lang);
    console.log(code);

    fs.writeFileSync('input.txt', input);

    //Create a case for another programming language
    switch (lang) {
        case 'cpp':
        case 'c++':
            fs.writeFileSync('main.cpp', code, (err) => {
                if (err) return console.log(`Error: ${err}`);
                console.log("File saved successfully");
            });
            output = await execute('g++ main.cpp -o output; ./output < input.txt');
            console.log(output);
            break;
        case 'python':
            fs.writeFileSync('main.py', code, (err) => {
                if (err) return console.log(`Error: ${err}`);
                console.log("File saved successfully");
            });
            output = await execute('python3 main.py < input.txt');
            console.log(output);
            break;
        case 'javascript':
            fs.writeFileSync('main.js', code, (err) => {
                if (err) return console.log(`Error: ${err}`);
                console.log("File saved successfully");
            });
            output = await execute('node main.js < input.txt');
            console.log(output);
            break;
        default:
            break;
    }

    res.send(output);
});


app.listen(PORT, () => {
    console.log(`Started on port: ${PORT}`);
});