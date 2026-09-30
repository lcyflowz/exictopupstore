const games=[
 {id:'freefire',name:'Free Fire',unit:'Diamonds',icon:'🔥',desc:'Fast diamonds for your Free Fire account',packages:[['100 Diamonds',95],['310 Diamonds',275],['520 Diamonds',445],['1060 Diamonds',850]]},
 {id:'pubg',name:'PUBG Mobile',unit:'UC',icon:'🎯',desc:'PUBG Mobile UC top-ups',packages:[['60 UC',135],['325 UC',650],['660 UC',1280],['1800 UC',3200]]},
 {id:'ml',name:'Mobile Legends',unit:'Diamonds',icon:'⚔️',desc:'Diamonds for Mobile Legends',packages:[['86 Diamonds',170],['172 Diamonds',330],['257 Diamonds',480],['706 Diamonds',1240]]},
 {id:'codm',name:'Call of Duty Mobile',unit:'CP',icon:'💥',desc:'CODM points and credits',packages:[['80 CP',160],['420 CP',760],['880 CP',1450],['2400 CP',3700]]},
 {id:'valorant',name:'Valorant',unit:'VP',icon:'🎮',desc:'Valorant Points for your account',packages:[['475 VP',650],['1000 VP',1250],['2050 VP',2400],['3650 VP',4050]]},
 {id:'roblox',name:'Roblox',unit:'Robux',icon:'🧱',desc:'Robux packages',packages:[['400 Robux',700],['800 Robux',1350],['1700 Robux',2750],['4500 Robux',6500]]}
];

let cart=JSON.parse(localStorage.getItem('exicCart')||'[]');
const $=s=>document.querySelector(s);
function money(n){return 'Rs. '+Number(n).toLocaleString('en-IN')}
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2300)}
function renderGames(list=games){
 $('#gameGrid').innerHTML=list.map(g=>`<article class="game" onclick="openProduct('${g.id}')"><div class="game-cover">${g.icon}</div><h3>${g.name}</h3><p>${g.desc}</p><span class="tag">${g.unit} • NPR</span></article>`).join('');
}
function openProduct(id){
 const g=games.find(x=>x.id===id);
 $('#productContent').innerHTML=`<div class="product-title"><div class="product-icon">${g.icon}</div><div><div class="eyebrow">TOP-UP</div><h2>${g.name}</h2><p>${g.desc}</p></div></div>
 <div class="packages">${g.packages.map((p,i)=>`<button class="pkg ${i===0?'selected':''}" data-pkg="${i}" onclick="selectPkg(this)"><strong>${p[0]}</strong><span>${money(p[1])}</span></button>`).join('')}</div>
 <div class="fields"><input class="checkout-input" id="uid" placeholder="Player UID / Game ID" required><input class="checkout-input" id="server" placeholder="Server ID (if required)"></div>
 <small style="color:#8190a4;line-height:1.5;display:block;margin-bottom:14px">🔒 For your safety, Exic TOPUP does not need or request your game password.</small>
 <button class="primary full" onclick="addToCart('${g.id}')">Add to cart</button>`;
 $('#productModal').classList.add('open');
}
function selectPkg(el){document.querySelectorAll('.pkg').forEach(x=>x.classList.remove('selected'));el.classList.add('selected')}
function addToCart(id){
 const g=games.find(x=>x.id===id), idx=Number(document.querySelector('.pkg.selected').dataset.pkg), p=g.packages[idx];
 const uid=$('#uid').value.trim(), server=$('#server').value.trim();
 if(!uid){toast('Please enter your Player UID / Game ID.');return}
 cart.push({game:g.name,package:p[0],price:p[1],uid,server});
 localStorage.setItem('exicCart',JSON.stringify(cart)); updateCart(); closeAll(); toast('Added to your cart ✓');
}
function updateCart(){
 $('#cartCount').textContent=cart.length;
 $('#cartItems').innerHTML=cart.length?cart.map((x,i)=>`<div class="cart-item"><div><strong>${x.game}</strong><br><small>${x.package} • UID ${x.uid}</small></div><div><b>${money(x.price)}</b><br><button style="background:none;border:0;color:#ff7380;cursor:pointer" onclick="removeItem(${i})">Remove</button></div></div>`).join(''):'<p style="color:#8391a4;padding:20px 0">Your cart is empty.</p>';
 $('#cartTotal').textContent=money(cart.reduce((s,x)=>s+x.price,0));
}
function removeItem(i){cart.splice(i,1);localStorage.setItem('exicCart',JSON.stringify(cart));updateCart()}
function closeAll(){$('.modal.open')?.classList.remove('open');$('#cartDrawer').classList.remove('open');$('#scrim').classList.remove('show')}
$('#openLogin').onclick=()=>$('#authModal').classList.add('open');
$('#heroLogin').onclick=()=>$('#authModal').classList.add('open');
$('#cartBtn').onclick=()=>{$('#cartDrawer').classList.add('open');$('#scrim').classList.add('show')};
document.querySelectorAll('[data-close]').forEach(b=>b.onclick=closeAll);
$('#scrim').onclick=closeAll;
document.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-tab]').forEach(x=>x.classList.remove('active'));b.classList.add('active');$('#loginForm').classList.toggle('hidden',b.dataset.tab!=='login');$('#registerForm').classList.toggle('hidden',b.dataset.tab!=='register')});
$('#loginForm').onsubmit=e=>{e.preventDefault();localStorage.setItem('exicUser',$('#loginEmail').value);closeAll();toast('Demo login successful ✓')};
$('#registerForm').onsubmit=e=>{e.preventDefault();localStorage.setItem('exicUser',$('#regEmail').value);closeAll();toast('Account created on this device ✓')};
$('#search').oninput=e=>{const q=e.target.value.toLowerCase();renderGames(games.filter(g=>(g.name+' '+g.unit).toLowerCase().includes(q)))};
$('#checkoutBtn').onclick=()=>{if(!cart.length){toast('Your cart is empty.');return}toast('Checkout page is ready for payment integration.');closeAll();location.hash='checkout'};
$('#supportBtn').onclick=()=>toast('Add your WhatsApp/support number here.');
renderGames();updateCart();
