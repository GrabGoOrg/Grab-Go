import { useEffect, useMemo, useState } from 'react';

const coffeeAccent = '#C58B52';
const refreshAccent = '#3FB7B3';
const snackAccent = '#E88B55';

const products = [
  { id: 'espresso', category: 'Coffee', name: 'Espresso', price: 80, rating: 4.8, accent: coffeeAccent, image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=900&q=80', description: 'A bold, concentrated coffee shot with a rich crema and clean finish.' },
  { id: 'americano', category: 'Coffee', name: 'Americano', price: 90, rating: 4.8, accent: coffeeAccent, image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=900&q=80', description: 'Smooth espresso stretched with hot water for a lighter, balanced cup.' },
  { id: 'latte', category: 'Coffee', name: 'Cafe Latte', price: 110, rating: 4.9, accent: coffeeAccent, image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=900&q=80', description: 'Espresso softened with steamed milk and a silky foam cap.' },
  { id: 'cappuccino', category: 'Coffee', name: 'Cappuccino', price: 110, rating: 4.9, accent: coffeeAccent, image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=900&q=80', description: 'A classic espresso drink with velvety milk and airy foam.' },
  { id: 'spanish-latte', category: 'Coffee', name: 'Spanish Latte', price: 120, rating: 5, accent: coffeeAccent, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80', description: 'Creamy espresso with milk and a lightly sweet Spanish-style finish.' },
  { id: 'caramel-macchiato', category: 'Coffee', name: 'Caramel Macchiato', price: 125, rating: 4.9, accent: coffeeAccent, image: 'https://images.unsplash.com/photo-1579888071069-c107a6f79d82?auto=format&fit=crop&w=900&q=80', description: 'Layered milk, espresso, vanilla, and caramel for a cozy sweet sip.' },
  { id: 'classic-lemonade', category: 'Refreshments', name: 'Classic Lemonade', price: 90, rating: 4.7, accent: refreshAccent, image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=900&q=80', description: 'Fresh lemon, chilled water, and just enough sweetness for a bright reset.' },
  { id: 'strawberry-lemonade', category: 'Refreshments', name: 'Strawberry Lemonade', price: 110, rating: 4.9, accent: refreshAccent, image: 'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&w=900&q=80', description: 'Tangy lemonade blended with strawberry notes and a cool berry finish.' },
  { id: 'blue-lemonade', category: 'Refreshments', name: 'Blue Lemonade', price: 100, rating: 4.8, accent: refreshAccent, image: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?auto=format&fit=crop&w=900&q=80', description: 'A vibrant citrus cooler with a crisp blue twist.' },
  { id: 'passion-soda', category: 'Refreshments', name: 'Passion Fruit Soda', price: 110, rating: 4.8, accent: refreshAccent, image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=80', description: 'Sparkling soda lifted with tropical passion fruit flavor.' },
  { id: 'peach-tea', category: 'Refreshments', name: 'Peach Iced Tea', price: 100, rating: 4.8, accent: refreshAccent, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=900&q=80', description: 'Cold-brewed tea with soft peach sweetness and a refreshing finish.' },
  { id: 'fruit-tea', category: 'Refreshments', name: 'Fresh Fruit Tea', price: 120, rating: 4.9, accent: refreshAccent, image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=900&q=80', description: 'Tea, fruit, and citrus layered into a light, colorful refresher.' },
  { id: 'cookies', category: 'Snacks', name: 'Chocolate Chip Cookies', price: 60, rating: 4.8, accent: snackAccent, image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=900&q=80', description: 'Golden cookies with melty chocolate chips and crisp edges.' },
  { id: 'brownie', category: 'Snacks', name: 'Brownie', price: 75, rating: 4.9, accent: snackAccent, image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80', description: 'Fudgy, chocolate-rich, and baked for a dense satisfying bite.' },
  { id: 'croissant', category: 'Snacks', name: 'Croissant', price: 85, rating: 4.8, accent: snackAccent, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=80', description: 'Buttery pastry with flaky layers, served warm when available.' },
  { id: 'cinnamon-roll', category: 'Snacks', name: 'Cinnamon Roll', price: 90, rating: 4.9, accent: snackAccent, image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=900&q=80', description: 'Soft rolled bread with cinnamon sugar and a sweet glaze.' },
  { id: 'cheesecake', category: 'Snacks', name: 'Cheesecake Slice', price: 120, rating: 5, accent: snackAccent, image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=900&q=80', description: 'Creamy cheesecake with a buttery crust and clean vanilla finish.' },
  { id: 'club-sandwich', category: 'Snacks', name: 'Club Sandwich', price: 140, rating: 4.8, accent: snackAccent, image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80', description: 'A stacked sandwich with savory layers, crisp vegetables, and house sauce.' },
];

const promos = [
  { id: 'coffee-snack-combo', category: 'Promos', name: 'Coffee + Snack Combo', price: 159, original: 195, rating: 4.9, accent: coffeeAccent, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80', description: 'Pair a signature coffee with a fresh snack for a quick cafe break.' },
  { id: 'refreshment-snack-combo', category: 'Promos', name: 'Refreshment + Snack Combo', price: 159, original: 205, rating: 4.9, accent: refreshAccent, image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=900&q=80', description: 'A chilled refresher plus your choice of snack, ready for pickup or delivery.' },
  { id: 'any-two-drinks', category: 'Promos', name: 'Any 2 Drinks', price: 210, original: 240, rating: 4.8, accent: snackAccent, image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=900&q=80', description: 'Share two drinks or keep both for yourself. We understand either way.' },
];

const catalog = [...products, ...promos];
const gallery = [
  ...catalog.slice(0, 9).map((item) => ({ src: item.image, title: item.name })),
  { src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=80', title: 'Cafe Interior' },
  { src: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=900&q=80', title: 'Coffee Bar' },
  { src: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80', title: 'Dessert Counter' },
];

const defaultReviews = [
  { name: 'Maria S.', rating: 5, comment: 'Love the iced drinks. The coffee is really good and the service is fast.', date: 'Aug 22, 2026' },
  { name: 'John R.', rating: 5, comment: 'Perfect place to grab a drink and a quick snack before work.', date: 'Aug 19, 2026' },
  { name: 'Elaine D.', rating: 5, comment: 'The Spanish Latte and brownies are my favorite combo.', date: 'Aug 14, 2026' },
];

function load(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function currency(value) {
  return `PHP ${value.toLocaleString('en-PH')}`;
}

function customizationText(item) {
  const parts = [];
  if (item.size) parts.push(item.size);
  if (item.ice) parts.push(item.ice);
  if (item.sugar) parts.push(`${item.sugar} sugar`);
  return parts.join(' / ') || 'Standard';
}

export default function App() {
  const [active, setActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [detail, setDetail] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  const [cart, setCart] = useState(() => load('grabgo-cart', []));
  const [favorites, setFavorites] = useState(() => load('grabgo-favorites', []));
  const [reviews, setReviews] = useState(() => load('grabgo-reviews', defaultReviews));
  const [lightbox, setLightbox] = useState(null);
  const [reviewFormOpen, setReviewFormOpen] = useState(false);

  useEffect(() => localStorage.setItem('grabgo-cart', JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem('grabgo-favorites', JSON.stringify(favorites)), [favorites]);
  useEffect(() => localStorage.setItem('grabgo-reviews', JSON.stringify(reviews)), [reviews]);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = subtotal >= 500 ? 50 : 0;
  const deliveryFee = checkoutOpen ? 49 : 0;

  const navigate = (section) => {
    setActive(section);
    setMenuOpen(false);
    setCheckoutOpen(false);
    setTimeout(() => document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' }), 30);
  };

  const addToCart = (product, options = {}) => {
    const item = {
      ...product,
      cartKey: `${product.id}-${options.size || 'Standard'}-${options.ice || 'Standard'}-${options.sugar || 'Standard'}`,
      qty: options.qty || 1,
      size: options.size,
      ice: options.ice,
      sugar: options.sugar,
    };
    setCart((current) => {
      const existing = current.find((entry) => entry.cartKey === item.cartKey);
      if (existing) return current.map((entry) => entry.cartKey === item.cartKey ? { ...entry, qty: entry.qty + item.qty } : entry);
      return [...current, item];
    });
    setCartOpen(true);
  };

  const toggleFavorite = (id) => {
    setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return catalog;
    return catalog.filter((item) =>
      item.name.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term) ||
      item.description.toLowerCase().includes(term),
    );
  }, [search]);

  return (
    <div className="site-shell">
      <Header
        cartCount={cart.reduce((sum, item) => sum + item.qty, 0)}
        favoriteCount={favorites.length}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        navigate={navigate}
        openSearch={() => setSearchOpen(true)}
        openCart={() => setCartOpen(true)}
      />

      <main>
        <Hero navigate={navigate} />
        <BusinessPanel navigate={navigate} />
        <MenuSection title="Our Menu" id="menu" items={products} addToCart={addToCart} setDetail={setDetail} favorites={favorites} toggleFavorite={toggleFavorite} />
        <CategorySection id="coffee" title="Coffee" subtitle="Bold classics and creamy signatures." category="Coffee" addToCart={addToCart} setDetail={setDetail} favorites={favorites} toggleFavorite={toggleFavorite} />
        <CategorySection id="refreshments" title="Refreshments" subtitle="Bright, chilled, and made for warm afternoons." category="Refreshments" addToCart={addToCart} setDetail={setDetail} favorites={favorites} toggleFavorite={toggleFavorite} />
        <CategorySection id="snacks" title="Snacks" subtitle="Fresh pastries, sweets, and savory bites." category="Snacks" addToCart={addToCart} setDetail={setDetail} favorites={favorites} toggleFavorite={toggleFavorite} />
        <Promos addToCart={addToCart} setDetail={setDetail} />
        <About />
        <Gallery lightbox={lightbox} setLightbox={setLightbox} />
        <Reviews reviews={reviews} setReviews={setReviews} formOpen={reviewFormOpen} setFormOpen={setReviewFormOpen} />
        <Contact />
      </main>

      <Footer navigate={navigate} />

      {searchOpen && <SearchOverlay search={search} setSearch={setSearch} results={filtered} close={() => setSearchOpen(false)} setDetail={setDetail} addToCart={addToCart} navigate={navigate} />}
      {detail && <ProductModal product={detail} close={() => setDetail(null)} addToCart={addToCart} buyNow={(product, options) => { addToCart(product, options); setCartOpen(false); setDetail(null); setCheckoutOpen(true); }} />}
      {cartOpen && <CartDrawer cart={cart} setCart={setCart} close={() => setCartOpen(false)} subtotal={subtotal} discount={discount} checkout={() => { setCartOpen(false); setCheckoutOpen(true); }} />}
      {checkoutOpen && <Checkout cart={cart} subtotal={subtotal} discount={discount} setConfirmation={setConfirmation} setCheckoutOpen={setCheckoutOpen} setCart={setCart} />}
      {confirmation && <Confirmation order={confirmation} close={() => setConfirmation(null)} navigate={navigate} />}
      {lightbox !== null && <Lightbox index={lightbox} setIndex={setLightbox} />}
    </div>
  );
}

function Header({ cartCount, favoriteCount, menuOpen, setMenuOpen, navigate, openSearch, openCart }) {
  const links = ['home', 'menu', 'coffee', 'refreshments', 'snacks', 'promos', 'about', 'gallery', 'reviews', 'contact'];
  return (
    <header className="topbar">
      <button className="brand" onClick={() => navigate('home')}>
        <span className="brand-mark">G&G</span>
        <span><strong>Grab&Go</strong><small>Coffee / Refreshments / Snacks</small></span>
      </button>
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">Menu</button>
      <nav className={menuOpen ? 'nav open' : 'nav'}>
        {links.map((link) => <button key={link} onClick={() => navigate(link)}>{link}</button>)}
      </nav>
      <div className="nav-actions">
        <button className="icon-btn" onClick={openSearch}>Search</button>
        <button className="icon-btn" onClick={() => navigate('menu')}>Fav {favoriteCount}</button>
        <button className="icon-btn" onClick={openCart}>Cart {cartCount}</button>
        <button className="primary small" onClick={() => navigate('menu')}>Order Now</button>
      </div>
    </header>
  );
}

function Hero({ navigate }) {
  return (
    <section id="home" className="hero">
      <div className="hero-copy">
        <p className="eyebrow">Grab&Go / Coffee / Refreshments / Snacks</p>
        <h1>Good Drinks. Great Moments. Grab & Go.</h1>
        <p>Your favorite coffee, refreshing drinks, and delicious snacks, ready whenever you are.</p>
        <div className="hero-actions">
          <button className="primary" onClick={() => navigate('menu')}>Order Now</button>
          <button className="ghost" onClick={() => navigate('menu')}>View Menu</button>
        </div>
      </div>
      <div className="hero-media">
        <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1100&q=80" alt="Coffee and snacks" />
        <img src="https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=800&q=80" alt="Refreshment drinks" />
        <img src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80" alt="Fresh pastry" />
      </div>
    </section>
  );
}

function BusinessPanel({ navigate }) {
  return (
    <section className="profile-panel">
      <div><strong>Grab&Go</strong><span>4.9 Customer Rating</span></div>
      <div><strong>Open Today</strong><span>8:00 AM - 9:00 PM</span></div>
      <div><strong>Location</strong><span>Your City, Philippines</span></div>
      <div><strong>Phone</strong><span>09XX XXX XXXX</span></div>
      <button className="primary" onClick={() => navigate('menu')}>Order Now</button>
    </section>
  );
}

function MenuSection(props) {
  return (
    <section id={props.id} className="section">
      <SectionTitle title={props.title} text="Browse coffee, cool refreshments, snacks, and quick deals built for pickup or delivery." />
      <div className="product-grid">
        {props.items.map((item) => <ProductCard key={item.id} item={item} {...props} />)}
      </div>
    </section>
  );
}

function CategorySection({ id, title, subtitle, category, addToCart, setDetail, favorites, toggleFavorite }) {
  const items = products.filter((item) => item.category === category);
  return (
    <section id={id} className="section">
      <SectionTitle title={title} text={subtitle} />
      <div className="product-grid">
        {items.map((item) => <ProductCard key={item.id} item={item} addToCart={addToCart} setDetail={setDetail} favorites={favorites} toggleFavorite={toggleFavorite} />)}
      </div>
    </section>
  );
}

function SectionTitle({ title, text }) {
  return <div className="section-title"><p className="eyebrow">Grab&Go</p><h2>{title}</h2><p>{text}</p></div>;
}

function ProductCard({ item, addToCart, setDetail, favorites = [], toggleFavorite = () => {} }) {
  return (
    <article className="product-card" style={{ '--accent': item.accent }}>
      <div className="product-image"><img src={item.image} alt={item.name} /><button onClick={() => toggleFavorite(item.id)}>{favorites.includes(item.id) ? 'Saved' : 'Save'}</button></div>
      <div className="product-body">
        <span className="pill">{item.category}</span>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <div className="product-meta"><strong>{currency(item.price)}</strong><span>Star {item.rating}</span></div>
        <div className="card-actions">
          <button className="primary" onClick={() => addToCart(item)}>Order</button>
          <button className="ghost" onClick={() => setDetail(item)}>Details</button>
        </div>
      </div>
    </article>
  );
}

function Promos({ addToCart, setDetail }) {
  return (
    <section id="promos" className="section promos">
      <SectionTitle title="Special Offers" text="Limited combinations with friendlier prices and the same Grab&Go speed." />
      <div className="product-grid three">
        {promos.map((item) => (
          <article className="product-card promo-card" key={item.id} style={{ '--accent': item.accent }}>
            <div className="product-image"><img src={item.image} alt={item.name} /></div>
            <div className="product-body">
              <span className="pill">Promo</span>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <div className="product-meta"><strong>{currency(item.price)}</strong><span className="strike">{currency(item.original)}</span></div>
              <div className="card-actions">
                <button className="primary" onClick={() => addToCart(item)}>Order Now</button>
                <button className="ghost" onClick={() => setDetail(item)}>Details</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProductModal({ product, close, addToCart, buyNow }) {
  const isDrink = product.category === 'Coffee' || product.category === 'Refreshments';
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('Regular');
  const [ice, setIce] = useState('Regular Ice');
  const [sugar, setSugar] = useState('100%');
  const options = { qty, size: isDrink ? size : undefined, ice: isDrink ? ice : undefined, sugar: isDrink ? sugar : undefined };
  return (
    <div className="modal-backdrop">
      <div className="modal product-modal">
        <button className="close" onClick={close}>Close</button>
        <img src={product.image} alt={product.name} />
        <div>
          <span className="pill">{product.category}</span>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <div className="product-meta"><strong>{currency(product.price)}</strong><span>Star {product.rating}</span></div>
          <div className="qty-row"><button onClick={() => setQty(Math.max(1, qty - 1))}>-</button><strong>{qty}</strong><button onClick={() => setQty(qty + 1)}>+</button></div>
          {isDrink && <Customize size={size} setSize={setSize} ice={ice} setIce={setIce} sugar={sugar} setSugar={setSugar} />}
          <div className="card-actions">
            <button className="primary" onClick={() => { addToCart(product, options); close(); }}>Add To Cart</button>
            <button className="ghost" onClick={() => buyNow(product, options)}>Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Customize({ size, setSize, ice, setIce, sugar, setSugar }) {
  return (
    <div className="customize">
      <Option label="Size" value={size} setValue={setSize} options={['Regular', 'Large']} />
      <Option label="Ice" value={ice} setValue={setIce} options={['No Ice', 'Less Ice', 'Regular Ice', 'Extra Ice']} />
      <Option label="Sugar" value={sugar} setValue={setSugar} options={['0%', '25%', '50%', '75%', '100%']} />
    </div>
  );
}

function Option({ label, value, setValue, options }) {
  return <label>{label}<select value={value} onChange={(event) => setValue(event.target.value)}>{options.map((option) => <option key={option}>{option}</option>)}</select></label>;
}

function SearchOverlay({ search, setSearch, results, close, setDetail, addToCart, navigate }) {
  return (
    <div className="modal-backdrop">
      <div className="modal search-modal">
        <button className="close" onClick={close}>Close</button>
        <h2>Search Grab&Go</h2>
        <input autoFocus value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search coffee, refreshments, snacks..." />
        <div className="search-results">
          {results.length ? results.map((item) => (
            <button key={item.id} className="search-item" onClick={() => { setDetail(item); close(); }}>
              <img src={item.image} alt="" /><span>{item.name}<small>{item.category} / {currency(item.price)}</small></span>
            </button>
          )) : <div className="empty"><p>No products found.</p><button className="primary" onClick={() => { close(); navigate('menu'); }}>View All Products</button></div>}
        </div>
        <button className="primary wide" onClick={() => results[0] && addToCart(results[0])}>Order First Result</button>
      </div>
    </div>
  );
}

function CartDrawer({ cart, setCart, close, subtotal, discount, checkout }) {
  const total = subtotal - discount;
  const updateQty = (key, qty) => setCart((current) => current.map((item) => item.cartKey === key ? { ...item, qty } : item).filter((item) => item.qty > 0));
  return (
    <aside className="drawer">
      <button className="close" onClick={close}>Close</button>
      <h2>Your Cart</h2>
      <div className="cart-list">
        {cart.length ? cart.map((item) => (
          <div className="cart-item" key={item.cartKey}>
            <img src={item.image} alt={item.name} />
            <div><strong>{item.name}</strong><small>{customizationText(item)}</small><small>{currency(item.price)} each</small></div>
            <div className="qty-row"><button onClick={() => updateQty(item.cartKey, item.qty - 1)}>-</button><strong>{item.qty}</strong><button onClick={() => updateQty(item.cartKey, item.qty + 1)}>+</button></div>
            <button onClick={() => updateQty(item.cartKey, 0)}>Remove</button>
          </div>
        )) : <p className="empty">Your cart is empty.</p>}
      </div>
      <div className="summary">
        <span>Subtotal <strong>{currency(subtotal)}</strong></span>
        <span>Discount <strong>-{currency(discount)}</strong></span>
        <span>Delivery Fee <strong>Calculated at checkout</strong></span>
        <span className="total">Total <strong>{currency(total)}</strong></span>
      </div>
      <button className="primary wide" disabled={!cart.length} onClick={checkout}>Proceed To Checkout</button>
      <button className="ghost wide" disabled={!cart.length} onClick={() => setCart([])}>Clear Cart</button>
    </aside>
  );
}

function Checkout({ cart, subtotal, discount, setConfirmation, setCheckoutOpen, setCart }) {
  const [type, setType] = useState('Pickup');
  const [form, setForm] = useState({ name: '', mobile: '', email: '', time: '', address: '', landmark: '' });
  const deliveryFee = type === 'Delivery' ? 49 : 0;
  const total = subtotal - discount + deliveryFee;
  const submit = (event) => {
    event.preventDefault();
    const required = type === 'Delivery' ? ['name', 'mobile', 'email', 'address'] : ['name', 'mobile', 'email', 'time'];
    if (required.some((field) => !form[field].trim())) return alert('Please complete the required checkout fields.');
    const stamp = new Date();
    const order = {
      number: `GO-${stamp.getFullYear()}${String(stamp.getMonth() + 1).padStart(2, '0')}${String(stamp.getDate()).padStart(2, '0')}-${Math.floor(100 + Math.random() * 900)}`,
      date: stamp.toLocaleString(),
      customer: form.name,
      type,
      payment: 'Cash',
      items: cart,
      total,
      eta: type === 'Delivery' ? '35-45 minutes' : '15-20 minutes',
    };
    setConfirmation(order);
    setCheckoutOpen(false);
    setCart([]);
  };
  return (
    <div className="modal-backdrop">
      <form className="modal checkout" onSubmit={submit}>
        <button type="button" className="close" onClick={() => setCheckoutOpen(false)}>Close</button>
        <h2>Checkout</h2>
        <fieldset><legend>Customer Details</legend><input placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /><input placeholder="Mobile Number" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} /><input placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></fieldset>
        <fieldset><legend>Order Type</legend><div className="segmented"><button type="button" className={type === 'Pickup' ? 'active' : ''} onClick={() => setType('Pickup')}>Pickup</button><button type="button" className={type === 'Delivery' ? 'active' : ''} onClick={() => setType('Delivery')}>Delivery</button></div>{type === 'Pickup' ? <input placeholder="Pickup time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} /> : <><input placeholder="Delivery address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} /><input placeholder="Landmark" value={form.landmark} onChange={(e) => setForm({ ...form, landmark: e.target.value })} /></>}</fieldset>
        <fieldset><legend>Payment</legend><label className="cash"><input type="radio" checked readOnly /> Cash only<span>{type === 'Pickup' ? 'Pay upon pickup.' : 'Pay the delivery rider upon receiving your order.'}</span></label></fieldset>
        <div className="summary"><span>Subtotal <strong>{currency(subtotal)}</strong></span><span>Discount <strong>-{currency(discount)}</strong></span><span>Delivery Fee <strong>{currency(deliveryFee)}</strong></span><span className="total">Total <strong>{currency(total)}</strong></span></div>
        <button className="primary wide" disabled={!cart.length}>Place Order</button>
      </form>
    </div>
  );
}

function Confirmation({ order, close, navigate }) {
  return (
    <div className="modal-backdrop">
      <div className="modal confirmation">
        <h2>Order Placed Successfully!</h2>
        <p><strong>Order #{order.number}</strong></p>
        <p>{order.customer} / {order.date}</p>
        <p>{order.type} / {order.payment} / Estimated prep: {order.eta}</p>
        <div className="cart-list">{order.items.map((item) => <div className="cart-item" key={item.cartKey}><img src={item.image} alt="" /><div><strong>{item.name}</strong><small>{customizationText(item)}</small></div><strong>{item.qty} x {currency(item.price)}</strong></div>)}</div>
        <div className="summary"><span className="total">Total <strong>{currency(order.total)}</strong></span></div>
        <div className="card-actions"><button className="primary" onClick={close}>Continue Shopping</button><button className="ghost" onClick={() => { close(); navigate('home'); }}>Back To Home</button></div>
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="section split">
      <div><SectionTitle title="About Grab&Go" text="Grab&Go is a modern cafe and refreshment destination offering quality coffee, refreshing beverages, and delicious snacks for customers who want something convenient, satisfying, and easy to enjoy on the go." /></div>
      <div className="feature-grid">
        {['Quality|Fresh ingredients and carefully prepared drinks.', 'Convenience|Quick and easy ordering.', 'Variety|Coffee, refreshments, and snacks for every craving.'].map((entry) => {
          const [title, text] = entry.split('|');
          return <article className="feature" key={title}><h3>{title}</h3><p>{text}</p></article>;
        })}
      </div>
    </section>
  );
}

function Gallery({ lightbox, setLightbox }) {
  return (
    <section id="gallery" className="section">
      <SectionTitle title="Gallery" text="A look at the drinks, snacks, and cozy counter moments customers come back for." />
      <div className="gallery-grid">
        {gallery.map((item, index) => <button key={item.title} onClick={() => setLightbox(index)}><img src={item.src} alt={item.title} /><span>{item.title}</span></button>)}
      </div>
    </section>
  );
}

function Lightbox({ index, setIndex }) {
  const item = gallery[index];
  const move = (step) => setIndex((index + step + gallery.length) % gallery.length);
  return (
    <div className="modal-backdrop lightbox">
      <button className="close" onClick={() => setIndex(null)}>Close</button>
      <button onClick={() => move(-1)}>Previous</button>
      <img src={item.src} alt={item.title} />
      <button onClick={() => move(1)}>Next</button>
    </div>
  );
}

function Reviews({ reviews, setReviews, formOpen, setFormOpen }) {
  const [draft, setDraft] = useState({ name: '', rating: '5', comment: '' });
  const submit = (event) => {
    event.preventDefault();
    if (!draft.name.trim() || !draft.comment.trim()) return alert('Please add your name and review.');
    setReviews([{ ...draft, rating: Number(draft.rating), date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }, ...reviews]);
    setDraft({ name: '', rating: '5', comment: '' });
    setFormOpen(false);
  };
  return (
    <section id="reviews" className="section">
      <SectionTitle title="Customer Reviews" text={`${reviews.length} reviews / Overall 4.9 out of 5`} />
      <div className="reviews-grid">{reviews.map((review, index) => <article className="review" key={`${review.name}-${index}`}><strong>{review.name}</strong><span>{'Star '.repeat(review.rating)}</span><p>{review.comment}</p><small>{review.date}</small></article>)}</div>
      <button className="primary" onClick={() => setFormOpen(true)}>Write A Review</button>
      {formOpen && <div className="modal-backdrop"><form className="modal review-form" onSubmit={submit}><button type="button" className="close" onClick={() => setFormOpen(false)}>Close</button><h2>Write A Review</h2><input placeholder="Name" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} /><select value={draft.rating} onChange={(e) => setDraft({ ...draft, rating: e.target.value })}><option>5</option><option>4</option><option>3</option></select><textarea placeholder="Comment" value={draft.comment} onChange={(e) => setDraft({ ...draft, comment: e.target.value })} /><button className="primary">Submit Review</button></form></div>}
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section contact">
      <SectionTitle title="Find Us" text="Your City, Philippines" />
      <div className="contact-grid">
        <div className="map">Map Area<br />Grab&Go / Your City, Philippines</div>
        <div className="info-card"><h3>Business Information</h3><p><strong>Opening Hours</strong><br />Monday-Sunday<br />8:00 AM - 9:00 PM</p><p><strong>Phone</strong><br />09XX XXX XXXX</p><p><strong>Email</strong><br /><a href="mailto:hello@grabandgo.example">hello@grabandgo.example</a></p><p><strong>Social Media</strong><br />Facebook / Instagram / TikTok</p><button className="primary">Get Directions</button></div>
      </div>
    </section>
  );
}

function Footer({ navigate }) {
  return (
    <footer>
      <div><h2>Grab&Go</h2><p>Coffee / Refreshments / Snacks</p></div>
      <div><h3>Explore</h3>{['home', 'menu', 'coffee', 'refreshments', 'snacks', 'promos'].map((item) => <button key={item} onClick={() => navigate(item)}>{item}</button>)}</div>
      <div><h3>Information</h3>{['about', 'gallery', 'reviews', 'contact'].map((item) => <button key={item} onClick={() => navigate(item)}>{item}</button>)}</div>
      <div><h3>Contact</h3><p>09XX XXX XXXX<br />hello@grabandgo.example<br />Your City, Philippines</p><p>Monday-Sunday<br />8:00 AM - 9:00 PM</p></div>
    </footer>
  );
}
