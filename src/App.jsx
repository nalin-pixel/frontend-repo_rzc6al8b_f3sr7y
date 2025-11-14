import { useEffect, useState } from 'react'
import Layout from './components/Layout'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || ''

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 pt-20 pb-16 grid md:grid-cols-2 items-center gap-10">
        <div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight tracking-tight text-amber-100">
            Small‑batch specialty coffee.
            <br /> Roasted with ritual.
          </h1>
          <p className="mt-4 text-amber-100/80 max-w-prose">
            Sourced ethically from family farms, roasted fresh to highlight terroir and sweetness. Brew better mornings.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="/shop" className="bg-amber-400 text-black font-semibold px-5 py-3 rounded shadow hover:shadow-lg transition">Shop coffees</a>
            <a href="/about" className="border border-amber-400/60 text-amber-100 px-5 py-3 rounded hover:bg-white/5 transition">Our story</a>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-amber-200/10 to-amber-500/10 border border-white/5" />
          <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 pointer-events-none" />
        </div>
      </div>
    </section>
  )
}

function FeaturedProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load(){
      try {
        if (!BACKEND_URL) throw new Error('No backend URL configured')
        const res = await fetch(`${BACKEND_URL}/api/products?limit=4`)
        if (!res.ok) throw new Error('Failed to load products')
        const data = await res.json()
        setProducts(Array.isArray(data) ? data : [])
      } catch(e){
        // Fallback placeholder items so the UI still looks populated
        setProducts([
          { slug: 'house-blend', name: 'House Blend', price: 16, description: 'Balanced, sweet, everyday cup.' },
          { slug: 'single-origin-ethiopia', name: 'Ethiopia Yirgacheffe', price: 19, description: 'Floral, citrus, delicate body.' },
          { slug: 'single-origin-colombia', name: 'Colombia Huila', price: 18, description: 'Caramel, red fruit, silky.' },
          { slug: 'espresso-dark', name: 'Midnight Espresso', price: 17, description: 'Chocolate, molasses, robust.' },
        ])
      } finally {
        setLoading(false)
      }
    }
    load()
  },[])

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-end justify-between mb-6">
        <h2 className="text-2xl font-semibold">Featured coffees</h2>
        <a href="/shop" className="text-amber-300 hover:text-amber-200 text-sm">View all</a>
      </div>
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({length:4}).map((_,i)=> (
            <div key={i} className="h-60 rounded-xl bg-white/5 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(p => (
            <a key={p._id || p.slug || p.name} href={`/shop/${p.slug || ''}`} className="group rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-amber-400/40 transition block">
              <div className="aspect-square bg-gradient-to-br from-amber-200/10 to-amber-500/10" />
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-amber-50 group-hover:text-amber-300 transition">{p.name}</h3>
                  <span className="text-amber-300 font-semibold">${((p.price ?? 0)).toFixed ? (p.price).toFixed(2) : Number(p.price).toFixed(2)}</span>
                </div>
                <p className="text-sm text-amber-100/70 mt-1 line-clamp-2">{p.description}</p>
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  )
}

function Testimonials(){
  const [items, setItems] = useState([])
  useEffect(()=>{
    async function load(){
      try{
        if (!BACKEND_URL) throw new Error('No backend URL')
        const r = await fetch(`${BACKEND_URL}/api/testimonials?limit=6`)
        if (!r.ok) throw new Error('Failed testimonials')
        const d = await r.json()
        setItems(Array.isArray(d)?d:[])
      } catch(e){
        setItems([
          { _id: '1', content: 'The best beans I have ever brewed at home.', author: 'Jamie L.' },
          { _id: '2', content: 'Fresh, aromatic, and consistently delicious.', author: 'Priya K.' },
          { _id: '3', content: 'Their espresso blend is my daily ritual.', author: 'Marco D.' },
        ])
      }
    }
    load()
  },[])
  return (
    <section className="bg-white/5 border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold mb-6">What people are saying</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(t => (
            <figure key={t._id || t.author} className="rounded-xl p-5 bg-[#0e0907] border border-white/10">
              <blockquote className="text-amber-100/90">“{t.content}”</blockquote>
              <figcaption className="mt-3 text-sm text-amber-100/70">— {t.author}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function App(){
  return (
    <Layout>
      <Hero />
      <FeaturedProducts />
      <Testimonials />
    </Layout>
  )
}
