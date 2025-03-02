

export type User = {
    roles:     string[];
    id:        number;
    nombre:    string;
    usuario:   string;
    estado:    boolean;
    contacto:  string;
    direccion: string;
    createdAt: Date;
    updatedAt: Date;
}

export const getUser =  async () : Promise<User[]> => {
    const res = await fetch(`http://localhost:3000/api/usuario`)
    return await res.json() 
}