import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarItem,
  useDisclosure,
  ListboxItem,
  Listbox,
  Image,
} from "@heroui/react";

import { ThemeSwitch } from "@/components/theme-switch";
import { Link } from "@tanstack/react-router";

import { AiOutlineMenuUnfold } from "react-icons/ai";

export const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <HeroUINavbar isBordered maxWidth="xl" position="sticky">
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarItem>
            <Button isIconOnly variant="ghost" onPress={() => onOpen()}>
              <AiOutlineMenuUnfold size={24} />
            </Button>
          </NavbarItem>

          <NavbarItem>
            <Link className="flex justify-start items-center"  color="foreground"   to="/" >
              <Image
                src="/logo.png"
                alt="Logo"
                width={40}
                height={40}
                className="bg-slate-100"
              />
            </Link>
          </NavbarItem>

          <NavbarItem>
            <Link color="foreground" to="/usuarios">
              Usuarios
            </Link>
          </NavbarItem>
        </NavbarContent>      

        <NavbarContent className="basis-1 pl-4" justify="end">
          <ThemeSwitch />
        </NavbarContent>

      </HeroUINavbar>

      <Drawer isOpen={isOpen} size="sm" onClose={onClose} placement="left">
        <DrawerContent>
          <DrawerHeader className="flex flex-col gap-1">
            Navegación
          </DrawerHeader>
          <DrawerBody>
            <Listbox aria-label="Actions" onAction={(key) => alert(key)}>
              <ListboxItem key="new">New file</ListboxItem>
              <ListboxItem key="copy">Copy link</ListboxItem>
              <ListboxItem key="edit">Edit file</ListboxItem>
              <ListboxItem key="delete" className="text-danger" color="danger">
                Delete file
              </ListboxItem>
            </Listbox>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
