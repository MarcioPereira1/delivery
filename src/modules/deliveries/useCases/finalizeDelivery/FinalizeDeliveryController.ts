import { Request, Response } from "express";
import { FinalizeDeliveryUseCase } from "./FinalizeDeliveryUseCase";


export class FinalizeDeliveryController {

    async handle(req: Request, res: Response) {
        const { id_deliveryman } = req
        const { id: id_delivery } = req.params

        const finalizeDeliveryUseCase = new FinalizeDeliveryUseCase()

        const result = await finalizeDeliveryUseCase.execute({
            id_deliveryman,
            id_delivery,
        })

        return res.json(result)
    }
}