// Проверка поддержки webp, добавление класса webp или no-webp для HTML
function testWebP(callback) {
	let webP = new Image()
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2)
	}
	webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
}
testWebP(function (support) {
	let className = support === true ? 'webp' : 'no-webp'
	document.documentElement.classList.add(className)
})

// ОТКЛЮЧИТЬ РАМКУ :FOCUS ПО КЛИКУ, НО ПОКАЗЫВАТЬ ПРИ ТАББАНГЕ С КЛАВИАТУРЫ
function handleFirstTab(e) {
	if (e.keyCode === 9) {
		document.body.classList.add('user-is-tabbing')
		window.removeEventListener('keydown', handleFirstTab)
		window.addEventListener('mousedown', handleMouseDownOnce)
	}
}
function handleMouseDownOnce() {
	document.body.classList.remove('user-is-tabbing')
	window.removeEventListener('mousedown', handleMouseDownOnce)
	window.addEventListener('keydown', handleFirstTab)
}
window.addEventListener('keydown', handleFirstTab)

import Cleave from 'cleave.js'
import CleavePhone from 'cleave.js/dist/addons/cleave-phone.ru.js'
import GLightbox from 'glightbox'

document.addEventListener('DOMContentLoaded', () => {
	// КНОПКА СКРОЛЛА НАВЕРХ
	const scrollBtn = document.querySelector('.scroll-to-top')

	if (scrollBtn) {
		const btnVisibility = () => {
			scrollBtn.style.visibility = window.scrollY > 768 ? 'visible' : 'hidden'
		}

		document.addEventListener('scroll', btnVisibility)
		scrollBtn.addEventListener('click', () => {
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			})
		})
	}

	// ЗАКРЫТЬ ОФФКАНВАС СВАЙПОМ
	function setupSwipeToClose(offcanvasElement, swipeDirection) {
		if (!offcanvasElement) return

		const menuOffcanvas = new bootstrap.Offcanvas(offcanvasElement)
		let startX, startY
		const swipeThreshold = 50

		function handleTouchStart(e) {
			startX = e.touches[0].clientX
			startY = e.touches[0].clientY
		}

		function handleTouchEnd(e) {
			const endX = e.changedTouches[0].clientX
			const endY = e.changedTouches[0].clientY

			const deltaX = endX - startX
			const deltaY = endY - startY

			if (Math.abs(deltaX) > swipeThreshold && Math.abs(deltaX) > Math.abs(deltaY)) {
				if ((swipeDirection === 'right' && deltaX > 0) || (swipeDirection === 'left' && deltaX < 0)) {
					menuOffcanvas.hide()
				}
			}
		}

		function handleCloseOnClick(e) {
			if (e.target.closest('.submenu .nav-link')) {
				menuOffcanvas.hide()
			}
		}

		offcanvasElement.addEventListener('touchstart', handleTouchStart, { passive: true })
		offcanvasElement.addEventListener('touchend', handleTouchEnd, { passive: true })
		offcanvasElement.addEventListener('click', handleCloseOnClick)
	}

	const OffcanvasEl = document.getElementById('Offcanvas')
	const OffcanvasEl2 = document.getElementById('offcanvasBIMmenu')

	setupSwipeToClose(OffcanvasEl, 'right')
	setupSwipeToClose(OffcanvasEl2, 'left')

	// ПОКАЗАТЬ / СКРЫТЬ СТРОКУ ПОИСКА
	const searchBox = document.querySelector('.search-box')

	if (searchBox) {
		const searchToggle = document.querySelector('.search-toggle')

		searchToggle.addEventListener('click', e => {
			e.preventDefault()
			searchToggle.classList.toggle('active')
			searchBox.classList.toggle('active')
		})
	}

	//ПЛАГИН МАСОК ИНПУТОВ
	let PhoneInput = document.querySelectorAll('.input-phone')
	if (PhoneInput) {
		PhoneInput.forEach(function (el) {
			new Cleave(el, {
				phone: true,
				phoneRegionCode: 'RU',
				prefix: '+7',
				noImmediatePrefix: true,
				blocks: [4, 3, 3, 4],
			})
		})
	}

	// ПРОСМОТРЩИК ФОТО
	const lightbox = GLightbox({
		selector: '.gall-img',
	})

	// АККОРДИОН
	const accordionButton = document.querySelectorAll('.accordion-button')

	if (accordionButton.length) {
		accordionButton.forEach(function (element) {
			element.addEventListener('click', function (e) {
				let parentEl = element.closest('.accordion-item')
				let submenuEl = parentEl.querySelector('.accordion-collapse')

				element.classList.toggle('collapsed')

				if (submenuEl) {
					e.preventDefault()
					let mycollapse = new bootstrap.Collapse(submenuEl)

					if (submenuEl.classList.contains('show')) {
						mycollapse.hide()
					} else {
						mycollapse.show()
					}
				}
			})
		})
	}

	// НАВБАР ВСЕГДА ВВЕРХУ ЭКРАНА
	const topbar = document.querySelector('.topbar')
	const navbar = document.querySelector('.navbar')
	const bodyEl = document.querySelector('body')

	function updateTopbarAndNavbar() {
		if (window.innerWidth >= 1200 && navbar) {
			var navbarHeight = navbar.offsetHeight
			var navbarTop = navbar.offsetTop

			topbar.classList.remove('fixed-top')
			bodyEl.style.paddingTop = 0

			window.onscroll = function () {
				if (window.scrollY >= navbarTop) {
					navbar.classList.add('fixed-top')
					if (topbar) {
						topbar.style.marginBottom = navbarHeight / 16 + 'rem'
					}
				} else {
					navbar.classList.remove('fixed-top')
					if (topbar) {
						topbar.style.marginBottom = 0
					}
				}
			}
		} else if (window.innerWidth < 1200 && topbar) {
			var topbarHeight = topbar.offsetHeight
			// var topbarTop = topbar.offsetTop

			navbar.classList.remove('fixed-top')
			topbar.style.marginBottom = 0

			window.onscroll = function () {
				if (window.scrollY >= 1) {
					topbar.classList.add('fixed-top')
					topbarHeight = topbar.offsetHeight
					bodyEl.style.paddingTop = topbarHeight / 16 + 'rem'
				} else {
					topbar.classList.remove('fixed-top')
					bodyEl.style.paddingTop = 0
				}
			}
		}
	}

	updateTopbarAndNavbar()

	window.addEventListener('resize', () => {
		updateTopbarAndNavbar()
	})

	// РАСКРЫВАЮЩИЕСЯ МЕНЮ В САЙДБАРАХ
	const sidebarEl = document.querySelectorAll('.has-submenu > .nav-link')

	if (sidebarEl.length) {
		sidebarEl.forEach(function (element) {
			element.addEventListener('click', function (e) {
				let nextEl = element.nextElementSibling
				let parentEl = element.parentElement

				if (nextEl) {
					e.preventDefault()
					let mycollapse = new bootstrap.Collapse(nextEl)

					if (nextEl.classList.contains('show')) {
						mycollapse.hide()
					} else {
						mycollapse.show()

						//Если надо закрывать соседние сабменю:
						// var opened_submenu = parentEl.parentElement.querySelector('.submenu.show');
						// if (opened_submenu) {
						//    new bootstrap.Collapse(opened_submenu);
						// }
					}
				}
			})
		})
	}

	// ПОЗИЦИЯ ДРОПДАУН-МЕНЮ КАТАЛОГА
	const updateDropdownPosition = () => {
		const navbar = document.querySelector('.navbar')
		const catalogueDropdownMenu = document.querySelector('.catalogue-dropdown-menu')

		if (!navbar || !catalogueDropdownMenu) return

		const navbarRect = navbar.getBoundingClientRect()
		const navbarBottom = navbarRect.bottom

		catalogueDropdownMenu.style.top = `${navbarBottom}px`
	}

	updateDropdownPosition()
	;['resize', 'scroll'].forEach(event => window.addEventListener(event, updateDropdownPosition))

	// ОТКРЫТИЕ ДРОПДАУНА ПО ХОВЕРУ
	const dropdowns = document.querySelectorAll('.dropdown-hover')

	if (dropdowns.length) {
		dropdowns.forEach(function (dropdown) {
			const dropdownToggle = new bootstrap.Dropdown(dropdown.querySelector('.dropdown-toggle'), {
				offset: [0, 0],
			})

			dropdown.addEventListener('mouseover', function (e) {
				dropdownToggle.show()
			})

			dropdown.addEventListener('mouseleave', function (e) {
				dropdownToggle.hide()
				dropdown.querySelector('.dropdown-toggle').blur()
			})
		})
	}

	// КАСКАДНЫЕ АНИМАЦИИ
	const animWraps = document.querySelectorAll('.has-anims')

	if (animWraps.length) {
		animWraps.forEach(animWrap => {
			const observer = new IntersectionObserver(
				entries => {
					entries.forEach((entry, index) => {
						if (entry.isIntersecting) {
							setTimeout(() => {
								entry.target.classList.add('play')
							}, index * 200)
						} else {
							entry.target.classList.remove('play')
						}
					})
				},
				{ threshold: 0.2 }
			)

			const animEls = animWrap.querySelectorAll('.anim')

			animEls.forEach(element => {
				observer.observe(element)
			})
		})
	}
})

