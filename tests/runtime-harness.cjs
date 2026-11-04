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

module.exports={run,ctx,els,data,newGame,html,Element};
