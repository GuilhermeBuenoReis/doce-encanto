import { z } from 'zod';
import { UserController } from '../../controllers/user-controller';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1),
});

export const registerNewUser: FastifyPluginAsyncZod = async app => {
  const userController = new UserController();

  app.post(
    '/register',
    {
      schema: {
        body: registerSchema,
      },
    },
    async (request, reply) => {
      try {
        const user = await userController.register(request, reply);

        reply.code(201).send(user);
      } catch (error) {
        reply.code(500).send({ error: 'Erro ao criar usuário' }); // Tratamento de erro
      }
    }
  );
};
