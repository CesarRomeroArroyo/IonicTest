import { createReducer, on } from '@ngrx/store';
import * as actions from '@store/actions/actions-app';

import * as type from '@entities/all-entities';
import { ofType } from '@ngrx/effects';

export const initialState = [] as type.User[];

// tslint:disable-next-line: variable-name
const _usersReducer = createReducer(
  initialState,
  on(actions.fetchUsersSuccess, (state, { users }) => {
    return state.length > 0 ? [...state, ...users] : users;
  }),
  on(actions.changePicture, (state, { user, base64Data }) => {
    const data = state;
    const datareturn = [];
    data.forEach(x => {
      if (x.login.uuid === user.login.uuid) {
        const obj = { ...x, picture: { large: base64Data } };
        datareturn.push(obj);
      } else { datareturn.push(x); }
    });
    console.log(datareturn);
    return datareturn;
  }),
  on(actions.clearFetchUsers, (state) => {
    return [] as type.User[];
  })
);

// tslint:disable-next-line: typedef
export function usersReducer(state, action) {
  return _usersReducer(state, action);
}
