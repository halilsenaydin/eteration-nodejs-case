export default class JWTConstant {
    static SECRET_KEY = "eteration.sencer";
    static ISSUER = "www.eteration.com";
    static EXP = 30 * 24 * 60 * 60 * 1000;

    static CREATED_TOKEN = "Created Token!"
    static VALIDATE_TOKEN = "Validated Token!"
    static EXPIRED_TOKEN = "Expired Token!"
    static UNVALIDATE_TOKEN = "Unvalidate Token!"
    static UNAUTHORIZED_TOKEN = "Unauthorized!"
}