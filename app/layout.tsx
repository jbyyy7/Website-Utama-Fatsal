import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "Yayasan Fathus Salafi - Pendidikan Islami Berkualitas",
  description: "Yayasan Fathus Salafi menyelenggarakan pendidikan Islam dari TK hingga MA dengan kurikulum terpadu dan berkualitas",
  keywords: ["Yayasan Fathus Salafi", "Sekolah Islam", "Pendidikan Islam", "PPDB", "MA", "MTs", "MI"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
