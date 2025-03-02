import Cookies from 'js-cookie'

export const getCookies = <Data> (key : string) : undefined | Data =>{
    let cookie = Cookies.get(key)
    if (cookie == undefined) return undefined
    return JSON.parse(cookie) 
}

export const setCookies = <Data> (key : string, value : Data) : undefined | string  =>{
    if(value == undefined) return undefined
    Cookies.set(key, JSON.stringify(value) , { expires: 1 , sameSite : 'Strict' , secure : false})
    return "Ok"
}

export const removeCookies = (key : string) =>{
    Cookies.remove(key)
}

