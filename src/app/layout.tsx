import './global.scss';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Clario test</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
