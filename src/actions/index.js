import axios from "axios";
import axiosWithAuth from "../axiosWithAuth";

export const [SIGNUP_START, SIGNUP_SUCCESS, SIGNUP_FAIL] = [
  "SIGNUP_START",
  "SIGNUP_SUCCESS",
  "SIGNUP_FAIL"
];

export const signUp = credentials => dispatch => {
  const loginInput = { name: credentials.name, password: credentials.password };
  dispatch({ type: SIGNUP_START });
  return axios
    .post("https://giga-back-end.herokuapp.com/api/users/register", credentials)
    .then(res => {
      // console.log(res)
      dispatch({ type: SIGNUP_SUCCESS, payload: res.data });
    })
    .then(() => {
      dispatch({ type: LOGIN_START });
      return axios
        .post("https://giga-back-end.herokuapp.com/api/users/login", loginInput)
        .then(res => {
          console.log(res);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("currentUserId", res.data.id);
          dispatch({ type: LOGIN_SUCCESS, payload: res.data });
        })
        .catch(err => {
          console.log(err);
          dispatch({ type: LOGIN_FAIL, payload: err.data });
        });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: SIGNUP_FAIL, payload: err.data });
    });
};

export const [LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL] = [
  "LOGIN_START",
  "LOGIN_SUCCESS",
  "LOGIN_FAIL"
];

export const login = credentials => dispatch => {
  dispatch({ type: LOGIN_START });
  return axios
    .post("https://giga-back-end.herokuapp.com/api/users/login", credentials)
    .then(res => {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("currentUserId", res.data.id);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: LOGIN_FAIL, payload: err.data });
    });
};

export const LOGOUT = "LOGOUT";

export const logout = () => {
  localStorage.clear();
  return {
    type: LOGOUT
  }
};

export const [USER_GET_START, USER_GET_SUCCESS, USER_GET_FAIL] = [
  "USER_GET_START",
  "USER_GET_SUCCESS",
  "USER_GET_FAIL"
];

export const getUser = id => dispatch => {
  dispatch({ type: USER_GET_START });
  axiosWithAuth()
    .get(`https://giga-back-end.herokuapp.com/api/users/${id}`)
    .then(res => {
      dispatch({ type: USER_GET_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: USER_GET_FAIL, payload: err });
    });
};

export const [USER_PUT_START, USER_PUT_SUCCESS, USER_PUT_FAIL] = [
  "USER_PUT_START",
  "USER_PUT_SUCCESS",
  "USER_PUT_FAIL"
];

export const putUser = (input, id) => dispatch => {
  dispatch({ type: USER_PUT_START });
  axiosWithAuth()
    .put(`https://giga-back-end.herokuapp.com/api/users/${id}`, input)
    .then(res => {
      dispatch({ type: USER_PUT_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: USER_PUT_FAIL, payload: err });
    });
};

export const [USER_DELETE_START, USER_DELETE_SUCCESS, USER_DELETE_FAIL] = [
  "USER_DELETE_START",
  "USER_DELETE_SUCCESS",
  "USER_DELETE_FAIL"
];

export const deleteUser = id => dispatch => {
  dispatch({ type: USER_DELETE_START });
  axiosWithAuth()
    .delete(`https://giga-back-end.herokuapp.com/api/users/${id}`)
    .then(res => {
      dispatch({ type: USER_DELETE_SUCCESS, payload: res.data });
    })
    .then(() => {
      window.location.reload();
      logout();
    })
    .catch(err => {
      dispatch({ type: USER_DELETE_FAIL, payload: err });
    });
};

///////////////////////////////////////////////////////////////////////////////////

export const [ENTRY_GET_START, ENTRY_GET_SUCCESS, ENTRY_GET_FAIL] = [
  "ENTRY_GET_START",
  "ENTRY_GET_SUCCESS",
  "ENTRY_GET_FAIL"
];

export const getFood = childId => dispatch => {
  dispatch({ type: ENTRY_GET_START });
  axiosWithAuth()
    .get(`https://giga-back-end.herokuapp.com/api/app/getfood/${childId}`)
    .then(res => {
      console.log("fetching food", res)
      dispatch({ type: ENTRY_GET_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: ENTRY_GET_FAIL, payload: err });
    });
};

///////////////////////////////////////////////////////////////////////////////////

export const [ENTRY_POST_START, ENTRY_POST_SUCCESS, ENTRY_POST_FAIL] = [
  "ENTRY_POST_START",
  "ENTRY_POST_SUCCESS",
  "ENTRY_POST_FAIL"
];

export const postFood = newEntry => dispatch => {
  dispatch({ type: ENTRY_POST_START });
  axiosWithAuth()
    .post("https://giga-back-end.herokuapp.com/api/app/addfood", newEntry)
    .then(res => {
      console.log("result:", res);
      dispatch({ type: ENTRY_POST_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: ENTRY_POST_FAIL, payload: err });
    });
};

export const [ENTRY_PUT_START, ENTRY_PUT_SUCCESS, ENTRY_PUT_FAIL] = [
  "ENTRY_PUT_START",
  "ENTRY_PUT_SUCCESS",
  "ENTRY_PUT_FAIL"
];

