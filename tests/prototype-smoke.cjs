const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const html=fs.readFileSync('index.html','utf8');
const asset=fs.readFileSync('app/src/main/assets/index.html','utf8');
assert.equal(html,asset,'Android assets must match');
assert.match(fs.readFileSync('app/build.gradle','utf8'),/versionCode\s+28[\s\S]*versionName\s+'1\.1\.12'/,'APK version must be 1.1.12');
assert.ok(html.includes("money(x.unitDelivered)+'/'+unit+'</strong><strong class=\"producer-order-total\">'+(valid?'Toplam tutar: '+money(quote.total)"),'Supplier price shows one currency and a quantity-based amount');
assert.ok(html.includes("if(orderTotal)orderTotal.textContent=valid?'Toplam tutar: '+money(quote.total):'Toplam tutar: miktar girince hesaplanır'"),'Supplier amount line updates with quantity changes');
assert.ok(html.includes("const max=Number(input.max)||0,qty=Number(input.value);if(Number.isInteger(qty)&&qty>max)input.value=String(max);const id=input.dataset.producerQty;producerOrderQuantities[id]=input.value"),'Supplier quantity input is clamped to available stock and capacity');
assert.ok(html.includes('demand=Math.max(0,s.demand*street.traffic)')&&html.includes('Math.min(limit,demand*scores[0]/total)'),'Daily sales preserve fractional demand instead of flooring it to zero');
assert.ok(html.includes("forecast.innerHTML='<small>Tahmini günlük satış</small><b>'+salesQuantity(daily)+' '+p.unit+'</b>'"),'Catalog displays fractional daily unit estimates in Turkish format');
assert.ok(html.includes('salesAccruals[p.id]'),'Virtual competitors accumulate fractional sales and eventually sell whole units');
assert.ok(html.includes('function citywideProductStock(type,id)'),'Citywide product stock includes competitors, shop, warehouse, and pending orders');
assert.ok(html.includes('Math.log10(30/Math.max(.1,coverageDays))'),'Prices respond to citywide stock coverage');
assert.ok(html.includes('price:virtualMarketPrice(c,type,product)'),'Displayed competitor prices use city stock pressure');
assert.ok(html.includes('const price=virtualMarketPrice(c,type,p)'),'Competitors transact at the prices shown in the market');

