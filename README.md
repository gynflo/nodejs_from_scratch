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
    baseUrl par "baseUrl": "./src",
    "outDir": "dist",
    "paths": {
      "@/resources/*": ["resources/*"],
      "@/utils/*": ["utils/*"],
      "@/middleware/*": ["middleware/*"]
    } 
