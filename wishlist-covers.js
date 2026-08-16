// Wishlist cover library — platform-specific covers supplied through the PS2 catalogue update, 17 Aug 2026.
(() => {
  const canonicalPlatform = value => {
    const raw=String(value||'').trim();
    const key=raw.toLowerCase();
    const map={
      'ds':'Nintendo DS','nintendo ds':'Nintendo DS',
      'wii':'Nintendo Wii','nintendo wii':'Nintendo Wii',
      'ps1':'PlayStation 1','playstation':'PlayStation 1','playstation 1':'PlayStation 1',
      'ps2':'PlayStation 2','playstation 2':'PlayStation 2',
      'ps3':'PlayStation 3','playstation 3':'PlayStation 3',
      'ps4':'PlayStation 4','playstation 4':'PlayStation 4',
      'ps5':'PlayStation 5','playstation 5':'PlayStation 5',
      'psp':'PlayStation Portable','playstation portable':'PlayStation Portable',
      'xbox 360':'Xbox 360','xbox one':'Xbox One'
    };
    return map[key]||raw;
  };
  const normal=value=>String(value||'').trim().toLowerCase().replace(/\s+/g,' ');

  const covers=[
    {platform:'Xbox 360',titles:['Need for Speed: Most Wanted (2005) Standard','Need for Speed: Most Wanted (2005)'],image:'./assets/covers/need-for-speed-most-wanted-2005-xbox-360.jpg',edition:'Standard'},
    {platform:'Nintendo DS',titles:['The Simpsons Game'],image:'./assets/covers/the-simpsons-game-nintendo-ds.jpg'},
    {platform:'Nintendo Wii',titles:['The Simpsons Game'],image:'./assets/covers/the-simpsons-game-nintendo-wii.jpg'},
    {platform:'PlayStation 1',titles:['Grand Theft Auto'],image:'./assets/covers/grand-theft-auto-ps1.webp'},
    {platform:'PlayStation 1',titles:['F1 2000'],image:'./assets/covers/f1-2000-ps1.jpg'},
    {platform:'PlayStation 2',titles:['Club Football 2005'],image:'./assets/covers/club-football-2005-ps2.jpg',edition:'Standard'},
    {platform:'PlayStation 2',titles:['FIFA 09'],image:'./assets/covers/fifa-09-ps2.webp'},
    {platform:'PlayStation 2',titles:['FIFA 10'],image:'./assets/covers/fifa-10-ps2.webp'},
    {platform:'PlayStation 2',titles:['FIFA 11'],image:'./assets/covers/fifa-11-ps2.webp'},
    {platform:'PlayStation 2',titles:['FIFA 12'],image:'./assets/covers/fifa-12-ps2.webp'},
    {platform:'PlayStation 2',titles:['FIFA 13'],image:'./assets/covers/fifa-13-ps2.jpg'},
    {platform:'PlayStation 2',titles:['FIFA 14'],image:'./assets/covers/fifa-14-ps2.jpg',edition:'Legacy Edition'},
    {platform:'PlayStation 2',titles:['The Simpsons Game'],image:'./assets/covers/the-simpsons-game-ps2.jpg'},
    {platform:'PlayStation 2',titles:['The Simpsons Road Rage','The Simpsons: Road Rage'],image:'./assets/covers/the-simpsons-road-rage-ps2.webp'},
    {platform:'PlayStation 3',titles:['FIFA 08'],image:'./assets/covers/fifa-08-ps3.jpg'},
    {platform:'PlayStation 3',titles:['FIFA 14'],image:'./assets/covers/fifa-14-ps3.jpg'},
    {platform:'PlayStation 3',titles:['PES 2015'],image:'./assets/covers/pes-2015-ps3.jpg'},
    {platform:'PlayStation 3',titles:['PES 2017'],image:'./assets/covers/pes-2017-ps3.webp'},
    {platform:'PlayStation 3',titles:['Battlefield 4'],image:'./assets/covers/battlefield-4-ps3.jpg'},
    {platform:'PlayStation 3',titles:['WWE SmackDown vs. Raw 2008'],image:'./assets/covers/wwe-smackdown-vs-raw-2008-ps3.jpg'},
    {platform:'PlayStation 4',titles:['F1 2017 Standard Edition','F1 2017'],image:'./assets/covers/f1-2017-ps4.jpg',edition:'Standard'},
    {platform:'PlayStation 4',titles:['F1 2019 Standard Edition','F1 2019'],image:'./assets/covers/f1-2019-ps4.jpg',edition:'Standard'},
    {platform:'PlayStation 4',titles:['F1 21','F1 2021'],image:'./assets/covers/f1-21-ps4.webp'},
    {platform:'PlayStation 4',titles:['F1 22'],image:'./assets/covers/f1-22-ps4.webp'},
    {platform:'PlayStation 4',titles:['F1 23'],image:'./assets/covers/f1-23-ps4.webp'},
    {platform:'PlayStation 4',titles:['F1 24'],image:'./assets/covers/f1-24-ps4.webp'},
    {platform:'PlayStation 4',titles:['FIFA 21'],image:'./assets/covers/fifa-21-ps4.webp'},
    {platform:'PlayStation 4',titles:['WWE 2K23'],image:'./assets/covers/wwe-2k23-ps4.jpg'},
    {platform:'PlayStation 4',titles:['Saints Row (2022)','Saints Row'],image:'./assets/covers/saints-row-2022-ps4.jpg'},
    {platform:'PlayStation 5',titles:['F1 25'],image:'./assets/covers/f1-25-ps5.webp'},
    {platform:'PlayStation Portable',titles:['F1 2009'],image:'./assets/covers/f1-2009-psp.webp'},
    {platform:'PlayStation Portable',titles:['The Simpsons Game'],image:'./assets/covers/the-simpsons-game-psp.jpg'},
    {platform:'Xbox 360',titles:['Call of Duty: Ghosts'],image:'./assets/covers/call-of-duty-ghosts-xbox-360.jpg'},
    {platform:'Xbox 360',titles:['Call of Duty: Advanced Warfare'],image:'./assets/covers/call-of-duty-advanced-warfare-xbox-360.jpg'},
    {platform:'Xbox 360',titles:['Call of Duty: Black Ops III'],image:'./assets/covers/call-of-duty-black-ops-iii-xbox-360.jpg'},
    {platform:'Xbox 360',titles:['The Simpsons Game'],image:'./assets/covers/the-simpsons-game-xbox-360.jpg'},
    {platform:'Xbox One',titles:['Far Cry 4'],image:'./assets/covers/far-cry-4-xbox-one.jpg'}
  ];

  function apply(data){
    if(!data||!Array.isArray(data.wishlist))return;
    data.wishlist.forEach(item=>{
      item.platform=canonicalPlatform(item.platform);
      const match=covers.find(c=>c.platform===item.platform&&c.titles.some(t=>normal(t)===normal(item.title)));
      if(!match)return;
      item.image=match.image;
      if(match.edition&&!item.edition)item.edition=match.edition;
    });
  }

  apply(window.MUSEUM_SEED);
  ['theGameMuseumV353','theGameMuseumV352','theGameMuseumV35','theGameMuseumV34','theGameMuseumV33','theGameMuseumV32'].forEach(key=>{
    try{
      const raw=localStorage.getItem(key);
      if(!raw)return;
      const data=JSON.parse(raw);
      apply(data);
      localStorage.setItem(key,JSON.stringify(data));
    }catch(_){}
  });

  window.MUSEUM_WISHLIST_COVERS=covers;
})();
