import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AppFacade } from '@app/app.facade';
import { User } from '@app/entities/all-entities';
import { IonInfiniteScroll } from '@ionic/angular';


@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage {

  public page: number = 1;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(
    private router: Router,
    private facade: AppFacade) { }


  get users$(): Observable<User[]> {
    return this.facade.users$;
  }

  public goToDetils(user: User): void {
    this.router.navigate([`/details/${user.login.uuid}`]);
  }

  public loadData(event): void {
    setTimeout(() => {
      this.page += 1;
      this.facade.fetchUsers(this.page);
      event.target.complete();
    }, 500);
  }

}
