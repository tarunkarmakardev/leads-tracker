import "./index.css";
import Providers from "./providers";
import RootLayout from "./root-layout";

export const metadata = {
  title: "Sales Calls Logger",
  description: "Sales Calls Logger",
};

export default function Layout({ children }: React.PropsWithChildren<object>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <RootLayout>{children}</RootLayout>
        </Providers>
      </body>
    </html>
  );
}
