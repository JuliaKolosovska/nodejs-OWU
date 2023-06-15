import {Router} from 'express';
import {userController} from '../controllers/user.controller';
import {userMiddleware} from '../middlewares/user.middleware'

const router = Router();

router.get("/", userController.findAll);
router.get("/:id", userController.findById);
router.post("/", userMiddleware.isCreateValid);
router.put("/:id", userController.updateById);
router.delete("/:id", userController.deleteById);

export const userRouter = router;

