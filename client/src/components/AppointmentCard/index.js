const AppointmentCard = ({
  appointment,
  setSection,
  setSelectedService,
  loader,
}) => {
  const clickHandler = (service, category) => {
    setSection("Dates");
    setSelectedService({
      ...service,
      categoryName: category,
    });
  };

  return (
    <div key={appointment.key} className='p-1 w-full md:w-4/12 text-gray-50'>
      <div className='shadow-lg rounded-lg bg-gray-700 border border-gray-600 overflow-hidden'>
        <div className='font-bold text-1xl text-center p-5 bg-gray-800 rounded-t-lg'>
          {appointment.categoryName}
        </div>
        <div className='cursor-pointer flex flex-col h-full'>
          <div className='flex w-full justify-center'>{loader}</div>
          {appointment.services.map((service) => (
            <div
              onClick={() => clickHandler(service, appointment.categoryName)}
              key={service.key}
            >
              <div className='flex flex-col justify-between p-5 border-t border-gray-600 hover:bg-gray-800'>
                <div className='font-semibold flex justify-between'>
                  {service.service_name}
                  <div>${service.cost}</div>
                </div>
                <p className='text-xs'>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default AppointmentCard;
