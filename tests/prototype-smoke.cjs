const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync('index.html','utf8');
assert.equal(html,fs.readFileSync('app/src/main/assets/index.html','utf8'),'Android assets must match');
const js=html.match(/<script>([\s\S]*?)<\/script>/i)?.[1];assert.ok(js);
new vm.Script(js);
for(const id of ['setup','game','company','market','land','bank','state','street','rentShop','competitionInfo','streetAvailability','salesForecast'])assert.ok(html.includes('id="'+id+'"'),id);
const nodes=new Map(),store=new Map(),alerts=[];
function el(id){if(!nodes.has(id)){let v='';nodes.set(id,{get value(){return v},set value(x){v=String(x)},disabled:false,textContent:'',innerHTML:'',classList:{add(){},remove(){},toggle(){}},replaceChildren(){}})}return nodes.get(id)}
const c={console,Intl,Number,Math,JSON,String,localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v),removeItem:k=>store.delete(k)},document:{getElementById:el,querySelectorAll:()=>[],createElement:()=>({textContent:''})},alert:m=>alerts.push(m),confirm:()=>true};vm.createContext(c);vm.runInContext(js,c);
const state=()=>JSON.parse(store.get('commenomy-demo-v2'));
el('player').value='Deneme';el('city').value='İstanbul';el('street').value='1';c.start();
assert.equal(state().cash,500);
assert.equal(vm.runInContext('streetVacancy(1)',c),0,'Prestige street initially full');
c.rentShop();assert.equal(state().shopRented,false,'Cannot rent full street');
el('street').value='5';c.rentShop();assert.equal(state().shopRented,true);assert.equal(state().cash,475);assert.equal(state().street,5);
c.produce();assert.equal(state().stock,10);assert.equal(state().cash,455);assert.equal(state().shopStock,0);el('transferQty').value='10';c.transferToShop();assert.equal(state().stock,0);assert.equal(state().shopStock,10);
el('price').value='8';el('qty').value='10';const before=state().cash;c.sell();assert.ok(state().cash>=before);assert.ok(state().shopStock>=0&&state().shopStock<=10);
assert.ok(vm.runInContext('streetVacancy(5)',c)>=0);
for(let i=0;i<28;i++){c.nextDay();assert.ok(Number.isFinite(state().cash));assert.ok(state().stock>=0);assert.ok(state().lands>=0)}
assert.ok(state().shopNextRent>=8);
console.log('PASS: JavaScript syntax, synchronized Android assets, shop vacancy, street rental, production, competition sales, 28-day simulation');
