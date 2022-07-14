import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

const Login = () => {
  const { loginWithPopup } = useAuth0();

  return (
    <div className='align-middle flex justify-center min-w-full mb-32'>
      <div className='bg-gray-700 shadow-lg overflow-hidden w-full md:w-9/12 lg:w-6/12 rounded-lg border border-gray-600 text-center'>
        <div className='bg-gray-800 pt-5'>
          <h1 className='text-gray-50 text-2xl border-b border-gray-600 pb-4'>
            Login to your Account
          </h1>
        </div>
        <div className='p-10 '>
          <Button onClick={loginWithPopup} variant='contained'>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
