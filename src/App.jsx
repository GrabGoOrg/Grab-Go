import { useEffect, useMemo, useState } from 'react';

const A = { coffee: '#C58B52', refresh: '#3FB7B3', mint: '#8ED6C5', snack: '#E88B55' };
const nav = ['/', '/menu', '/promos', '/about', '/gallery', '/reviews', '/contact'];
const menuCategories = ['/coffee', '/refreshments', '/snacks'];
const label = (path) => path === '/' ? 'Home' : path.slice(1).replace('-', ' ');

const products = [
  p('espresso', 'Espresso', 'Coffee', 'Hot Coffee', 'A bold concentrated coffee shot with rich crema.', 80, 4.8, true, A.coffee, 1),
  p('americano', 'Americano', 'Coffee', 'Hot Coffee', 'Smooth espresso stretched with hot water.', 90, 4.7, false, A.coffee, 2),
  p('cafe-latte', 'Cafe Latte', 'Coffee', 'Hot Coffee', 'Espresso softened with steamed milk and silky foam.', 110, 4.9, true, A.coffee, 3),
  p('cappuccino', 'Cappuccino', 'Coffee', 'Hot Coffee', 'Velvety milk, espresso, and airy foam.', 110, 4.8, false, A.coffee, 4),
  p('spanish-latte', 'Spanish Latte', 'Coffee', 'Hot Coffee', 'Creamy espresso with milk and a lightly sweet finish.', 120, 5, true, A.coffee, 5),
  p('caramel-macchiato', 'Caramel Macchiato', 'Coffee', 'Hot Coffee', 'Milk, espresso, vanilla, and caramel.', 125, 4.9, true, A.coffee, 6),
  p('iced-americano', 'Iced Americano', 'Coffee', 'Iced Coffee', 'Espresso over chilled water and ice.', 100, 4.8, false, A.coffee, 7),
  p('iced-latte', 'Iced Latte', 'Coffee', 'Iced Coffee', 'Cool milk and espresso poured over ice.', 120, 4.8, false, A.coffee, 8),
  p('iced-spanish-latte', 'Iced Spanish Latte', 'Coffee', 'Iced Coffee', 'Creamy espresso, milk, and sweetness served over ice.', 130, 4.9, true, A.coffee, 9),
  p('iced-caramel-macchiato', 'Iced Caramel Macchiato', 'Coffee', 'Iced Coffee', 'Cold milk, espresso, vanilla, and caramel.', 135, 4.9, true, A.coffee, 10),
  p('classic-lemonade', 'Classic Lemonade', 'Refreshments', 'Lemonades', 'Fresh lemon, chilled water, and light sweetness.', 90, 4.7, false, A.refresh, 11),
  p('strawberry-lemonade', 'Strawberry Lemonade', 'Refreshments', 'Lemonades', 'Tangy lemonade with strawberry notes.', 110, 4.9, true, A.refresh, 12),
  p('blue-lemonade', 'Blue Lemonade', 'Refreshments', 'Lemonades', 'A vibrant citrus cooler with a blue twist.', 100, 4.8, false, A.refresh, 13),
  p('passion-fruit-soda', 'Passion Fruit Soda', 'Refreshments', 'Fruit Drinks', 'Sparkling soda with tropical passion fruit.', 110, 4.8, true, A.refresh, 14),
  p('peach-iced-tea', 'Peach Iced Tea', 'Refreshments', 'Fruit Drinks', 'Cold tea with soft peach sweetness.', 100, 4.8, false, A.refresh, 15),
  p('fresh-fruit-tea', 'Fresh Fruit Tea', 'Refreshments', 'Fruit Drinks', 'Tea, fruit, and citrus in a colorful refresher.', 120, 4.9, true, A.refresh, 16),
  p('mint-cucumber-cooler', 'Mint Cucumber Cooler', 'Refreshments', 'Signature Cold Drinks', 'Cucumber, mint, and citrus served cold.', 115, 4.8, false, A.mint, 17),
  p('berry-sparkler', 'Berry Sparkler', 'Refreshments', 'Signature Cold Drinks', 'Mixed berry fizz with a bright chilled finish.', 125, 4.9, true, A.mint, 18),
  p('cookies', 'Chocolate Chip Cookies', 'Snacks', 'Sweets', 'Golden cookies with melty chocolate chips.', 60, 4.8, true, A.snack, 19, false),
  p('brownie', 'Brownie', 'Snacks', 'Sweets', 'Fudgy, chocolate-rich, and satisfying.', 75, 4.9, true, A.snack, 20, false),
  p('croissant', 'Croissant', 'Snacks', 'Pastries', 'Buttery pastry with flaky layers.', 85, 4.8, false, A.snack, 21, false),
  p('cinnamon-roll', 'Cinnamon Roll', 'Snacks', 'Pastries', 'Soft rolled bread with cinnamon sugar glaze.', 90, 4.9, false, A.snack, 22, false),
  p('cheesecake-slice', 'Cheesecake Slice', 'Snacks', 'Cakes', 'Creamy cheesecake with a buttery crust.', 120, 5, true, A.snack, 23, false),
  p('club-sandwich', 'Club Sandwich', 'Snacks', 'Savory', 'Stacked sandwich with crisp vegetables and house sauce.', 140, 4.8, true, A.snack, 24, false),
];

