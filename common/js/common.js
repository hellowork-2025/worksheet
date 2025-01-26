// common scripts

//get locale
var thisLocale =
    navigator.languages && navigator.languages.length ?
    navigator.languages[0].substr(0, 2) :
    navigator.language.substr(0, 2);

var userLocale =
    thisLocale == "ko" ?
    "ko" :
    "en"

//검색창 및 상단 탭
$(document).ready(function () {
    //검색창 1줄시 접고 펼치기 버튼 제거
    if ($('.searchAreaWrap').height() <= 46) {
        $(".searchBox").off().addClass("none");
    }

    //검색창 접고 펼치기 인터랙션
    $(".flipToggle").off().click(function () {
        $(".searchAreaWrap .divd3:not(:first-child), .searchAreaWrap .divd4:not(:first-child)").slideToggle(200)
        $(".searchAreaWrap").toggleClass("active");
        $(this).toggleClass("active");
    });

    //초기화 기능
    $(".topInfo .searchReset").off('click').click(function () {
        // console.log('reset!!')
        $(".searchBox input:not('.except')").val(null)
        $(".searchBox select:not('.except')").val(null).trigger("change");
    });

    // 즐겨찾기 active 스위칭
    $(".bookMark").click(function () {
        $(this).toggleClass("active");
    });

    $(".pinWrap").click(function () {
        $(this).toggleClass("active");
    });

});

// 시스템 국가 시간 함수
$(document).ready(function () {
    function updateClock() {
        let clock = document.querySelectorAll(".clock");
        let date = new Date();

        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let thisYear = date.getFullYear();
        let month = date.getMonth() + 1;
        let dateNumber = date.getDate();

        if (hours < 10) hours = "0" + hours;
        if (minutes < 10) minutes = "0" + minutes;
        if (seconds < 10) seconds = "0" + seconds;
        if (month < 10) month = "0" + month;
        if (dateNumber < 10) dateNumber = "0" + dateNumber;

        clock.forEach(clock => {

            clock.innerHTML = thisYear + "-" + month + "-" + dateNumber + "&nbsp;" + "&nbsp;" + hours + ":" + minutes + ":" + seconds;
        })
    }

    updateClock();
    setInterval(updateClock, 1000);
});


//검색 인풋박스 기능
//23-04-07 수정
$(document).ready(function () {
    $(".inputBox.search input").on(
        "propertychange change keyup paste input",
        function () {
            this.setAttribute("value", this.value);
        }
    );
    $(".inputBox.search .reset").on("click", function () {
        $(this).siblings("input").attr("value", "");
        $(this).siblings("input").val("");

        $(this).parent().siblings(".inputBox").find("input").attr("value", "");
        $(this).parent().siblings(".inputBox").find("input").val("");
    });
    
    //정산 요청으로 추가 23-09-25
    $(".inputBox.search .resetVer1").on("click", function () {
        $(this).siblings("input").attr("value", "");
        $(this).siblings("input").val("");

        $(this).parent().siblings(".inputBox").find("input").attr("value", "");
        $(this).parent().siblings(".inputBox").find("input").val("");
    });
});

// 23-06-13 추가
//화면 최초 진입 시 input이 value 값과 disabled를 가지고 있는 경우, reset display none처리
$(document).ready(function () {
    $(".inputBox.search input").on(
        "propertychange change keyup paste input",
        function () {
            this.setAttribute("value", this.value);
        }
    );
    $(".inputBox.search .reset").on("click", function () {
        var $input = $(this).siblings("input");
        if ($input.prop("disabled") && $input.val() !== "") {
            $(this).css("display", "none");
        }
        $input.attr("value", "").val("");
        var $siblingInput = $(this).parent().siblings(".inputBox").find("input");
        if ($siblingInput.prop("disabled") && $siblingInput.val() !== "") {
            $(this).parent().siblings(".inputBox").find(".reset").css("display", "none");
        }
        $siblingInput.attr("value", "").val("");
    });
    $(".inputBox.search input").each(function () {
        var $input = $(this);
        if ($input.val() !== "" && $input.prop("disabled")) {
            $input.siblings(".reset").css("display", "none");
        }
    });
});

//체크박스 라벨 클릭시 기능 
$(document).ready(function () {
    $(document).on("click", ".inputBox input[type=checkbox]+label, .inputBox input[type=radio]+label, .inputBox input[type=radio]+label+.themeImg", function () {
        if ($(this).attr('for') == undefined || $(this).attr('for') != $(this).siblings("input").attr('id')) {
            $(this).siblings("input").click();
        }
    });

});

