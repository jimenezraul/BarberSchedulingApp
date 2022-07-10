const SideCard = ({ selectedService, service, setSection }) => {
  const { categoryName } = service;

  return (
    <div className='rounded-lg border border-gray-600 overflow-hidden'>
      <div className='shadow relative font-bold text-1xl p-5 bg-gray-800 rounded-t-lg'>
        Selected Service
        <i
          onClick={() => setSection("All Services")}
          className='cursor-pointer text-2xl hover:bg-gray-600 p-2 absolute top-2 rounded-lg right-5 bi bi-pencil-square'
        ></i>
      </div>
      <div className='flex flex-col h-full'>
        <div className='flex flex-wrap p-5 bg-gray-700'>
          <div className='w-full font-semibold text-gray-100 rounded-lg'>
            <h1 className='px-1 pb-2 border-b border-gray-500 text-lg'>
              {categoryName}
            </h1>
          </div>
          <div className='flex justify-between w-full px-1 mt-2'>
            <div className='font-semibold'>{service.service_name}</div>
            <div className='font-semibold'>${service.cost}</div>
          </div>
          <div className='px-1 w-full'>
            <p className='text-xs'>{service.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideCard;
