import { notifications } from "@mantine/notifications";
// import { signOut } from 'next-auth/react';

export async function errorNotification(e: any) {
  switch (e?.response?.status) {
    case 400: {
      notifications.show({
        title: "Bad Request",
        message:
          e?.response?.data?.message ||
          "Your request is invalid. Please try again later.",
        color: "#DC3545",
        position: "top-right",
      });
      return;
    }
    case 401: {
      notifications.show({
        title: "Unauthorized",
        message:
          e?.response?.data?.message ||
          "You need to login to access this page.",
        color: "#DC3545",
        position: "top-right",
      });
      // await signOut();
      return;
    }

    case 403: {
      notifications.show({
        title: "Forbidden",
        message:
          e?.response?.data?.message || "You do not have access to this page.",
        color: "#DC3545",
        position: "top-right",
      });
      return;
    }
    case 404: {
      notifications.show({
        title: "Not Found",
        message:
          e?.response?.data?.message ||
          "The page you are looking for could not be found.",
        color: "#DC3545",
        position: "top-right",
      });
      return;
    }
    case 422: {
      notifications.show({
        title: "Unprocessable Entity",
        message:
          e?.response?.data?.message ||
          "The submitted data is not in the required format.",
        color: "#DC3545",
        position: "top-right",
      });
      return;
    }
    case 500: {
      notifications.show({
        title: "Internal Server Error",
        message:
          e?.response?.data?.message ||
          "The service is currently unavailable. Please try again later.",
        color: "#DC3545",
        position: "top-right",
      });
      return;
    }
    case 502: {
      notifications.show({
        title: "Bad Gateway",
        message:
          e?.response?.data?.message ||
          "The web server received an invalid response from the upstream server.",
        color: "#DC3545",
        position: "top-right",
      });
      return;
    }
    case 503: {
      notifications.show({
        title: "Service Unavailable",
        message:
          e?.response?.data?.message ||
          "The service is currently unavailable. Please try again later.",
        color: "#DC3545",
        position: "top-right",
      });
      return;
    }
    case 504: {
      notifications.show({
        title: "Gateway Timeout",
        message:
          e?.response?.data?.message ||
          "The web server did not receive a timely response from the upstream server.",
        color: "#DC3545",
        position: "top-right",
      });
      return;
    }
    case 522: {
      notifications.show({
        title: "Connection Timeout",
        message:
          e?.response?.data?.message ||
          "The connection to the upstream server took too long.",
        color: "#DC3545",
        position: "top-right",
      });
      return;
    }
    default: {
      notifications.show({
        title: "System Error",
        message:
          e?.response?.data?.message ||
          "The service is currently unavailable. Please try again later.",
        color: "#DC3545",
        position: "top-right",
      });
      return;
    }
  }
}
