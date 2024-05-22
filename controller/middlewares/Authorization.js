import ClaimZoneConstant from "../constants/authorityConstants/ClaimZoneConstant.js";
import ClaimConstant from "../constants/authorityConstants/ClaimConstant.js";
import Result from '../../core/entities/Result.js';
import AuthorityMessageConstant from "../constants/messageConstants/AuthorityMessageConstant.js";
import LanguageConstant from "../constants/LanguageConstant.js";

export default class Authorization {
    constructor() { }

    static controlClaim(claims, req, res, next) {
        const claimsOfUser = req.claimsOfUser;
        const language = req.user?.currentLanguage;
        let result;
        if (language == undefined || claimsOfUser == undefined) {
            result = new Result(false, AuthorityMessageConstant.ROLE_NOT_FOUND[LanguageConstant.DEFAULT]);
            return res.json(result);
        }

        for (let j = 0; j < claimsOfUser.length; j++) {
            const claimOfUser = claimsOfUser[j].Claim;
            for (let i = 0; i < claims.length; i++) {
                const claimOfZone = claims[i];
                if ((claimOfZone.ClaimName == claimOfUser.ClaimName) &&
                    (claimOfUser.Status == true) &&
                    (claimOfUser.ClaimName != ClaimConstant.BANNED.ClaimName)) {
                    req.result = new Result(true, AuthorityMessageConstant.AUTHORIZED[language]);
                    return next();
                }
            }
        }
        result = new Result(false, AuthorityMessageConstant.UNAUTHORIZED[language]);
        return res.json(result);
    }

    static redSecurity(req, res, next) {
        const claims = ClaimZoneConstant.RED_SECURITY;
        Authorization.controlClaim(claims, req, res, next);
    }

    static safeZone(req, res, next) {
        const claims = ClaimZoneConstant.SAFE_ZONE
        Authorization.controlClaim(claims, req, res, next);
    }

    static freeUser(req, res, next) {
        const claims = ClaimZoneConstant.FREE_USER
        Authorization.controlClaim(claims, req, res, next);
    }

    static premiumUser(req, res, next) {
        const claims = ClaimZoneConstant.PREMIUM_USER
        Authorization.controlClaim(claims, req, res, next);
    }

    static bannedUser(req, res, next) {
        const banned = ClaimConstant.BANNED;
        const claimsOfUser = req.claimsOfUser;
        let result;
        if (claimsOfUser == undefined) {
            return next();
        }

        for (let j = 0; j < claimsOfUser.length; j++) {
            const claimOfUser = claimsOfUser[j].Claim;
            if ((banned.ClaimName == claimOfUser.ClaimName)) {
                result = new Result(false, AuthorityMessageConstant.BANNED_USER);
                return res.json(result);
            }
        }
        return next();
    }
}