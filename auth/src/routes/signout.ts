import express, {Request, Response} from "express";

const router = express.Router();

router.post("/api/users/signout", (req: Request, res: Response): void => {
    console.log(7867868786);    
    res.json({hi: '786'})
});

export { router as signOutRouter };
