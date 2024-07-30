import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FormData {
  occasion: string;
  gender: string;
  ageGroup: string;
  jewelryType: string;
}

export interface FormState {
  formData: FormData;
  imageData: string[];
  isFormSubmitted: boolean;
}

const initialState: FormState = {
  formData: {
    occasion: "",
    gender: "",
    ageGroup: "",
    jewelryType: "",
  },
  imageData: [],
  isFormSubmitted: false,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateFormData: (state, action: PayloadAction<Partial<FormData>>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setImageData: (state, action: PayloadAction<string[]>) => {
      state.imageData = action.payload;
    },
    setFormSubmitted: (state, action: PayloadAction<boolean>) => {
      state.isFormSubmitted = action.payload;
    },
  },
});

export const { updateFormData, setImageData, setFormSubmitted } = formSlice.actions;

export default formSlice.reducer;
