"use client";

import { Flex, Text } from "@mantine/core";

export default function ManageMainHome() {
  return (
    <>
      <Flex
        direction="column"
        style={{
          flex: 1, // 🔥 penting
          minHeight: "100%",
        }}
      >
        <Flex c="white" style={{ backgroundColor: "transparent" }}>
          <Flex
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01)), rgba(0,0,0,0.8)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            }}
            w={"100%"}
            p={10}
          >
            <Text size="xs" color="#FF0033">
              CRM(Customer Relationship Management)
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
