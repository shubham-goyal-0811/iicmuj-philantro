import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getAllNgo,
  getNgobyAdmin,
  getNgobyId,
  registerNgo,
  updateNgo,
} from "../controllers/ngo.controller.js";

const router = Router();
router.route("/register").post(
  verifyJWT,
  upload.fields([
    {
      name: "idProof",
      maxCount: 1,
    },
    {
      name: "logo",
      maxCount: 1,
    },
  ]),
  registerNgo
);

router.route("/getNgos").get(getAllNgo);

router.route("/getNgo/:id").get(getNgobyId);

router.route("/getUserNgo").get(verifyJWT, getNgobyAdmin);

router
  .route("/getNgo/:id/update")
  .patch(verifyJWT, upload.fields([{ name: "logo", maxCount: 1 }]), updateNgo);
export default router;
