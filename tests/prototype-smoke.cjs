// Commenomy offline prototype smoke checks. Run: node tests/prototype-smoke.cjs
const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const web=fs.readFileSync('index.html','utf8');
const android=fs.readFileSync('app/src/main/assets/index.html','utf8');
assert.equal(web,android,'Android APK must bundle the current web prototype');
const script=web.match(/<script>([\s\S]*?)<\/script>/i);
assert.ok(script,'Inline game logic must exist');
new vm.Script(script[1],{filename:'index.html'});
for(const id of ['setup','game','stats','company','land','market','bank','state','produce','sell','borrow','repay','nextDay']){
 assert.match(web,new RegExp('id="'+id+'"'),'Missing game element: '+id);
}
assert.match(web,/if\(s\.stock\+10>s\.capacity\)/,'Warehouse limit guard missing');
assert.match(web,/if\(qty>s\.stock\)/,'Inventory sale guard missing');
assert.match(web,/if\(qty>s\.demand\)/,'Citizen demand guard missing');
assert.match(web,/if\(price>12\)/,'Citizen price limit guard missing');
assert.match(web,/if\\(s\\.lands<=s\\.warehouses\\)/,'Warehouse construction must require unused land');
assert.match(web,/id="land"/,'My Lands screen missing');
const nodes=new Map();
function node(id){if(!nodes.has(id))nodes.set(id,{value:'',textContent:'',innerHTML:'',classList:{add(){},remove(){},toggle(){}},replaceChildren(){},onclick:null});return nodes.get(id)}
const storage=new Map();
const context={console,Intl,Number,Math,JSON,String,localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)},document:{getElementById:node,querySelectorAll:()=>[]},alert:()=>{},confirm:()=>true};
vm.createContext(context);vm.runInContext(script[1],context);
node('player').value='TestOyuncu';node('city').value='İstanbul';
context.start();
assert.equal(JSON.parse(storage.get('commenomy-demo-v2')).cash,500);
context.buildWarehouse();
assert.equal(JSON.parse(storage.get('commenomy-demo-v2')).capacity,10,'Warehouse cannot be built without land');
context.buyLand();
assert.equal(JSON.parse(storage.get('commenomy-demo-v2')).lands,1);
context.buildWarehouse();
let state=JSON.parse(storage.get('commenomy-demo-v2'));
assert.equal(state.capacity,30);
assert.equal(state.warehouses,1);
assert.equal(state.cash,150);
context.buildWarehouse();
assert.equal(JSON.parse(storage.get('commenomy-demo-v2')).capacity,30,'Same land must not support a second warehouse');
context.produce();
assert.equal(JSON.parse(storage.get('commenomy-demo-v2')).stock,10);
node('qty').value='10';node('price').value='8';context.sell();
state=JSON.parse(storage.get('commenomy-demo-v2'));
assert.equal(state.stock,0);
assert.equal(state.cash,190);
console.log('PASS: gameplay flow land -> warehouse -> production -> sale');
console.log('PASS: synchronized Android assets, valid JavaScript, required screens and basic economy guards');
