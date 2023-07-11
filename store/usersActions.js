import { setUsersSuccessById, setUsersStart, setUsersSuccess, setUsersFailure } from "./usersReducer";
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

// export const deleteUserById = (id) => async (dispatch) => {
//     const router = useRouter();
//     const optionsById = {
//         method: 'DELETE',
//         maxBodyLength: Infinity,
//         url: `https://contact.herokuapp.com/contact/${id}`,
//         headers: {
//           "Accept": 'application/json',
//           "Content-Type": "application/json",
//         },
//     };

//     dispatch(setUsersStart());
//     try {
//       const response = await axios.request(optionsById);
//       if (response) {
//           router.push('/');
//       }
//     } catch (error) {
//       dispatch(setUsersFailure(error));
//     }
// };

export const updateUserById = (id, payload) => async (dispatch) => {
    const optionsById = {
        method: 'PUT',
        url: `https://contact.herokuapp.com/contact/${id}`,
        headers: {
          "Accept": 'application/json',
          "Content-Type": "application/json",
        },
        data: payload
    };

    dispatch(setUsersStart());
    try {
      const response = await axios.request(optionsById);
      console.log(response)
      if (response) {
        fetchUsersById(id);
      }
    } catch (error) {
      console.log(error);
      dispatch(setUsersFailure(error));
    }
};

export const createNewContact = (payload) => async (dispatch) => {
    console.log(payload);
    const optionsPost = {
        method: "POST",
        url: `https://contact.herokuapp.com/contact`,
        headers: {
          "Accept": 'application/json',
          "Content-Type": "application/json",
        },
        data: {
          "firstName": payload.firstName,
          "lastName": payload.lastName,
          "age": payload.age,
          "photo": payload.photo
        },
        withCredentials: true
    };

    console.log(optionsPost);
    // dispatch(setUsersStart());
    try {
      const response = await axios.request(optionsPost);
      console.log(response);
      // console.log(response)
      if (response) {
        dispatch(fetchUsers());
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    //   dispatch(setUsersFailure(error));
    }
};

