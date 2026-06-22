"use client";

import { AppShell, Flex, Image } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useRouter } from "next/navigation";

export function Navbar() {
  const { width } = useViewportSize();
  const isMobile = width <= 768;
  const router = useRouter();

  return (
    <>
      <AppShell.Header withBorder={false}>
        <Flex direction="column" w="100%" align={"center"}>
          <Flex
            w={"100%"}
            align={"center"}
            justify={"space-between"}
            pr={5}
            pt={isMobile ? 10 : 0}
          >
            <Flex
              w="20%"
              justify="flex-start"
              align="flex-start"
              style={{ textAlign: "left" }}
              onClick={() => router.push("/home")}
            >
              <Image
                radius="md"
                src="/CRMLogo.png"
                h={100}
                w={100}
                fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                alt="logo"
                fit="contain"
                style={{
                  cursor: "pointer",
                  display: "block",
                }}
                pl={5}
              />
            </Flex>
          </Flex>
        </Flex>
      </AppShell.Header>
    </>
  );
}
