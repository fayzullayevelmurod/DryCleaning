const items = document.querySelectorAll('.accordion');

if (items.length) {
    items.forEach((item) => {
        const header = item.querySelector('.accordion_head');
        const content = item.querySelector('.accordion_body');
    
        header.addEventListener('click', () => {
            item.classList.toggle('active')
            content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + 'px';
        });
    });
}

$(document).ready(function () {
    $('.header .header_menu').click(function () {
        $('.menu').removeClass('noActive').addClass('active')
    })

    $('.menu .menu__content__head button').click(function () {
        $('.menu').removeClass('active').addClass('noActive')
        setTimeout(() => {
            $('.menu').removeClass('noActive')
        }, 200);
    })

    $('.menu__content__top__links').each(function (idx, el) {
        $(el).find('.open_child').click(function () {
            $(el).find('.menu__content__top__links__child').addClass('active')
        })

        $(el).find('.child_btn').click(function () {
            $('.menu__content__top__links__child').removeClass('active')
        })
    })

    $('.header_select_list .list_content button').click(function() {
        $('.header_select_list .list_content button').removeClass('active');
        $(this).addClass('active');
        $('.header_select_wrap').removeClass('active')
        $('.list_content_bg').removeClass('active')
        $('.header_select span').text($(this).find('span').text())
    });

    $('.header_select').click(function () {
        $('.header_select_wrap').toggleClass('active')
        $('.list_content_bg').toggleClass('active')
    })

    $('.list_content_bg').click(function () {
        $('.header_select_wrap').removeClass('active')
        $('.list_content_bg').removeClass('active')
    })

    $('.header_select_wrap .mobile_header_select button').click(function () {
        $('.header_select_wrap').removeClass('active')
        $('.list_content_bg').removeClass('active')
    })

    $('.input-light, .input-dark').each(function (idx, el) {
        $(el).find('label').click(function () {
            $(el).find('input').focus();
        })
        $(el).find('input').on('focus', function () {
            $(el).addClass('active');
            checkValid(el)
        })
        $(el).find('input').on('blur', function () {
            $(el).removeClass('active');
            checkValid(el)
        })

        checkValid(el)
    })

    $('.checkbox').each(function (idx, el) {
        handleCheckbox(el);
        $(el).click(function () {
            $(this).find('input')[0].click()
            handleCheckbox(this);
        })
    })

    $('.tab').each(function (idx, el) {
        $(el).find('.tab_body .list_group').not($(el).find('.tab_body .list_group')[0]).fadeOut(0);
        $(el).find('.tab_head button').each(function (btn_idx, btn) {
            $(btn).click(function () {
                $(el).find('.tab_body .list_group').not($(el).find('.tab_body .list_group')[btn_idx]).fadeOut(0);
                $($(el).find('.tab_body .list_group')[btn_idx]).fadeIn('300')
                $($(el).find('.tab_head button')).not($(this)).removeClass('active');
                $(this).addClass('active')
            })
        })
    })
    
    if ($('.final_price')[0]) {
        $('.final_price .catalog_card__item').each(function (idx, el) {
            handleCheckbox(el)
            $(el).click(function () {
                $(this).find('input')[0].click()
                handleCheckbox(this);
            })
        })
    }

    if ($('.comment .comment_card')[0]) {
        let comment_card = new Swiper('.comment .comment_card', {
            slidesPerView: 'auto',
            spaceBetween: 24,
            navigation: {
                nextEl: '.comment .next_btn',
                prevEl: '.comment .prev_btn'
            },
            pagination: {
                el: ".comment .comment_card_paginate .count",
                type: "fraction",
            },
        })

        // const makeFraction = async () => {
        //     let real_idx = await comment_card.realIndex + 1;
        //     let slid_length = await comment_card.slides.length;
        //     let slide_count = await document.querySelector('.comment .comment_card_paginate .count');
        //     slide_count.textContent = `${real_idx}/${slid_length}`;
        // }
    
        // comment_card.on('slideChange', () => makeFraction())
    
        // makeFraction();
    }

    let init = false;
    let home_card_slider;
    let home_card = $('.home_card .cards');
    
    if (home_card) {
        function swiperCard() {
            if (window.innerWidth <= 992) {
                if (!init) {
                    init = true;
                    home_card_slider = new Swiper(".home_card .cards", {
                        slidesPerView: 1.1,
                        centeredSlides: true,
                        spaceBetween: 11,
                        loop: true,
                        pagination: {
                            el: ".home_card_slider_pagination",
                            clickable: true,
                        },
                        breakpoints: {
                            500: {
                                slidesPerView: 2,
                            }
                        }
                    });
                }
            } else if (init) {
                home_card_slider.destroy();
                init = false;
            }
        }
        swiperCard();
    }

    let init2 = false;
    let final_price_slider;
    let final_price = $('.final_price .catalog_card')[0];
    
    if (final_price) {
        function swiperCard2() {
            if (window.innerWidth <= 992) {
                if (!init2) {
                    init = true;
                    final_price_slider = new Swiper(".final_price .catalog_card", {
                        slidesPerView: 'auto',
                        spaceBetween: 24,
                    });
                }
            } else if (init2) {
                final_price_slider.destroy();
                init2 = false;
            }
        }
        swiperCard2();
    }

    window.addEventListener("resize", function () {
        if (final_price) {
            swiperCard2();
        }
        if (home_card) {
            swiperCard();
        }
    });
})

function checkValid (el) {
    if ($(el).find('input')[0].value) {
        $(el).addClass('active');
    }
}

function handleCheckbox (el) {
    if ($(el).find('input')[0].checked) {
        $(el).addClass('active');
    } else {
        $(el).removeClass('active')
    }
}