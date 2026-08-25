import Providers from "@/components/providers";
import "./globals.css";
import SyncGuestCart from "@/components/shared/sync-guest-cart";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Providers>
          {children}
          <SyncGuestCart />
        </Providers>
      </body>
    </html>
  );
}