//인탭 기능 
$(document).ready(function () {
    $(".tab-a").off().click(function () {
        $(".tab").removeClass("tab-active");
        $(".tab[data-id='" + $(this).attr("data-id") + "']").addClass("tab-active");
        $(".tab-a").parent().removeClass("active-a");
        $(this).parent().addClass("active-a");
    });

    $(".tab-a02").off().click(function () {
        $(".tab02").removeClass("tab-active");
        $(".tab02[data-id='" + $(this).attr("data-id") + "']").addClass("tab-active");
        $(".tab-a02").parent().removeClass("active-a");
        $(this).parent().addClass("active-a");
    });

    // $(".tab-a03").click(function () {
    //   $(".tab03").removeClass("tab-active");
    //   $(".tab03[data-id='" + $(this).attr("data-id") + "']").addClass("tab-active");
    //   $(".tab-a03").parent().removeClass("active-a");
    //   $(this).parent().addClass("active-a");
    // });

});

//select
$(document).ready(function () {
    //sigle
    function formatState(state) {
        if (!state.id) {
            return state.text;
        }
        if (state.title) {
            var $state = $(
                '<span class="memoTip">' + state.text + '</span>'
            );
            return $state;
        } else {
            return state.text;
        }
    };

    $(".select").select2({
        width: "100%",
        templateResult: formatState,
        maximumInputLength: 8,
    });
    $(".selectSearchDp").select2({
        width: "100%",
        templateResult: formatState
    })
    // 입력텍스트 제한
    $(document).on("select2:open", ".select", function (e) {
        var maxLength = 8;
        $('.select2-search__field').attr('maxlength', maxLength);

    });
    $(document).on("select2:open", "withSearchBar > .select", function (e) {
        var maxLength = 8;
        $('.select2-search__field').attr('maxlength', maxLength);

    });

    if ($('.pageSizeElement > .select').hasClass("select2-hidden-accessible")) {
        // $('.select').removeClass("select2-hidden-accessible");
        $(this).select1('destroy');
    }

    $(".select").on('select2:open', function (e) {
        // $(this).val(null).trigger('change');
        window.setTimeout(function () {
            document.querySelector('input.select2-search__field').focus();
        }, 0);
    });

    // on first focus (bubbles up to document), open the menu
    $(document).on('focus', '.select2-selection.select2-selection--single', function (e) {
        $(this).closest(".select2-container").siblings('select:enabled').select2('open');
    });

    // steal focus during close - only capture once and stop propogation
    $('.select').on('select2:closing', function (e) {
        $(e.target).data("select2").$selection.one('focus focusin', function (e) {
            e.stopPropagation();
        });
    });



    $(".selectMulti").select2({
        width: "100%",
        multiple: true,
        templateResult: formatState,
        maximumInputLength: 8,

    });




    //2023-02-22 multiSelect 옵션 변경 내용
    $(document).on("select2:select", ".selectMulti", function (e) {
        //**전체 옵션 value="" 이여야만 합니다. **//
        var exists = 0 != $(this).find(`option[value=""]`).length; //전체(value="")옵션이 있다면 true를 반환합니다.

        if (exists) { //전체(value="")가 있는경우 아래의 기능을 실행합니다.

            if (e.params.data.id == "") { //전체선택시

                $(this).val("").trigger('change') //전체 항목 외 목록을 제거

            } else if (e.params.data.id != "") { //전체선택 외 옵션 선택시

                var presentOptions = $(this).val(), //선택된옵션을가져옵니다.
                    filterOptions = presentOptions.filter(data => data != ""), //선택된 옵션에서 전체(value="")항목을 제외한 목록을 반환합니다.
                    hasAll = presentOptions.findIndex(data => data == "") //선택된 옵션에서 전체(value="")항목을 찾습니다. 있는경우 0, 없는경우 -1 숫자를 반환합니다.

                if (hasAll != -1) { //전체 항목이 있는경우

                    $(this).val(filterOptions).trigger('change') //전체 항목을 제외한 목록으로 변경

                }


                if (filterOptions.length == $(this).find('option').length - 1) {
                    let selectAll = $(this)
                    setTimeout(function () {
                        selectAll.val("").trigger('change') //전체 항목 외 목록을 제거
                    }, 0)

                }
            }
        }

    });

    // 입력글자수 제한
    $(document).on("select2:open", ".selectMulti", function (e) {
        var maxLength = 8
        $('.select2-search__field').attr('maxlength', maxLength);


    });

    $(".select, .selectMulti").on("select2:closing", function (e) {
        $('.ui-tooltip').remove()
    })

    // 2023-04-14 searchBox .labelSelectBox 드롭다운 클래스 추가 함수
    $(".labelSelectBox > .selectBox >  .select").select2({
        width: "100%",
        dropdownCssClass: "labelSelectDropdown",
    });

    $(".withSearchBar > .select").select2(({
        width: "100%",
        dropdownCssClass: "withSchBarDD",
        maximumInputLength: 8
    }))

    $('.selectMulti').parent('.inputBox').css({
        'overflow': 'unset',
        'height': 'auto'
    });
});


