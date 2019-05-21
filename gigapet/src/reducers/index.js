import { SIGNUP_START, SIGNUP_SUCCESS, SIGNUP_FAIL } from '../actions';
import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL } from '../actions';

const initialState = {
  food: [],
  isLoggingIn: false,
  token: localStorage.getItem('token'),
  signUpSuccess: false,
  signUpSuccessMessage: '',
  error: false,
  errorMessage: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_START:
      return {
        ...state,
        isLoggingIn: true
      };

    case SIGNUP_SUCCESS:
      console.log(action.payload)
      return {
        ...state,
        isLoggingIn: false,
        signUpSuccess: true,
        signUpSuccessMessage: action.payload.message,
      }

    case SIGNUP_FAIL:
      console.log(action.payload)
      return {
        ...state,
        isLoggingIn: false,
        error: true,
        errorMessage: action.payload
      }


    case LOGIN_START:
      console.log("LOGIN_START console")
      return {
        ...state,
        isLoggingIn: true,
      }

    case LOGIN_SUCCESS:
      console.log("LOGIN_SUCCESS console")
      console.log(action.payload);

      return {
        ...state,
        isLoggingIn: false,
        token: action.payload.token,
        error: false,
        errorMessage: ""
      }

    case LOGIN_FAIL:
      return {
        ...state,
        isLoggingIn: false,
        error: true,
        errorMessage: action.payload
      }

    default:
      return state;
  }
};

export default reducer;
