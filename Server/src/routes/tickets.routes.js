import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getAllTicket, getTicketbyId, getTicketbyNgo, postTicket, updateTicket } from "../controllers/ticket.controller.js";

const router = Router();
router.route("/:id/post").post(verifyJWT,postTicket);

router.route("/getTickets").get(getAllTicket);

router.route("/:id/getTickets").get(getTicketbyNgo);//here the id is NGO id

router.route("/getTickets/:id").get(getTicketbyId); // here the id is ticket id

router.route("/updateTicket/:id").patch(updateTicket);

export default router;