// datepicker
$(document).ready(function () {
    $(".dateSingle").each(function () {
        let inText, splt;

        //입력택스트 제한
        $(this).attr("maxlength", "8")

        // 옵션
        $(this).dateRangePicker({
            singleDate: true,
            showShortcuts: false,
            singleMonth: true,
            monthSelect: true,
            yearSelect: true,
            language: userLocale,
            autoClose: true
        })

        $(this).bind('datepicker-change change input', function () {
            //숫자만 입력 가능
            $(this).val($(this).val().replace(/[^0-9,-]/g, ""));

            //유효성 검사
            if (moment($(this).val()).format("YYYY-MM-DD") != "Invalid date") {
                $(this).removeClass("invalid")
            } else if ($(this).val() != "") {
                $(this).addClass("invalid")
            }
        });

        //유효성 검사후 경고
        //값 변경시 실행 함수 위치하는 곳 
        $(this).bind('datepicker-change change', function () {
            if ($(this).hasClass("invalid")) {
                swal("Not a valid date", "Please enter a valid date", "warning", {
                        button: false,
                        closeModal: false,
                    }, )
                    .then(() => {
                        $(this).select()
                    })
            }
        });

        //탭 인
        $(this).on("keyup", function (e) {
            let code = e.keyCode || e.which;

            e.stopPropagation();
            if (code == 9 && $(this).is(":focus")) {
                $(this).data('dateRangePicker').open(0);
                inText = this.value.replace(/-/g, "");
                $(this).val(inText).select()
            }
        })

        //탭 아웃
        $(this).on("keydown", function (e) {
            let code = e.keyCode || e.which;
            e.stopPropagation();
            if (code == 9 || code == 27 && $(this).is(":focus")) {
                $(this).data('dateRangePicker').close(0);
            }
            if ($(this).hasClass("invalid") && code == 9 || code == 13) {
                e.preventDefault()
                $(this).blur()
            }
        })

        //포커스 인
        $(this).on("focus", function () {
            inText = $(this).val().replace(/-/g, "")
            $(this).val(inText).select()
        })

        //포커스 아웃
        $(this).on("focusout", function () {
            splt = $(this).val().replace(/-/g, "").split("")
            inText = splt[0] + splt[1] + splt[2] + splt[3] + "-" + splt[4] + splt[5] + "-" + splt[6] + splt[7]
            if ($(this).val()) {
                $(this).val(inText)
            }
        })
    });

    $(".dateRange").each(function () {
        let inText, splt;

        //입력 택스트 제한
        $(this).find('.from, .to').attr("maxlength", "8")

        //옵션
        $(this).dateRangePicker({
            separator: ' ~ ',
            getValue: function () {
                if ($(this).find('.from').val() && $(this).find('.to').val())
                    return $(this).find('.from').val() + ' ~ ' + $(this).find('.to').val();
                else
                    return '';
            },
            setValue: function (s, s1, s2) {
                $(this).find('.from').val(s1);
                $(this).find('.to').val(s2);
            },
            monthSelect: true,
            yearSelect: true,
            language: userLocale,
            autoClose: true
        })

        $(this).bind("change input", function () {
            $(this).find(".from, .to").each(function () {
                //숫자만 입력가능
                $(this).val($(this).val().replace(/[^0-9,-]/g, ""));
            })
        })
        $(this).bind("datepicker-change", function () {
            //유효성 검사
            $(this).find(".to").each(function () {
                if (moment($(this).val()).format("YYYY-MM-DD") != "Invalid date") {
                    $(this).removeClass("invalid")
                    $(this).siblings(".from").removeClass("invalid")
                } else if (moment($(this).val()).format("YYYY-MM-DD") != "") {
                    $(this).addClass("invalid")
                    $(this).siblings(".from").addClass("invalid")
                }
            })
            $(this).find(".from").each(function () {
                if (moment($(this).val()).format("YYYY-MM-DD") != "Invalid date") {
                    $(this).removeClass("invalid")
                    $(this).siblings(".to").removeClass("invalid")
                } else if (moment($(this).val()).format("YYYY-MM-DD") != "") {
                    $(this).addClass("invalid")
                    $(this).siblings(".to").addClass("invalid")
                }
            })
        })
        //유효성 검사
        //2023-02-20 유효성검사 내용 수정
        $(this).find(".to").on("change", function () {
            if (moment($(this).val()).format("YYYY-MM-DD") != "Invalid date") {
                $(this).removeClass("invalid")
                $(this).siblings(".from").removeClass("invalid")
            } else if (moment($(this).val()).format("YYYY-MM-DD") != "" && $(this).val() != "") {
                $(this).addClass("invalid")
                $(this).siblings(".from").addClass("invalid")
            } else if ($(this).val() == "") {
                $(this).removeClass("invalid")
                $(this).siblings().val("").removeClass("invalid")
                $(this).parent().data('dateRangePicker').clear();
            }
        })
        $(this).find(".from").on("change", function () {
            if (moment($(this).val()).format("YYYY-MM-DD") != "Invalid date") {
                $(this).removeClass("invalid")
                $(this).siblings(".to").removeClass("invalid")
            } else if (moment($(this).val()).format("YYYY-MM-DD") != "" && $(this).val() != "") {
                $(this).addClass("invalid")
                $(this).siblings(".to").addClass("invalid")
            } else if ($(this).val() == "") {
                $(this).removeClass("invalid")
                $(this).siblings().val("").removeClass("invalid")
                $(this).parent().data('dateRangePicker').clear();
            }
        })

        //유효성 검사후 경고
        //값 변경시 실행 함수 위치하는 곳 
        $(this).find(".from, .to").on("change", function () {
            if ($(this).hasClass("invalid")) {
                swal("Not a valid date", "Please enter a valid date", "warning", {
                        button: false,
                        closeModal: false,
                    }, )
                    .then(() => {
                        $(this).select()
                    })
            }
        })

        //탭 인
        $(this).find('.from, .to').on("keyup", function (e) {
            let code = e.keyCode || e.which;

            e.stopPropagation();
            if (code == 9 && $(this).is(":focus")) {
                $(this).parent().data('dateRangePicker').open(0);
                inText = this.value.replace(/-/g, "");
                $(this).val(inText).select()
            }

        })

        //탭 아웃
        $(this).find('.from, .to').on("keydown", function (e) {
            let code = e.keyCode || e.which;

            if (code == 9 || code == 27 && $(this).is(":focus")) {
                $(this).parent().data('dateRangePicker').close(0);
            }
            e.stopPropagation();
            if ($(this).hasClass("invalid") && code == 9 || code == 27) {
                e.preventDefault()
                $(this).blur()
            }
        })

        //포커스 인
        $(this).find(".from, .to").on("focus", function () {
            $(this).parent().data('dateRangePicker').open(0);
            inText = $(this).val().replace(/-/g, "")
            $(this).val(inText).select()
        })

        //포커스 아웃
        $(this).find(".from, .to").on("focusout", function () {
            splt = $(this).val().replace(/-/g, "").split("")
            inText = splt[0] + splt[1] + splt[2] + splt[3] + "-" + splt[4] + splt[5] + "-" + splt[6] + splt[7]
            if ($(this).val()) {
                $(this).val(inText)
            }
        })
    });


    // 시간 선택 datePicker
    $('input.time').each(function () {
        let inText, split;

        //입력택스트 제한
        $(this).attr("maxlength", "4")

        //옵션
        $(this).dateRangePicker({
            singleDate: true,
            showShortcuts: false,
            singleMonth: true,
            format: 'HH:mm',
            time: {
                enabled: true
            },
            extraClass: 'noCalndr',
            language: userLocale,
        });

        $(this).bind('datepicker-change change input', function () {
            let today = new Date();
            //숫자만 입력 가능
            $(this).val($(this).val().replace(/[^0-9,:]/g, ""));

            //유효성 검사
            split = $(this).val().replace(/:/g, "").split("")
            if (moment(moment(today).format("YYYY-MM-DD ") + split[0] + split[1] + ":" + split[2] + split[3]).format('HH:mm') != "Invalid date") {
                $(this).removeClass("invalid")
            } else if ($(this).val() != "") {
                $(this).addClass("invalid")
            }
            if ($(this).val() == "") {
                $(this).removeClass("invalid")
                $(this).data('dateRangePicker').clear();
            }
        });

        //탭 인
        $(this).on("keyup", function (e) {
            let code = e.keyCode || e.which;

            e.stopPropagation();
            if (code == 9 || code == 27 && $(this).is(":focus")) {
                $(this).data('dateRangePicker').open(0);
                inText = this.value.replace(/-/g, "");
                $(this).val(inText).select()
            }
        })

        //탭 아웃
        $(this).on("keydown", function (e) {
            let code = e.keyCode || e.which;
            e.stopPropagation();
            if (code == 9 || code == 27 && $(this).is(":focus")) {
                $(this).data('dateRangePicker').close(0);
            }
            if ($(this).hasClass("invalid") && code == 9 || code == 13) {
                e.preventDefault()
                $(this).blur()
            }
        })

        //포커스 인
        $(this).on("focus", function () {
            inText = $(this).val().replace(/:/g, "")
            $(this).val(inText).select()
        })

        //포커스 아웃
        $(this).on("focusout", function () {
            splt = $(this).val().replace(/:/g, "").split("")
            inText = splt[0] + splt[1] + ":" + splt[2] + splt[3]
            if ($(this).val()) {
                $(this).val(inText)
            }
        })

        //유효성 검사후 경고
        //값 변경시 실행 함수 위치하는 곳 
        $(this).bind('datepicker-change change', function () {
            setTimeout(function () {
                if ($(this).hasClass("invalid")) {
                    swal("Not a valid date", "Please enter a valid date", "warning", {
                            button: false,
                            closeModal: false,
                        }, )
                        .then(() => {
                            $(this).select()
                        })
                }
            }, 200)
        });
    });

    //날짜 시간 유형
    $(".dateTimeSingle").each(function () {
        let inText, split;

        //입력택스트 제한
        $(this).attr("maxlength", "12")

        //옵션
        $(this).dateRangePicker({
            singleDate: true,
            showShortcuts: false,
            singleMonth: true,
            format: 'YYYY-MM-DD HH:mm',
            monthSelect: true,
            yearSelect: true,
            time: {
                enabled: true
            },
            language: userLocale,
        })

        $(this).on("change input", function () {
            //숫자만 입력 가능
            $(this).val($(this).val().replace(/[^0-9]/g, ""));

            //유효성 검사
            if (moment($(this).val()).format("YYYY-MM-DD HH:mm") != "Invalid date") {
                $(this).removeClass("invalid")
            } else if ($(this).val() != "") {
                $(this).addClass("invalid")
            }
        })

        $(this).bind("datepicker-change change input", function () {
            //유효성 검사
            if (moment($(this).val()).format("YYYY-MM-DD HH:mm") != "Invalid date") {
                $(this).removeClass("invalid")
            } else if ($(this).val() != "") {
                $(this).addClass("invalid")
            }
        })

        //탭 인
        $(this).on("keyup", function (e) {
            let code = e.keyCode || e.which;

            e.stopPropagation();
            if (code == 9 && $(this).is(":focus")) {
                $(this).data('dateRangePicker').open(0);
                inText = this.value.replace(/:/g, "").replace(/ /g, "").replace(/-/g, "");
                $(this).val(inText).select()
            }
        })

        //탭 아웃
        $(this).on("keydown", function (e) {
            let code = e.keyCode || e.which;
            e.stopPropagation();
            if (code == 9 || code == 27 && $(this).is(":focus")) {
                $(this).data('dateRangePicker').close(0);
            }
            if ($(this).hasClass("invalid") && code == 9 || code == 13) {
                e.preventDefault()
                $(this).blur()
            }
        })

        //포커스 인
        $(this).on("focus", function () {
            inText = $(this).val().replace(/:/g, "").replace(/ /g, "").replace(/-/g, "");
            $(this).val(inText).select()
        })

        //포커스 아웃
        $(this).on("focusout", function () {
            if ($(this).val()) {
                split = $(this).val().replace(/:/g, "").replace(/ /g, "").replace(/-/g, "").split("")
                inText = split[0] + split[1] + split[2] + split[3] + "-" + split[4] + split[5] + "-" + split[6] + split[7] + " " + split[8] + split[9] + ":" + split[10] + split[11]

                $(this).val(inText)
            }
        })

        //유효성 검사후 경고
        //값 변경시 실행 함수 위치하는 곳 
        $(this).bind('datepicker-change change', function () {
            setTimeout(function () {
                if ($(this).hasClass("invalid")) {
                    swal("Not a valid date", "Please enter a valid date", "warning", {
                            button: false,
                        }, )
                        .then(() => {
                            $(this).select()
                        })
                }
            }, 200)
        });
    });

    $(".dateRange input.time").each(function () {
        $(this).on("mousedown", function (e) {
            $(this).parent().data('dateRangePicker').close(0);
            e.stopPropagation()
        })
    })

    //월력 (월 단위 유형)
    $("input.month").each(function () {
        let inText;

        //입력택스트 제한
        $(this).attr("maxlength", "6")

        //옵션
        if (userLocale == "ko") {
            $(this).monthpicker({
                monthNames: ['1월(JAN)', '2월(FEB)', '3월(MAR)',
                    '4월(APR)', '5월(MAY)', '6월(JUN)',
                    '7월(JUL)', '8월(AUG)', '9월(SEP)', '10월(OCT)',
                    '11월(NOV)', '12월(DEC)'
                ],
                monthNamesShort: ['1월', '2월', '3월', '4월', '5월',
                    '6월', '7월', '8월', '9월', '10월', '11월', '12월'
                ],
                closeText: '닫기',
                changeYear: true,
                dateFormat: "yy-mm",
                onClose: function () {
                    // console.log(this.value.replace(/-/g, ""))
                },
                showButtonPanel: true
            });
        } else {
            $(this).monthpicker({
                closeText: 'close',
                changeYear: true,
                dateFormat: "yy-mm",
                onClose: function () {
                    // console.log(this.value.replace(/-/g, ""))
                },
                showButtonPanel: true
            });
        }

        $(this).on("change input", function () {
            //숫자만 입력 가능
            $(this).val($(this).val().replace(/[^0-9,-]/g, ""));

            //유효성 검사
            if (moment($(this).val()).format("YYYY-MM") != "Invalid date") {
                $(this).removeClass("invalid")
            } else if ($(this).val() != "") {
                $(this).addClass("invalid")
            }
        })

        //탭 아웃
        $(this).on("keydown", function (e) {
            let code = e.keyCode || e.which;
            e.stopPropagation();

            if ($(this).hasClass("invalid") && code == 9 || code == 13) {
                e.preventDefault()
                $(this).blur()
            }
        })

        //포커스 인
        $(this).on("focus", function () {
            inText = this.value.replace(/-/g, "");
            setTimeout(() => {
                $(this).val(inText).select();
            }, 0);
        })

        //포커스 아웃
        $(this).on("focusout", function () {
            inText = this.value.replace(/-/g, "").replace(/(.{4})/g, "$1-");
            $(this).val(inText);

        })

        //유효성 검사후 경고
        $(this).on("change", function () {
            setTimeout(function () {
                if ($(this).hasClass("invalid")) {
                    swal("Not a valid date", "Please enter a valid date", "warning", {
                            button: false,
                        })
                        .then(() => {
                            $(this).select()
                        })
                }
            }, 200)
        })
    })

    // 월 단위 기간 선택
    $(".monthRange").each(function () {
        let monthStart, monthEnd;

        $(this).find(".from").on("change", function () {
            monthStart = $(this).val().replace(/-/g, "")
            monthEnd = $(this).siblings(".to").val().replace(/-/g, "")

            if (monthStart < monthEnd) {
                $(this).removeClass("invalid")
                $(this).siblings(".to").removeClass("invalid")
            } else if (monthEnd != "" && $(this).val != "") {
                $(this).addClass("invalid")
                $(this).siblings(".to").addClass("invalid")
                swal("Not a valid date", "Please enter a valid date", "warning", {
                        button: false,
                    })
                    .then(() => {
                        $(this).select()
                    })
            }
            if ($(this).val() == "") {
                $(this).removeClass("invalid")
                $(this).siblings().val("").removeClass("invalid")
            }
        })
        $(this).find(".to").on("change", function () {
            monthStart = $(this).siblings(".from").val().replace(/-/g, "")
            monthEnd = $(this).val().replace(/-/g, "")
            if (monthStart < monthEnd) {
                $(this).siblings(".from").removeClass("invalid")
                $(this).removeClass("invalid")
            } else if ($(this).val() == "") {
                $(this).removeClass("invalid")
                $(this).siblings().val("").removeClass("invalid")
            } else if (monthStart != "" && $(this).val != "") {
                $(this).addClass("invalid")
                $(this).siblings(".from").addClass("invalid")
                swal("Not a valid date", "Please enter a valid date", "warning", {
                        button: false,
                    })
                    .then(() => {
                        $(this).select()
                    })
            }

        })
    })

    // 시간 범위 선택
    $(".timeRange").each(function () {
        let timeStart, timeEnd;

        $(this).find(".from").bind("change datepicker-change", function () {
            timeStart = $(this).val().replace(/:/g, "")
            timeEnd = $(this).siblings(".to").val().replace(/:/g, "")
            if (timeStart < timeEnd) {
                $(this).removeClass("invalid")
                $(this).siblings(".to").removeClass("invalid")
            } else if (timeEnd != "" && $(this).val != "") {
                $(this).addClass("invalid")
                $(this).siblings(".to").addClass("invalid")
                swal("Not a valid date", "Please enter a valid date", "warning", {
                        button: false,
                    })
                    .then(() => {
                        $(this).select()
                    })
            }
            if ($(this).val() == "") {
                $(this).removeClass("invalid")
                $(this).siblings(".to").data('dateRangePicker').clear();
            }
        })

        $(this).find(".to").bind("change datepicker-change", function () {
            timeStart = $(this).siblings(".from").val().replace(/:/g, "")
            timeEnd = $(this).val().replace(/:/g, "")
            if (timeStart < timeEnd) {
                $(this).siblings(".from").removeClass("invalid")
                $(this).removeClass("invalid")
            } else if ($(this).val() == "") {
                $(this).removeClass("invalid")
                $(this).siblings().removeClass("invalid")
                $(this).siblings(".from").data('dateRangePicker').clear();
            } else if (timeStart != "" && $(this).val != "") {
                $(this).siblings(".from").addClass("invalid")
                $(this).addClass("invalid")
                swal("Not a valid date", "Please enter a valid date", "warning", {
                        button: false,
                    })
                    .then(() => {
                        $(this).select()
                    })
            }
        })
    })
});


