import axios from 'axios'

export const registerUser = async (user) => {

    await axios.post(`${process.env.REACT_APP_API}/signup` , user)

}

export const login = async (user) =>
  await axios.post(`${process.env.REACT_APP_API}/login`, user);