import { createAction, props } from '@ngrx/store';

// General Actions of displaying relevant information onscreen

export const setManager = createAction(
  '[App] Set Manager',
  props<{payload:object}>()
);

export const setHomePage = createAction(
  '[App] Set Home Page',
  props<{payload:boolean}>()
);

export const isLoggedOut = createAction(
  '[App] Is Logged Out',
  props<{payload:boolean}>()
);

// Actions of setting the relevant Menu on screen

export const setContentPage = createAction(
  '[App] Set Content Page',
  props<{payload:boolean}>()
);

export const setEditPage = createAction(
  '[App] Set Edit Page',
  props<{payload:boolean}>()
);

export const nowEditing = createAction(
  '[App] Now Editing',
  props<{payload:any}>()
);

export const setAddPage = createAction(
  '[App] Set Add Page',
  props<{payload:boolean}>()
);

// Movie CRUD Actions

export const setMovies = createAction(
  '[App] Set Movies',
  props<{payload:any[]}>()
);

export const addMovie = createAction(
  '[App] Add Movie',
  props<{payload:any}>()
);

export const updateMovie = createAction(
  '[App] Update Movie',
  props<{payload:any}>()
);

export const deleteMovie = createAction(
  '[App] Delete Movie',
  props<{payload:number}>()
);

// Members CRUD Actions

export const setMembers = createAction(
  '[App] Set Members',
  props<{payload:any[]}>()
);

export const updateMember = createAction(
  '[App] Update Member',
  props<{payload:any}>()
);

export const addMember = createAction(
  '[App] Add Member',
  props<{payload:any}>()
);

export const deleteMember = createAction(
  '[App] Delete Member',
  props<{payload:number}>()
);

export const setSubscriptions = createAction(
  '[App] Set Subscriptions',
  props<{payload:any[]}>()
);

export const addSubscriptions = createAction(
  '[App] Add Subscriptions',
  props<{payload:any}>()
);



















