import './index.css';
import LayoutContainer from './layout-container';

export const metadata = {
  title: 'Sales Calls Logger',
  description: 'Sales Calls Logger',
};

export default function RootLayout({
  children,
}: React.PropsWithChildren<object>) {
  return (
    <html lang="en">
      <body>
        <LayoutContainer>{children}</LayoutContainer>
      </body>
    </html>
  );
}
