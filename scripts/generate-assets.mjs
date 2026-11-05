import sharp from 'sharp';
import gifenc from 'gifenc';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const { GIFEncoder, quantize, applyPalette } = gifenc;
const dir = new URL('../public/images/', import.meta.url);
await mkdir(dir, { recursive: true });
const svg = (body, w = 960, h = 640) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="blue" x1="0" y1="1" x2="1" y2="0"><stop stop-color="#102254"/><stop offset=".3" stop-color="#1d49dc"/><stop offset=".6" stop-color="#769dff"/><stop offset=".8" stop-color="#b6cfff"/><stop offset="1" stop-color="#1d3d9c"/></linearGradient><radialGradient id="glow"><stop stop-color="#2147ba" stop-opacity=".3"/><stop offset="1" stop-color="#080c14" stop-opacity="0"/></radialGradient><linearGradient id="panel" x2="1" y2="1"><stop stop-color="#17233b"/><stop offset="1" stop-color="#0c1424"/></linearGradient><filter id="shadow"><feDropShadow dx="0" dy="20" stdDeviation="20" flood-opacity=".5"/></filter></defs>${body}</svg>`;
const text = (x,y,t,size=12,color='#8798b8',extra='') => `<text x="${x}" y="${y}" fill="${color}" font-size="${size}" font-family="Arial,sans-serif" ${extra}>${t}</text>`;
const rect = (x,y,w,h,fill='#111b2e',r=8,stroke='#ffffff0e') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}"/>`;
async function webp(name, markup) { await sharp(Buffer.from(markup)).webp({ quality: 88 }).toFile(fileURLToPath(new URL(name, dir))); }
function point(u,v) {
  let x=(228+85*Math.cos(v))*Math.cos(u), y=(228+85*Math.cos(v))*Math.sin(u), z=85*Math.sin(v);
  const yy=y*Math.cos(.94)-z*Math.sin(.94), zz=y*Math.sin(.94)+z*Math.cos(.94);
  y=yy;z=zz; const xx=x*Math.cos(-.38)-y*Math.sin(-.38);y=x*Math.sin(-.38)+y*Math.cos(-.38);x=xx;
  const p=1150/(1150-z); return [500+x*p*1.19,500+y*p*1.19,z];
}
let lines=[];
for(let i=0;i<105;i++){
  const u=i/105*Math.PI*2, pts=[];let z=0;
  for(let j=0;j<=96;j++){const p=point(u,j/96*Math.PI*2);pts.push(`${p[0].toFixed(2)},${p[1].toFixed(2)}`);z+=p[2];}
  lines.push({z:z/97,markup:`<polyline points="${pts.join(' ')}" fill="none" stroke="url(#blue)" stroke-width="${i%5===0?1.6:.95}" opacity="${.4+(.5+.5*Math.sin(u))*.55}"/>`});
}
for(let i=0;i<42;i++){
  const v=i/42*Math.PI*2,pts=[];let z=0;
  for(let j=0;j<=190;j++){const p=point(j/190*Math.PI*2,v);pts.push(`${p[0].toFixed(2)},${p[1].toFixed(2)}`);z+=p[2];}
  lines.push({z:z/191,markup:`<polyline points="${pts.join(' ')}" fill="none" stroke="url(#blue)" stroke-width=".75" opacity=".6"/>`});
}
lines.sort((a,b)=>a.z-b.z);
const orbit=svg(`<ellipse cx="510" cy="520" rx="440" ry="380" fill="url(#glow)"/>${lines.map(l=>l.markup).join('')}`,1000,1000);
await webp('data-orbit.webp',orbit);

