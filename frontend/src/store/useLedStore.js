import { create } from 'zustand'
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useLedStore = create((set, get) => ({
  ledState: false,
  isChangingLedState: false,
  isGettingLedState: false,

  getLedState: async () => {
    set({ isGettingLedState: true });
    try {
      const res = await axiosInstance.get("/led/state");
      set({ ledState: res.data.led });
    } catch (error) {
      console.error("Error in getLedState: ", error);
    } finally {
      set({ isGettingLedState: false });
    }
  },

  setLedOn: async () => {
    set({ isChangingLedState: true });
    try {
      const res = await axiosInstance.post("/led/on");
      set({ ledState: res.data.led });
      toast.success("Włączono LED");
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      set({ isChangingLedState: false });
    }
  },

  setLedOff: async () => {
    set({ isChangingLedState: true });
    try {
      const res = await axiosInstance.post("/led/off");
      set({ ledState: res.data.led });
      toast.success("Wyłączono LED");
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      set({ isChangingLedState: false });
    }
  },

}));