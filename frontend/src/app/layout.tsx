import "./globals.css";

export const metadata = {
  title: "PulseWatch",
  description: "API + LLM observability dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="app-body">
        {children}
      </body>
    </html>
  );
}