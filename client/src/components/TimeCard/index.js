import { formattedDate } from "../../utils/helpers";
import { get_availability } from "../../api";
import { useState, useEffect } from "react";
import Loader from "../Loader";
import { useAuth0 } from "@auth0/auth0-react";

const TimeCard = ({
  selectedService,
  selectedDate,
  setSelectedTime,
  setSection,
}) => {
  const { getAccessTokenSilently } = useAuth0();
  const formatted_date = formattedDate(selectedDate.toLocaleDateString());
  const service = selectedService.key;
  const staff = selectedService.staff_keys[0];

  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const token = await getAccessTokenSilently();
      const availability = await get_availability(
        staff,
        service,
        formatted_date,
        token
      );
      setAvailability(availability);
      setLoading(false);
    }
    fetchData();
  }, [formatted_date, service, staff, getAccessTokenSilently]);

  const timeHandler = (time) => {
    setSelectedTime(time);
    setSection("Confirm");
  };

  return (
    <div className='rounded-lg border border-gray-600 overflow-hidden text-gray-50'>
      <div className='shadow relative font-bold text-1xl p-5 bg-gray-800 rounded-t-lg'>
        Select a Time
      </div>
      <div className='flex flex-col h-full'>
        <div className='flex flex-wrap bg-gray-700'>
          <div className='flex flex-col w-full text-center'>
            {loading ? (
              <div className='py-2 px-3 align-middle flex justify-center min-w-full'>
                <Loader />
              </div>
            ) : availability.length > 0 ? (
              availability?.map((time, index) => {
                const is_last = index === availability.length - 1;

                return (
                  <div
                    onClick={() => timeHandler(time)}
                    key={index}
                    className={`p-5 font-semibold ${
                      !is_last && "border-b border-gray-600"
                    } hover:bg-gray-800 `}
                  >
                    {time.time}
                  </div>
                );
              })
            ) : (
              <div className='py-2 px-3 align-middle flex justify-center min-w-full'>
                <div className='text-center py-8'>
                  <h1 className='text-gray-100'>No Available Times</h1>
                  <p className='text-gray-100'>
                    Please select a different date.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeCard;
