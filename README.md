## Install:

1. Clone project using `git clone`.
2. Install mongodb and check that is configured to port = 27017
3. Additional: install an mongodb viewer as robomongo: https://robomongo.org/.
    1. Linux: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/.
    2. Windows: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
4. Install nodejs (^4.0.0 recommended) and npm. Execute `cd victoria-v2`.
5. Install G++ for bcrypt `sudo apt-get install g++`.
6. Execute `npm install`.
7.  Install babel-node package globally using `npm install -g babel-cli`
8. For server:
    1. start server in dev mode:             `npm run server-dev`,
    2. build server source to javascript:    `npm run server-build`
    3. start server in production mode:      `npm run server-start`
9. For client:
    1. start client in dev mode:             `npm run dev`,
    2. build client into bundles:            `npm run build`,
10. For starting app in production mode execute `npm run start`, and open `http://localhost:8081/`
11. For starting app in dev mode execute `npm run server-dev`, and in other terminal `npm run dev` and open `http://localhost:8080/`
12. This project is ESlinted with auto npm pre-commit hook. 
13. Execute `npm run eslint` to process linting results into console.
