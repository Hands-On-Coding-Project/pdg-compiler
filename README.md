# HandsOnCoding Compiler (Back-End)

This is the compiler API for the HandsOnCoding project, an open-source MOOC (Massive Open Online Courses) for multiple programming languages.

### Build With

![Node](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)

## Getting Started

### Prerequisites

In order to run this project you should install [Node](https://nodejs.org/en/download/) in your computer.

Is recomended to use and install [Docker Desktop](https://www.docker.com/) to run the project with all the needed dependecies in a secure enviroment.

### Installation

1. Clone the repository
    ```bash
    git clone https://github.com/mavaldot/pdg-compiler
    ```
2. Go inside the project folder
   ```bash
   cd HandsOnCoding-Back
   ```
3. Install npm packages (if you are going to run without Docker)
   ```bash
   npm i
   ```

## Usage

### Types of code

| Code | Meaning |
| --- | --- |
| -1 | Internal Error |
| 10 | Compiled correctly |
| 11 | Syntax error |
| 20 | Shell error |
| 21 | Compilation error |
| 30 | Timed Out |



### Configuration

This project runs JavaScript, Python, and C++ code, but you can also define more languages in the server.js file. You only need to add a "case" inside the "switch" as follows:
```js
switch (lang) {
...
    case 'python'://The language name
        fs.writeFileSync('main.py', code, (err) => {//Create a file that contain the code
            if (err) return console.log(`Error: ${err}`);//Error 😭
            console.log("File saved successfully");//Success 😄
        });
        output = await execute('python3 main.py');//Execute the command to run the file code
    break;
...
}
```

### Start

To run the service, just execute the command:
```bash
npm start
```
If you want to use Docker, open Docker Desktop and run this commands instead:
```bash
docker build -t comserver .
docker run -p 12345:12345 comserver
```
In both cases, the service will be running at http://localhost:12345/.

### How do I use the compiler?

Just do a POST request to the base URL with a JSON file with the following structure:
```json
{
    "language": "python",
    "text": "print('Hello World!')"
}
```
and you will resieve a similar JSON file:
```json
{
    "out": "Hello World!\n"
}
```

## Related Projects

* [HandsOnCoding (Front-End)](https://github.com/Esarac/HandsOnCoding-Front)
* [HandsOnCoding Business Logic (Back-End)](https://github.com/Esarac/HandsOnCoding-Back)

## Contact Information

### ![Quality](https://images.weserv.nl/?url=avatars.githubusercontent.com/u/48232743?v=4&h=50&w=50&fit=cover&mask=circle&maxage=7d) Esteban Ariza Acosta (Esarac)

[![Github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Esarac)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/estebanarizaacosta/)
[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:acosta57esteban@gmail.com)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/esaracgp/)
