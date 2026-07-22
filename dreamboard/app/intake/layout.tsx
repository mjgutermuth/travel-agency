import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Trip Intake | Melinda Gutermuth',
  description: "Book time to talk through your dream trip.",
}

export default function IntakeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
