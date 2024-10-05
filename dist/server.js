"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/server.ts
var import_fastify = __toESM(require("fastify"));
var import_cors = __toESM(require("@fastify/cors"));

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/CreateCustormerService.ts
var CreateCustormerService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ name, email }) {
      if (!name || !email) {
        throw new Error("Preencha todos os campos");
      }
      const customer = yield prisma_default.customer.create({
        data: {
          name,
          email,
          status: true
        }
      });
      return customer;
    });
  }
};

// src/controllers/CreateCustormerController.ts
var CreateCustormerController = class {
  handle(request, reply) {
    return __async(this, null, function* () {
      const { name, email } = request.body;
      console.log(name, email);
      const customerService = new CreateCustormerService();
      const customer = yield customerService.execute({ name, email });
      reply.send(customer);
    });
  }
};

// src/services/ListCustomersService.ts
var ListCustomerService = class {
  execute() {
    return __async(this, null, function* () {
      const customers = yield prisma_default.customer.findMany();
      return { data: customers };
    });
  }
};

// src/controllers/ListCustomersController.ts
var ListCustomersController = class {
  handle(request, reply) {
    return __async(this, null, function* () {
      const listCustomerService = new ListCustomerService();
      const customers = yield listCustomerService.execute();
      reply.send(customers);
    });
  }
};

// src/services/DeleteCustomerService.ts
var DeleteCustomerService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ id }) {
      if (!id) {
        throw new Error("Solicita\xE7\xE3o inv\xE1lida,");
      }
      const findCustomer = yield prisma_default.customer.findFirst({
        where: {
          id
        }
      });
      if (!findCustomer) {
        throw new Error("Cliente n\xE3o existe!");
      }
      yield prisma_default.customer.delete({
        where: {
          id: findCustomer.id
        }
      });
      return { message: "Deletado com sucesso!" };
    });
  }
};

// src/controllers/DeleteCustomerController.ts
var DeleteCustomerController = class {
  handle(request, reply) {
    return __async(this, null, function* () {
      const { id } = request.query;
      const customerService = new DeleteCustomerService();
      const customer = yield customerService.execute({ id });
      reply.send(customer);
    });
  }
};

// src/routes.ts
function routes(fastify, options) {
  return __async(this, null, function* () {
    fastify.get("/", (request, reply) => __async(this, null, function* () {
      return { ok: true };
    }));
    fastify.post("/customer", (request, reply) => __async(this, null, function* () {
      return new CreateCustormerController().handle(request, reply);
    }));
    fastify.get("/customers", (request, reply) => __async(this, null, function* () {
      return new ListCustomersController().handle(request, reply);
    }));
    fastify.delete("/customer", (request, reply) => __async(this, null, function* () {
      return new DeleteCustomerController().handle(request, reply);
    }));
  });
}

// src/server.ts
var app = (0, import_fastify.default)({ logger: true });
var PORT = Number(process.env.PORT) || 3e3;
app.setErrorHandler((error, request, reply) => {
  reply.code(400).send({ message: error.message });
});
var start = () => __async(exports, null, function* () {
  yield app.register(import_cors.default);
  yield app.register(routes);
  try {
    yield app.listen({ port: PORT });
  } catch (er) {
    process.exit(1);
  }
});
start();
