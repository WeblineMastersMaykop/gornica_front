// КАРТА ДИЛЕРОВ

let dealersMap = document.getElementById('dealersMap')

if (dealersMap) {
	ymaps.ready(init)
	async function init() {
		// var zoomControl = new ymaps.control.ZoomControl({
		//    options: {

		//       right: 10
		//    }
		// }),
		const locationAttribute = dealersMap.getAttribute("data-location");
		const center = locationAttribute ? locationAttribute.replaceAll(',', '.').split(";").map(x => parseFloat(x, 10)) : [44.824269, 39.087503];
		
		var myMap2 = new ymaps.Map(
				dealersMap,
				{
					center: center,
					zoom: 8,
					controls: ['zoomControl', 'typeSelector'],
				},
				{
					autoFitToViewport: 'always',
				}
			),
			objectManager = new ymaps.ObjectManager()

		objectManager.objects.options.set({
			preset: 'islands#dotIcon',
			iconColor: '#f13a3a',
		})
		myMap2.geoObjects.add(objectManager)
		myMap2.behaviors.disable('scrollZoom')
		
		if (window.django && window.django.dealersUrl) {
			try {
				const data = await fetch(window.django.dealersUrl)
				if (!data.ok) {
					throw new Error('Network response was not ok')
				}
				const dealersData = await data.json()
				objectManager.add(dealersData)
			} catch (error) {
				console.error('Error fetching dealers data:', error)
			}
		} else { 
			try {
				const response = await fetch('./files/dealers.json')
				if (!response.ok) {
					throw new Error('Network response was not ok')
				}
				const dealersData = await response.json()
				objectManager.add(dealersData)
			} catch (error) {
				console.error('Error fetching dealers data:', error)
			}
		}
	}
}
