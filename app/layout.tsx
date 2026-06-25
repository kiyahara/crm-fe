// "use client";
import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/code-highlight/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/nprogress/styles.css";
import "@mantine/tiptap/styles.css";
import "core-js/stable";
import React from "react";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <GlobalContextProviders>
    <html lang="en" translate="no">
      <head>
        <meta name="google" content="notranslate" />
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta
          name="impact-site-verification"
          content="add1dfb4-6970-42d9-a7ad-1c03a3448f22"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link
          rel="icon"
          type="image/png"
          href="/faviconApp.png"
          sizes="32x32"
        />
        <title>CRM (Customer Relationship Management) - Fenri Mintardja</title>
      </head>
      <body>
        <MantineProvider>
          <ModalsProvider>
            <Notifications />
            {children}
          </ModalsProvider>
        </MantineProvider>
      </body>
    </html>
    // </GlobalContextProviders>
  );
}
