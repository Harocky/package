import Session from "./components/providers/provider";
import "@/styles/main.scss";
import EvNavbar from "./components/ui/EvNavBar";
import { ToastProvider } from "./components/ui/EvToast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="ev-theme-light min-h-screen ev-flex ev-flex-col">
        <EvNavbar />
        <Session>
          <main className="flex-1 w-full">
            <ToastProvider>{children}</ToastProvider>
          </main>
        </Session>
      </body>
    </html>
  );
}
