/* eslint-disable no-unused-vars */
import { toast } from "react-toastify";

export enum ToasterEnum {
  error = "error",
  info = "info",
  success = "success",
}
export type ToasterType = "error" | "info" | "success";

export const Toaster = ({
  message,
  shouldDismiss,
  type,
}: {
  type: ToasterType;
  message: string;
  shouldDismiss?: boolean;
}) => {
  if (shouldDismiss) {
    toast.dismiss();
  }
  if (type === ToasterEnum.success) {
    toast.success(message, {
      position: "top-center",
    });
  } else if (type === ToasterEnum.info) {
    toast.info(message, {
      position: "top-center",
    });
  } else {
    toast.error(message, {
      position: "top-center",
    });
  }
};
