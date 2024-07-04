import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {
    occasion: "",
    recipient: "",
    gender: "",
    ageGroup: "",
    religion: "",
    jewelryType: "",
    budget: "",
    photo: null,
  },
  imageData: [], // Initialize as an empty array
  isFormSubmitted: false,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setImageData: (state, action) => {
      state.imageData = action.payload;
    },
    setFormSubmitted: (state, action) => {
      state.isFormSubmitted = action.payload;
    },
  },
});

export const { updateFormData, setImageData, setFormSubmitted } = formSlice.actions;

export default formSlice.reducer;