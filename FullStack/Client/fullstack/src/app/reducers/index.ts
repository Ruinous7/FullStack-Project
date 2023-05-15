import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { State as AppState , reducer as appReducer , appFeatureKey} from './app.reducer'

export interface State {
  [appFeatureKey] : AppState
}

export const reducers: ActionReducerMap<State> = {
  [appFeatureKey] : appReducer
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
