import { Button, Flex, Select, TextInput, Textarea } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import classes from "./modalLeadSales.module.css";

import { ModalUniversal } from "@/components/modalUniversal";
import { useCallback, useEffect, useState } from "react";
import {
  InputLeadInterface,
  LeadInterface,
  ResponseUserSalesInterface,
  UserInterface,
} from "@/types";
import useBoundStore from "@/store";
import { errorNotification, formatRupiah, showSuccessModal } from "@/utils";
import { LeadService, UserService } from "@/api/services";

interface PropsModalDetailCardGATypes {
  title: string;
  openModal: boolean;
  getLead: () => void;
  existingData: LeadInterface;
  setOpenModal: (_dataDetail: boolean) => void;
}

export function ModalLeadSales({
  title,
  openModal,
  existingData,
  getLead,
  setOpenModal,
}: PropsModalDetailCardGATypes) {
  const { currentUser, setLoading } = useBoundStore().generalStoreData;
  const [dataLead, setDataLead] = useState<InputLeadInterface>({
    companyName: "",
    contactName: "",
    phoneNumber: "",
    email: "",
    leadSource: "",
    estimatedValue: 0,
    status: "",
    idSales: currentUser.id,
    nameSales: currentUser.type.includes("admin") ? "" : currentUser.name,
    notes: "",
  });
  const [dataSales, setDataSales] = useState<UserInterface[]>([]);
  const { width } = useViewportSize();
  const isMobile = width <= 768;

  const handleClose = (isHit: boolean) => {
    setOpenModal(false);
    if (isHit) {
      getLead();
    }
  };

  async function SubmitData() {
    try {
      setLoading(true);
      const response = title.includes("Tambah")
        ? await LeadService.PostNewLead(dataLead)
        : await LeadService.PutExistingLead(existingData.id, dataLead);
      if (response) {
        showSuccessModal({
          title: "Success",
          message: `Berhasil ${title.includes("Tambah") ? "Menambahkan" : "Mengubah"} Lead`,
        }).then(() => {
          handleClose(true);
        });
      }
    } catch (error) {
      setLoading(false);
      errorNotification(error);
    }
  }

  useEffect(() => {
    if (existingData && openModal) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDataLead((prev) => ({
        ...prev,
        companyName: existingData.companyName,
        contactName: existingData.contactName,
        phoneNumber: existingData.phoneNumber,
        email: existingData.email,
        leadSource: existingData.leadSource,
        estimatedValue: Number(existingData.estimatedValue),
        status: existingData.status,
        idSales: existingData.idSales,
        nameSales: existingData.nameSales,
        notes: existingData.notes,
      }));
    }
  }, [openModal, existingData]);

  const getUserSales = useCallback(async () => {
    setLoading(true);

    try {
      const response = await UserService.getListUserType("sales");

      if (response) {
        const dataResponse = response as ResponseUserSalesInterface;
        setDataSales(dataResponse.data);
      }
    } catch (error) {
      errorNotification(error);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setDataSales]);

  useEffect(() => {
    if (currentUser.type.includes("admin") && openModal) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      void getUserSales();
    }
  }, [currentUser.type, getUserSales, openModal]);

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
            label="Company Name"
            placeholder="companyName..."
            size="md"
            mb="md"
            value={dataLead.companyName}
            onChange={(e) =>
              setDataLead({ ...dataLead, companyName: e.target.value })
            }
          />

          <TextInput
            label="Contact Name"
            placeholder="contactName..."
            size="md"
            mb="md"
            value={dataLead.contactName}
            onChange={(e) =>
              setDataLead({ ...dataLead, contactName: e.target.value })
            }
          />

          <TextInput
            label="Phone Number"
            placeholder="phoneNumber..."
            size="md"
            mb="md"
            value={dataLead.phoneNumber}
            onChange={(e) =>
              setDataLead({ ...dataLead, phoneNumber: e.target.value })
            }
          />

          <TextInput
            label="Email"
            placeholder="your@email.com"
            size="md"
            mb="md"
            value={dataLead.email}
            onChange={(e) =>
              setDataLead({ ...dataLead, email: e.target.value })
            }
          />

          <TextInput
            label="Lead Source"
            placeholder="leadSource..."
            size="md"
            mb="md"
            value={dataLead.leadSource}
            onChange={(e) =>
              setDataLead({ ...dataLead, leadSource: e.target.value })
            }
          />

          <TextInput
            label="Estimated Value"
            placeholder="EstimatedValue..."
            size="md"
            mb="md"
            type="number"
            value={formatRupiah(dataLead.estimatedValue)}
            onChange={(e) => {
              const inputValue = e.target.value;
              const normalizedValue = inputValue.replace(/[.,]/g, "");
              const realInputValue = Number(normalizedValue);

              setDataLead({ ...dataLead, estimatedValue: realInputValue });
            }}
          />

          <Select
            label="Status"
            placeholder="Status..."
            size="md"
            mb="md"
            data={[
              { value: "New", label: "new" },
              { value: "Contacted", label: "contacted" },
              { value: "Qualified", label: "qualified" },
              { value: "Negotiation", label: "negotiation" },
              { value: "Won", label: "won" },
              { value: "Lost", label: "lost" },
            ]}
            value={dataLead.status}
            onChange={(value) =>
              setDataLead({ ...dataLead, status: value ?? "" })
            }
          />

          {currentUser.type.includes("admin") && dataSales ? (
            <Select
              label="Sales Name"
              placeholder="Select User Sales..."
              size="md"
              mb="md"
              data={
                dataSales && dataSales.length > 0
                  ? dataSales.map((item) => ({
                      value: item.id,
                      label: item.name,
                    }))
                  : [{ value: "", label: "" }]
              }
              value={dataLead.idSales}
              onChange={(value) =>
                setDataLead({
                  ...dataLead,
                  idSales: value ?? "",
                  nameSales:
                    dataSales.find((item) => item.id === value)?.name ?? "",
                })
              }
            />
          ) : (
            <TextInput
              label="Sales Name"
              placeholder="nameSales..."
              size="md"
              mb="md"
              value={dataLead.nameSales}
              readOnly
            />
          )}
          <Textarea
            label="Notes"
            placeholder="notes..."
            size="md"
            mb="md"
            autosize
            minRows={4}
            value={dataLead.notes}
            onChange={(e) =>
              setDataLead({ ...dataLead, notes: e.target.value })
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
