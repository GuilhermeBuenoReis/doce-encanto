import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema, type SignUpData } from '@/types/auth-type';
import { createNewUser } from '@/services/auth-service';

import axios from 'axios';
import { toast } from 'sonner';

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
  });

  // Começo do das funções de tratamento de erros.

  function handleError(error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage =
        error.response.data?.message ||
        error.response.data?.error?.message ||
        error.response.data?.error ||
        'Erro desconhecido. Tente novamente mais tarde!';

      console.error('Erro da API:', error.response.data);
      toast.error(errorMessage);
    } else {
      console.error('Erro inesperado:', error);
      toast.error('Ocorreu um erro inesperado. Tente novamente mais tarde!');
    }
  }

  //Começo das funções para captura de dados.

  async function handleCreateNewUser(data: SignUpData) {
    try {
      const res = await createNewUser(data);

      console.log(res);

      toast.success('Usuário criado com sucesso!');
    } catch (error: unknown) {
      handleError(error);
    }
  }

  return (
    <>
      <Header />

      <main className="w-screen flex flex-col items-center justify-center h-screen bg-pink-100 p-4 overflow-hidden">
        <form
          className="p-12 flex items-center justify-center flex-col bg-pink-300/35 rounded-md w-full max-w-md shadow-lg gap-3"
          onSubmit={handleSubmit(handleCreateNewUser)}
        >
          <h1 className="text-2xl font-semibold text-center">Fazer login</h1>

          <div className="flex flex-col justify-center gap-4 w-full">
            <div className="flex flex-col">
              <Label className="text-sm font-semibold">Email</Label>
              <Input className="border-foreground/40" {...register('email')} />
              {errors.email && <span>{errors.email.message}</span>}
            </div>

            <div className="flex flex-col">
              <Label className="text-sm font-semibold">Nome</Label>
              <Input className="border-foreground/40" {...register('name')} />
              {errors.name && <span>{errors.name.message}</span>}
            </div>

            <div className="flex flex-col">
              <Label className="text-sm font-semibold">Senha</Label>
              <Input
                className="border-foreground/40"
                {...register('password')}
                type="password"
              />
              {errors.password && <span>{errors.password.message}</span>}
            </div>

            <Button className="mt-4 w-full text-muted font-bold" type="submit">
              Registrar
            </Button>
          </div>

          <div className="flex justify-center gap-4 mt-4">
            <a href="/sign-in" className="text-foreground/80 font-semibold">
              Já possui uma conta? Clique aqui para acessar.
            </a>
          </div>
        </form>

        <footer className="text-center text-xs font-medium text-foreground/60 bg-pink-100 mt-4">
          &copy; {new Date().getFullYear()} Doce-encanto. Todos os direitos
          reservados.
        </footer>
      </main>
    </>
  );
}

export { SignUp };
