import { Component, HostListener, Inject } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// NgRx Modules
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from 'src/app/reducers';
import { setAddPage, setContentPage, setEditPage, updateMember } from 'src/app/reducers/app.actions';

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.css']
})
export class EditMemberComponent {

  // Defining The NgRx Store

  storeData$: Observable<any> = this._store$.pipe(
    select('app')
  )

  // General Variables

  members : any = []
  member : any = {}

  closeResult : string = ''

  constructor(private _store$: Store<State>, private http: HttpClient, public router: Router, public route: ActivatedRoute, private modalService: NgbModal) {

    // Subscribing to the Store

    this.storeData$.subscribe(data => {
      this.members = [...data.members]
      this.member = {...data.nowEditing}
    })
  }

  open(modal) {
		this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
		);
	}

  // Adding the Edited Member to the store and the database

 editMember(fillIn) {
    if(this.member.name==""||this.member.email==""||this.member.city==""){
      this.open(fillIn)
    } else {
      this.http.put<any>(`http://localhost:8000/members/${this.member.id}` , this.member ).subscribe( data => console.log(data) )
      this.members = this.members.filter(member=> member.id!=this.member.id)
      this.members.push(this.member)
      this._store$.dispatch(updateMember({payload:this.members}))
      this.toMembers()
    }
  }

  // To Members

  toMembers(){
    this._store$.dispatch(setContentPage({payload:true}))
    this._store$.dispatch(setAddPage({payload:false}))
    this._store$.dispatch(setEditPage({payload:false}))
    this.router.navigate(['home/subscriptions'])
  }


}
