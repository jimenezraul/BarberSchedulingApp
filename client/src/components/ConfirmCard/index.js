const ConfirmCard = ({
  selectedService,
  selectedDate,
  selectedTime,
  setSection,
}) => {
  const { categoryName, service_name, cost } = selectedService;
  const [dayOfWeekName, monthName, dayOfMonth, year] = selectedDate;
  const { time } = selectedTime;

  return (
    <div className='flex flex-col w-full lg:w-8/12 mx-auto border bg-gray-700 border-gray-600 rounded-lg'>
      <div className='shadow relative font-bold text-1xl text-center p-5 bg-gray-800 rounded-t-lg'>
        Appointment
        <div
          onClick={() => setSection("Times")}
          className='shadow text-gray-200 cursor-pointer absolute  bg-gray-600 hover:bg-gray-700 top-3 left-5 px-5 py-2 rounded-lg'
        >
          Back
        </div>
      </div>
      <div className='flex flex-col'>
        <div className='mx-auto  flex flex-col justify-center px-5 pt-5 w-full md:w-1/2 p-4'>
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
        <div className='px-5 flex flex-col justify-center w-full md:w-1/2 mx-auto'>
          <div className='font-bold'>{dayOfWeekName}</div>
          <div className='font-semibold mb-5'>
            {monthName} {dayOfMonth}, {year} at {time}
          </div>
        </div>
        <div className='flex flex-col justify-center text-center'>
          <div className='px-5 pb-5 text-center font-bold'>
            <h1
              onClick=''
              className='cursor-pointer p-5 border-2 border-gray-200 
                        rounded-lg xs:w-11/12 sm:w-10/12 md:w-8/12 lg:w-1/2 mx-auto
                        hover:bg-gray-200 hover:text-gray-700'
            >
              Confirm
            </h1>
            <h1
              onClick={() => setSection("All Services")}
              className='mt-2 text-gray-800 hover:text-gray-100 border hover:border-gray-500 cursor-pointer p-5 bg-gray-300 hover:bg-gray-800
                        rounded-lg xs:w-11/12 sm:w-10/12 md:w-8/12 lg:w-1/2 mx-auto '
            >
              Cancel
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmCard;