// ОТКРЫТЬ ЗАКРЫТЬ ДРОПДАУН-МЕНЮ КАКТАЛОГА
document.addEventListener('DOMContentLoaded', () => {
	const catalogueDropdown = document.querySelector('.catalogue-dropdown')
	const catalogueMenu = document.querySelector('.catalogue-dropdown-menu')
	const closeBtn = document.querySelector('.catalogue-dropdown-menu-close')
	const catalogueMenuLinks = catalogueMenu.querySelectorAll('.catalogue-menu a')
	const navbar = document.querySelector('.navbar') // Добавляем выборку для .navbar
	let isMenuOpen = false

	function getScrollbarWidth() {
		const outer = document.createElement('div')
		outer.style.visibility = 'hidden'
		outer.style.width = '100px'
		outer.style.msOverflowStyle = 'scrollbar'
		document.body.appendChild(outer)

		const widthNoScroll = outer.offsetWidth
		outer.style.overflow = 'scroll'

		const inner = document.createElement('div')
		inner.style.width = '100%'
		outer.appendChild(inner)

		const widthWithScroll = inner.offsetWidth
		outer.parentNode.removeChild(outer)

		return widthNoScroll - widthWithScroll
	}

	catalogueDropdown.addEventListener('click', event => {
		event.preventDefault()
		toggleMenu()
	})

	closeBtn.addEventListener('click', event => {
		event.preventDefault()
		closeMenu()
	})

	catalogueMenuLinks.forEach(catalogueMenuLink => {
		catalogueMenuLink.addEventListener('click', event => {
			closeMenu()
		})
	})

	document.addEventListener('click', event => {
		if (!catalogueDropdown.contains(event.target) && !catalogueMenu.contains(event.target)) {
			closeMenu()
		}
	})

	function openMenu() {
		if (!isMenuOpen) {
			const scrollbarWidth = getScrollbarWidth()

			catalogueMenu.style.display = 'block'
			catalogueMenu.style.right = `${scrollbarWidth}px`
			catalogueDropdown.classList.add('show')

			if (navbar && navbar.classList.contains('fixed-top')) {
				navbar.style.right = `${scrollbarWidth}px`
			}

			document.body.style.overflow = 'hidden'
			document.body.style.paddingRight = `${scrollbarWidth}px`
			isMenuOpen = true
		}
	}

	function closeMenu() {
		if (isMenuOpen) {
			catalogueMenu.style.display = 'none'
			catalogueMenu.style.right = ''
			catalogueDropdown.classList.remove('show')

			if (navbar && navbar.classList.contains('fixed-top')) {
				navbar.style.right = ''
			}

			document.body.style.overflow = ''
			document.body.style.paddingRight = ''
			isMenuOpen = false
		}
	}

	function toggleMenu() {
		if (isMenuOpen) {
			closeMenu()
		} else {
			openMenu()
		}
	}
})

