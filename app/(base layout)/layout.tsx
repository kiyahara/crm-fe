"use client";
import classes from "./layout.module.css";
import { Footer, Navbar } from "@/components";
import { AppShell, Container } from "@mantine/core";
import useBoundStore from "@/store";
import ShowLoadingModal from "@/utils/swal";
import { usePathname } from "next/navigation";
import { useCallback, useEffect } from "react";
import { UserService } from "@/api/services";
import { ResponseUserDetailInterface } from "@/types";
import { errorNotification } from "@/utils";
import AuthProvider from "@/utils/authProvider";
// import { GuardToken } from '@/contexts';
// import useBoundStore from '@/store';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading, currentUser, setLoading, setCurrentUser } =
    useBoundStore().generalStoreData;
  const pathname = usePathname();

  const getUserDetail = useCallback(async () => {
    setLoading(true);

    try {
      const id = localStorage.getItem("userId");
      const response = await UserService.getUserDetail(id ?? "");

      if (response) {
        setLoading(false);
        const dataResponse = response as ResponseUserDetailInterface;

        setCurrentUser(
          dataResponse.data ?? {
            id: "",
            name: "",
            email: "",
            type: "",
            refreshToken: null,
          }
        );
      }
    } catch (error) {
      errorNotification(error);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setCurrentUser]);

  useEffect(() => {
    if (pathname === "/login") return;
    if (!currentUser.id) {
      getUserDetail();
    }
  }, [pathname, currentUser.id, getUserDetail]);

  return (
    <AppShell
      classNames={{
        header: pathname !== "/login" ? classes.header : "",
        main: pathname !== "/login" ? classes.main : "",
      }}
    >
      {pathname !== "/login" ? <Navbar /> : ""}

      <AppShell.Main
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <ShowLoadingModal isLoading={loading} />
        <Container
          fluid
          w={"100%"}
          h={"100%"}
          size="xs"
          px={0}
          pb={40}
          style={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            // backgroundColor: "#FCFDFF",
          }}
        >
          <AuthProvider>{children}</AuthProvider>
        </Container>
        <Footer />
      </AppShell.Main>
    </AppShell>
  );
}
