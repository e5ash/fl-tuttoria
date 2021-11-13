// CHECKBOX
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Check {
	removeRadios(name) {
		var radiosInputs = document.querySelectorAll('.' + this.elemName + ' input[name = "' + name + '"]');
		radiosInputs.forEach(radioInput => {
			var radio = radioInput.closest('.' + this.elemName);

			if (radio) {
				radio.classList.remove(this.classChecked);
				radioInput.removeAttribute('checked');
			}
		});
	}

	constructor(element) {
		_defineProperty(this, "elemName", 'check');

		_defineProperty(this, "classChecked", '--checked');

		var input = element.querySelector('input'),
			type = input.getAttribute('type'),
			isChecked = input.getAttribute('checked');

		if (isChecked) {
			element.classList.add(this.classChecked);
		}

		if (type == 'checkbox') {
			element.addEventListener('click', () => {
				if (!element.classList.contains(this.classChecked)) {
					element.classList.add(this.classChecked);
					input.setAttribute('checked', 'checked');
				} else {
					element.classList.remove(this.classChecked);
					input.removeAttribute('checked', 'checked');
				}
			});
		} else if (type == 'radio') {
			element.addEventListener('click', () => {
				var name = input.getAttribute('name');

				if (name && !element.classList.contains(this.classChecked)) {
					this.removeRadios(name);
					element.classList.add(this.classChecked);
					input.setAttribute('checked', 'checked');
				}
			});
		} else {
			return false;
		}
	}

}

// DISABLE SLIDER
	function disableSwiper(element, settings, breakpoint = 1028) {
		function toggleSwiper(element, settings, breakpoint = 1028) {
			let swiper = null;

			if (document.body.offsetWidth >= breakpoint) {
				if (element.swiper) {
					swiper.destroy();
					swiper = null;
					element.swiper = null;
				}
			} else {
				if (!element.swiper) {
					swiper = new Swiper(element, settings);
				}
			}
		}

		toggleSwiper(element, settings);

		window.addEventListener('resize', () => {
			toggleSwiper(element, settings);
		});
	}

// MAIN DOCUMENT
var html = document.querySelector('html'),
	body = document.querySelector('body'),
	wrap = document.querySelector('.wrap');

var mailPattern = /^[0-9a-z_-]+@[0-9a-z_-]+.[a-z]{2,5}$/i;


// INPUT
let inputs = document.querySelectorAll('.input');
if (inputs) {
	inputs.forEach((input) => {
		input.area = input.querySelector('input');

		if (input.classList.contains('--phone')) {
			IMask(
				input.area, {
				mask: '+{7} (000) 000-00-00'
			});
		}

		input.area.addEventListener('focusin', ()=>{
			input.classList.remove('--error');
		});
	});
}

// CERTS SLIDER
let certsSlider = document.querySelector('.certs__inner');
if (certsSlider) {
	let introSliderSwiper = new Swiper(certsSlider, {
		// loop: true,
		centeredSlides: true,
		slidesPerView: 'auto',
		// spaceBetween: 20,
		speed: 900,
		pagination: {
			el: '.certs__nav.swiper-pagination',
			clickable: true,
		},
		navigation: {
			prevEl: '.certs__arrow.btn.--prev.swiper-button-prev',
			nextEl: '.certs__arrow.btn.--next.swiper-button-next',
		},
	});

	introSliderSwiper.on('slideNextTransitionStart', (e)=>{
		let active = e.activeIndex;
		let elPrev = e.el.querySelectorAll('.certs__item')[active - 1];
		let elNext = e.el.querySelectorAll('.certs__item')[active + 1];
		if (elPrev) {
			elPrev.classList.add('--hidden');
		}
		if (elNext) {
			elNext.classList.remove('--hidden');
		}
	});
	introSliderSwiper.on('slidePrevTransitionStart', (e)=>{
		let active = e.activeIndex;
		let elPrev = e.el.querySelectorAll('.certs__item')[active];

		if (elPrev) {
			elPrev.classList.remove('--hidden');
		}
	});
}


// TARIFFS

let tarrifs = document.querySelector('.tariffs__inner');
if (tarrifs) {
	let tarrifsSettings = {
		slidesPerView: 'auto',
		// centeredSlides: true
		initialSlide: 2,
		spaceBetween: 40,
		breakpoints: {
			0: {
				slidesPerView: 1,
				spaceBetween: 50,
			},
			768: {
				slidesPerView: 'auto',
			}
		}
	};
	disableSwiper(tarrifs, tarrifsSettings, 1200);
}

// FAQ TOGGLES
let faqs = document.querySelectorAll('.faq__item');
if (faqs) {
	faqs.forEach((faq) => {
		faq.answer = faq.querySelector('.faq__a');
		faq.question = faq.querySelector('.faq__q');

		faq.answer.addEventListener('click', () => {
			faq.classList.toggle('--open');
		});
	});
}

// CHECK INIT
var checks = document.querySelectorAll('.check');
checks.forEach(check => {
	new Check(check);
});

function errorInput(input) {
	input.classList.add('--error');
	return 1;
}

let validators = document.querySelectorAll('.validator');
if (validators) {
	validators.forEach((validator)=>{
		let inputsRequired = validator.querySelectorAll('.input.--required');

		validator.addEventListener('submit', (e)=>{
			e.preventDefault(); // <-- remove on integration 
			let errors = 0;
			inputsRequired.forEach((input)=>{
				if (input.area.value.length < 1) {
					errors += errorInput(input);
				}
				if (input.classList.contains('--phone') && input.area.value.length < 18) {
					errors += errorInput(input);
				}
			});

			if (errors != 0) {
				e.preventDefault();
			} else {
				$.fancybox.close();
				inputsRequired.forEach((input)=>{
					input.classList.remove('--error');
					input.area.value = '';
				});
				$.fancybox.open({
					src  : '#popup-thanks',
					type : 'inline',
				});
			}
		});
	});
}

const smoothLinks = document.querySelectorAll('.go-to a[href^="#"]');
for (let smoothLink of smoothLinks) {
	smoothLink.addEventListener('click', function (e) {
		e.preventDefault();
		const id = smoothLink.getAttribute('href');

		document.querySelector(id).scrollIntoView({
				behavior: 'smooth',
				block: 'start'
		});
	});
};


let ham = document.querySelector('.header__ham');
let nav = document.querySelector('.header__nav');
let navLinks = document.querySelectorAll('.header__nav a');
let toggleClass = '--toggle';

ham.addEventListener('click', ()=>{
	ham.classList.toggle(toggleClass);
	nav.classList.toggle(toggleClass);
	html.classList.toggle('overflow-disable');
	body.classList.toggle('overflow-disable');
	wrap.classList.toggle('overflow-disable');
});

navLinks.forEach((navLink)=>{
	navLink.addEventListener('click', ()=>{
		ham.classList.remove(toggleClass);
		nav.classList.remove(toggleClass);
		html.classList.remove('overflow-disable');
		body.classList.remove('overflow-disable');
		wrap.classList.remove('overflow-disable');
	});
});