"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const clientsRoutes_1 = require("./routes/clientsRoutes");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const fastify = (0, fastify_1.default)();
// Registra o CORS
fastify.register(cors_1.default);
// Registra as rotas
fastify.get('/', (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    return { message: 'API funcionando!' };
}));
fastify.register(clientsRoutes_1.clientRoutes);
// Exporta como uma função para Vercel
/* export default async (req: any, res: any) => {
    await fastify.ready();
    fastify.server.emit('request', req, res);
}; */
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Certifica-se de que o Fastify está pronto para processar as requisições
        yield fastify.ready();
        // Encaminha a requisição para o servidor Fastify
        fastify.server.emit('request', req, res);
    }
    catch (err) {
        // Em caso de erro, envia uma resposta diretamente
        res.statusCode = 500;
        res.end('Internal Server Error');
        console.error(err);
    }
});
// Inicia o servidor
/* fastify.listen({port: 3333, host: '0.0.0.0'}, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
}); */
