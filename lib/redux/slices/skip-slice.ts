import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Skip, ApiSkip } from "@/lib/types";

const transformApiSkip = (apiSkip: ApiSkip): Skip => ({
  id: String(apiSkip.id),
  name: `${apiSkip.size} Yard Skip`,
  size: `${apiSkip.size} Yards`,
  price: Number.parseFloat(apiSkip.price_before_vat.toFixed(2)),
  hirePeriod: `${apiSkip.hire_period_days} day hire period`,
  imageUrl: `https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/${apiSkip.size}-yarder-skip.jpg`,
  notAllowedOnRoad: apiSkip.allowed_on_road,
});

export interface SkipState {
  skips: Skip[];
  selectedSkipId: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export const initialState: SkipState = {
  skips: [],
  selectedSkipId: null,
  status: "idle",
  error: null,
};

// Async thunk for fetching skips
export const fetchSkips = createAsyncThunk(
  "skips/fetchSkips",
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API delay for loading state
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const response = await fetch(
        "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetch skips: ${response.statusText} (status: ${response.status})`
        );
      }
      const data: ApiSkip[] | { error?: string } = await response.json();

      if (
        typeof data === "object" &&
        data !== null &&
        "error" in data &&
        typeof data.error === "string"
      ) {
        return rejectWithValue(`API Error: ${data.error}`);
      }
      if (!Array.isArray(data)) {
        console.error("API response is not an array:", data);
        return rejectWithValue(
          "Unexpected API response format. Expected an array of skips."
        );
      }
      return data.map(transformApiSkip);
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue("An unknown error occurred while fetching skips.");
    }
  }
);

const skipSlice = createSlice({
  name: "skips",
  initialState,
  reducers: {
    setSelectedSkipId: (state, action: PayloadAction<string | null>) => {
      state.selectedSkipId = action.payload;
    },
    resetSkipState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkips.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSkips.fulfilled, (state, action: PayloadAction<Skip[]>) => {
        state.status = "succeeded";
        state.skips = action.payload;
      })
      .addCase(fetchSkips.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedSkipId, resetSkipState } = skipSlice.actions;
export default skipSlice.reducer;
