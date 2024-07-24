let wrapper = document.querySelector('.wrapper');

let pageSlider = new Swiper('.page', {
	// свои классы
	wrapperClass: "page__wrapper",
	slideClass: "page__screen",
	// вертикальный слайдер
	direction: 'vertical',
	// Количество слайдов для показа
	slidesPerView: 'auto',
	// паралакс ВКЛ
	parallax: true,
	slideToClickedSlide: false,

	// Управление клавиатурой
	keyboard: {
		// ВКЛ
		enabled: false,
		//только когда слайдер в пределах вьюпорта
		onlyInViewport: true,
		//управление клавишами pageUp-pageDown ВКЛ
		pageUpDown: true,
	},
	//Управление колесом мышки
	mousewheel: {
		//чувствительность колеса
		sensitivity: 1,
		//класс объекта на котором будет срабатывать прокрутка
		//eventsTarget: ".image-slider"
	},
	//отключение функционала, если слайдов меньше чем нужно
	watchOverflow: true,
	//скорость
	speed: 800,
	//обновить свайпер при изменении элементов слайдера
	observer: true,
	//обновить свайпер при изменении родительских элементов слайдера
	observerParents: true,
	//обновить свайпер при изменении дочерних элементов слайдера
	observerSlideChildren: true,
	//Навигация - буллеты, текущее положение, прогрессбар
	pagination: {
		el: '.page__pagination',
		type: 'bullets',
		clickable: true,
		bulletClass: "page__bullet",
		bulletActiveClass: "page__bullet_active",
	},
	//скролл
	scrollbar: {
		el: '.page__scroll',
		dragClass: "page__drag-scroll",
		//возможность перетаскивать скролл ВКЛ
		draggable: true,
	},

	//отключаем автоинициализацию
	init: false,
	//события
	on: {
		//событие инициализации
		init: function () {
			menuSlider();
			setScrollType();
			wrapper.classList.add('_loader');
		},
		//событие смены слайда
		slideChange: function () {
			menuSliderRemove();
			menuLinks[pageSlider.realIndex].classList.add('_active');
		},
		//изменение размера окна браузера
		resize: function () {
			setScrollType();
		},
	},
});

let menuLinks = document.querySelectorAll('.menu__link');

function menuSlider() {
	if (menuLinks.length > 0) {
		menuLinks[pageSlider.realIndex].classList.add('_active');
		for (let index = 0; index < menuLinks.length; index++) {
			const menuLink = menuLinks[index];
			menuLink.addEventListener("click", function (e) {
				menuSliderRemove();
				pageSlider.slideTo(index, 800);
				menuLink.classList.add('_active');
				e.preventDefault();
			});
		}
	}
}

function menuSliderRemove() {
	let menuLinkActive = document.querySelector('.menu__link._active');
	if (menuLinkActive) {
		menuLinkActive.classList.remove('_active');
	}
}

function setScrollType() {
	if (wrapper.classList.contains('_free')) {
		wrapper.classList.remove('_free');
		pageSlider.params.freeMode = false;
	}

	for (let index = 0; index < pageSlider.slides.length; index++) {
		const pageSlide = pageSlider.slides[index];
		const pageSlideContent = pageSlide.querySelector('.screen__content');
		if (pageSlideContent) {
			const pageSlideContentHeight = pageSlideContent.offsetHeight;
			if (pageSlideContentHeight > window.innerHeight) {
				wrapper.classList.add('_free');
				pageSlider.params.freeMode = true;
				break;
			}
		}
	}
}
//запускаем инициализацию вручную
pageSlider.init();

