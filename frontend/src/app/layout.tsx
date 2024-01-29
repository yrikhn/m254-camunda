import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { headers } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "~/app/_components/theme-provider";
import Nav from "~/app/_components/layout/nav";
import { CommandMenu } from "~/app/_components/command-menu";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Dalama - Library",
  description: "A library management system",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider headers={headers()}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Nav />
            <main className={"mx-4 mt-16"}>{children}</main>
            <CommandMenu />
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