let nexus=`<rect width="960" height="640" fill="#0a1120"/><ellipse cx="500" cy="350" rx="580" ry="400" fill="url(#glow)"/><g transform="translate(103 92) rotate(-5 380 230)" filter="url(#shadow)">${rect(0,0,760,465,'#10192a',12,'#354664')}${rect(0,0,148,465,'#0d1524',12)}${text(24,40,'nexus',23,'#ecf2ff','font-weight="bold"')}${text(89,40,'/',23,'#527bff')}${text(24,65,'COMMERCE PLATFORM',7,'#536685')}`;
['Visão geral','Pedidos','Produtos','Clientes','Integrações'].forEach((t,i)=>{nexus+=i===0?rect(12,102+i*39,124,31,'#243d78',5):'';nexus+=text(28,122+i*39,t,10,i===0?'#c4d5ff':'#7f91ae');});
nexus+=text(174,40,'Visão geral',17,'#e7eeff')+text(174,64,'Tudo conectado. Tudo sob controle.',9)+rect(639,24,94,29,'#527bff',5)+text(655,43,'+ Novo pedido',9,'#fff');
[['Receita total','R$ 24.580','+12,8%'],['Pedidos','1.204','+8,2%'],['Ticket médio','R$ 204,15','+4,3%']].forEach((a,i)=>{const x=174+i*190;nexus+=rect(x,87,176,91,'#152038',6)+text(x+14,110,a[0],9)+text(x+14,140,a[1],23,'#dfe9ff')+text(x+14,161,a[2],8,'#70bda5');});
nexus+=rect(174,195,556,143,'#121d32',6)+text(190,218,'Atividade de vendas',10,'#c1cde6');
for(let i=0;i<25;i++){let h=20+Math.sin(i*.5)*17+i*2.4;nexus+=rect(194+i*20.5,316-h,9,h,i>19?'#6c93ff':'#2c4d9b',2);}
nexus+=text(175,368,'Pedidos recentes',11,'#c1cde6');
for(let i=0;i<3;i++){nexus+=rect(174,383+i*22,556,1,'#ffffff0c',0)+text(190,398+i*22,`#00${428-i}     Pedido recebido`,8)+text(490,398+i*22,'Processado',8,'#6aad96')+text(650,398+i*22,`R$ ${239+i*83},00`,8,'#bccce7');}
nexus+='</g>';
await webp('nexus.webp',svg(nexus));

let pulse=`<rect width="960" height="640" fill="#0b1020"/><ellipse cx="500" cy="350" rx="550" ry="350" fill="url(#glow)"/><g transform="translate(95 95) rotate(4 385 225)" filter="url(#shadow)">${rect(0,0,770,455,'#0e1728',12,'#304362')}${text(25,40,'◉',23,'#668dff')}${text(58,39,'pulse',23,'#e5edff','font-weight="bold"')}${text(510,37,'● All systems operational',10,'#82bca9')}${rect(0,62,770,1,'#ffffff12',0)}${text(25,98,'Infrastructure overview',16,'#dae6ff')}${text(25,120,'Real-time insights. Better decisions.',9)}`;
[['API Gateway','24 ms'],['Database','8 ms'],['Message broker','12 ms']].forEach((a,i)=>{const x=25+i*245;pulse+=rect(x,143,230,85,'#131f35',6)+text(x+14,166,a[0],10)+text(x+14,201,a[1],25,'#d5e4ff')+text(x+150,200,'● Healthy',8,'#70bba0');});
pulse+=rect(25,246,476,177,'#111d31',6)+text(42,270,'Response time',11,'#bacbe6');
for(let i=0;i<4;i++)pulse+=`<path d="M42 ${295+i*29}H483" stroke="#ffffff09"/>`;
let points=Array.from({length:70},(_,i)=>`${42+i*6.35},${358-Math.sin(i*.17)*15-Math.sin(i*1.7)*7-(i>36&&i<43?38:0)}`).join(' ');
pulse+=`<polyline points="${points}" stroke="#668fff" fill="none" stroke-width="2.5"/>`;
pulse+=rect(519,246,226,177,'#111d31',6)+text(536,270,'Uptime',11,'#bacbe6')+`<circle cx="631" cy="340" r="48" stroke="#223454" stroke-width="7" fill="none"/><circle cx="631" cy="340" r="48" stroke="#668fff" stroke-width="7" fill="none" stroke-dasharray="297 305" transform="rotate(-90 631 340)"/>`+text(597,345,'99.98%',20,'#dce9ff')+text(608,362,'LAST 30 DAYS',6)+'</g>';
await webp('pulse.webp',svg(pulse));

