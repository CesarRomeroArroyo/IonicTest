
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as type from '@entities/all-entities';
import * as actions from '@store/actions/actions-app';

import { State } from '@store/state/state-app';

@Injectable()
export class AppFacade {

  constructor(private store: Store<State>) { }

  get users$(): Observable<type.User[]> {
    return this.store.select('users');
  }

  public fetchUsers(results: number): void {
    this.store.dispatch(actions.fetchUsers({ results }));
  }

  public takePicture(user: type.User, base64Data: string): void {
    this.store.dispatch(actions.changePicture({ user, base64Data }));
  }

}
