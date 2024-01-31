import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";
import Navbar from "@/components/navbar";
import { getBlogName } from "@/lib/request";
import NewsletterCard from "@/components/newsletter-card";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

export async function generateMetaData() {
  const data = await getBlogName();

  return {
    title: data.displayTitle || data.title,
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getBlogName();
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={data.favicon || "/favicon.io"} />
      </head>
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
          <NewsletterCard />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
