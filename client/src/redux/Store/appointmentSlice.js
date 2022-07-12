import { createSlice } from "@reduxjs/toolkit";

export const appointmentSlice = createSlice({
  name: "appointments",
  initialState: {
    appointments: [],
    loading: false,
  },
  reducers: {
    updateAppointments: (state, action) => {
      state.appointments = action.payload;
    },
    updateAppointment: (state, action) => {
      const appointment = action.payload;
      
      const index = state.appointments.findIndex(
        (app) => app.key === appointment.appointment.key
      );
      state.appointments[index] = {
        ...state.appointments[index],
        ...appointment,
      };
    },
    removeAppointment: (state, action) => {
      state.appointments = state.appointments.filter(
        (appointment) => appointment.key !== action.payload.key
      );
    },
    updateLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  updateAppointments,
  removeAppointment,
  updateLoading,
  updateAppointment,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
