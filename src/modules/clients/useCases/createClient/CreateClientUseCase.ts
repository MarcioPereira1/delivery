import { prisma } from '../../../../database/prismaClient'
import { hash } from 'bcrypt'

// UseCase é onde fica a regra de negócio da funcionalidade, que nesse caso é de criar um cliente
interface ICreateClient {
    username: string
    password: string
}

export class CreateClientUseCase {
    async execute({username, password}: ICreateClient) {
        const clientExist = await prisma.clients.findFirst({
            where: {
                username: {
                    equals: username,
                    mode: "insensitive"
                }
            }
        })

        if(clientExist) {
            throw new Error("Client Already Exists")
        }

        const hashPassword = await hash(password, 10)

        const client = await prisma.clients.create({
            data: {
                username,
                password: hashPassword
            }
        })

        return client
    }
}