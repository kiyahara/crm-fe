"use client";
import { ModalUtilsProps } from "@/types";
import { useEffect } from "react";
import Swal from "sweetalert2";
import classes from "./utils.module.css";

export async function showSuccessModal({
  title,
  message,
  color,
  setLoading,
  handleChange,
}: ModalUtilsProps) {
  if (setLoading) {
    return Swal.fire({
      title: title,
      text: message,
      icon: "success",
      timer: 3000,
      timerProgressBar: true,
      allowOutsideClick: false,
      background: "rgba(255, 255, 255, 0.1)",
      color: "#fff",
      backdrop: "rgba(0,0,0,0.6) backdrop-filter: blur(10px)",
      customClass: {
        popup: classes.glassSwal,
      },
      didOpen: () => {
        const content = Swal.getHtmlContainer();
        if (content && color != "") content.style.color = color ?? "#283886";
      },
    }).then((result) => {
      if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
        setLoading(false);
        if (handleChange) {
          handleChange();
        }
      }
    });
  } else {
    return Swal.fire({
      title: title,
      text: message,
      icon: "success",
      timer: 3000,
      timerProgressBar: true,
      allowOutsideClick: false,
      background: "rgba(255, 255, 255, 0.1)",
      color: "#fff",
      backdrop: "rgba(0,0,0,0.6) backdrop-filter: blur(10px)",
      customClass: {
        popup: classes.glassSwal,
      },
    });
  }
}

export async function showErrorModal({
  title,
  message,
  setLoading,
  handleChange,
}: ModalUtilsProps) {
  if (setLoading) {
    return Swal.fire({
      title: title,
      text: message,
      icon: "error",
      timer: 3000,
      timerProgressBar: true,
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
        setLoading(false);
        if (handleChange) {
          handleChange();
        }
      }
    });
  } else {
    return Swal.fire({
      title: title,
      text: message,
      icon: "error",
      timer: 3000,
      timerProgressBar: true,
      allowOutsideClick: false,
      background: "rgba(255, 255, 255, 0.1)",
      color: "#fff",
      backdrop: "rgba(0,0,0,0.6) backdrop-filter: blur(10px)",
      customClass: {
        popup: classes.glassSwal,
      },
    });
  }
}

export async function showSwalModal({
  title,
  message,
  icons,
  color,
  setLoading,
  handleChange,
  onConfirm,
  onCancel,
  confirmButtonText = "",
  showCancel = true,
  html,
}: ModalUtilsProps) {
  const result = await Swal.fire({
    title: title,
    text: message,
    icon: icons,
    html: html,
    showCancelButton: showCancel,
    confirmButtonText: confirmButtonText == "" ? "Yes" : confirmButtonText,
    cancelButtonText: "No",
    reverseButtons: true,
    allowOutsideClick: false,
    timer: icons == "success" || icons == "error" ? 3000 : undefined,
    timerProgressBar: icons == "success" || icons == "error" ? true : false,

    didOpen: () => {
      // Styling tombol langsung saat modal dibuka
      const confirmButton = Swal.getConfirmButton();
      const cancelButton = Swal.getCancelButton();
      const iconElement = Swal.getHtmlContainer()?.querySelector(
        ".swal2-icon"
      ) as HTMLElement;
      const content = Swal.getHtmlContainer();
      if (content && color != "") content.style.color = color ?? "#283886";
      if (confirmButton) {
        confirmButton.style.backgroundColor = "#283886";
        confirmButton.style.color = "white";
        confirmButton.style.border = "none";
        confirmButton.style.borderRadius = "12px";
        confirmButton.style.paddingRight = "3rem";
        confirmButton.style.paddingLeft = "3rem";
      }
      if (cancelButton) {
        cancelButton.style.backgroundColor = "#DC3545";
        cancelButton.style.color = "white";
        cancelButton.style.border = "none";
        cancelButton.style.borderRadius = "12px";
        cancelButton.style.paddingRight = "3rem";
        cancelButton.style.paddingLeft = "3rem";
      }
      if (iconElement) {
        iconElement.style.width = "100px";
        iconElement.style.height = "100px";
        iconElement.style.strokeWidth = "2";
      }
    },
  });

  if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
    if (onConfirm) {
      onConfirm();
    }
    if (setLoading) {
      setLoading(false);
    }
    if (handleChange) {
      handleChange();
    }
  } else if (result.isDismissed && result.dismiss !== undefined) {
    if (onCancel) {
      onCancel();
    }
  }
}

interface LoadingAlertProps {
  isLoading: boolean;
}

const ShowLoadingModal: React.FC<LoadingAlertProps> = ({ isLoading }) => {
  useEffect(() => {
    if (isLoading) {
      Swal.fire({
        title: "Loading...",
        html: "Please wait...",
        allowOutsideClick: false,
        background: "rgba(255, 255, 255, 0.1)",
        color: "#fff",
        backdrop: "rgba(0,0,0,0.6) backdrop-filter: blur(10px)",
        customClass: {
          popup: classes.glassSwal,
        },
        didOpen: () => {
          Swal.showLoading(Swal.getConfirmButton());
        },
      });
    } else {
      Swal.close();
    }
    return () => {
      Swal.close();
    };
  }, [isLoading]);

  return null;
};

export default ShowLoadingModal;

export function showLoadingPopup({ isLoading }: { isLoading: boolean }) {
  if (isLoading) {
    Swal.fire({
      title: "Loading...",
      html: "Please wait...",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading(Swal.getConfirmButton());
      },
    });
  } else {
    Swal.close();
  }
}
