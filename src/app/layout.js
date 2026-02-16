import { Geist_Mono, Roboto_Serif } from "next/font/google";
import "./globals.css";

const robotoSerif = Roboto_Serif({
  variable: "--font-roboto-serif",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Tit for tat agency",
  description: "creative web solutions agency",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${robotoSerif.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}