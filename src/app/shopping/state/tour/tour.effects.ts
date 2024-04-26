import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TourService } from "../../../core/services/tour.service";
import { of, switchMap, tap } from "rxjs";
import { tourActions } from "./tour.actions";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class TourEffects {
    constructor(private actions$: Actions, private _tourService: TourService, private _router: Router) { }

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

    endNavBarTourEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(tourActions.endNavBarTour),
            switchMap(() => of(tourActions.startProductTour())),
            tap(() => {
                this._router.navigate(['/shopping/product-list']);
            },
        )
    ));

    startProductTourEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(tourActions.startProductTour),
            tap(() => {
                this._tourService.startProductTour();
            })
        ),
        { dispatch: false }
    );

    endProductTourEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(tourActions.endProductTour),
            switchMap(() => of(tourActions.startCartTour())),            
            tap(() => {
                this._router.navigate(['/shopping/cart']);
            },
        )
    ));
    
    startCartTourEffect$ = createEffect(() => 
        this.actions$.pipe(
            ofType(tourActions.startCartTour),
            tap(() => {
                this._tourService.startCartTour();
            })
        ), { dispatch: false }
    )

    endCartTourEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(tourActions.endCartTour),
            switchMap(() => of(tourActions.startOrderTour())),
            tap(() => {
                this._router.navigate(['/shopping']);
            },
        )
    ));

    startOrderTourEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(tourActions.startOrderTour),
            tap(() => {
                this._tourService.startOrderTour();
            })
        ),
        { dispatch: false }
    );
}