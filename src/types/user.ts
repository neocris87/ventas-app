export type User = {
    roles:     string[];
    id:        number;
    nombre:    string;
    usuario:   string;
    estado:    boolean;
    password:  string;
    contacto:  string;
    direccion: string;
    createdAt: Date;
    updatedAt: Date;
}

export type UsuarioCreate = Omit<User, "id" | "createdAt" | "updatedAt" | "estado">
export type UsuarioUpdate = Omit<User,  "createdAt" | "updatedAt" >
