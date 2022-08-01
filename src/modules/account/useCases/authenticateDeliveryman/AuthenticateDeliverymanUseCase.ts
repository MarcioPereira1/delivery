import { prisma } from "../../../../database/prismaClient"
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"

interface IAuthenticateDeliveryman {
    username: string
    password: string
}

export class AuthenticateDeliverymanUseCase {

    async execute({ password, username }: IAuthenticateDeliveryman) {
        // Verificar se username está cadastrado
        const deliveryman = await prisma.deliveryman.findFirst({
            where: {
                username
            }
        })

        if(!deliveryman) {
            throw new Error("Username or password invalid.")
        }

        // Verificar se senha corresponde ao username
        const passwordMatch = await compare(password, deliveryman.password)

        if(!passwordMatch) {
            throw new Error("Username or password invalid.")
        }

        // Gerar token de acesso
        const token = sign({username}, "019acc25a4e242bb77ad489832ada12d", {
            subject: deliveryman.id,
            expiresIn: "1d",
        })

        return token
    }
}