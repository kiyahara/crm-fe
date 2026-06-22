"use client";

import { LoginService } from "@/api/services";
import useBoundStore from "@/store";
import { ResponseLoginInterface } from "@/types/login/login";
import { errorNotification } from "@/utils";
import {
  Button,
  Flex,
  Grid,
  Image,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ManageLogin() {
  const { setLoading } = useBoundStore().generalStoreData;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { width } = useViewportSize();
  const router = useRouter();
  const isMobile = width <= 768;

  async function Login() {
    try {
      setLoading(true);
      const response = await LoginService.Login(email, password);

      if (response) {
        const dataResponse: ResponseLoginInterface =
          response as ResponseLoginInterface;
        console.log(dataResponse);
        localStorage.setItem("token", dataResponse.data.data.accessToken);
        localStorage.setItem(
          "refreshToken",
          dataResponse.data.data.refreshToken
        );
        localStorage.setItem("userId", dataResponse.data.data.user.id);
        setLoading(false);
        router.replace("/home");
      } else {
        console.log(response);
      }
    } catch (error) {
      setLoading(false);
      errorNotification(error);
    }
  }

  return (
    <Flex
      justify="center"
      align="center"
      mih="100dvh"
      px="md"
      style={{
        overflow: "hidden",
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01)), rgba(0,0,0,0.8)",
      }}
    >
      <Paper
        radius={32}
        shadow="xl"
        w={950}
        maw="95%"
        style={{
          overflow: "hidden",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01)), rgba(0,0,0,0.8)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        }}
      >
        <Grid gap={0}>
          {!isMobile ? (
            <Grid.Col span={{ base: 12, md: 5 }}>
              <Flex
                justify="center"
                align="center"
                direction="column"
                mih={550}
                p="xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(76,110,245,0.15), rgba(34,139,230,0.08))",
                }}
              >
                <Image
                  src="/CRMLogo.png"
                  w={220}
                  fit="contain"
                  alt="CRM Logo"
                />

                <Title order={2} mt="lg" c="white" ta="center">
                  CRM Dashboard
                </Title>

                <Text c="dimmed" ta="center" mt="sm" maw={280}>
                  Manage customers, sales, and support from one platform.
                </Text>
              </Flex>
            </Grid.Col>
          ) : (
            ""
          )}

          <Grid.Col span={{ base: 12, md: 7 }}>
            <Flex direction="column" justify="center" mih={550} p={40}>
              {isMobile ? (
                <>
                  <Image
                    src="/CRMLogo.png"
                    h={150}
                    fit="contain"
                    alt="CRM Logo"
                  />
                  <Title c="white" ta="center" mb={"lg"}>
                    CRM Dashboard
                  </Title>
                </>
              ) : (
                ""
              )}

              <Title order={1} mb={8} c="white">
                Welcome
              </Title>

              <Text c="dimmed" mb="xl">
                Sign in to continue to your account
              </Text>

              <TextInput
                label="Email"
                placeholder="your@email.com"
                size="md"
                mb="md"
                c="white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <PasswordInput
                label="Password"
                placeholder="Enter your password"
                size="md"
                mb="xl"
                c="white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button size="md" radius="md" fullWidth onClick={() => Login()}>
                Sign In
              </Button>
            </Flex>
          </Grid.Col>
        </Grid>
      </Paper>
    </Flex>
  );
}
