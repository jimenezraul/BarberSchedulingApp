import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { get_appointments } from "../api";
import AppointmentList from "../components/AppointmentList";
import Login from "../components/Login";
import { useDispatch, useSelector } from "react-redux";
import {
  updateAppointments,
  updateLoading,
  updateAlert,
} from "../redux/Store/appointmentSlice";
import { Alert, AlertTitle, Slide } from "@mui/material";

export default function Profile() {
  const alert = useSelector((state) => state.appointments.alert);
  const dispatch = useDispatch();
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    async function getCustomer() {
      dispatch(updateLoading(true));
      const token = await getAccessTokenSilently();
      const appointments = await get_appointments(token);
      dispatch(updateAppointments(appointments));
      dispatch(updateLoading(false));
    }
    if (isAuthenticated) {
      getCustomer();
    }
  }, [getAccessTokenSilently, isAuthenticated, dispatch]);

  useEffect(() => {
    if (alert.show) {
      setTimeout(() => {
        dispatch(updateAlert({ show: false }));
      }, 4000);
    }
  }, [alert, dispatch]);

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className='flex-1'>
      <div className='container mx-auto mt-5'>
        <div className='w-full'>
          <div className='flex flex-col'>
            <div className='flex flex-col justify-center'>
              <div className='relative p-5 flex justify-center overflow-hidden'>
                <Slide
                  direction='left'
                  in={alert.show}
                  className='absolute top-0 right-5'
                >
                  <Alert severity={alert.type ? alert.type : "success"}>
                    <AlertTitle className='capitalize'>{alert.type}</AlertTitle>
                    <strong className='capitalize'>{alert.message}</strong>
                  </Alert>
                </Slide>
                <div className='mt-10 mx-auto flex flex-col text-center  border border-gray-600 w-full md:w-6/12 lg:w-4/12 rounded-xl bg-gray-800 shadow-lg'>
                  <div className='mx-auto flex justify-center border-gray-600 w-48 md:w-80'>
                    {user.provider === "email" ? (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='-mt-14 h-28 bg-gray-800 shadow-lg rounded-full fill-current text-gray-300 bi bi-person-circle'
                        viewBox='0 0 16 16'
                      >
                        <path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z' />
                        <path
                          fill-rule='evenodd'
                          d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z'
                        />
                      </svg>
                    ) : (
                      <img
                        className='-mt-14 border-2 border-gray-600 shadow-md rounded-full h-28 bg-gray-700'
                        src={user.picture.replace("s96-c", "s384-c", true)}
                        alt='Profile'
                        referrerPolicy='no-referrer'
                      />
                    )}
                  </div>
                  <div className='text-gray-200 flex flex-col justify-center items-center'>
                    <div className='p-5 w-full justify-center flex flex-col'>
                      <h1 className='font-bold'>{user.name}</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col justify-center'>
              <div className='px-5 flex justify-center w-full'>
                <div className='overflow-hidden flex flex-col text-center border border-gray-600 justify-center w-full md:w-10/12 lg:w-6/12 xl:w-5/12 rounded-xl bg-gray-800 shadow-lg mb-10'>
                  <div className='flex flex-col text-gray-200 pt-5'>
                    <h1 className='font-bold text-xl pb-4'>Appointments</h1>
                    <AppointmentList />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
