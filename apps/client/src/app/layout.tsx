import "./index.css";
import Providers from "./providers";

export const metadata = {
  title: "Sales Calls Logger",
  description: "Sales Calls Logger",
};

export default function Layout({ children }: React.PropsWithChildren<object>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
