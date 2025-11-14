import Header from './Header'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#0b0806] text-amber-50">
      <Header cartCount={0} />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
