import { createSlice } from "@reduxjs/toolkit";

export const appointmentSlice = createSlice({
  name: "appointments",
  initialState: {
    appointments: [],
    loading: false,
    alert: {
      type: "",
      message: "",
      show: false,
    }
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
      const appointment = action.payload;

      const index = state.appointments.findIndex(
        (app) => app.key === appointment.key
      );
      state.appointments.splice(index, 1);
    },
    updateLoading: (state, action) => {
      state.loading = action.payload;
    },
    updateAlert: (state, action) => {
      state.alert = action.payload;
    }
  },
});

export const {
  updateAppointments,
  removeAppointment,
  updateLoading,
  updateAppointment,
  updateAlert,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
