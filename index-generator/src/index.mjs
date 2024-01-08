import {readdir} from "fs/promises"
import * as changeCase from "change-case";

const comp = (a,b,i) => a[i] < b[i] ? -1 : 1;

const groupBy = (xs, key) => xs.reduce((rv, x) => {
  (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
}, {});

const files = await readdir('data/', { recursive: true });

const parts = files.filter(f => f.endsWith('json')).map(f => [...f.split('/'), f]);
const useableParts = parts.map(p => p.map(a => a.endsWith('json')?a:changeCase.capitalCase(a)));
const named = useableParts.map(p => [
  p.filter(a => !a.endsWith('json')).join(" / "), 
  p.filter(a => !a.endsWith('json'))[0], 
  changeCase.capitalCase(p.filter(a => a.endsWith('json')).slice(-1)[0].split('.')[0].split('/').slice(-1)[0]),
  p[p.length - 1]
]).sort((a,b) => a[0] !== b[0] ? comp(a,b,0) : comp(a,b,1));
const groups = groupBy(named,1);
const printable = {};
Object.keys(groups).forEach(key => printable[key] = []);
Object.keys(groups).forEach(key => {
  printable[key] = groups[key].map(n => [n[0].substr(key.length+3) + ": " + n[2], n[3].split('.')[0]]);
});
const html = [`<div id="accordion">`];
Object.keys(printable).forEach(key => {
  html.push(`  <h3>${key}</h3>`);
  html.push("  <div>");
  printable[key].forEach(p => {
    html.push(`    <a href="${p[1]}">${p[0]}</a><br/>`);
  });
  html.push("  </div>");
});
html.push("</div>");
const href = html.join("\n");


const scripts = `  <link rel="stylesheet" href="assets/jquery-ui.min.css">\n  <link rel="stylesheet" href="assets/jquery-ui.theme.min.css">\n  <script src="assets/jquery/jquery.js"></script>\n  <script src="assets/jquery-ui.min.js"></script>\n  <script>$( function() { $( "#accordion" ).accordion({collapsible: true, heightStyle: "content"}); } );</script>`;
const header = `<html>\n<head>\n  <title>Corpora</title>\n${scripts}\n</head>\n<body>`;
const footer = "</body>\n</html>"

console.log(header);
console.log(href);
console.log(footer);
