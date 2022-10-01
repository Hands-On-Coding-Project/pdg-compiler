const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

const PORT = 12345;
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());

const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);

//Use this method to run an specific command
async function execute(command){

    let infoObj = {
        code: 10,
        msg: ""
    };

    try {
        const { stdout, stderr, error } = await exec(command, {shell : "bash", timeout: 3000});
        if (error) {
            infoObj.code = 20;
            infoObj.msg = error;
            return infoObj;

        }
        if (stderr) {
            infoObj.code = 11;
            infoObj.msg = stderr; 
            return infoObj;
        }
        infoObj.msg = stdout;
        return infoObj;

    }
    catch (e) {
        console.log(`#######ERROR######\n${e}`);
        if (e.signal === "SIGTERM") {
            infoObj.code = 30;
            msg = "Connection timed out"
        }
        else {
            infoObj.code = 21;
            msg = "Compilation error"
        }
        return infoObj;
    }

}

app.post('/compileInput', async (req, res) => {
    let lang = req.body.language;
    let code = req.body.code;
    let input = req.body.input || "";

    let output = {
        code: 40,
        msg: "There was a problem with your request"
    };

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