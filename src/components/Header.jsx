import { Link, NavLink } from 'react-router-dom'
import { ShoppingCart, Menu, Coffee, User } from 'lucide-react'
import { useState, useEffect } from 'react'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'About' },
  { to: '/wholesale', label: 'Wholesale' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' }
]

export default function Header({ cartCount }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-40 transition shadow-sm ${scrolled ? 'backdrop-blur bg-[#0f0a07]/60' : 'bg-transparent'} text-amber-50`}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <Coffee className="h-6 w-6 text-amber-300"/>
          <span className="text-lg">Roast & Ritual</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map(n => (
            <NavLink key={n.to} to={n.to} className={({isActive}) => `text-sm hover:text-amber-300 transition ${isActive ? 'text-amber-300' : 'text-amber-100'}`}>
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/account" className="hidden sm:inline-flex p-2 rounded hover:bg-white/5"><User className="h-5 w-5"/></Link>
          <Link to="/cart" className="relative p-2 rounded hover:bg-white/5">
            <ShoppingCart className="h-5 w-5"/>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-400 text-black text-xs rounded-full h-5 w-5 grid place-items-center font-semibold">{cartCount}</span>
            )}
          </Link>
          <button className="md:hidden p-2 rounded hover:bg-white/5" onClick={() => setOpen(v=>!v)}>
            <Menu className="h-6 w-6"/>
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/10 bg-[#0f0a07]">
          <div className="max-w-7xl mx-auto px-4 py-3 grid gap-2">
            {navItems.map(n => (
              <NavLink key={n.to} to={n.to} onClick={()=>setOpen(false)} className={({isActive}) => `py-2 ${isActive ? 'text-amber-300' : 'text-amber-50'}`}>
                {n.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
