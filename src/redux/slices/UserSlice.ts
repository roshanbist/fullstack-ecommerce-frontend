import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import {
  AuthToken,
  LoginInputs,
  PasswordUpdate,
  RegisterInputs,
  UserInitialState,
  UserType,
  loginUserAuth,
} from '../../types/User';
import { BASE_URL } from '../../utils/api';

const URL = `${BASE_URL}/users`;

const initialState: UserInitialState = {
  loggedUser: null,
  users: [],
  loading: 'idle',
  error: '',
  userRole: '',
};

// thunk action to get loggedUser data (if any)
export const getLoggedUserInfo = createAsyncThunk(
  'getLoggedUserInfo',
  async (_, { rejectWithValue }) => {
    try {
      const userTokenString = localStorage.getItem('userToken');

      if (!userTokenString) {
        throw new Error('No user token found');
      }

      const authUser: AuthToken = JSON.parse(userTokenString);
      const accessToken = authUser?.accessToken;

      // console.log('accessToken', accessToken);

      const response = await fetch(`${URL}/profile`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      // console.log('response k ayo', response);

      if (!response.ok) {
        const errorMessage = await response.json();
        return rejectWithValue(errorMessage.message);
      }

      const data: UserType = await response.json();
      // console.log('data aayo ta', data);

      localStorage.setItem('userRole', data.role);
      return data;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

// thunk action to get all users  asynchronously
export const getAllUsers = createAsyncThunk(
  'getAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(URL);

      // check if the response has error
      if (!response.ok) {
        const errorResponse = await response.json();
        return rejectWithValue(errorResponse.message);
      }
      const data: UserType[] = await response.json();
      return data;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

// thunk action to get single user data
export const getSingleUser = createAsyncThunk(
  'getSingleUser',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${URL}/${id}`);

      if (!response.ok) {
        const errorResponse = await response.json();
        return rejectWithValue(errorResponse.message);
      }

      const data: UserType = await response.json();
      return data;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

// thunk action to login user
export const loginUser = createAsyncThunk(
  'loginUser',
  async (loginData: LoginInputs, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(`${URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        return rejectWithValue(errorResponse.message);
      }

      const userResults: loginUserAuth = await response.json();
      // const { tokens: AuthToken, user: UserType } = userResults;

      localStorage.setItem('userToken', JSON.stringify(userResults.tokens));
      const loggedUserDetail = await dispatch(getLoggedUserInfo());
      return loggedUserDetail.payload as UserType;
      // const loggedUserDetail: UserType = userResults.user;
      // localStorage.setItem('userRole', loggedUserDetail.role);
      // return loggedUserDetail;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

// thunk action to register a user
export const registerUser = createAsyncThunk(
  'registerUser',
  async (registerData: RegisterInputs, { rejectWithValue }) => {
    try {
      const response = await fetch(`${URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        return rejectWithValue(errorResponse.message);
      }

      const data: UserType = await response.json();
      return data;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

// thunk action to update a user information
export const updateUser = createAsyncThunk(
  'updateUser',
  async ({ _id, ...updateParams }: UserType, { dispatch, rejectWithValue }) => {
    try {
      const { accessToken } = JSON.parse(
        localStorage.getItem('userToken') as string
      );

      const response = await fetch(`${URL}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateParams),
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        toast.error('Try again, an error occured');
        return rejectWithValue(errorMessage.message);
      }

      const data: UserType = await response.json();
      dispatch(userInformation(data));
      toast.success('Information Updated Successfully');
      return data;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

// thunk action to update a user information
export const updatePassword = createAsyncThunk(
  'updatePassword',
  async (
    updatedPasswordParam: PasswordUpdate,
    { dispatch, rejectWithValue }
  ) => {
    try {
      const { accessToken } = JSON.parse(
        localStorage.getItem('userToken') as string
      );

      const response = await fetch(`${URL}/update-password`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPasswordParam),
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        toast.error(errorMessage.message);
        return rejectWithValue(errorMessage.message);
      }

      const data: UserType = await response.json();
      dispatch(userInformation(data));
      toast.success('Password changed successfully');
      return data;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem('userToken');
      localStorage.removeItem('cartCollection');
      localStorage.removeItem('userRole');
      state.loggedUser = null;
      state.userRole = '';
      state.loading = 'idle';
      state.error = '';
    },

    userInformation: (state, action) => {
      state.loggedUser = action.payload;
    },
  },

  extraReducers(builder) {
    builder.addCase(getLoggedUserInfo.fulfilled, (state, action) => {
      return {
        ...state,
        loggedUser: action.payload,
        loading: 'succeeded',
        error: '',
      };
    });

    builder.addCase(getLoggedUserInfo.pending, (state, action) => {
      return {
        ...state,
        loading: 'pending',
        error: '',
      };
    });

    builder.addCase(getLoggedUserInfo.rejected, (state, action) => {
      return {
        ...state,
        loading: 'failed',
        error: action.error.message,
      };
    });

    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      return {
        ...state,
        users: action.payload,
        loading: 'succeeded',
        error: '',
      };
    });

    builder.addCase(getAllUsers.pending, (state, action) => {
      return {
        ...state,
        loading: 'pending',
        error: '',
      };
    });

    builder.addCase(getAllUsers.rejected, (state, action) => {
      return {
        ...state,
        loading: 'failed',
        error: action.error.message,
      };
    });

    builder.addCase(getSingleUser.fulfilled, (state, action) => {
      return {
        ...state,
        loggedUser: action.payload,
        loading: 'succeeded',
        error: '',
      };
    });

    builder.addCase(getSingleUser.pending, (state, action) => {
      return {
        ...state,
        loading: 'pending',
        error: '',
      };
    });

    builder.addCase(getSingleUser.rejected, (state, action) => {
      return {
        ...state,
        loading: 'failed',
        error: action.error.message,
      };
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      return {
        ...state,
        loggedUser: action.payload,
        loading: 'succeeded',
        error: '',
      };
    });

    builder.addCase(loginUser.pending, (state, action) => {
      return {
        ...state,
        loading: 'pending',
        error: '',
      };
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      return {
        ...state,
        loading: 'failed',
        error: action.error.message,
      };
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      return {
        ...state,
        users: [...state.users, action.payload],
        loading: 'succeeded',
        error: '',
      };
    });

    builder.addCase(registerUser.pending, (state, action) => {
      return {
        ...state,
        loading: 'pending',
        error: '',
      };
    });

    builder.addCase(registerUser.rejected, (state, action) => {
      return {
        ...state,
        loading: 'failed',
        error: action.error.message,
      };
    });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      const updatedUserIndex = state.users.findIndex(
        (user) => user._id === action.payload._id
      );

      const updatedUsers = [...state.users];
      updatedUsers[updatedUserIndex] = action.payload;

      return {
        ...state,
        users: updatedUsers,
        loading: 'succeeded',
        error: '',
      };
    });

    builder.addCase(updateUser.pending, (state, action) => {
      return {
        ...state,
        loading: 'pending',
        error: '',
      };
    });

    builder.addCase(updateUser.rejected, (state, action) => {
      return {
        ...state,
        loading: 'failed',
        error: action.error.message,
      };
    });

    builder.addCase(updatePassword.fulfilled, (state, action) => {
      const updatedUserIndex = state.users.findIndex(
        (user) => user._id === action.payload._id
      );

      const updatedUsers = [...state.users];
      updatedUsers[updatedUserIndex] = action.payload;

      return {
        ...state,
        users: updatedUsers,
        loading: 'succeeded',
        error: '',
      };
    });

    builder.addCase(updatePassword.pending, (state, action) => {
      return {
        ...state,
        loading: 'pending',
        error: '',
      };
    });

    builder.addCase(updatePassword.rejected, (state, action) => {
      return {
        ...state,
        loading: 'failed',
        error: action.error.message,
      };
    });
  },
});

const userReducer = userSlice.reducer;
export const { logoutUser, userInformation } = userSlice.actions;
export default userReducer;
