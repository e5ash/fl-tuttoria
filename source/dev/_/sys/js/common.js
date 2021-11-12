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



var html = document.querySelector('html'),
		body = document.querySelector('body'),
		wrap = document.querySelector('.wrap');

var mailPattern = /^[0-9a-z_-]+@[0-9a-z_-]+.[a-z]{2,5}$/i;


let certsSlider = document.querySelector('.certs__inner');
	if (certsSlider) {
		let introSliderSwiper = new Swiper(certsSlider, {
			loop: true,
			slidesPerView: 'auto',
			// slidesOffsetBefore: 700,
			spaceBetween: 20,
			// centeredSlides: true,
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
	}

let inputs = document.querySelectorAll('.input');
if (inputs) {
	inputs.forEach((input)=>{
		input.area = input.querySelector('input');
		
		if (input.classList.contains('--phone')){
			IMask(
				input.area, {
				mask: '+{7} (000) 000-00-00'
			});
		}
	});
}

let faqs = document.querySelectorAll('.faq__item');
if (faqs) {
	faqs.forEach((faq)=>{
		faq.answer = faq.querySelector('.faq__a');
		faq.question = faq.querySelector('.faq__q');

		faq.answer.addEventListener('click', ()=>{
			faq.classList.toggle('--open');
		});
	});
}

var checks = document.querySelectorAll('.check');
checks.forEach(check => {
	new Check(check);
});