export type ModalUtilsProps = {
  html?: string;
  title: string;
  message: string;
  confirmButtonText?: string;
  icons?: "success" | "error" | "warning" | "info" | "question";
  color?: string;
  showCancel?: boolean;
  handleChange?: () => void;
  setLoading?: (_value: boolean) => void;
  onConfirm?: () => void;
  onCancel?: () => void;
};

export type ModalUniversalInterface = {
  opened: boolean;
  close: () => void;
  title: string | null;
  size: string;
  radius?: number;
  fullScreen?: boolean;
  isCentered?: boolean;
  isCloseButton?: boolean;
  isCantClose?: boolean;
  children: React.ReactNode;
  headerStyle?: React.CSSProperties;
};
