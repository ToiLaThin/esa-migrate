import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TourService } from "../../../core/services/tour.service";
import { tap } from "rxjs";
import { tourActions } from "./tour.actions";

@Injectable({
    providedIn: 'root'
})
export class TourEffects {
    constructor(private actions$: Actions, private _tourService: TourService) { }

    //do not dispatch any action here
    startNavBarTourEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(tourActions.startNavBarTour),
            tap(() => {
                this._tourService.startNavBarTour();
            })
        ),
        { dispatch: false }
    );
}