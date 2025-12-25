import { Router } from "express";
import * as BookController from "../controllers/book.controllers.js";
import { authenticate } from "../middleware/auth.middleware.js";
const router = Router();
router.use(authenticate);
router.get("/", BookController.getMyBooks);
router.post("/", BookController.createNewBook);
export default router;
//# sourceMappingURL=book.routes.js.map