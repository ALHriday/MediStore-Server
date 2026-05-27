import { UserStatus } from "@prisma/client";
import { auth as betterAuth } from "../lib/auth.js";
export var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "ADMIN";
    UserRole["SELLER"] = "SELLER";
    UserRole["CUSTOMER"] = "CUSTOMER";
})(UserRole || (UserRole = {}));
export const Auth = (...roles) => {
    return async (req, res, next) => {
        try {
            const session = await betterAuth.api.getSession({
                headers: req.headers,
            });
            if (!session?.user) {
                return res.status(401).json({
                    success: false,
                    message: "unAuthorized!"
                });
            }
            if (!session.user.emailVerified) {
                return res.status(403).json({
                    success: false,
                    message: "Email Verification Required!. Please verify your Email."
                });
            }
            if (session.user.status === UserStatus.BAN) {
                return res.status(403).json({
                    success: false,
                    message: "You Don't have permission!. Please contact with the owner."
                });
            }
            req.user = {
                id: session.user.id,
                name: session.user.name,
                email: session.user.email,
                role: session.user.role,
                emailVerified: session.user.emailVerified,
            };
            if (roles.length > 0 && !roles.includes(req.user.role)) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden!. You are not allowed!"
                });
            }
            next();
        }
        catch (err) {
            next(err);
        }
    };
};
