import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as actions from '@store/actions/actions-app';
import { CoreService } from '@services/core.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Injectable()
export class UsersEffects {

  constructor(
    private actions$: Actions,
    private core: CoreService,
    private router: Router) { }

  fetchUsers$ = createEffect(() => this.actions$.pipe(
    ofType(actions.fetchUsers),
    switchMap(({ results }) => this.core.getUsers(results).pipe(
      map((users) => actions.fetchUsersSuccess({ users }))
    ))
  ));

}
