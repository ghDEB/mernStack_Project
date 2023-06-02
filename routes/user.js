import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { getMyProfile, login,logout,register } from '../Controller/user.js';
const router= express.Router();

router.get("/me",isAuthenticated,getMyProfile);
router.post("/new",register)
router.post("/login",login)
router.post("/logout",logout)
/*router.get("/userid/:id",getUserById)
router.put("/userid/:id",updateUserById)
router.delete("/userid/:id",deleteUserById)*/

//common routes
/*router
.route("/userid/:id")
.get(getUserById)
.put(updateUserById)
.delete(deleteUserById);*/

export default router;
