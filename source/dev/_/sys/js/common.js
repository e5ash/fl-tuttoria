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