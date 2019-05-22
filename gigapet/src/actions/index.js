import axios from "axios";

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
        .post(
          "https://giga-back-end.herokuapp.com/api/users/login",
          loginInput
        )
        .then(res => {
          console.log(res);
          localStorage.setItem("token", res.data);
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
      console.log(res);
      localStorage.setItem("token", res.data);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: LOGIN_FAIL, payload: err.data });
    });
};

export const [ENTRY_GET_START, ENTRY_GET_SUCCESS, ENTRY_GET_FAIL] = [
  "ENTRY_GET_START",
  "ENTRY_GET_SUCCESS",
  "ENTRY_GET_FAIL"
];

export const getFood = () => dispatch => {
  dispatch({ type: ENTRY_GET_START });
  axios
    .get("https://giga-back-end.herokuapp.com/api/app/addfood")
    .then(res => {
      dispatch({ type: ENTRY_GET_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: ENTRY_GET_FAIL, payload: err });
    });
};

export const [ENTRY_POST_START, ENTRY_POST_SUCCESS, ENTRY_POST_FAIL] = [
  "ENTRY_POST_START",
  "ENTRY_POST_SUCCESS",
  "ENTRY_POST_FAIL"
];

export const postFood = newEntry => dispatch => {
  dispatch({ type: ENTRY_POST_START });
  axios
    .post("https://giga-back-end.herokuapp.com/api/app/addfood", newEntry)
    .then(res => {
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

export const putFood = (entry, id) => dispatch => {
  dispatch({ type: ENTRY_PUT_START });
  axios
    .put(`https://giga-back-end.herokuapp.com/api/users/register/${id}`, entry)
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
  axios
    .delete(`https://giga-back-end.herokuapp.com/api/users/register${id}`)
    .then(res => {
      dispatch({ type: ENTRY_DELETE_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: ENTRY_DELETE_FAIL, payload: err });
    });
};

export const [CHILDREN_GET_START, CHILDREN_GET_SUCCESS, CHILDREN_GET_FAIL] = [
  "CHILDREN_GET_START",
  "CHILDREN_GET_SUCCESS",
  "CHILDREN_GET_FAIL"
];

export const getChildren = ParentID => dispatch => {
  dispatch({ type: CHILDREN_GET_START });
  axios
    .get("https://giga-back-end.herokuapp.com/api/app/childnames")
    .then(res => {
      dispatch({ type: CHILDREN_GET_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: CHILDREN_GET_FAIL, payload: err });
    });
};

export const SET_CURRENT_CHILD = "SET_CURRENT_CHILD";







