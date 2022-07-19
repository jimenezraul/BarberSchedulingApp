import { CircularProgress } from "@mui/material";
import AppCard from "./AppCard";
import { useSelector } from "react-redux";

function AppointmentList() {
  const appointments = useSelector((state) => state.appointments.appointments);

  const loading = useSelector((state) => state.appointments.loading);
  return (
    <div>
      {loading ? (
        <div className='p-10 flex justify-center border-t border-gray-600 bg-gray-700'>
        <CircularProgress color="loader" />
        </div>
      ) : appointments.length > 0 ? (
        appointments.map((appointment) => (
          <AppCard key={appointment.key} appointment={appointment} />
        ))
      ) : (
        <div className='flex justify-center '>
          <div
            id='noApp'
            className='p-8 w-full justify-center flex flex-col border-t border-gray-600 bg-gray-700'
          >
            <h4>You don't have any upcoming appointments.</h4>
          </div>
        </div>
      )}
    </div>
  );
}

export default AppointmentList;
