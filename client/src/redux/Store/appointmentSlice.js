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
    removeAppointment: (state, action) => {
      state.appointments = state.appointments.filter(
        (appointment) => appointment.key !== action.payload
      );
    },
    updateLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { updateAppointments, removeAppointment, updateLoading } =
  appointmentSlice.actions;

export default appointmentSlice.reducer;
