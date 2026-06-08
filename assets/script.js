const productImages={
  tee:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
  hoodie:'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80',
  knit:'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900&q=80',
  denim:'https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=900&q=80',
  chinos:'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80',
  dress:'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80',
  overshirt:'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=80',
  linen:'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80'
};
const products=[
{id:1,name:'Classic Cotton Tee',cat:'men',price:24.99,img:productImages.tee,desc:'Soft breathable cotton tee for everyday wear.'},
{id:2,name:'Relaxed Hoodie',cat:'men',price:54.99,img:productImages.hoodie,desc:'Warm fleece hoodie with a relaxed streetwear fit.'},
{id:3,name:'Women\'s Knit Top',cat:'women',price:34.99,img:productImages.knit,desc:'Comfortable knit top for casual styling.'},
{id:4,name:'Denim Jacket',cat:'outerwear',price:69.99,img:productImages.denim,desc:'Classic denim jacket for all-season layering.'},
{id:5,name:'Everyday Chinos',cat:'men',price:44.99,img:productImages.chinos,desc:'Slim-straight pants with stretch comfort.'},
{id:6,name:'Soft Rib Dress',cat:'women',price:59.99,img:productImages.dress,desc:'Easy ribbed dress with a flattering everyday shape.'},
{id:7,name:'Utility Overshirt',cat:'outerwear',price:64.99,img:productImages.overshirt,desc:'Lightweight overshirt for smart casual layering.'},
{id:8,name:'Linen Blend Shirt',cat:'women',price:39.99,img:productImages.linen,desc:'Airy linen-blend shirt for warm weather outfits.'}
];
let cart=JSON.parse(localStorage.getItem('spCart')||'[]');
const grid=document.getElementById('productGrid');const search=document.getElementById('searchInput');const filter=document.getElementById('categoryFilter');
function money(n){return '$'+n.toFixed(2)}
function renderProducts(){if(!grid)return;const q=(search?.value||'').toLowerCase();const c=filter?.value||'all';grid.innerHTML=products.filter(p=>(c==='all'||p.cat===c)&&p.name.toLowerCase().includes(q)).map(p=>`<article class="product-card"><img src="${p.img}" alt="${p.name}" loading="lazy"><div class="product-info"><div class="product-meta"><span>${p.cat}</span><span>In stock</span></div><h3>${p.name}</h3><p>${p.desc}</p><div class="price">${money(p.price)}</div><button class="add-btn" onclick="addToCart(${p.id})">Add to Cart</button></div></article>`).join('')||'<p>No products found.</p>'}
function addToCart(id){const item=products.find(p=>p.id===id);const found=cart.find(i=>i.id===id);found?found.qty++:cart.push({...item,qty:1});saveCart();openCart();}
function removeItem(id){cart=cart.filter(i=>i.id!==id);saveCart();}
function saveCart(){localStorage.setItem('spCart',JSON.stringify(cart));renderCart();fillCheckoutOrder();}
function renderCart(){const count=document.getElementById('cartCount');const items=document.getElementById('cartItems');const total=document.getElementById('cartTotal');if(count)count.textContent=cart.reduce((s,i)=>s+i.qty,0);if(items)items.innerHTML=cart.length?cart.map(i=>`<div class="cart-item"><img src="${i.img}" alt="${i.name}"><div><strong>${i.name}</strong><br><small>Qty: ${i.qty} · ${money(i.price)}</small></div><button onclick="removeItem(${i.id})">Remove</button></div>`).join(''):'<p>Your cart is empty.</p>';if(total)total.textContent=money(cart.reduce((s,i)=>s+i.price*i.qty,0));}
function fillCheckoutOrder(){const notes=document.getElementById('orderDetails');if(!notes)return;const total=cart.reduce((s,i)=>s+i.price*i.qty,0);notes.value=cart.length?cart.map(i=>`${i.name} | Qty: ${i.qty} | Price: ${money(i.price)} each`).join('\n')+`\n\nEstimated order total: ${money(total)}`:'';}
function openCart(){document.getElementById('cartDrawer')?.classList.add('open');document.getElementById('overlay')?.classList.add('open')}function closeCart(){document.getElementById('cartDrawer')?.classList.remove('open');document.getElementById('overlay')?.classList.remove('open')}
document.getElementById('openCart')?.addEventListener('click',openCart);document.getElementById('closeCart')?.addEventListener('click',closeCart);document.getElementById('overlay')?.addEventListener('click',closeCart);document.querySelector('.nav-toggle')?.addEventListener('click',()=>document.querySelector('.main-nav')?.classList.toggle('open'));search?.addEventListener('input',renderProducts);filter?.addEventListener('change',renderProducts);renderProducts();renderCart();fillCheckoutOrder();
