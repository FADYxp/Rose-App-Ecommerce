import { NextIntlClientProvider } from "next-intl";
import { Toaster } from "../ui/toaster";
import { ToastProvider, ToastViewport } from "@/components/ui/toast";
import ReactQueryProvider from "./components/react-query-provider";
import { ToastContextProvider } from "@/context/toast-context";
import SessionProviderWrapper from "./components/session-provider";

export default function Providers({ children, messages }: { children: React.ReactNode, messages: any }) {
  return (
    <ReactQueryProvider>
      <NextIntlClientProvider>
        <SessionProviderWrapper>
          <ToastContextProvider>
            <ToastProvider>
              {children}
              <ToastViewport />
            </ToastProvider>
            <Toaster />
          </ToastContextProvider>
        </SessionProviderWrapper>
      </NextIntlClientProvider>
    </ReactQueryProvider>
  );
}
