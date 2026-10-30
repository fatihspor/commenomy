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
for(const id of ['setup','game','stats','company','market','bank','state','produce','sell','borrow','repay','nextDay']){
 assert.match(web,new RegExp('id="'+id+'"'),'Missing game element: '+id);
}
assert.match(web,/if\(s\.stock\+10>s\.capacity\)/,'Warehouse limit guard missing');
assert.match(web,/if\(qty>s\.stock\)/,'Inventory sale guard missing');
assert.match(web,/if\(qty>s\.demand\)/,'Citizen demand guard missing');
assert.match(web,/if\(price>12\)/,'Citizen price limit guard missing');
console.log('PASS: synchronized Android assets, valid JavaScript, required screens and basic economy guards');
