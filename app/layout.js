import MainHeader from '@/components/main-header/main-header';
import './globals.css';

export const metadata = { // for search engines or shown when sharing links
  title: 'NextLevel Food',
  description: 'Delicious meals, shared by a food-loving community.',
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
