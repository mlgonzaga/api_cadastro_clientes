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
exports.CreateCustormerController = void 0;
const CreateCustormerService_1 = require("../services/CreateCustormerService");
class CreateCustormerController {
    handle(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email } = request.body;
            console.log(name, email);
            const customerService = new CreateCustormerService_1.CreateCustormerService;
            const customer = yield customerService.execute({ name, email });
            reply.send(customer);
        });
    }
}
exports.CreateCustormerController = CreateCustormerController;
