import { useAuth0 } from "@auth0/auth0-react";
import { delete_appointment } from "../../api";
import { useDispatch } from "react-redux";
import {
  removeAppointment,
  updateLoading,
} from "../../redux/Store/appointmentSlice";

const AppCard = ({ appointment }) => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();
  const { categoryName } = appointment.category;
  const { service_name, cost } = appointment.service;
  const { date, time } = appointment.date;

  const deleteAppointment = async () => {
    dispatch(updateLoading(true));
    const token = await getAccessTokenSilently();
    const res = await delete_appointment(appointment.key, token);
    if (res.response) {
      dispatch(removeAppointment(appointment.key));
    }
    dispatch(updateLoading(false));
  };

  const editAppointment = async () => {
    console.log("Edit appointment");
  };

  return (
    <div key={appointment.service.key} className='flex bg-gray-700'>
      <div className='w-full p-5 flex flex-col justify-between border-t border-gray-700'>
        <div className='flex justify-between mb-3 pb-3 border-b border-gray-500'>
          <div>
            <h1 className='text-gray-100 text-lg px-1 py-1 font-semibold'>
              {categoryName}
            </h1>
          </div>
          <div className='space-x-3'>
            <i
              onClick={() => editAppointment()}
              className='text-2xl cursor-pointer rounded-xl hover:bg-gray-600 p-4 bi bi-pencil-square'
            ></i>
            <i
              onClick={() => deleteAppointment()}
              className='text-2xl cursor-pointer rounded-xl  hover:text-gray-200 hover:bg-red-900 p-4 bi bi-trash-fill'
            ></i>
          </div>
        </div>
        <div className='flex flex-col mb-3 text-start px-1'>
          <p>
            {service_name} <span>${cost}</span>
          </p>
          <p>{date}</p>
          <p>at {time}</p>
        </div>
      </div>
    </div>
  );
};

export default AppCard;
