const assert=require('node:assert/strict');
const {run,ctx,els,newGame}=require('./runtime-harness.cjs');
newGame();run('householdGameDayProgress=()=>0');
assert.equal(run('productArtIds.length'),62);
assert.equal(run('new Set(productArtIds).size'),62);
for(const type of run('Object.keys(productCatalog)')){
 ctx.type=type;
 run("s.shopRented=true;s.street=1;s.shopType=type;s.shopProduct=defaultProductId(type);s.shopStocks={};s.shopPrices={};selectedCompanyShopId='main';renderShopCatalog()");
 for(const card of els.get('shopCatalogCards').children){
  const art=card.children[0].children[0];assert.equal(art.dataset.productArt,card.dataset.productId);
  const price=card.children[1].children[1].children[1];assert.match(price.value,/^\d+\.\d{2}$/);
 }
}
run("$('marketSearch').value='gömlek';marketBrowseType='market';renderMarketProductChoices()");
assert.ok(els.get('marketSearchResults').children.some(el=>el.dataset.marketProductOpen==='clothing_tshirt'),'Global search finds clothing outside the selected category');
assert.ok(els.get('marketCategoryTabs').children.some(el=>el.dataset.marketCategory==='clothing'),'Clothing has a real marketplace tab');
run("s.shopType='grocery';s.shopProduct='grocery_water';s.shopStocks={grocery_water:20,grocery_eggs:0};s.street=1;s.warehouses=0;s.pendingDeliveries=[{qty:5,destination:'shop',destinationShopId:'branch',productId:'grocery_eggs'}];supplierTargetShopId=null;marketViewProductId='grocery_eggs';marketBrowseType='grocery'");
assert.equal(run('producerTarget().room'),run('shopCapacity(1)'),'A full water slot does not block the egg slot in the primary shop');
assert.equal(run("pendingOrderQty('shop',null,'grocery_eggs')"),0,'Branch deliveries do not reserve primary shop capacity');
assert.equal(run("pendingOrderQty('shop','branch','grocery_eggs')"),5);
(async()=>{
 newGame();run("householdGameDayProgress=()=>0;s.shopRented=true;s.street=1;s.shopType='grocery';s.shopProduct='grocery_water';s.shopStocks={grocery_water:0};s.shopStock=0;s.warehouses=0;marketBrowseType='grocery';marketViewProductId='grocery_water';supplierMarketProductId='grocery_water';supplierTargetShopId=null;settleContinuousShopSales=()=>{};producerQuotes=qty=>[{id:'test',producerId:'test',stockKey:'test',name:'Test',total:qty,goodsCost:qty,delivery:0,deliveryDays:0,available:true}];s.producerStocks={test:100};confirmProducerPurchase=()=>new Promise(resolve=>{purchaseResolve=resolve})");
 const first=run("buyFromProducers('test',2)");
 await run("buyFromProducers('test',2)");
 const before=run('s.cash');run('purchaseResolve(true)');await first;
 assert.equal(run('s.cash'),before-2);assert.equal(run('s.shopStocks.grocery_water'),2,'Concurrent calls buy once');
 const next=run("buyFromProducers('test',2)");run('s.cash=0;purchaseResolve(true)');await next;
 assert.equal(run('s.cash'),0);assert.equal(run('s.shopStocks.grocery_water'),2,'Cash changes during the modal cannot create a negative balance');
 assert.equal(run('producerPurchaseInProgress'),false);
 console.log('Modern runtime passed: 62 artwork mappings, two decimal prices, global search, clothing, independent slots and deliveries, duplicate purchase prevention and confirmation revalidation.');
})().catch(e=>{console.error(e);process.exitCode=1});
