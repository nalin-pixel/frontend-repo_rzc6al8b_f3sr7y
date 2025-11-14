export default function Footer(){
  return (
    <footer className="bg-[#0f0a07] text-amber-50 border-t border-white/10 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-semibold mb-3">Roast & Ritual</h3>
          <p className="text-sm text-amber-100/80">Small-batch specialty coffee roasted with care. Sourced ethically, crafted for flavor.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Shop</h4>
          <ul className="space-y-2 text-sm text-amber-100/80">
            <li><a href="/shop">All Coffees</a></li>
            <li><a href="/shop?filter=light">Light Roast</a></li>
            <li><a href="/shop?filter=medium">Medium Roast</a></li>
            <li><a href="/shop?filter=dark">Dark Roast</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-amber-100/80">
            <li><a href="/about">About</a></li>
            <li><a href="/wholesale">Wholesale</a></li>
            <li><a href="/testimonials">Testimonials</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Connect</h4>
          <p className="text-sm text-amber-100/80">Join our newsletter for brew tips and new releases.</p>
          <form className="mt-3 flex">
            <input className="flex-1 bg-white/5 border border-white/10 rounded-l px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-400" placeholder="Your email" />
            <button className="bg-amber-400 text-black text-sm font-semibold px-3 rounded-r">Subscribe</button>
          </form>
          <p className="text-xs text-amber-100/60 mt-3">© {new Date().getFullYear()} Roast & Ritual. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
