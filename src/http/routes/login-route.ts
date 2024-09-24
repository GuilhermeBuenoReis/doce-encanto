import { z } from 'zod';
import { UserController } from '../../controllers/user-controller';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const login: FastifyPluginAsyncZod = async app => {
  const userController = new UserController();

  app.post(
    '/login',
    {
      schema: {
        body: loginSchema,
      },
    },
    async (request, reply) => {
      try {
        const user = await userController.login(request, reply);

        reply.code(201).send(user);
      } catch (error) {
        reply.code(500).send({ error: 'Erro ao criar usuário' }); // Tratamento de erro
      }
    }
  );
};
