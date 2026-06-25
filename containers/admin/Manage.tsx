"use client";

import { UserService } from "@/api/services/user";
import { SearchInput, TableComponent } from "@/components";
import useBoundStore from "@/store";
import { HeaderInterface, ResponseUserInterface, UserInterface } from "@/types";
import { errorNotification } from "@/utils";
import { useHooksPagination } from "@/utils/pagination";
import {
  ActionIcon,
  Button,
  Flex,
  Image,
  Pagination,
  Paper,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { IconEdit, IconPlus } from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";
import { ModalAdminUser } from "./components";

export default function ManageAdmin() {
  const defaultData: UserInterface = {
    id: "",
    name: "",
    email: "",
    type: "",
    refreshToken: null,
  };
  const {
    activePage,
    totalPage,
    totalData,
    searchData,
    setActivePage,
    setTotalPage,
    setTotalData,
    setSearchData,
  } = useHooksPagination();
  const [data, setData] = useState<UserInterface[]>([]);
  const [currentData, setCurrentData] = useState<UserInterface>(defaultData);
  const { setLoading } = useBoundStore().generalStoreData;
  const [title, setTitle] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { width } = useViewportSize();
  const isMobile = width <= 768;
  const getCardStyle = () => ({
    background: "rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(12px) saturate(160%)",
    WebkitBackdropFilter: "blur(12px) saturate(160%)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    boxshadow:
      "0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.25)",
  });
  const header: HeaderInterface[] = [
    { title: "No", align: "center" },
    { title: "Nama", align: "center" },
    { title: "Email", align: "center" },
    { title: "Type", align: "center" },
    { title: "Action", align: "center" },
  ];

  const handlePageChange = (page: number) => {
    setActivePage(page);
  };

  const handleSearch = (value: string) => {
    setSearchData(value);

    if (activePage !== 1) {
      setActivePage(1);
    }
  };

  const getUserData = useCallback(
    async (page = 1, limit = 10) => {
      setLoading(true);

      try {
        const response = await UserService.getListUser({
          page,
          pageSize: limit,
          search: searchData,
        });

        if (response) {
          const dataResponse = response as ResponseUserInterface;

          setData(dataResponse.data.data ?? []);
          setTotalPage(dataResponse.data.meta.totalPages);
          setTotalData(dataResponse.data.meta.total);
        }
      } catch (error) {
        setData([]);
        errorNotification(error);
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setTotalPage, setTotalData, searchData]
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void getUserData(activePage, 10);
  }, [activePage, getUserData, searchData]);

  return (
    <>
      <Flex
        direction="column"
        style={{
          flex: 1,
        }}
        justify={"center"}
        h={"100%"}
      >
        <Paper
          radius={0}
          flex={1}
          h="100%"
          shadow="xl"
          style={{
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01)), rgba(0,0,0,0.8)",
            backdropFilter: "blur(16px)",
            boxshadow: "0 8px 32px rgba(0,0,0,0.5)",
          }}
        >
          <Flex
            flex={1}
            h={isMobile ? "100dvh" : "96.4dvh"}
            align="center"
            justify="space-around"
            direction={!isMobile ? "row" : "column"}
            p={10}
          >
            <Flex
              flex={1}
              h="100%"
              w="100%"
              justify="start"
              align="start"
              direction="column"
              p="xl"
              c={"white"}
              style={getCardStyle()}
            >
              <Flex w="100%" justify="flex-start">
                <Button
                  variant="light"
                  size="xs"
                  onClick={() => window.history.back()}
                  styles={{
                    root: {
                      borderRadius: "12px",
                    },
                  }}
                >
                  ← Back
                </Button>
              </Flex>
              <Flex
                direction="column"
                w="100%"
                justify={"center"}
                align={"center"}
              >
                <Image
                  src="/CRMAdmin.png"
                  w={200}
                  fit="contain"
                  alt="CRM Logo"
                />

                <Title order={2} ta="center">
                  CRM Admin
                </Title>
              </Flex>
              <Flex w={"100%"} justify={"end"} pb={10}>
                <Button
                  radius={20}
                  size="xs"
                  justify="center"
                  bg={"#32c5d2"}
                  styles={{
                    root: {
                      borderRadius: "16px",
                    },
                    section: {
                      marginRight: 4,
                    },
                  }}
                  onClick={() => {
                    setTitle("Tambah User");
                    setCurrentData(defaultData);
                    setOpenModal(true);
                  }}
                >
                  <Flex justify={"center"} align={"center"} p={10}>
                    <IconPlus size={18} stroke={2} />
                    <Text size="xs">Tambah User</Text>
                  </Flex>
                </Button>
              </Flex>
              <SearchInput setSearchData={handleSearch} />
              <Flex
                direction="column"
                w="100%"
                justify={"center"}
                align={"center"}
                pt={10}
              >
                <TableComponent
                  header={header}
                  headerColor="linear-gradient(135deg, #3b82f6, #1d4ed8)"
                >
                  {data.map((user, index) => (
                    <Table.Tr
                      key={user.id}
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        borderBottom: "1px solid rgba(255,255,255,0.08)",
                        backdropFilter: "blur(6px)",
                      }}
                    >
                      <Table.Td>
                        <Text size="md">{index + 1}</Text>
                      </Table.Td>

                      <Table.Td>
                        <Text size="md">{user.name}</Text>
                      </Table.Td>

                      <Table.Td>
                        <Text size="md">{user.email}</Text>
                      </Table.Td>

                      <Table.Td ta={"center"}>
                        <Text size="md">{user.type}</Text>
                      </Table.Td>

                      <Table.Td ta="center">
                        <ActionIcon
                          size="md"
                          radius="md"
                          style={{
                            background: "rgba(59,130,246,0.25)",
                            backdropFilter: "blur(10px)",
                            WebkitBackdropFilter: "blur(10px)",
                            border: "1px solid rgba(255,255,255,0.2)",
                            color: "#93c5fd",
                            boxShadow: "0 4px 16px rgba(59,130,246,0.25)",
                          }}
                          onClick={() => {
                            setTitle("Edit User");
                            setCurrentData(user);
                            setOpenModal(true);
                          }}
                        >
                          <IconEdit size={16} />
                        </ActionIcon>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                  {data.length == 0 ? (
                    <Table.Tr
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        borderBottom: "1px solid rgba(255,255,255,0.08)",
                        backdropFilter: "blur(6px)",
                      }}
                    >
                      <Table.Td colSpan={5} ta={"center"}>
                        <Text size="md">Tidak ada data User</Text>
                      </Table.Td>
                    </Table.Tr>
                  ) : (
                    ""
                  )}
                </TableComponent>
                <Flex
                  justify={"space-between"}
                  align={"center"}
                  gap={10}
                  pt={15}
                  w={"100%"}
                >
                  <Pagination
                    color="#283886"
                    total={totalPage}
                    value={activePage}
                    onChange={handlePageChange}
                    size="xs"
                    siblings={1}
                    styles={() => ({
                      control: {
                        fontSize: 10,
                        height: 18,
                        minWidth: 18,
                      },
                    })}
                  />
                  <Text size="10px" ta="end">
                    Records: {totalData != 0 ? totalData : 0}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Paper>
      </Flex>
      <ModalAdminUser
        title={title}
        getUser={() => getUserData(activePage, 10)}
        existingData={currentData}
        setOpenModal={setOpenModal}
        openModal={openModal}
      />
    </>
  );
}
