// Collection filter ordering override — keeps the working filter system intact.
window.addEventListener('DOMContentLoaded',()=>{
  const alpha=(a,b)=>a.localeCompare(b,undefined,{numeric:true,sensitivity:'base'});
  const family=document.getElementById('familyFilter');
  const consoleSelect=document.getElementById('platformFilter');
  const gallery=document.getElementById('categoryFilter');
  const sort=document.getElementById('sortFilter');

  function alphabetiseSelect(select,keepFirst=true){
    if(!select)return;
    const options=[...select.options];
    const first=keepFirst?options.shift():null;
    options.sort((a,b)=>alpha(a.textContent,b.textContent));
    select.replaceChildren(...(first?[first]:[]),...options);
  }

  // All... stays first; the remaining choices are alphabetical.
  alphabetiseSelect(family,true);
  alphabetiseSelect(consoleSelect,true);

  if(gallery){
    const current=gallery.value;
    gallery.innerHTML='<option value="">All galleries</option><option value="Display Gallery">Display Gallery</option><option value="Main Collection">Main Collection</option>';
    if([...gallery.options].some(o=>o.value===current))gallery.value=current;
  }

  if(sort){
    const current=sort.value;
    sort.innerHTML='<option value="title">A–Z</option><option value="price">Highest price</option><option value="newest">Newest entries</option>';
    if([...sort.options].some(o=>o.value===current))sort.value=current;
  }

  // Console choices are rebuilt whenever Platform changes, so alphabetise them afterwards too.
  if(family&&consoleSelect){
    family.addEventListener('input',()=>setTimeout(()=>alphabetiseSelect(consoleSelect,true),0));
  }
});
