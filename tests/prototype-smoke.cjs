const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const html=fs.readFileSync('index.html','utf8');
const asset=fs.readFileSync('app/src/main/assets/index.html','utf8');
assert.equal(html,asset,'Android assets must match');
assert.match(fs.readFileSync('app/build.gradle','utf8'),/versionCode\s+14[\s\S]*versionName\s+'0\.3\.11'/,'APK version must be 0.3.11');
const js=html.match(/<script>([\s\S]*?)<\/script>/i)?.[1];
assert.ok(js,'App script exists');
new vm.Script(js);
for(const marker of ['id="marketSearch"','id="marketSectorTab"','id="marketCategoryTabs"','id="marketProductChoices"','id="marketSupplierMount"','id="marketFirmsJump"']) assert.ok(html.includes(marker),marker);
assert.ok(html.includes('Tedarikçi Firmalar'),'Pazar shows supplier cards');
assert.ok(html.includes("openProductSupplierMarket(order.dataset.orderProduct,order.dataset.orderType||s.shopType)"),'Company product button routes its exact product and sector');
assert.ok(html.indexOf("showTab('market');persist();renderShopCatalog()")<html.indexOf("renderProducerOrderLocation();$('producerOrderCard').classList.remove('hidden')"),'Marketplace opens before the company view is persisted');
assert.ok(html.includes("order.onclick=event=>{event.preventDefault();event.stopPropagation();openProductSupplierMarket(order.dataset.orderProduct,order.dataset.orderType||s.shopType)}"),'Each product button directly opens its exact marketplace product');
assert.ok(html.includes("marketViewProductId=productId;producerOfferPage=0;s.shopProduct=productId"),'Product selection is carried to the marketplace');
assert.ok(html.includes("placeholder=\"Miktar gir\" data-producer-qty="),'Supplier quantity starts blank');
const getFunction=(name)=>{const re=new RegExp('function '+name+'\\([^\\n]*?\\n?');const i=html.indexOf('function '+name+'(');assert.notEqual(i,-1,name);let depth=0,opened=false;for(let p=i;p<html.length;p++){if(html[p]==='{'){depth++;opened=true}else if(html[p]==='}'&&opened&&--depth===0)return html.slice(i,p+1)}throw new Error(name+' body not closed')};
const ctx={s:{shopType:'building',shopStocks:{},stockProductId:null,stock:0,shopAvgCosts:{},pendingDeliveries:[]},productFor:()=>({cost:4})};
vm.createContext(ctx);
vm.runInContext(getFunction('shopAverageCost'),ctx);
vm.runInContext(getFunction('recordShopPurchaseCost'),ctx);
assert.equal(vm.runInContext("shopAverageCost('building_cement')",ctx),0,'No stock means zero cost');
ctx.s.shopStocks.building_cement=10;ctx.s.shopAvgCosts.building_cement=5.4;
assert.equal(vm.runInContext("shopAverageCost('building_cement')",ctx),5.4,'Existing stock uses its recorded average cost');
vm.runInContext("recordShopPurchaseCost('building_cement',10,60)",ctx);
assert.equal(ctx.s.shopAvgCosts.building_cement,5.7,'New purchases update weighted average cost');

