# Testovací aplikace implementovaná pomocí Angularu 2 

# Prerekvizity
* stahněte si tento projekt
* provedtě instalaci poslední stable verze __node.js__ s __npm__: https://nodejs.org/en/
* v místě, kde se nachazí __package.json__ spusťte příkaz: __npm install__
* dále spusťte: __npm run typings install__
* podrobněji viz: https://angular.io/docs/ts/latest/quickstart.html#!#prereq

# Spuštění aplikace
* spustění, build app provedete přes: __npm start__

# Spuštění testů
* spustění testů app provedete přes: __npm test__

# Nastaveni mocku service
* pokud nemáme k dispozici REST API je možne service zamockovat
* v souboru __app.module.ts__ změníme:
```
providers: [ 
   { provide: PersonService, useClass: PersonService }
 ],
```
na 
```
providers: [ 
   { provide: PersonService, useClass: PersonServiceMock } 
 ],
```