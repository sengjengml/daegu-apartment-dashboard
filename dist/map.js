const geo={
 '수성구':[35.8582,128.6306],'중구':[35.8693,128.6062],'동구':[35.8867,128.6356],'서구':[35.8718,128.5592],'남구':[35.8460,128.5977],'북구':[35.8859,128.5829],'달서구':[35.8299,128.5327],'달성군':[35.7746,128.4315],'군위군':[36.2429,128.5729],
 '범어동':[35.8588,128.6355],'만촌동':[35.8597,128.6502],'수성동':[35.8545,128.6178],'황금동':[35.8448,128.6246],'중동':[35.8476,128.6103],'두산동':[35.8328,128.6216],'지산동':[35.8249,128.6314],'범물동':[35.8178,128.6450],'시지동':[35.8418,128.6992],'고산동':[35.8371,128.7084],
 '동인동':[35.8680,128.6098],'삼덕동':[35.8652,128.6081],'성내동':[35.8704,128.5934],'남산동':[35.8607,128.5908],'대봉동':[35.8581,128.6044],
 '신암동':[35.8850,128.6188],'신천동':[35.8753,128.6271],'효목동':[35.8780,128.6425],'복현동':[35.8938,128.6240],'침산동':[35.8900,128.5897],'죽전동':[35.8509,128.5361],'상인동':[35.8170,128.5360],'월성동':[35.8175,128.5235],'다사읍':[35.8619,128.4573],'화원읍':[35.8018,128.5007],'군위읍':[36.2398,128.5686]
};
function mapUrl(lat,lon,zoom=.018){let bbox=[lon-zoom,lat-zoom,lon+zoom,lat+zoom].map(x=>x.toFixed(6)).join('%2C');return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat.toFixed(6)}%2C${lon.toFixed(6)}`}
function updateMap(label,coord){let place=label||((dongFilter.value==='전체')?districtFilter.value:dongFilter.value),point=coord||geo[place]||geo[districtFilter.value]||geo['수성구'];apartmentMap.src=mapUrl(point[0],point[1]);mapTitle.textContent=`${place} 지도`;mapPinLabel.textContent=place;mapContext.textContent=`${place} · ${formatDate()} 기준`;openMapLink.href=`https://www.openstreetmap.org/?mlat=${point[0]}&mlon=${point[1]}#map=15/${point[0]}/${point[1]}`}
[districtFilter,dongFilter,dateFilter].forEach(el=>el.addEventListener('change',()=>setTimeout(()=>updateMap(),0)));
dealRows.addEventListener('click',e=>{let row=e.target.closest('tr');if(!row)return;dealRows.querySelectorAll('tr').forEach(r=>r.classList.remove('deal-selected'));row.classList.add('deal-selected');let idx=[...dealRows.children].indexOf(row),base=geo[dongFilter.value]||geo[districtFilter.value]||geo['수성구'],coord=[base[0]+((idx%3)-1)*.0035,base[1]+(Math.floor(idx/3)-.5)*.0045],name=row.cells[0].textContent;updateMap(name,coord)});
updateMap();
