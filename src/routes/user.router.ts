import {Router} from "express";

import {userController} from "../controllers/user.controller";
import {commonMiddleware, fileMiddleware} from "../middlewares";
import {authMiddleware} from "../middlewares/auth.middleware";
import {UserValidator} from "../validators";

const router = Router();

router.get("/", userController.findAll);

router.get(
    "/:userId",
    commonMiddleware.isIdValid("userId"),
    authMiddleware.checkAccessToken,
    userController.findById
);
router.put(
    "/:userId",
    commonMiddleware.isIdValid("userId"),
    commonMiddleware.isBodyValid(UserValidator.update),
    authMiddleware.checkAccessToken,
    userController.updateById
);
router.delete(
    "/:userId",
    commonMiddleware.isIdValid("userId"),
    authMiddleware.checkAccessToken,
    userController.deleteById
);
router.post(
    "/:userId/avatar",
    authMiddleware.checkAccessToken,
    commonMiddleware.isIdValid("userId"),
    fileMiddleware.isAvatarValid,
    userController.uploadAvatar
);
router.delete(
    "/:userId/avatar",
    authMiddleware.checkAccessToken,
    commonMiddleware.isIdValid("userId"),
    userController.deleteAvatar
);

export const userRouter = router;