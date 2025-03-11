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
        placeholder: "선택",
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

//비밀번호 토글
function pwToggle(param){
    $el = $(param)
    $elPW = $el.prev('input')
    
    if($el.hasClass('show')){
        $el.removeClass('show')
        $elPW.prop('type','password')
    }else{
        $el.addClass('show')
        $elPW.prop('type','text')
    }
}


