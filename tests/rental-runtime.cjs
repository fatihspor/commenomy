const assert=require('node:assert/strict');
const {run,ctx,els,data,newGame,html}=require('./runtime-harness.cjs');
const document=ctx.document;
function rent(type,street,name){
 run(`$('rentalSector').value=${JSON.stringify(type)};changeRentalSector();selectStreetFromStatus(${street});$('shopNameInput').value=${JSON.stringify(name)}`);
 const before=run(`streetVacancy(${street})`);
 assert.ok(before>0,`Test street ${street} has a vacancy before ${name} rental`);
 run('rentShop()');
 assert.equal(run(`streetVacancy(${street})`),before-1,'Rental consumes exactly one vacancy');
 assert.equal(Number(els.get('vacancyCount').textContent),before-1,'Top counter changes without tapping a street again');
 const row=els.get('streetAvailability').children[street-1];
 assert.equal(row.children[1].textContent.split(' / ')[0],String(before-1),'Street summary changes without another tap');
 assert.equal(els.get('vacancyMetric').classList.contains('full'),before===1,'Counter color follows availability');
 assert.equal(els.get('rentShop').disabled,before===1,'Rental button follows availability');
 const saved=JSON.parse(data.get('commenomy-demo-v2'));
 assert.ok(saved.shopRented,'Rental is persisted');
 return before;
}
newGame();assert.equal(rent('grocery',1,'Fatih 1'),1,'Reported Street 1 scenario starts with one vacancy');
assert.equal(run('streetVacancy(1)'),0,'Reported Street 1 scenario ends at zero');
let primary=0,branches=0;
const types=run('Object.keys(productCatalog)');
for(const type of types)for(const street of [1,2,3,4,5]){
 if(!run(`shopTypeAllowed(${JSON.stringify(type)},streets[${street}].area)`))continue;
 newGame();run('for(const street of Object.values(streets))street.occupied=0');rent(type,street,`${type} primary ${street}`);primary++;
 newGame();run('for(const street of Object.values(streets))street.occupied=0');rent('grocery',2,'Main shop');
 if(street===2)continue;
 rent(type,street,`${type} branch ${street}`);branches++;
}
console.log(`Rental runtime tests passed: reported Street 1 scenario, ${primary} primary rentals and ${branches} branch rentals; both indicators, colors, button state and persisted state checked.`);
newGame();run('s.households=40;render()');
assert.equal(els.get('basketPopulation').textContent,'120 kişi','Population shows all three family members');
run('s.households=50;render()');
assert.equal(els.get('basketPopulation').textContent,'150 kişi','Population updates during normal render without a tab change');
run('s.households=40;render()');
assert.equal(els.get('basketPopulation').textContent,'120 kişi','Population follows current household state');
assert.ok(!els.has('basketWeeklyInflation'),'Weekly price-change card has been replaced');
run("s.shopRented=true;s.street=1;s.additionalShops=[{id:'test-branch',street:5,type:'market'}];s.factorySizes=[40];s.warehouseSizes=[20];s.households=30;render()");
assert.equal(run('workforceData().shop'),3,'20 m² main shop has one worker; 60 m² branch has two');
assert.equal(run('workforceData().factory'),2,'40 m² factory has two workers');
assert.equal(run('workforceData().warehouse'),1,'20 m² warehouse has one worker');
assert.equal(run('workforceData().player'),6,'All player workplaces contribute to employment');
assert.equal(run('workforceData().government'),4,'Public staffing follows private employment');
assert.equal(run('s.households'),40,'New workers bring families until all jobs have a household');
assert.equal(els.get('basketPopulation').textContent,'120 kişi','Live population matches the workforce-driven household total');
const accountCount=run('s.householdAccounts.length');
run('render();render()');
assert.equal(run('s.households'),40,'Repeated renders do not create extra families');
assert.equal(run('s.householdAccounts.length'),accountCount,'Repeated renders do not create duplicate household accounts');
console.log('Population and workforce integration tests passed.');
function descendant(root,predicate){for(const child of root.children){if(predicate(child))return child;const found=descendant(child,predicate);if(found)return found}return null}
let manualPrices=0;
for(const type of run('Object.keys(productCatalog)'))for(const primary of [true,false]){
 newGame();
 ctx.priceType=type;ctx.isPrimary=primary;
 run("s.shopRented=true;s.street=5;s.shopType=isPrimary?priceType:'grocery';s.shopProduct=defaultProductId(s.shopType);s.additionalShops=isPrimary?[]:[{id:'manual-branch',name:'Manual test',type:priceType,street:5,productId:defaultProductId(priceType)}];selectedCompanyShopId=isPrimary?'main':'manual-branch';renderShopCatalog()");
 for(const card of els.get('shopCatalogCards').children){
  const input=descendant(card,x=>x.tagName==='INPUT'&&x.dataset.catalogPrice);
  assert.ok(input&&!input.readOnly&&!input.disabled,'Each product has an editable price');
  const id=input.dataset.catalogPrice;input.value='2,85';input.oninput({stopPropagation(){}});
  let saved=JSON.parse(data.get('commenomy-demo-v2'));
  assert.equal((primary?saved:saved.additionalShops[0]).shopPrices[id],2.85,'Manual comma-decimal price survives saving');
  input.value='3.25';input.oninput({stopPropagation(){}});
  saved=JSON.parse(data.get('commenomy-demo-v2'));
  assert.equal((primary?saved:saved.additionalShops[0]).shopPrices[id],3.25,'Manual dot-decimal price survives saving');
  input.value='';input.oninput({stopPropagation(){}});
  saved=JSON.parse(data.get('commenomy-demo-v2'));
  assert.equal((primary?saved:saved.additionalShops[0]).shopPrices[id],3.25,'Clearing while typing preserves the last valid price');
  const plus=descendant(card,x=>x.tagName==='BUTTON'&&x.textContent==='+');
  const minus=descendant(card,x=>x.tagName==='BUTTON'&&x.textContent==='−');
  const click={preventDefault(){},stopPropagation(){}};
  plus.onclick(click);
  saved=JSON.parse(data.get('commenomy-demo-v2'));
  assert.equal((primary?saved:saved.additionalShops[0]).shopPrices[id],3.35,'Plus still works after manual entry');
  minus.onclick(click);
  saved=JSON.parse(data.get('commenomy-demo-v2'));
  assert.equal((primary?saved:saved.additionalShops[0]).shopPrices[id],3.25,'Minus still works after manual entry');
  manualPrices++;
 }
}
console.log(`Manual price entry passed for ${manualPrices} product/shop combinations across all seven sectors.`);
let stableInputs=0;
ctx.window.scrollTo=(x,y)=>{ctx.window.scrollX=x;ctx.window.scrollY=y};
for(const type of run('Object.keys(productCatalog)'))for(const primary of [true,false]){
 newGame();ctx.priceType=type;ctx.isPrimary=primary;
 run("shopPriceEditSession=null;s.shopRented=true;s.street=5;s.shopType=isPrimary?priceType:'grocery';s.shopProduct=defaultProductId(s.shopType);s.additionalShops=isPrimary?[]:[{id:'scroll-branch',type:priceType,street:5,productId:defaultProductId(priceType)}];selectedCompanyShopId=isPrimary?'main':'scroll-branch';renderShopCatalog()");
 const productIds=run('productCatalog[priceType].map(p=>p.id)');
 for(const id of productIds){
  const input=descendant(els.get('shopCatalogCards'),x=>x.tagName==='INPUT'&&x.dataset.catalogPrice===id);
  const anchor=650+stableInputs;ctx.window.scrollX=0;ctx.window.scrollY=anchor;
  input.focus=options=>{assert.equal(options.preventScroll,true);document.activeElement=input;input.onfocus()};
  input.blur=()=>{document.activeElement=null;input.onblur()};
  input.onpointerdown({button:0,preventDefault(){}});
  assert.equal(ctx.window.scrollY,anchor,'Focusing a price preserves the product position');
  const before=els.get('shopCatalogCards').children[0];
  run('renderShopCatalog()');
  assert.equal(els.get('shopCatalogCards').children[0],before,'Background updates do not replace a focused price input');
  ctx.window.scrollY=0;input.value='4,50';input.oninput({stopPropagation(){}});
  assert.equal(ctx.window.scrollY,anchor,'Typing restores the same product position');
  ctx.window.scrollY=0;input.onkeydown({key:'Enter',preventDefault(){}});
  assert.equal(ctx.window.scrollY,anchor,'Confirming and blurring keep the same product position');
  assert.equal(run('shopPriceEditSession'),null,'Editing session ends after confirmation');
  stableInputs++;
 }
}
console.log(`Scroll/focus handler tests passed for ${stableInputs} product/shop combinations. Android keyboard behavior still requires device verification.`);
for(const [value,expected] of [[0,'0,00'],[0.4,'0,40'],[0.006,'0,01'],[2,'2,00'],[70,'70,00'],[1.236,'1,24']]){
 ctx.testQuantity=value;assert.equal(run('salesQuantity(testQuantity)'),expected,'All sales estimates retain exactly two decimals');
}
newGame();
run("s.shopRented=true;s.street=1;s.additionalShops=[{id:'forecast-clothes',type:'clothing',street:3,productId:'clothing_trousers'}];selectedCompanyShopId='forecast-clothes';renderShopCatalog()");
const forecastShop=run('shopLocations().find(shop=>shop.id===selectedCompanyShopId)');ctx.forecastShop=forecastShop;
run("for(const company of s.virtualCompanies)if(company.types.includes('clothing'))company.inventory.clothing_trousers=100");
const lowForecast=run("forecastStoreProductDailySales(forecastShop,'clothing_trousers',5)");
const highForecast=run("forecastStoreProductDailySales(forecastShop,'clothing_trousers',50)");
assert.ok(lowForecast>0&&lowForecast<=run('s.households'),'First-day clothing demand includes the initial family purchase');
assert.ok(lowForecast>highForecast,'Branch clothing forecast responds to its product price');
console.log('Two-decimal formatting and fractional price-sensitive branch forecasts passed.');
