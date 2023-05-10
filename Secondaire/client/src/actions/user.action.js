import axios from "axios";
import { useDispatch } from "react-redux";

export const GET_USER = "GET_USER";

export const getUser = (uid) => {
  return (dispatch) => {
    return axios
      .get(`http://localhost:5000/api/user/${uid}`)
      .then((res) => {
        dispatch({
          type: GET_USER,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const resetUser = () => {
  return (dispatch) => {
    dispatch({
      type: GET_USER,
      payload: {},
    });
  };
};
