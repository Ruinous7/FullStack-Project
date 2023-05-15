// Angular Modules
import {  Component , HostListener  } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
// NgRx Modules
import { Store , select } from '@ngrx/store';
import { Observable, fromEvent } from 'rxjs';
import { State } from 'src/app/reducers';
import { setAddPage, setContentPage, setEditPage, } from 'src/app/reducers/app.actions';

@Component({
  selector: 'app-all-movies',
  templateUrl: './all-movies.component.html',
  styleUrls: ['./all-movies.component.css']
})
export class AllMoviesComponent {

  // Setting up a host listener for tracking URl movements from the browser buttons.

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    if(window.location.pathname===`/home/movies/edit/${this.editing.id}`) {
      this._store$.dispatch(setContentPage({payload:false}))
      this._store$.dispatch(setEditPage({payload:true}))
      this._store$.dispatch(setAddPage({payload:false}))
      console.log("setting edit page" , window.location.pathname)
      return
    }
    if(window.location.pathname==="/home/movies/add") {
      this._store$.dispatch(setContentPage({payload:false}))
      this._store$.dispatch(setEditPage({payload:false}))
      this._store$.dispatch(setAddPage({payload:true}))
      console.log("setting add page" , window.location.pathname)
      return
    }
  }

  // Defining the NgRx Store

  storeData$ : Observable<any> = this._store$.pipe(
    select('app')
  )

  // General Movies Page Variables

  movies : any
  allContentPage : any
  editPage : any
  addPage : any
  editing : any

  constructor(private _store$ : Store<State> , public router : Router, public route: ActivatedRoute, ){

    // Subscribing to the Store

    this.storeData$.subscribe(data => {
      this.movies = JSON.parse(JSON.stringify(data.movies))
      this.allContentPage = data.contentPage
      this.editPage = data.editPage
      this.addPage = data.addPage
      this.editing = data.nowEditing
    })

  }

  // Search Function

  search(input) {
    if(input.length>0){
      this.movies.forEach(movie=>{
        movie.display=false
        if(movie.name.toLowerCase().startsWith(input.toLowerCase())){
          movie.display=true
        }
        if(!(movie.name.toLowerCase().startsWith(input.toLowerCase()))){
          movie.display=false
        }
      })
    } else this.movies.forEach(movie=>movie.display=true)
  }

  // to Movies Homepage

  toMovies(){
    this._store$.dispatch(setContentPage({payload:true}))
    this._store$.dispatch(setAddPage({payload:false}))
    this._store$.dispatch(setEditPage({payload:false}))
    this.router.navigate(['home/movies'])
  }

  // to Add Movie Page

  toAddMovie(){
    this._store$.dispatch(setContentPage({payload:false}))
    this._store$.dispatch(setAddPage({payload:true}))
    this._store$.dispatch(setEditPage({payload:false}))
    this.router.navigate(['add'] ,{relativeTo:this.route})
  }

}
