# pdg-compiler

## setup
```
npm init -y
npm i express nodemon
```
## docker
```
docker build -t comserver .
docker run -p 12345:12345 comserver
```
## example
```
POST localhost:12345/code
{
    "language": "cpp",
    "text": "#include <iostream> \n int main() {std::cout << \"Hello World!\"; return 0;}"
}
```
