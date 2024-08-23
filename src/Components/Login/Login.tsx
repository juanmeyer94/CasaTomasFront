import { useState } from "react";
import frases from "../../assets/frases.json"
import useAdminContext from "../../Utils/contextAdminHook";

const getRandomFrase = () => {
    const randomIndex = Math.floor(Math.random() * frases.length);
    return frases[randomIndex];
};


const Login = () => {

    const { loginAdmin, errors} = useAdminContext()

    const [currentFrase] = useState(getRandomFrase);

    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
           await loginAdmin(credentials)
        } catch (error) {
            throw new Error("No se ha podido iniciar sesión débido a: " + error)
        }
    };




    return (
        <div className="grid grid-cols-1 md:grid-cols-2 h-screen w-screen">
          <section className="bg-sky-50 flex items-center justify-center">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 mx-4 md:mx-0">
              <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 mb-6">
                Ingresar a tu cuenta
              </h1>
              <form className="space-y-4" onSubmit={handleLogin}>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="name@company.com"
                    required
                    value={credentials.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    value={credentials.password}
                    required
                    onChange={handleChange}
                  />
                </div>
                <p className="text-red-400 text-base text-semibold font-mono">{errors}</p>
                <button
                  type="submit"
                  className="w-full text-white bg-sky-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg px-5 py-2.5 text-center"
                >
                  Ingresar
                </button>
                <p className="text-sm font-light text-gray-500 mt-4">
                  <a href="/" className="font-medium text-primary-600 hover:underline">
                    Regresar
                  </a>
                </p>
              </form>
            </div>
          </section>
          <div className="hidden md:flex flex-col items-center justify-center bg-sky-200 text-white p-6">
            <div className="text-center">
              <p className="text-2xl md:text-4xl lg:text-3xl font-bold mb-2">
                {currentFrase.phrase}
              </p>
              <p className="text-lg md:text-xl font-semibold">{`- ${currentFrase.autor}`}</p>
            </div>
          </div>
        </div>
      );
      
}

export default Login;
