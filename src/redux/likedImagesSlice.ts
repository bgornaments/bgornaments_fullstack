import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LikedImagesState {
  likedImages: number[];
}

const initialState: LikedImagesState = {
  likedImages: [],
};

const likedImagesSlice = createSlice({
  name: 'likedImages',
  initialState,
  reducers: {
    addLikedImage(state, action: PayloadAction<number>) {
      if (!state.likedImages.includes(action.payload)) {
        state.likedImages.push(action.payload);
      }
    },
    removeLikedImage(state, action: PayloadAction<number>) {
      state.likedImages = state.likedImages.filter(id => id !== action.payload);
    },
    setLikedImages(state, action: PayloadAction<number[]>) {
      state.likedImages = action.payload;
    },
  },
});

export const { addLikedImage, removeLikedImage, setLikedImages } = likedImagesSlice.actions;

export const selectLikedImagesCount = (state: { likedImages: LikedImagesState }) => state.likedImages.likedImages.length;

export default likedImagesSlice.reducer;
