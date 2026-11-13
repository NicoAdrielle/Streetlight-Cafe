import { useState } from 'react'
import { ArrowDown, ArrowRight, Coffee, MapPin, Menu, Phone, X } from 'lucide-react'

type Category = 'Coffee' | 'Non-coffee' | 'Tea & refreshers'
type Drink = { name: string; note: string; category: Category; hot?: boolean; iced?: boolean }

// Illustrative menu; replace with confirmed offerings when supplied by the cafe.
const drinks: Drink[] = [
  { name: 'Espresso', note: 'A small, bold classic with a rich finish.', category: 'Coffee', hot: true },
  { name: 'Americano', note: 'Espresso softened with water; smooth and simple.', category: 'Coffee', hot: true, iced: true },
  { name: 'Café Latte', note: 'Espresso and silky milk in perfect balance.', category: 'Coffee', hot: true, iced: true },
  { name: 'Cappuccino', note: 'A cozy cup with a generous cloud of foam.', category: 'Coffee', hot: true },
  { name: 'Caramel Macchiato', note: 'Creamy coffee finished with caramel sweetness.', category: 'Coffee', hot: true, iced: true },
  { name: 'Café Mocha', note: 'Chocolate and espresso, made for slow sipping.', category: 'Coffee', hot: true, iced: true },
  { name: 'Spanish Latte', note: 'A sweet, velvety take on the iced latte.', category: 'Coffee', iced: true },
  { name: 'Cold Brew', note: 'Slow-steeped for a mellow, refreshing cup.', category: 'Coffee', iced: true },
  { name: 'Matcha Latte', note: 'Earthy green tea with creamy milk.', category: 'Non-coffee', hot: true, iced: true },
  { name: 'Classic Chocolate', note: 'Rich cocoa comfort, warm or chilled.', category: 'Non-coffee', hot: true, iced: true },
  { name: 'Strawberry Milk', note: 'A sweet and creamy berry treat.', category: 'Non-coffee', iced: true },
  { name: 'Vanilla Cream', note: 'Smooth, mellow, and gently sweet.', category: 'Non-coffee', iced: true },
  { name: 'Iced Lemon Tea', note: 'Bright citrus and tea over ice.', category: 'Tea & refreshers', iced: true },
  { name: 'Peach Iced Tea', note: 'A fruity, easygoing afternoon refresher.', category: 'Tea & refreshers', iced: true },
  { name: 'Honey Calamansi', note: 'A familiar citrus lift with a honey finish.', category: 'Tea & refreshers', hot: true, iced: true },
  { name: 'Passion Fruit Fizz', note: 'Tropical sparkle in every sip.', category: 'Tea & refreshers', iced: true },
]
const categories = ['All drinks', 'Coffee', 'Non-coffee', 'Tea & refreshers'] as const
type Filter = typeof categories[number]
const categoryPaths: Record<Filter, string> = {
  'All drinks': '/menu/',
  Coffee: '/menu/coffee/',
  'Non-coffee': '/menu/non-coffee/',
  'Tea & refreshers': '/menu/tea-refreshers/',
}
const mapUrl = 'https://www.google.com/maps/search/?api=1&query=Sitio+Uno+Brgy+Binan+Pagsanjan+Philippines+4008'
const facebookUrl = 'https://www.facebook.com/search/top?q=Streetlight%20Caf%C3%A9'

