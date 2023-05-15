import { Component } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// NgRx Modules
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from 'src/app/reducers';
import { setAddPage, setContentPage, setEditPage, updateMovie } from 'src/app/reducers/app.actions';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})

export class EditMovieComponent {

  // Defining The NgRx Store

  storeData$: Observable<any> = this._store$.pipe(
    select('app')
  )

  // General Variables

  movie : any
  movies : any[] = []
  closeResult = '';

  constructor(private _store$: Store<State>, private http: HttpClient, public router: Router, public route: ActivatedRoute, private modalService: NgbModal) {

    // Subscribing to the Store

    this.storeData$.subscribe(data => {
      this.movies = [...data.movies]
      this.movie = {...data.nowEditing}
      this.movie.genres =  [...data.nowEditing.genres]
    })

  }

  // Adding a genre

  addG(genre,modal){
    let addGenre = true
    this.movie.genres.find(g=>{
      if(g.toLowerCase()==genre.toLowerCase()){
        this.open(modal)
        addGenre = false
      }
    })
    if(addGenre){
      this.movie.genres.push(genre)
    }
  }

  // Deleting a genre

  deleteGenre(genre){
    this.movie.genres = this.movie.genres.filter(g=> g!==genre)
  }

  // Modal for filling in Relevant Information / Duplicate Genres

  open(modal) {
		this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
		);
	}

  openFillAlert(modal) {
		this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
		);
	}

  // Adding the Edited Movie to the store and the database

  editMovie(fillIn) {
    if(this.movie.name==""||this.movie.premiere==""||this.movie.genres.length==0||this.movie.image==""){
      this.openFillAlert(fillIn)
    } else {
      this.http.put<any>(`http://localhost:8000/movies/${this.movie.id}` , this.movie ).subscribe( data => console.log(data) )
      this.movies = this.movies.filter(movie=> movie.id!=this.movie.id)
      this.movies.push(this.movie)
      console.log(this.movies)
      this._store$.dispatch(updateMovie({payload:this.movies}))
      this.toMovies()
    }
  }

  // To Movies

  toMovies(){
    this._store$.dispatch(setContentPage({payload:true}))
    this._store$.dispatch(setAddPage({payload:false}))
    this._store$.dispatch(setEditPage({payload:false}))
    this.router.navigate(['home/movies'])
  }

}

