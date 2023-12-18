$(document).ready(function () {
    if ($('input[type="tel"]').length) {
        $('input[type="tel"]').inputmask({"mask": "+7 999 999-99-99"})
    }

    $('.header .header_menu').click(function () {
        $('.menu').removeClass('noActive').addClass('active')
    })

    $('.select2_example select').select2({
        placeholder: "Сортировка",
        minimumResultsForSearch: -1,
        width: 'resolve',
        templateResult: function(e) {
            val = e.element;
            if(val){
                val = `${val.text} <img src="./images/icons/select_icon.svg" alt="">`;
            }
            return val;
        },
        escapeMarkup: function(m) {
            return m;
        }
    });
    
    $('b[role="presentation"]').hide();
    $('.select2_example .select2-selection__arrow').html('<svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1.5L6 6.5L11 1.5" stroke="#062433" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M1 1.5L6 6.5L11 1.5" stroke="black" stroke-opacity="0.2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>');

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
        $(el).find('.tab_body .tab_item').not($(el).find('.tab_body .tab_item')[0]).fadeOut(0);
        $(el).find('.tab_head button').each(function (btn_idx, btn) {
            $(btn).click(function () {
                $(el).find('.tab_body .tab_item').not($(el).find('.tab_body .tab_item')[btn_idx]).fadeOut(0);
                $($(el).find('.tab_body .tab_item')[btn_idx]).fadeIn('300')
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
    }

    if ($('.comment .comment_card .comment_card_item').length) {
        $('.comment .comment_card .comment_card_item').click(function () {
            let el = $(this).clone()[0];
            $('.card_modal').addClass('active');
            $('.card_modal .card_modal_content').append($(this).clone());
            closeModal();
        })

        $('.card_modal .card_modal_bg').click(function () {
            $('.card_modal').removeClass('active');
            $('.card_modal .card_modal_content .comment_card_item').remove();
        })
    }

    if ($('.accordion').length) {
        $('.accordion').each(function (idx, el) {
            $(el).find('.accordion_body').slideUp(0)
            $(el).find('.accordion_head').click(function () {
                $(el).toggleClass('active')
                $(el).find('.accordion_body').slideToggle(300);
            })
        })
    }
    
    let init = false;
    let home_card_slider;
    let home_card = $('.home_card .cards');
    
    if (home_card) {
        function swiperCard() {
            if (window.innerWidth <= 1250) {
                if (!init) {
                    init = true;
                    home_card_slider = new Swiper(".home_card .cards", {
                        slidesPerView: 'auto',
                        spaceBetween: 18,
                        scrollbar: {
                            el: ".home_card_pagination",
                        },
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
                        spaceBetween: 18,
                        scrollbar: {
                            el: ".catalog_card__paginate",
                        },
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

function closeModal () {
    $('.comment_card_item .close_modal').click(function () {
        $('.card_modal .card_modal_content .comment_card_item').remove();
        $('.card_modal').removeClass('active')
    })
}