function App() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  const page = path.startsWith('/menu') ? 'menu' : path === '/story' ? 'story' : path === '/visit' ? 'visit' : 'home'
  const filter: Filter = path === '/menu/coffee' ? 'Coffee' : path === '/menu/non-coffee' ? 'Non-coffee' : path === '/menu/tea-refreshers' ? 'Tea & refreshers' : 'All drinks'
  const visibleDrinks = filter === 'All drinks' ? drinks : drinks.filter((drink) => drink.category === filter)
  const closeMenu = () => setMobileOpen(false)
  const StoryHeading = page === 'story' ? 'h1' : 'h2'
  const MenuHeading = page === 'menu' ? 'h1' : 'h2'
  const VisitHeading = page === 'visit' ? 'h1' : 'h2'

  return <div className="min-h-screen bg-[#f6f0df] text-[#3e291b]">
    <div className="bg-[#4a2e1d] px-4 py-2.5 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f4e2bb] sm:text-xs">A little light, a little coffee, a lot of good moments</div>
    <header className="relative z-30 border-b border-[#4a2e1d]/10 bg-[#f8f2e5]">
      <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:h-[88px] lg:px-12" aria-label="Main navigation">
        <a href="/" className="flex items-center gap-3" onClick={closeMenu} aria-label="Streetlight Café home">
          <img src="/streetlight-logo.png" alt="Streetlight Café logo" className="h-14 w-14 rounded-full object-cover mix-blend-multiply lg:h-16 lg:w-16" />
          <span className="text-[13px] font-bold uppercase tracking-[0.22em] leading-tight sm:text-sm">Streetlight<br /><span className="font-medium tracking-[0.34em]">Café</span></span>
        </a>
        <div className="hidden items-center gap-9 text-[13px] font-semibold uppercase tracking-[0.12em] lg:flex">
          <a href="/" className="nav-link" aria-current={page === 'home' ? 'page' : undefined}>Home</a><a href="/story/" className="nav-link" aria-current={page === 'story' ? 'page' : undefined}>Our story</a><a href="/menu/" className="nav-link" aria-current={page === 'menu' ? 'page' : undefined}>Drinks menu</a><a href="/visit/" className="nav-link" aria-current={page === 'visit' ? 'page' : undefined}>Find us</a>
        </div>
        <a href="/menu/" className="hidden items-center gap-2 rounded-full bg-[#8b562d] px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#6e401f] xl:inline-flex">Explore the menu <ArrowRight size={16} /></a>
        <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#4a2e1d]/20 lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen}>{mobileOpen ? <X size={21} /> : <Menu size={21} />}</button>
      </nav>
      {mobileOpen && <div className="absolute inset-x-0 top-full flex flex-col gap-1 border-b border-[#4a2e1d]/15 bg-[#f8f2e5] px-6 py-5 shadow-lg lg:hidden"><a href="/" onClick={closeMenu} className="mobile-link">Home</a><a href="/story/" onClick={closeMenu} className="mobile-link">Our story</a><a href="/menu/" onClick={closeMenu} className="mobile-link">Drinks menu</a><a href="/visit/" onClick={closeMenu} className="mobile-link">Find us</a></div>}
    </header>

    <main id="top">
      {page === 'home' && <section className="relative isolate flex min-h-[620px] items-center overflow-hidden bg-[#25160e] sm:min-h-[690px] lg:min-h-[700px]" aria-labelledby="hero-title">
        <img src="/cafe-hero.png" alt="Iced latte and hot coffee on a sunlit café table" className="absolute inset-0 -z-20 h-full w-full object-cover object-[65%_center]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#21140d]/95 via-[#21140d]/78 to-[#21140d]/15 sm:from-[#21140d]/88 sm:via-[#21140d]/64 sm:to-transparent" />
        <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 lg:px-12"><div className="max-w-[670px] text-[#fff9ec]">
          <p className="mb-6 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-[#f0ca83] sm:text-xs"><span className="h-px w-9 bg-[#f0ca83]" /> Welcome to Streetlight Café</p>
          <h1 id="hero-title" className="font-display text-[clamp(3.4rem,7vw,6.8rem)] leading-[0.99] tracking-[-0.035em]">Your cup of<br /><em className="font-normal text-[#eac78d]">comfort</em> awaits.</h1>
          <p className="mt-7 max-w-[440px] text-base leading-8 text-[#f7e9d6] sm:text-lg">A cozy stop for coffee, conversation, and a slower moment in Pagsanjan.</p>
          <div className="mt-9 flex flex-wrap gap-3"><a href="/menu/" className="inline-flex items-center gap-3 rounded-full bg-[#e8bd78] px-7 py-4 text-xs font-bold uppercase tracking-[0.12em] text-[#3d2516] transition hover:bg-[#f3d29f]">Browse drinks <ArrowRight size={17} /></a><a href="/visit/" className="inline-flex items-center gap-3 rounded-full border border-white/55 px-7 py-4 text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:bg-white/10">Plan a visit <MapPin size={16} /></a></div>
        </div></div>
        <a href="#story" aria-label="Scroll to our story" className="absolute bottom-7 right-6 hidden items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-white/85 sm:flex lg:right-12">Scroll to explore <ArrowDown size={16} /></a>
      </section>}

      {(page === 'home' || page === 'story') && <section id="story" className="scroll-mt-24 px-6 py-20 sm:px-10 sm:py-28 lg:px-12" aria-labelledby="story-title"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-24">
        <div><p className="eyebrow"><span className="eyebrow-line" /> A corner to call your own</p><StoryHeading id="story-title" className="mt-5 max-w-3xl font-display text-[clamp(2.8rem,5vw,5.3rem)] leading-[1.08] tracking-[-0.035em]">Good coffee tastes even better when you <em className="text-[#a16a36]">slow down.</em></StoryHeading></div>
        <div className="border-l-2 border-[#b7854a] pl-7 sm:pl-9"><p className="text-lg leading-8 text-[#6a4a34]">At Streetlight Café, every visit is a chance to pause, settle in, and find a drink that feels just right.</p><p className="mt-5 text-sm leading-7 text-[#826b57]">Explore coffeehouse favorites, creamy treats, and refreshing sips below. The menu shown here is a sample while the café’s official offerings are being confirmed.</p><a href="/visit/" className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#8b562d] underline decoration-[#b98955] underline-offset-8">Find us in Pagsanjan <ArrowRight size={16} /></a></div>
      </div></section>}

      {page === 'menu' && <section id="menu" className="scroll-mt-20 bg-[#eae0ca] px-6 py-20 sm:px-10 sm:py-28 lg:px-12" aria-labelledby="menu-title"><div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"><div><p className="eyebrow"><span className="eyebrow-line" /> The drinks</p><MenuHeading id="menu-title" className="mt-5 font-display text-[clamp(3rem,5.5vw,5.8rem)] leading-[1] tracking-[-0.04em]">Find your next <em className="text-[#9d6736]">favorite.</em></MenuHeading><p className="mt-5 max-w-xl text-base leading-7 text-[#735842]">From the first morning sip to an afternoon pick-me-up, there’s a little something for every mood.</p></div><div className="w-fit rounded-full border border-[#8f6745]/35 px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#75553b]">Sample menu · Availability may vary</div></div>
        <div className="filter-scroll mt-11 flex gap-2 overflow-x-auto border-b border-[#8a684b]/25 pb-4" aria-label="Drink categories">{categories.map(category => <a key={category} href={categoryPaths[category]} aria-current={filter === category ? 'page' : undefined} className={`shrink-0 rounded-full px-5 py-3 text-xs font-bold uppercase tracking-[0.11em] transition sm:px-6 ${filter === category ? 'bg-[#4b3020] text-[#fff7e7]' : 'border border-[#7b573e]/35 text-[#5f432d] hover:bg-[#f5ebd7]'}`}>{category}</a>)}</div>
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{visibleDrinks.map((drink, index) => <article key={drink.name} className="group flex min-h-[245px] flex-col justify-between border border-[#8b684a]/20 bg-[#f7f0e2] p-6 transition hover:-translate-y-1 hover:border-[#a7703e]/60 hover:shadow-[0_18px_40px_-24px_rgba(67,38,21,.4)] sm:p-7"><div><div className="mb-7 flex items-start justify-between gap-3"><span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#a06c3e]">{String(index + 1).padStart(2, '0')} / {drink.category}</span><Coffee size={19} strokeWidth={1.5} className="shrink-0 text-[#9d714b]" /></div><h3 className="font-display text-[1.65rem] leading-tight tracking-[-0.02em]">{drink.name}</h3><p className="mt-3 text-sm leading-6 text-[#806b59]">{drink.note}</p></div><div className="mt-7 flex gap-2">{drink.hot && <span className="drink-tag">Hot</span>}{drink.iced && <span className="drink-tag">Iced</span>}</div></article>)}</div>
        <p className="mt-7 text-center text-sm text-[#765b46]">Looking for current availability or prices? <a href="tel:+639627542148" className="font-semibold underline underline-offset-4">Call the café</a> before visiting.</p>
      </div></section>}

      {page === 'home' && <section className="bg-[#eae0ca] px-6 py-20 sm:px-10 sm:py-24 lg:px-12" aria-labelledby="menu-preview-title"><div className="mx-auto max-w-7xl"><p className="eyebrow"><span className="eyebrow-line" /> The drinks</p><div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><h2 id="menu-preview-title" className="font-display text-[clamp(2.8rem,5vw,5rem)] leading-tight">A sip for every <em className="text-[#9d6736]">mood.</em></h2><a href="/menu/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#8b562d] underline underline-offset-8">See the full sample menu <ArrowRight size={16} /></a></div><div className="mt-10 grid gap-4 md:grid-cols-3">{(['Coffee', 'Non-coffee', 'Tea & refreshers'] as const).map((category, index) => <a href={categoryPaths[category]} key={category} className="group flex min-h-44 flex-col justify-between bg-[#f7f0e2] p-7 transition hover:-translate-y-1 hover:shadow-lg"><Coffee size={24} className="text-[#a16a36]" /><div className="flex items-end justify-between gap-4"><div><span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#a16a36]">0{index + 1} / Explore</span><h3 className="mt-2 font-display text-3xl">{category}</h3></div><ArrowRight size={20} className="text-[#a16a36] transition group-hover:translate-x-1" /></div></a>)}</div><p className="mt-5 text-sm text-[#765b46]">These are sample categories; contact the café for current offerings.</p></div></section>}

      {(page === 'home' || page === 'story') && <section className="bg-[#3f281b] text-[#f8eedb]" aria-labelledby="pause-title"><div className="mx-auto grid max-w-[1600px] lg:grid-cols-2"><div className="flex flex-col justify-center px-6 py-20 sm:px-10 sm:py-24 lg:px-20"><p className="eyebrow !text-[#e0b77c]"><span className="eyebrow-line !bg-[#d6aa70]" /> Something for every kind of day</p><h2 id="pause-title" className="mt-6 max-w-lg font-display text-[clamp(2.8rem,5vw,5.4rem)] leading-[1.08] tracking-[-0.035em]">Your pause, <em className="text-[#e3bf88]">poured fresh.</em></h2><p className="mt-6 max-w-md text-base leading-8 text-[#e3d2bd]">In the mood for something bold, creamy, or bright? There’s always a good reason to take a little break.</p><a href="/menu/" className="mt-8 inline-flex w-fit items-center gap-3 border-b border-[#e4bd80] pb-2 text-xs font-bold uppercase tracking-[0.16em] text-[#eac68d]">Explore the drinks <ArrowRight size={16} /></a></div><div className="min-h-[390px] lg:min-h-[600px]"><img src="/cafe-drinks.png" alt="Iced matcha, chocolate drink, and citrus tea on a café table" loading="lazy" className="h-full max-h-[650px] w-full object-cover object-center" /></div></div></section>}

      {(page === 'home' || page === 'visit') && <section id="visit" className="scroll-mt-20 px-6 py-20 sm:px-10 sm:py-28 lg:px-12" aria-labelledby="visit-title"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-24"><div><p className="eyebrow"><span className="eyebrow-line" /> Come by and say hello</p><VisitHeading id="visit-title" className="mt-5 font-display text-[clamp(3rem,5.5vw,5.6rem)] leading-[1.03] tracking-[-0.04em]">Find us under <em className="text-[#a16a36]">the streetlight.</em></VisitHeading><p className="mt-6 max-w-md text-base leading-8 text-[#725741]">We’d love to make your next coffee break a good one. Reach out for the latest menu and opening hours.</p></div>
        <div className="border border-[#9d754d]/25 bg-[#f0e5d0] p-7 sm:p-10 lg:p-12"><div className="flex gap-5 border-b border-[#9d754d]/25 pb-7"><MapPin className="mt-1 shrink-0 text-[#9b693b]" size={22} /><div><h3 className="text-xs font-bold uppercase tracking-[0.18em] text-[#9b693b]">Visit us</h3><p className="mt-2 font-display text-2xl leading-snug">Sitio Uno, Brgy. Biñan<br />Pagsanjan, Philippines 4008</p><a href={mapUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] underline underline-offset-4">Get directions <ArrowRight size={15} /></a></div></div>
        <div className="flex gap-5 border-b border-[#9d754d]/25 py-7"><Phone className="mt-1 shrink-0 text-[#9b693b]" size={22} /><div><h3 className="text-xs font-bold uppercase tracking-[0.18em] text-[#9b693b]">Give us a call</h3><a href="tel:+639627542148" className="mt-2 block font-display text-2xl hover:underline">0962 754 2148</a></div></div>
        <div className="flex gap-5 pt-7"><Coffee className="mt-1 shrink-0 text-[#9b693b]" size={22} /><div><h3 className="text-xs font-bold uppercase tracking-[0.18em] text-[#9b693b]">Connect with us</h3><p className="mt-2 font-display text-2xl">Streetlight Café</p><a href={facebookUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] underline underline-offset-4">Search on Facebook <ArrowRight size={15} /></a></div></div></div>
      </div></section>}
    </main>
    <footer className="bg-[#2f1d14] px-6 py-10 text-[#e9d8bd] sm:px-10 lg:px-12"><div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"><div><p className="font-display text-2xl">Streetlight Café</p><p className="mt-2 text-sm text-[#cbb89e]">Coffee, comfort, and a little light in Pagsanjan.</p></div><div className="flex flex-wrap gap-x-7 gap-y-3 text-xs font-semibold uppercase tracking-[0.13em]"><a href="/" className="hover:text-white">Home</a><a href="/story/" className="hover:text-white">Our story</a><a href="/menu/" className="hover:text-white">Menu</a><a href="/visit/" className="hover:text-white">Contact</a></div></div><div className="mx-auto mt-9 flex max-w-7xl flex-col gap-2 border-t border-white/15 pt-5 text-xs text-[#ac987f] sm:flex-row sm:justify-between"><span>© {new Date().getFullYear()} Streetlight Café</span><span>Sample drinks shown; contact the café for current offerings.</span></div></footer>
  </div>
}

export default App
