const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const html = fs.readFileSync('index.html', 'utf8');
const asset = fs.readFileSync('app/src/main/assets/index.html', 'utf8');
const gradle = fs.readFileSync('app/build.gradle', 'utf8');
assert.equal(html, asset, 'Web and Android assets must match');
assert.match(gradle, /versionCode\s+19[\s\S]*versionName\s+'1\.1\.3'/, 'APK version must be 1.1.3');
const js = html.match(/<script>([\s\S]*?)<\/script>/i)?.[1];
assert.ok(js, 'App script exists');
new vm.Script(js);
for (const marker of ['function ensureVirtualFamilies()', 'function settleVirtualFamilyShopping(', 'function scheduleVirtualFamilyShopping()', 'function familyInflationRate()', 'familyBasket']) {
  assert.ok(js.includes(marker), `Missing family simulation component: ${marker}`);
}
for (const product of ['grocery_water', 'grocery_eggs', 'grocery_milk', 'market_banana', 'market_cucumber', 'pastane_baklava', 'manav', 'pastane_profiterole']) {
  assert.ok(js.includes(product), `Missing family basket product: ${product}`);
}
const catalogStart = js.indexOf('const productCatalog=');
const simulationStop = js.indexOf('function simulateVirtualCompanies()', catalogStart);
assert.ok(catalogStart >= 0 && simulationStop > catalogStart);
const cityProfilesStart = js.indexOf('const virtualCompanyProfiles=');
const cityProfilesStop = js.indexOf('function ensureVirtualCompanies()', cityProfilesStart);
assert.ok(cityProfilesStart >= 0 && cityProfilesStop > cityProfilesStart);
const setup = js.slice(catalogStart, cityProfilesStop);
const context = {
  s: { households: 6, day: 1, city: 'İstanbul', virtualJobs: 6, governmentJobs: 0, shopRented: false, shopStocks: {}, shopPrices: {}, cash: 0, totalSalesUnits: 0, totalSalesRevenue: 0 },
  workforceData: () => ({ total: 6 }),
  gameDayDurationMs: () => 86_400_000,
  Date, Math, Array, Object, Number, String
};
vm.createContext(context);
vm.runInContext(setup + `
function ensureVirtualCompanies(){
  if(!Array.isArray(s.virtualCompanies)) s.virtualCompanies=virtualCompanyProfiles.map(c=>({...c,active:true,inventory:Object.fromEntries(c.types.flatMap(type=>(productCatalog[type]||[]).map(p=>[p.id,24]))),dailySales:0,lastDailySales:0}));
}
ensureVirtualFamilies(); ensureVirtualCompanies();
this.settle=(now)=>settleVirtualFamilyShopping(now);
this.supplyPrice=()=>familySellerOptions(familyBasket.find(r=>r.id==='bakery_bread'),familySku('bakery_bread'))[0].price;
this.basketCpi=()=>familyInflationRate();`, context);
const now = Date.now();
context.s.familyShoppingLastAt = now - 8 * 86_400_000;
const unitsBought = context.settle(now);
assert.equal(context.s.virtualFamilies.length, 6, 'One shopping record per family');
assert.ok(unitsBought > 0, 'Families make purchases from stocked sellers');
assert.ok(context.s.lastFamilyPurchaseHours.filter(n => n > 0).length > 1, 'Purchases are distributed through the day');
assert.ok(Number.isFinite(context.basketCpi().rate), 'Basket inflation is numeric');
const regularCpi = context.basketCpi().rate;
for (const store of context.s.virtualCompanies) store.priceFactor = 1.8;
assert.ok(context.basketCpi().rate > regularCpi, 'Competitor price changes affect the common basket inflation rate');
for (const store of context.s.virtualCompanies) store.priceFactor = 1;
const lowStockPrice = context.supplyPrice();
const catalog = vm.runInContext('productCatalog', context);
for (const store of context.s.virtualCompanies) for (const type of store.types) for (const product of catalog[type] || []) store.inventory[product.id] = 100_000;
const highStockPrice = context.supplyPrice();
assert.ok(lowStockPrice > highStockPrice, 'Lower citywide stock raises retail prices');
console.log('1.1.3 family demand, purchase timing, stock-sensitive prices and APK-version checks passed');
