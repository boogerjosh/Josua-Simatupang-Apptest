import { setUsersSuccessById, setUsersStart, setUsersSuccess, setUsersFailure } from "./usersReducer";
import axios from "axios";
import { useRouter } from 'expo-router';

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
      const sortByAbjad = 
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
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        withCredentials: true
    };

    dispatch(setUsersStart());
    try {
      const response = await axios.request(optionsById);
      dispatch(setUsersSuccessById(response.data.data));
    } catch (error) {
      dispatch(setUsersFailure(error));
    }
};

export const deleteUserById = (id) => async (dispatch) => {
    const router = useRouter();
    const optionsById = {
        method: 'DELETE',
        url: `https://contact.herokuapp.com/contact/${id}`,
        headers: {
          "Accept": 'application/json',
          "Content-Type": "application/json",
        },
    };

    // dispatch(setUsersStart());
    try {
      const response = await axios.request(optionsById);
      if (response) {
          router.push('/');
      }
    } catch (error) {
      console.log(error);
      alert(error);
      // dispatch(setUsersFailure(error));
      // Alert.alert('Error', error);
    }
};

export const updateUserById = (id, payload) => async (dispatch) => {
    const router = useRouter();
    const optionsById = {
        method: 'PUT',
        url: `https://contact.herokuapp.com/contact/${id}`,
        headers: {
          "Accept": 'application/json',
          "Content-Type": "application/json",
        },
        data: payload
    };

    try {
      // dispatch(setUsersStart());
      const response = await axios.request(optionsById);
      if (response) {
        dispatch(fetchUsersById(id));
        dispatch(fetchUsers());
        router.push(`/contact-details/${id}`);
      }
    } catch (error) {
      console.log(error);
      dispatch(setUsersFailure(error));
    }
};

export const createNewContact = (payload) => async (dispatch) => {
    const router = useRouter();
    const optionsPost = {
        method: "POST",
        url: `https://contact.herokuapp.com/contact`,
        headers: {
          "Accept": 'application/json',
          "Content-Type": "application/json",
        },
        data: payload
    };
    // dispatch(setUsersStart());
    try {
      const response = await axios.request(optionsPost);
      if (response) {
        dispatch(fetchUsers());
        router.push('/');
      }
    } catch (error) {
      console.log(error);
      dispatch(setUsersFailure(error));
    }
};

