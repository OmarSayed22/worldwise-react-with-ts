import { useReducer } from "react";
import { createContext } from "react";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

import React from "react";
enum Action {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  FAILED = "FAILED",
}
type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  error: string | null;
};
type User = {
  name?: string;
  email: string;
  password: string;
  avatar?: string;
};
type State = {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
};
type ActionTypes =
  | {
      type: Action.LOGIN;
      payload: User;
    }
  | {
      type: Action.LOGOUT;
      payload?: User;
    }
  | {
      type: Action.FAILED;
      payload?: string;
    };

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function reducer(state: State, action: ActionTypes): State {
  switch (action.type) {
    case Action.LOGIN:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null,
      };
    case Action.LOGOUT:
      return { ...state, user: null, isAuthenticated: false };
    case Action.FAILED:
      return { ...state, user: null, error: action.payload ?? null };
    default:
      throw new Error("Unknown action type");
  }
}

const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
};

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [{ user, isAuthenticated, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  function login({ email, password }: User) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: Action.LOGIN, payload: FAKE_USER });
    } else {
      dispatch({ type: Action.FAILED, payload: "Invalid email or password" });
    }
  }
  function logout() {
    dispatch({ type: Action.LOGOUT });
  }

  const contextValue: AuthContextType = {
    login,
    logout,
    isAuthenticated,
    user,
    error,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
