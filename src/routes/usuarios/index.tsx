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

import { Button } from "@heroui/react";
import { FaPlusCircle } from "react-icons/fa";
import { fetchGet } from "@/utils/services";
import { User } from "@/api/user";

export const Route = createFileRoute("/usuarios/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["usuarios"],
    queryFn: () => fetchGet<User[]>("/usuario"),
  });

  const nav = useNavigate();

  if (error) return <div>Error!</div>;

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
        >
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>Nombre</TableColumn>
            <TableColumn>Usuario</TableColumn>
          </TableHeader>

          <TableBody
            isLoading={isLoading}
            items={data || []}
            loadingContent={<Spinner size="lg" />}
          >
            {(item) => (
              <TableRow key={item.id}>
                <TableCell>{item.nombre}</TableCell>
                <TableCell>{item.nombre}</TableCell>
                <TableCell>{item.usuario}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
