Initiate project

```sh
 npm i -D typescript tsc-watch eslint prettier eslint-config-prettier eslint-plugin-prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin @types/node @types/express
```

Install d'express

```sh
npm i express dotenv
```

Generate the typescript configuration file

```sh
npx tsc --init
```

then modify the file tsconfig.json
1. baseUrl par "baseUrl": "./src",
2. "outDir": "dist",
3. "paths": {
"@/resources/_": ["resources/_"],
"@/utils/_": ["utils/_"],
"@/middleware/_": ["middleware/_"]
}

Directory alias management

```sh
npm i module-alias
```

then modify the file package.json

```sh
"_moduleAliases": {
        "@/resources/*": [
            "dist/resources/*"
        ],
        "@/utils/*": [
            "dist/utils/*"
        ],
        "@/middleware/*": [
            "dist/middleware/*"
        ]
    }
```
