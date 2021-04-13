import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { User } from '@entities/all-entities';
import { AppFacade } from '@app/app.facade';
import { CoreService } from '@app/services/core.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit, OnDestroy {

  public user: User;
  public subscription: Subscription[] = [];
  public id: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private facade: AppFacade,
    private core: CoreService) { }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => {
      sub.unsubscribe();
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    const observer = (user => {
      if (user.length === 0) {
        this.router.navigate(['users']);
      } else {
        this.user = user[0];
      }
    });
    this.subscription.push(this.userSelected$.subscribe(observer));
  }

  get userSelected$(): Observable<User[]> {
    return this.facade.users$.pipe(
      map((user) => user.filter(x => x.login.uuid === this.id))
    );
  }

  public async takePicture(): Promise<void> {
    const base64Data = await this.core.addPicture();
    this.facade.takePicture(this.user, base64Data);
  }

}