//ГЛАВНЫЙ СЛАЙДЕР
import Swiper from 'swiper'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

const heroSliderContainers = document.querySelectorAll('.hero-slider')
if (heroSliderContainers.length) {
	for (const sliderContainer of heroSliderContainers) {
		let slider = sliderContainer.querySelector('.swiper')
		let next = sliderContainer.querySelector('.swiper-button-next')
		let prev = sliderContainer.querySelector('.swiper-button-prev')
		let pagination = sliderContainer.querySelector('.swiper-pagination')

		new Swiper(slider, {
			modules: [Navigation, Pagination, Autoplay],
			slidesPerView: 1,
			spaceBetween: 16,
			loop: true,
			navigation: {
				nextEl: next,
				prevEl: prev,
			},
			pagination: {
				el: pagination,
				clickable: true,
			},
			autoplay: {
				delay: 5000,
				pauseOnMouseEnter: true,
				disableOnInteraction: false,
			},
		})
	}
}

// СЛАЙДЕР КАТАЛОГА НА ГЛАВНОЙ

const catalogueSliderContainers = document.querySelectorAll('.catalogue-slider')
if (catalogueSliderContainers.length) {
	for (const sliderContainer of catalogueSliderContainers) {
		let slider = sliderContainer.querySelector('.swiper')
		let next = sliderContainer.querySelector('.swiper-button-next')
		let prev = sliderContainer.querySelector('.swiper-button-prev')
		let pagination = sliderContainer.querySelector('.swiper-pagination')

		new Swiper(slider, {
			modules: [Navigation, Pagination, Autoplay],
			slidesPerView: 1.2,
			spaceBetween: 16,
			navigation: {
				nextEl: next,
				prevEl: prev,
			},
			pagination: {
				el: pagination,
				clickable: true,
			},
			autoplay: {
				delay: 5000,
				pauseOnMouseEnter: true,
				disableOnInteraction: false,
			},
			breakpoints: {
				576: {
					slidesPerView: 2,
				},

				992: {
					slidesPerView: 3,
					spaceBetween: 24,
				},
			},
		})
	}
}

