import { setUsersStart, setUsersSuccess, setUsersFailure } from "./usersReducer";
import axios from "axios";


export const fetchUsers = () => async (dispatch) => {
    const options = {
        method: 'GET',
        maxBodyLength: Infinity,
        url: `https://contact.herokuapp.com/contact`,
        headers: {
          "Accept": 'application/json',
          "Content-Type": "application/json",
        },
    };

    dispatch(setUsersStart());
    try {
      const response = await axios.request(options);
      dispatch(setUsersSuccess(response.data.data));
    } catch (error) {
      dispatch(setUsersFailure(error));
    }
};

export const fetchUsersById = (id) => async (dispatch) => {
    const optionsById = {
        method: 'GET',
        maxBodyLength: Infinity,
        url: `https://contact.herokuapp.com/contact/${id}`,
        headers: {
          "Accept": 'application/json',
          "Content-Type": "application/json",
        },
    };

    dispatch(setUsersStart());
    try {
      const response = await axios.request(options);
      dispatch(setUsersSuccess(response.data.data));
    } catch (error) {
      dispatch(setUsersFailure(error));
    }
};
