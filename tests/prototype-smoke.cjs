const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync('index.html','utf8');
assert.equal(html,fs.readFileSync('app/src/main/assets/index.html','utf8'),'Android assets must match');
const js=html.match(/<script>([\s\S]*?)<\/script>/i)?.[1];assert.ok(js);
new vm.Script(js);
for(const id of ['setup','game','company','market','land','bank','state','street','rentShop','competitionInfo','streetAvailability','salesForecast','constructionPurchaseInfo'])assert.ok(html.includes('id="'+id+'"'),id);
const nodes=new Map(),store=new Map(),alerts=[];
function el(id){if(!nodes.has(id)){let v='';nodes.set(id,{get value(){return v},set value(x){v=String(x)},disabled:false,textContent:'',innerHTML:'',classList:{add(){},remove(){},toggle(){}},replaceChildren(){},appendChild(){}})}return nodes.get(id)}
const c={console,Intl,Number,Math,JSON,String,localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v),removeItem:k=>store.delete(k)},document:{getElementById:el,querySelectorAll:()=>[],createElement:()=>({textContent:'',className:'',setAttribute(){},append(){}})},alert:m=>alerts.push(m),confirm:()=>true};vm.createContext(c);vm.runInContext(js,c);
const state=()=>JSON.parse(store.get('commenomy-demo-v2'));
el('player').value='Deneme';el('city').value='İstanbul';el('street').value='1';c.start();
assert.equal(state().cash,500);c.approveIndustrialZone();assert.equal(state().industrialDistricts.length,1);assert.equal(state().industrialDistricts[0].distanceKm,6);assert.deepEqual(state().governmentLandPlans.map(p=>[p.type,p.areaM2,p.openDay]),[['factory',1000,2],['factory',1000,6],['warehouse',500,10],['warehouse',500,14]]);assert.equal(vm.runInContext('shopCapacity(1)',c),20,'A 20 m² city shop provides 20 units of retail storage');
const quotes=vm.runInContext('constructionOffers()',c);assert.ok(quotes.length>=2);assert.ok(quotes.every(q=>q.stock>=100));assert.ok(quotes[0].total<=quotes[1].total,'Construction order must choose lowest landed cost');
assert.equal(vm.runInContext('streetVacancy(1)',c),0,'Prestige street initially full');
el('shopNameInput').value='Deneme Market';c.rentShop();assert.equal(state().shopRented,false,'Cannot rent full street');
el('street').value='5';c.rentShop();assert.equal(state().shopRented,true);assert.equal(state().shopName,'Deneme Market');assert.equal(state().cash,475);assert.equal(state().street,5);
el('producerQty').value='10';el('producerSupplier').value='marmara';
const cashBeforePurchase=state().cash;c.produce();assert.equal(state().stock,0);assert.ok(state().cash<cashBeforePurchase,'Direct producer order including delivery must reduce company cash');assert.equal(state().shopStock,10);vm.runInContext('s.warehouses=1;s.capacity=20;s.warehouseSizes=[20];persist()',c);el('producerQty').value='10';el('producerSupplier').value='marmara';c.produce();assert.equal(state().stock,10,'With a warehouse, producer delivery goes to the warehouse');const cashBeforeTransfer=state().cash;el('transferQty').value='10';c.transferToShop();assert.equal(state().stock,0);assert.equal(state().shopStock,20);assert.equal(cashBeforeTransfer-state().cash,2,'Warehouse transfer charges transport only');
el('price').value='8';el('qty').value='10';const before=state().cash;c.sell();assert.ok(state().cash>=before);assert.ok(state().shopStock>=0&&state().shopStock<=20);
el('producerQty').value='10';el('producerSupplier').value='marmara';c.produce();assert.equal(state().stock,10);el('transferQty').value='10';c.transferToShop();const salesBeforeAuto=state().totalSalesUnits;c.nextDay();assert.ok(state().totalSalesUnits>salesBeforeAuto,'Customers must buy automatically as game days advance');
assert.ok(vm.runInContext('streetVacancy(5)',c)>=0);
for(let i=0;i<28;i++){c.nextDay();assert.ok(Number.isFinite(state().cash));assert.ok(state().stock>=0);assert.ok(state().lands>=0)}
assert.ok(state().shopNextRent>=8);
console.log('PASS: JavaScript syntax, synchronized Android assets, shop vacancy, street rental, producer purchase, automatic retail sales, competition sales, 28-day simulation');
