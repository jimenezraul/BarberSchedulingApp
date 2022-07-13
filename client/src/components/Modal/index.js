import { Button, Modal} from "@mui/material";
import CalendarScreen from "../Calendar";
import { useEffect, useState } from "react";
import TimeCard from "../TimeCard";
import ConfirmCard from "../ConfirmCard";
import { formatDate } from "../../utils/helpers";

const RescheduleModal = ({ open, handleClose, appointment }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [section, setSection] = useState("calendar");

  useEffect(() => {
    if (section === "Reset") {
      handleClose();
    }
  }, [section, handleClose]);

  const service = {
    ...appointment.service,
    service_key: appointment.service_key,
    ...appointment.category,
    appointment_key: appointment.key,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      className='flex flex-col max-h-screen overflow-y-auto'
    >
      <div className='flex flex-col flex-1 justify-center'>
        <div className='flex justify-center content-center p-2'>
          {section === "calendar" && (
            <div className=' bg-gray-700 rounded-lg w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-5/12'>
              <CalendarScreen
                setSelectedDate={setSelectedDate}
                setSection={setSection}
              />
              <div className='flex justify-end p-2 text-gray-50'>
                <Button
                  onClick={handleClose}
                  variant='contained'
                  color='secondary'
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
          {section === "Times" && (
            <div className='bg-gray-700 rounded-lg w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-5/12'>
              <TimeCard
                selectedService={appointment.service}
                selectedDate={selectedDate}
                setSelectedTime={setSelectedTime}
                setSection={setSection}
              />
              <div className='flex justify-end p-2 space-x-2'>
                <Button
                  onClick={() => setSection("calendar")}
                  variant='contained'
                  color='primary'
                >
                  Back
                </Button>
                <Button
                  onClick={handleClose}
                  variant='contained'
                  color='secondary'
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
          {section === "Confirm" && (
            <div className='bg-gray-700 rounded-lg w-full'>
              <ConfirmCard
                selectedService={service}
                selectedDate={formatDate(selectedDate)}
                originalDate={selectedDate}
                selectedTime={selectedTime}
                setSection={setSection}
                customer={appointment.customer_key}
                isModal
                handleClose={handleClose}
              />
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default RescheduleModal;
