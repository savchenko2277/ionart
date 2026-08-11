import { driveTabs } from "./libs/driveTabs";
import Swiper from "swiper";
import { Thumbs } from "swiper/modules";
import { Fancybox } from "@fancyapps/ui";

// ============================
// Табы в блоке popular
// ============================
const popularTabs = document.querySelector('.popular')
	? driveTabs({
		container: '.popular',
		controls: '.popular__navigation-btn',
		selects: ['.popular__tab'],
		cls: 'active',
	})
	: null;

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

// ============================
// Модалка фильтров на странице каталога
// ============================
const initCatalogFilters = () => {
	const filters = document.querySelector('.catalog__filters');
	const toggleBtn = document.querySelector('.catalog__filter-toggle');

	if (!filters || !toggleBtn) return;

	// Добавляем кнопку закрытия (динамически, только для мобильной модалки)
	const closeBtn = document.createElement('button');
	closeBtn.type = 'button';
	closeBtn.className = 'catalog__filters-close';
	closeBtn.innerHTML = `
		<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
			<path d="M15 5L5 15M5 5L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
		</svg>
	`;
	filters.querySelector('.catalog__filters-content').prepend(closeBtn);

	// Открытие
	toggleBtn.addEventListener('click', () => {
		filters.classList.add('active');
		document.body.classList.add('scroll-lock');
	});

	// Закрытие: по клику на оверлей или кнопку закрытия
	const closeFilters = () => {
		filters.classList.remove('active');
		document.body.classList.remove('scroll-lock');
	};

	filters.addEventListener('click', (e) => {
		if (e.target === filters || e.target.closest('.catalog__filters-close')) {
			closeFilters();
		}
	});
};

// Запуск после загрузки DOM
const onDOMReady = () => {
	initCounters();
	initProductGallery();
	initCatalogFilters();
};

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', onDOMReady);
} else {
	onDOMReady();
}
