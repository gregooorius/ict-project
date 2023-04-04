import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ArtworkIdsInterface {
  artworkIds: number[]
}



const initialState: ArtworkIdsInterface = {
    artworkIds: []
}

export const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<number>) => {
      state.artworkIds.push(action.payload)
    },
    remove: (state, action: PayloadAction<number>) => {
        state.artworkIds = state.artworkIds.filter(item => item !== action.payload )
    },
  },
});

// Action creators are generated for each case reducer function
export const { add, remove } = favoriteSlice.actions;

export default favoriteSlice.reducer;
