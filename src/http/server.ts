import fastify from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { registerNewUser } from './routes/register-route';
import { login } from './routes/login-route';
import { createProduct } from './routes/create-product-route';
import { getAllProducts } from './routes/get-all-products-route';
import { deleteProductRouter } from './routes/delete-product-route';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(registerNewUser);
app.register(login);
app.register(createProduct);
app.register(getAllProducts);
app.register(deleteProductRouter);

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('Http server running in port 3333');
  });