//slider
$(function () {
    $(".singleSlider").each(function () {
        let minVal = Number($(this).children(".value").attr("min"))
        let maxVal = Number($(this).children(".value").attr("max"))

        $(this).children(".picker").slider({
            range: "min",
            min: minVal,
            max: maxVal,
            slide: function (event, ui) {
                $(this).siblings(".value").val(ui.value);
                $(this).siblings(".rvalue").val(100 - ui.value);
            }
        })

        $(this).children(".float").slider({
            step: 0.1,
            slide: function (event, ui) {
                $(this).siblings(".value").val(ui.value);
            }
        })

        $(this).children(".value").val($(this).children(".picker").slider("value"))

        $(this).children(".value").off().on("change, input", function () {
            // $(this).siblings("div").find("span").addClass("ui-state-active")
            $(this).siblings(".picker").slider("value", $(this).val())
            $(this).siblings(".rvalue").val(100 - $(this).val());
        })

        $(this).children(".rvalue").off().on("change, input", function () {
            $(this).siblings(".picker").slider("value", 100 - $(this).val())
            $(this).siblings(".value").val(100 - $(this).val());
        })
    })

    // function InputChange(){
    //     $(this).siblings("div").find("span").addClass("ui-state-active")
    // }


    $(".rangeSlider").each(function () {
        let minVal = Number($(this).children(".min").attr("min"));
        let maxVal = Number($(this).children(".max").attr("max"));
        let setMin = Math.round(minVal + ((maxVal - minVal) / 2 * 0.6)),
            setMax = Math.round(maxVal - ((maxVal - minVal) / 2 * 0.6));

        $(this).children(".picker").slider({
            range: true,
            min: minVal,
            max: maxVal,
            values: [setMin, setMax],
            slide: function (event, ui) {
                $(this).siblings(".min").val(ui.values[0]).attr("max", ui.values[1]);
                $(this).siblings(".max").val(ui.values[1]).attr("min", ui.values[0]);
            }
        });

        $(this).children(".min").val($(this).children(".picker").slider("values", 0))
        $(this).children(".max").val($(this).children(".picker").slider("values", 1))


        $(this).children(".min").off().on("change, input", function () {
            $(this).siblings(".picker").slider("values", 0, $(this).val())
        })
        $(this).children(".max").off().on("change, input", function () {
            $(this).siblings(".picker").slider("values", 1, $(this).val())
        })
    })
});


