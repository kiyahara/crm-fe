import { Button, Flex, TextInput, Textarea } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import classes from "./modalLeadToSpk.module.css";

import { ModalUniversal } from "@/components/modalUniversal";
import { useEffect, useState } from "react";
import { LeadInterface } from "@/types";
import { DateInput } from "@mantine/dates";

import { InputLeadToSpkInterface } from "@/types/spk";
import { LeadService } from "@/api/services";
import { errorNotification, showSuccessModal } from "@/utils";
import useBoundStore from "@/store";

interface PropsModalDetailCardGATypes {
  title: string;
  openModal: boolean;
  getLead: () => void;
  existingData: LeadInterface;
  setOpenModal: (_dataDetail: boolean) => void;
}

export function ModalLeadToSpk({
  title,
  openModal,
  existingData,
  getLead,
  setOpenModal,
}: PropsModalDetailCardGATypes) {
  const { setLoading } = useBoundStore().generalStoreData;
  const [dataLeadToSpk, setDataLeadToSpk] = useState<InputLeadToSpkInterface>({
    idSales: "",
    nameSales: "",
    idLead: "",
    projectName: "",
    contractValue: 0,
    startDate: "",
    endDate: "",
    statusSales: "",
    statusFinance: "",
    notesFinance: "",
  });
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
      const response = await LeadService.PostNewSpk(dataLeadToSpk);
      if (response) {
        showSuccessModal({
          title: "Success",
          message: `Berhasil ${title.includes("Tambah") ? "Menambahkan" : "Mengubah"} SPK`,
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
      setDataLeadToSpk((prev) => ({
        ...prev,
        idSales: existingData.idSales,
        nameSales: existingData.nameSales,
        idLead: existingData.id,
        projectName: "",
        contractValue: Number(existingData.estimatedValue),
        startDate: "",
        endDate: "",
        statusSales: existingData.status,
        statusFinance: "New",
        notesFinance: "",
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
            label="Project Name"
            placeholder="projectName..."
            size="md"
            mb="md"
            value={dataLeadToSpk.projectName}
            onChange={(e) =>
              setDataLeadToSpk({
                ...dataLeadToSpk,
                projectName: e.target.value,
              })
            }
          />

          <DateInput
            label="Start Date"
            placeholder="Pilih tanggal"
            value={dataLeadToSpk.startDate}
            onChange={(value) =>
              setDataLeadToSpk({
                ...dataLeadToSpk,
                startDate: value ?? "",
              })
            }
          />

          <DateInput
            label="End Date"
            placeholder="Pilih tanggal"
            value={dataLeadToSpk.endDate}
            onChange={(value) =>
              setDataLeadToSpk({
                ...dataLeadToSpk,
                endDate: value ?? "",
              })
            }
          />

          <Textarea
            label="Notes Finance"
            placeholder="notes..."
            size="md"
            mb="md"
            autosize
            minRows={4}
            value={dataLeadToSpk.notesFinance}
            onChange={(e) =>
              setDataLeadToSpk({
                ...dataLeadToSpk,
                notesFinance: e.target.value,
              })
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
