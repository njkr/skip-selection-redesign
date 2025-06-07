import { configureStore } from "@reduxjs/toolkit";
import skipReducer, { initialState } from "./slices/skip-slice";
import type { SkipState } from "./slices/skip-slice";
import type { Reducer } from "redux";

const loadState = (): { skips: SkipState } | undefined => {
  if (typeof window === "undefined") return undefined;

  try {
    const serializedState = localStorage.getItem("skipSelectionState");
    if (!serializedState) return undefined;

    const parsed = JSON.parse(serializedState);
    if (parsed?.skips) {
      return {
        skips: {
          ...parsed.skips,
          status: initialState.status,
          error: initialState.error,
        },
      };
    }
    return undefined;
  } catch (error) {
    console.warn("Could not load state from localStorage:", error);
    return undefined;
  }
};

const saveState = (state: RootState) => {
  if (typeof window === "undefined") return;
  try {
    const serialized = JSON.stringify({ skips: state.skips });
    localStorage.setItem("skipSelectionState", serialized);
  } catch (error) {
    console.warn("Could not save state to localStorage:", error);
  }
};

const preloadedState: { skips: SkipState } = loadState() ?? {
  skips: initialState,
};

export const store = configureStore({
  reducer: {
    skips: skipReducer as Reducer<SkipState>,
  },
  preloadedState,
});

if (typeof window !== "undefined") {
  store.subscribe(() => {
    saveState(store.getState());
  });
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
