"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = routes;
const CreateCustormerController_1 = require("./controllers/CreateCustormerController");
const ListCustomersController_1 = require("./controllers/ListCustomersController");
const DeleteCustomerController_1 = require("./controllers/DeleteCustomerController");
function routes(fastify, options) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.get("/", (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return { ok: true };
        }));
        fastify.post("/customer", (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return new CreateCustormerController_1.CreateCustormerController().handle(request, reply);
        }));
        fastify.get("/customers", (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return new ListCustomersController_1.ListCustomersController().handle(request, reply);
        }));
        fastify.delete("/customer", (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return new DeleteCustomerController_1.DeleteCustomerController().handle(request, reply);
        }));
    });
}
