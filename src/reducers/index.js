import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGOUT,
  USER_GET_START,
  USER_GET_SUCCESS,
  USER_GET_FAIL,
  USER_PUT_START,
  USER_PUT_SUCCESS,
  USER_PUT_FAIL,
  USER_DELETE_START,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
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
  HAS_CHILDREN_INIT,
  CHILDREN_GET_START,
  CHILDREN_GET_SUCCESS,
  CHILDREN_GET_FAIL,
  CHILDREN_POST_START,
  CHILDREN_POST_SUCCESS,
  CHILDREN_POST_FAIL,
  CHILDREN_PUT_START,
  CHILDREN_PUT_SUCCESS,
  CHILDREN_PUT_FAIL,
  CHILDREN_DELETE_START,
  CHILDREN_DELETE_SUCCESS,
  CHILDREN_DELETE_FAIL,
  SET_CURRENT_CHILD,
  FILTERED_TO_STATE
} from "../actions";

const initialState = {
  foodEntries: [],
  kids: [],
  currentUser: null,
  currentChild: null,
  hasChildren: false,
  filteredEntries: [
    // {
    //   id: 5,
    //   foodName: "Carrot",
    //   date: "2019-01-02",
    //   mealTime: "Lunch",
    //   foodType: "vegetables",
    //   calories: 150
    // },
    // {
    //   id: 9,
    //   foodName: "Carrot",
    //   date: "2019-01-03",
    //   mealTime: "Lunch",
    //   foodType: "fruits",
    //   calories: 200
    // },
    // {
    //   id: 9,
    //   foodName: "Carrot",
    //   date: "2019-01-04",
    //   mealTime: "Lunch",
    //   foodType: "grains",
    //   calories: 600
    // },
    // {
    //   id: 9,
    //   foodName: "Carrot",
    //   date: "2019-02-05",
    //   mealTime: "Lunch",
    //   foodType: "dairy",
    //   calories: 500
    // },
    // {
    //   id: 9,
    //   foodName: "Carrot",
    //   date: "2019-02-06",
    //   mealTime: "Lunch",
    //   foodType: "proteins",
    //   calories: 400
    // },
    // {
    //   id: 9,
    //   foodName: "Carrot",
    //   date: "2019-02-01",
    //   mealTime: "Lunch",
    //   foodType: "junk",
    //   calories: 300
    // },
  ],
  pending: {
    login: false,
    register: false,
    userGet: false,
    userPut: false,
    userDelete: false,
    get: false,
    post: false,
    put: false,
    delete: false,
    getChildren: false,
    postChildren: false,
    putChildren: false,
    deleteChildren: false
  },
  signUpSuccessMessage: "",
  error: false,
  errorMessage: ""
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_CURRENT_CHILD:
      return {
        ...state,
        currentChild: action.payload
      };

    case LOGIN_START:
      return {
        ...state,
        pending: {
          ...state.pending,
          login: true
        },
        error: false,
        errorMessage: ""
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        pending: {
          ...state.pending,
          login: false
        }
      };
    case LOGIN_FAIL:
      return {
        ...state,
        pending: {
          ...state.pending,
          login: false
        },
        error: true,
        errorMessage: action.payload
      };
    case SIGNUP_START:
      return {
        ...state,
        isLoggingIn: true,
        error: false,
        errorMessage: ""
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        signUpSuccessMessage: action.payload.message
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        isLoggingIn: false,
        error: true,
        errorMessage: action.payload
      };
    case LOGOUT:
      return{ initialState }
    case USER_GET_START:
      return {
        ...state,
        pending: {
          ...state.pending,
          userGet: true
        },
        error: ""
      };
    case USER_GET_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        pending: {
          ...state.pending,
          userGet: false
        }
      };
    case USER_GET_FAIL:
      return {
        ...state,
        pending: {
          ...state.pending,
          userGet: false
        },
        error: action.payload
      };
    case USER_PUT_START:
      return {
        ...state,
        pending: {
          ...state.pending,
          userPut: true
        },
        error: ""
      };
    case USER_PUT_SUCCESS:
      return {
        ...state,
        pending: {
          ...state.pending,
          userPut: false
        }
      };
    case USER_PUT_FAIL:
      return {
        ...state,
        pending: {
          ...state.pending,
          userPut: false
        },
        error: action.payload
      };
    case USER_DELETE_START:
      return {
        ...state,
        pending: {
          ...state.pending,
          userDelete: true
        },
        error: ""
      };
    case USER_DELETE_SUCCESS:
      return {
        ...state,
        pending: {
          ...state.pending,
          userDelete: false
        }
      };
    case USER_DELETE_FAIL:
      return {
        ...state,
        pending: {
          ...state.pending,
          userDelete: false
        },
        error: action.payload
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
        filteredEntries: action.payload, // Originally, foodEntries and Filtered are the same.
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
      console.log(action.payload);

      return {
        ...state,
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
        filteredEntries: action.payload,
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
    case HAS_CHILDREN_INIT:
      return {
        ...state,
        hasChildren: true
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
        kids: action.payload,
        currentChild: action.payload[0],
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

    case CHILDREN_POST_START:
      return {
        ...state,
        pending: {
          ...state.pending,
          postChildren: true
        },
        error: ""
      };
    case CHILDREN_POST_SUCCESS:
      return {
        ...state,
        kids: action.payload,
        hasChildren: true,
        pending: {
          ...state.pending,
          postChildren: false
        }
      };
    case CHILDREN_POST_FAIL:
      return {
        ...state,
        pending: {
          ...state.pending,
          postChildren: false
        },
        error: action.payload
      };
    case CHILDREN_PUT_START:
      return {
        ...state,
        pending: {
          ...state.pending,
          putChildren: true
        },
        error: ""
      };
    case CHILDREN_PUT_SUCCESS:
      return {
        ...state,
        kids: action.payload,
        pending: {
          ...state.pending,
          putChildren: false
        }
      };
    case CHILDREN_PUT_FAIL:
      return {
        ...state,
        pending: {
          ...state.pending,
          putChildren: false
        },
        error: action.payload
      };
    case CHILDREN_DELETE_START:
      return {
        ...state,
        pending: {
          ...state.pending,
          deleteChildren: true
        },
        error: ""
      };
    case CHILDREN_DELETE_SUCCESS:
      return {
        ...state,
        kids: action.payload,
        pending: {
          ...state.pending,
          deleteChildren: false
        }
      };
    case CHILDREN_DELETE_FAIL:
      return {
        ...state,
        pending: {
          ...state.pending,
          deleteChildren: false
        },
        error: action.payload
      };

    case FILTERED_TO_STATE:
      return {
        ...state,
        filteredEntries: action.payload
      }

    default:
      return state;
  }
};

export default rootReducer;
