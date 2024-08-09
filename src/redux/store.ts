import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice';
import authReducer from './authSlice';
import likedImagesReducer from './likedImagesSlice'; 

export const store = configureStore({
  reducer: {
    form: formReducer,
    auth: authReducer,
    likedImages: likedImagesReducer,
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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
