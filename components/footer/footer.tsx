import { AppShell, Flex, Text, ActionIcon } from "@mantine/core";
import {
  IconBrandFacebookFilled,
  IconBrandGithubFilled,
  IconBrandInstagram,
} from "@tabler/icons-react";
import { useViewportSize } from "@mantine/hooks";

export function Footer() {
  const { width } = useViewportSize();
  const isMobile = width <= 768;
  return (
    <>
      <AppShell.Footer
        style={{
          marginTop: "auto", // Pushes the footer to the bottom of the container
          width: "100%",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01)), rgba(0,0,0,0.8)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          color: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Flex
          direction={isMobile ? "column" : "row"}
          justify={"space-between"}
          align={"center"}
          w={"100%"}
          py={5}
          px={10}
        >
          <Text size="xs">
            ©2026 Fenri Mintardja - CRM(Solusi Klik) TEST HUSKY
          </Text>
          <Flex>
            <ActionIcon
              bg={"black"}
              onClick={() =>
                window.open(
                  "https://www.facebook.com/fenri.mintardja",
                  "_blank"
                )
              }
            >
              <IconBrandFacebookFilled size={15} scale={2.5} />
            </ActionIcon>
            <ActionIcon
              bg={"black"}
              onClick={() =>
                window.open("https://www.instagram.com/fenri_min/", "_blank")
              }
            >
              <IconBrandInstagram size={15} scale={2.5} />
            </ActionIcon>
            <ActionIcon
              bg={"black"}
              onClick={() =>
                window.open("https://github.com/kiyahara/play-card", "_blank")
              }
            >
              <IconBrandGithubFilled size={15} scale={2.5} />
            </ActionIcon>
          </Flex>
        </Flex>
      </AppShell.Footer>
    </>
  );
}
