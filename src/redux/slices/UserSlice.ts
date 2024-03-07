import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  AuthToken,
  LoginInputs,
  RegisterInputs,
  UserInitialState,
  UserType,
} from '../../types/User';
import { toast } from 'react-toastify';

const BASE_URL = 'https://api.escuelajs.co/api/v1/users';
const LOGIN_URL = 'https://api.escuelajs.co/api/v1/auth/login';
const USER_PROFILE_URL = 'https://api.escuelajs.co/api/v1/auth/profile';

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
      const accessToken = authUser?.access_token;

      const response = await fetch(USER_PROFILE_URL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        return rejectWithValue(errorMessage.message);
      }
      const data: UserType = await response.json();
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
      const response = await fetch(BASE_URL);

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
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`);

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
      const response = await fetch(LOGIN_URL, {
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

      const data: AuthToken = await response.json();
      localStorage.setItem('userToken', JSON.stringify(data));

      const loggedUserDetail = await dispatch(getLoggedUserInfo());
      return loggedUserDetail.payload as UserType;
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
      const response = await fetch(`${BASE_URL}/`, {
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
  async ({ id, ...updateParams }: UserType, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
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
      console.log('data k aayo', data);
      dispatch(userInformation(data));
      toast.success('Information Updated Successfully');
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
        // loading: false,
        loading: 'succeeded',
        error: '',
      };
    });

    builder.addCase(getAllUsers.pending, (state, action) => {
      return {
        ...state,
        // loading: true,
        loading: 'pending',
        error: '',
      };
    });

    builder.addCase(getAllUsers.rejected, (state, action) => {
      return {
        ...state,
        // loading: false,
        loading: 'failed',
        error: action.error.message,
      };
    });

    builder.addCase(getSingleUser.fulfilled, (state, action) => {
      return {
        ...state,
        loggedUser: action.payload,
        // loading: false,
        loading: 'succeeded',
        error: '',
      };
    });

    builder.addCase(getSingleUser.pending, (state, action) => {
      return {
        ...state,
        // loading: true,
        loading: 'pending',
        error: '',
      };
    });

    builder.addCase(getSingleUser.rejected, (state, action) => {
      return {
        ...state,
        // loading: false,
        loading: 'failed',
        error: action.error.message,
      };
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      return {
        ...state,
        loggedUser: action.payload,
        // loading: false,
        loading: 'succeeded',
        error: '',
      };
    });

    builder.addCase(loginUser.pending, (state, action) => {
      return {
        ...state,
        // loading: false,
        loading: 'pending',
        error: '',
      };
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      return {
        ...state,
        // loading: false,
        loading: 'failed',
        error: action.error.message,
      };
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      return {
        ...state,
        users: [...state.users, action.payload],
        // loading: false,
        loading: 'succeeded',
        error: '',
      };
    });

    builder.addCase(registerUser.pending, (state, action) => {
      return {
        ...state,
        // loading: true,
        loading: 'pending',
        error: '',
      };
    });

    builder.addCase(registerUser.rejected, (state, action) => {
      return {
        ...state,
        // loading: false,
        loading: 'failed',
        error: action.error.message,
      };
    });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      // console.log('action payload', action.payload);

      const updatedUserIndex = state.users.findIndex(
        (user) => user.id === action.payload.id
      );

      const updatedUsers = [...state.users];
      updatedUsers[updatedUserIndex] = action.payload;

      console.log('updated user', action.payload);

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
        // loading: true,
        loading: 'pending',
        error: '',
      };
    });

    builder.addCase(updateUser.rejected, (state, action) => {
      return {
        ...state,
        // loading: false,
        loading: 'failed',
        error: action.error.message,
      };
    });
  },
});

const userReducer = userSlice.reducer;
export const { logoutUser, userInformation } = userSlice.actions;
export default userReducer;
