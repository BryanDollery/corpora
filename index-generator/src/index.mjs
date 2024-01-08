import {readdir} from "fs/promises"
import * as changeCase from "change-case";

const files = await readdir('data/', { recursive: true });

const parts = files.filter(f => f.endsWith('json')).map(f => [...f.split('/'), f]);
const useableParts = parts.map(p => p.map(a => a.endsWith('json')?a:changeCase.capitalCase(a)));
const comp = (a,b,i) => a[i] < b[i] ? -1 : 1;
const named = useableParts.map(p => [
  p.filter(a => !a.endsWith('json')).join(" / "), 
  changeCase.capitalCase(p.filter(a => a.endsWith('json')).slice(-1)[0].split('.')[0].split('/').slice(-1)[0]), 
  p[p.length - 1]
]).sort((a,b) => a[0] !== b[0] ? comp(a,b,0) : comp(a,b,1));
const printable = named.map(n => [n[0]+" : "+n[1], n[2].split('.')[0]]);
const hrefA = printable.map(p => `  <a href="${p[1]}">${p[0]}</a><br/>`);
const href = hrefA.join("\n");
const header = "<html>\n<head>\n  <title>Corpora</title>\n</head>\n<body>";
const footer = "</body>\n</html>"
console.log(header);
console.log(href);
console.log(footer);
