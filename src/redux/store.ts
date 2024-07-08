import { configureStore } from '@reduxjs/toolkit';
import formReducer, { FormState } from './formSlice';

export const store = configureStore({
  reducer: {
    form: formReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['form/updateFormData'],
        ignoredActionPaths: ['payload.photo'],
        ignoredPaths: ['form.formData.photo'],
      },
    }),
});

// Define the root state type
export type RootState = {
  form: FormState;
};

// Define the app dispatch type
export type AppDispatch = typeof store.dispatch;
