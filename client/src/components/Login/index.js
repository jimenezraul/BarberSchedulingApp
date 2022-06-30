import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { loginWithPopup } = useAuth0();
  return (
    <div className='py-2 px-3 align-middle flex justify-center min-w-full mb-32'>
      <div className='bg-gray-800 shadow-lg overflow-hidden w-full md:w-9/12 lg:w-6/12 rounded-lg border border-gray-600 text-center py-10 px-2'>
        <h1 className='text-gray-50 text-2xl border-b border-gray-600 pb-4'>
          Please click the button below to login
        </h1>
        <button
          className='bg-gray-50 hover:bg-gray-200 text-white font-bold py-2 px-4 rounded mt-10'
          onClick={loginWithPopup}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
