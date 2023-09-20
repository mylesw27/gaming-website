import WebsiteFooter from "../components/Footer/page"
import Navigation from "../components/Navigation/page"
import '../globals.css'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body >
      <Navigation />
      <div>
        {children}
      </div>
        <WebsiteFooter />
      </body>
    </html>
  )
}
