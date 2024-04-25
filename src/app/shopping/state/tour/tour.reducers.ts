import { createReducer, on } from "@ngrx/store";
import { ITourState } from "./tourState.interface";
import { tourActions } from "./tour.actions";
import { TourType } from "../../../core/ui-models/tour-type";

export const initialTourState: ITourState = {
    executingTour: TourType.NoTourYet
};
export const tourFeatureKey = 'tour';
export const tourReducer = createReducer(
    initialTourState,
    on(tourActions.startNavBarTour, (state, _) => {
        return {
            ...state,
            executingTour: TourType.NavBar
        }
    }),    
)