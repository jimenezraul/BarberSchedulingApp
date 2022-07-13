import { useAuth0 } from "@auth0/auth0-react";
import { delete_appointment } from "../../api";
import { useDispatch } from "react-redux";
import {
  removeAppointment,
  updateLoading,
} from "../../redux/Store/appointmentSlice";
import { Button } from "@mui/material";
import { useState } from "react";
import RescheduleModal from "../Modal";

const AppCard = ({ appointment }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  return (
    <div key={appointment.service.key} className='flex bg-gray-700'>
      <div className='w-full p-5 flex flex-col justify-between border-t border-gray-700'>
        <div className='flex justify-between mb-3 pb-3 border-b border-gray-500'>
          <div>
            <h1 className='text-gray-100 text-lg px-1 py-1 font-semibold'>
              {categoryName}
            </h1>
          </div>
        </div>
        <div className='flex flex-col mb-3 text-start px-1'>
          <p>
            {service_name} <span>${cost}</span>
          </p>
          <p>{date}</p>
          <p>at {time}</p>
        </div>
        <div className='space-x-3 text-end'>
          <Button onClick={handleOpen} variant='contained' color='primary'>
            Reschedule
          </Button>
          <Button
            onClick={() => deleteAppointment()}
            variant='contained'
            color='secondary'
          >
            Cancel
          </Button>
        </div>
      </div>
      {open && (
        <RescheduleModal
          open={open}
          handleClose={handleClose}
          appointment={appointment}
        />
      )}
    </div>
  );
};

export default AppCard;