const promos = [
  promo('coffee-snack-combo', 'Coffee + Snack Combo', 'Pair a signature coffee with a fresh snack.', 159, 180, A.coffee, 25),
  promo('refreshment-snack-combo', 'Refreshment + Snack Combo', 'A chilled refresher plus your choice of snack.', 159, 180, A.refresh, 26),
  promo('any-two-drinks', 'Any 2 Drinks', 'Share two drinks or keep both for yourself.', 210, 240, A.snack, 27),
];
const catalog = [...products, ...promos];
const gallery = [
  ...catalog.slice(0, 10).map((x) => ({ title: x.name, category: x.category === 'Promo' ? 'Shop' : x.category, image: x.image })),
  { title: 'Cafe Counter', category: 'Shop', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=80' },
  { title: 'Coffee Bar', category: 'Shop', image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=900&q=80' },
  { title: 'Dessert Display', category: 'Snacks', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80' },
];
const defaultReviews = [
  { name: 'Maria S.', rating: 5, comment: 'Love the iced drinks. The coffee is also really good and the service is fast.', date: 'Aug 22, 2026' },
  { name: 'John R.', rating: 5, comment: 'Perfect place to grab a drink and a quick snack.', date: 'Aug 19, 2026' },
  { name: 'Elaine D.', rating: 5, comment: 'The Spanish Latte and brownies are my favorite combo.', date: 'Aug 14, 2026' },
];

function p(id, name, category, subcategory, description, price, rating, isBestSeller, accent, imageId, customization = true) {
  const photos = [
    '/beans.jpg',
    'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1579888071069-c107a6f79d82?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1517959105821-eaf2591984ca?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=900&q=80',
  ];
  return { id, name, category, subcategory, description, price, image: photos[imageId - 1], rating, isBestSeller, isFavorite: false, accent, customization };
}
function promo(id, name, description, price, originalPrice, accent, imageId) {
  return { ...p(id, name, 'Promo', 'Combos', description, price, 4.9, true, accent, imageId, false), originalPrice };
}
const get = (k, f) => { try { return JSON.parse(localStorage.getItem(k)) ?? f; } catch { return f; } };
const cash = (n) => `\u20B1${Number(n).toLocaleString('en-PH')}`;
const rating = (n) => `${'\u2605'.repeat(Math.round(n))} ${n}`;
const pathNow = () => window.location.pathname === '/' ? '/' : window.location.pathname.replace(/\/$/, '');

export default function App() {
  const [route, setRoute] = useState(pathNow);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(() => get('grabgo-cart', []));
  const [favorites, setFavorites] = useState(() => get('grabgo-favorites', []));
  const [reviews, setReviews] = useState(() => get('grabgo-reviews', defaultReviews));
  const [orders, setOrders] = useState(() => get('grabgo-orders', []));
  const [lastOrder, setLastOrder] = useState(() => get('grabgo-last-order', null));
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const pop = () => setRoute(pathNow());
    window.addEventListener('popstate', pop);
    const timer = setTimeout(() => setLoading(false), 400);
    return () => { window.removeEventListener('popstate', pop); clearTimeout(timer); };
  }, []);
  useEffect(() => localStorage.setItem('grabgo-cart', JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem('grabgo-favorites', JSON.stringify(favorites)), [favorites]);
  useEffect(() => localStorage.setItem('grabgo-reviews', JSON.stringify(reviews)), [reviews]);
  useEffect(() => localStorage.setItem('grabgo-orders', JSON.stringify(orders)), [orders]);
  useEffect(() => localStorage.setItem('grabgo-last-order', JSON.stringify(lastOrder)), [lastOrder]);

  const toast = (message) => {
    const id = crypto.randomUUID();
    setToasts((x) => [...x, { id, message }]);
    setTimeout(() => setToasts((x) => x.filter((t) => t.id !== id)), 2400);
  };
  const go = (path) => {
    window.history.pushState({}, '', path);
    setRoute(path); setMenuOpen(false); setSearchOpen(false); setCartOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const add = (product, opts = {}) => {
    const price = product.price + (opts.size === 'Large' ? 20 : 0);
    const item = { ...product, price, qty: opts.qty || 1, size: opts.size, ice: opts.ice, sugar: opts.sugar, cartKey: `${product.id}-${price}-${opts.size || ''}-${opts.ice || ''}-${opts.sugar || ''}` };
    setCart((items) => items.some((x) => x.cartKey === item.cartKey) ? items.map((x) => x.cartKey === item.cartKey ? { ...x, qty: x.qty + item.qty } : x) : [...items, item]);
    toast(`\u2713 ${product.name} added to cart`);
  };
  const fav = (id) => setFavorites((x) => {
    const saved = x.includes(id);
    toast(saved ? '\u2713 Removed from favorites' : '\u2665 Added to favorites');
    return saved ? x.filter((v) => v !== id) : [...x, id];
  });
  const placeOrder = (order) => {
    setOrders((x) => [order, ...x]); setLastOrder(order); setCart([]);
    toast('\u2713 Order placed successfully'); go('/order-confirmation');
  };
  const props = { go, add, fav, cart, setCart, favorites, reviews, setReviews, loading, toast, placeOrder, lastOrder };

  return (
    <div className="app">
      <Navbar route={route} go={go} menuOpen={menuOpen} setMenuOpen={setMenuOpen} openSearch={() => setSearchOpen(true)} openCart={() => setCartOpen(true)} cartCount={cart.reduce((s, x) => s + x.qty, 0)} favoriteCount={favorites.length} />
      <main><Routes route={route} {...props} /></main>
      <Footer go={go} />
      {searchOpen && <SearchOverlay close={() => setSearchOpen(false)} go={go} add={add} />}
      {cartOpen && <CartDrawer close={() => setCartOpen(false)} {...props} />}
      <div className="toasts">{toasts.map((t) => <div key={t.id}>{t.message}</div>)}</div>
    </div>
  );
}

function Routes({ route, ...props }) {
  const product = route.match(/^\/product\/(.+)$/)?.[1];
  if (product) return <ProductDetails id={product} {...props} />;
  if (route === '/') return <Home {...props} />;
  if (route === '/menu') return <Menu {...props} />;
  if (route === '/coffee') return <Category category="Coffee" title="Coffee" text="Bold, smooth, and made for your everyday moments." tone="coffee-page" {...props} />;
  if (route === '/refreshments') return <Category category="Refreshments" title="Refreshments" text="Cool, colorful, and refreshing drinks for every mood." tone="refresh-page" {...props} />;
  if (route === '/snacks') return <Category category="Snacks" title="Snacks & Bites" text="The perfect little bites to pair with your favorite drink." tone="snack-page" {...props} />;
  if (route === '/promos') return <Promos {...props} />;
  if (route === '/favorites') return <Favorites {...props} />;
  if (route === '/cart') return <CartPage {...props} />;
  if (route === '/checkout') return <Checkout {...props} />;
  if (route === '/order-confirmation') return <Confirmation {...props} />;
  if (route === '/about') return <About />;
  if (route === '/gallery') return <Gallery />;
  if (route === '/reviews') return <Reviews {...props} />;
  if (route === '/contact') return <Contact toast={props.toast} />;
  return <Empty title="Product not found" text="That page is not available." action="Back To Menu" onAction={() => props.go('/menu')} />;
}

function Navbar({ route, go, menuOpen, setMenuOpen, openSearch, openCart, cartCount, favoriteCount }) {
  return <header className="navbar"><button className="brand" onClick={() => go('/')}><img src="/grab_go.png" alt="Grab&Go logo" /><strong>Grab&Go<small>Coffee / Refreshments / Snacks</small></strong></button><button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>Menu</button><nav className={menuOpen ? 'open' : ''}>{nav.map((x) => x === '/menu' ? <div className="menu-link" key={x}><button className={route === x || menuCategories.includes(route) ? 'active' : ''} onClick={() => go('/menu')}>Menu</button><div className="menu-dropdown">{menuCategories.map((path) => <button key={path} onClick={() => go(path)}>{label(path)}</button>)}</div></div> : <button className={route === x ? 'active' : ''} key={x} onClick={() => go(x)}>{label(x)}</button>)}</nav><div className="nav-actions"><button onClick={openSearch}>Search</button><button onClick={() => go('/favorites')}>Heart {favoriteCount}</button><button onClick={openCart}>Cart {cartCount}</button><button className="primary small" onClick={() => go('/menu')}>Order Now</button></div></header>;
}

function Home(props) {
  return <><Hero go={props.go} /><Section title="What Are You Craving?" text="Pick your favorite and let us handle the rest."><div className="category-grid">{[['Coffee', '/coffee', A.coffee, 'Bold, smooth, and comforting.'], ['Refreshments', '/refreshments', A.refresh, 'Cool, colorful, and refreshing.'], ['Snacks', '/snacks', A.snack, 'Small bites, big satisfaction.']].map(([t, pth, c, d]) => <article className="feature" style={{ '--accent': c }} key={t}><h3>{t}</h3><p>{d}</p><button className="secondary" onClick={() => props.go(pth)}>Explore {t}</button></article>)}</div></Section><Section title="Customer Favorites" text="Six crowd favorites customers keep coming back for.">{props.loading ? <Skeleton /> : <Grid items={products.filter((x) => x.isBestSeller).slice(0, 6)} {...props} />}</Section><Highlight title="Coffee Highlight" category="Coffee" go={props.go} /><Highlight title="Refreshments Highlight" category="Refreshments" go={props.go} /><Highlight title="Snacks Highlight" category="Snacks" go={props.go} /><Promos compact {...props} /><Why /><Reviews compact {...props} /><Gallery compact /><Business go={props.go} /><section className="final-cta"><h2>What are you craving today?</h2><p>Grab your favorite drink, add a snack, and enjoy.</p><button className="primary" onClick={() => props.go('/menu')}>Order Now</button><button className="secondary" onClick={() => props.go('/menu')}>View Menu</button></section></>;
}

function Hero({ go }) {
  return <section className="hero"><div><p className="eyebrow">Welcome to Grab&Go</p><h1>Good Drinks.<br />Great Moments.</h1><strong>Coffee / Refreshments / Snacks</strong><p>Your favorite coffee, refreshing drinks, and delicious snacks, ready whenever you are.</p><button className="primary" onClick={() => go('/menu')}>Order Now</button><button className="secondary" onClick={() => go('/menu')}>Explore Menu</button></div><div className="hero-media"><img src={products[4].image} alt="Coffee" /><img src={products[13].image} alt="Cold beverage" /><img src={products[20].image} alt="Snack" /></div></section>;
}

function Menu(props) {
  const [q, setQ] = useState(''); const [cat, setCat] = useState('All'); const [sort, setSort] = useState('Recommended');
  const items = useMemo(() => filter(catalog, q, cat, sort), [q, cat, sort]);
  return <Page title="Our Menu" text="Everything you need for your next grab-and-go moment."><Filter q={q} setQ={setQ} cat={cat} setCat={setCat} sort={sort} setSort={setSort} />{props.loading ? <Skeleton count={8} /> : items.length ? <Grid items={items} {...props} /> : <Empty title="No products found" text="Try a different search or filter." action="View Menu" onAction={() => { setQ(''); setCat('All'); }} />}</Page>;
}

function Category({ category, title, text, tone, ...props }) {
  const groups = products.filter((x) => x.category === category).reduce((m, x) => ({ ...m, [x.subcategory]: [...(m[x.subcategory] || []), x] }), {});
  return <Page className={tone} title={title} text={text}>{Object.entries(groups).map(([name, items]) => <section className="menu-group" key={name}><h2>{name}</h2>{props.loading ? <Skeleton count={4} /> : <Grid items={items} {...props} />}</section>)}</Page>;
}

function Promos({ compact, ...props }) {
  return <Page title={compact ? 'Special Offers' : 'Good Drinks. Great Deals.'} text="Bundles for fast cravings, friendly prices, and simple cash checkout."><Grid items={promos} {...props} /></Page>;
}

function Favorites(props) {
  const items = catalog.filter((x) => props.favorites.includes(x.id));
  return <Page title="Your Favorites" text="Your saved coffee, refreshments, snacks, and promos.">{items.length ? <Grid items={items} {...props} /> : <Empty title="You haven't saved any favorites yet." text="Save menu items for faster ordering next time." action="Explore Menu" onAction={() => props.go('/menu')} />}</Page>;
}

function Grid({ items, favorites, fav, add, go }) {
  return <div className="product-grid">{items.map((x) => <article className="product-card" style={{ '--accent': x.accent }} key={x.id}><div className="photo"><img src={x.image} alt={x.name} /><button onClick={() => fav(x.id)}>{favorites.includes(x.id) ? '\u2665' : '\u2661'}</button></div><div className="body"><span>{x.subcategory}</span><h3>{x.name}</h3><p>{x.description}</p><div className="meta"><small>{rating(x.rating)}</small><strong>{cash(x.price)}</strong></div>{x.originalPrice && <p className="old">Regular {cash(x.originalPrice)}</p>}<button className="primary" onClick={() => add(x)}>Add To Cart</button><button className="secondary" onClick={() => go(`/product/${x.id}`)}>Details</button></div></article>)}</div>;
}

function ProductDetails({ id, add, go }) {
  const item = catalog.find((x) => x.id === id); const [qty, setQty] = useState(1); const [size, setSize] = useState('Regular'); const [ice, setIce] = useState('Regular Ice'); const [sugar, setSugar] = useState('100%');
  if (!item) return <Empty title="Product not found" text="The item you are looking for does not exist." action="Back To Menu" onAction={() => go('/menu')} />;
  const opts = { qty, size: item.customization ? size : undefined, ice: item.customization ? ice : undefined, sugar: item.customization ? sugar : undefined };
  return <section className="product-detail"><img src={item.image} alt={item.name} /><div><span className="badge">{item.category}</span><h1>{item.name}</h1><p>{item.description}</p><h2>{cash(item.price + (size === 'Large' && item.customization ? 20 : 0))}</h2><p>{rating(item.rating)}</p><Qty qty={qty} setQty={setQty} />{item.customization && <div className="custom"><Select label="Size" value={size} setValue={setSize} opts={['Regular', 'Large']} /><Select label="Ice" value={ice} setValue={setIce} opts={['No Ice', 'Less Ice', 'Regular Ice', 'Extra Ice']} /><Select label="Sugar" value={sugar} setValue={setSugar} opts={['0%', '25%', '50%', '75%', '100%']} /></div>}<button className="primary" onClick={() => add(item, opts)}>Add To Cart</button><button className="secondary" onClick={() => { add(item, opts); go('/checkout'); }}>Buy Now</button></div></section>;
}

function CartPage(props) { return <Page title="Shopping Cart" text="Review quantities, totals, and customizations before checkout."><CartContent full {...props} /></Page>; }
function CartDrawer({ close, ...props }) { return <aside className="drawer"><button className="close" onClick={close}>Close</button><h2>Your Cart</h2><CartContent {...props} /></aside>; }
function CartContent({ cart, setCart, go, toast, full }) {
  const subtotal = cart.reduce((s, x) => s + x.price * x.qty, 0), discount = subtotal >= 500 ? 50 : 0;
  const update = (key, qty) => { setCart((xs) => xs.map((x) => x.cartKey === key ? { ...x, qty } : x).filter((x) => x.qty > 0)); if (qty <= 0) toast('\u2713 Removed from cart'); };
  if (!cart.length) return <Empty title="Your cart is empty" text="Add coffee, refreshments, snacks, or promos to begin." action="Browse Menu" onAction={() => go('/menu')} />;
  return <><div className={full ? 'cart-list full' : 'cart-list'}>{cart.map((x) => <article className="cart-item" key={x.cartKey}><img src={x.image} alt={x.name} /><div><strong>{x.name}</strong><small>{[x.size, x.ice, x.sugar && `${x.sugar} sugar`].filter(Boolean).join(' / ') || 'Standard'}</small><span>{cash(x.price)} each</span></div><Qty qty={x.qty} setQty={(q) => update(x.cartKey, q)} /><strong>{cash(x.price * x.qty)}</strong><button onClick={() => update(x.cartKey, 0)}>Remove</button></article>)}</div><Summary subtotal={subtotal} discount={discount} delivery={0} /><button className="primary wide" onClick={() => go('/checkout')}>Proceed To Checkout</button>{!full && <button className="secondary wide" onClick={() => go('/cart')}>View Cart</button>}<button className="secondary wide" onClick={() => { setCart([]); toast('\u2713 Cart cleared'); }}>Clear Cart</button></>;
}

function Checkout({ cart, placeOrder, go }) {
  const [type, setType] = useState('Pickup'); const [f, setF] = useState({ name: '', mobile: '', email: '', time: '', address: '', landmark: '' }); const [e, setE] = useState({});
  const subtotal = cart.reduce((s, x) => s + x.price * x.qty, 0), discount = subtotal >= 500 ? 50 : 0, delivery = type === 'Delivery' ? 49 : 0;
  if (!cart.length) return <Empty title="Your cart is empty" text="Checkout starts after you add an item." action="Browse Menu" onAction={() => go('/menu')} />;
  const submit = (ev) => { ev.preventDefault(); const er = {}; if (!f.name) er.name = 'Name is required.'; if (!f.mobile) er.mobile = 'Mobile number is required.'; if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) er.email = 'Valid email is required.'; if (type === 'Pickup' && !f.time) er.time = 'Pickup time is required.'; if (type === 'Delivery' && !f.address) er.address = 'Address is required.'; setE(er); if (Object.keys(er).length) return; const d = new Date(); placeOrder({ number: `GO-${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}-${String(Math.floor(Math.random() * 999) + 1).padStart(3, '0')}`, customer: f.name, date: d.toLocaleString(), type, payment: 'Cash', items: cart, subtotal, discount, delivery, total: subtotal - discount + delivery, eta: type === 'Delivery' ? '35-45 minutes' : '15-20 minutes' }); };
  return <Page title="Checkout" text="Cash only. Pay when you receive your order."><form className="checkout" onSubmit={submit}><fieldset><legend>Customer Information</legend><Field label="Full Name" err={e.name} value={f.name} onChange={(v) => setF({ ...f, name: v })} /><Field label="Mobile Number" err={e.mobile} value={f.mobile} onChange={(v) => setF({ ...f, mobile: v })} /><Field label="Email" err={e.email} value={f.email} onChange={(v) => setF({ ...f, email: v })} /></fieldset><fieldset><legend>Order Type</legend><div className="tabs"><button type="button" className={type === 'Pickup' ? 'active' : ''} onClick={() => setType('Pickup')}>Pickup</button><button type="button" className={type === 'Delivery' ? 'active' : ''} onClick={() => setType('Delivery')}>Delivery</button></div>{type === 'Pickup' ? <Field label="Preferred Pickup Time" err={e.time} value={f.time} onChange={(v) => setF({ ...f, time: v })} /> : <><Field label="Complete Address" err={e.address} value={f.address} onChange={(v) => setF({ ...f, address: v })} /><Field label="Landmark" value={f.landmark} onChange={(v) => setF({ ...f, landmark: v })} /></>}</fieldset><fieldset><legend>Payment</legend><label className="cash"><input type="radio" checked readOnly /> Cash <span>{type === 'Pickup' ? 'Pay upon pickup.' : 'Pay the delivery rider upon receiving your order.'}</span></label></fieldset><Summary subtotal={subtotal} discount={discount} delivery={delivery} /><button className="primary wide">Place Order</button></form></Page>;
}

function Confirmation({ lastOrder, go }) {
  if (!lastOrder) return <Empty title="No recent order" text="Place an order to see confirmation details here." action="Order Now" onAction={() => go('/menu')} />;
  return <Page title="Order Placed Successfully!" text={`Order #${lastOrder.number}`}><section className="confirmation"><p><strong>{lastOrder.customer}</strong> / {lastOrder.date}</p><p>{lastOrder.type} / Payment Method: Cash / Estimated preparation: {lastOrder.eta}</p>{lastOrder.items.map((x) => <p key={x.cartKey}>{x.qty} x {x.name} - {cash(x.price * x.qty)}</p>)}<Summary subtotal={lastOrder.subtotal} discount={lastOrder.discount} delivery={lastOrder.delivery} /><button className="primary" onClick={() => go('/menu')}>Continue Shopping</button><button className="secondary" onClick={() => go('/')}>Back To Home</button></section></Page>;
}

function Reviews({ reviews, setReviews, compact }) {
  const [open, setOpen] = useState(false); const [d, setD] = useState({ name: '', rating: '5', comment: '' });
  const submit = (e) => { e.preventDefault(); if (!d.name || !d.comment) return; setReviews([{ ...d, rating: Number(d.rating), date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }, ...reviews]); setOpen(false); setD({ name: '', rating: '5', comment: '' }); };
  return <Page title="What Our Customers Say" text={`Overall rating: ${rating(4.9)} / ${reviews.length} reviews`} compact={compact}><div className="review-grid">{reviews.map((r, i) => <article className="review" key={i}><span>{r.name[0]}</span><h3>{r.name}</h3><small>{rating(r.rating)}</small><p>{r.comment}</p><time>{r.date}</time></article>)}</div><button className="primary" onClick={() => setOpen(true)}>Write A Review</button>{open && <div className="modal-backdrop"><form className="modal" onSubmit={submit}><button type="button" className="close" onClick={() => setOpen(false)}>Close</button><h2>Write A Review</h2><Field label="Name" value={d.name} onChange={(v) => setD({ ...d, name: v })} /><Select label="Rating" value={d.rating} setValue={(v) => setD({ ...d, rating: v })} opts={['5', '4', '3', '2', '1']} /><label>Comment<textarea value={d.comment} onChange={(e) => setD({ ...d, comment: e.target.value })} /></label><button className="primary wide">Submit Review</button></form></div>}</Page>;
}

function Gallery({ compact }) {
  const [cat, setCat] = useState('All'); const [box, setBox] = useState(null); const imgs = cat === 'All' ? gallery : gallery.filter((x) => x.category === cat);
  return <Page title="A Taste of Grab&Go" text="Coffee, cold beverages, pastries, sandwiches, and cafe moments." compact={compact}><div className="tabs">{['All', 'Coffee', 'Refreshments', 'Snacks', 'Shop'].map((x) => <button className={cat === x ? 'active' : ''} key={x} onClick={() => setCat(x)}>{x}</button>)}</div><div className="gallery">{imgs.map((x) => <button key={x.title} onClick={() => setBox(gallery.indexOf(x))}><img src={x.image} alt={x.title} /><span>{x.title}</span></button>)}</div>{box !== null && <div className="modal-backdrop lightbox"><button className="close" onClick={() => setBox(null)}>Close</button><button onClick={() => setBox((box - 1 + gallery.length) % gallery.length)}>Previous</button><img src={gallery[box].image} alt={gallery[box].title} /><button onClick={() => setBox((box + 1) % gallery.length)}>Next</button></div>}</Page>;
}

function About() { return <Page title="About Grab&Go" text="Grab&Go is a modern cafe and refreshment destination offering quality coffee, refreshing beverages, and delicious snacks for customers who want something convenient, satisfying, and easy to enjoy on the go."><div className="feature-grid"><Feature title="Quality" text="Fresh ingredients and carefully prepared products." /><Feature title="Convenience" text="Quick and easy ordering." /><Feature title="Variety" text="Coffee, refreshments, and snacks for every craving." /></div><Why /></Page>; }
function Contact({ toast }) { const [sent, setSent] = useState(false); return <Page title="Get in Touch" text="Your City, Philippines / 09XX XXX XXXX / hello@grabandgo.example"><div className="contact-grid"><section className="map"><h2>Find Grab&Go</h2><p>Your City, Philippines</p><button className="primary">Get Directions</button></section><form className="contact-form" onSubmit={(e) => { e.preventDefault(); e.currentTarget.reset(); setSent(true); toast('\u2713 Message sent'); }}><input required placeholder="Full Name" /><input required type="email" placeholder="Email" /><input required placeholder="Subject" /><textarea required placeholder="Message" /><button className="primary wide">Send Message</button>{sent && <p className="success">Thank you! Your message has been sent.</p>}</form></div><Business /></Page>; }

function SearchOverlay({ close, go, add }) {
  const [q, setQ] = useState(''); const results = filter(catalog, q, 'All', 'Recommended');
  return <div className="modal-backdrop"><section className="modal"><button className="close" onClick={close}>Close</button><h2>Search Products</h2><input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products by name, category, or description" /><div className="search-results">{results.length ? results.map((x) => <article className="search-result" key={x.id}><img src={x.image} alt={x.name} /><strong>{x.name}<small>{x.category} / {cash(x.price)}</small></strong><button onClick={() => { add(x); close(); }}>Add</button><button onClick={() => go(`/product/${x.id}`)}>View</button></article>) : <Empty title="No products found" text="Try another product name or category." action="View Menu" onAction={() => go('/menu')} />}</div></section></div>;
}

function Filter({ q, setQ, cat, setCat, sort, setSort }) {
  return <div className="filter"><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search coffee, drinks, snacks..." /><div className="tabs">{['All', 'Coffee', 'Iced Coffee', 'Refreshments', 'Fruit Drinks', 'Snacks'].map((x) => <button className={cat === x ? 'active' : ''} key={x} onClick={() => setCat(x)}>{x}</button>)}</div><select value={sort} onChange={(e) => setSort(e.target.value)}>{['Recommended', 'Popular', 'Price: Low to High', 'Price: High to Low', 'Highest Rated', 'Alphabetical'].map((x) => <option key={x}>{x}</option>)}</select></div>;
}
function filter(items, q, cat, sort) {
  let xs = items.filter((x) => (!q || `${x.name} ${x.category} ${x.subcategory} ${x.description}`.toLowerCase().includes(q.toLowerCase())) && (cat === 'All' || x.category === cat || x.subcategory === cat));
  if (sort === 'Popular') xs = xs.filter((x) => x.isBestSeller);
  if (sort === 'Price: Low to High') xs = [...xs].sort((a, b) => a.price - b.price);
  if (sort === 'Price: High to Low') xs = [...xs].sort((a, b) => b.price - a.price);
  if (sort === 'Highest Rated') xs = [...xs].sort((a, b) => b.rating - a.rating);
  if (sort === 'Alphabetical') xs = [...xs].sort((a, b) => a.name.localeCompare(b.name));
  return xs;
}

function Section({ title, text, children }) { return <section className="section"><p className="eyebrow">Grab&Go</p><h2>{title}</h2><p>{text}</p>{children}</section>; }
function Page({ title, text, children, className = '', compact }) { return <section className={`page ${className} ${compact ? 'compact' : ''}`}><p className="eyebrow">Grab&Go</p><h1>{title}</h1><p>{text}</p>{children}</section>; }
function Feature({ title, text }) { return <article className="feature"><h3>{title}</h3><p>{text}</p></article>; }
function Why() { return <Section title="Fast. Fresh. For Every Craving." text="A simple ordering experience for drinks and snacks that fit your day."><div className="feature-grid"><Feature title="Fast" text="Quick ordering and convenient service." /><Feature title="Fresh" text="Quality drinks and delicious snacks." /><Feature title="For Every Craving" text="Coffee, refreshments, and snacks in one place." /></div></Section>; }
function Highlight({ title, category, go }) { const x = products.find((p) => p.category === category); return <section className="highlight"><img src={x.image} alt={category} /><div><p className="eyebrow">{category}</p><h2>{title}</h2><p>{x.description}</p><button className="secondary" onClick={() => go(`/${category.toLowerCase()}`)}>Explore {category}</button></div></section>; }
function Business({ go }) { return <section className="business"><h2>Grab&Go</h2><p>Coffee / Refreshments / Snacks</p><strong>{rating(4.9)}</strong><span>Open Today / 8:00 AM - 9:00 PM</span><span>Your City, Philippines / 09XX XXX XXXX</span>{go && <button className="primary" onClick={() => go('/menu')}>Order Now</button>}</section>; }
function Summary({ subtotal, discount, delivery }) { return <div className="summary"><span>Subtotal <strong>{cash(subtotal)}</strong></span><span>Discount <strong>-{cash(discount)}</strong></span><span>Delivery Fee <strong>{cash(delivery)}</strong></span><span className="total">Total <strong>{cash(subtotal - discount + delivery)}</strong></span></div>; }
function Qty({ qty, setQty }) { return <div className="qty"><button type="button" onClick={() => setQty(Math.max(1, qty - 1))}>-</button><strong>{qty}</strong><button type="button" onClick={() => setQty(qty + 1)}>+</button></div>; }
function Select({ label, value, setValue, opts }) { return <label>{label}<select value={value} onChange={(e) => setValue(e.target.value)}>{opts.map((x) => <option key={x}>{x}</option>)}</select></label>; }
function Field({ label, value, onChange, err }) { return <label>{label}<input value={value} onChange={(e) => onChange(e.target.value)} aria-invalid={Boolean(err)} />{err && <span className="error">{err}</span>}</label>; }
function Empty({ title, text, action, onAction }) { return <section className="empty"><h2>{title}</h2><p>{text}</p>{action && <button className="primary" onClick={onAction}>{action}</button>}</section>; }
function Skeleton({ count = 6 }) { return <div className="product-grid">{Array.from({ length: count }).map((_, i) => <div className="skeleton" key={i}><span /><p /><p /></div>)}</div>; }
function Footer({ go }) { return <footer><div><h2>Grab&Go</h2><p>Coffee / Refreshments / Snacks</p><p>Facebook / Instagram / TikTok</p></div><div><h3>Explore</h3>{['/', '/menu', ...menuCategories, '/promos'].map((x) => <button key={x} onClick={() => go(x)}>{label(x)}</button>)}</div><div><h3>Company</h3>{['/about', '/gallery', '/reviews', '/contact'].map((x) => <button key={x} onClick={() => go(x)}>{label(x)}</button>)}</div><div><h3>Contact</h3><p>09XX XXX XXXX<br />hello@grabandgo.example<br />Your City, Philippines</p><h3>Hours</h3><p>Monday-Sunday<br />8:00 AM - 9:00 PM</p></div></footer>; }
