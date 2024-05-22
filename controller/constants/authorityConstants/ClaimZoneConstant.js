import ClaimConstant from "./ClaimConstant.js";

export default class ClaimZoneConstant {
    static RED_SECURITY = [ClaimConstant.ADMIN];
    static SAFE_ZONE = [ClaimConstant.ADMIN, ClaimConstant.EDITOR];
    static FREE_USER = [ClaimConstant.ADMIN, ClaimConstant.EDITOR, ClaimConstant.FREE_USER, ClaimConstant.PREMIUM_USER];
    static PREMIUM_USER = [ClaimConstant.ADMIN, ClaimConstant.EDITOR, ClaimConstant.PREMIUM_USER];
    static BANNED_USER = [ClaimConstant.BANNED]
}