import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RegisterInputs, UserInitialState, UserType } from '../../types/User';

const URL = 'https://api.escuelajs.co/api/v1/users';

const initialState: UserInitialState = {
  users: [],
  loading: false,
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
        loading: false,
        error: '',
      };
    });

    builder.addCase(getAllUsers.pending, (state, action) => {
      return {
        ...state,
        loading: true,
        error: '',
      };
    });

    builder.addCase(getAllUsers.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message,
      };
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      return {
        ...state,
        users: [...state.users, action.payload],
        loading: false,
        error: '',
      };
    });

    builder.addCase(registerUser.pending, (state, action) => {
      return {
        ...state,
        loading: true,
        error: '',
      };
    });

    builder.addCase(registerUser.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
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
        loading: false,
        error: '',
      };
    });

    builder.addCase(updateUser.pending, (state, action) => {
      return {
        ...state,
        loading: true,
        error: '',
      };
    });

    builder.addCase(updateUser.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message,
      };
    });
  },
});

const userReducer = userSlice.reducer;
export default userReducer;
