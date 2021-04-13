import { createAction, props } from '@ngrx/store';

import { User } from '@entities/all-entities';

// Fetch users
export const fetchUsers = createAction(
    '[Global/API] Fetch Users',
    props<{ results: number }>()
);
export const clearFetchUsers = createAction('[Global/API] Clear Fetch Users');
export const fetchUsersSuccess = createAction(
    '[Global/API] Fetch Users Success',
    props<{ users: User[] }>()
);

// Change Picture

export const changePicture = createAction(
    '[Global/API] Change Picture',
    props<{ user: User, base64Data: string }>()
);
export const changePictureSuccess = createAction(
    '[Global/API] Change Picture Success',
    props<{ user: User, base64Data: string }>()
);
