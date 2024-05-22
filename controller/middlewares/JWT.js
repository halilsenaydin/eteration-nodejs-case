import jsonwebtoken from 'jsonwebtoken';
import DataResult from '../../core/entities/DataResult.js';
import JWTConstant from '../constants/authorityConstants/JWTConstant.js';

export default class JWT {
    constructor() { }

    static createToken(req, res, next) {
        const userName = req.data.userName;
        const password = req.data.passwordHash;
        const token = jsonwebtoken.sign({
            userName: userName,
            password: password,
            exp: JWTConstant.EXP,
            issuer: JWTConstant.ISSUER,
        }, JWTConstant.SECRET_KEY);

        let tokenObj = { token: token }
        req.result = new DataResult(tokenObj, true, JWTConstant.CREATED_TOKEN)
        return next();
    }

    static verifyToken(req, res, next) {
        let result;
        try {
            const token = req.token;
            const decodedToken = jsonwebtoken.verify(token, JWT.SECRET_KEY);
            req.data.decodedToken = decodedToken;
            req.result = new DataResult(decodedToken, true, JWTConstant.VALIDATE_TOKEN)
            return next();
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                result = new DataResult({}, false, JWTConstant.EXPIRED_TOKEN)
                return res.json(result);
            } else if (error.name === 'JsonWebTokenError') {
                result = new DataResult({}, false, JWTConstant.UNVALIDATE_TOKEN)
                return res.json(result);
            } else {
                result = new DataResult({}, false, JWTConstant.UNAUTHORIZED_TOKEN)
                return res.json(result);
            }
        }
    }

    static addTokenToReq(req, res, next) {
        const headers = req.headers;
        let authorization = headers.authorization;
        if (authorization != undefined) {
            let token = authorization.split(" ")[1];
            if (token && token != "null" && token != "") {
                req.token = token;
            }
        }
        next();
    }
}