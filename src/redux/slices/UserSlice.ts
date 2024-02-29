import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  AuthToken,
  LoginInputs,
  RegisterInputs,
  UserInitialState,
  UserType,
} from '../../types/User';

import { toast } from 'react-toastify';

const URL = 'https://api.escuelajs.co/api/v1/users';
const LOGIN_URL = 'https://api.escuelajs.co/api/v1/auth/login';

const initialState: UserInitialState = {
  loggedUser: null,
  users: [],
  loading: 'idle',
  error: '',
};

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

// thunk action to login user
export const loginUser = createAsyncThunk(
  'loginUser',
  async (loginData: LoginInputs, { rejectWithValue }) => {
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
        // toast.error(
        //   errorResponse.message === 'Unauthorized' &&
        //     'Enter correct login detail!'
        // );
        return rejectWithValue(errorResponse.message);
        // throw new Error(errorResponse.message);
      }

      const data: AuthToken = await response.json();
      localStorage.setItem('userToken', JSON.stringify(data));
      //   console.log('data', JSON.stringify(data));
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
      const response = await fetch(`${URL}/`, {
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
  async ({ id, ...updateParams }: UserType, { rejectWithValue }) => {
    try {
      const response = await fetch(`${URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateParams),
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        return rejectWithValue(errorMessage.message);
      }

      const data: UserType = await response.json();
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
  reducers: {},

  extraReducers(builder) {
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

    builder.addCase(loginUser.fulfilled, (state, action) => {
      return {
        ...state,
        user: action.payload,
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
      const updatedUserIndex = state.users.findIndex(
        (user) => user.id === action.payload.id
      );

      const updatedUsers = [...state.users];
      updatedUsers[updatedUserIndex] = action.payload;

      return {
        ...state,
        users: updatedUsers,
        // loading: false,
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
export default userReducer;
