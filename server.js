import express from 'express';
import fs from 'fs';
import cors from 'cors';
import bodyParser from 'body-parser';
import { execute } from './compiler.js'
import { createLanguageObject } from './languageObject.js';

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


app.listen(PORT, () => {
    console.log(`Started on port: ${PORT}`);
});

export default app;