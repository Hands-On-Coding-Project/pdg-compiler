# HandsOnCoding Compiler (Back-End)

This is the compiler API for the HandsOnCoding project, an open-source MOOC (Massive Open Online Courses) for multiple programming languages.

### Build With

![Node](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![Mocha](https://img.shields.io/badge/Mocha-8D6748?style=for-the-badge&logo=Mocha&logoColor=white)
![Chai](https://img.shields.io/badge/chai-A30701?style=for-the-badge&logo=chai&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=black)

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

### Code types

| Code | Meaning |
| --- | --- |
| -1 | Internal Error |
| 10 | Compiled correctly |
| 11 | Syntax error |
| 20 | Shell error |
| 21 | Compilation error |
| 30 | Timed Out |
| 40 | Request error |
| 50 | Invalid language |

### Scripts (Package.json)

| Script | Description |
| --- | --- |
| test | Run mocha tests |
| start | Start the app |

Run the scripts with the command:
```bash
npm run <script>
```

### Configuration

This project runs JavaScript, Python, and C++ code, but you can also define more languages in the data/languages.js file. You only need to add the language in the json variable as follows:
```json
{
    "python": {
        "filename": "main.py",
        "command": "python3 main.py < input.txt"
    }
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

### Mocha (Test)

To run the tests, use the following command:
```bash
npm start test
```

### Swagger
To auto-generate an HTML file from the [Swagger](https://swagger.io/) specs (generated every time you run the app in the "docs" folder), you need to install the global dependencies:
```bash
npm install -g redoc-cli
```
and run the following command from the root folder:
```bash
redoc-cli build -o docs/swagger.html docs/swagger.json
```

### How do I use the compiler?

Just do a POST request to the base URL with a JSON file with the following structure:
```json
{
    "language": "python",
    "code": "print(input())"
    "input": "Hello World!"
}
```
and you will receive a similar JSON file:
```json
{
    "code": 10
    "msg": "Hello World!\n"
}
```
For more information visit the [Compiler API Doc](https://hands-on-coding-project.github.io/pdg-compiler/).

## Related Projects

* [HandsOnCoding (Front-End)](https://github.com/Esarac/HandsOnCoding-Front)
* [HandsOnCoding Business Logic (Back-End)](https://github.com/Esarac/HandsOnCoding-Back)

## Contact Information

### ![Quality](https://images.weserv.nl/?url=avatars.githubusercontent.com/u/48232743?v=4&h=50&w=50&fit=cover&mask=circle&maxage=7d) Esteban Ariza Acosta (Esarac)

[![Github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Esarac)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/estebanarizaacosta/)
[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:acosta57esteban@gmail.com)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/esaracgp/)