$(document).ready(function () {
    let tipTimeout;

    //label tooltip
    $("label, .innerTabMenu li a").not(".inputBox label, .toggleBtn label, .date-picker-wrapper label, .memoTip, .optionMenu li, .statusRight span label").hover(function (e) {
        const element = $(this),
            elementText = element.text()



        var poX = e.clientX - 10 ,
            poY = e.clientY - 40;

        tipTimeout = setTimeout(function () {
            if(hasEllipsis(element)) {

                element.append(`<span class="tip">${elementText}<span>`)
                element.find(".tip").css({
                    "top": `${poY}px`,
                    "left": `${poX}px`
                });
            }
        }, 100);





    }, function () {
        const element = $(this)
        clearTimeout(tipTimeout)
        element.find(`.tip`).remove()
    });



    function hasEllipsis(element) {
        const maxWidth = parseFloat(element.css('max-width'));
        const actualWidth = element[0].scrollWidth;
        return actualWidth > maxWidth;
    }
});




//button tooltip
$(document).ready(function () {
    let targetBtn = $('button'),
        btnTimeout;

    targetBtn.hover(function (e) {
        const target = $(this),
            tooltipText = $(this).attr("class");

        if (tooltipText) {
            btnTimeout = setTimeout(function () {
                let poX = e.pageX - 40,
                    poY = e.pageY - 40;

                tooltipText == "add" ?
                    target.parent().append(`<span class="tip">Add</span>`) :
                    tooltipText == "del" ?
                    target.parent().append(`<span class="tip">Delete</span>`) :
                    tooltipText == "mup" ?
                    target.parent().append(`<span class="tip">Up Row</span>`) :
                    tooltipText == "mdn" ?
                    target.parent().append(`<span class="tip">Down Row</span>`) :
                    tooltipText == "cpy" ?
                    target.parent().append(`<span class="tip">Copy</span>`) :
                    tooltipText == "rfs" ?
                    target.parent().append(`<span class="tip">Return Row</span>`) :
                    tooltipText == "save" ?
                    target.parent().append(`<span class="tip">Save<span>`) :
                    tooltipText == "impt" ?
                    target.parent().append(`<span class="tip">Import<span>`) :
                    tooltipText == "expt" ?
                    target.parent().append(`<span class="tip">Export<span>`) :
                    tooltipText == "prnt" ?
                    target.parent().append(`<span class="tip">Print<span>`) :
                    tooltipText == "down" ?
                    target.parent().append(`<span class="tip">download<span>`) :
                    false
                target.parent().find(".tip").css({
                    "top": `${poY}px`,
                    "left": `${poX}px`
                })
            }, 300)
        } else {
            return false
        }
    }, function () {
        const target = $(this);
        clearTimeout(btnTimeout)
        target.parent().find(`.tip`).remove()
    });

});

