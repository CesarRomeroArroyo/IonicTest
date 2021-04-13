import { usersReducer } from '@store/reducers/reducer-app';

import { User } from '@entities/all-entities';

export type State = Readonly<{
    users: User[];
}>;

export const StateApp = {
    users: usersReducer,
};
