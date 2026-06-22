"use client";

import { AppShell, Flex } from "@mantine/core";
import { useRouter } from "next/navigation";

export function Navbar() {
  const router = useRouter();

  return (
    <>
      <AppShell.Header withBorder={false}>
        <Flex direction="column" w="100%" align={"center"}>
          <Flex w={"100%"} align={"center"} justify={"center"} pr={5} pt={0}>
            <Flex
              w="20%"
              justify="center"
              align="center"
              style={{ textAlign: "left" }}
              onClick={() => router.push("/home")}
            >
              {/* <Image
                radius="md"
                src="/CRMLogo.png"
                h={isMobile ? 80 : 100}
                w={isMobile ? 80 : 100}
                fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                alt="logo"
                fit="contain"
                style={{
                  cursor: "pointer",
                  display: "block",
                }}
                pl={5}
              /> */}
            </Flex>
          </Flex>
        </Flex>
      </AppShell.Header>
    </>
  );
}