// topInfo 버튼 tooltip
$(document).ready(function () {
    $('.bookMark').length ? $(".bookMark > button").attr({
        "class": "memoTip",
        "title": "<h6>즐겨찾기</h6>"
    }) : null;
    $('.supportBtn').length ? $(".supportBtn > button").attr({
        "class": "memoTip",
        "title": "<h6>도움말</h6>"
    }) : null;
    $('.newWinOpen').length ? $(".newWinOpen > button").attr({
        "class": "memoTip",
        "title": "<h6>새 창 열기</h6>"
    }) : null;
    $('.autoRefresh').length ? $(".autoRefresh > button").attr({
        "class": "memoTip",
        "title": "<h6>자동갱신</h6>"
    }) : null;
    $('button.searchReset').length ? $("button.searchReset").attr({
        "class": "searchReset memoTip",
        "title": "<h6>초기화</h6>"
    }) : null;
    if ($('.flagIcon').length) {
        if ($('.flagIcon').hasClass('kr')) {
            $(".flagIcon.kr").attr({
                "class": "flagIcon kr memoTip",
                "title": "<h6>대한민국</h6>"
            })
        }
    }

})

//메모형 툴팁
$(function () {
    $(document).tooltip({
        items: ":hover",
        content: function () {
            // ibtab충돌방지 스크립트 조건 2023-07-17
            if ($(this).hasClass("ib-tab-tabs-item__link")) {

                return null;
            }
            return $(this).prop('title');
        },
        show: {
            delay: 300,
            duration: 0
        },
        position: {
            my: "left top",
            at: "right bottom",
            collision: "flip",
            using: function (position, feedback) {
                $(this).css(position);
                $(this).css({
                    left: position.left + 10 + "px",
                    top: position.top + 20 + "px"
                })
            },

        },
        track: true,
    });
});


