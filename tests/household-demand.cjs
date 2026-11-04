const assert=require('node:assert/strict');
const {run,ctx,newGame}=require('./runtime-harness.cjs');
// Freeze time at the start of the day so start() cannot consume the fixtures.
run('householdGameDayProgress=()=>0');newGame();
assert.equal(run('s.households'),33);
assert.equal(run('s.householdAccounts.length'),33);
assert.equal(run('s.housingSupplyM2'),3300,'Initial homes arrive on the first day');
run("s.householdAccounts.forEach(f=>{f.inventory={};f.purchaseSchedule={}})");
assert.equal(run("s.householdAccounts.reduce((n,f)=>n+householdDemandToday(f,householdBasketRow('clothing','clothing_trousers')),0)"),33,'33 initial families need 33 trousers, once');
assert.equal(run("s.householdAccounts.reduce((n,f)=>n+householdDemandToday(f,householdBasketRow('bakery','bakery_bread')),0)"),66,'33 families need 66 breads across the city');
// Every initial basket line is available from the virtual city economy.
run('householdGameDayProgress=()=>.999999;settleHouseholdPurchases(0)');
assert.equal(run("s.householdAccounts.reduce((n,f)=>n+inflationBasketSpec.filter(r=>(f.inventory[r.productId]||0)+1e-6<householdPurchaseCycle(r).quantity).length,0)"),0,'All 33 families can complete every initial basket product');
run("s.householdAccounts.forEach(f=>{f.inventory={};f.purchaseSchedule={}})");
// Two stocked player shops plus one virtual seller share one finite city need.
run(`s.shopRented=true;s.street=1;s.shopType='clothing';s.shopProduct='clothing_trousers';s.shopPrices={clothing_trousers:20};s.shopPrice=20;s.shopStocks={clothing_trousers:100};s.shopStock=100;
s.additionalShops=[{id:'clothes-2',name:'Second clothes',street:3,type:'clothing',productId:'clothing_trousers',shopPrices:{clothing_trousers:20},shopPrice:20,shopStocks:{clothing_trousers:100},shopStock:100}];
s.virtualCompanies=[{id:'npc-clothes',name:'Rota',street:4,types:['clothing'],active:true,inventory:{clothing_trousers:100},priceFactor:1,quality:1,trust:1,cash:10000}];
originalEnsureVirtualCompanies=ensureVirtualCompanies;ensureVirtualCompanies=()=>{};s.householdAccounts.forEach(f=>f.cash=100000);`);
const cheap=run("forecastStoreProductDailySales(shopLocations()[1],'clothing_trousers',10)");
const expensive=run("forecastStoreProductDailySales(shopLocations()[1],'clothing_trousers',100)");
assert.ok(cheap>expensive&&expensive>0,'Branch estimates respond to price without rounding away small shares');
const main=run("forecastProductDailySales('clothing_trousers',20)"),branch=run("forecastStoreProductDailySales(shopLocations()[1],'clothing_trousers',20)");
assert.ok(main+branch<=33+1e-9,'Player forecasts never each claim the whole city demand');
run(`householdGameDayProgress=()=>.999999;const trouserRow=householdBasketRow('clothing','clothing_trousers');
for(const family of s.householdAccounts){const schedule=householdSchedule(family,trouserRow);schedule.minute=0;}
settleHouseholdPurchases(1);`);
assert.equal(run("s.householdAccounts.reduce((sum,f)=>sum+(f.inventory.clothing_trousers||0),0)"),33,'Actual initial city sales equal 33 trousers');
const inventories=run("JSON.stringify([s.shopStocks,s.additionalShops[0].shopStocks,s.virtualCompanies[0].inventory])");
run('settleHouseholdPurchases(2);settleContinuousShopSales(3);settleHouseholdPurchases(4)');
assert.equal(run("JSON.stringify([s.shopStocks,s.additionalShops[0].shopStocks,s.virtualCompanies[0].inventory])"),inventories,'Repeated clocks do not duplicate the first purchase');
assert.equal(run("s.householdAccounts.reduce((n,f)=>n+householdDemandToday(f,trouserRow),0)"),33,'The full-day estimate retains purchases already made today');
run('s.day=2;settleHouseholdPurchases(5)');
assert.equal(run("s.householdAccounts.reduce((n,f)=>n+householdDemandToday(f,trouserRow),0)"),0,'Long-life products are not bought again the next day');
// A genuine new family buys its initial basket without resetting older families.
run("s.households=34;ensureHouseholdAccounts();s.householdAccounts[33].cash=100000;settleHouseholdPurchases(6)");
assert.equal(run("s.householdAccounts.reduce((sum,f)=>sum+(f.inventory.clothing_trousers||0),0)"),34,'One arriving family adds exactly one trouser purchase');
// Stock shortages retry the same day and spill over to another seller.
run("s.day=3;const f=s.householdAccounts[0];f.purchaseSchedule.clothing_trousers={minute:0,nextDay:3,quantity:1,remaining:1,intervalDays:56,initialPending:true};f.inventory.clothing_trousers=0;s.shopStocks.clothing_trousers=0;s.shopStock=0;s.additionalShops[0].shopStocks.clothing_trousers=0;s.additionalShops[0].shopStock=0;s.virtualCompanies[0].inventory.clothing_trousers=0;settleHouseholdPurchases(7)");
assert.equal(run('s.householdAccounts[0].inventory.clothing_trousers'),0);
run("s.additionalShops[0].shopStocks.clothing_trousers=1;s.additionalShops[0].shopStock=1;settleHouseholdPurchases(8)");
assert.equal(run('s.householdAccounts[0].inventory.clothing_trousers'),1,'Replenished branch stock satisfies the pending family on the same day');
assert.equal(run('s.additionalShops[0].shopStock'),0,'Branch active stock and SKU stock stay synchronized');
// Bakery cycles recur once per day, even with both clocks invoked.
run("s.day=4;s.shopType='bakery';s.shopProduct='bakery_bread';s.shopStock=1000;s.shopStocks={bakery_bread:1000};s.shopPrices={bakery_bread:.7};s.shopPrice=.7;s.additionalShops=[];s.virtualCompanies=[];s.households=33;s.householdAccounts=s.householdAccounts.slice(0,33);for(const family of s.householdAccounts){family.purchaseSchedule={};family.inventory={};family.cash=10000}settleHouseholdPurchases(9)");
assert.equal(run('s.shopStock'),934,'City buys exactly 66 breads');
run('settleContinuousShopSales(10)');assert.equal(run('s.shopStock'),934,'Continuous clock cannot sell extra breads');
run('consumeHouseholdDailyStock();s.day=5;settleHouseholdPurchases(11)');assert.equal(run('s.shopStock'),868,'Next day buys the next 66 breads');
// All basket lines start on arrival day, including electronics and building items.
run("const family=s.householdAccounts[0];family.purchaseSchedule={};for(const row of inflationBasketSpec){const schedule=householdSchedule(family,row);if(schedule.nextDay!==family.arrivedDay)throw Error(row.productId+' delayed initial purchase')}");
console.log('Household demand passed: 33 trousers, 66 daily breads, price competition, conserved city demand, no double sales, new families, replacement timing and same-day stock retries.');
// The user's population rule applies to every basket line, not only bread.
run('ensureVirtualCompanies=originalEnsureVirtualCompanies;householdGameDayProgress=()=>0');newGame();
run('s.households=35;ensureHouseholdAccounts();for(const family of s.householdAccounts){family.inventory={};family.purchaseSchedule={}}');
assert.equal(run("s.householdAccounts.reduce((n,f)=>n+householdDemandToday(f,householdBasketRow('bakery','bakery_bread')),0)"),70,'35 families need exactly 70 daily breads');
run("for(const row of inflationBasketSpec){const total=s.householdAccounts.reduce((n,f)=>n+householdDemandToday(f,row),0),expected=35*householdPurchaseCycle(row).quantity;if(Math.abs(total-expected)>1e-8)throw Error(row.productId+' does not scale with 35 families')}");
console.log('All basket products scale with family count; 35 families require exactly 70 breads.');
