(()=>{"use strict";let e=document.getElementById("dealersMap");if(e){function o(){var o=new ymaps.Map(e,{center:[44.824269,39.087503],zoom:8,controls:["zoomControl","typeSelector"]},{autoFitToViewport:"always"}),t=new ymaps.ObjectManager;t.objects.options.set({preset:"islands#dotIcon",iconColor:"#f13a3a"}),o.geoObjects.add(t),o.behaviors.disable("scrollZoom"),fetch("./files/data.json").then((e=>e.json())).then((e=>{t.add(e)})).catch((e=>console.error(e)))}ymaps.ready(o)}})();