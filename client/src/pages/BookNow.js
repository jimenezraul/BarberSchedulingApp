import { useState, useEffect } from "react";
import { getOrCreate_customer, get_all_services } from "../api";
import AppointmentCard from "../components/AppointmentCard";
import CalendarScreen from "../components/Calendar";
import DateCard from "../components/DateCard";
import SideCard from "../components/ServiceCard";
import TimeCard from "../components/TimeCard";
import { formatDate } from "../utils/helpers";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "../components/Login";
import ConfirmCard from "../components/ConfirmCard";
import { CircularProgress } from "@mui/material";


const BookNow = () => {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const [section, setSection] = useState("All Services");
  const [allServices, setAllServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const token = await getAccessTokenSilently();
      const services = await get_all_services();
      const customer = await getOrCreate_customer(token);
      setCustomer(customer.customer[0].key);
      setAllServices(services);
    }
    if (isAuthenticated) {
      fetchData();
    }
  }, [user, getAccessTokenSilently, isAuthenticated]);

  if (!isAuthenticated) {
    return <Login />;
  }

  if (section === "Reset") {
    setSection("All Services");
  }

  return (
    <div className='container mx-auto flex flex-1'>
      <div className='flex flex-col text-gray-50 mt-1 flex-1'>
        {/* All Services */}
        {section === "All Services" && (
          <div className='flex flex-wrap justify-center p-3'>
            {!allServices.length ? (
              <div className='w-full md:w-4/12 p-1'>
                <div className='p-10 flex justify-center rounded-lg border border-gray-600 mx-auto bg-gray-800'>
                <CircularProgress color="loader" />
                </div>
              </div>
            ) : (
              allServices.map((service) => (
                <AppointmentCard
                  key={service.key}
                  appointment={service}
                  setSection={setSection}
                  setSelectedService={setSelectedService}
                />
              ))
            )}
          </div>
        )}
        {/* End Services */}
        {/* Dates */}
        {section === "Dates" && (
          <div className='flex flex-wrap p-3'>
            <div className='w-full md:w-4/12 p-1'>
              <SideCard
                setSection={setSection}
                selectedService
                service={selectedService}
              />
            </div>
            <div className='w-full md:w-8/12 p-1'>
              <div className='rounded-lg border border-gray-600 mx-auto bg-gray-700'>
                <CalendarScreen
                  setSelectedDate={setSelectedDate}
                  setSection={setSection}
                />
              </div>
            </div>
          </div>
        )}
        {/* End Dates */}
        {/* Times */}
        {section === "Times" && (
          <div className='flex flex-wrap p-3'>
            <div className='w-full md:w-4/12 p-1 space-y-2'>
              <SideCard setSection={setSection} service={selectedService} />
              <DateCard
                setSection={setSection}
                date={formatDate(selectedDate)}
              />
            </div>
            <div className='w-full md:w-8/12 p-1'>
              <TimeCard
                selectedService={selectedService}
                selectedDate={selectedDate}
                setSelectedTime={setSelectedTime}
                setSection={setSection}
              />
            </div>
          </div>
        )}
        {/* End Times */}
        {/* Confirm */}
        {section === "Confirm" && (
          <div className='flex flex-wrap flex-1 justify-center content-center p-3'>
            <div className='w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 '>
              <ConfirmCard
                selectedService={selectedService}
                selectedDate={formatDate(selectedDate)}
                originalDate={selectedDate}
                selectedTime={selectedTime}
                setSection={setSection}
                customer={customer}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default BookNow;
