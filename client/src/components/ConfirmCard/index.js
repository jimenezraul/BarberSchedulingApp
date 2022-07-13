import { formatDateToSetmore } from "../../utils/helpers";
import { useAuth0 } from "@auth0/auth0-react";
import { create_appointment, update_appointment } from "../../api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../Loader";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import {
  updateAppointment,
  updateAlert,
} from "../../redux/Store/appointmentSlice";

const ConfirmCard = ({
  selectedService,
  selectedDate,
  selectedTime,
  setSection,
  customer,
  originalDate,
  isModal,
  handleClose,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { getAccessTokenSilently } = useAuth0();
  const {
    key,
    categoryName,
    service_name,
    cost,
    staff_keys,
    appointment_key,
    service_key,
  } = selectedService;
  const [dayOfWeekName, monthName, dayOfMonth, year] = selectedDate;
  const { slot, time } = selectedTime;

  const confirmHandler = async () => {
    const token = await getAccessTokenSilently();
    const [start_time, end_time] = formatDateToSetmore(originalDate, slot);

    const data = {
      staff_key: staff_keys[0],
      service_key: key,
      customer_key: customer,
      start_time: start_time,
      end_time: end_time,
      cost: cost,
      accessToken: token,
    };

    setLoading(true);

    if (!isModal) {
      const res = await create_appointment(data);

      if (res.response) {
        setLoading(false);
        navigate("/success");
        return;
      }
      throw new Error("Something went wrong");
    }

    const res = await update_appointment({
      ...data,
      appointment_key: appointment_key,
      service_key: service_key,
    });

    if (res.response) {
      setLoading(false);
      dispatch(updateAppointment(res.data));
      handleClose();
      dispatch(
        updateAlert({
          type: "success",
          message: "Appointment was updated successfully",
          show: true,
        })
      );
      return;
    }
    throw new Error("Something went wrong while updating");
  };

  return (
    <>
      {!loading ? (
        <div className='flex flex-col w-full border bg-gray-700 border-gray-600 rounded-lg text-gray-50'>
          <div className='shadow relative font-bold text-1xl text-center p-5 bg-gray-800 rounded-t-lg'>
            Appointment
            <div
              onClick={() => setSection("Times")}
              className='cursor-pointer absolute top-3 left-5'
            >
              <Button
                variant='contained'
                color='blueGrey'
                className='hover:bg-gray-700'
              >
                back
              </Button>
            </div>
          </div>
          <div className='flex flex-col'>
            <div className='mx-auto  flex flex-col justify-center px-5 pt-5 w-full p-4'>
              <div className='font-semibold text-xl text-gray-100 border-b border-gray-500'>
                {categoryName}
              </div>
              <div className='flex justify-between w-full pt-3'>
                <div className='font-semibold'>{service_name}</div>
                <div className='font-semibold'>${cost}</div>
              </div>
              <p className='text-xs border-b border-gray-500 pb-3'>
                {selectedService.description}
              </p>
            </div>
            <div className='px-5 flex flex-col justify-center w-full mx-auto'>
              <div className='font-bold'>{dayOfWeekName}</div>
              <div className='font-semibold mb-5'>
                {monthName} {dayOfMonth}, {year} at {time}
              </div>
            </div>
            <div className='flex flex-col justify-center w-full mx-auto'>
              <div className='px-5 pb-5 text-end font-bold space-x-2'>
                <Button onClick={() => confirmHandler()} variant='contained'>
                  Confirm
                </Button>
                <Button
                  onClick={() => setSection("Reset")}
                  variant='contained'
                  color='secondary'
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex flex-col w-full mx-auto border bg-gray-700 border-gray-600 rounded-lg text-gray-50'>
          <div className='shadow relative font-bold text-1xl text-center p-5 bg-gray-800 rounded-t-lg'>
            Loading ...
          </div>
          <div className='flex justify-center'>
            <Loader />
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmCard;
