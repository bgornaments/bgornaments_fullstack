import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice';


// Define RootState interface
export interface RootState {
  form: {
    formData: FormDataState;
    imageData: ImageDataState;
    isFormSubmitted: boolean;
    // Add other slices here if needed
  };
}



// Define type for formData state slice
export interface FormDataState {
  // Define properties of formData state slice
  occasion: string;
  recipient: string;
  gender: string;
  ageGroup: string;
  religion: string;
  jewelryType: string;
  budget: string;
  photo: null,
  // Add other properties here
}

// Define type for imageData state slice
export interface ImageDataState {
  // Define properties of imageData state slice
  images: string[];
  loading: boolean;
  // Add other properties here
}



export const store = configureStore({
  reducer: {
    form: formReducer,
  },
});