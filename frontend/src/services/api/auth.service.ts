import axios from "axios";
import type { User } from "../../types/user.types";

const apiUrl = "http://localhost:5080";

//add import.meta.env.VITE_API_URL || 

interface RegisterPayload{
    username: string,
    email: string,
    password: string
}

interface LoginPayload{
    email: string,
    password: string
}

interface AuthResponse {
  status: string;
  user?: User;
  message?: string;
}

const api = axios.create({
    baseURL: `${apiUrl}/api/auth`,
    withCredentials: true
})

export const register = async ({
  username,
  email,
  password,
}:RegisterPayload): Promise<AuthResponse | undefined> => {

  try{
    const response = await api.post(`/register`, {
      username,
      email,
      password,
    })
    return response.data;
  }catch(e){
    console.error(e)
  }
};


export const login = async ({
  email,
  password,
}:LoginPayload): Promise<AuthResponse | undefined> => {

  try{
    const response = await api.post(`/login`, {
      
      email,
      password,
    })
    return response.data;
  }catch(e){
    console.error(e)
  }
}

export const logout = async (): Promise<AuthResponse | undefined> => {
  try{
    const response = await api.post(`/logout`)
    return response.data;
  }catch(e){
    console.error(e)
  }
}

export const getme = async (): Promise<AuthResponse | undefined> => {
  try{
    const response = await api.get(`/getme`)
    return response.data;
  }catch(e){
    console.error(e)
  }
}
