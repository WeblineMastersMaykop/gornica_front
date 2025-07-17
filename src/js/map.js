// ОФИС НА КАРТЕ

let map1 = document.getElementById('Map1')

if (map1) {
	ymaps.ready(function () {
		const locationAttribute = map1.getAttribute("data-location");
		const center = locationAttribute ? locationAttribute.replaceAll(',', '.').split(";").map(x => parseFloat(x, 10)) : [45.005322, 39.009197];

		let placemarkUrl = 'img/map-marker.svg';

		if (window.django && window.django.placemark) {
			placemarkUrl = window.django.placemark;
		}

		var myMap = new ymaps.Map(map1, {
				center: center,
				zoom: 16,
				controls: ['zoomControl'],
			}),
			myPlacemark = new ymaps.Placemark(
				myMap.getCenter(),
				{},
				{
					// Опции.
					// Необходимо указать данный тип макета.
					iconLayout: 'default#image',
					// Своё изображение иконки метки.
					iconImageHref: placemarkUrl,
					// Размеры метки.
					iconImageSize: [40, 57],
					// Смещение левого верхнего угла иконки относительно
					// её "ножки" (точки привязки).
					iconImageOffset: [-20, -57],
				}
			)

		myMap.behaviors.disable('scrollZoom')
		myMap.geoObjects.add(myPlacemark)
	})
}
