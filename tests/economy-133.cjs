const assert=require('node:assert/strict');
const {run,ctx,els,newGame}=require('./runtime-harness.cjs');
run('householdGameDayProgress=()=>0');newGame();
assert.equal(run('Object.values(productShelfCapacities).reduce((n,m)=>n+Object.keys(m.products).length,0)'),62);
for(const type of run('Object.keys(productCatalog)')){
 ctx.testType=type;
 run("s.shopRented=true;s.street=1;s.shopType=testType;s.shopProduct=defaultProductId(testType);s.shopStocks={};s.shopPrices={};s.shopStorageUse='retail';selectedCompanyShopId='main'");
 for(const id of run('productCatalog[testType].map(p=>p.id)')){
  ctx.testId=id;
  const cap=run("shopProductCapacity({type:testType,street:1,primary:true},testId)");assert.ok(Number.isInteger(cap)&&cap>0);
  assert.equal(run("shopProductCapacity({type:testType,street:3,primary:false},testId)"),cap*2,'Twice the shop area doubles the fixed shelf');
  run('s.households=350;s.shopPrices[testId]=999');assert.equal(run("shopProductCapacity({type:testType,street:1,primary:true},testId)"),cap,'Population and prices do not resize shelves');
 }
}
newGame();run("s.shopRented=true;s.street=1;s.shopType='grocery';s.shopProduct='grocery_water';s.shopStocks={grocery_water:600,grocery_eggs:0};s.shopStock=600;s.warehouses=1;supplierMarketProductId='grocery_eggs';marketViewProductId='grocery_eggs';marketBrowseType='grocery';supplierTargetShopId=null");
assert.equal(run("primaryProductCapacity('grocery_water')"),600);assert.equal(run("primaryProductCapacity('grocery_eggs')"),900);
assert.equal(run('producerTarget().destination'),'shop','Product purchase goes to its shop even when the company owns a warehouse');
assert.equal(run('producerTarget().room'),900,'Full water shelf does not occupy egg shelf');
run("s.pendingDeliveries=[{qty:100,productId:'grocery_eggs',destination:'shop',destinationShopId:null,deliveryDay:s.day,cost:100,supplier:'Test',item:'Yumurta'}]");
assert.equal(run('producerTarget().room'),800,'Incoming orders reserve only the correct shelf');
run('deliverPendingOrders()');assert.equal(run('s.shopStocks.grocery_eggs'),100,'Non-active SKU delivery is not blocked by other shelves');assert.equal(run('s.shopStocks.grocery_water'),600);
run("s.additionalShops=[{id:'b',name:'Fatih 2',type:'grocery',street:3,productId:'grocery_water',shopStock:0,shopStocks:{grocery_water:0}}];supplierTargetShopId='b';marketViewProductId='grocery_water';s.shopStorageUse='warehouse'");
assert.equal(run('producerTarget().room'),1200,'Main shop warehouse mode does not change branch retail capacity');
run("s.shopStorageUse='retail';s.shopStocks.grocery_water=700;s.shopStock=700;supplierTargetShopId=null;supplierMarketProductId='grocery_water'");assert.equal(run('producerTarget().room'),0);assert.equal(run('s.shopStock'),700,'Upgrades retain inventory above a new shelf limit');
run("s.shopStocks.grocery_water=20;s.shopStock=20;s.shopAvgCosts={grocery_water:2};s.pendingDeliveries=[{destinationShopId:'b',destination:'shop',productId:'grocery_water',qty:100,cost:10000}]");
assert.equal(run("shopAverageCost('grocery_water')"),2,'A branch order does not alter the primary shop average cost');
// A city needs the family basket once, regardless of how many shops offer it.
run('householdGameDayProgress=()=>0');newGame();
run("s.shopRented=true;s.street=1;s.shopType='bakery';s.shopProduct='bakery_bread';s.shopPrices={bakery_bread:1};s.shopPrice=1;s.shopStocks={bakery_bread:0};s.shopStock=0;s.additionalShops=[{id:'bread-b',name:'Second bakery',type:'bakery',street:3,productId:'bakery_bread',shopStock:0,shopStocks:{bakery_bread:0},shopPrices:{bakery_bread:1}}];s.virtualCompanies=[];ensureVirtualCompanies=()=>{};s.households=33;ensureHouseholdAccounts();for(const f of s.householdAccounts){f.cash=100000;f.purchaseSchedule={};f.inventory={};householdSchedule(f,householdBasketRow('bakery','bakery_bread')).minute=0}");
assert.equal(run("cityProductDemandInfo('bakery','bakery_bread').dailyNeed"),66);assert.equal(run("cityProductDemandInfo('bakery','bakery_bread').unmet"),66);
run('settleHouseholdPurchases(0)');assert.equal(run("cityProductDemandInfo('bakery','bakery_bread').unmet"),66);
run("s.shopStocks.bakery_bread=240;s.shopStock=240;s.additionalShops[0].shopStocks.bakery_bread=240;s.additionalShops[0].shopStock=240");
assert.ok(run("forecastProductDailySales('bakery_bread',1)+forecastStoreProductDailySales(shopLocations()[1],'bakery_bread',1)")<=66+1e-9);
run('settleHouseholdPurchases(1)');assert.equal(run("s.householdAccounts.reduce((n,f)=>n+(f.inventory.bakery_bread||0),0)"),66);assert.equal(run("cityProductDemandInfo('bakery','bakery_bread').unmet"),0);
run("s.households=35;ensureHouseholdAccounts();for(const f of s.householdAccounts){f.purchaseSchedule={};f.inventory={}}")
assert.equal(run("cityProductDemandInfo('bakery','bakery_bread').dailyNeed"),70);
// Forecast computation grows by five locality groups, not N repeated seller lists.
for(const families of [30,300,3000]){
 ctx.testFamilies=families;run("s.households=testFamilies;ensureHouseholdAccounts();s.householdAccounts=s.householdAccounts.slice(0,testFamilies);for(const f of s.householdAccounts){f.purchaseSchedule={};f.inventory={}};sellerOptionCalls=0;originalSellerOptions=householdSellerOptions;householdSellerOptions=(...args)=>{sellerOptionCalls++;return originalSellerOptions(...args)}");
 const quantity=run("cityProductDemandInfo('bakery','bakery_bread').dailyNeed");assert.equal(quantity,families*2);
 run("forecastProductDailySales('bakery_bread',1)");assert.ok(run('sellerOptionCalls')<=5);run('householdSellerOptions=originalSellerOptions');
}
assert.equal(run("new Set(Array.from({length:100},(_,i)=>Math.floor(householdPurchaseMinute(i+1,'bakery_bread')/360))).size"),4,'Purchases span the full 24-hour game day');
console.log('1.1.33 economy passed: 62 fixed per-product shelves, independent stores/SKUs, pending delivery reservations, over-capacity save preservation, 33/35-family demand, conserved sales and shortages, 30/300/3000-family forecast groups and all-day purchase timing.');
