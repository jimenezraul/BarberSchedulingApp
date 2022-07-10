import Calendar from "react-calendar";
import { pastdate } from "../../utils/helpers";
import "./style.css";

const CalendarScreen = ({ setSelectedDate, setSection }) => {
  const clickHandler = (date) => {
    setSelectedDate(date);
    setSection("Times");
  };
  return (
    <div className='flex flex-col'>
      <div className='relative p-5 bg-gray-800 rounded-t-lg shadow'>
        <h1 className='font-bold text-1xl'>Select a Date</h1>
        <div className='font-bold absolute flex flex-col top-2 right-5'>
          <i className='text-grey-100 bi bi-square-fill'>
            <span className='pl-2 text-gray-200'>Available</span>
          </i>
          <i className='text-red-700 bi bi-square-fill'>
            <span className='pl-2 text-gray-200'>Not Available</span>
          </i>
        </div>
      </div>
      <div className='flex flex-col h-full p-5'>
        <Calendar
          calendarType='US'
          onClickDay={(value) => clickHandler(value)}
          tileDisabled={pastdate}
        />
      </div>
    </div>
  );
};
export default CalendarScreen;
