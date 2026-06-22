import { Button, Flex, PasswordInput, Select, TextInput } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import classes from "./modalAdminUser.module.css";

import { ModalUniversal } from "@/components/modalUniversal";
import { useEffect, useState } from "react";
import { InputUserInterface, UserInterface } from "@/types";
import { UserService } from "@/api/services";
import { errorNotification, showSuccessModal } from "@/utils";
import useBoundStore from "@/store";

interface PropsModalDetailCardGATypes {
  title: string;
  openModal: boolean;
  getUser: () => void;
  existingData: UserInterface;
  setOpenModal: (_dataDetail: boolean) => void;
}

export function ModalAdminUser({
  title,
  openModal,
  existingData,
  getUser,
  setOpenModal,
}: PropsModalDetailCardGATypes) {
  const { setLoading } = useBoundStore().generalStoreData;
  const [dataUser, setDataUser] = useState<InputUserInterface>({
    name: "",
    email: "",
    password: "",
    type: "",
  });
  const { width } = useViewportSize();
  const isMobile = width <= 768;

  const handleClose = (isHit: boolean) => {
    setOpenModal(false);
    if (isHit) {
      getUser();
    }
  };

  async function SubmitData() {
    try {
      setLoading(true);
      const response = title.includes("Tambah")
        ? await UserService.PostNewUser(dataUser)
        : await UserService.PutExistingUser(existingData.id, dataUser);

      if (response) {
        showSuccessModal({
          title: "Success",
          message: `Berhasil ${title.includes("Tambah") ? "Menambahkan" : "Mengubah"} User`,
        }).then(() => {
          handleClose(true);
        });
      } else {
        console.log(response);
      }
    } catch (error) {
      errorNotification(error);
    }
  }
  useEffect(() => {
    if (existingData && openModal) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDataUser((prev) => ({
        ...prev,
        name: existingData.name,
        email: existingData.email,
        password: "",
        type: existingData.type,
      }));
    }
  }, [openModal, existingData]);
  return (
    <>
      {openModal && (
        <ModalUniversal
          opened={openModal}
          title={title}
          close={() => handleClose(false)}
          size={isMobile ? "100%" : "70%"}
        >
          <TextInput
            label="Name"
            placeholder="name..."
            size="md"
            mb="md"
            value={dataUser.name}
            onChange={(e) => setDataUser({ ...dataUser, name: e.target.value })}
          />

          <TextInput
            label="Email"
            placeholder="your@email.com"
            size="md"
            mb="md"
            value={dataUser.email}
            onChange={(e) =>
              setDataUser({ ...dataUser, email: e.target.value })
            }
          />

          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            size="md"
            mb="xl"
            value={dataUser.password}
            onChange={(e) =>
              setDataUser({ ...dataUser, password: e.target.value })
            }
          />
          <Select
            label="Type"
            placeholder="Select user type"
            size="md"
            mb="md"
            data={[
              { value: "admin", label: "Admin" },
              { value: "sales", label: "Sales" },
              { value: "finance", label: "Finance" },
            ]}
            value={dataUser.type}
            onChange={(value) =>
              setDataUser({ ...dataUser, type: value ?? "" })
            }
          />
          <Flex justify="flex-end" mt="md">
            <Button onClick={SubmitData} className={classes.buttonPrimary}>
              Simpan
            </Button>
          </Flex>
        </ModalUniversal>
      )}
    </>
  );
}
