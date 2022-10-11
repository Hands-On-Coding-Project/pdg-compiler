import util from 'node:util';
import child_process from 'node:child_process';

const exec = util.promisify(child_process.exec);

//Use this method to run an specific command
export async function execute(command) {

    // Internal error
    let infoObj = {
        code: -1, // Internal error
        msg: ""
    };

    try {
        const { stdout, stderr, error } = await exec(command, {shell : "bash", timeout: 3000});
        // Shell error
        if (error) {
            infoObj.code = 20;
            infoObj.msg = error;
            return infoObj;

        }
        // Syntax error
        if (stderr) {
            infoObj.code = 11;
            infoObj.msg = stderr; 
            return infoObj;
        }
        // Compiled correctly
        infoObj.code = 10;
        infoObj.msg = stdout;
        return infoObj;

    }
    
    catch (e) {
        console.log(`#######ERROR######\n${e}`);
        // Timed out
        if (e.signal === "SIGTERM") {
            infoObj.code = 30;
            infoObj.msg = "Connection timed out"
        }
        // Compilation error
        else {
            infoObj.code = 21;
            infoObj.msg = e.stderr || "CompilationError"
        }
        return infoObj;
    }

}