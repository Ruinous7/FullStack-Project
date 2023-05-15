// Angular Modules
import {  Component , Input, } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// NgRx Module
import { Store , select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from 'src/app/reducers';
import { deleteMovie, nowEditing, setAddPage, setContentPage, setEditPage } from 'src/app/reducers/app.actions';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],

})

export class MovieComponent {

  // Defining the NgRx Store

  storeData$ : Observable<any> = this._store$.pipe(
    select('app')
  )

  // Fetching Data from Parent Comp

  @Input()
  movie : any

  // General Movie Variables

  image : any
  subscriptions : any = []
  members : any = []
  movieSubscriptions : any = []
  subscribers : any = []

  closeResult = '';

  constructor(private _store$ : Store<State> , private http: HttpClient , public router : Router, public route: ActivatedRoute , private modalService: NgbModal){

    // Subscribing to the store

    this.storeData$.subscribe(data => {
      this.subscriptions = JSON.parse(JSON.stringify(data.subscriptions))
      this.members = JSON.parse(JSON.stringify(data.members))
    })

  }

  // To Edit Movie

  toEditMovie(id){
    this._store$.dispatch(setContentPage({payload:false}))
    this._store$.dispatch(setEditPage({payload:true}))
    this._store$.dispatch(setAddPage({payload:false}))
    this._store$.dispatch(nowEditing({payload:this.movie}))
    this.router.navigate([`edit/${id}`] ,{relativeTo:this.route})
  }

  // To Delete Movie

  toDeleteMovie(id){
    this._store$.dispatch(deleteMovie({payload:id}))
    this.http.delete<any>(`http://localhost:8000/movies/${id}`).subscribe( data => console.log(data) )
    this.router.navigate(['home/movies'])
  }

  // To Delete Movie Modal

  open(deleteContent) {
		this.modalService.open(deleteContent, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
		);
	}

  // To Edit Subscribed Member

  toEditMember(id,payload){
    this._store$.dispatch(setContentPage({payload:false}))
    this._store$.dispatch(setEditPage({payload:true}))
    this._store$.dispatch(setAddPage({payload:false}))
    this._store$.dispatch(nowEditing({payload:payload}))
    this.router.navigate([`home/subscriptions/edit/${id}`] )
  }

  ngOnInit(){
    // Fetching the movies image
    this.image = this.http.get<any>(`${this.movie.image}`)
    // Managing the subscriptions data of the movie
    this.subscriptions.forEach(sub=>{
      if(sub.movieID==this.movie.id){
        this.movieSubscriptions.push(sub)
      }
    })
    this.movieSubscriptions.forEach(movieSub=>{
      this.members.forEach(member=>{
        if(movieSub.memberID==member.id){
          let subscriber = {
            mainData : member,
            subscriptionData: movieSub
          }
          this.subscribers.push(subscriber)
        }
      })
    })
  }

}
