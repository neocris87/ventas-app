import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)


export const fechaHora = (fecha : string) => {
  if(fecha != null) return dayjs(fecha).format('YYYY/MM/DD HH:mm:ss')
  return ""
}

export const fecha= (fecha : string) => {
  if(fecha != null) return dayjs(fecha).format('YYYY/MM/DD')
  return ""
}