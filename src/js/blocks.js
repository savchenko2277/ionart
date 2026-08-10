import { driveTabs } from "./libs/driveTabs";
import Swiper from "swiper";
import { Thumbs } from "swiper/modules";
import { Fancybox } from "@fancyapps/ui";

// ============================
// Табы в блоке popular
// ============================
const popularTabs = driveTabs({
	container: '.popular',
	controls: '.popular__navigation-btn',
	selects: ['.popular__tab'],
	cls: 'active',
});

// ============================
// Counter (+/-) в карточках товаров
// ============================
const initCounters = () => {
	const counters = document.querySelectorAll('.counter');

	counters.forEach(counter => {
		const input = counter.querySelector('.counter__input');
		const btnPlus = counter.querySelector('.counter__button_plus');
		const btnMinus = counter.querySelector('.counter__button_minus');

		if (!input || !btnPlus || !btnMinus) return;

		const min = parseInt(counter.dataset.counterMin, 10) || 1;
		const max = parseInt(counter.dataset.counterMax, 10) || 99;

		const getValue = () => parseInt(input.value, 10) || min;

		const setValue = (val) => {
			const clamped = Math.min(Math.max(val, min), max);
			input.value = clamped;
		};

		btnPlus.addEventListener('click', (e) => {
			e.preventDefault();
			setValue(getValue() + 1);
		});

		btnMinus.addEventListener('click', (e) => {
			e.preventDefault();
			setValue(getValue() - 1);
		});

		input.addEventListener('change', () => {
			setValue(getValue());
		});

		input.addEventListener('input', () => {
			// Разрешаем ввод только цифр
			input.value = input.value.replace(/\D/g, '');
		});

		// Начальная валидация
		setValue(getValue());
	});
};

// ============================
// Галерея товара (Swiper + Fancybox) на странице product.html
// ============================
const initProductGallery = () => {
	const swiperEl = document.querySelector('.product-title__swiper');
	const thumbsEl = document.querySelector('.product-title__thumbs');

	if (!swiperEl || !thumbsEl) return;

	const thumbsSwiper = new Swiper(thumbsEl, {
		modules: [Thumbs],
		slidesPerView: 'auto',
		spaceBetween: 8,
		watchSlidesProgress: true,
	});

	new Swiper(swiperEl, {
		modules: [Thumbs],
		thumbs: {
			swiper: thumbsSwiper,
		},
	});

	Fancybox.bind('[data-fancybox="product-gallery"]', {
		Thumbs: false,
	});
};

// Запуск после загрузки DOM
const onDOMReady = () => {
	initCounters();
	initProductGallery();
};

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', onDOMReady);
} else {
	onDOMReady();
}
