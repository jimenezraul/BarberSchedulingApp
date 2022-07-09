import Loader from "../Loader";
import AppCard from "./AppCard";

function AppointmentList({ appointments }) {
  return (
    <div>
      <div>
        {appointments === null ? (
          <div className='flex justify-center border-t border-gray-700'>
            <Loader />
          </div>
        ) : appointments.length > 0 ? (
          appointments.map((appointment) => (
            <AppCard key={appointment.key} appointment={appointment} />
          ))
        ) : (
          <div className='flex justify-center '>
            <div
              id='noApp'
              className='p-5 w-full justify-center flex flex-col border-t border-gray-700'
            >
              <h4>You don't have any upcoming appointments.</h4>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AppointmentList;