let flow=`<rect width="960" height="640" fill="#0a1120"/>`;
for(let x=30;x<960;x+=27)for(let y=20;y<640;y+=27)flow+=`<circle cx="${x}" cy="${y}" r=".6" fill="#3b527a" opacity=".45"/>`;
flow+=`<ellipse cx="480" cy="340" rx="500" ry="300" fill="url(#glow)"/>${text(65,83,'flow',26,'#e1ebff','font-weight="bold"')}${text(126,83,'engine',26,'#658cff')}${text(65,109,'EVENT-DRIVEN. PURPOSE-BUILT.',8,'#657a9e','letter-spacing="2"')}`;
const nodes=[{x:85,y:250,t:'HTTP Request',sub:'API Gateway',n:'01'},{x:355,y:250,t:'Process event',sub:'Application layer',n:'02'},{x:635,y:150,t:'Persist data',sub:'PostgreSQL',n:'03'},{x:635,y:350,t:'Publish event',sub:'RabbitMQ',n:'04'}];
flow+=`<g fill="none" stroke="#4168c5" stroke-width="2"><path d="M275 300H355"/><path d="M545 300H590V200H635"/><path d="M590 300V400H635"/></g>`;
nodes.forEach(n=>{flow+=`<g filter="url(#shadow)">${rect(n.x,n.y,190,105,'url(#panel)',10,'#38568a')}${rect(n.x+14,n.y+14,29,26,'#243f7d',5)}${text(n.x+21,n.y+32,n.n,9,'#9dbaff')}${text(n.x+15,n.y+64,n.t,14,'#d1e0ff')}${text(n.x+15,n.y+84,n.sub,9,'#6f87ae')}</g>`;});
flow+=rect(352,487,240,35,'#111d31',6)+text(371,509,'● Workflow completed successfully',10,'#7aafaa')+text(65,581,'CLEAN ARCHITECTURE / ASYNC MESSAGING',8,'#526a92','letter-spacing="1.8"');
await webp('flow.webp',svg(flow));

function flowFrame(t){
  let body='<rect width="480" height="320" fill="#08090c"/><ellipse cx="240" cy="165" rx="210" ry="140" fill="url(#glow)"/>';
  for(let i=0;i<3;i++){
    const y=80+i*65;
    body+=`<path d="M100 ${y}l140 -55 140 55-140 55Z" fill="#0b1427" stroke="#3159b2" stroke-opacity="${.3+i*.2}"/><path d="M100 ${y}v15l140 55 140-55v-15M240 ${y+55}v15" fill="none" stroke="#203d76"/>`;
    for(let j=0;j<3;j++){
      const p=(t+j/3+i*.19)%1;
      const x=100+p*140,py=y-p*55;
      body+=`<circle cx="${x}" cy="${py}" r="${2+i*.3}" fill="#86abff"/><circle cx="${380-p*140}" cy="${y+p*55}" r="2" fill="#527bff"/>`;
    }
  }
  body+='<path d="M240 25v225" stroke="#527bff" stroke-dasharray="3 8" stroke-opacity=".45"/>';
  const yy=25+t*225;body+=`<circle cx="240" cy="${yy}" r="4" fill="#aec6ff"/><circle cx="240" cy="${yy}" r="11" fill="#527bff" opacity=".13"/>`;
  return svg(body,480,320);
}
await webp('data-flow-still.webp',flowFrame(.4));
const gif=GIFEncoder();
for(let i=0;i<30;i++){
  const {data,info}=await sharp(Buffer.from(flowFrame(i/30))).ensureAlpha().raw().toBuffer({resolveWithObject:true});
  const palette=quantize(data,128);
  gif.writeFrame(applyPalette(data,palette),info.width,info.height,{palette,delay:70,repeat:0});
}
gif.finish();await writeFile(new URL('data-flow.gif',dir),gif.bytes());
console.log('Generated: data-orbit.webp, nexus.webp, pulse.webp, flow.webp, data-flow-still.webp, data-flow.gif');
