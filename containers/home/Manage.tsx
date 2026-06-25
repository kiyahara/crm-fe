"use client";

import useBoundStore from "@/store";
import { Flex, Image, Paper, Text, Title } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ManageMainHome() {
  const { currentUser } = useBoundStore().generalStoreData;
  const { width } = useViewportSize();
  const isMobile = width <= 768;
  const router = useRouter();
  const [hovered, setHovered] = useState<"left" | "right" | null>(null);
  const getCardStyle = (active: boolean) => ({
    background: "rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(12px) saturate(160%)",
    WebkitBackdropFilter: "blur(12px) saturate(160%)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    boxShadow: active
      ? "0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.25)"
      : "0 6px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.2)",
    transform: active ? "scale(1.05) translateY(-6px)" : "scale(1)",
    transition: "all 0.25s ease",
    cursor: "pointer",
  });

  const handleLogout = () => {
    localStorage.clear(); // atau remove token saja
    router.push("/login");
  };

  return (
    <>
      <Flex
        direction="column"
        style={{
          flex: 1,
        }}
        justify={"center"}
        h={"100%"}
      >
        <Paper
          radius={0}
          flex={1}
          h="100%"
          shadow="xl"
          style={{
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01)), rgba(0,0,0,0.8)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          }}
        >
          <Flex justify="space-between" align="center" w="100%" px={20} pt={20}>
            <Text c="white" size="sm">
              👋 Welcome, {currentUser?.name ?? "-"}
            </Text>

            <Text
              c="red"
              size="sm"
              px={12}
              py={6}
              style={{
                cursor: "pointer",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 8,
                backdropFilter: "blur(10px)",
                background: "rgba(255,255,255,0.05)",
              }}
              onClick={handleLogout}
            >
              Logout
            </Text>
          </Flex>
          <Flex
            flex={1}
            h={isMobile ? "100dvh" : "90dvh"}
            align="center"
            justify="space-around"
            direction={!isMobile ? "row" : "column"}
            p={30}
            gap={40}
          >
            {currentUser.type.includes("admin") ? (
              <Flex
                flex={1}
                h="100%"
                w="100%"
                justify="center"
                align="center"
                direction="column"
                p="xl"
                c={"white"}
                style={getCardStyle(hovered === "left")}
                onMouseEnter={() => setHovered("left")}
                onMouseLeave={() => setHovered(null)}
                onClick={() => router.push("/admin")}
              >
                <Image
                  src="/CRMAdmin.png"
                  w={"50%"}
                  fit="contain"
                  alt="CRM Logo"
                />

                <Title order={2} mt="lg" ta="center">
                  CRM Admin
                </Title>

                <Text ta="center" mt="sm" maw={280}>
                  Manage User Data
                </Text>
              </Flex>
            ) : (
              ""
            )}

            <Flex
              flex={1}
              h="100%"
              w="100%"
              justify="center"
              align="center"
              direction="column"
              p="xl"
              c={"white"}
              style={getCardStyle(hovered === "right")}
              onMouseEnter={() => setHovered("right")}
              onMouseLeave={() => setHovered(null)}
              onClick={() => router.push("/lead")}
            >
              <Image
                src="/CRMSPK.png"
                w={currentUser.type.includes("admin") ? "50%" : "25%"}
                fit="contain"
                alt="CRM Logo"
              />

              <Title order={2} mt="lg" ta="center">
                CRM Lead & SPK
              </Title>

              <Text ta="center" mt="sm" maw={280}>
                Manage Lead dan SPK Data
              </Text>
            </Flex>
          </Flex>
        </Paper>
      </Flex>
    </>
  );
}
