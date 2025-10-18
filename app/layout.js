import "./globals.css";

export const metadata = { title: "imfil-website" };

export default function RootLayout({ children }) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
