import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
 import { ToastContainer } from 'react-toastify';

import Navbar from "../components/shared/Navbar.jsx";
import Footer from "../components/shared/Footer.jsx";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BookNook",
  description:
    "A social media platform for book lovers to share and discover new books.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}
