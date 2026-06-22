"use client";
import classes from "./layout.module.css";
import { Footer, Navbar } from "@/components";
import { AppShell, Container } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import useBoundStore from "@/store";
import ShowLoadingModal from "@/utils/swal";
import { usePathname } from "next/navigation";
// import { GuardToken } from '@/contexts';
// import useBoundStore from '@/store';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { width } = useViewportSize();
  const isMobile = width <= 768;
  const { loading } = useBoundStore().generalStoreData;
  const pathname = usePathname();
  return (
    // <GuardToken>
    // <ErrorBoundary>
    <AppShell
      header={{ height: pathname !== "/login" ? (isMobile ? 50 : 100) : "" }}
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
          {children}
        </Container>
        <Footer />
      </AppShell.Main>
    </AppShell>
    //   </ErrorBoundary>
    // </GuardToken>
  );
}
