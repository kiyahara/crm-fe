"use client";

import { ModalUniversalInterface } from "@/types";
import { Modal } from "@mantine/core";
import classes from "./modalUniversal.module.css";

export function ModalUniversal({
  opened,
  close,
  title,
  size = "md",
  isCentered = true,
  isCloseButton = true,
  children,
  fullScreen = false,
  isCantClose = false,
}: ModalUniversalInterface) {
  return (
    <Modal
      opened={opened}
      onClose={close}
      title={title}
      size={size}
      centered={isCentered}
      fullScreen={fullScreen}
      withCloseButton={isCloseButton}
      closeOnClickOutside={!isCantClose}
      closeOnEscape={!isCantClose}
      overlayProps={{
        backgroundOpacity: 0.15,
        blur: 12,
      }}
      classNames={{
        content: classes.content,
        header: `${classes.header} ${!title ? classes.headerHidden : ""}`,
        body: classes.body,
        close: classes.close,
      }}
    >
      {children}
    </Modal>
  );
}
