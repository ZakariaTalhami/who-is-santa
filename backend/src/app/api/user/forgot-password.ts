import { Request, Response, Router } from 'express';

const router = Router();

router.post("/forgot-password", async (req: Request, res: Response) => {

    
    res.send({
        status: "Reset password sent to email"
    })
});

export { router as Router };