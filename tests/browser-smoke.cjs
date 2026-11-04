const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const path=require('node:path'),fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox']});
 const page=await browser.newPage({viewport:{width:390,height:844}}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>d.accept());
 await page.goto('file://'+path.resolve('index.html'));
 await page.fill('#player','Fatih');await page.click('#start');
 await page.evaluate(()=>{householdGameDayProgress=()=>0;s.cash=100000;$('rentalSector').value='pastane';changeRentalSector();selectStreetFromStatus(1);$('shopNameInput').value='Fatih 1';rentShop();showTab('company');showCompanyView('shop')});
 await page.locator('.modern-product-card').first().waitFor();
 // Every actual catalog button routes from every street, as main shop or branch.
 const routes=await page.evaluate(()=>{
  let count=0;
  for(const [type,products] of Object.entries(productCatalog))for(const street of [1,2,3,4,5])for(const primary of [true,false]){
   s.shopRented=true;s.street=street;s.shopType=type;s.shopProduct=products[0].id;s.shopStocks={};s.shopPrices={};
   s.additionalShops=primary?[]:[{id:'browser-branch',name:'Fatih 2',street,type,productId:products[0].id,shopStocks:{},shopPrices:{}}];
   selectedCompanyShopId=primary?'main':'browser-branch';
   for(const product of products){
    showTab('company');showCompanyView('shop');
    document.querySelector('[data-order-product="'+product.id+'"]').click();
    if(marketViewProductId!==product.id||marketBrowseType!==type||supplierTargetShopId!==(primary?null:'browser-branch')||$('market').classList.contains('hidden'))throw Error('Wrong product route '+type+' '+street+' '+product.id);
    count++;
   }
  }return count;
 });assert.equal(routes,620);
 await page.evaluate(()=>{s.shopType='pastane';s.shopProduct='pastane_milk_dessert';s.shopStocks={pastane_milk_dessert:20};s.shopPrices={pastane_milk_dessert:3.1};s.street=1;s.additionalShops=[];selectedCompanyShopId='main';showTab('company');showCompanyView('shop')});
 const card=page.locator('[data-product-id="pastane_milk_dessert"]'),price=card.locator('input');
 await price.fill('2,85');await price.press('Enter');assert.equal(await price.inputValue(),'2.85');
 await card.locator('[data-catalog-price-step="0.1"]').click();assert.equal(await price.inputValue(),'2.95');
 await card.locator('[data-catalog-price-step="-0.1"]').click();assert.equal(await price.inputValue(),'2.85');
 assert.equal(await card.locator('.shop-catalog-forecast small').innerText(),'Günlük tahmin');
 fs.mkdirSync('test-results',{recursive:true});
 for(const width of [320,360,390,768]){
  await page.setViewportSize({width,height:900});await card.scrollIntoViewIfNeeded();
  const clipped=await card.evaluate(card=>[...card.querySelectorAll('input,button,b,strong,small')].filter(el=>el.getBoundingClientRect().width>0&&(el.scrollWidth>el.clientWidth+2||el.getBoundingClientRect().right>card.getBoundingClientRect().right+1)).map(el=>el.className+': '+el.textContent));
  assert.deepEqual(clipped,[],`No clipped card fields at ${width}px`);
  await card.screenshot({path:`test-results/modern-card-${width}.png`});
 }
 // The atlas is available locally, including when the browser is offline.
 await page.context().setOffline(true);
 assert.equal(await page.evaluate(()=>new Promise(resolve=>{const i=new Image;i.onload=()=>resolve(i.naturalWidth);i.onerror=()=>resolve(0);i.src='assets/products-v1.png'}))>0,true);
 await card.locator('.shop-catalog-order').click();
 await page.fill('#marketSearch','Gömlek');assert.ok(await page.locator('#marketSearchResults [data-market-product-open="clothing_tshirt"]').count());
 assert.deepEqual(errors,[]);
 console.log(`Browser passed: ${routes} real product-button routes, price edits and steppers, 320/360/390/768px cards, offline artwork, global search and no JavaScript errors.`);
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
