import { userCreate } from "@/api/user";
import { UsuarioCreate } from "@/types";
import {
  addToast,
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  CheckboxGroup,
  Form,
  Input,
} from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { IoArrowBackCircle } from "react-icons/io5";

export const Route = createFileRoute("/usuarios/create")({
  component: RouteComponent,
});



function RouteComponent() {
  const nav = useNavigate();

  const mutation = useMutation({
    mutationKey: ["create-user"],
    mutationFn: (usuario: UsuarioCreate) => userCreate(usuario),
    onSuccess: () => {
      addToast({
        title: "Usuario Creado",
        description: "El usuario creado correctamente",
        color: "success",
        timeout: 2000,

      });
      nav({ to: "/usuarios" });
    },
    onError: (error) => {
      mutation.reset();
      addToast({
        title: "Error",
        description: error.message,
        color: "danger",
        timeout: 2000,
      });
    }
  });

  const [form, setForm] = useState<UsuarioCreate>({
    usuario: "",
    nombre: "",
    password: "",
    roles: [],
    contacto: "",
    direccion: "",
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
                  isRequired
                  errorMessage="La contraseña es requerida"
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
                  <Button type="submit" color="success" className="text-white" disabled={!mutation.isIdle} isLoading={!mutation.isIdle}>
                    Agregar
                    <FaPlusCircle size={24} />
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
