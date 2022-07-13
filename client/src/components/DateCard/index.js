const DateCard = ({ date, setSection }) => {
  const dayOfWeekName = date[0];
  const fulldate = `${date[1]} ${date[2]}, ${date[3]}`;

  return (
    <div className='rounded-lg border border-gray-600 overflow-hidden'>
      <div className='shadow relative font-bold text-1xl p-5 bg-gray-800 rounded-t-lg'>
        Selected Date
        <i
          onClick={() => setSection("Dates")}
          className='cursor-pointer text-2xl hover:bg-gray-600 p-2 absolute top-2 rounded-lg right-5 bi bi-pencil-square'
        ></i>
      </div>
      <div className='flex flex-col h-full'>
        <div className='flex flex-wrap p-5 bg-gray-700'>
          <div className='w-full font-semibold text-gray-100 rounded-lg'>
            <h1 className='px-1 text-lg'>{dayOfWeekName}</h1>
          </div>
          <div className='flex w-full px-1 mt-2'>
            <div className='font-semibold'>{fulldate}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DateCard;
