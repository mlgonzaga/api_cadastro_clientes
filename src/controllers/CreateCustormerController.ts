import { FastifyRequest, FastifyReply } from "fastify";
import { CreateCustormerService } from '../services/CreateCustormerService'

class CreateCustormerController{
    async handle(request:FastifyRequest, reply: FastifyReply){
        const { name, email } = request.body as { name: string, email: string};
        console.log(name, email)

        const customerService = new CreateCustormerService

        const customer = await customerService.execute({ name, email });

        reply.send(customer)
    }
}

export { CreateCustormerController }