//СЛАЙДЕР ОБЪЕКТА ПОРТФОЛИО

const portfolioSliderContainers = document.querySelectorAll('.portfolio-slider')
if (portfolioSliderContainers.length) {
	for (const sliderContainer of portfolioSliderContainers) {
		let slider = sliderContainer.querySelector('.swiper')
		let next = sliderContainer.querySelector('.swiper-button-next')
		let prev = sliderContainer.querySelector('.swiper-button-prev')
		let pagination = sliderContainer.querySelector('.swiper-pagination')

		new Swiper(slider, {
			modules: [Navigation, Pagination, Autoplay],
			slidesPerView: 1,
			spaceBetween: 16,
			loop: true,
			navigation: {
				nextEl: next,
				prevEl: prev,
			},
			pagination: {
				el: pagination,
				clickable: true,
			},
			autoplay: {
				delay: 5000,
				pauseOnMouseEnter: true,
				disableOnInteraction: false,
			},
		})
	}
}

// СЛАЙДЕР ФОТОГРАФИЙ ТОВАРА

const productSliderContainers = document.querySelectorAll('.product-slider')
if (productSliderContainers.length) {
	for (const sliderContainer of productSliderContainers) {
		let slider = sliderContainer.querySelector('.swiper')
		let next = sliderContainer.querySelector('.swiper-button-next')
		let prev = sliderContainer.querySelector('.swiper-button-prev')
		let pagination = sliderContainer.querySelector('.swiper-pagination')

		new Swiper(slider, {
			modules: [Navigation, Pagination],
			slidesPerView: 1,
			spaceBetween: 16,
			loop: true,
			navigation: {
				nextEl: next,
				prevEl: prev,
			},
			pagination: {
				el: pagination,
				clickable: true,
			},
			breakpoints: {
				576: {
					slidesPerView: 2,
					spaceBetween: 16,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 16,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 24,
				},
				1200: {
					slidesPerView: 3,
					spaceBetween: 24,
				},
				1400: {
					slidesPerView: 3,
					spaceBetween: 24,
				},
			},
		})
	}
}
