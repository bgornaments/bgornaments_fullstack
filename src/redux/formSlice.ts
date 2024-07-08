import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FormData {
  occasion: string;
  recipient: string;
  gender: string;
  ageGroup: string;
  religion: string;
  jewelryType: string;
  budget: string;
  photo: string | null; // Changed to string to store base64 string
  outfitCaption: string;
}

export interface FormState {
  formData: FormData;
  imageData: string[]; // Assuming imageData is an array of strings (URLs)
  isFormSubmitted: boolean;
}

const initialState: FormState = {
  formData: {
    occasion: "",
    recipient: "",
    gender: "",
    ageGroup: "",
    religion: "",
    jewelryType: "",
    budget: "",
    photo: null,
    outfitCaption:"",
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
