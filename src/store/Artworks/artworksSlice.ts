import { ArtworkBase } from "./../../Models/Artwork";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ArtworkStateInterface {
  pages: PageInterface[];
  searchTerm: string;
  imageApi: string;
}

interface PageInterface {
  pageNumber: number;
  artworks: ArtworkBase[];
}

const initialState: ArtworkStateInterface = {
  pages: [],
  searchTerm: "",
  imageApi: ""
};

export const artworkSlice = createSlice({
  name: "artwork",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<PageInterface>) => {
      state.pages.push(action.payload);
    },
    search: (state, action: PayloadAction<{searchTerm: string}>) => {
        state.searchTerm = action.payload.searchTerm
        state.pages = []
    },
    setImageApi: (state, action: PayloadAction<{imageApi: string}>) => {
        state.imageApi = action.payload.imageApi
    }
  },
});

// Action creators are generated for each case reducer function
export const { add, search, setImageApi } = artworkSlice.actions;

export default artworkSlice.reducer;
