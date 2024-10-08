"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
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

// src/controllers/ListCustomersController.ts
var ListCustomersController_exports = {};
__export(ListCustomersController_exports, {
  ListCustomersController: () => ListCustomersController
});
module.exports = __toCommonJS(ListCustomersController_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ListCustomersController
});
