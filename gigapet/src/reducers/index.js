import {
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  ENTRY_GET_START,
  ENTRY_GET_SUCCESS,
  ENTRY_GET_FAIL,
  ENTRY_POST_START,
  ENTRY_POST_SUCCESS,
  ENTRY_POST_FAIL,
  ENTRY_PUT_START,
  ENTRY_PUT_SUCCESS,
  ENTRY_PUT_FAIL,
  ENTRY_DELETE_START,
  ENTRY_DELETE_SUCCESS,
  ENTRY_DELETE_FAIL,
  CHILDREN_GET_START,
  CHILDREN_GET_SUCCESS,
  CHILDREN_GET_FAIL,
  SET_CURRENT_CHILD,

} from "../actions";

const initialState = {
  foodEntries: [
  ],
  children: [],
  currentChild: {},
  pending: {
    login: false,
    register: false,
    get: false,
    post: false,
    put: false,
    delete: false,
    getChildren: false
  },
  signUpSuccessMessage: "",
  error: false,
  errorMessage: ""
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_START:
      return {
        ...state,
        isLoggingIn: true
      };

    case SIGNUP_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        isLoggingIn: false,
        signUpSuccessMessage: action.payload.message
      };

    case SIGNUP_FAIL:
      console.log(action.payload);
      return {
        ...state,
        isLoggingIn: false,
        error: true,
        errorMessage: action.payload
      };

    case LOGIN_START:
      console.log("LOGIN_START console");
      return {
        ...state,
        isLoggingIn: true
      };

    case LOGIN_SUCCESS:
      console.log("LOGIN_SUCCESS console");
      console.log(action.payload);

      return {
        ...state,
        isLoggingIn: false,
        token: action.payload.token,
        error: false,
        errorMessage: ""
      };

    case LOGIN_FAIL:
      return {
        ...state,
        isLoggingIn: false,
        error: true,
        errorMessage: action.payload
      };
    case ENTRY_GET_START:
      return {
        ...state,
        pending: {
          ...state.pending,
          get: true
        },
        error: ""
      };
    case ENTRY_GET_SUCCESS:
      return {
        ...state,
        foodEntries: action.payload,
        pending: {
          ...state.pending,
          get: false
        }
      };
    case ENTRY_GET_FAIL:
      return {
        ...state,
        pending: {
          ...state.pending,
          get: false
        },
        error: action.payload
      };
    case ENTRY_POST_START:
      return {
        ...state,
        pending: {
          ...state.pending,
          post: true
        },
        error: ""
      };
    case ENTRY_POST_SUCCESS:
      return {
        ...state,
        foodEntries: action.payload,
        pending: {
          ...state.pending,
          post: false
        }
      };
    case ENTRY_POST_FAIL:
      return {
        ...state,
        pending: {
          ...state.pending,
          post: false
        },
        error: action.payload
      };
    case ENTRY_PUT_START:
      return {
        ...state,
        pending: {
          ...state.pending,
          put: true
        },
        error: ""
      };
    case ENTRY_PUT_SUCCESS:
      return {
        ...state,
        foodEntries: action.payload,
        pending: {
          ...state.pending,
          put: false
        }
      };
    case ENTRY_PUT_FAIL:
      return {
        ...state,
        pending: {
          ...state.pending,
          put: false
        },
        error: action.payload
      };
    case ENTRY_DELETE_START:
      return {
        ...state,
        pending: {
          ...state.pending,
          delete: true
        },
        error: ""
      };
    case ENTRY_DELETE_SUCCESS:
      return {
        ...state,
        foodEntries: action.payload,
        pending: {
          ...state.pending,
          delete: false
        }
      };
    case ENTRY_DELETE_FAIL:
      return {
        ...state,
        pending: {
          ...state.pending,
          delete: false
        },
        error: action.payload
      };
    case CHILDREN_GET_START:
      return {
        ...state,
        pending: {
          ...state.pending,
          getChildren: true
        },
        error: ""
      };
    case CHILDREN_GET_SUCCESS:
      return {
        ...state,
        children: action.payload,
        pending: {
          ...state.pending,
          getChildren: false
        }
      };
    case CHILDREN_GET_FAIL:
      return {
        ...state,
        pending: {
          ...state.pending,
          getChildren: false
        },
        error: action.payload
      };
    case SET_CURRENT_CHILD:
      return {
        ...state,
        currentChild: action.payload
      };
    
      
    default:
      return state;
  }
};

export default rootReducer;
