const AppCard = ({ appointment }) => {
  return (
    <div key={appointment.service.key} className='flex'>
      <div className='p-5 w-8/12 md:w-8/12 flex flex-col justify-between border-t border-gray-700'>
        <div className='flex justify-center mb-3'>
          <p className='text-gray-100 bg-blue-500 px-3 py-1 rounded-lg shadow font-semibold'>
            {appointment.category.categoryName}
          </p>
        </div>
        <h4>{appointment.service.service_name}</h4>
        <p>Price: ${appointment.cost}</p>
        <h4>{appointment.date.date}</h4>
        <h4>at {appointment.date.time}</h4>
      </div>
      <div className='w-4/12 md:w-4/12 text-2xl sm:space-x-2 md:space-x-8 justify-center items-center flex border-t border-gray-700'>
        <i
          onClick=''
          className='cursor-pointer rounded-xl hover:bg-gray-700 p-4 bi bi-pencil-square'
        ></i>
        <i
          onClick=''
          className='cursor-pointer rounded-xl  hover:text-gray-200 hover:bg-red-900 p-4 bi bi-trash-fill'
        ></i>
      </div>
    </div>
  );
};

export default AppCard;