//모달
$(document).ready(function () {
    //모달 드래그 가능하게, h3 태그 핸들 적용
    $(".modal").draggable({
        handle: "h3",
        containment: ".modalWrap"
    });
});


//모달창 활성화 함수
function modal(prop) {
    //호출시 모달창 위치 화면 중앙에 위치하도록 계산
    var setPositionX = $(window).width() / 2 - $(`.${prop}`).width() / 2,
        setPositionY = $(window).height() / 2 - $(`.${prop}`).height() / 2

    //모달 호출 토글링
    $(`.${prop}`).toggleClass("active");

    //활성화된 모달 개수 만큼 zIndex 순서값 지정
    let zIndex = $('.modal.active').length

    $(`.${prop}`).css({
        "z-index": zIndex,
        "top": setPositionY,
        "left": setPositionX,
    })
}

//로딩화면 호출 함수
function addLoader() {
    $(".loader")
        .fadeIn(300)
        .css("display", "flex")
}

//로딩화면 제거 함수
function removeLoader() {
    $(".loader").fadeOut(300)
}



//버튼set
$(document).ready(function () {
    $(".btnSet button").each(function () {
        $(this).on("click", function () {
            $(this).addClass("active")
            $(this).siblings("button").removeClass("active")
        })
    })
})

//refBox 접기 기능
$(document).ready(function () {
    $(".refBox").append(`<div class="fold"><span></span></div>`)

    $(".fold").off().click(function () {
        $(this).toggleClass("act")
        $(this).siblings().not('h3', 'h4').toggle("blind", 100)
    })
})