class TestElement{
  constructor(id=''){this.id=id;this.value='';this.textContent='';this.innerHTML='';this.children=[];this.dataset={};this.classes=new Set();this.classList={add:x=>this.classes.add(x),remove:x=>this.classes.delete(x),toggle:(x,v)=>{if(v)this.classes.add(x);else this.classes.delete(x)},contains:x=>this.classes.has(x)};this.disabled=false}
  append(...items){this.children.push(...items)}
  appendChild(item){this.children.push(item);return item}
  replaceChildren(...items){this.children=[...items]}
  setAttribute(){}
  scrollIntoView(){}
}
const routeElements=new Map();
function routeEl(id){if(!routeElements.has(id))routeElements.set(id,new TestElement(id));return routeElements.get(id)}
const quoteRequests=[];
const brick={id:'building_brick',item:'Tuğla',price:8,unit:'adet',cost:0.47};
const routeCtx={
  s:{shopRented:true,shopType:'building',shopProduct:'building_cement',shopPrice:8,shopPrices:{},shopStocks:{},shopAvgCosts:{},warehouses:0,shopStorageUse:'retail'},
  productCatalog:{market:[],grocery:[],bakery:[],building:[{id:'building_cement',item:'Çimento',price:8,unit:'torba',cost:4},brick],clothing:[],electronics:[]},
  shopTypeMeta:{market:{label:'Market',icon:'🛒'},grocery:{label:'Bakkal',icon:'🏪'},bakery:{label:'Fırın',icon:'🥖'},building:{label:'Nalbur',icon:'🛠️'},clothing:{label:'Giyim',icon:'👕'},electronics:{label:'Elektronik',icon:'🔌'}},
  productIcons:{building_brick:'📦'},
  $:routeEl,
  document:{createElement:tag=>new TestElement(tag),querySelectorAll:()=>[]},
  window:{},
  settleContinuousShopSales(){},ensureShopInventory(){},dailyFamilyDemand(){return 1},populateShopProductOptions(){},persist(){},renderShopCatalog(){},
  producerQuotes(qty,type,productId){quoteRequests.push([qty,type,productId]);const product=routeCtx.productCatalog[type].find(p=>p.id===productId);return[{id:'supplier-1',name:'Trakya Yapı Malzemeleri Üreticisi',city:'İstanbul',price:0.69,unitDelivered:1.12,delivery:5.6,carrierName:'Devlet Lojistik A.Ş.',carrierOwner:'government',deliveryDays:0,stock:60,qty,total:qty*1.12,available:true,goodsCost:qty*.69}]},
  productFor(type,id){return routeCtx.productCatalog[type]?.find(p=>p.id===id)},
  producerTarget(){return{room:50,destination:'shop'}},money(n){return Number(n).toFixed(2)+' USD'},
  renderShopCatalog(){},requestAnimationFrame(fn){fn()},setTimeout(fn){fn()},Date
};
vm.createContext(routeCtx);
for(const fn of ['renderProducerOrderLocation','renderMarketProductChoices','updateProducerPreview','showTab','openProductSupplierMarket'])vm.runInContext(getFunction(fn),routeCtx);
routeCtx.order={dataset:{orderProduct:'building_brick',orderType:'building'}};
routeCtx.clickEvent={preventDefault(){},stopPropagation(){}};
const clickBinding=html.match(/order\.onclick=event=>\{event\.preventDefault\(\);event\.stopPropagation\(\);openProductSupplierMarket\(order\.dataset\.orderProduct,order\.dataset\.orderType\|\|s\.shopType\)\}/)?.[0];
assert.ok(clickBinding,'Product button has a direct click binding');
vm.runInContext(clickBinding,routeCtx);
routeCtx.order.onclick(routeCtx.clickEvent);
assert.equal(routeEl('market').classList.contains('hidden'),false,'Click switches from Company to visible Pazar');
assert.equal(routeEl('company').classList.contains('hidden'),true,'Click hides Company after navigation');
assert.equal(routeCtx.s.shopProduct,'building_brick','Click selects the clicked SKU in company state');
assert.equal(routeCtx.marketViewProductId,'building_brick','Click selects the clicked SKU in Pazar');
assert.equal(routeEl('marketCategoryTitle').textContent,'Nalbur • Tuğla','Pazar product heading matches the clicked SKU');
assert.equal(routeEl('producerOrderTitle').textContent,'Tedarikçi Firmalar • Tuğla • En ucuz 10 firma','Supplier section matches the clicked SKU');
assert.equal(routeEl('marketProductChoices').children[0].children[1].children[0].textContent,'Tuğla','The visible Pazar card is Tuğla');
assert.ok(quoteRequests.some(([,type,productId])=>type==='building'&&productId==='building_brick'),'Supplier quotes are loaded for Tuğla');
assert.ok(routeEl('producerOffers').innerHTML.includes('Trakya Yapı Malzemeleri Üreticisi'),'Supplier list is rendered');
console.log('0.3.11 shop-to-market product routing, cost, and Android asset checks passed');
