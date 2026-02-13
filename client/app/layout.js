import '../styles/globals.css'

export const metadata = {
  title: 'Minimal Store',
  description: 'A minimal e-commerce store',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}