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
assert.match(web,/id="land"/,'My Lands screen missing');
assert.doesNotMatch(web,/s\.lands>=3/,'Land ownership must not have a fixed player cap');
assert.match(web,/s\.landSupply<=0/,'Land sales must respect state supply');
assert.match(web,/s\.day%7===0/,'State must release land periodically');
assert.match(web,/id="saveLandPlan"/,'Government land policy editor missing');
assert.match(web,/function saveLandPlan\(/,'Government land policy save handler missing');
assert.match(web,/s\.cash<0/,'Negative balance warning missing');
assert.match(web,/gün kaldı/,'Construction countdown missing');
assert.match(web,/USD/,'USD currency display missing');
assert.match(web,/factoryWages=s\.factorySizes\.reduce/,'Capacity-scaled factory wages missing');
assert.match(web,/warehouseWages=s\.warehouseSizes\.reduce/,'Capacity-scaled warehouse wages missing');
assert.match(web,/id="buildFactory"/,'Factory construction button missing');
assert.match(web,/s\.dailyProduced\+10>s\.factoryCapacity/,'Daily production limit missing');
const nodes=new Map();
function node(id){if(!nodes.has(id)){let value='';nodes.set(id,{get value(){return value},set value(v){value=String(v)},textContent:'',innerHTML:'',classList:{add(){},remove(){},toggle(){}},replaceChildren(){},onclick:null})}return nodes.get(id)}
const storage=new Map();
const context={console,Intl,Number,Math,JSON,String,localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)},document:{getElementById:node,querySelectorAll:()=>[],createElement:()=>({textContent:'',classList:{add(){},remove(){},toggle(){}}})},alert:()=>{},confirm:()=>true};
vm.createContext(context);vm.runInContext(script[1],context);
node('player').value='TestOyuncu';node('city').value='İstanbul';node('landType').value='industrial';
context.start();
assert.equal(JSON.parse(storage.get('commenomy-demo-v2')).cash,500);
context.buildWarehouse();
assert.equal(JSON.parse(storage.get('commenomy-demo-v2')).capacity,10,'Warehouse cannot be built without land');
context.buyLand();
assert.equal(JSON.parse(storage.get('commenomy-demo-v2')).lands,1);
assert.equal(JSON.parse(storage.get('commenomy-demo-v2')).landSupply,2);
node('warehouseSize').value='20';
context.buildWarehouse();
let state=JSON.parse(storage.get('commenomy-demo-v2'));
assert.equal(state.capacity,10);
assert.equal(state.warehouses,0);
assert.equal(state.construction.length,1);
assert.equal(state.construction[0].size,20);
assert.equal(state.cash,150);
context.buildWarehouse();
assert.equal(JSON.parse(storage.get('commenomy-demo-v2')).construction.length,1,'Same land must not support a second construction');
context.nextDay();
assert.equal(JSON.parse(storage.get('commenomy-demo-v2')).capacity,10,'Construction must not finish early');
context.nextDay();
assert.equal(JSON.parse(storage.get('commenomy-demo-v2')).capacity,30,'Construction completes after two days');
const beforeIdleDay=JSON.parse(storage.get('commenomy-demo-v2')).cash;
context.nextDay();
assert.equal(JSON.parse(storage.get('commenomy-demo-v2')).cash,beforeIdleDay-3,'Empty warehouse must charge wages each day');
context.produce();
assert.equal(JSON.parse(storage.get('commenomy-demo-v2')).stock,10);
node('qty').value='10';node('price').value='8';context.sell();
state=JSON.parse(storage.get('commenomy-demo-v2'));
assert.equal(state.stock,0);
assert.equal(state.cash,187);
context.produce();
assert.equal(JSON.parse(storage.get('commenomy-demo-v2')).stock,0,'Daily factory limit must block extra production');
context.nextDay();context.produce();
assert.equal(JSON.parse(storage.get('commenomy-demo-v2')).stock,10,'Daily factory capacity resets next day');
assert.match(vm.runInContext('money(25)',context),/USD/,'Currency formatter must show USD');
console.log('PASS: gameplay flow land -> warehouse -> production -> sale');
console.log('PASS: synchronized Android assets, valid JavaScript, required screens and basic economy guards');


