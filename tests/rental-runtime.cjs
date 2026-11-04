const fs=require('node:fs'),vm=require('node:vm');
const assert=require('node:assert/strict');
const html=fs.readFileSync(process.env.GAME_HTML||'index.html','utf8');
class Element {
 constructor(id=''){this.id=id;this.value='';this.textContent='';this.children=[];this.dataset={};this.style={};this.classes=new Set();this.classList={add:(...a)=>a.forEach(x=>this.classes.add(x)),remove:(...a)=>a.forEach(x=>this.classes.delete(x)),contains:x=>this.classes.has(x),toggle:(x,v)=>{if(v??!this.classes.has(x))this.classes.add(x);else this.classes.delete(x)}}}
 set value(v){this._value=String(v)} get value(){return this._value||''}
 set innerHTML(v){this._html=v;this.children=[];if(this.tagName==='SELECT'){const opts=[...v.matchAll(/<option[^>]*value=["']([^"']*)["'][^>]*>/g)];if(!opts.some(x=>x[1]===this.value))this.value=opts[0]?.[1]||''}}
 get innerHTML(){return this._html||''}
 append(...x){this.children.push(...x)} appendChild(x){this.append(x);return x} replaceChildren(...x){this.children=x} setAttribute(){} removeAttribute(){} scrollIntoView(){} addEventListener(){} querySelectorAll(){return []} querySelector(){return null} closest(){return null} blur(){} focus(){}
}
const els=new Map();
for(const m of html.matchAll(/<(\w+)[^>]*\bid="([^"]+)"[^>]*>/g)){const el=new Element(m[2]);el.tagName=m[1].toUpperCase();el.value=m[0].match(/\bvalue="([^"]*)"/)?.[1]||'';els.set(el.id,el)}
for(const [id,v] of Object.entries({street:'1',rentalSector:'grocery',city:'İstanbul',player:'Fatih',zonePlanType:'industrial',zonePlanZone:'1 No’lu Cadde'}))els.get(id).value=v;
const data=new Map(),document={getElementById:id=>els.get(id)||null,createElement:tag=>Object.assign(new Element(),{tagName:tag.toUpperCase()}),querySelectorAll:()=>[],addEventListener(){},body:new Element()};
const ctx={document,console,Intl,Date,JSON,Math,localStorage:{getItem:k=>data.get(k)||null,setItem:(k,v)=>data.set(k,v),removeItem:k=>data.delete(k)},setTimeout:()=>0,clearTimeout(){},setInterval:()=>0,clearInterval(){},requestAnimationFrame:fn=>fn(),window:{confirm:()=>true,addEventListener(){},scrollTo(){},scrollY:0,scrollX:0},navigator:{},location:{},Event:class{},URLSearchParams};
vm.createContext(ctx);
vm.runInContext(html.match(/<script>([\s\S]*?)<\/script>/)[1],ctx);
const run=code=>vm.runInContext(code,ctx);
function newGame(){run("$('player').value='Fatih';start();s.cash=100000;selectedCompanyShopId='main'")}
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
