import { User, UsuarioCreate, UsuarioUpdate } from "@/types"
import { fetchGet, fetchPost } from "@/utils/services"

export const getUser =  async () : Promise<User[]> => {
    const res = await fetch(`http://localhost:3000/api/usuario`)
    return await res.json() 
}

export const userCreate = async (user: UsuarioCreate) => {
   return await fetchPost("/usuario/create", user)
}

export const userGetId = async (id : number) => {
    return await fetchGet<UsuarioUpdate>(`/usuario/${id}`)
 }

 export const userUpdate = async (user: UsuarioUpdate) => {
    return await fetchPost(`/usuario/update/${user.id}`, user)
 }