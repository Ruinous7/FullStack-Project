// Angular Modules
import { Component, HostListener, Inject } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// NgRx Modules
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from 'src/app/reducers';
import { addMovie, setAddPage, setContentPage, setEditPage, setHomePage, } from 'src/app/reducers/app.actions';



@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent {

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    if(window.location.pathname==="/home") {
      this._store$.dispatch(setHomePage({payload:true}))
      this._store$.dispatch(setContentPage({payload:false}))
      return
    }
    if(window.location.pathname==="/home/movies") {
      this._store$.dispatch(setHomePage({payload:false}))
      this._store$.dispatch(setContentPage({payload:true}))
      this._store$.dispatch(setEditPage({payload:false}))
      this._store$.dispatch(setAddPage({payload:false}))
      return
    }
    if(window.location.pathname==="/home/subscriptions") {
      this._store$.dispatch(setHomePage({payload:false}))
      this._store$.dispatch(setContentPage({payload:true}))
      this._store$.dispatch(setEditPage({payload:false}))
      this._store$.dispatch(setAddPage({payload:false}))
      return
    }
  }

  // Defining the NgRx Store

  storeData$: Observable<any> = this._store$.pipe(
    select('app')
  )

  // General Variables

  movies : any = []
  closeResult = '';

  constructor(private _store$: Store<State>, private http: HttpClient, public router: Router, public route: ActivatedRoute, private modalService: NgbModal) {

    // Subscribing to the Store

    this.storeData$.subscribe(data => {
      this.movies = [...data.movies]
    })

  }

  // New Movie Obj

  movieObj : any = {
    id: 0,
    name: "",
    premiere: "",
    genres: [],
    image: "",
    display:true
  }

  // Adding a genre

  addG(genre,modal){
    let addGenre = true
    this.movieObj.genres.find(g=>{
      if(g.toLowerCase()==genre.toLowerCase()){
        this.open(modal)
        addGenre = false
      }
    })
    if(addGenre){
      this.movieObj.genres.push(genre)
    }
  }

  // Deleting a genre

  deleteGenre(genre){
    this.movieObj.genres = this.movieObj.genres.filter(g=> g!==genre)
  }

  // Modal for filling in Relevant Information

  open(deleteContent) {
		this.modalService.open(deleteContent, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
		);
	}

  // Adding the New Movie to the store and the database

  add(fillAlert){
    if(this.movieObj.name==""||this.movieObj.premiere==""||this.movieObj.genres.length==0||this.movieObj.image==""){
      this.open(fillAlert)
    } else {
      const uid = () =>
        String(
          Date.now() +
          Math.random()
        ).replace(/\./g, '')
      this.movieObj.id = uid()
      this.movies.push(this.movieObj)
      console.log(this.movieObj)
      this._store$.dispatch(addMovie({payload: this.movies}))
      this.http.post<any>("http://localhost:8000/movies",this.movieObj).subscribe(data=>console.log(data))
      this.toMovies()
    }
  }

  // to Movies Homepage

  toMovies(){
    this._store$.dispatch(setContentPage({payload:true}))
    this._store$.dispatch(setAddPage({payload:false}))
    this._store$.dispatch(setEditPage({payload:false}))
    this.router.navigate(['home/movies'])
  }


}
