import { createReducer, on } from '@ngrx/store';
import { addMember, addMovie, addSubscriptions, deleteMember, deleteMovie, isLoggedOut,nowEditing,setAddPage,setContentPage,setEditPage,setHomePage, setManager , setMembers, setMovies, setSubscriptions, updateMember, updateMovie,} from './app.actions';

export const appFeatureKey = 'app';

export interface State {
  // General Site Variables
  loggedUser : any,
  isLoggedOut:boolean,
  homePage: boolean,
  // General Movies Variables
  movies: any,
  // General Users Variables
  users: any,
  // General Members Variables
  members:any,
  subscriptions:any
  // ADD & EDIT Pages Variables
  contentPage: boolean,
  editPage: boolean,
  nowEditing: any,
  addPage: boolean,
}

export const initialState: State = {
  // General Site Variables
  loggedUser: {},
  isLoggedOut:false,
  homePage:true,
  // General Movies Variables
  movies: [],
  // General Users Variables
  users: [],
  // General Members Variables
  members: [],
  subscriptions:[],
  //ADD & EDIT Pages Variables
  contentPage: false,
  editPage: false,
  nowEditing: {},
  addPage: false,
}

export const reducer = createReducer(
  initialState,
  // General Site Actions
  on(setManager, (state,action)=> ({...state, loggedUser:action.payload})),
  on(setHomePage, (state,action)=> ({...state, homePage:action.payload})),
  on(isLoggedOut,(state,action)=> ({...state, isLoggedOut:action.payload})),
  // Displaying Relevant information onscreen
  on(setContentPage, (state,action)=> ({...state, contentPage:action.payload})),
  on(setAddPage, (state,action)=> ({...state, addPage:action.payload})),
  on(setEditPage, (state,action)=> ({...state, editPage:action.payload})),
  on(nowEditing, (state,action)=> ({...state, nowEditing:action.payload})),
  // General Movie's Actions
  on(setMovies, (state,action)=> ({...state, movies:action.payload})),
  on(deleteMovie, (state,action)=> ({...state , movies:state.movies.filter(movie=> movie.id!=action.payload)})),
  on(addMovie,(state,action)=> ({...state, movies:action.payload})),
  on(updateMovie,(state,action)=> ({...state, movies:action.payload})),
  // General Member's Actions
  on(setMembers, (state,action)=> ({...state, members:action.payload})),
  on(updateMember,(state,action)=> ({...state, members:action.payload})),
  on(addMember,(state,action)=> ({...state, members:action.payload})),
  on(deleteMember, (state,action)=> ({...state , members:state.members.filter(member=> member.id!=action.payload)})),
  // General Member's Actions
  on(setSubscriptions, (state,action)=> ({...state, subscriptions:action.payload})),
  on(addSubscriptions,(state,action)=> ({...state, subscriptions:action.payload})),
)



