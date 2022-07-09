import { useState, useEffect } from "react";
import { get_all_services } from "../api";
import AppointmentCard from "../components/AppointmentCard";
import CalendarScreen from "../components/Calendar";
import Loader from "../components/Loader";
import SideCard from "../components/ServiceCard";

const BookNow = () => {
  const [section, setSection] = useState("All Services");
  const [allServices, setAllServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const services = await get_all_services();
      setAllServices(services);
    }
    fetchData();
  }, []);
  console.log(selectedService);
  return (
    <div className='container mx-auto flex-1'>
      <div className='flex flex-col text-gray-50 '>
        <h1 className='text-center font-bold py-5 text-2xl'>{section}</h1>
        {/* All Services */}
        {section === "All Services" && (
          <div className='flex flex-wrap'>
            {!allServices.length ? (
              <div className='py-2 px-3 align-middle flex justify-center min-w-full mb-32'>
                <Loader />
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
          <div className='flex flex-wrap'>
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
                  service={selectedService}
                  setSelectedDate={setSelectedDate}
                />
              </div>
            </div>
          </div>
        )}
        {/* End Dates */}
      </div>
    </div>
  );
};
export default BookNow;