// Adversarial economy checks: invalid input must not mint cash or goods.
function snapshot(){return JSON.stringify(JSON.parse(storage.get('commenomy-demo-v2')))}
function unchanged(action,description){const before=snapshot();action();assert.equal(snapshot(),before,description)}
node('qty').value='-10';node('price').value='8';
unchanged(()=>context.sell(),'Negative quantity must not create money');
node('qty').value='1.5';
unchanged(()=>context.sell(),'Fractional quantity must be rejected');
node('qty').value='Infinity';
unchanged(()=>context.sell(),'Infinite quantity must be rejected');
node('qty').value='10';node('price').value='Infinity';
unchanged(()=>context.sell(),'Infinite price must be rejected');
node('price').value='0';
unchanged(()=>context.sell(),'Zero price must be rejected');
node('price').value='1000';
unchanged(()=>context.sell(),'Excessive price must be rejected');
node('price').value='8';node('qty').value='999';
unchanged(()=>context.sell(),'Cannot sell more inventory than owned');
const beforeInvalidPlan=snapshot();
node('planIndustrial').value='-1';
context.saveLandPlan();
assert.equal(snapshot(),beforeInvalidPlan,'Negative government land supply rejected');
node('planIndustrial').value='1.5';
context.saveLandPlan();
assert.equal(snapshot(),beforeInvalidPlan,'Fractional government land supply rejected');
node('planIndustrial').value='2';
context.start(); // Isolate land purchase with sufficient initial funds.
const beforeSecondLand=JSON.parse(storage.get('commenomy-demo-v2'));
context.buyLand();
assert.equal(JSON.parse(storage.get('commenomy-demo-v2')).lands,beforeSecondLand.lands+1);
const afterLand=JSON.parse(storage.get('commenomy-demo-v2'));
assert.equal(afterLand.cash,350,'First land purchase must debit 150');
context.buyLand();
context.buyLand();
const exhausted=JSON.parse(storage.get('commenomy-demo-v2'));
assert.equal(exhausted.lands,3,'Three initial state parcels can be bought');
assert.equal(exhausted.cash,50,'Three parcels must cost 450 in total');
unchanged(()=>context.buyLand(),'Fourth parcel must be rejected after state supply is exhausted');
storage.delete('commenomy-demo-v2');
context.start(); // Fresh funded company for the independent loan scenario.
const beforeLoan=JSON.parse(storage.get('commenomy-demo-v2'));
context.borrow();
const afterLoan=JSON.parse(storage.get('commenomy-demo-v2'));
assert.equal(afterLoan.loan,100,'Loan principal must be recorded');
assert.equal(afterLoan.cash,beforeLoan.cash+100,'Loan disbursement must match principal');
unchanged(()=>context.borrow(),'Cannot take overlapping loans');
context.repay();
const afterRepay=JSON.parse(storage.get('commenomy-demo-v2'));
assert.equal(afterRepay.loan,0,'Loan repayment clears principal');
assert.equal(afterRepay.cash,beforeLoan.cash,'Loan borrowing and repayment cannot mint cash');
for(let day=0;day<100;day++){
  context.nextDay();
  const st=JSON.parse(storage.get('commenomy-demo-v2'));
  assert.ok(Number.isFinite(st.cash)&&Number.isFinite(st.loan),'Non-finite economy balance');
  assert.ok(Number.isInteger(st.stock)&&st.stock>=0&&st.stock<=st.capacity,'Inventory bounds');
  assert.ok(st.loan>=0&&st.lands>=0&&st.landSupply>=0,'Nonnegative assets and obligations');
  assert.equal(st.landSupply,Object.values(st.landSupplyByType).reduce((a,b)=>a+b,0),'State land supply consistency');
}
console.log('PASS: 100-day simulation, credit repayment invariants, invalid-sale and land-policy abuse checks');


// Long-run active economy: repeat production and citizen sales across 365 game days.
context.start();
node('qty').value='10';node('price').value='8';
for(let day=1;day<=365;day++){
  context.produce();
  let st=JSON.parse(storage.get('commenomy-demo-v2'));
  assert.equal(st.stock,10,'Production must add exactly 10 units on day '+day);
  assert.equal(st.dailyProduced,10,'Daily factory limit must be consumed on day '+day);
  unchanged(()=>context.produce(),'Factory must reject second production on day '+day);
  context.sell();
  st=JSON.parse(storage.get('commenomy-demo-v2'));
  assert.equal(st.stock,0,'Sale must consume inventory on day '+day);
  assert.equal(st.demand,20,'Citizen demand must fall by exactly 10 on day '+day);
  assert.equal(st.cash,500+40*day,'Net revenue must be conserved on day '+day);
  if(day<365)context.nextDay();
}
console.log('PASS: 365-day active economy; no inventory duplication, daily production or revenue drift');
