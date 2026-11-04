const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const html=fs.readFileSync('index.html','utf8');
const asset=fs.readFileSync('app/src/main/assets/index.html','utf8');
assert.equal(html,asset,'Android assets must match');
assert.match(fs.readFileSync('app/build.gradle','utf8'),/versionCode\s+45[\s\S]*versionName\s+'1\.1\.29'/,'APK version must be 1.1.29');
assert.ok(html.includes('data-tab="fatih"')&&html.includes('id="fatihBasketRows"')&&html.includes('function renderFatihBasket()'),'Fatih tab displays the inflation basket');
assert.ok(html.includes('function basketWeeklyData()')&&html.includes('slice(0,10)')&&html.includes('weeklyCost:row.quantity*unitPrice'),'Basket uses the cheapest ten available prices and weekly quantities');
assert.ok(html.includes('value<.01||value>1000')&&html.includes('min="0.01"')&&html.includes('Math.max(.01,Math.round((current+delta)'),'All shop prices can be set to one cent');
assert.ok(!html.includes('s.shopStocks.grocery_water=20')&&!html.includes('s.initialWaterStockGranted=true'),'A new bakkal starts without free water; stock must be purchased');
assert.ok(html.includes('hasSuitableVacancy')&&html.includes('Uygun boş dükkân yok')&&html.includes("classList.toggle('hidden',!warehouse&&!hasSuitableVacancy)"),'Rental hides shop opening when no suitable vacant street exists');
assert.ok(html.includes('function confirmProducerPurchase(data)')&&html.includes("cancel.textContent='Vazgeç'")&&html.includes("buy.textContent='Satın al'")&&html.includes("['Nakliye',money(data.shipping)]"),'Purchase confirmation has only the requested fields and actions');
assert.ok(html.includes('weeklyBasket*4*factor')&&html.includes('s.minimumWageBasketFactor'),'Minimum wage uses four weekly baskets and the selected one-to-two multiplier');
assert.ok(html.includes('id="electionCandidateConfirm"')&&html.includes('role="dialog"')&&html.includes('aria-modal="true"'),'Candidate confirmation uses an in-app dialog supported by WebView');
assert.ok(html.includes("modal.classList.remove('hidden')")&&html.includes("modal.classList.add('hidden')"),'Candidate choice can be confirmed or cancelled in the dialog');
assert.ok(html.includes("classList.toggle('election-candidate-saved',!!s.electionCandidateLocked)"),'Saved candidacy is highlighted green');
assert.ok(html.includes("money(x.unitDelivered)+'/'+unit+'</strong><strong class=\"producer-order-total\">'+(valid?'Toplam tutar: '+money(quote.total)"),'Supplier price shows one currency and a quantity-based amount');
assert.ok(html.includes("if(orderTotal)orderTotal.textContent=valid?'Toplam tutar: '+money(quote.total):'Toplam tutar: miktar girince hesaplanır'"),'Supplier amount line updates with quantity changes');
assert.ok(html.includes("const id=input.dataset.producerQty;producerOrderQuantities[id]=input.value"),'Supplier quantity remains visible when it exceeds stock or capacity so warning colors can appear');
assert.ok(html.includes('saleAmount.readOnly=false;')&&html.includes('minus.disabled=false;')&&html.includes('plus.disabled=false;'),'Every shop can edit its catalog prices with the stepper');
assert.ok(html.includes('shop.shopPrices=shop.shopPrices||{};prices=shop.shopPrices;prices[id]=value'),'Branch price changes are stored per shop');
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
assert.ok(html.indexOf("showTab('market');renderShopCatalog()")<html.indexOf("renderProducerOrderLocation();$('producerOrderCard').classList.remove('hidden')"),'Marketplace opens before supplier offers render');
assert.ok(html.includes("order.dataset.orderProduct=p.id")&&html.includes("order.dataset.orderShop=selected.id"),'Each product button preserves its exact product and shop in data attributes');assert.ok(html.includes('maxBackgroundOccupied=Math.max(0,d.total-reserved)')&&html.includes('d.total-reserved-backgroundOccupied-playerStores')&&html.includes('function rentalStreetId()')&&html.includes('s.rentalStreetSelection=Number(id)')&&html.includes('street=rentalStreetId()'),'Rental street choice is saved and reused through eligibility and rental');
assert.ok(html.includes('reserved=id===1?1:0'),'Street 1 reservation stays fixed so the displayed vacancy decreases after a player rental');
assert.ok(html.includes('order.onclick=event=>{event.preventDefault();event.stopPropagation();orderShopProduct(p.id,selected.id)}'),'Every dynamically rendered product button directly routes its exact product to its selected shop');
assert.ok(html.includes("target=shops.find(x=>x.id===shopId)||shops[0]"),'Product orders resolve the selected shop by id');
assert.ok(html.includes("minus.onclick=event=>{event.preventDefault();event.stopPropagation();adjustShopCatalogPrice(p.id,-0.10)}")&&html.includes("plus.onclick=event=>{event.preventDefault();event.stopPropagation();adjustShopCatalogPrice(p.id,0.10)}"),'Catalog price steppers handle direct clicks');
assert.ok(html.includes("supplierTargetShopId=targetShop.primary?null:targetShop.id"),'Marketplace purchases retain the selected branch as their target');
assert.ok(html.includes('destinationShopId:branch?.id||null'),'Branch supplier orders keep the destination shop id');
assert.ok(html.includes("marketBrowseType=type;marketViewProductId=productId;supplierMarketProductId=productId"),'Product selection and sector are carried to the marketplace');
assert.ok(html.includes("placeholder=\"Miktar gir\" data-producer-qty="),'Supplier quantity starts blank');
const getFunction=(name)=>{const re=new RegExp('function '+name+'\\([^\\n]*?\\n?');const i=html.indexOf('function '+name+'(');assert.notEqual(i,-1,name);let depth=0,opened=false;for(let p=i;p<html.length;p++){if(html[p]==='{'){depth++;opened=true}else if(html[p]==='}'&&opened&&--depth===0)return html.slice(i,p+1)}throw new Error(name+' body not closed')};
const retailCtx={s:{shopRented:true,shopConversion:null,shopStorageUse:'retail',shopType:'electronics',shopProduct:'electronics_charger',shopStocks:{electronics_charger:13},shopStock:13,shopAvgCosts:{electronics_charger:12.11},stockProductId:null,stock:0,pendingDeliveries:[],households:30,street:5,demand:0,virtualCompanies:[]},workforceData:()=>({total:30}),productFor:()=>({id:'electronics_charger',price:16,cost:8,demandMultiplier:1,unit:'adet'}),shopAverageCost:()=>12.11,streets:{1:{traffic:2,willing:1.5},5:{traffic:.7,willing:.85}},rivals:()=>[{id:'npc',price:16.32,stock:20,quality:1.08,trust:1.04,street:5}],$:()=>({value:'5'})};
vm.createContext(retailCtx);
vm.runInContext(html.match(/const retailDemandRates=\{[^;]+;/)[0],retailCtx);
for(const fn of ['householdBasketRow','householdBaseDailyDemand','retailDailyDemand','citywideProductStock','marketSupplyPriceFactor','virtualMarketPrice','marketAllocation','forecastProductDailySales'])vm.runInContext(getFunction(fn),retailCtx);
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
  selectedCompanyShopId:'main',supplierTargetShopId:null,supplierMarketProductId:null,marketBrowseType:null,marketViewProductId:null,producerOrderQuantities:{},producerOfferPage:0,
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
for(const fn of ['renderProducerOrderLocation','renderMarketProductChoices','updateProducerPreview','showTab','openProductSupplierMarket','orderShopProduct','handleShopCatalogOrderClick'])vm.runInContext(getFunction(fn),routeCtx);

const activePrimaryProductBeforeRoute=routeCtx.s.shopProduct;routeCtx.openProductSupplierMarket('building_brick','building','main');
assert.equal(routeEl('market').classList.contains('hidden'),false,'Click switches from Company to visible Pazar');
assert.equal(routeEl('company').classList.contains('hidden'),true,'Click hides Company after navigation');
assert.equal(routeCtx.s.shopProduct,activePrimaryProductBeforeRoute,'Clicking a Pazar purchase route preserves the active shop product');
assert.equal(routeCtx.marketViewProductId,'building_brick','Click selects the clicked SKU in Pazar');
assert.equal(routeEl('marketCategoryTitle').textContent,'Nalbur • Tuğla','Pazar product heading matches the clicked SKU');
assert.equal(routeEl('producerOrderTitle').textContent,'Tedarikçi Firmalar • Tuğla • En ucuz 5 firma','Supplier section matches the clicked SKU');
assert.equal(routeEl('marketProductChoices').children[0].children[1].children[0].textContent,'Tuğla','The visible Pazar card is Tuğla');
assert.ok(quoteRequests.some(([,type,productId])=>type==='building'&&productId==='building_brick'),'Supplier quotes are loaded for Tuğla');
assert.ok(routeEl('producerOffers').innerHTML.includes('Trakya Yapı Malzemeleri Üreticisi'),'Supplier list is rendered');
const marketTomato={id:'market_tomato',item:'Domates',price:2,unit:'kg',cost:1.1};
const marketBranch={id:'branch-market',name:'Fatih 2',type:'market',street:5,productId:'market_tomato',shopStock:0,shopStocks:{},shopAvgCosts:{}};
routeCtx.productCatalog.market=[marketTomato];routeCtx.s.additionalShops=[marketBranch];routeCtx.shopLocations=()=>[{id:'main',name:'Fatih 1',type:'building',street:5,primary:true},marketBranch];routeCtx.selectedCompanyShopId='branch-market';routeCtx.producerTarget=()=>({destination:'shop',room:60,shop:marketBranch,branch:true});
const primaryProductBeforeBranchRoute=routeCtx.s.shopProduct;routeCtx.openProductSupplierMarket('market_tomato','market');
assert.equal(routeCtx.supplierTargetShopId,'branch-market','Branch product purchase keeps Fatih 2 as the destination');
assert.equal(routeCtx.s.shopProduct,primaryProductBeforeBranchRoute,'Opening a branch purchase does not change the primary shop product');
assert.ok(quoteRequests.some(([,type,productId])=>type==='market'&&productId==='market_tomato'),'Supplier quotes load for the selected branch product');
const branchTargetCtx={s:{additionalShops:[marketBranch]},supplierTargetShopId:'branch-market',marketViewProductId:'market_tomato',marketBrowseType:'market',ensureShopInventory(){},pendingOrderQty:()=>5,shopCapacity:()=>60};
vm.createContext(branchTargetCtx);vm.runInContext(getFunction('producerTarget'),branchTargetCtx);
const branchTarget=vm.runInContext('producerTarget()',branchTargetCtx);
assert.equal(branchTarget.branch,true,'Selected secondary shop can receive a supplier order');
assert.equal(branchTarget.room,55,'Branch order availability uses its own capacity and pending deliveries');
routeCtx.productCatalog.grocery=[{id:'grocery_water',item:'Su (0,5 L)',price:0.5,unit:'şişe',cost:0.2}];routeCtx.s.shopType='grocery';routeCtx.s.shopProduct='grocery_water';routeCtx.s.shopRented=true;routeCtx.s.shopStocks={grocery_water:0};routeCtx.s.shopPrices={grocery_water:0.5};routeCtx.s.shopPrice=0.5;routeCtx.s.additionalShops=[];routeCtx.shopLocations=()=>[{id:'main',name:'Fatih 1',type:'grocery',street:1,primary:true}];routeCtx.selectedCompanyShopId='main';vm.runInContext(getFunction('orderShopProduct'),routeCtx);routeCtx.orderShopProduct('grocery_water','main');assert.equal(routeCtx.marketViewProductId,'grocery_water','Fatih 1 Su button opens the exact water product');assert.equal(routeCtx.marketBrowseType,'grocery','Fatih 1 Su button opens the grocery supplier category');assert.equal(routeCtx.supplierTargetShopId,null,'Primary shop water order remains targeted to the main shop');assert.ok(quoteRequests.some(([,type,productId])=>type==='grocery'&&productId==='grocery_water'),'Supplier quotes load for Fatih 1 water');

const allShopProducts={grocery:[{id:'grocery_water',item:'Su',price:.5,unit:'şişe',cost:.2},{id:'grocery_eggs',item:'Yumurta',price:2,unit:'adet',cost:1.2}],market:[marketTomato],bakery:[{id:'bakery_bread',item:'Ekmek',price:2,unit:'adet',cost:1}],pastane:[{id:'pastane_cake',item:'Yaş pasta',price:10,unit:'dilim',cost:5}],building:[brick],clothing:[{id:'clothing_shirt',item:'Gömlek',price:20,unit:'adet',cost:10}],electronics:[{id:'electronics_charger',item:'Şarj aleti',price:16,unit:'adet',cost:8}]};
for(const [type,products] of Object.entries(allShopProducts)){routeCtx.productCatalog[type]=products;routeCtx.s.shopType=type;routeCtx.s.shopRented=true;routeCtx.s.shopProduct=products[0].id;const activeProduct=routeCtx.s.shopProduct;for(const street of [1,2,3,4,5]){routeCtx.s.additionalShops=[];routeCtx.shopLocations=()=>[{id:'main',name:'Fatih 1',type,street,primary:true}];routeCtx.selectedCompanyShopId='main';for(const product of products){const routed={dataset:{orderProduct:product.id,orderShop:'main'},disabled:false};const event={target:{closest:()=>routed},preventDefault(){},stopPropagation(){}};routeCtx.handleShopCatalogOrderClick(event);assert.equal(routeCtx.marketViewProductId,product.id,`Primary ${type} on Street ${street}: ${product.id} opens exact Pazar product`);assert.equal(routeCtx.marketBrowseType,type,`Primary ${type} on Street ${street}: ${product.id} opens its sector`);assert.equal(routeCtx.supplierTargetShopId,null,`Primary ${type} on Street ${street}: order remains targeted to primary shop`);assert.equal(routeCtx.s.shopProduct,activeProduct,`Primary ${type} on Street ${street}: browsing does not mutate active shop product`);assert.ok(routeEl('marketCategoryTitle').textContent.endsWith(' • '+product.item),`Primary ${type} on Street ${street}: visible Pazar heading matches clicked product`);assert.ok(quoteRequests.some(([,requestedType,requestedId])=>requestedType===type&&requestedId===product.id),`Supplier offers load for primary ${type} on Street ${street}: ${product.id}`)}}}
for(const [type,products] of Object.entries(allShopProducts)){routeCtx.productCatalog[type]=products;routeCtx.s.shopType='grocery';routeCtx.s.shopProduct='grocery_water';routeCtx.s.shopRented=true;for(const street of [1,2,3,4,5]){const branch={id:'branch-'+type+'-'+street,name:'Fatih '+type+' Cadde '+street,type,street,productId:products[0].id,shopStock:0,shopStocks:{},shopPrices:{},shopAvgCosts:{}};routeCtx.s.additionalShops=[branch];routeCtx.shopLocations=()=>[{id:'main',name:'Fatih 1',type:'grocery',street:1,primary:true},branch];routeCtx.producerTarget=()=>({room:50,destination:'shop',branch:true,shop:branch});routeCtx.selectedCompanyShopId=branch.id;for(const product of products){const routed={dataset:{orderProduct:product.id,orderShop:branch.id},disabled:false};const event={target:{closest:()=>routed},preventDefault(){},stopPropagation(){}};routeCtx.handleShopCatalogOrderClick(event);assert.equal(routeCtx.marketViewProductId,product.id,`${branch.name} ${product.id} opens its exact Pazar product`);assert.equal(routeCtx.marketBrowseType,type,`${branch.name} ${product.id} opens its sector`);assert.equal(routeCtx.supplierTargetShopId,branch.id,`${branch.name} ${product.id} stays the selected purchase destination`);assert.ok(routeEl('marketCategoryTitle').textContent.endsWith(' • '+product.item),`${branch.name} visible Pazar heading matches clicked product`);assert.ok(quoteRequests.some(([,requestedType,requestedId])=>requestedType===type&&requestedId===product.id),`Supplier offers load for ${branch.name} ${product.id}`)}}}

const vacancyCtx={s:{day:1,virtualCompanies:[],shopRented:false,additionalShops:[]},streets:{1:{total:6,occupied:4},4:{total:15,occupied:14}},shopLocations(){return vacancyCtx.s.additionalShops},shopsOnStreet(id){return vacancyCtx.s.additionalShops.filter(shop=>Number(shop.street)===Number(id))}};vm.createContext(vacancyCtx);vm.runInContext(getFunction('streetVacancy'),vacancyCtx);assert.equal(vm.runInContext('streetVacancy(1)',vacancyCtx),1,'Street 1 shows one available shop before rental');vacancyCtx.s.additionalShops.push({id:'regression-main',street:1,type:'grocery'});assert.equal(vm.runInContext('streetVacancy(1)',vacancyCtx),0,'Street 1 vacancy decreases after rental despite its reserved first-shop slot');assert.equal(vm.runInContext('streetVacancy(4)',vacancyCtx),1,'Street 4 shows its single available shop before rental');vacancyCtx.s.additionalShops.push({id:'regression-branch',street:4,type:'market'});assert.equal(vm.runInContext('streetVacancy(4)',vacancyCtx),0,'Street 4 vacancy decreases immediately after a rental even when background occupancy is at its cap');
const selectionCtx={s:{rentalStreetSelection:1},streets:{1:{},4:{}},key:'test-save',JSON,document:null,$:(id)=>routeEl(id),localStorage:{setItem(){}},updateStreetSelectionCard(){},renderStreetStatus(){}};vm.createContext(selectionCtx);vm.runInContext(getFunction('selectStreetFromStatus'),selectionCtx);vm.runInContext(getFunction('rentalStreetId'),selectionCtx);selectionCtx.selectStreetFromStatus(4);assert.equal(selectionCtx.s.rentalStreetSelection,4,'Tapping the Street 4 status row stores Street 4');assert.equal(vm.runInContext('rentalStreetId()',selectionCtx),4,'Rental continues to use Street 4 after status row selection');
console.log('1.1.24 all-street product routing, shop catalog, street vacancy, street selection, and Android asset checks passed');

