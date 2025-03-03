import { userGetId, userUpdate } from '@/api/user';
import { UsuarioUpdate } from '@/types';
import { addToast, Button, Card, CardBody, CardHeader, Checkbox, CheckboxGroup, Form, Input } from '@heroui/react';
import { useMutation  } from '@tanstack/react-query';
import { createFileRoute, useNavigate, useRouter } from '@tanstack/react-router'
import { useState } from 'react';
import { IoArrowBackCircle } from 'react-icons/io5';
import { MdEdit } from 'react-icons/md';

export const Route = createFileRoute('/usuarios/update/$id/edit')({
    component: RouteComponent,
    loader: async ({ params }) => {
        return await userGetId(Number(params.id));
    }
})

function RouteComponent() {

    const nav = useNavigate();
    const router = useRouter()

    const usuario = Route.useLoaderData();

    const [form, setForm] = useState<UsuarioUpdate>(usuario);

    const mutation = useMutation({
        mutationKey: ["user-update", usuario.id],
        mutationFn: (usuario: UsuarioUpdate) => userUpdate(usuario),
        onSuccess: () => {
            router.invalidate()
            addToast({
                title: "Usuario actualizado",
                description: "El usuario se ha actualizado correctamente",
                color: "success",
                timeout: 2000,
            
            });
            nav({ to: "/usuarios" });
        },
        onError: (error :Error) => {
            mutation.reset();
            addToast({
                title: "Error",
                description: error.message,
                color: "danger",
                timeout: 2000,
            });
        }
    });

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutation.mutate(form);
    };

    return (
        <>
            <div className="mx-auto max-w-7xl px-2">
                <div className="flex justify-between items-center my-4">
                    <h3 className="text-2xl font-semibold">Agregar Usuario</h3>
                    <Button color="secondary" onPress={() => nav({ to: "/usuarios" })}>
                        Volver
                        <IoArrowBackCircle size={24} />
                    </Button>
                </div>

                <div>
                    <Card className="px-6">
                        <CardHeader title="Agregar Usuario" />
                        <CardBody>
                            <Form onSubmit={onSubmit}>
                                <Checkbox
                                    name="estado"
                                    color="success"
                                    defaultSelected={form.estado}
                                    onChange={(e) => setForm({ ...form, estado: e.target.checked })}
                                >
                                    Estado
                                </Checkbox>

                                <Input
                                    label="Nombre"
                                    name="nombre"
                                    isRequired
                                    value={form.nombre}
                                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                                    errorMessage="El nombre es requerido"
                                />
                                <Input
                                    label="Usuario"
                                    name="usuario"
                                    autoComplete="off"
                                    value={form.usuario}
                                    onChange={(e) =>
                                        setForm({ ...form, usuario: e.target.value })
                                    }
                                    isRequired
                                    errorMessage="El usuario es requerido"
                                />
                                <Input
                                    label="Contraseña"
                                    name="contrasena"
                                    type="password"
                                    value={form.password}
                                    onChange={(e) =>
                                        setForm({ ...form, password: e.target.value })
                                    }
                                    placeholder='Dejar en blanco para no cambiar la contraseña'
                                />

                                <CheckboxGroup
                                    defaultValue={form.roles}
                                    label="Selecciona los roles"
                                    errorMessage="Debe seleccionar al menos un rol"
                                    isRequired
                                    onChange={(e) => {
                                        setForm({ ...form, roles: e });
                                    }}
                                >
                                    <Checkbox value="Super Admin">Super Admin</Checkbox>
                                    <Checkbox value="Admin">Admin</Checkbox>
                                    <Checkbox value="Despachador">Despachador</Checkbox>
                                    <Checkbox value="Cliente">Cliente</Checkbox>
                                    <Checkbox value="Descarga">Descarga</Checkbox>
                                </CheckboxGroup>
                                <Input
                                    label="Contacto"
                                    name="contacto"
                                    value={form.contacto}
                                    onChange={(e) =>
                                        setForm({ ...form, contacto: e.target.value })
                                    }
                                />
                                <Input
                                    label="Dirección"
                                    name="direccion"
                                    value={form.direccion}
                                    onChange={(e) =>
                                        setForm({ ...form, direccion: e.target.value })
                                    }
                                />

                                <div className="flex w-full justify-end ">
                                    <Button isLoading={!mutation.isIdle} type="submit" color="warning" className="text-white" disabled={!mutation.isIdle}>
                                        Editar
                                        <MdEdit size={24} />
                                    </Button>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </>
    )
}
