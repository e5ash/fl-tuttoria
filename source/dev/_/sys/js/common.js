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

// MODALS
class XModal {
	constructor(options = {
		name: 'xmodal',
		sep: '__',
		child: {
			wrap: 'wrap',
			item: 'item',
			bg: 'bg'
		},
		btns: {
			open: '[data-popup], .popup-show',
			close: '.popup-close, [data-popup-close]'
		},
		mods: {
			show: '--show',
			block: '--block',
			img: '--img',
			video: '--video',
		},
		bodyClassOpen: 'xmodal-show'
	}) {
		XModal.options = this.options = options;
		document.html = document.querySelector('html');

		this.groups = {};
		this.wrapClass = null;
		this.createDefaultElements();
		this.initBtns();

	}

	createDefaultElements() {
		this.createElement(this.options.name);
		this.createElement(this.options.child.wrap);
		this.createElement(this.options.child.bg);

		document.body.append(this.xmodal);
		this.xmodal.append(this.bg);
		this.xmodal.append(this.wrap);
	}

	createElement(name) {
		this[name] = document.createElement('div');
		if (name != this.options.name) {
			this[name].className = this.options.name + this.options.sep + name;
		} else {
			this[name].className = name;
		}
	}

	createImg(src) {
		let img = document.createElement('img');
		img.src = src;

		return img;
	}

	initBtns() {
		this.btns = {};
		this.btns.open = document.querySelectorAll(this.options.btns.open);
		// this.btns.close = document.querySelectorAll(this.options.btns.close);

		if (this.btns.open) {
			this.btns.open.forEach((btn) => {
				let href = btn.getAttribute('href'),
					src = btn.getAttribute('data-src'),
					el = src ? src : href,
					isImage = /\.jpg|\.png|\.jpeg$/.test(el),
					isVideo = /youtube/.test(el);

				btn.wrapClass = btn.getAttribute('data-popup-wrap-class');

				if (isImage) {
					let img = this.createImg(el);
					img.className = this.options.mods.img;
					btn.group = btn.getAttribute('data-group');

					if (btn.group) {
						if (!(btn.group in this.groups)) {
							this.groups[btn.group] = [];
						}
						this.groups[btn.group].push(img);
					}
					btn.addEventListener('click', (event) => {
						event.preventDefault();
						this.show('img', img, '--center');
					});
					return false;
				}

				if (isVideo) {
					let videoSrc = /(http(s|):|)\/\/(www\.|)yout(.*?)\/(embed\/|watch.*?v=|)([a-z_A-Z0-9\-]{11})/i.exec(el);
					videoSrc = videoSrc[6];

					let video = document.createElement('iframe');
					video.src = 'https://www.youtube.com/embed/' + videoSrc + '/';
					video.frameborder = 0;
					video.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
					video.className = this.options.mods.video;

					btn.addEventListener('click', (event) => {
						event.preventDefault();
						this.show('video', video, '--center');
					});
					return false;
				}

				el = document.querySelector(el);


				if (el) {
					el.classList.add(this.options.mods.block);

					btn.addEventListener('click', (event) => {
						event.preventDefault();
						this.show('block', el, btn.wrapClass);
					});
				}
			});
		}

		this.xmodal.addEventListener('click', (event) => {
			if (!event.target.closest('.' + this.options.name + this.options.sep + this.options.child.item) || event.target.closest('.popup-close')) {
				this.close();
			}
		});

		if (this.btns.close) {
			this.btns.close.forEach((btn) => {
				btn.addEventListener('click', () => {
					this.close();
				});
			});
		}

	}

	show(type = null, object, wrapClass) {
		this.object = object;
		object.removeAttribute('style');
		this.object.style.display = 'block';
		object.classList.add(this.options.name + this.options.sep + this.options.child.item);

		if (wrapClass) {
			this.wrap.classList.add(wrapClass);
			this.wrapClass = wrapClass;
		}

		if (type == 'img') {

		} else if (type == 'video') {
			this.wrap.append(object);
		} else if (type == 'block') {
			this.wrap.append(object);
		}

		this.xmodal.classList.add(this.options.mods.show);

		document.html.classList.add(this.options.bodyClassOpen);
		document.body.classList.add(this.options.bodyClassOpen);
		// disableScroll();

		let item = this.wrap.querySelector('.xmodal__item');


		if (item.scrollHeight != item.clientHeight) {
			this.wrap.classList.add('--add-touch');
		}
	}

	close() {
		// enableScroll();
		document.body.append(this.object);
		this.object.style.display = 'none';

		if (this.wrapClass) {
			this.wrap.classList.remove(this.wrapClass);
			this.wrapClass = null;
		}
		this.xmodal.classList.remove(this.options.mods.show);

		document.html.classList.remove(this.options.bodyClassOpen);
		document.body.classList.remove(this.options.bodyClassOpen);

		this.wrap.classList.remove('--add-touch');
	}
}

// MAIN DOCUMENT
var html = document.querySelector('html'),
	body = document.querySelector('body'),
	wrap = document.querySelector('.wrap');

var mailPattern = /^[0-9a-z_-]+@[0-9a-z_-]+.[a-z]{2,5}$/i;

// CERTS SLIDER
let certsSlider = document.querySelector('.certs__inner');
if (certsSlider) {
	let introSliderSwiper = new Swiper(certsSlider, {
		loop: true,
		slidesPerView: 'auto',
		spaceBetween: 20,
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
	});
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

// MODAL INIT
let xmodal = new XModal();