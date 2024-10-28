import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authUser } from '@/services/auth-service';

import { signInSchema, type SignInData } from '@/types/auth-type';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
  });

  async function handleSubmitLoginData(login: SignInData) {
    try {
      const res = await authUser(login);

      Cookies.set('authToken', res.token, {
        expires: 30,
        secure: true,
        sameSite: 'strict',
      });

      toast.success('Login realizado com sucesso!');
      nav('/');
    } catch (error) {
      console.error('Erro no login:', error);
      toast.error('Erro ao realizar login. Verifique suas credenciais.');
    }
  }

  return (
    <>
      <Header />

      <main className="w-screen flex flex-col items-center justify-center h-screen bg-pink-100 p-4 overflow-hidden">
        <form
          onSubmit={handleSubmit(handleSubmitLoginData)}
          className="p-12 flex items-center justify-center flex-col bg-pink-300/35 rounded-md w-full max-w-md shadow-lg gap-3"
        >
          <h1 className="text-2xl font-semibold text-center">Fazer login</h1>

          <div className="flex flex-col justify-center gap-4 w-full">
            <div className="flex flex-col">
              <Label className="text-sm font-semibold">Email</Label>
              <Input className="border-foreground/40" {...register('email')} />
            </div>

            <div className="flex flex-col">
              <Label className="text-sm font-semibold">Senha</Label>
              <Input
                className="border-foreground/40"
                {...register('password')}
              />
            </div>

            <Button className="mt-4 w-full" type="submit">
              Entrar
            </Button>
          </div>

          <div className="flex justify-center gap-4 mt-4">
            <a href="#recap" className="text-foreground/80 font-semibold">
              Esqueceu a senha? Clique aqui para recuperar.
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

export { SignIn };
