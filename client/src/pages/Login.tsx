export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 p-10 bg-white shadow-lg rounded-xl">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Entrar na Verum
        </h2>
        <p className="text-center text-gray-600">Use seu e-mail de administrador</p>
        {/* Aqui futuramente irá o seu formulário de login */}
        <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-md">
          Acessar Painel
        </button>
      </div>
    </div>
  );
}