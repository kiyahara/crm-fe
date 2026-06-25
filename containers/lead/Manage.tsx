"use client";

import { SearchInput, TableComponent } from "@/components";
import useBoundStore from "@/store";
import { HeaderInterface, LeadInterface, ResponseLeadInterface } from "@/types";
import { errorNotification, formatRupiah } from "@/utils";
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
// import { ModalLeadUser } from "./components";
import { LeadService } from "@/api/services";
import { ModalLeadSales, ModalLeadToSpk } from "./modal";

export default function ManageLead() {
  const defaultData: LeadInterface = {
    id: "",
    companyName: "",
    contactName: "",
    phoneNumber: "",
    email: "",
    leadSource: "",
    estimatedValue: "",
    isSpk: false,
    status: "",
    idSales: "",
    nameSales: "",
    notes: "",
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
  const [data, setData] = useState<LeadInterface[]>([]);
  const [currentData, setCurrentData] = useState<LeadInterface>(defaultData);
  const { setLoading } = useBoundStore().generalStoreData;
  const [title, setTitle] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openModalCreateSpk, setOpenModalCreateSpk] = useState<boolean>(false);
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
    { title: "No", align: "center", sizeWidth: "3%" },
    { title: "Companyname", align: "center" },
    { title: "ContactName", align: "center" },
    { title: "SalesName", align: "center" },
    { title: "PhoneNumber", align: "center" },
    { title: "EstimatedValue", align: "center" },
    { title: "Email", align: "center" },
    { title: "Status", align: "center" },
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

  const getListLead = useCallback(
    async (page = 1, limit = 10) => {
      setLoading(true);

      try {
        const response = await LeadService.getListLead({
          page,
          pageSize: limit,
          search: searchData,
        });

        if (response) {
          const dataResponse = response as ResponseLeadInterface;

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
    void getListLead(activePage, 10);
  }, [activePage, getListLead, searchData]);

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
                <Image src="/CRMSPK.png" w={200} fit="contain" alt="CRM Logo" />

                <Title order={2} ta="center">
                  CRM Lead & SPK
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
                    setTitle("Tambah Lead");
                    setCurrentData(defaultData);
                    setOpenModal(true);
                  }}
                >
                  <Flex justify={"center"} align={"center"} p={10}>
                    <IconPlus size={18} stroke={2} />
                    <Text size="xs">Tambah Lead</Text>
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
                  {data.map((lead, index) => (
                    <Table.Tr
                      key={lead.id}
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        borderBottom: "1px solid rgba(255,255,255,0.08)",
                        backdropFilter: "blur(6px)",
                      }}
                    >
                      <Table.Td ta={"center"}>
                        <Text size="md">{index + 1}</Text>
                      </Table.Td>

                      <Table.Td>
                        <Text size="md">{lead.companyName}</Text>
                      </Table.Td>

                      <Table.Td>
                        <Text size="md">{lead.contactName}</Text>
                      </Table.Td>

                      <Table.Td ta={"center"}>
                        <Text size="md">{lead.nameSales}</Text>
                      </Table.Td>

                      <Table.Td ta={"start"}>
                        <Text size="md">{lead.phoneNumber}</Text>
                      </Table.Td>

                      <Table.Td ta={"end"}>
                        <Text size="md">
                          {formatRupiah(Number(lead.estimatedValue))}
                        </Text>
                      </Table.Td>

                      <Table.Td ta={"center"}>
                        <Text size="md">{lead.email}</Text>
                      </Table.Td>

                      <Table.Td ta={"center"}>
                        <Text size="md">{lead.status}</Text>
                      </Table.Td>

                      <Table.Td ta="center">
                        <Flex gap={5}>
                          <ActionIcon
                            size="md"
                            radius="md"
                            style={{
                              background: lead.isSpk
                                ? "rgba(107,114,128,0.2)"
                                : "rgba(59,130,246,0.25)",
                              backdropFilter: "blur(10px)",
                              WebkitBackdropFilter: "blur(10px)",
                              border: lead.isSpk
                                ? "1px solid rgba(107,114,128,0.2)"
                                : "1px solid rgba(255,255,255,0.2)",
                              color: lead.isSpk ? "#9ca3af" : "#93c5fd",
                              boxShadow: lead.isSpk
                                ? "none"
                                : "0 4px 16px rgba(59,130,246,0.25)",
                              cursor: lead.isSpk ? "not-allowed" : "pointer",
                              opacity: lead.isSpk ? 0.6 : 1,
                            }}
                            onClick={() => {
                              setTitle("Edit User");
                              setCurrentData(lead);
                              setOpenModal(true);
                            }}
                            disabled={lead.isSpk}
                          >
                            <IconEdit size={16} />
                          </ActionIcon>
                          <ActionIcon
                            size="md"
                            radius="md"
                            style={{
                              background:
                                !lead.status.includes("Won") || lead.isSpk
                                  ? "rgba(107,114,128,0.2)"
                                  : "rgba(59,130,246,0.25)",
                              backdropFilter: "blur(10px)",
                              WebkitBackdropFilter: "blur(10px)",
                              border:
                                !lead.status.includes("Won") || lead.isSpk
                                  ? "1px solid rgba(107,114,128,0.2)"
                                  : "1px solid rgba(255,255,255,0.2)",
                              color:
                                !lead.status.includes("Won") || lead.isSpk
                                  ? "#9ca3af"
                                  : "#93c5fd",
                              boxShadow:
                                !lead.status.includes("Won") || lead.isSpk
                                  ? "none"
                                  : "0 4px 16px rgba(59,130,246,0.25)",
                              cursor:
                                !lead.status.includes("Won") || lead.isSpk
                                  ? "not-allowed"
                                  : "pointer",
                              opacity:
                                !lead.status.includes("Won") || lead.isSpk
                                  ? 0.6
                                  : 1,
                            }}
                            onClick={() => {
                              setCurrentData(lead);
                              setOpenModalCreateSpk(true);
                            }}
                            disabled={
                              !lead.status.includes("Won") || lead.isSpk
                            }
                          >
                            <IconPlus size={16} />
                          </ActionIcon>
                        </Flex>
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
                      <Table.Td colSpan={8} ta={"center"}>
                        <Text size="md">Tidak ada data Lead</Text>
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
      <ModalLeadSales
        title={title}
        getLead={() => getListLead(activePage, 10)}
        existingData={currentData}
        setOpenModal={setOpenModal}
        openModal={openModal}
      />

      <ModalLeadToSpk
        title={"Tambah SPK"}
        getLead={() => getListLead(activePage, 10)}
        existingData={currentData}
        setOpenModal={setOpenModalCreateSpk}
        openModal={openModalCreateSpk}
      />
    </>
  );
}
