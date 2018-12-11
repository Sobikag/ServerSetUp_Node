// import { request } from 'https';

const jwt = require('jsonwebtoken');

const currentUser = require('./currentUser');

module.exports = (req, res, next) =>{
    const token = req.headers.jwt;
    if(!currentUser(token)){
        const err = new error('Not Found');
        err.status = 404;
        next(err);
    }
    next();
};