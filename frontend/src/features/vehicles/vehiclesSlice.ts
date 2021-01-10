import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addVehicle, getVehicles, removeVehicle } from "../../api/vehicles";
import { Car } from "../../model/Car";
import { AppThunk } from "../store";

export interface VehicleResponse extends Car {
  _id: string;
}

export interface VehiclesState {
  vehicles: Car[];
  isLoading: boolean;
  error: string | null;
}

const initialState: VehiclesState = {
  vehicles: [],
  isLoading: true,
  error: null,
};

export const vehicles = createSlice({
  name: "vehicles",
  initialState,
  reducers: {
    getVehiclesSucces(state, { payload }: PayloadAction<Car[]>) {
      state.vehicles = payload;
      state.isLoading = false;
    },
    putVehicleSuccess(state, { payload }: PayloadAction<Car>) {
      state.vehicles.push(payload);
    },
    getVehiclesFailure(state, { payload }: PayloadAction<string>) {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const {
  getVehiclesSucces,
  getVehiclesFailure,
  putVehicleSuccess,
} = vehicles.actions;

export default vehicles.reducer;

export const fetchVehicles = (): AppThunk => async (dispatch) => {
  try {
    const vehicles = await getVehicles();
    dispatch(getVehiclesSucces(vehicles));
  } catch (e) {
    dispatch(getVehiclesFailure(e.toString()));
  }
};

export const putVehicle = (vehicle: Car): AppThunk => async (dispatch) => {
  try {
    const newVehicle = await addVehicle(vehicle);
    dispatch(putVehicleSuccess(newVehicle));
  } catch (e) {
    dispatch(getVehiclesFailure(e.toString()));
  }
};

export const deleteVehicle = (id: string): AppThunk => async (dispatch) => {
  try {
    await removeVehicle(id);
    dispatch(fetchVehicles());
  } catch (e) {
    dispatch(getVehiclesFailure(e.toString()));
  }
};
