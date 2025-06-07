// app/layout.tsx
import ThemeRegistry from './components/ThemeRegistry';

export const metadata = {
  title: 'Quiz Generator',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
