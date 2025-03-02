
import axios, { AxiosError } from "axios";
import { getCookies } from './cookies'


const service = axios.create({
  baseURL: "http://localhost:3000/api",
});

service.interceptors.request.use(
  (config) => {
    config.headers["Authentication"] = getCookies("token") || "";
    config.headers["X-Requested-With"] = "XMLHttpRequest";
    return config;
  },
  (error : AxiosError) => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error : AxiosError ) {

    if(error.code == "ERR_NETWORK"){
      error.message = "No hay Conexion con el Servidor"
    }else{
      error.message = error.response?.data as string || error.message
    }
  
    return Promise.reject(error);
  }
);



export const fetchGet = async <ResultData>(url: string): Promise<ResultData> => {

   const {data} = await service.get(url)
   return data

}

export const fetchPost = async  <Data>(url: string, data: Data): Promise<any> => {

    const {data : datos} = await service.post(url , data)
    return datos

}


export const sleep = async (ms: number) => await new Promise((resolve) => setTimeout(resolve, ms));