import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUsers from './users.reducer';
import { UsersActions } from './users.actions';

export const selectUsersState = createFeatureSelector<fromUsers.State>(
  fromUsers.usersFeatureKey
);

export const selectUsers = createSelector(selectUsersState,
  (state) => state.users)

export const selectUsersIsLoading = createSelector(selectUsersState,
  (state) => state.isLoadingUsers)

export const selectUsersError = createSelector(selectUsersState,
  (state) => state.error)

