import { Button, Modal, Box } from "@mui/material";
import CalendarScreen from "../Calendar";
import { useEffect, useState } from "react";
import TimeCard from "../TimeCard";
import ConfirmCard from "../ConfirmCard";
import { formatDate } from "../../utils/helpers";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
};

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
    >
      <Box sx={style} className='bg-gray-700 rounded-lg overflow-auto'>
        {section === "calendar" && (
          <>
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
          </>
        )}
        {section === "Times" && (
          <div className='max-h-96'>
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
          <div className='w-full'>
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
      </Box>
    </Modal>
  );
};

export default RescheduleModal;
