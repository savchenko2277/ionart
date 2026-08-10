import { throttle } from "./libs/utils";
import "./polyfills.js";
import "./blocks.js";

// Функции

const setScroll = (value) => {
	if(value === "true") {
		document.body.classList.remove("scroll-lock");
	} else {
		document.body.classList.add("scroll-lock");
	}
}

const setScrollbarWidth = () => {
	document.documentElement.style.setProperty('--sw', `${window.innerWidth - document.documentElement.clientWidth}px`);
}

const initHeader = () => {
	const header = document.querySelector(".header");
	if (!header) return;

	const burger = header.querySelector(".header__burger");
	const menu = header.querySelector(".header__menu");

	if (burger) {
		burger.addEventListener("click", () => {
			header.classList.toggle("active");
			setScroll(header.classList.contains("active") ? "false" : "true");
		});
	}

	if (menu) {
		menu.addEventListener("click", (e) => {
			const link = e.target.closest("a");
			if (link && header.classList.contains("active")) {
				header.classList.remove("active");
				setScroll("true");
			}
		});
	}

	const handleScroll = throttle(() => {
		if (window.scrollY > 0) {
			header.classList.add("header_scroll");
		} else {
			header.classList.remove("header_scroll");
		}
	}, 100);

	window.addEventListener("scroll", handleScroll, { passive: true });
}

// Запуск функций
window.addEventListener("load", () => {
	setScrollbarWidth();
	initHeader();
})
