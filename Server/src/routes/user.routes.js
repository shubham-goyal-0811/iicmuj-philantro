import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { changeAvatar, changeCurrentPassword, changeIdproof, getCurrentUser, loginUser, logoutUser, refreshAccessToken, registerUser, updateAccountDetails } from "../controllers/user.controller.js";

const router = Router();
router.route("/register").post(
    upload.fields([
        {
            name : "idProof",
            maxCount : 1
        },
        {
            name : "avatar",
            maxCount : 1
        },
        {
            name : "NGODOC",
            maxCount : 1
        }
    ]),registerUser);

router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT,logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT,changeCurrentPassword);
router.route("/profile").get(verifyJWT,getCurrentUser);
router.route("/profile/update").patch(verifyJWT,updateAccountDetails);
router.route("/profile/updateId").patch(verifyJWT,
    upload.single("idProof"),changeIdproof
)
router.route("/profile/update-avatar").patch(verifyJWT,upload.single("avatar"),changeAvatar);




export default router;