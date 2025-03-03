import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Spinner } from "@heroui/spinner";

import { Button, Chip } from "@heroui/react";
import { FaPlusCircle } from "react-icons/fa";
import { fetchGet } from "@/utils/services";
import { User } from "@/types";
import { MdEdit } from "react-icons/md";
import Custom404 from "@/components/404";
import { fecha } from "@/utils/fechas";

const getRoleColor = (role: string) => {
  switch (role) {
    case "Super Admin":
      return "primary";
    case "Admin":
      return "success";
    case "Despachador":
      return "secondary";
    case "Cliente":
      return "warning";
    default:
      return "default";
  }
};

export const Route = createFileRoute("/usuarios/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["usuarios"],
    queryFn: () => fetchGet<User[]>("/usuario"),
  });

  const nav = useNavigate();

  if (error) return <Custom404 />;

  return (
    <>
      <div className="mx-auto max-w-7xl px-2">
        <div className="flex justify-between items-center my-4">
          <h3 className="text-2xl font-semibold">Listado de Usuarios</h3>
          <Button
            color="primary"
            onPress={() => nav({ to: "/usuarios/create" })}
          >
            Agrear Usuario
            <FaPlusCircle size={24} />
          </Button>
        </div>

        <Table
          color="primary"
          selectionMode="single"
          aria-label="Tabla de usuarios"
          isStriped
        >
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>Nombre</TableColumn>
            <TableColumn>Usuario</TableColumn>
            <TableColumn>Estado</TableColumn>
            <TableColumn>Contacto</TableColumn>
            <TableColumn>Direccion</TableColumn>
            <TableColumn>Roles</TableColumn>
            <TableColumn>Fecha de Creacion</TableColumn>
            <TableColumn>Acciones</TableColumn>
          </TableHeader>

          <TableBody
            isLoading={isLoading}
            items={data || []}
            loadingContent={<Spinner size="lg" />}
          >
            {(item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.nombre}</TableCell>
                <TableCell>{item.usuario}</TableCell>
                <TableCell>{item.estado ? "Activo" : "Inactivo"}</TableCell>
                <TableCell>{item.contacto}</TableCell>
                <TableCell>{item.direccion}</TableCell>
                <TableCell >
                  <div className="flex flex-col gap-2">
                    {
                      item.roles.map((role) => (
                        <Chip key={role + item.id } size="sm" color={getRoleColor(role)}>{role}</Chip>
                      ))
                    }
                  </div>
                </TableCell>
                <TableCell>{fecha(item.createdAt.toString())}</TableCell>
                <TableCell>
                  <Button  isIconOnly size="sm" color="warning" onPress={() => nav({ to: `/usuarios/update/$id/edit`, params: { id: item.id.toString() } })}>
                    <MdEdit size={24} className="text-white" />
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
