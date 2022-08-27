# pdg-compiler

## setup
```
npm init -y
npm i express nodemon
```
## example
```
POST localhost:12345/code
{
    "language": "cpp",
    "text": "#include <iostream> \n int main() {std::cout << \"Hello World!\"; return 0;}"
}
```
