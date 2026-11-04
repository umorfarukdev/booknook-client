import { Ubuntu } from "next/font/google";
import "./globals.css";
import { ToastContainer } from 'react-toastify';

import Navbar from "../components/shared/Navbar.jsx";
import Footer from "../components/shared/Footer.jsx";



const ubuntu = Ubuntu({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
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
      className={`${ubuntu.className} h-full antialiased`}
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
