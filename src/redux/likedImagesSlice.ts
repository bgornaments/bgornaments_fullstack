import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LikedImagesState {
  likedImages: string[];
}

const initialState: LikedImagesState = {
  likedImages: [],
};

const likedImagesSlice = createSlice({
  name: 'likedImages',
  initialState,
  reducers: {
    addLikedImage(state, action: PayloadAction<string>) {
      state.likedImages.push(action.payload);
    },
    removeLikedImage(state, action: PayloadAction<string>) {
      state.likedImages = state.likedImages.filter(url => url !== action.payload);
    },
    setLikedImages(state, action: PayloadAction<string[]>) {
      state.likedImages = action.payload;
    },
  },
});

export const { addLikedImage, removeLikedImage, setLikedImages } = likedImagesSlice.actions;
export default likedImagesSlice.reducer;
