import type { FastifyRequest, FastifyReply } from 'fastify';
import z from 'zod';
import { UserService } from '../services/register-service';
import { UserRepository } from '../repositories/user-repository';
import jwt from 'jsonwebtoken';
import { env } from '../validators/env-validator';

const JWT_SECRET = env.JWT_SECRET;

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const repository = new UserRepository();

class UserController {
  async register(req: FastifyRequest, res: FastifyReply) {
    try {
      // Validação do corpo da requisição
      const result = registerSchema.parse(req.body);
      const { email, password, name } = result;

      // Instancia o serviço e cria o usuário
      const service = new UserService(repository);
      await service.createUser({ email, password, name });

      // Retorna resposta de sucesso
      return res.code(201).send('Usuário criado com sucesso!');
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (error: any) {
      // Lida com erros, como formato inválido ou email já existente
      if (error.message === 'Email already exists') {
        return res.code(400).send({ error: 'E-mail já cadastrado' });
      }

      return res
        .code(400)
        .send({ message: 'Erro ao criar o usuário', error: error.message });
    }
  }

  async login(req: FastifyRequest, res: FastifyReply) {
    try {
      // Validação do corpo da requisição
      const result = loginSchema.parse(req.body);
      const { email, password } = result;

      // Instancia o serviço e busca o usuário pelo email
      const service = new UserService(repository);
      const user = await service.findUserByEmail(email);

      // Verifica se o usuário foi encontrado
      if (!user) {
        return res.code(401).send({ message: 'Usuário não encontrado!' });
      }

      // Compara a senha e valida
      const isValidPassword = await service.comparePassword(
        password,
        user.password
      );
      if (!isValidPassword) {
        return res.code(401).send({ error: 'Senha incorreta' });
      }

      // Gera o token JWT
      const token = jwt.sign({ userId: user.id }, JWT_SECRET);
      return res.send({ token });
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (error: any) {
      // Lida com erros durante o processo de login
      return res.code(500).send({
        error: 'Erro ao processar a solicitação',
        details: error.message,
      });
    }
  }
}

export { UserController };
