import { Router } from "express"
import {addTransfer, getVolume} from "../controllers/statistics"
const router: Router = Router()


router.post("/v1/addTransfer", addTransfer);
router.get("/v1/getVolume", getVolume);

export default router;
