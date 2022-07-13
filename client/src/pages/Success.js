import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Badge, IconButton } from "@mui/material";

const Success = () => {
  const navigate = useNavigate();

  //timer for redirecting to home page
  const [timer, setTimer] = useState(5);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((timer) => timer - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  //redirect to home page after 5 seconds
  useEffect(() => {
    if (timer === 0) {
      navigate("/profile");
    }
  }, [timer, navigate]);

  return (
    <div>
      <div className='container mx-auto mt-5'>
        <div className='flex flex-col w-full lg:w-8/12 mx-auto border bg-gray-700 border-gray-600 rounded-lg text-gray-50'>
          <div className='shadow relative font-bold text-1xl text-center p-5 bg-gray-800 rounded-t-lg'>
            Thank You!
          </div>
          <div className='flex flex-col text-center p-14'>
            <h1 className='text-lg'>Your appointment has been scheduled.</h1>
            <p className='text-xs mt-2'>
              You will be redirect to your Profile page{" "}
              <IconButton>
              <Badge
                className='block'
                color='secondary'
                badgeContent={timer}
                ></Badge>
                </IconButton>
              seconds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
