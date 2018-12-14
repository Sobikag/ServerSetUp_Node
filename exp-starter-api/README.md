# ServerSetUp_Node
Node server setup








My Notes:
Running on: locahost 4000
superfast:
     Jest is a testing framework, it does provide a platform for automated testing along with a basic assertion library (Expect). For APIs testing you must still rely on some external dependency: I chose supertest mainly because it supports promises, plus it’s lightweight. (On a side note, Expect was donated recently to the Jest team).

async-await:
    https://javascript.info/async-await

    await literally makes JavaScript wait until the promise settles, and then go on with the result. That doesn’t cost any CPU resources, because the engine can do other jobs meanwhile: execute other scripts, handle events etc.

    If we try to use await in non-async function, that would be a syntax error

CREATE DATABASE:
    Create database exp_starter_app_test; // IN sql shell

POSTGRATOR:
    database migartion management -- script running -- database config

BCRYPT:
  bcrypt is a password hashing function(https://www.npmjs.com/package/bcrypt)

PRETTIER:
    Prettier is an opinionated code formatter. It enforces a consistent style by parsing your code and re-printing it with its own rules that take the maximum line length into account, wrapping code when necessary.
.....................................................................