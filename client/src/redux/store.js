import { configureStore } from "@reduxjs/toolkit";
import appointmentSlice from "./Store/appointmentSlice";

export default configureStore({
  reducer: {
    appointments: appointmentSlice,
  },
});
