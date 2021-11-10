var html = document.querySelector('html'),
		body = document.querySelector('body'),
		wrap = document.querySelector('.wrap');

var mailPattern = /^[0-9a-z_-]+@[0-9a-z_-]+.[a-z]{2,5}$/i;


let certs = document.querySelector('.certs__inner');
if (certs) {
	let certsSwiper = new Swiper(certs, {
		loop: true,
		loopAdditionalSlides: 6,
		slidesPerView: 'auto',
		spaceBetween: 20,
		navigation: {
			nextEl: '.certs__arrow.swiper-button-next',
			prevEl: '.certs__arrow.swiper-button-prev',
		},
		pagination: {
			el: '.certs__nav.swiper-pagination',
			type: 'bullets',
		},

	});
}

let inputs = document.querySelectorAll('.input');
if (inputs) {
	inputs.forEach((input)=>{
		input.area = input.querySelector('input');
		IMask(
			input.area, {
	    mask: '+{7} (000) 000-00-00'
	  });
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