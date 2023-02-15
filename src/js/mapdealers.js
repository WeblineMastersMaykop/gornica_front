// КАРТА ДИЛЕРОВ

let dealersMap = document.getElementById("dealersMap");

if (dealersMap) {
   ymaps.ready(init);
   function init() {
      // var zoomControl = new ymaps.control.ZoomControl({
      //    options: {

      //       right: 10
      //    }
      // }),

      var myMap2 = new ymaps.Map(dealersMap, {
         center: [44.824269, 39.087503],
         zoom: 8,
         controls: ['zoomControl', 'typeSelector']
      }, {
         autoFitToViewport: 'always',
      }
      ),
         objectManager = new ymaps.ObjectManager();

      objectManager.objects.options.set({
         preset: 'islands#dotIcon',
         iconColor: '#f13a3a'
      });
      myMap2.geoObjects.add(objectManager);
      myMap2.behaviors.disable('scrollZoom');

      fetch('./files/data.json')
         .then(res => res.json())
         .then((out) => {
            objectManager.add(out);
         }).catch(err => console.error(err));
   }
}