import Fastify from "fastify";
import cors from "@fastify/cors";
import { routes } from "./routes";

const app = Fastify({ logger: true})
const PORT = Number(process.env.PORT) || 3000;

app.setErrorHandler((error, request, reply) => {
    reply.code(400).send({ message: error.message })
})

const start = async () => {
    await app.register(cors);
    await app.register(routes);

    try {
        await app.listen({ port: PORT })
    }catch(er) {
        process.exit(1)
    }
}




start();