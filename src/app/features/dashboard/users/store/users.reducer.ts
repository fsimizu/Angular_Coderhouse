import { createFeature, createReducer, on } from '@ngrx/store';
import { User } from '../../../../shared/models/users';
import { UsersActions } from './users.actions';

export const usersFeatureKey = 'users';

export interface State {
  isLoadingUsers: boolean,
  users: User[],
  error: unknown,
}

export const initialState: State = {
  isLoadingUsers: false,
  users: [],
  error: null
};

export const reducer = createReducer(
  initialState,

  // Load Users
  on(UsersActions.loadUsers, (state) => {
    return {
      ...state,
      isLoadingUsers: true
    }}),
  on(UsersActions.loadUsersSuccess, (state, action) => {
    return {
      ...state,
      isLoadingUsers: false,
      users: action.data,
      error: null
    }}),
  on(UsersActions.loadUsersFailure, (state, action) => {
    return {
      ...state,
      isLoadingUsers: false,
      error: action.error
    }}),

  // Add Students
  on(UsersActions.addUsers, (state) => {
    return {
      ...state,
      isLoadingUsers: true,
    }}),
  on(UsersActions.addUsersSuccess, (state, action) => {
    return {
      ...state,
      isLoadingUsers: false,
      users: [...state.users, action.data],
      error: null
    }}),
  on(UsersActions.addUsersFailure, (state, action) => {
    return {
      ...state,
      isLoadingUsers: false,
      error: action.error,
    }}),

  // Delete User
  on(UsersActions.deleteUsers, (state) => {
    return {
      ...state,
      isLoadingUsers: true,
    }}),
  on(UsersActions.deleteUsersSuccess, (state, action) => {
    return {
      ...state,
      isLoadingUsers: false,
      users: state.users.filter((users) => users.id !== action.data.id),
      error: null
    }}),
  on(UsersActions.deleteUsersFailure, (state, action) => {
    return {
      ...state,
      isLoadingUsers: false,
      error: action.error,
    }}),

  // Edit Student
  on(UsersActions.editUsers, (state) => {
    return {
      ...state,
      isLoadingUsers: true,
    }
  }),
  on(UsersActions.editUsersSuccess, (state, action) => {
    return {
      ...state,
      isLoadingUsers: false,
      users: state.users.map(obj => {
        if (obj.id === action.data.id) {
          return {
            ...obj,
            email: action.data.email,
            firstName: action.data.firstName,
            lastName: action.data.lastName,
            password: action.data.password
          }
        }
        return obj
      }),
      error: null
    }
  }),
  on(UsersActions.editUsersFailure, (state, action) => {
    return {
      ...state,
      isLoadingUsers: false,
      error: action.error,
    }
  }),

);

export const UsersFeature = createFeature({
  name: usersFeatureKey,
  reducer,
});