export const putFood = editedEntry => dispatch => {
  dispatch({ type: ENTRY_PUT_START });
  console.log("entry before put", editedEntry);
  axiosWithAuth()
    .put('https://giga-back-end.herokuapp.com/api/app/updatefood', editedEntry)
    .then(res => {
      console.log("PUT SUCCESS: ", res);
      dispatch({ type: ENTRY_PUT_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: ENTRY_PUT_FAIL, payload: err });
    });
};

export const [ENTRY_DELETE_START, ENTRY_DELETE_SUCCESS, ENTRY_DELETE_FAIL] = [
  "ENTRY_DELETE_START",
  "ENTRY_DELETE_SUCCESS",
  "ENTRY_DELETE_FAIL"
];

export const deleteFood = id => dispatch => {
  dispatch({ type: ENTRY_DELETE_START });
  console.log("DELETE started:", id);

   axiosWithAuth()
    .delete('https://giga-back-end.herokuapp.com/api/app/deletefood', id)
    .then(res => {
      dispatch({ type: ENTRY_DELETE_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: ENTRY_DELETE_FAIL, payload: err });
    });
};

export const HAS_CHILDREN_INIT = "HAS_CHILDREN_INIT"

export const hasChildrenInit = () => {
  return {
    type: HAS_CHILDREN_INIT
  }
}

export const [CHILDREN_GET_START, CHILDREN_GET_SUCCESS, CHILDREN_GET_FAIL] = [
  "CHILDREN_GET_START",
  "CHILDREN_GET_SUCCESS",
  "CHILDREN_GET_FAIL"
];

export const getChildren = id => dispatch => {
  dispatch({ type: CHILDREN_GET_START });
  return axiosWithAuth()
    .get(`https://giga-back-end.herokuapp.com/api/app/childname/${id}`)
    .then(res => {
      console.log("result:", res);
      dispatch({ type: CHILDREN_GET_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: CHILDREN_GET_FAIL, payload: err });
    });
};

export const [
  CHILDREN_POST_START,
  CHILDREN_POST_SUCCESS,
  CHILDREN_POST_FAIL
] = ["CHILDREN_POST_START", "CHILDREN_POST_SUCCESS", "CHILDREN_POST_FAIL"];

export const postChildren = newChild => dispatch => {
  dispatch({ type: CHILDREN_POST_START });
  return axiosWithAuth()
    .post("https://giga-back-end.herokuapp.com/api/app/addchild", newChild)
    .then(res => {
      console.log("result:", res);
      dispatch({ type: CHILDREN_POST_SUCCESS });
    })
    .then(() => {})
    .catch(err => {
      dispatch({ type: CHILDREN_POST_FAIL, payload: err });
    });
};

export const [CHILDREN_PUT_START, CHILDREN_PUT_SUCCESS, CHILDREN_PUT_FAIL] = [
  "CHILDREN_PUT_START",
  "CHILDREN_PUT_SUCCESS",
  "CHILDREN_PUT_FAIL"
];

export const putChildren = (entry, id) => dispatch => {
  dispatch({ type: CHILDREN_PUT_START });
  axios
    .put(`https://giga-back-end.herokuapp.com/api/users/register/${id}`, entry)
    .then(res => {
      console.log("PUT SUCCESS: ", res);
      dispatch({ type: CHILDREN_PUT_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: CHILDREN_PUT_FAIL, payload: err });
    });
};

export const [
  CHILDREN_DELETE_START,
  CHILDREN_DELETE_SUCCESS,
  CHILDREN_DELETE_FAIL
] = [
  "CHILDREN_DELETE_START",
  "CHILDREN_DELETE_SUCCESS",
  "CHILDREN_DELETE_FAIL"
];

export const deleteChildren = id => dispatch => {
  dispatch({ type: CHILDREN_DELETE_START });
  axios
    .delete(`https://giga-back-end.herokuapp.com/api/users/register${id}`)
    .then(res => {
      dispatch({ type: CHILDREN_DELETE_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: CHILDREN_DELETE_FAIL, payload: err });
    });
};

export const SET_CURRENT_CHILD = "SET_CURRENT_CHILD";

export const setCurrentChild = selectedChild => {
  return {
    type: SET_CURRENT_CHILD,
    payload: selectedChild
  }
}

export const SET_PUP_STATUS = "SET_PUP_STATUS";

export const setPupStatus = (status) => {
  return {
    type: SET_PUP_STATUS,
    payload: status
  }
}

export const FILTERED_TO_STATE = "FILTERED_TO_STATE";

export const filteredToState = array => {
  return {
    type: FILTERED_TO_STATE,
    payload: array
  }
}

export const INCUBATOR_LAUNCH_REG = "INCUBATOR_LAUNCH_REG";

export const launchIncubatorRegular = () => {
  return {
    type: INCUBATOR_LAUNCH_REG,
  }
}

export const INCUBATOR_LAUNCH_PEACE = "INCUBATOR_LAUNCH_PEACE";

export const launchIncubatorPeace = () => {
  return {
    type: INCUBATOR_LAUNCH_PEACE,
  }
}