assert.ok(html.includes('rate*elapsed/gameDayDurationMs()'),'Actual sale timing uses the same game-day duration as forecasts');
const js=html.match(/<script>([\s\S]*?)<\/script>/i)?.[1];
assert.ok(js,'App script exists');
new vm.Script(js);
for(const marker of ['id="marketSearch"','id="marketSectorTab"','id="marketCategoryTabs"','id="marketProductChoices"','id="marketSupplierMount"','id="marketFirmsJump"']) assert.ok(html.includes(marker),marker);
assert.ok(html.includes('Tedarikçi Firmalar'),'Pazar shows supplier cards');
for(const marker of ['class="market-topbar"','class="market-search"','class="market-category-tabs"','id="marketProductRow"','id="marketSummary"','id="marketQuantityRow"','id="marketSupplierMount"','id="marketFirmsJump"','id="moreProducerOffers"'])assert.ok(html.includes(marker),'Pazar1 layout includes '+marker);
assert.ok(html.includes("more.textContent=producerOfferPage>=pageCount-1?'İlk 5 teklife dön':'Diğer 5 Teklifi Gör ›'"),'Pazar1 exposes the next-ten-suppliers action');
assert.ok(html.includes('marketOffers=marketOpen?allOffers.slice(0,10):allOffers'),'Pazar1 shows only the cheapest ten suppliers while other screens keep their supplier lists');
assert.ok(html.includes("producerOfferPage=(producerOfferPage+1)%pageCount;updateProducerPreview()"),'Pazar1 button switches between its two supplier pages');
assert.ok(!html.includes('.market-supplier-controls{display:none!important}'),'Pazar1 must not hide the other-five-suppliers button');
assert.ok(html.includes('#market.market-purchase-view .market-side-nav{display:none}'),'Supplier purchase view uses the full mobile width');
assert.ok(html.includes('grid-template-areas:"head buy" "meta buy" "delivery buy" "total total"'),'Mobile supplier offers have separate readable content rows');
assert.ok(html.includes("buyFromProducers(id,qty)"),'Supplier Al buttons call the purchase handler');
assert.ok(html.includes("const current=currentShopViewData();openProductSupplierMarket(order.dataset.orderProduct,order.dataset.orderType||current?.type||s.shopType,current?.shop?.id||selectedCompanyShopId)"),'Company product button routes its exact product and selected shop');
assert.ok(html.indexOf("showTab('market');renderShopCatalog()")<html.indexOf("renderProducerOrderLocation();$('producerOrderCard').classList.remove('hidden')"),'Marketplace opens before supplier offers render');
assert.ok(html.includes("order.disabled=isPrimary?(!s.shopRented||!!s.shopConversion):!selected"),'Secondary shop product buttons are enabled');
assert.ok(html.includes("supplierTargetShopId=targetShop.primary?null:targetShop.id"),'Marketplace purchases retain the selected branch as their target');
assert.ok(html.includes('destinationShopId:branch?.id||null'),'Branch supplier orders keep the destination shop id');
assert.ok(html.includes("marketViewProductId=productId;marketBrowseType=type;producerOfferPage=0"),'Product selection and sector are carried to the marketplace');
assert.ok(html.includes("placeholder=\"Miktar gir\" data-producer-qty="),'Supplier quantity starts blank');
const getFunction=(name)=>{const re=new RegExp('function '+name+'\\([^\\n]*?\\n?');const i=html.indexOf('function '+name+'(');assert.notEqual(i,-1,name);let depth=0,opened=false;for(let p=i;p<html.length;p++){if(html[p]==='{'){depth++;opened=true}else if(html[p]==='}'&&opened&&--depth===0)return html.slice(i,p+1)}throw new Error(name+' body not closed')};
const retailCtx={s:{shopRented:true,shopConversion:null,shopStorageUse:'retail',shopType:'electronics',shopProduct:'electronics_charger',shopStocks:{electronics_charger:13},shopStock:13,shopAvgCosts:{electronics_charger:12.11},stockProductId:null,stock:0,pendingDeliveries:[],households:30,street:5,demand:0,virtualCompanies:[]},workforceData:()=>({total:30}),productFor:()=>({id:'electronics_charger',price:16,cost:8,demandMultiplier:1,unit:'adet'}),shopAverageCost:()=>12.11,streets:{1:{traffic:2,willing:1.5},5:{traffic:.7,willing:.85}},rivals:()=>[{id:'npc',price:16.32,stock:20,quality:1.08,trust:1.04,street:5}],$:()=>({value:'5'})};
vm.createContext(retailCtx);
vm.runInContext(html.match(/const retailDemandRates=\{[^;]+;/)[0],retailCtx);
for(const fn of ['retailDailyDemand','citywideProductStock','marketSupplyPriceFactor','virtualMarketPrice','marketAllocation','forecastProductDailySales'])vm.runInContext(getFunction(fn),retailCtx);
retailCtx.s.virtualCompanies=[{active:true,types:['electronics'],inventory:{electronics_charger:1000},priceFactor:1}];
const price1000=vm.runInContext("virtualMarketPrice(s.virtualCompanies[0],'electronics',productFor('electronics','electronics_charger'))",retailCtx);
retailCtx.s.virtualCompanies[0].inventory.electronics_charger=10000;
const price10000=vm.runInContext("virtualMarketPrice(s.virtualCompanies[0],'electronics',productFor('electronics','electronics_charger'))",retailCtx);
assert.ok(price1000>price10000,'Ten times more city stock lowers virtual competitors’ prices');
retailCtx.rivals=()=>[{id:'npc',price:price10000,stock:20,quality:1.08,trust:1.04,street:5}];
const backStreetSales=vm.runInContext("forecastProductDailySales('electronics_charger',18.11)",retailCtx);
retailCtx.s.street=1;
const mainStreetSales=vm.runInContext("forecastProductDailySales('electronics_charger',18.11)",retailCtx);
retailCtx.s.street=5;
const lowerPriceSales=vm.runInContext("forecastProductDailySales('electronics_charger',16)",retailCtx);
assert.ok(backStreetSales>0,'Back streets retain daily sales');
assert.ok(mainStreetSales>backStreetSales,'Main street traffic creates a sales advantage');
assert.ok(lowerPriceSales>backStreetSales,'A more competitive price increases the daily sales estimate');
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
  selectedCompanyShopId:'main',
  shopLocations(){return[{id:'main',name:'Fatih 1',type:routeCtx.s.shopType,street:5,primary:true}]},
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
assert.ok(html.includes("const current=currentShopViewData();openProductSupplierMarket(order.dataset.orderProduct,order.dataset.orderType||current?.type||s.shopType,current?.shop?.id||selectedCompanyShopId)"),'Delegated product buttons use the current selected shop');
routeCtx.openProductSupplierMarket('building_brick','building','main');
assert.equal(routeEl('market').classList.contains('hidden'),false,'Click switches from Company to visible Pazar');
assert.equal(routeEl('company').classList.contains('hidden'),true,'Click hides Company after navigation');
assert.equal(routeCtx.s.shopProduct,'building_brick','Click selects the clicked SKU in company state');
assert.equal(routeCtx.marketViewProductId,'building_brick','Click selects the clicked SKU in Pazar');
assert.equal(routeEl('marketCategoryTitle').textContent,'Nalbur • Tuğla','Pazar product heading matches the clicked SKU');
assert.equal(routeEl('producerOrderTitle').textContent,'Tedarikçi Firmalar • Tuğla • En ucuz 5 firma','Supplier section matches the clicked SKU');
assert.equal(routeEl('marketProductChoices').children[0].children[1].children[0].textContent,'Tuğla','The visible Pazar card is Tuğla');
assert.ok(quoteRequests.some(([,type,productId])=>type==='building'&&productId==='building_brick'),'Supplier quotes are loaded for Tuğla');
assert.ok(routeEl('producerOffers').innerHTML.includes('Trakya Yapı Malzemeleri Üreticisi'),'Supplier list is rendered');
const marketTomato={id:'market_tomato',item:'Domates',price:2,unit:'kg',cost:1.1};
const marketBranch={id:'branch-market',name:'Fatih 2',type:'market',street:5,productId:'market_tomato',shopStock:0,shopStocks:{},shopAvgCosts:{}};
routeCtx.productCatalog.market=[marketTomato];routeCtx.s.additionalShops=[marketBranch];routeCtx.shopLocations=()=>[{id:'main',name:'Fatih 1',type:'building',street:5,primary:true},marketBranch];routeCtx.selectedCompanyShopId='branch-market';routeCtx.producerTarget=()=>({destination:'shop',room:60,shop:marketBranch,branch:true});
routeCtx.openProductSupplierMarket('market_tomato','market');
assert.equal(routeCtx.supplierTargetShopId,'branch-market','Branch product purchase keeps Fatih 2 as the destination');
assert.equal(routeCtx.s.shopProduct,'building_brick','Opening a branch purchase does not change Fatih 1\'s product');
assert.ok(quoteRequests.some(([,type,productId])=>type==='market'&&productId==='market_tomato'),'Supplier quotes load for the selected branch product');
const branchTargetCtx={s:{additionalShops:[marketBranch]},supplierTargetShopId:'branch-market',marketViewProductId:'market_tomato',marketBrowseType:'market',ensureShopInventory(){},pendingOrderQty:()=>5,shopCapacity:()=>60};
vm.createContext(branchTargetCtx);vm.runInContext(getFunction('producerTarget'),branchTargetCtx);
const branchTarget=vm.runInContext('producerTarget()',branchTargetCtx);
assert.equal(branchTarget.branch,true,'Selected secondary shop can receive a supplier order');
assert.equal(branchTarget.room,55,'Branch order availability uses its own capacity and pending deliveries');
console.log('1.1.12 product routing, shop catalog, street vacancy, and Android asset checks passed');

