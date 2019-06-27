var post_staffuntidid = "";
var post_staffuntidname = "";
var post_staffpersonid = "";
var post_staffpersonvalidflag = "";
var select2postName = [];
var moreworkflag = "0";
var personid = "";
var staffChangegetAllInfo = "";
var savedata_type = "";
var savedatas = "";
var staffChange_createdate = "";
var staffChangeajaxpost_judge = false;
var staffrelation_ajaxpost_judge = false;
var post_staffcbgstate = "";
var post_staffbgstate = "";
var post_staffedtwkid = "";
var reterenceNum_judge = false;
var WorkReterenceNum_judge = false;
var staffChange_personnoRel_tblData = [];
var PersonPathattachBase64 = "";
var staffChange_nationalityjuage = true;
var staff_rationpeopleDel = "";
var staffChange_WorkDel = "";
var staffChange_EducateDel = "";


//20190604
var stationdescArr = [];
var staffChange_worktask = "";  //工作职责
var staff_postNameid = "";  //岗位id

// 存储服务器时间
var staffChange_fwqDate = "";
$(document).ready(function () {
    $(".changblock,.staff_worksavenone,.staffrelationchange_btn,#staff_changesubmit").addClass("none");
    post_staffpersoniddata = sessionStorage.getItem("new_postmodulurl");


    // console.log(post_staffpersoniddata);
    var post_staffpersonidjson = $.parseJSON(post_staffpersoniddata);
    // ---------------- 判断操作类型 -------------	
    savedata_type = post_staffpersonidjson.type;

    $("#nationality").off("change").on("change", function () {
        if ($("#nationality").val() != "" && staffChange_nationalityjuage) {
            staffChange_nationalityJGfun();
        }
    })

    $("#staff_nativeplace").off("change").on("change", function () {
        if ($("#nationality").val() != "" && staffChange_nationalityjuage) {
            staffChange_nationalityJGfun()
        }
    })

    if (savedata_type == "1") {

        staff_codeallfun();
        var untidjson = post_staffpersonidjson.data;
        post_staffuntidid = untidjson.post_manage_unitid;
        post_staffuntidname = untidjson.post_manage_fullname;


        $("#staff_savesubmit").removeClass("none");
        $("#staff_savesubmit").addClass("inlineblock");


        $("#staff_changesubmit").removeClass("inlineblock");
        $("#staff_changesubmit").addClass("none");


        // 回填单位名称
        $("#staff_untidname").val(post_staffuntidname);

        baseselec2fun("CHN", "中国");
        staff_changenativeplacefun("", "");
        staffChange_formValidatorfun();
        // 初始化列表
        relationpeopletableinitfun();


        //load加载预申请信息
        $(".staffChangetwo_passAccept_Box").load("../../userManager/unitStaffManager/staffchangetwoNewAdd.html");
    } else if (savedata_type == "2") {

        //预申请区域回填
        $(".staffChangetwo_passAccept_Box").load("../../userManager/unitStaffManager/staffchangetwoChange.html");
        // 修改
        savesubmibtn();
        var post_staffuntididjson = post_staffpersonidjson.data;
        // console.log(post_staffuntididjson)
        post_staffpersonid = post_staffuntididjson.post_personid;
        post_staffuntidid = post_staffuntididjson.post_manage_unitid == undefined ? post_staffuntididjson.post_manage_Sytemunitid : post_staffuntididjson.post_manage_unitid;
        post_staffpersonvalidflag = post_staffuntididjson.post_personvalidflag
        post_staffcbgstate = post_staffuntididjson.post_manage_cbgstate
        post_staffbgstate = post_staffuntididjson.post_manage_gstate

        // 部门id
        staffdepid = post_staffuntididjson.post_manage_depid == undefined ? post_staffuntididjson.post_manage_Sytemdepid : post_staffuntididjson.post_manage_depid;
        personid = post_staffpersonid;
        // console.log(personid)
        // console.log(post_staffuntidid)
        // console.log(post_staffpersonvalidflag)
        // console.log(post_staffbgstate)
        if (post_staffpersonid != "") {

            // 初始化select2控件
            // baseselec2fun("CHN","中国");
            staff_depNameselect2();

            //--人员信息修改回填---
            staffpersoniddatafun();

        }

        //关系人修改回填personid
        relationpeopletable();
        staff_code("peopleRelation");
        staff_code("staffChange_pattachmenttype");
        staff_code("staff_peopleRelationSex");
        staff_code("staff_peopleRelationPolitics");
        staff_code("staff_peopleRelationPost");
        staff_code("otherpeopleRelationSex");
        staff_code("otherpeopleRelationPolitics");
        staff_code("otherpeopleRelationPost");
    }

    // ------------------判断数据状态为有效1或者为草稿 9-------------	
    if (post_staffpersonvalidflag == "1") {
        $("#staff_savebasciInfo").removeClass("inlineblock");
        $("#staff_savebasciInfo").addClass("none");

        $("#staffTwo_savesubmit").removeClass("inlineblock").addClass("none");
        $("#staffTwo_savebasciInfo").removeClass("inlineblock").addClass("none");

        $("#staffTwo_changesubmit").removeClass("none").addClass("inlineblock");

    } else if (post_staffpersonvalidflag == "9") {
        $("#staff_savebasciInfo").addClass("inlineblock");
        $("#staff_savebasciInfo").removeClass("none");

        $("#staffTwo_savesubmit").removeClass("inlineblock").addClass("none");
        $("#staffTwo_savebasciInfo").removeClass("none").addClass("inlineblock");
        $("#staffTwo_changesubmit").removeClass("none").addClass("inlineblock");


    }


 // 20190604
 $("#staff_postName").on("select2:selecting", function (e) {
    // console.log(e.params.args.data)
    var jLength = stationdescArr.length
    // 判断岗位变化获取岗位职责
    if ((post_staffpersonvalidflag == "" && savedata_type == "1") || (post_staffpersonvalidflag == "9" && savedata_type == "2")) {
        //新增  或者  //草稿修改
      
        for (var j = 0; j < jLength; j++) {
            if (e.params.args.data.id == stationdescArr[j].id) {
                $("#staffChange_worktask").val(stationdescArr[j].stationdesc)
            }
        }


    } else if (post_staffpersonvalidflag == "1" && savedata_type == "2") {
        //有效改
        if (staff_postNameid == e.params.args.data.id) {
            $("#staffChange_worktask").val(staffChange_worktask);
        } else {

            for (var j = 0; j < jLength; j++) {
                if (e.params.args.data.id == stationdescArr[j].id) {
                    $("#staffChange_worktask").val(stationdescArr[j].stationdesc)
                }
            }
        }
    }
    
    $('#staffChange_fromValidator').bootstrapValidator('revalidateField', 'staffChange_worktask');
    // $('#staffChange_fromValidator').data('bootstrapValidator').resetField("staffChange_worktask", true);


})


})
function savesubmibtn() {
    //		保存信息按钮隐藏   修改保存按钮提交显示
    $("#staff_savesubmit").removeClass("inlineblock");
    $("#staff_savesubmit").addClass("none");

    $("#staff_changesubmit").addClass("inlineblock");
    $("#staff_changesubmit").removeClass("none");
}

function baseselec2fun(seletid, selcttext) {

    $("#nationality").stSelect({
        minimumInputLength: 0, //最少输入字符后开始查询
        selectOnClose: false, //没选择就关闭select框的情况下，会默认选中高亮的选项
        allowClear: true, // 允许清空
        placeholder: '请选择国籍', // 默认文字提示
        data: [{ id: seletid, text: selcttext }],
        ajax: {
            type: "post",
            url: "/BJAirportWeb/entrance/index.do",
            dataType: "json",
            delay: 250, //延迟
            data: function (params) { //自定义请求参数
                return JSON.stringify({
                    "sessionid": sessionid,
                    funcid: "BJAirport-code.ccodeService.getCodeSelect2",
                    data: {
                        type: "29",
                        paging: true,
                        note: params.term,
                        currentpage: params.page || 1,
                        pagesize: 10
                    }
                })
            },
            processResults: function (data, params) {
                // console.log("infoinfo------------info" + JSON.stringify(data))
                var info = JSON.parse(data.data).list;
                // console.log("infoinfo------------info" + JSON.stringify(info));

                var result = $.map(info, function (obj) {
                    obj.id = obj.id || obj.ID;
                    obj.text = obj.text || obj.TEXT;
                    return obj;
                });

                params.page = params.page || 1;
                return {
                    results: result,
                    pagination: {
                        more: (params.page * 10) < JSON.parse(data.data).total
                    }
                };

            },
            cache: true
        },
        escapeMarkup: function (markup) {
            return markup;
        },
        templateResult: repoFormatResult, //下拉结果格式化，可以自定义要显示在下拉框的数据，比如定义一个table
        templateSelection: repoFormatSelection //下拉框选中后，在select框显示的格式，默认为text
    }).val(seletid).trigger(selcttext);

    function repoFormatResult(repo) {
        // console.log("repo" + JSON.stringify(repo))
        if (repo == "undefind" || repo.loading == true) {
            return '<table class = "table table-bordered" style="padding:0;margin:0">' +
                '<tr><td>请选择国籍</td></tr></table>';
        } else {
            return '<table class = "table table-bordered" style="padding:0;margin:0">' +
                '<tr><td>' + repo.text + '</td></tr></table>';
        }
    }

    function repoFormatSelection(repo) {
        if (repo.text) {
            return repo.text;
        }
    }



    staff_depNameSelect();

    stafff_ChangeNationfun()
}

function staff_changenativeplacefun(selecid, selecttext) {
    $("#staff_nativeplace").stSelect({
        minimumInputLength: 0, //最少输入字符后开始查询
        selectOnClose: false, //没选择就关闭select框的情况下，会默认选中高亮的选项
        allowClear: true, // 允许清空
        placeholder: '请选择籍贯', // 默认文字提示
        data: [{ id: selecid, text: selecttext }],
        ajax: {
            type: "post",
            url: "/BJAirportWeb/entrance/index.do",
            dataType: "json",
            delay: 250, //延迟
            data: function (params) { //自定义请求参数

                return JSON.stringify({
                    sessionid: sessionid,
                    funcid: "BJAirport-code.ccodeService.getCodeSelect2",
                    data: {
                        type: "31",
                        paging: true,
                        note: params.term,
                        currentpage: params.page || 1,
                        pagesize: 10
                    }
                })
            },
            processResults: function (data, params) {
                // console.log("infoinfo------------info" + JSON.stringify(data))
                var info = JSON.parse(data.data).list;
                // console.log("infoinfo------------info" + JSON.stringify(info));

                var result = $.map(info, function (obj) {
                    obj.id = obj.id || obj.ID;
                    obj.text = obj.text || obj.TEXT;
                    return obj;
                });
                params.page = params.page || 1;
                return {
                    results: result,
                    pagination: {
                        more: (params.page * 10) < JSON.parse(data.data).total
                    }
                };

            },
            cache: true
        },
        escapeMarkup: function (markup) {
            return markup;
        },
        templateResult: repoFormatResults, //下拉结果格式化，可以自定义要显示在下拉框的数据，比如定义一个table
        templateSelection: repoFormatSelections //下拉框选中后，在select框显示的格式，默认为text
    }).val(selecid).trigger(selecttext);

    function repoFormatResults(repo) {
        if (repo == "undefind" || repo.loading == true) {
            return '<table class = "table table-bordered" style="padding:0;margin:0">' +
                '<tr><td>请选择籍贯</td></tr></table>';
        } else {
            return '<table class = "table table-bordered" style="padding:0;margin:0">' +
                '<tr><td>' + repo.text + '</td></tr></table>';
        }
    }

    function repoFormatSelections(repo) {
        if (repo.text) {
            return repo.text;
        }
    }
}

function stafff_ChangeNationfun(setvalue) {
    //----------------民族下拉--------------
    var select2national = [];
    var rechecdata = {
        type: "30",
        note: ""
    }
    var rechecdatas = {
        "sessionid": sessionid,
        "funcid": "BJAirport-code.ccodeService.getCodeSelect2",
        "data": rechecdata
    };
    // console.log(rechecdatas)
    $.axpost("/BJAirportWeb/entrance/index.do", JSON.stringify(rechecdatas), true, function (data) {
        if (data.success == true) {
            if ('object' == typeof data.data) {
                select2national = data.data;
            } else {
                select2national = $.parseJSON(data.data);
            }

            if (typeof setvalue == "undefined") {
                $("#nation").select2({
                    data: select2national,
                    selectOnClose: false,
                    placeholder: '请选择民族', // 默认文字提示
                    language: "zh-CN", // 汉化
                    allowClear: true, // 允许清空
                })
            } else {

                $("#nation").select2({
                    data: select2national,
                    selectOnClose: false,
                    placeholder: '请选择民族', // 默认文字提示
                    language: "zh-CN", // 汉化
                    allowClear: true, // 允许清空
                }).val(setvalue).trigger('change');
            }



        } else {
            BootstrapDialog.alert({
                type: BootstrapDialog.TYPE_DANGER,
                message: data.message,
            });
        }
    })
}


//-----------------------部门查找----------------

function staff_depNameSelect(huitian_depid, huitian_depname) {
    // console.log(huitian_depid)
    // console.log(huitian_depname)
    var select2department = [];

    var departmentdata = {
        unitid: post_staffuntidid
    }
    var departmentdatas = {
        "sessionid": sessionid,
        "funcid": "BJAirport-user.PersonManageService.queryDep",
        "data": departmentdata
    };
    // console.log(departmentdatas)
    $.axpost("/BJAirportWeb/entrance/index.do", JSON.stringify(departmentdatas), true, function (data) {
        // console.log(data)
        if (data.success == true) {
            if ('object' == typeof data.data) {
                select2department = data.data;
            } else {
                select2department = $.parseJSON(data.data);
            }
            var staffdep_arr = new Array();
            for (var i = 0; i < select2department.length; i++) {

                var staffdepjson = {
                    id: select2department[i].depid,
                    text: select2department[i].depname
                }
                staffdep_arr.push(staffdepjson);
            }
            // console.log(staffdep_arr)
            $("#staff_depName").select2({
                data: staffdep_arr,
                placeholder: '请选择部门', // 默认文字提示
                language: "zh-CN", // 汉化
                allowClear: true, // 允许清空
            })
            if (huitian_depid != undefined) {
                $("#staff_depName").val(huitian_depid).trigger("change"); //部门id
                $("#staff_depName option:selected").text(huitian_depname).trigger("change"); //部门名称
            }

        } else {
            BootstrapDialog.alert({
                type: BootstrapDialog.TYPE_DANGER,
                message: data.message,
            });
        }
    })
}


function staff_depNameselect2(e, csdepdataarrdepid, csdepdataarrdepname) {
    //-----------------------岗位查找----------------	
    if (e == undefined) {
        staff_pednationlid = staffdepid;
    } else {
        staff_pednationlid = e;
    }

    // console.log(staff_pednationlid)
    var select2postNamedata = {
        unitid: post_staffuntidid,
        depid: staff_pednationlid
    }
    var departmentdatas = {
        "sessionid": sessionid,
        "funcid": "BJAirport-user.PersonManageService.querySta",
        "data": select2postNamedata
    };
    // console.log(departmentdatas)
    $.axpost("/BJAirportWeb/entrance/index.do", JSON.stringify(departmentdatas), true, function (data) {

        if (data.success == true) {
            if ('object' == typeof data.data) {
                select2postName = data.data;
            } else {
                select2postName = $.parseJSON(data.data);
            }
            var staffpostNamearr = new Array();
            // console.log(staffpostNamearr.length)
            optionclear();
            stationdescArr = []; //先清空
            // console.log(staffpostNamearr)
            for (var i = 0; i < select2postName.length; i++) {

                var staffpostNamejson = {
                    id: select2postName[i].stationid,
                    text: select2postName[i].stationname
                }
                staffpostNamearr.push(staffpostNamejson);
                  // 将岗位和对应的职责存放起来
                  var staff_stationdescjson = {
                    id: select2postName[i].stationid,
                    stationdesc: select2postName[i].stationdesc
                }
                stationdescArr.push(staff_stationdescjson);
            }
            // console.log(staffpostNamearr)
            // debugger;
            $("#staff_postName").select2({
                "data": staffpostNamearr,
                placeholder: '请选择岗位', // 默认文字提示
                language: "zh-CN", // 汉化
                allowClear: true, // 允许清空
            })
            if (csdepdataarrdepid != undefined) {
                $("#staff_postName").val(csdepdataarrdepid).trigger("change"); //岗位id
                $("#staff_postName option:selected").text(csdepdataarrdepname).trigger("change"); //岗位名称
            }

        } else {
            // layer.alert(data.message + "5")
            BootstrapDialog.alert({
                type: BootstrapDialog.TYPE_DANGER,
                message: data.message,
            });
        }
    })
    // $.ajax({
    // 	url: "/BJAirportWeb/entrance/index.do",
    // 	type: "post",
    // 	dataType: "json",
    // 	data: JSON.stringify(departmentdatas),
    // 	success: function (data) {

    // 	},
    // 	error: function (err) {
    // 		// layer.alert("提交失败23！");
    // 		BootstrapDialog.alert({
    // 			type: BootstrapDialog.TYPE_DANGER,
    // 			title: "信息提示",
    // 			message: '访问网络失败！' + XMLHttpRequest.responseJSON.error
    // 		});
    // 	}
    // });



}


// function staffChangegetAllInfofun() {
// staffChangegetAllInfo =
// }


$("#staff_depName").on("select2:select", function (e) {
    var staff_pednationlid = e.params.data.id;
    staff_depNameselect2(staff_pednationlid);

})


function optionclear() {
    var selection = document.getElementById("staff_postName");
    // console.log(selection)
    // console.log(selection.options)
    if (selection.options.length > 1) {
        for (var i = 0; i < selection.options.length; i++) {
            selection.removeChild(selection.options[1]);
            selection.remove(1);
            selection.options[1] = null;
        };
    }

}

// const newLocal = $(".fuzzyLookup").blur(function() {
// 	$(this).siblings(".dropdown-menu").css("display", "none");
// });




// 当事人本地上传图片
function clp() {
    $("#File").click();
}
var preview = document.querySelector('#IDImg');

$("#File").off("change").on("change", function () {
    // 获取头像图片大小 
    var IDImgSize = $("#File").get(0).files[0].size;
    if (40960 < IDImgSize && IDImgSize < 81920) {

    } else {
        BootstrapDialog.show({
            type: BootstrapDialog.TYPE_WARNING,
            message: '人员相片的文件大小为40K至80k，请重新选择上传！',
            title: "信息提示",
            closeByBackdrop: false, //不能通过点击其他部分关闭
            buttons: [{
                cssClass: "btn-primary",
                label: '确定',
                action: function (dialogItself) {
                    dialogItself.close(); //可以认为是关闭的回调方法
                    $("#IDImg").attr("src", "../userManager/unitStaffManager/images/frame_send.png");
                    $("#File").val("");
                }
            }]
        });
    }
    // alert(a.size)
    // console.log(a.size) 318,12


    if ($("#IDImg").attr("data-idImgchange") != "undefinde") {
        $("#IDImg").attr("data-idImgchange", "1");
    }

    // 获取文件对象
    var file = this.files[0];
    // 确认选择的文件是图片
    if (file.type.indexOf("image") == 0) {
        var reader = new FileReader();
        // 使用fileReader对文件对象进行操作
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            // 图片base64化 reader.result的结果是base64编码数据
            var newUrl = this.result;
            preview.src = newUrl;
        };
    }
})

// 判断图片大小
// var oFileChecker = document.getElementById("IDImg");
// function changeSrc(filePicker){
//   oFileChecker.src = filePicker.value;//读图片

// }
// oFileChecker.onreadystatechange = function (){
// 	if (oFileChecker.readyState == "complete")
// 		{
// 		checkSize();
// 		}
// }
// function checkSize(){
// 	var minSize = 40;
// 		var maxSize = 80
// 		if ( minSize< oFileChecker.fileSize < maxSize){
// 				alert("too large");
// 				}
// 		else{
// 		alert("ok");
// 		}
// }



// 相关人本地上传图片
function peopleRelationclp() {
    $("#peopleRelationfile").click();
}
var peopleRelationpreview = document.querySelector('#peopleRelationImg');
$("#peopleRelationfile").off("change").on("change", function () {
    if ($("#peopleRelationImg").attr("data-Imgchange") != "undefinde") {
        $("#peopleRelationImg").attr("data-Imgchange", "1");
    }
    var IDImgSize = $("#peopleRelationfile").get(0).files[0].size;
    if (40960 < IDImgSize && IDImgSize < 81920) {

    } else {
        BootstrapDialog.show({
            type: BootstrapDialog.TYPE_WARNING,
            message: '相关关系人，人员相片的文件大小为40K至80k，请重新选择上传！',
            title: "信息提示",
            closeByBackdrop: false, //不能通过点击其他部分关闭
            buttons: [{
                cssClass: "btn-primary",
                label: '确定',
                action: function (dialogItself) {
                    dialogItself.close(); //可以认为是关闭的回调方法
                    $("#peopleRelationImg").attr("src", "../userManager/unitStaffManager/images/frame_send.png");
                    $("#peopleRelationfile").val("");
                }
            }]
        });
    }
    // 获取文件对象
    var file = this.files[0];
    // 确认选择的文件是图片
    if (file.type.indexOf("image") == 0) {
        var reader = new FileReader();
        // 使用fileReader对文件对象进行操作
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            // 图片base64化 reader.result的结果是base64编码数据
            var peopleRelationfile_imgUrl = this.result;
            peopleRelationpreview.src = peopleRelationfile_imgUrl;
        };
    }
})
// 删除当事人的图片
$("#delImg").click(function () {
    $("#IDImg").attr("src", "../userManager/unitStaffManager/images/frame_send.png");
    $("#File").val("");

    if ($("#IDImg").attr("data-idImgchange") != "undefinde") {
        $("#IDImg").attr("data-idImgchange", "1");
    }
    // BootstrapDialog.show({
    // 	message: '是否成为兼职专办员',
    // 	title: "信息提示",
    // 	closeByBackdrop: false, //不能通过点击其他部分关闭

    // 	buttons: [{
    // 		label: '是',
    // 		action: function (dialogItself) {
    // 			dialogItself.close(); //可以认为是关闭的回调方法
    // 			$("#IDImg").attr("src", "../userManager/unitStaffManager/images/frame_send.png");
    // 			$("#File").val("");
    // 			if ($("#IDImg").attr("data-IDImgchange") != "undefinde") {
    // 				$("#IDImg").attr("data-IDImgchange", "1");
    // 			}
    // 		}
    // 	}, {
    // 		label: '否',
    // 		action: function (dialogItself) {
    // 			dialogItself.close(); //可以认为是关闭的回调方法
    // 		}
    // 	}]
    // });

})

//图片删除#IDface,#IDside,#MyIDside,#MyIDface
function stafff_closeallimgdata() {
    $("#IDImg").attr("src", "../userManager/unitStaffManager/images/frame_send.png");
    $("#File").val("");
    $("#IDface").siblings("img").attr("src", "../userManager/unitStaffManager/images/uoload.jpg")
    $("#IDface").prev("input").val("");
    $("#IDside").siblings("img").attr("src", "../userManager/unitStaffManager/images/uoload.jpg")
    $("#IDside").prev("input").val("");
    $("#MyIDside").siblings("img").attr("src", "../userManager/unitStaffManager/images/uoload.jpg")
    $("#MyIDside").prev("input").val("");
    $("#MyIDface").siblings("img").attr("src", "../userManager/unitStaffManager/images/uoload.jpg")
    $("#MyIDface").prev("input").val("");
}

// 删除相关人的图片
function deletepeopleRelationImg() {
    $("#peopleRelationImg").attr("src", "../userManager/unitStaffManager/images/frame_send.png");
    $("#peopleRelationfile").val("");
}
//关系人所有图片
function deletallepeopleRelationImg() {
    $("#peopleRelationImg").attr("src", "../userManager/unitStaffManager/images/frame_send.png");
    $("#peopleRelationfile").val("");
    $("#IDfaceImg").attr("src", "../userManager/unitStaffManager/images/uoload.jpg");
    $("#IDfaceImg").val("");
    $("#IDSideImg").attr("src", "../userManager/unitStaffManager/images/uoload.jpg");
    $("#IDSideImg").val("");
}

$("#peopleRelationdelImg").click(function () {
    deletepeopleRelationImg()
    if ($("#peopleRelationImg").attr("data-Imgchange") != "undefinde") {
        $("#peopleRelationImg").attr("data-Imgchange", "1");
    }

})


$("#nation,#staff_nativeplace,#staff_depName,#staff_postName").select2({
    width: "100%",
    placeholder: "请选择",
})


// 选择政治面貌出现入党时间
// function political(e) {
// 	if (e != "03" && e != "13" && e != "99" && e != "12") {
// 		$(".choice").css("display", "table-cell")
// 	} else {
// 		$(".choice").css("display", "none");
// 		$("#joinTime").val("")
// 	}
// }
// textarea高度跟随文字高度而变化
function makeExpandingArea(el) {
    var setStyle = function (el) {
        el.style.height = 'auto';
        el.style.height = el.scrollHeight + 'px';
        // console.log(el.scrollHeight);
    }
    var delayedResize = function (el) {
        window.setTimeout(function () {
            setStyle(el)
        }, 0);
    }
    if (el.addEventListener) {
        el.addEventListener('input', function () {
            setStyle(el)
        }, false);
        setStyle(el)
    } else if (el.attachEvent) {
        el.attachEvent('onpropertychange', function () {
            setStyle(el)
        });
        setStyle(el)
    }
    if (window.VBArray && window.addEventListener) { // IE9
        el.attachEvent("onkeydown", function () {
            var key = window.event.keyCode;
            if (key == 8 || key == 46)
                delayedResize(el);

        });
        el.attachEvent("oncut", function () {
            delayedResize(el);
        }); // 处理粘贴
    }
}
makeExpandingArea(textarea);
// textarea高度跟随文字高度而变化结束




var edtwkidArray = new Array();
var eduArray = new Array();
//-------------------------- 教育经历列表---------------------------------
var staffChange_educateDataTabl = function (DataTableDate) {
    var earth_start = 0;
    var staffChange_educateDataTablinit = $('#staffChange_educateDataTabl').DataTable({
        dom: '<"top">t<"bottom"<"col-xs-6 col_paddingall"<"col-xs-7 col_paddingall"i><"col-xs-5"l>><"col-xs-6 col_paddingall"p>><"clear">',
        destroy: true,
        data: DataTableDate,
        paging: false,
        ordering: false,
        info: true,
        autoWidth: false,
        pageLength: 5,
        lengthMenu: [10, 15, 20],
        bFilter: false, //去掉搜索框方法三：这种方法可以
        bLengthChange: true,
        sLoadingRecords: "载入中...",
        serverSide: false,
        fnDrawCallback: function () {
            let api = this.api();
            api.column(0).nodes().each(function (cell, i) {
                cell.innerHTML = earth_start + i + 1;
            });
        },
        columns: [{
            "data": null,
            "targets": 0,
            "sTitle": "序号",
        },
        {
            "data": "placename",
            "sTitle": "单位全称",
            "defaultContent": "<i></i>"
        },
        {
            "data": "ewbegindate",
            "sTitle": "开始时间",
            "defaultContent": "<i></i>"
        },
        {
            "data": "ewenddate",
            "sTitle": "结束时间",
            "defaultContent": "<i></i>"
        },
        {
            "data": "cpost",
            "sTitle": "职务",
            "defaultContent": "<i></i>",
            "sClass": "hidden"
        },
        {
            "data": "authenticator",
            "sTitle": "证明人",
            "defaultContent": "<i></i>"
        },
        {
            "data": "authenticatortel",
            "sTitle": "证明人电话",
            "defaultContent": "<i></i>",
        },
        {
            "data": "edtwkid",
            "sTitle": "证明人id",
            "defaultContent": "<i></i>",
            "sClass": "hidden"
        },
        {
            "data": "createdate",
            "sTitle": "创建时间",
            "defaultContent": "<i></i>",
            "sClass": "hidden"
        },
        {
            "data": null,
            "sTitle": "操作",
            "defaultContent": "<i></i>"
        }

        ],
        columnDefs: [{
            // 定义操作列,######以下是重点########
            // "sTitle": "操作",
            "targets": 9, //操作按钮目标列
            "render": function (data, type, row) {
                var html = '<button class="btn btn-warning  btnpadding staffChange_EducateChangeBtn" >修改</button>'
                html += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp<button class="btn btn-danger  btnpadding staffChange_EducateDelBtn" >删除</button>'
                return html;
            }
        },
        {
            "searchable": false,
            "orderable": false,
            "targets": 0
        },
        ]
    });
    staffChange_educateDataTablinit.on('order.dt search.dt', function () {
        staffChange_educateDataTablinit.column(0, {
            search: 'applied',
            order: 'applied'
        }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();
}
staffChange_educateDataTabl(eduArray);
//-------------------------- 教育经历列表---------------------------------

// 教育经历新增
var schoolnumb = 0,
    schoolname, schoolTime, schoolewbegindate, schoolewenddate, sachooluthenticator, sachoolauthenticatortel;
// 教育的添加到列表的功能



function addEduction(schoolname, schoolTime, schoolewbegindate, schoolewenddate, sachooluthenticator, sachoolauthenticatortel) {
    schoolnumb += 1;
    var addTd = "<tr class=\"num schooltrnum \">" +
        "<td data-schoolnumb=" + schoolnumb + ">" +
        schoolnumb +
        "</td>" +
        "<td>" +
        schoolname +
        "</td>" +
        "<td>" +
        schoolewbegindate + "~" + schoolewenddate +
        "</td>" +
        // "<td>" +
        // schoolwork +
        // "</td>" +
        "<td>" +
        sachooluthenticator +
        "</td>" +
        "<td>" +
        sachoolauthenticatortel +
        "</td>" +
        "<td><input class=\"btn  btn-warning btnpadding\" type=\"button\" value=\"修改\"  onclick=\"staff_schoolchang(this)\" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp<input class=\"btn btn-danger btnpadding\" type=\"button\" onclick=\"staff_schoolDel(this)\" value=\"删除\"></td>" +
        "</tr>";
    $(".num:last").after(addTd);

    eduArray.push({
        schoolnumb: schoolnumb,
        placename: schoolname,
        ewbegindate: schoolewbegindate,
        ewenddate: schoolewenddate,
        // cpost: schoolwork,
        authenticator: sachooluthenticator,
        authenticatortel: sachoolauthenticatortel
    });



}

function freshSchool(schoolArray) {

    var addTd;
    for (var i = 0; i < schoolArray.length; i++) {
        addTd = addTd + "<tr class=\"num schooltrnum\">" +
            "<td  data-schoolnumb='" + (i + 1) + "' data-edtwkid='" + schoolArray[i].edtwkid + "' data-createdate='" + schoolArray[i].createdate + "'>" +
            (i + 1) +
            "</td>" +
            "<td>" +
            schoolArray[i].placename +
            "</td>" +
            "<td>" +
            schoolArray[i].ewbegindate +
            " ~ " +
            schoolArray[i].ewenddate +
            "</td>" +
            "<td>" +
            schoolArray[i].cpost +
            "</td>" +
            "<td>" +
            schoolArray[i].authenticator +
            "</td>" +
            "<td>" +
            schoolArray[i].authenticatortel +
            "</td>" +
            "<td><input class=\"btn  btn-warning btnpadding\" type=\"button\" value=\"修改\"  onclick=\"staff_schoolchang(this)\" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp<input class=\"btn btn-danger btnpadding\" type=\"button\" onclick=\"staff_schoolDel(this)\" value=\"删除\"></td>" +
            "</tr>";
    }
    schoolnumb = schoolArray.length
    $(".num:last").after(addTd);
}
//-------------------------- 教育的保存功能  ------------------------
$("#Add").off("click").on("click", function () {

    schoolname = $("#schoolName").val();
    schoolewbegindate = $("#schoolTime .dateStart").val();
    schoolewenddate = $("#schoolTime .dateEnd").val();
    // schoolwork = $("#schoolWork").val();
    sachooluthenticator = $("#reterence").val();
    sachoolauthenticatortel = $("#reterenceNum").val();
    if (schoolName == "" || sachooluthenticator == "" ||
        schoolewenddate == "" ||
        sachooluthenticator == "" || sachoolauthenticatortel == "") {
        BootstrapDialog.alert({
            type: BootstrapDialog.TYPE_WARNING,
            message: "请将教育经历信息填写完整！",
        });

    } else {
        var reterenceNumRE = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;//固定电话
        var reterenceNumPhoneRE = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;//手机号码
        var reterenceNum = $("#reterenceNum").val().trim();
        if (reterenceNumRE.test(reterenceNum) || reterenceNumPhoneRE.test(reterenceNum)) {

            eduArray.push({
                placename: schoolname,
                ewbegindate: schoolewbegindate,
                ewenddate: schoolewenddate,
                // cpost: schoolwork,
                authenticator: sachooluthenticator,
                authenticatortel: sachoolauthenticatortel,
                edtwkid: ""
            });
            staffChange_educateDataTabl(eduArray);
            schoolClear();
        } else {
            // WorkReterenceNum_judge = false;
            BootstrapDialog.show({
                type: BootstrapDialog.TYPE_WARNING,
                message: '请输入正确的固定电话或者手机号码！',
                title: "信息提示",
                closeByBackdrop: false, //不能通过点击其他部分关闭
                buttons: [{
                    label: '确定',
                    action: function (dialogItself) {
                        dialogItself.close(); //可以认为是关闭的回调方法
                        $("#reterenceNum").focus();
                        return;
                    }
                }]
            });
        }

    }
})
//-------------------- 教育的清空按钮功能------------------------
function schoolClear() {
    $("#schoolName").val("");
    $("#schoolTime .dateStart").val("");
    $("#schoolTime .dateEnd").val("");
    // $("#schoolWork").val("");
    $("#reterence").val("");
    $("#reterenceNum").val("");
}

//转换时间格式
// var insertStr = (soure, start, newStr) => {
// 	// console.log(soure)
// 	return soure.slice(0, start) + newStr + soure.slice(start)
// }



//-------------------教育经历的修改------------------------
var staff_school = "",
    staff_schooledtwkids = "",
    staff_schoolcreatedate;
var staffChange_educateChangeIndex = "";
$(document).off("click", ".staffChange_EducateChangeBtn").on("click", ".staffChange_EducateChangeBtn", function () {
    
  
    staffChange_EducateDel =   $(this).next();
    staffChange_EducateDel.attr("disabled", "true").attr("title","数据修改中，不能删除！");


    //获取修改的值 
    // console.log(staff_schooledtwkids)
    //	------------------隐藏保存按钮 显示确认 取消 按钮----------------
    $(".addsave_none").removeClass("inlineblock");
    $(".addsave_none").addClass("none");
    $(".changblock").addClass("inlineblock");
    $(".changblock").removeClass("none");

    // 获取列表数据
    var rowIndex = $(this).parents("tr").index();
    staffChange_educateChangeIndex = rowIndex;
    var changschoolName = $('#staffChange_educateDataTabl').DataTable().row(rowIndex).data().placename;
    var changsdateStart = $('#staffChange_educateDataTabl').DataTable().row(rowIndex).data().ewbegindate;
    var changsdateEnd = $('#staffChange_educateDataTabl').DataTable().row(rowIndex).data().ewenddate;
    // var changschoolWork = $('#staffChange_educateDataTabl').DataTable().row(rowIndex).data().cpost;
    var changterence = $('#staffChange_educateDataTabl').DataTable().row(rowIndex).data().authenticator;
    var changterenceNum = $('#staffChange_educateDataTabl').DataTable().row(rowIndex).data().authenticatortel;
    staff_schooledtwkids = $('#staffChange_educateDataTabl').DataTable().row(rowIndex).data().edtwkid;
    staff_schoolcreatedate = $('#staffChange_educateDataTabl').DataTable().row(rowIndex).data().createdate;

    $("#schoolName").val(changschoolName);
    $("#schoolTime .dateStart").val(changsdateStart);
    $("#schoolTime .dateEnd").val(changsdateEnd);
    // $("#schoolWork").val(changschoolWork);
    $("#reterence").val(changterence);
    $("#reterenceNum").val(changterenceNum);

})

//----------------------教育经历的修改-------------------
function schoolclose() {
    //隐藏 保存按钮  显示确认 取消按钮
    $(".changblock").removeClass("none");
    $(".changblock").addClass("inlineblock");
    $(".changblock").addClass("none");
    $(".addsave_none").removeClass("inlineblock");

}

function query_closr() {
    $(".changblock").removeClass("inlineblock");
    $(".changblock").addClass("none");
    $(".addsave_none").removeClass("none");
    $(".addsave_none").addClass("inlineblock");
    schoolClear();
}
//---------------------教育经历修改的提交----------------------
$("#staff_educatequery").off("click").on("click", function () {

    var schoolnamesave = $("#schoolName").val();
    // console.log(schoolnamesave)
    var schoolewbegindatesave = $("#schoolTime .dateStart").val();
    var schoolewenddatesave = $("#schoolTime .dateEnd").val();
    // var schoolworksave = $("#schoolWork").val();
    var sachooluthenticatorsave = $("#reterence").val();
    var sachoolauthenticatortelsave = $("#reterenceNum").val();

    if (schoolnamesave == "" || schoolewbegindatesave == "" || schoolewenddatesave == "" || sachooluthenticatorsave == "" || sachoolauthenticatortelsave == "") {

        BootstrapDialog.alert({
            type: BootstrapDialog.TYPE_WARNING,
            message: "请将教育经历信息填写完整！",
        });

    } else {
        var reterenceNumRE = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;//固定电话
        var reterenceNumPhoneRE = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;//手机号码
        var reterenceNum = $("#reterenceNum").val().trim();
        if (reterenceNumRE.test(reterenceNum) || reterenceNumPhoneRE.test(reterenceNum)) {

            eduArray[staffChange_educateChangeIndex].placename = schoolnamesave;
            eduArray[staffChange_educateChangeIndex].ewbegindate = schoolewbegindatesave;
            eduArray[staffChange_educateChangeIndex].ewenddate = schoolewenddatesave;
            // eduArray[staffChange_educateChangeIndex].cpost = schoolworksave;
            eduArray[staffChange_educateChangeIndex].authenticator = sachooluthenticatorsave;
            eduArray[staffChange_educateChangeIndex].authenticatortel = sachoolauthenticatortelsave;
            eduArray[staffChange_educateChangeIndex].edtwkid = staff_schooledtwkids;
            eduArray[staffChange_educateChangeIndex].createdate = staff_schoolcreatedate;
            query_closr();
            // console.log("修改后：" + JSON.stringify(eduArray))
            //------------------遍历eduArray数组，列表刷新----------------
            staffChange_educateDataTabl(eduArray);
        } else {
            // WorkReterenceNum_judge = false;
            BootstrapDialog.show({
                type: BootstrapDialog.TYPE_WARNING,
                message: '请输入正确的固定电话或者手机号码！',
                title: "信息提示",
                closeByBackdrop: false, //不能通过点击其他部分关闭
                buttons: [{
                    label: '确定',
                    action: function (dialogItself) {
                        dialogItself.close(); //可以认为是关闭的回调方法
                        $("#reterenceNum").focus();
                        return;
                    }
                }]
            });
        }

    }






})

//----------------------教育经历修改取消-----------------
$(".staff_changeclose").on("click", function () {
    query_closr();
    staffChange_EducateDel.removeAttr("disabled", "title");
})

//-----------------------教育经历的删除----------------------
$(document).off("click", ".staffChange_EducateDelBtn").on("click", ".staffChange_EducateDelBtn", function () {
    var _that = this;
    BootstrapDialog.show({
        type: BootstrapDialog.TYPE_WARNING,
        message: '是否删除该条教育经历！',
        title: "信息提示",
        closeByBackdrop: false, //不能通过点击其他部分关闭
        buttons: [{
            cssClass: "btn-primary",
            label: '是',
            action: function (dialogItself) {
                dialogItself.close(); //可以认为是关闭的回调方法
                // 获取我点击的行行
                // $(".schooltrnum").remove();

                // var edunum = e.parentNode.parentNode.children[0].dataset.schoolnumb;
                // edtwkid = e.parentNode.parentNode.children[0].dataset.edtwkid;
                var rowDelIndex = $(_that).parents("tr").index();
                // console.log(rowDelIndex)
                // console.log($('#staffChange_educateDataTabl').DataTable().row(rowDelIndex).data())
                var DelSchoolReterenceedtwkid = $('#staffChange_educateDataTabl').DataTable().row(rowDelIndex).data().edtwkid;
                edtwkid = $('#staffChange_educateDataTabl').DataTable().row(rowDelIndex).data().edtwkid;
                // edtwkid = e.parentNode.parentNode.children[0].dataset.edtwkid;
                // 将删除的工作id存起来
                if (DelSchoolReterenceedtwkid == "undefined" || DelSchoolReterenceedtwkid == "") {
                    edtwkidArray.push({
                        // edtwkid: ""
                    });
                } else {
                    edtwkidArray.push({
                        edtwkid
                    });
                }
                eduArray.splice(rowDelIndex, 1)

                //---------------------遍历eduArray数组，列表刷新-----------------
                staffChange_educateDataTabl(eduArray);

            }
        }, {
            label: '否',
            action: function (dialogItself) {
                dialogItself.close(); //可以认为是关闭的回调方法

            }
        }]
    });







})

//------------------------- 工作经历新增---------------------------

// 工作的添加到列表的功能


var workArray = new Array();



// 工作的保存功能
$("#workAdd").off("click").on("click", function () {

    workName = $("#workName").val();
    workTimeStart = $("#workTime .dateStart").val();
    workTimeEnd = $("#workTime .dateEnd").val();
    workWork = $("#workWork").val();
    workReterence = $("#workReterence").val();
    WorkReterenceNum = $("#WorkReterenceNum").val();
    if (workName == "" || workTimeStart == "" || workTimeEnd == "" || workWork == "" || workReterence == "" || WorkReterenceNum == "") {
        BootstrapDialog.alert({
            type: BootstrapDialog.TYPE_WARNING,
            message: "请将工作经历填写完整！",
        });

    } else {
        // 验证电话号码
        var WorkReterenceNumRE = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;//固定电话
        var reterenceNumPhoneRE = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;//手机号码

        var WorkReterenceNum = $("#WorkReterenceNum").val().trim();

        if (WorkReterenceNumRE.test(WorkReterenceNum) || reterenceNumPhoneRE.test(WorkReterenceNum)) {

            workArray.push({
                placename: workName,
                ewbegindate: workTimeStart,
                ewenddate: workTimeEnd,
                cpost: workWork,
                authenticator: workReterence,
                authenticatortel: WorkReterenceNum,
                edtwkid: ""
            });
            staffChange_WorkDataTabl(workArray);
            workClear()
        } else {
            // WorkReterenceNum_judge = false;
            BootstrapDialog.show({
                type: BootstrapDialog.TYPE_WARNING,
                message: '请输入正确的固定电话或者手机号码！',
                title: "信息提示",
                closeByBackdrop: false, //不能通过点击其他部分关闭
                buttons: [{
                    label: '确定',
                    action: function (dialogItself) {
                        dialogItself.close(); //可以认为是关闭的回调方法
                        $("#WorkReterenceNum").focus();
                        return;
                    }
                }]
            });
        }

    }


})
// 工作的清空按钮功能
function workClear() {
    $("#workName").val("");
    $("#workTime .dateStart").val("");
    $("#workTime .dateEnd").val("");
    $("#workWork").val("");
    $("#workReterence").val("");
    $("#WorkReterenceNum").val("");
}


//--------------------工作删除功能 staffChange_WorkDelBtn---------------
$(document).off("click", ".staffChange_WorkDelBtn").on("click", ".staffChange_WorkDelBtn", function () {
    var _that = this;
    BootstrapDialog.show({
        type: BootstrapDialog.TYPE_WARNING,
        message: '是否删除该条工作经历！',
        title: "信息提示",
        closeByBackdrop: false, //不能通过点击其他部分关闭
        buttons: [{
            cssClass: "btn-primary",
            label: '是',
            action: function (dialogItself) {
                dialogItself.close(); //可以认为是关闭的回调方法
                // 获取列表数据
                var rowDelIndex = $(_that).parents("tr").index();
                //   console.log(rowDelIndex)
                //   console.log($('#staffChange_workDataTabl').DataTable().row(rowDelIndex).data())
                var DelWorkReterenceedtwkid = $('#staffChange_workDataTabl').DataTable().row(rowDelIndex).data().edtwkid;
                edtwkid = $('#staffChange_workDataTabl').DataTable().row(rowDelIndex).data().edtwkid;
                // edtwkid = e.parentNode.parentNode.children[0].dataset.edtwkid;
                // 将删除的工作id存起来
                if (DelWorkReterenceedtwkid == "undefined" || DelWorkReterenceedtwkid == "") {
                    edtwkidArray.push({
                        // edtwkid: ""
                    });
                } else {
                    edtwkidArray.push({
                        edtwkid
                    });
                }
                // console.log(edtwkidArray)
                // console.log(workArray)
                workArray.splice(rowDelIndex, 1)
                // console.log(workArray)
                //---------------------遍历eduArray数组，列表刷新-----------------
                staffChange_WorkDataTabl(workArray);

            }
        }, {
            label: '否',
            action: function (dialogItself) {
                dialogItself.close(); //可以认为是关闭的回调方法

            }
        }]
    });


})
//----------------------------工作修改--------------------------

var staff_work = "",
    staff_workedtwkid = "",
    staff_workecreatedate = "";


// 定义修改列表的索引
var staffChange_WorkChangeIndex = "";
$(document).off("click", ".staffChange_WorkChangeBtn").on("click", ".staffChange_WorkChangeBtn", function () {
     
     staffChange_WorkDel =   $(this).next();
     staffChange_WorkDel.attr("disabled", "true").attr("title","数据修改中，不能删除！");

    // 获取列表数据
    var rowIndex = $(this).parents("tr").index();
    staffChange_WorkChangeIndex = rowIndex;
    var changworkName = $('#staffChange_workDataTabl').DataTable().row(rowIndex).data().placename;
    var changworkTimeStart = $('#staffChange_workDataTabl').DataTable().row(rowIndex).data().ewbegindate;
    var changworkTimeEnd = $('#staffChange_workDataTabl').DataTable().row(rowIndex).data().ewenddate;
    var changworkWork = $('#staffChange_workDataTabl').DataTable().row(rowIndex).data().cpost;
    var changworkReterence = $('#staffChange_workDataTabl').DataTable().row(rowIndex).data().authenticator;
    var changWorkReterenceNum = $('#staffChange_workDataTabl').DataTable().row(rowIndex).data().authenticatortel;
    staff_workedtwkid = $('#staffChange_workDataTabl').DataTable().row(rowIndex).data().edtwkid;
    staff_workecreatedate = $('#staffChange_workDataTabl').DataTable().row(rowIndex).data().createdate;

    $("#workName").val(changworkName);
    $("#workTime .dateStart").val(changworkTimeStart);
    $("#workTime .dateEnd").val(changworkTimeEnd);
    $("#workWork").val(changworkWork);
    $("#workReterence").val(changworkReterence);
    $("#WorkReterenceNum").val(changWorkReterenceNum);

    //	------------------隐藏保存按钮 显示确认 取消 按钮----------------
    $("#workAdd").removeClass("inlineblock");
    $("#workAdd").addClass("none");
    $(".staff_worksavenone").addClass("inlineblock");
    $(".staff_worksavenone").removeClass("none");
})



//---------------------修改取消按钮---------------------
function workbtn_none() {
    $("#workAdd").addClass("inlineblock");
    $("#workAdd").removeClass("none");
    $(".staff_worksavenone").removeClass("inlineblock");
    $(".staff_worksavenone").addClass("none");
}
$("#staff_workclose").on("click", function () {
    workClear();
    workbtn_none();
    staffChange_WorkDel.removeAttr("disabled", "title");
})

//----------------------修改完成提交按钮---------------
$("#staff_worksave").on("click", function () {

    var workNamesave = $("#workName").val();
    var workTimeStartsave = $("#workTime .dateStart").val();
    var workTimeEndsave = $("#workTime .dateEnd").val();
    var workWorksave = $("#workWork").val();
    var workReterencesave = $("#workReterence").val();
    var WorkReterenceNumsave = $("#WorkReterenceNum").val();
    if (workNamesave == "" || workTimeStartsave == "" || workTimeEndsave == "" || workWorksave == "" || workReterencesave == "" || WorkReterenceNumsave == "") {
        BootstrapDialog.alert({
            type: BootstrapDialog.TYPE_WARNING,
            message: "请将工作经历填写完整！",
        });

    } else {
        // 验证电话号码
        var WorkReterenceNumRE = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;//固定电话
        var reterenceNumPhoneRE = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;//手机号码

        var WorkReterenceNum = $("#WorkReterenceNum").val().trim();
        if (WorkReterenceNumRE.test(WorkReterenceNum) || reterenceNumPhoneRE.test(WorkReterenceNum)) {

            workArray[staffChange_WorkChangeIndex].placename = workNamesave;
            workArray[staffChange_WorkChangeIndex].ewbegindate = workTimeStartsave;
            workArray[staffChange_WorkChangeIndex].ewenddate = workTimeEndsave;
            workArray[staffChange_WorkChangeIndex].cpost = workWorksave;
            workArray[staffChange_WorkChangeIndex].authenticator = workReterencesave;
            workArray[staffChange_WorkChangeIndex].authenticatortel = WorkReterenceNumsave;
            workArray[staffChange_WorkChangeIndex].edtwkid = staff_workedtwkid;
            workArray[staffChange_WorkChangeIndex].createdate = staff_workecreatedate;
            workClear();
            workbtn_none();
            // console.log("修改后：" + JSON.stringify(workArray))
            //------------------遍历eduArray数组，列表刷新----------------
            staffChange_WorkDataTabl(workArray);
        } else {
            // WorkReterenceNum_judge = false;
            BootstrapDialog.show({
                type: BootstrapDialog.TYPE_WARNING,
                message: '请输入正确的固定电话或者手机号码！',
                title: "信息提示",
                closeByBackdrop: false, //不能通过点击其他部分关闭
                buttons: [{
                    label: '确定',
                    action: function (dialogItself) {
                        dialogItself.close(); //可以认为是关闭的回调方法
                        $("#WorkReterenceNum").focus();
                        return;
                    }
                }]
            });
        }

    }

})
//----------------------修改完成提交按钮---------------


//----------------------工作经历datatable---------------
var staffChange_WorkDataTabl = function (DataTableDate) {
    var earth_start = 0;
    var staffChange_workDataTablinit = $('#staffChange_workDataTabl').DataTable({
        dom: '<"top">t<"bottom"<"col-xs-6 col_paddingall"<"col-xs-7 col_paddingall"i><"col-xs-5"l>><"col-xs-6 col_paddingall"p>><"clear">',
        destroy: true,
        data: DataTableDate,
        paging: false,
        ordering: false,
        info: true,
        autoWidth: false,
        pageLength: 5,
        lengthMenu: [10, 15, 20],
        bFilter: false, //去掉搜索框方法三：这种方法可以
        bLengthChange: true,
        sLoadingRecords: "载入中...",
        serverSide: false,
        fnDrawCallback: function () {
            let api = this.api();
            api.column(0).nodes().each(function (cell, i) {
                cell.innerHTML = earth_start + i + 1;
            });
        },
        columns: [{
            "data": null,
            "targets": 0,
            "sTitle": "序号",
        },
        {
            "data": "placename",
            "sTitle": "单位全称",
            "defaultContent": "<i></i>"
        },
        {
            "data": "ewbegindate",
            "sTitle": "开始时间",
            "defaultContent": "<i></i>"
        },
        {
            "data": "ewenddate",
            "sTitle": "结束时间",
            "defaultContent": "<i></i>"
        },
        {
            "data": "cpost",
            "sTitle": "职务",
            "defaultContent": "<i></i>",
        },
        {
            "data": "authenticator",
            "sTitle": "证明人",
            "defaultContent": "<i></i>"
        },
        {
            "data": "authenticatortel",
            "sTitle": "证明人电话",
            "defaultContent": "<i></i>",
        },
        {
            "data": "edtwkid",
            "sTitle": "证明人id",
            "defaultContent": "<i></i>",
            "sClass": "hidden"
        },
        {
            "data": "createdate",
            "sTitle": "创建时间",
            "defaultContent": "<i></i>",
            "sClass": "hidden"
        },
        {
            "data": null,
            "sTitle": "操作",
            "defaultContent": "<i></i>"
        }

        ],
        columnDefs: [{
            // 定义操作列,######以下是重点########
            // "sTitle": "操作",
            "targets": 9, //操作按钮目标列
            "render": function (data, type, row) {
                var html = '<button class="btn btn-warning  btnpadding staffChange_WorkChangeBtn" >修改</button>'
                html += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp<button class="btn btn-danger  btnpadding staffChange_WorkDelBtn" >删除</button>'
                return html;
            }
        },
        {
            "searchable": false,
            "orderable": false,
            "targets": 0
        },
        ]
    });
    staffChange_workDataTablinit.on('order.dt search.dt', function () {
        staffChange_workDataTablinit.column(0, {
            search: 'applied',
            order: 'applied'
        }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();
}
staffChange_WorkDataTabl(workArray);

//----------------------工作经历datatable---------------

$(".ImgIDupclick").off("click").on("click", function (event) {
    // console.log(event.target.id)
    var ImgIDupclickid = event.target.id;
    idUps(ImgIDupclickid)
})

function idUps(e) {
    // console.log($("#" + e).parent().children()[0].id)
    var photoimg_e = $("#" + e).parent().children()[0].id
    if (photoimg_e == "MyIDfaceImg") {
        $("#MyIDfacefile").click();
        var d = "#MyIDfaceImg",
            photoimg_e = "#MyIDfacefile";
        uploadImg(d, photoimg_e)
    } else if (photoimg_e == "MyIDSideImg") {
        $("#MyIDsideFile").click();
        var d = "#MyIDSideImg",
            photoimg_e = "#MyIDsideFile";
        uploadImg(d, photoimg_e)
    } else if (photoimg_e == "IDfaceImg") {
        $("#IDfacefile").click();
        var d = "#IDfaceImg",
            photoimg_e = "#IDfacefile";
        uploadImg(d, photoimg_e)
    } else if (photoimg_e == "IDSideImg") {
        $("#IDsideFile").click();
        var d = "#IDSideImg",
            photoimg_e = "#IDsideFile";
        uploadImg(d, photoimg_e)
    }
}
// 本地上传图片解压成base64位
function uploadImg(d, e) {
    // console.log(e)
    var Mypreviewface = document.querySelector(d);
    // $(e).unbind();
    // $(e).click();
    $(e).off("change").on("change", function (event) {
        //判断是否有这个属性
        // console.log("eventeventeventeventeventeventevent")
        // console.log(event.target.id);
        var imageChangeId = event.target.id;
        if ($("#IDfaceImg").attr("data-Imgchange") != "undefinde" && imageChangeId == "IDfacefile") {
            $("#IDfaceImg").attr("data-Imgchange", "1");
        }
        if ($("#IDSideImg").attr("data-Imgchange") != "undefinde" && imageChangeId == "IDsideFile") {
            $("#IDSideImg").attr("data-Imgchange", "1");
        }
        if ($("#MyIDfaceImg").attr("data-idImgchange") != "undefinde" && imageChangeId == "MyIDfacefile") {
            $("#MyIDfaceImg").attr("data-idImgchange", "1");
        }
        if ($("#MyIDSideImg").attr("data-idImgchange") != "undefinde" && imageChangeId == "MyIDsideFile") {
            $("#MyIDSideImg").attr("data-idImgchange", "1");
        }

        var MyIDfaceImgSize = $(e).get(0).files[0].size;
        if (MyIDfaceImgSize && MyIDfaceImgSize < 307200) {

        } else {
            BootstrapDialog.show({
                type: BootstrapDialog.TYPE_WARNING,
                message: '身份证图片大小不能大于300k，请重新选择上传！',
                title: "信息提示",
                closeByBackdrop: false, //不能通过点击其他部分关闭
                buttons: [{
                    cssClass: "btn-primary",
                    label: '确定',
                    action: function (dialogItself) {
                        dialogItself.close(); //可以认为是关闭的回调方法
                        // console.log(d)
                        if (d == "#IDfaceImg" || d == "#MyIDfaceImg") {
                            $(d).attr("src", "../userManager/unitStaffManager/images/shenfenzhengzmian.jpg");
                        } else {
                            $(d).attr("src", "../userManager/unitStaffManager/images/uoload.jpg");
                        }

                        $(e).val("");
                    }
                }]
            });
        }

        // 获取文件对象
        var file = this.files[0];
        // 确认选择的文件是图片
        // if (file.type.indexOf("image") == 0) {
        var reader = new FileReader();
        // 使用fileReader对文件对象进行操作
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            // 图片base64化 reader.result的结果是base64编码数据
            var newUrl = this.result;
            Mypreviewface.src = newUrl;
        };
        event.target.value = "";
        // }
    })
}
// 关系人的图片删除
$("#IDface,#IDside,#MyIDside,#MyIDface").on("click", function () {
    // console.log($(this)[0].id)
    if ($(this)[0].id == "IDface" || $(this)[0].id == "MyIDface") {
        $(this).siblings("img").attr("src", "../userManager/unitStaffManager/images/shenfenzhengzmian.jpg");
    } else {
        $(this).siblings("img").attr("src", "../userManager/unitStaffManager/images/uoload.jpg");
    }
    var delImgStaffChange_Id = $(this)[0].id;
    $(this).prev("input").val("");
    if ($("#IDfaceImg").attr("data-Imgchange") != "undefinde" && delImgStaffChange_Id == "IDface") {
        $("#IDfaceImg").attr("data-Imgchange", "1");
    }
    if ($("#IDSideImg").attr("data-Imgchange") != "undefinde" && delImgStaffChange_Id == "IDside") {
        $("#IDSideImg").attr("data-Imgchange", "1");
    }
    if ($("#MyIDfaceImg").attr("data-idImgchange") != "undefinde" && delImgStaffChange_Id == "MyIDface") {
        $("#MyIDfaceImg").attr("data-idImgchange", "1");
    }
    if ($("#MyIDSideImg").attr("data-idImgchange") != "undefinde" && delImgStaffChange_Id == "MyIDside") {
        $("#MyIDSideImg").attr("data-idImgchange", "1");
    }
})

// 关系人的信息导入到上面部分列表
//var relation, relationName, relationSex, otherworkStation;
// 关系人的信息的添加到列表的功能
//function addPeople(relationName, relation, relationSex, peopleRelationPolitics,otherworkStation) {
//	var addTd = "<tr class=\"peopleRelation\">"
//			+ "<td>"
//			+ relationName
//			+ "</td>"
//			+ "<td>"
//			+ relation
//			+ "</td>"
//			+ "<td>"
//			+ relationSex
//			+ "</td>"
//			+ "<td>"
//			+ peopleRelationPolitics
//			+ "</td>"
//			+ "<td>"
//			+ otherworkStation
//			+ "</td>"
//			+ "<td><input class=\"btn btn-primary\" type=\"button\" value=\"修改\"><input class=\"btn btn-primary\" type=\"button\" value=\"删除\"></td>"
//			+ "</tr>";
//	$(".peopleRelation:last").after(addTd);
//}
// 关系人的信息的保存功能（其他关系人）
$("#relationSave").off("click").on("click", function () {
    if (otherpeopleRel_fromValidatorinitfun()) {
        saveRelationPerson();
    }


})
// 关系人的信息的保存功能
$("#staffChangerelationSaveOne").off("click").on("click", function () {
    relationName = $(".peopleRelationName").val();
    relationSex = $(".peopleRelationSex option:selected").text();
    otherworkStation = $(".workStation").val();
    peopleRelationPolitics = $(".peopleRelationPolitics option:selected").text();
    if (!peopleRel_fromValidatorinitfun()) {
        BootstrapDialog.show({
            type: BootstrapDialog.TYPE_WARNING,
            message: '您还有信息项未填写或填写错误，请核实！',
            title: "信息提示",
            closeByBackdrop: false, //不能通过点击其他部分关闭
            buttons: [{
                label: '确定',
                action: function (dialogItself) {
                    dialogItself.close();
                    var judgebase1 = $('#peopleRel_fromValidator').data('bootstrapValidator').isValid();
                    if (!judgebase1) {
                        $('#peopleRel_fromValidator').data('bootstrapValidator').validate();
                        var InvalidFieldbasedatas = $('#peopleRel_fromValidator').data('bootstrapValidator').getInvalidFields()

                        $("#" + InvalidFieldbasedatas[0].id).focus();
                        return;
                    }


                }
            }]
        });
        return;
    }
    if (peopleRel_fromValidatorinitfun()) {
        saveRelationPerson();
    }


})
// 关系人的清空
function clear() {
    $(".peopleRelationName").val(""); // 关系人姓名
    $(".peopleRelationAge").val(""); // 关系人年龄
    $("#staff_peopleRelationSex").val(""); // 关系人性别
    $("#staff_peopleRelationSex option:selected").text("请选择性别");
    $(".peopleRelationImg").val(""); // 关系人图片
    $("#staff_peopleRelationPolitics").val(""); // 关系人的政治面貌
    $("#staff_peopleRelationPolitics option:selected").text("请选择政治面貌");
    $(".peopleRelationIdNum").val(""); // 关系人的身份证号码
    $(".peopleRelationNum").val(""); // 关系人的手机号码
    $(".peopleRelationAdress").val(""); // 关系人的户籍地址
    $(".peopleRelationNowAdress").val(""); // 关系人的现居住地
    $(".workStation").val(""); // 关系人的工作单位
    $(".peopleRelationStation").val(""); // 关系人的岗位
    $(".peopleRelationPost").val(""); // 关系人的职务
    $(".peopleRelationReligion").val(""); // 关系人的宗教信仰情况
    $(".peopleRelationJoin").val(""); // 关系人的参加何种组织情况
    $(".peopleRelationSafe").val(""); // 关系人的危害国家安全和涉恐犯罪情况
    $("#IDfaceImg").val(""); // 关系人的身份证图片第一张
    $("#IDSideImg").val(""); // 关系人的身份证图片第二张
    $("#staff_peopleRelationPost").val(""); // 关系人的职业
    $("#staff_peopleRelationPost option:selected").text("请选择职业");
    $("#workStation").val(""); // 关系人的工作单位
}

var peoplerelationcloseClearDatafun = function () {
    clear();
    $("#peopleRelation").val(""); //关系人类别
    deletallepeopleRelationImg();
    $("#peopleRelation").focus();
    //数据保存成功清空数据 继续新增 							
    $('#peopleRel_fromValidator').data('bootstrapValidator').destroy();
    $('#peopleRel_fromValidator').data('bootstrapValidator', null);
    peopleRel_fromValidatorfun();
}
$(".peoplerelationclose").on("click", function () {
    peoplerelationcloseClearDatafun();
})

function otherpeopleclear() {
    $("#peopleRelationName").val(""); // 其他关系人的姓名
    $("#otherpeopleRelationSex").val(""); // 其他关系人的性别
    $("#peopleRelationAge").val(""); // 其他关系人的年龄
    $("#otherpeopleRelationPolitics").val(""); // 其他关系人的政治面貌
    $("#otherpeopleRelationPost").val(""); // 关系人的职业
    $("#otherworkStation").val(""); // 关系人的工作单位
}
$(".otherclose").on("click", function () {
    otherpeopleclear();
    $("#peopleRelation").val(""); //关系人类别
})

//关系人修改

// 获取性别 ，婚姻 ，健康 ， 证件类型 ，文化程度 ，政治面貌 ，用工性质时长 ， 关系人 下拉列表



var staff_codeallfun = function () {
    staff_code("staff_basicInfo_sex");
    staff_code("staff_marital");
    staff_code("staff_health");
    staff_code("staff_passtype", "01");
    staff_code("staff_culture");
    staff_code("staff_political");
    staff_code("staff_laborTime");
    staff_code("staff_accomby");
    staff_code("staff_soldierflag","0");  //是否转业军人
    staff_code("peopleRelation");
    staff_code("staff_peopleRelationSex");
    staff_code("staff_peopleRelationPolitics");
    staff_code("staff_peopleRelationPost");
    staff_code("otherpeopleRelationSex");
    staff_code("otherpeopleRelationPolitics");
    staff_code("otherpeopleRelationPost");
    staff_code("staff_employmenttype"); //用工性质
    // staff_code("schoolWork");
    staff_code("staffChange_pattachmenttype");
 
}


function staff_code(value, setvalue) {
    var typename = $("#" + value).data("codetype");
    var maritaldata = {
        type: typename,
    }
    var maritaldatas = {
        "sessionid": sessionid,
        "funcid": "BJAirport-code.ccodeService.getCodeList",
        "data": maritaldata
    };
    // console.log(maritaldatas)
    $.axpost("/BJAirportWeb/entrance/index.do", JSON.stringify(maritaldatas), true, function (data) {
        // console.log("++++++++++++++++++++++++++++++++++++++++++++")
        // console.log(data.currdate)
        staffChange_fwqDate = data.currdate
        if (data.success == true) {
            var arrss = "";
            if ('object' == typeof data.data) {
                arrss = data.data;
            } else {
                arrss = $.parseJSON(data.data);
            }
            $("#" + value).children().eq(0).siblings().remove();
            for (var i = 0; i < arrss.length; i++) {
                $("#" + value).append("<option class='maritalappend_opt' name='reviewtype' value='" + arrss[i].code + "'>" + arrss[i].note + "</option>");
            }
            if (setvalue != "undefined") {
                $("#" + value).val(setvalue);
               if(value == "peopleRelation"){
                $('#peopleRel_fromValidator').data('bootstrapValidator').destroy();           
                $('#peopleRel_fromValidator').data('bootstrapValidator', null);
                peopleRel_fromValidatorfun();
               }
            }
            // console.log("setvaluesetvaluesetvaluesetvaluesetvaluesetvaluesetvaluesetvaluesetvaluesetvalue")
            // console.log(setvalue)
        } else {
            BootstrapDialog.alert({
                type: BootstrapDialog.TYPE_DANGER,
                message: data.message,
            });
        }
    })
    // $.ajax({
    // 	url: "/BJAirportWeb/entrance/index.do",
    // 	type: "post",
    // 	dataType: "json",
    // 	data: JSON.stringify(maritaldatas),
    // 	success: function (data) {


    // 	},
    // 	error: function (err) {
    // 		// layer.alert("提交失败4！");
    // 		BootstrapDialog.alert({
    // 			type: BootstrapDialog.TYPE_DANGER,
    // 			title: "信息提示",
    // 			message: '访问网络失败！' + XMLHttpRequest.responseJSON.error
    // 		});
    // 	}
    // });
}

// 判断如果输入证件号码是提示选择证件类型
// $('#staff_passno').on("focus", function () {
// 	if ($("#staff_passtype option:selected").text() == "请选择证件类型") {
// 		$("#staff_passtype").focus();
// 		BootstrapDialog.alert({
// 			type: BootstrapDialog.TYPE_WARNING,
// 			message: "请先选择证件类型",
// 		});
// 	}
// });

function staff_CardNotype() {
    if ($("#staff_passtype option:selected").text() == "居民身份证") {
        // 设置输入的长度
        $("#staff_passno").attr("maxlength", "18");
        $("#staff_passno").parent().removeClass("has-success")
        $("#staff_passno").val("")
        // $("#staff_passno").off("change").on("change",function () {
        // 	var cardNo = $("#staff_passno").val()
        // 	var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        // 	if (reg.test(cardNo) === false) {
        // 		// layer.alert("身份证证件号码格式不正确1");
        // 		BootstrapDialog.alert({
        // 			type: BootstrapDialog.TYPE_WARNING,
        // 			message: "身份证证件号码格式不正确",
        // 		});
        // 		$("#staff_passno").focus();
        // 	}
        // })
    } else {
        // $("#staff_passno").removeAttr("maxlength");
        $("#staff_passno").removeAttr("change");
        $("#staff_passno").parent().removeClass("has-success")
        $("#staff_passno").val("")
        // $("#staff_passno").change(function () {
        // 	var cardNo = $("#staff_passno").val()
        // 	var reg = /^[1-9]\d*$/;
        // 	if (reg.test(cardNo) === false) {
        // 		$("#staff_passno").focus();
        // 		BootstrapDialog.alert({
        // 			type: BootstrapDialog.TYPE_WARNING,
        // 			message: "证件号码格式不正确",
        // 		});
        // 		// layer.alert("证件号码格式不正确");
        // 		return false;
        // 	}
        // })
    }
}

// 姓 名 性别 出生日期 证件类型 证件号码查重
var staff_basicInfoname_cn = "",
    staff_basicInfoname_en = "";




$(document).ready(function () {
    if (savedata_type == "1") {

        $("#peopleRelation").attr("disabled", "true");

        $(".staff_lookup_info").on("blur", function () {
            // alert("123")
            var staff_basicInfo_cnx = $(".staff_basicInfo_cnx").val()
            var staff_basicInfo_cnm = $(".staff_basicInfo_cnm").val()
            staff_basicInfoname_cn = staff_basicInfo_cnx + staff_basicInfo_cnm
            var staff_basicInfo_enx = $(".staff_basicInfo_enx").val()
            var staff_basicInfo_enm = $(".staff_basicInfo_enm").val()
            staff_basicInfoname_en = staff_basicInfo_enx + staff_basicInfo_enm
            var staff_basicInfo_sex = $("#staff_basicInfo_sex option:selected").val()
            var staff_basicInfo_bday = $(".staff_basicInfo_bday").val()
            var staff_passtype = $("#staff_passtype").val()
            var staff_passno = $("#staff_passno").val()
            // debugger
            function lookup_Info() {
                var queryPersonEx = {
                    passtype: staff_passtype,
                    passno: staff_passno,
                    // birthday: staff_basicInfo_bday.replace(/[-]/g, ""),
                    // sex: staff_basicInfo_sex,
                    type: savedata_type,
                    personid: personid,
                    // chnsurname: staff_basicInfo_cnx, //中文姓
                    // chngivename:staff_basicInfo_cnm, //中文名
                    // chnname: staff_basicInfoname_cn, //中文姓名
                    // ensurname: staff_basicInfo_enx, //英文姓
                    // engivename:staff_basicInfo_enm, //英文名
                    // enname: staff_basicInfoname_en
                }
                var queryPersonExs = {
                    "sessionid": sessionid,
                    "funcid": "BJAirport-unit.PersonManageService.queryPersonEx",
                    "data": queryPersonEx
                }
                // console.log(queryPersonExs)
                $.axpost("/BJAirportWeb/entrance/index.do", JSON.stringify(queryPersonExs), true, function (data) {
                    // console.log(data);
                    if (data.success == true) {
                        var queryPersonarrs = "";
                        if ('object' == typeof data.message) {
                            queryPersonarrs = data.message;
                        } else {
                            queryPersonarrs = $.parseJSON(data.message);
                        }
                        if (queryPersonarrs.result == false) {
                            BootstrapDialog.alert({
                                type: BootstrapDialog.TYPE_WARNING,
                                message: queryPersonarrs.msg,
                            });
                        } else {
                            $("#peopleRelation").removeAttr("disabled");
                        }
                    } else {
                        BootstrapDialog.alert({
                            type: BootstrapDialog.TYPE_DANGER,
                            message: data.message,
                        });
                    }
                })

            }

            var staff_passtypeOrstaff_passno = $('#staffChange_fromValidatorbase_Info').data('bootstrapValidator').isValidField('staff_passnonotEmpty');

            if (staff_passtype != "" && staff_passno != "" && staff_passtypeOrstaff_passno) {
                lookup_Info();
            }


        })
    } else {
        $("#peopleRelation").removeAttr("disabled");
        $(".staff_lookup_info").off("blur");
    }

})


//判断是否成为兼职专办员

function staffChange_moreworkflag() {
    var buttonDia = BootstrapDialog.show({
        message: '是否成为兼职专办员！',
        title: "信息提示",
        closeByBackdrop: false, //不能通过点击其他部分关闭
        buttons: [{
            cssClass: "btn-primary",
            label: '是',
            action: function (dialogItself) {
                dialogItself.close(); //可以认为是关闭的回调方法
                moreworkflag = 1;
                $("#staffChangerelationSaveOne").removeAttr("disabled");
                $("#staff_savebasciInfo").removeAttr("disabled");
                $("#staff_savesubmit").removeAttr("disabled");
                $("#peopleRelation").removeAttr("disabled");
                // 将是否兼职专办员设置成  是  并设置成不可选状态
                $(".staffChange_moreworkflag").val(moreworkflag);
                $(".staffChange_moreworkflag").attr("disabled", "true");
            }
        }, {
            label: '否',
            action: function (dialogItself) {
                dialogItself.close(); //可以认为是关闭的回调方法
                moreworkflag = 0;
                $(".staffChange_moreworkflag").val(moreworkflag);
                $(".staffChange_moreworkflag").removeAttr("disabled");
                $("#staff_savebasciInfo").attr("disabled", "true")
                $("#staff_savesubmit").attr("disabled", "true")
                // 和 关系人录用事件
                $("#peopleRelation").attr("disabled", "true");
                $("#staffChangerelationSaveOne").attr("disabled", "true")
            }
        }]
    });
}



//	------------------关系人员保存  修改  删除------------------   

// 1关系人的类别选择获取关系人代码 和关系人类别中文

var staffrelationtype = "",
    staffcrelationtype = "";

function people() {
    $('#peopleRel_fromValidator').data('bootstrapValidator').destroy();
    $('#peopleRel_fromValidator').data('bootstrapValidator', null);

    peopleRel_fromValidatorfun();

    relation = $("#peopleRelation option:selected").text(); // 关系人类别
    var dataTxt = $("#peopleRelation option:selected").attr("value");

    if (dataTxt == "07") {
        $("#otherRelation").css("display", "table");
        $("#peopleRel").css("display", "none");
        //		其它关系人保存
        otherpeopleclear()
    } else {
        $("#peopleRel").css("display", "table");
        $("#otherRelation").css("display", "none");
        //		关系人保存 其它除外
        clear();
        // 
        if(dataTxt == "03" || dataTxt == "04"){
            $(".peopleRel_work").css("display","inline-block")
        }else{
            $(".peopleRel_work").css("display","none")
        }
        // 给关系人自动回填性别
        if (dataTxt == "01" || dataTxt == "03" || dataTxt == "05") {
            $("#staff_peopleRelationSex").val("1").trigger("change");
        } else if (dataTxt == "02" || dataTxt == "04" || dataTxt == "06") {
            $("#staff_peopleRelationSex").val("2").trigger("change");
        }
    }


    staffrelationtype = $("#peopleRelation").val();
    staffcrelationtype = $("#peopleRelation option:selected").text();

}

//-------------------关系人保存判断--------------------

function staffrelation_ajaxpost_judgefun() {

    if ($(".peopleRelationName").val() == "") {
        BootstrapDialog.show({
            type: BootstrapDialog.TYPE_WARNING,
            title: "信息提示",
            closeByBackdrop: false, //不能通过点击其他部分关闭
            message: "请输入关系人姓名!",
            buttons: [{
                label: '确定',
                action: function (dialogItself) {
                    dialogItself.close(); //可以认为是关闭的回调方法
                    //数据保存成功清空数据 继续新增
                    $(".peopleRelationName").focus();
                }
            }]
        });
        return false;
    }

    // if ($("#staff_peopleRelationSex").val() == "") {
    //     BootstrapDialog.show({
    //         type: BootstrapDialog.TYPE_WARNING,
    //         title: "信息提示",
    //         closeByBackdrop: false, //不能通过点击其他部分关闭
    //         message: "请选择关系人性别!",
    //         buttons: [{
    //             label: '确定',
    //             action: function (dialogItself) {
    //                 dialogItself.close(); //可以认为是关闭的回调方法
    //                 //数据保存成功清空数据 继续新增
    //                 $("#staff_peopleRelationSex").focus();
    //             }
    //         }]
    //     });
    //     return false;
    // }

    if ($(".peopleRelationIdNum").val() == "") {
        BootstrapDialog.show({
            type: BootstrapDialog.TYPE_WARNING,
            title: "信息提示",
            closeByBackdrop: false, //不能通过点击其他部分关闭
            message: "请输入身份证号码!",
            buttons: [{
                label: '确定',
                action: function (dialogItself) {
                    dialogItself.close(); //可以认为是关闭的回调方法
                    //数据保存成功清空数据 继续新增
                    $(".peopleRelationIdNum").focus();
                }
            }]
        });
        return false;
    }

    if ($(".peopleRelationName").val() != ""  && $(".peopleRelationIdNum").val() != "") {
        staffrelation_ajaxpost_judge = true;
    }


}



//---------------------关系人保存----------------------

function saveRelationPerson() {

    if (staffrelationtype != "07") {
        staffrelation_ajaxpost_judgefun();
    } else {
        staffrelation_ajaxpost_judge = true;
    }


    // console.log($("#peopleRelation").val())
    // console.log($("#peopleRelation option:selected").text())
    // console.log(staffrelationtype)



    if (staffrelation_ajaxpost_judge) {
        var staff_saveimgdata = [],
            staff_savedata = {};
        if (staffrelationtype != "07") {
            staff_savedata = {
                personid: personid, //人员id 		
                relationid: "", //关系人id
                relationtype: staffrelationtype, // 关系人类别代码
                crelationtype: staffcrelationtype, // 关系人类别
                relatinname: $(".peopleRelationName").val(), // 关系人姓名
                relationage: $(".peopleRelationAge").val(), // 关系人年龄
                // relationcsex: $("#staff_peopleRelationSex  option:selected").text(), // 关系人性别中文
                relationcsex:$("#staff_peopleRelationSex option:selected").text() == "请选择性别" ? "" : $("#staff_peopleRelationSex option:selected").text(),
                relationsex: $("#staff_peopleRelationSex").val(), //关系人性别代码 
                relationpoliticalcode: $("#staff_peopleRelationPolitics").val(), // 关系人的政治面貌code码
                // relationpoliticalnote: $("#staff_peopleRelationPolitics option:selected").text() , // 关系人的政治面貌
                relationpoliticalnote:$("#staff_peopleRelationPolitics option:selected").text() == "请选择政治面貌" ? "" : $("#staff_peopleRelationPolitics option:selected").text(), // 关系人的政治面貌
                relationidno: $(".peopleRelationIdNum").val(), // 关系人的身份证号码
                relationtel: $(".peopleRelationNum").val(), // 关系人的手机号码
                relationregisteraddr: $(".peopleRelationAdress").val(), // 关系人的户籍地址
                relationaddress: $(".peopleRelationNowAdress").val(), // 关系人的现居住地
                relationworkunit: $(".workStation").val(), // 关系人的工作单位
                relationpost: "",
                relationcpost: $("#staff_peopleRelationStation").val(),
                relationoccupationcode: $("#staff_peopleRelationPost").val(), // 关系人的职业code码
                relationoccupationnote: $("#staff_peopleRelationPost  option:selected").text() == "请选择职业" ? "" :$("#staff_peopleRelationPost  option:selected").text(), // 关系人的职业	
                relationreligion: $(".peopleRelationReligion").val(), // 关系人的宗教信仰情况
                relationorganinfo: $(".peopleRelationJoin").val(), // 关系人的参加何种组织情况
                relationcrime: $(".peopleRelationSafe").val(), // 关系人的危害国家安全和涉恐犯罪情况

            }

            //获取图片base64数据
            // 制证相片	身份证正面  反面
            var peopleRelationImg = "";
            if ($("#peopleRelationImg").attr("src") == "../userManager/unitStaffManager/images/frame_send.jpg") {
                peopleRelationImg = "";
            } else {
                peopleRelationImg = $("#peopleRelationImg").attr("src");
            }

            var IDfaceImg = "";
            if ($("#IDfacefile").val == "") {
                IDfaceImg = "";
            } else {
                IDfaceImg = $("#IDfaceImg").attr("src");
            }

            var IDSideImg = "";
            if ($("#IDsideFile").val == "") {
                IDSideImg = "";
            } else {
                IDSideImg = $("#IDSideImg").attr("src");
            }

            staff_saveimgdata = [
                //					制证相片PRPHOTO
                {
                    prphototype: "1",
                    cprphototype: "制证相片",
                    prphotobase: peopleRelationImg,
                },

                //					 身份证正面
                {
                    prphototype: "3",
                    cprphototype: "身份证正面",
                    prphotobase: IDfaceImg,
                },
                //					 身份证反面
                {
                    prphototype: "4",
                    cprphototype: "身份证反面",
                    prphotobase: IDSideImg
                }

            ]
            //			debugger;
            //判断照片是否上传------------------------start
            for (var i = 0; i < staff_saveimgdata.length; i++) {
                var urlarr = staff_saveimgdata[i].prphotobase + "";
                urlarr = urlarr.substring(urlarr.length - 3, urlarr.length);
                // console.log(urlarr);
                if (urlarr == "jpg" || urlarr == "img" || urlarr == "png") {
                    staff_saveimgdata.splice(i, 1);
                    i = i - 1;
                }
            }
            //判断照片是否上传------------------------end

        } else {
            staff_savedata = {
                personid: personid, //人员id 		
                relationid: "", //关系人id
                relationtype: staffrelationtype, // 关系人类别代码
                crelationtype: staffcrelationtype, // 关系人类别
                relatinname: $("#peopleRelationName").val(), // 其他关系人的姓名
                // relationcsex: $("#otherpeopleRelationSex  option:selected").text(), // 关系人性别中文
                relationcsex:$("#otherpeopleRelationSex option:selected").text() == "请选择性别" ? "" : $("#otherpeopleRelationSex option:selected").text(), // 关系人性别中文
                relationsex: $("#otherpeopleRelationSex").val(), //关系人性别代码 
                relationage: $("#peopleRelationAge").val(), // 其他关系人的年龄
                relationpoliticalcode: $("#otherpeopleRelationPolitics").val(), // 关系人的政治面貌code码
                // relationpoliticalnote: $("#otherpeopleRelationPolitics option:selected").text(), // 关系人的政治面貌
                relationpoliticalnote: $("#otherpeopleRelationPolitics option:selected").text() == "请选择政治面貌" ? "" : $("#otherpeopleRelationPolitics option:selected").text(), // 关系人的政治面貌
                relationoccupationcode: $("#otherpeopleRelationPost").val(), // 关系人的职业code码
                // relationoccupationnote: $("#otherpeopleRelationPost  option:selected").text(), // 关系人的职业		
                relationoccupationnote: $("#otherpeopleRelationPost option:selected").text() == "请选择职业" ? "" : $("#otherpeopleRelationPost option:selected").text(), // 关系人的职业	
                relationworkunit: $("#otherworkStation").val(), // 关系人的工作单位
            }

        }
        // console.log(staff_savedata)
        // console.log(staff_saveimgdata)
        var relationdata = {
            unitid: post_staffuntidid, //	单位id
            personid: personid, //	人员id
            //			人员关系数据
            Unitpresonrelationtbl: staff_savedata,
            //			人员关系相片
            Unitprphototbl: staff_saveimgdata,
            moreworkflag: $(".staffChange_moreworkflag").val(), // 兼职证件专办员
        }
        // console.log(relationdata.Unitprphototbl)
        var queryPersonExs = {

            "sessionid": sessionid,
            "funcid": "BJAirport-unit.PersonManageService.updateRelaperson",
            "data": relationdata
        }
        // console.log(queryPersonExs)
        $.axpost("/BJAirportWeb/entrance/index.do", JSON.stringify(queryPersonExs), true, function (data) {
            if (data.success == true) {
                // console.log(data.data)
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_SUCCESS,
                    message: data.message,
                    title: "信息提示",
                    closeByBackdrop: false, //不能通过点击其他部分关闭
                    buttons: [{
                        cssClass: "btn-primary",
                        label: "确定",
                        action: function (dialogItself) {
                            dialogItself.close(); //可以认为是关闭的回调方法
                            // 关系人清空
                            clear();
                            // 其它关系人清空
                            otherpeopleclear();

                            deletallepeopleRelationImg();
                            var personidarrs = "";
                            if (data.data != "") {
                                if ('object' == typeof data.data) {
                                    personidarrs = data.data;
                                } else {
                                    personidarrs = $.parseJSON(data.data);
                                }
                                personid = personidarrs.personid
                            }

                            //							刷新关系人列表
                            $("#peopleRelation").val(""); //关系人类别 
                            $("#peopleRelation option:selected").text("请选择关系人类别");
                            relationpeopletable();
                            // 重绘from表单验证
                            if (staffrelationtype != "07") {
                                $('#peopleRel_fromValidator').data('bootstrapValidator').destroy();
                                $('#peopleRel_fromValidator').data('bootstrapValidator', null);

                                peopleRel_fromValidatorfun();
                            } else {
                                $('#otherpeopleRel_fromValidator').data('bootstrapValidator').destroy();
                                $('#otherpeopleRel_fromValidator').data('bootstrapValidator', null);

                                otherpeopleRel_fromValidatorfun();
                            }

                        }
                    }]
                });



            } else {
                // layer.alert(data.message + "8")
                BootstrapDialog.alert({
                    type: BootstrapDialog.TYPE_DANGER,
                    message: data.message,
                });
            }
        })
        // $.ajax({
        // 	url: "/BJAirportWeb/entrance/index.do",
        // 	type: "post",
        // 	dataType: "json",
        // 	data: JSON.stringify(queryPersonExs),
        // 	success: function (data) {
        // 		console.log(data);
        // 		console.log(data.relationid);

        // 	},
        // 	error: function (err) {
        // 		// layer.alert("提交失败7！");
        // 		BootstrapDialog.alert({
        // 			type: BootstrapDialog.TYPE_DANGER,
        // 			title: "信息提示",
        // 			message: '访问网络失败！' + XMLHttpRequest.responseJSON.error
        // 		});
        // 	}
        // });

    }

}


//关系人列表


function relationpeopletable() {
    // console.log(personid)
    var earth_start;
    var relationpeopletable1 = $('#relationpeopletable').DataTable({
        dom: '<"top">t<"bottom"<"col-xs-6 col_paddingall"<"col-xs-7 col_paddingall"i><"col-xs-5"l>><"col-xs-6 col_paddingall"p>><"clear">',
        destroy: true,
        paging: true,
        ordering: false,
        info: true,
        autoWidth: false,
        pageLength: 10,
        lengthMenu: [10, 15, 20],
        bFilter: false, //去掉搜索框方法三：这种方法可以
        bLengthChange: true,
        sLoadingRecords: "载入中...",
        bServerSide: true,
        ajax: function (data, callback, setting) {
            earth_start = data.start
            // console.log(earth_start)
            var relationiddata = {
                personid: personid,
                draw: JSON.stringify(data.draw),
                length: JSON.stringify(data.length),
                start: JSON.stringify(data.start)
            }

            var relationiddatatab = {
                "sessionid": sessionid,
                "funcid": "BJAirport-unit.PersonManageService.queryRelationList",
                "data": relationiddata
            }
            // console.log(relationiddatatab)
            $.axpost("/BJAirportWeb/entrance/index.do", JSON.stringify(relationiddatatab), true, function (result) {
                // console.log(result)
                var eratharrs = "";
                if ('object' == typeof result.data) {
                    eratharrs = result;
                } else {
                    eratharrs = $.parseJSON(result.data);
                }
                // console.log(eratharrs)
                var hei = $(window).height() * 0.4;
                setTimeout(function () {
                    var returnData = {};
                    returnData.draw = eratharrs.draw;
                    returnData.recordsTotal = eratharrs.recordsTotal;
                    returnData.recordsFiltered = eratharrs.recordsFiltered;
                    returnData.data = eratharrs.relationlist;
                    callback(returnData);
                }, 200);
            })

        },
        fnDrawCallback: function () {
            // console.log(earth_start)
            var api = this.api();
            api.column(0).nodes().each(function (cell, i) {
                // console.log(cell)
                cell.innerHTML = earth_start + i + 1;
            });
        },
        columns: [{
            "data": null,
            // "targets": 0,
            "width": "82px"
        },
        {
            "data": "crelationtype",
            "width": "130px",
            "defaultContent": "<i></i>"
        },
        {
            "data": "relatinname",
            "width": "130px",
            "defaultContent": "<i></i>"
        },
        {
            "data": "relationcsex",
            "width": "130px",
            "defaultContent": "<i></i>"
        },
        {
            "data": "relationpoliticalnote",
            "width": "130px",
            "defaultContent": "<i></i>"
        },
        {
            "data": "relationworkunit",
            "width": "130px",
            "defaultContent": "<i></i>"
        },
        {
            "data": "relationid",
            "sTitle": "1",
            "sClass": "hidden"
        },
        {
            "data": "personid",
            "sTitle": "2",
            "sClass": "hidden"
        },
        {
            "data": "createdate",
            "sTitle": "2",
            "sClass": "hidden"
        },
        {
            "data": "relationvalidflag",
            "sTitle": "2",
            "sClass": "hidden"
        },
        ],
        columnDefs: [{
            // 定义操作列,######以下是重点########
            "targets": 10, //操作按钮目标列
            "data": null,
            "render": function (data, type, row) {
                var html = '<button   class="btn  btn-warning staff_rationpeoplechange btnpadding">修改</button>'
                html += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp<button class="btn btn-danger staff_rationpeopledelete btnpadding">删除</button>'
                return html;
            }
        },
        {
            "searchable": false,
            "orderable": false,
            "targets": 0
        },
        ]
    }

    );
    relationpeopletable1.on('order.dt search.dt', function () {
        relationpeopletable1.column(0, {
            search: 'applied',
            order: 'applied'
        }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();
}


function relationpeopletableinitfun() {

    var relationpeopletableinit = $('#relationpeopletable').DataTable({
        dom: '<"top">t<"bottom"<"col-xs-6 col_paddingall"<"col-xs-7 col_paddingall"i><"col-xs-5"l>><"col-xs-6 col_paddingall"p>><"clear">',
        destroy: true,
        data: [],
        paging: false,
        ordering: false,
        info: true,
        autoWidth: false,
        pageLength: 10,
        lengthMenu: [10, 15, 20],
        bFilter: false, //去掉搜索框方法三：这种方法可以
        bLengthChange: true,
        sLoadingRecords: "载入中...",
        serverSide: false,
        fnDrawCallback: function () {
            let api = this.api();
            api.column(0).nodes().each(function (cell, i) {
                cell.innerHTML = earth_start + i + 1;
            });
        },
        columns: [{
            "data": null,
            "targets": 0,
            "width": "82px"
        },
        {
            "data": "crelationtype",
            "width": "130px",
            "defaultContent": "<i></i>"
        },
        {
            "data": "relatinname",
            "width": "130px",
            "defaultContent": "<i></i>"
        },
        {
            "data": "relationcsex",
            "width": "130px",
            "defaultContent": "<i></i>"
        },
        {
            "data": "relationpoliticalnote",
            "width": "130px",
            "defaultContent": "<i></i>"
        },
        {
            "data": "relationworkunit",
            "width": "130px",
            "defaultContent": "<i></i>"
        },
        {
            "data": "relationid",
            "sTitle": "1",
            "sClass": "hidden"
        },
        {
            "data": "personid",
            "sTitle": "2",
            "sClass": "hidden"
        },
        {
            "data": "createdate",
            "sTitle": "2",
            "sClass": "hidden"
        },
        {
            "data": "relationvalidflag",
            "sTitle": "2",
            "sClass": "hidden"
        },
        ],
        columnDefs: [{
            // 定义操作列,######以下是重点########
            "targets": 10, //操作按钮目标列
            "data": null,
            "render": function (data, type, row) {
                var html = '<button   class="btn  btn-warning staff_rationpeoplechange btnpadding">修改</button>'
                html += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp<button class="btn btn-danger staff_rationpeopledelete btnpadding">删除</button>'
                return html;
            }
        },
        {
            "searchable": false,
            "orderable": false,
            "targets": 0
        },
        ]
    });
    relationpeopletableinit.on('order.dt search.dt', function () {
        relationpeopletableinit.column(0, {
            search: 'applied',
            order: 'applied'
        }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();
}







//------------------------人员关系的修改----------------------


//------------------------------------------------------------关系人修改信息回填-----------------------------------

var staffRelationid = "",
    createdatedata = "",
    personiddata = "",
    relationvalidflagdata = "";


$(document).off("click", ".staff_rationpeoplechange").on("click", ".staff_rationpeoplechange", function () {

    //点击修改将对应的按钮置为不可点击状态
    // console.log($(this)) 
    // console.log($(this).next().attr("disabled", "true"));
    staff_rationpeopleDel =   $(this).next();
    staff_rationpeopleDel.attr("disabled", "true").attr("title","数据修改中，不能删除！");
    
    // peoplerelationcloseClearDatafun();

    //先拿到点击的行号  
    var rowIndex = $(this).parents("tr").index();
    //此处拿到隐藏列的id  
    staffRelationid = $('#relationpeopletable').DataTable().row(rowIndex).data().relationid;
    //	判断修改关系人类别 关系人还是其它关系人
    var relationtypedata = $('#relationpeopletable').DataTable().row(rowIndex).data().crelationtype;
    //  获取创建的时间
    createdatedata = $('#relationpeopletable').DataTable().row(rowIndex).data().createdate;
    personiddata = $('#relationpeopletable').DataTable().row(rowIndex).data().personid;
    relationvalidflagdata = $('#relationpeopletable').DataTable().row(rowIndex).data().relationvalidflag;
    // console.log(createdatedata)
    // console.log(personiddata)
    // console.log(staffRelationid)
    if (relationtypedata == "其他") {
        $("#otherRelation").css("display", "table");
        $("#peopleRel").css("display", "none");
    } else {
        $("#peopleRel").css("display", "table");
        $("#otherRelation").css("display", "none");
    }

    // alert(staffRelationid)
    var personiddata = {
        personid: personid,
        relationid: staffRelationid,
    };
    var queryRelationListdate = {
        length: "1",
        personid: personid, //人员id
        relationid: staffRelationid //关系人id
    }
    var queryRelationListdates = {
        "sessionid": sessionid,
        "funcid": "BJAirport-user.PersonManageService.queryRelationList",
        "data": queryRelationListdate
    }
    // console.log(queryRelationListdates)
    $.axpost("/BJAirportWeb/entrance/index.do", JSON.stringify(queryRelationListdates), true, function (data) {
        if (data.success == true) {
            //给照片添加属性来判断是否有修改照片信息*
            $("#peopleRelationImg").attr("data-Imgchange", "0");
            $("#IDfaceImg").attr("data-Imgchange", "0");
            $("#IDSideImg").attr("data-Imgchange", "0");

            if (typeof ($("#peopleRelationImg").attr("data-prphotoid")) != "undefined") {
                peopleRelationImgid = $("#peopleRelationImg").removeAttr("data-prphotoid");
            }
            if (typeof ($("#IDfaceImg").attr("data-prphotoid")) != "undefined") {
                IDfaceImgid = $("#IDfaceImg").removeAttr("data-prphotoid");
            }
            if (typeof ($("#IDSideImg").attr("data-prphotoid")) != "undefined") {
                IDSideImgid = $("#IDSideImg").removeAttr("data-prphotoid");
            }
            //点击修改隐藏保存按钮显示提交取消按钮 

            $("#staffChangerelationSaveOne").removeClass("inlineblock");
            $("#staffChangerelationSaveOne").addClass("none");
            $(".staffrelationchange_btn").removeClass("none");
            $(".staffrelationchange_btn").addClass("inlineblock");



            var relationlistarrs = "";
            if ('object' == typeof data.relationlist) {
                relationlistarrs = data.data;
            } else {
                relationlistarrs = $.parseJSON(data.data);
            }
            // console.log(relationlistarrs.relationlist[0])

            // console.log(relationlistarrs)
            var relationlistadata = relationlistarrs.relationlist[0]
            // console.log(relationlistadata.crelationtype)
            // console.log(relationlistadata.relationtype)
            // $("#peopleRelation option:selected").text(relationlistadata.crelationtype); // 关系人类别 
            // $("#peopleRelation").val(relationlistadata.relationtype); // 关系人类别代码
            staff_code("peopleRelation", relationlistadata.relationtype);
            console.log(relationlistadata);
            if(relationlistadata.relationtype == "03" || relationlistadata.relationtype == "04"){
                $(".peopleRel_work").css("display","inline-block")
            }else{
                $(".peopleRel_work").css("display","none")
            }
            //                            判断人员类型
            if (relationtypedata == "其他") {

                $("#peopleRelationName").val(relationlistadata.relatinname); // 其他关系人的姓名
                // $("#otherpeopleRelationSex  option:selected").text(relationlistadata.relationcsex); // 关系人性别中文
                // $("#otherpeopleRelationSex").val(relationlistadata.relationsex); //关系人性别代码 
                staff_code("otherpeopleRelationSex", relationlistadata.relationsex);
                $("#peopleRelationAge").val(relationlistadata.relationage); // 其他关系人的年龄
                // $("#otherpeopleRelationPolitics").val(relationlistadata.relationpoliticalcode); // 关系人的政治面貌code码
                // $("#otherpeopleRelationPolitics option:selected").text(relationlistadata.relationpoliticalnote); // 关系人的政治面貌
                staff_code("otherpeopleRelationPolitics", relationlistadata.relationpoliticalcode);
                // $("#otherpeopleRelationPost").val(relationlistadata.relationpoliticalcode); // 关系人的职业code码
                // $("#otherpeopleRelationPost  option:selected").text(relationlistadata.relationpoliticalnote); // 关系人的职业
                staff_code("otherpeopleRelationPost", relationlistadata.relationpoliticalcode);
                $("#otherworkStation").val(relationlistadata.relationworkunit); // 关系人的工作单位




            } else {
                   


                //                              获取照片信息 判断照片类型

                for (var i = 0; i < relationlistarrs.pholist.length; i++) {

                    if (relationlistarrs.pholist[i].cprphototype == "身份证反面") {
                        // alert("身份证反面")
                        var peopleRelationImgurl_base = relationlistarrs.pholist[i].prphoto;
                        $("#IDSideImg").attr("src", "data:image/png;base64," + peopleRelationImgurl_base)
                        $("#IDSideImg").attr("data-prphotoid", relationlistarrs.pholist[i].prphotoid);
                        // console.log(peopleRelationImgurl_base)
                    } else if (relationlistarrs.pholist[i].cprphototype == "身份证正面") {
                        // alert("身份证正面")
                        var IDfaceImgurl_base = relationlistarrs.pholist[i].prphoto
                        // console.log(IDfaceImgurl_base)
                        $("#IDfaceImg").attr("src", "data:image/png;base64," + IDfaceImgurl_base)
                        $("#IDfaceImg").attr("data-prphotoid", relationlistarrs.pholist[i].prphotoid);
                    } else if (relationlistarrs.pholist[i].cprphototype == "制证相片") {
                        // alert("制证相片")
                        var IDSideImgurl_base = relationlistarrs.pholist[i].prphoto
                        // console.log(IDSideImgurl_base)
                        $("#peopleRelationImg").attr("src", "data:image/png;base64," + IDSideImgurl_base)
                        $("#peopleRelationImg").attr("data-prphotoid", relationlistarrs.pholist[i].prphotoid);
                    }
                }

                $(".peopleRelationName").val(relationlistadata.relatinname); // 关系人姓名
                $(".peopleRelationAge").val(relationlistadata.relationage); // 关系人年龄
                // $("#staff_peopleRelationSex  option:selected").text(relationlistadata.relationcsex); // 关系人性别中文 
                // $("#staff_peopleRelationSex").val(relationlistadata.relationsex); // 关系人性别代码
                staff_code("staff_peopleRelationSex", relationlistadata.relationsex);
                // $("#staff_peopleRelationPolitics").val(relationlistadata.relationpoliticalcode); // 关系人的政治面貌code码
                // $("#staff_peopleRelationPolitics option:selected").text(relationlistadata.relationpoliticalnote); // 关系人的政治面貌
                staff_code("staff_peopleRelationPolitics", relationlistadata.relationpoliticalcode);

                $(".peopleRelationIdNum").val(relationlistadata.relationidno); // 关系人的身份证号码
                $(".peopleRelationNum").val(relationlistadata.relationtel); // 关系人的手机号码
                $(".peopleRelationAdress").val(relationlistadata.relationregisteraddr); // 关系人的户籍地址
                $(".peopleRelationNowAdress").val(relationlistadata.relationaddress); // 关系人的现居住地
                $(".workStation").val(relationlistadata.relationworkunit); // 关系人的工作单位
                $("#staff_peopleRelationStation").val(relationlistadata.relationcpost), // 关系人的岗位code码
                    // $("#staff_peopleRelationStation  option:selected").text(relationlistadata.relationcpost), // 关系人的岗位
                    // $("#staff_peopleRelationPost  option:selected").text(relationlistadata.relationoccupationnote); // 关系人的职业code码
                    // $("#staff_peopleRelationPost").val(relationlistadata.relationoccupationcode); // 关系人的职业	
                    staff_code("staff_peopleRelationPost", relationlistadata.relationoccupationcode);
                $(".peopleRelationReligion").val(relationlistadata.relationreligion); // 关系人的宗教信仰情况
                $(".peopleRelationJoin").val(relationlistadata.relationorganinfo); // 关系人的参加何种组织情况
                $(".peopleRelationSafe").val(relationlistadata.relationcrime); // 关系人的危害国家安全和涉恐犯罪情况
            }
        } else {
            // layer.alert(data.message + "9")
            BootstrapDialog.alert({
                type: BootstrapDialog.TYPE_DANGER,
                message: data.message,
            });
        }
    })

})



//-------------人员关系修改提交---------------------开始

$(document).off("click", "#updateRelaperson").on("click", "#updateRelaperson", function () {


    staffrelationtype = $("#peopleRelation").val();
    staffcrelationtype = $("#peopleRelation option:selected").text();
    if (staffrelationtype != "07") {
        // alert("人员关系修改提交");
        staffrelation_ajaxpost_judgefun();
    } else {
        staffrelation_ajaxpost_judge = true;
    }
    if (staffrelation_ajaxpost_judge) {
        //判断照片是否有更改过 获取data-Imgchange的值 如果值为1则有改变，如果只为0则没有改变
        var peopleRelationImgval = $("#peopleRelationImg").attr("data-Imgchange");
        var IDfaceImgval = $("#IDfaceImg").attr("data-Imgchange");
        var IDSideImgval = $("#IDSideImg").attr("data-Imgchange");
        var peopleRelationImgid = "";
        var IDfaceImgid = "";
        var IDSideImgid = "";
        if (typeof ($("#peopleRelationImg").attr("data-prphotoid")) != "undefined") {
            // alert("1")
            peopleRelationImgid = $("#peopleRelationImg").attr("data-prphotoid");
        }
        if (typeof ($("#IDfaceImg").attr("data-prphotoid")) != "undefined") {
            // alert("2")
            IDfaceImgid = $("#IDfaceImg").attr("data-prphotoid");
        }
        if (typeof ($("#IDSideImg").attr("data-prphotoid")) != "undefined") {
            // alert("3")
            IDSideImgid = $("#IDSideImg").attr("data-prphotoid");
        }


        // console.log(peopleRelationImgid)
        // console.log(IDfaceImgid)
        // console.log(IDSideImgid)

        // console.log(staffrelationtype)
        // console.log(staffcrelationtype)
        //----------------------关系人信息修改提交 -----------------------

        var updataimgdata = new Array(),
            staff_updata = {};
        if (staffrelationtype != "07") {
            // alert("==01")
            staff_updata = {
                personid: personid,
                relationid: staffRelationid, //	关系人id
                createdate: createdatedata, //创建时间
                relationvalidflag: relationvalidflagdata, //判断是否有效
                relationtype: staffrelationtype, // 关系人类别代码
                crelationtype: staffcrelationtype, // 关系人类别
                relatinname: $(".peopleRelationName").val(), // 关系人姓名
                relationage: $(".peopleRelationAge").val(), // 关系人年龄
                // relationcsex: $("#staff_peopleRelationSex  option:selected").text(), // 关系人性别中文
                relationcsex:$("#staff_peopleRelationSex option:selected").text() == "请选择性别" ? "" : $("#staff_peopleRelationSex option:selected").text(),
                relationsex: $("#staff_peopleRelationSex").val(), //关系人性别代码 
                relationpoliticalcode: $("#staff_peopleRelationPolitics").val(), // 关系人的政治面貌code码
                // relationpoliticalnote: $("#staff_peopleRelationPolitics option:selected").text(), // 关系人的政治面貌
                relationpoliticalnote:$("#staff_peopleRelationPolitics option:selected").text() == "请选择政治面貌" ? "" : $("#staff_peopleRelationPolitics option:selected").text(), // 关系人的政治面貌
                relationidno: $(".peopleRelationIdNum").val(), // 关系人的身份证号码
                relationtel: $(".peopleRelationNum").val(), // 关系人的手机号码
                relationregisteraddr: $(".peopleRelationAdress").val(), // 关系人的户籍地址
                relationaddress: $(".peopleRelationNowAdress").val(), // 关系人的现居住地
                relationworkunit: $(".workStation").val(), // 关系人的工作单位
                relationpost: "",
                relationcpost: $("#staff_peopleRelationStation").val(),
                relationoccupationcode: $("#staff_peopleRelationPost").val(), // 关系人的职业code码
                relationoccupationnote: $("#staff_peopleRelationPost  option:selected").text() == "请选择职业" ? "" :$("#staff_peopleRelationPost  option:selected").text(), // 关系人的职业	
                relationreligion: $(".peopleRelationReligion").val(), // 关系人的宗教信仰情况
                relationorganinfo: $(".peopleRelationJoin").val(), // 关系人的参加何种组织情况
                relationcrime: $(".peopleRelationSafe").val(), // 关系人的危害国家安全和涉恐犯罪情况

            }

            //获取图片base64数据
            // 制证相片	身份证正面  反面
            var peopleRelationImg = "";
            var peopleRelationImgurl = $("#peopleRelationImg").attr("src")
            peopleRelationImgurl = peopleRelationImgurl.substring(peopleRelationImgurl.length - 3, peopleRelationImgurl.length);
            // console.log(peopleRelationImgurl);
            if (peopleRelationImgurl == "jpg" || peopleRelationImgurl == "img" || peopleRelationImgurl == "png") {
                peopleRelationImg = "";
            } else {
                peopleRelationImg = $("#peopleRelationImg").attr("src");
            }

            var IDfaceImg = "";
            if ($("#IDfacefile").val == "") {
                IDfaceImg = "";
            } else {
                IDfaceImg = $("#IDfaceImg").attr("src");
            }

            var IDSideImg = "";
            if ($("#IDsideFile").val == "") {
                IDSideImg = "";
            } else {
                IDSideImg = $("#IDSideImg").attr("src");
            }
            updataimgdata = [
                //					制证相片PRPHOTO
                {
                    prphototype: "1",
                    cprphototype: "制证相片",
                    prphotobase: peopleRelationImg,
                    imgchange: peopleRelationImgval,
                    prphotoid: peopleRelationImgid
                },

                //					 身份证正面
                {
                    prphototype: "3",
                    cprphototype: "身份证正面",
                    prphotobase: IDfaceImg,
                    imgchange: IDfaceImgval,
                    prphotoid: IDfaceImgid
                },
                //					 身份证反面
                {
                    prphototype: "4",
                    cprphototype: "身份证反面",
                    prphotobase: IDSideImg,
                    imgchange: IDSideImgval,
                    prphotoid: IDSideImgid
                }

            ]
            //判断照片是否上传------------------------start
            for (var i = 0; i < updataimgdata.length; i++) {
                var urlarr = updataimgdata[i].prphotobase + "";
                urlarr = urlarr.substring(urlarr.length - 3, urlarr.length);
                // console.log(urlarr);
                if (urlarr == "jpg" || urlarr == "img" || urlarr == "png" || urlarr == "") {
                    // if (updataimgdata.length == 1) {
                    // 	updataimgdata = new Array();
                    // 	break;
                    // } else {
                    // 	updataimgdata.splice(i, 1);
                    // 	i = i - 1;
                    // }
                    updataimgdata[i].prphotobase = "";
                }
            }

            // console.log(updataimgdata)
            //判断照片是否上传------------------------end

        } else {
            // alert("==07")
            staff_updata = {
                personid: personid,
                relationid: staffRelationid, //		关系人id
                createdate: createdatedata, //创建时间
                relationvalidflag: relationvalidflagdata, //判断是否有效
                relationtype: staffrelationtype, // 关系人类别代码
                crelationtype: staffcrelationtype, // 关系人类别中文
                relatinname: $("#peopleRelationName").val(), // 其他关系人的姓名
                // relationcsex: $("#otherpeopleRelationSex  option:selected").text(), // 关系人性别中文
                relationcsex:$("#otherpeopleRelationSex option:selected").text() == "请选择性别" ? "" : $("#otherpeopleRelationSex option:selected").text(), // 关系人性别中文
                relationsex: $("#otherpeopleRelationSex").val(), //关系人性别代码 
                relationage: $("#peopleRelationAge").val(), // 其他关系人的年龄
                relationpoliticalcode: $("#otherpeopleRelationPolitics").val(), // 关系人的政治面貌code码
                // relationpoliticalnote: $("#otherpeopleRelationPolitics option:selected").text(), // 关系人的政治面貌
                relationpoliticalnote: $("#otherpeopleRelationPolitics option:selected").text() == "请选择政治面貌" ? "" : $("#otherpeopleRelationPolitics option:selected").text(), // 关系人的政治面貌
                relationoccupationcode: $("#otherpeopleRelationPost").val(), // 关系人的职业code码
                // relationoccupationnote: $("#otherpeopleRelationPost  option:selected").text(), // 关系人的职业			
                relationoccupationnote: $("#otherpeopleRelationPost option:selected").text() == "请选择职业" ? "" : $("#otherpeopleRelationPost option:selected").text(), // 关系人的职业	
                relationworkunit: $("#otherworkStation").val(), // 关系人的工作单位
            }
        }
        // console.log(staff_updata)
        // console.log(updataimgdata)
        // 判断关系人人员状态 1为草稿  ， 2为有效
        // 	var staff_updataType = '';
        //    if(savedata_type == "2"){
        //         if(post_staffpersonvalidflag == "1"){
        // 			staff_updataType = "2";
        // 		}else if(post_staffpersonvalidflag == "9"){
        // 			staff_updataType = "1";
        // 		}
        //    }else{
        //         staff_updataType = "1";
        //    }


        var updateRelapersondata = {
            relationid: staffRelationid, //	单位id
            personid: personid, //	人员id
            // type: staff_updataType, //状态信息
            //			人员关系数据
            Unitpresonrelationtbl: staff_updata,
            //			人员关系相片
            Unitprphototbl: updataimgdata
        }

        var updateRelapersondatas = {
            "sessionid": sessionid,
            "funcid": "BJAirport-unit.PersonManageService.updateRelaperson",
            "data": updateRelapersondata
        }
        // console.log(updateRelapersondatas);
        if (!peopleRel_fromValidatorinitfun()) {
            BootstrapDialog.show({
                type: BootstrapDialog.TYPE_WARNING,
                message: '您还有信息项未填写或填写错误，请核实！',
                title: "信息提示",
                closeByBackdrop: false, //不能通过点击其他部分关闭
                buttons: [{
                    label: '确定',
                    action: function (dialogItself) {
                        dialogItself.close();
                        var judgebase1 = $('#peopleRel_fromValidator').data('bootstrapValidator').isValid();
                        if (!judgebase1) {
                            $('#peopleRel_fromValidator').data('bootstrapValidator').validate();
                            var InvalidFieldbasedatas = $('#peopleRel_fromValidator').data('bootstrapValidator').getInvalidFields()

                            $("#" + InvalidFieldbasedatas[0].id).focus();
                            return;
                        }


                    }
                }]
            });
            return;
        }
        if (peopleRel_fromValidatorinitfun()) {

            $.axpost("/BJAirportWeb/entrance/index.do", JSON.stringify(updateRelapersondatas), true, function (data) {
                if (data.success == true) {

                    var buttonDia = BootstrapDialog.show({
                        type: BootstrapDialog.TYPE_SUCCESS,
                        message: '关系人信息修改成功！',
                        title: "信息提示",
                        closeByBackdrop: false, //不能通过点击其他部分关闭
                        buttons: [{
                            cssClass: "btn-primary",
                            label: '确定',
                            action: function (dialogItself) {
                                dialogItself.close(); //可以认为是关闭的回调方法

                                // console.log(data.data)
                                staff_relationbtn();
                                deletallepeopleRelationImg();
                                //							成功后移除属性data-Imgchange
                                $("#peopleRelationImg,#IDfaceImg,#IDSideImg").removeAttr("data-Imgchange")
                                //							刷新关系人列表
                                relationpeopletable();
                                //数据保存成功清空数据 继续新增
                                $('#peopleRel_fromValidator').data('bootstrapValidator').destroy();
                                $('#peopleRel_fromValidator').data('bootstrapValidator', null);
                                peopleRel_fromValidatorfun();


                                if (typeof ($("#peopleRelationImg").attr("data-prphotoid")) != "undefined") {
                                    $("#peopleRelationImg").removeAttr("data-prphotoid");
                                }
                                if (typeof ($("#IDfaceImg").attr("data-prphotoid")) != "undefined") {
                                    $("#IDfaceImg").removeAttr("data-prphotoid");
                                }
                                if (typeof ($("#IDSideImg").attr("data-prphotoid")) != "undefined") {
                                    $("#IDSideImg").removeAttr("data-prphotoid");
                                }

                            }
                        }]
                    });

                } else {
                    // layer.alert(data.message + "10")
                    BootstrapDialog.alert({
                        type: BootstrapDialog.TYPE_DANGER,
                        message: data.message,
                    });
                }
            })
        }
    }
})
//-------------人员关系修改提交---------------------结束
// 保存staffChangerelationSaveOne
// 确认updateRelaperson
// 取消relationchangclose
// 清空peoplerelationclose
//点击确认按钮  隐藏确认  取消两个按钮，显示保存和清空  点击取消   隐藏确认  取消两个按钮，显示保存和清空 
function staff_relationbtn() {
    $("#staffChangerelationSaveOne").removeClass("none");
    $("#staffChangerelationSaveOne").addClass("inlineblock");
    $(".staffrelationchange_btn").removeClass("inlineblock");
    $(".staffrelationchange_btn").addClass("none");
    //清空回填数据
    clear();
    $("#peopleRelation").val(""); //关系人类别
    $("#peopleRelation option:selected").text("请选择关系人类别");
}
$("#relationchangclose").on("click", function () {
    
    var buttonDia = BootstrapDialog.show({
        type: BootstrapDialog.TYPE_WARNING,
        message: '是否取消本次，关系人信息修改！',
        title: "信息提示",
        closeByBackdrop: false, //不能通过点击其他部分关闭
        buttons: [{
            cssClass: "btn-primary",
            label: '是',
            action: function (dialogItself) {
            //    将删除按钮启用；
                staff_rationpeopleDel.removeAttr("disabled", "title");


                dialogItself.close(); //可以认为是关闭的回调方法
                //数据保存成功清空数据 继续新增 								
                $('#peopleRel_fromValidator').data('bootstrapValidator').destroy();
                $('#peopleRel_fromValidator').data('bootstrapValidator', null);
                peopleRel_fromValidatorfun();
                staff_relationbtn();
                deletallepeopleRelationImg();
                $("#peopleRelationImg,#IDfaceImg,#IDSideImg").removeAttr("data-Imgchange");
                if (typeof ($("#peopleRelationImg").attr("data-prphotoid")) != "undefined") {
                    $("#peopleRelationImg").removeAttr("data-prphotoid");
                }
                if (typeof ($("#IDfaceImg").attr("data-prphotoid")) != "undefined") {
                    $("#IDfaceImg").removeAttr("data-prphotoid");
                }
                if (typeof ($("#IDSideImg").attr("data-prphotoid")) != "undefined") {
                    $("#IDSideImg").removeAttr("data-prphotoid");
                }
            }
        }, {
            label: '否',
            action: function (dialogItself) {
                dialogItself.close(); //可以认为是关闭的回调方法

            }
        }]
    });



})


//人员关系的删除

// function staff_rationpeopledeletefun(){
$(document).off("click", ".staff_rationpeopledelete").on("click", ".staff_rationpeopledelete", function () {
    //先拿到点击的行号  
    var rowIndex = $(this).parents("tr").index();
    // console.log(rowIndex)
    //此处拿到隐藏列的id  
    var staffRelationid = $('#relationpeopletable').DataTable().row(rowIndex).data().relationid;
    // alert(staffRelationid)
    var personiddata = {
        personid: personid,
        deleteid: staffRelationid,
        "state": "1",
        "type": "1"

    };
    var data = {
        "sessionid": sessionid,
        "funcid": "BJAirport-unit.PersonManageService.deleteRelaperson",
        "data": personiddata
    };
    // console.log(data);
    BootstrapDialog.show({
        type: BootstrapDialog.TYPE_WARNING,
        message: '是否删除关系人信息！',
        title: "信息提示",
        closeByBackdrop: false, //不能通过点击其他部分关闭
        buttons: [{
            cssClass: "btn-primary",
            label: '是',
            action: function (dialogItself) {
                dialogItself.close(); //可以认为是关闭的回调方法
                $.axpost("/BJAirportWeb/entrance/index.do", JSON.stringify(data), true, function (data) {
                    if (data.success == true) {
                        BootstrapDialog.alert({
                            type: BootstrapDialog.TYPE_SUCCESS,
                            message: data.message,
                        });
                        relationpeopletable();
                    } else {
                        // layer.alert("删除失败，请重新操作")
                        BootstrapDialog.alert({
                            type: BootstrapDialog.TYPE_DANGER,
                            message: data.message,
                        });
                    }
                })
            }
        }, {
            label: '否',
            action: function (dialogItself) {
                dialogItself.close(); //可以认为是关闭的回调方法

            }
        }]
    });


});

// $(document).on("click", ".staff_rationpeopledelete", function () {
// $(document).ready(function () {

// 	$(".staff_rationpeopledelete").off("click").on("click",function(){
// 		//先拿到点击的行号  
// 		var rowIndex = $(this).parents("tr").index();
// 		//此处拿到隐藏列的id  
// 		var staffRelationid = $('#relationpeopletable').DataTable().row(rowIndex).data().relationid;
// 		// alert(staffRelationid)
// 		var personiddata = {
// 			personid: personid,
// 			deleteid: staffRelationid,
// 			"state": "1",
// 			"type": "1"

// 		};
// 		var data = {
// 			"sessionid": sessionid,
// 			"funcid": "BJAirport-unit.PersonManageService.deleteRelaperson",
// 			"data": personiddata
// 		};
// console.log(data);
// 		$.axpost("/BJAirportWeb/entrance/index.do", JSON.stringify(data), true, function (data) {
// 			if (data.success == true) {
// 				BootstrapDialog.alert({
// 					type: BootstrapDialog.TYPE_SUCCESS,
// 					message: data.message,
// 				});
// 				relationpeopletable();
// 			} else {
// 				// layer.alert("删除失败，请重新操作")
// 				BootstrapDialog.alert({
// 					type: BootstrapDialog.TYPE_DANGER,
// 					message: data.message,
// 				});
// 			}
// 		})

//     })
// })


//-------------------------单位人员的保存 end---------------------



//继续新增清空信息
function clearGlobal_Variable() {
    // post_staffuntidid = "";
    // post_staffuntidname = "";
    post_staffpersonid = "";
    post_staffpersonvalidflag = "";
    select2postName = [];
    moreworkflag = "0";
    personid = "";
    staffChangegetAllInfo = "";
    // savedata_type = "";
    savedatas = "";
    staffChange_createdate = "";
    staffChangeajaxpost_judge = false;
    staffrelation_ajaxpost_judge = false;
    post_staffcbgstate = "";
    post_staffbgstate = "";
    post_staffedtwkid = "";
    reterenceNum_judge = false;
    WorkReterenceNum_judge = false;
    staffChange_personnoRel_tblData = [];
    PersonPathattachBase64 = "";
    // staffChange_nationalityjuage = true;
}
function save_Submitclear() {
    // 清空personid 2018.10.27
    clearGlobal_Variable();

    $("#staff_depName").val(""); //部门id
    $("#staff_depName option:selected").text("请选择部门"); //部门名称
    $("#staff_postName").val(""); //岗位id
    $("#staff_postName option:selected").text("请选择岗位"); //岗位名称


    $(".staff_basicInfo_cnx").val(""); //中文姓
    $(".staff_basicInfo_cnm").val(""); //中文名

    $(".staff_basicInfo_enx").val(""); //英文姓
    $(".staff_basicInfo_enm").val(""); //英文名

    $(".staff_aliasnameinfo").val(""); //曾用名
    $("#staff_basicInfo_sex").val(""); //性别代码
    $("#staff_basicInfo_sex option:selected").text("请选择性别"); //性别名称
    $(".staff_basicInfo_bday").val("") //出生日期
    $("#staff_passtype").val(""); //证件类型代码
    // $("#staff_passtype option:selected").text("请选择证件类型"); //证件类型中文
    $("#staff_passno").val(""); //证件号码
    $("#staff_culture").val(""); //文化程度代码
    $("#staff_culture option:selected").text("请选择文化程度"); //文化程度中文
    $("#staff_political").val(""); //政治面貌代码
    $("#staff_political option:selected").text("请选择政治面貌"); //政治面貌中文
    $("#joinTime").val(""); //何时加入该党派
    $("#staff_marital").val(""); //婚姻状况代码
    $("#staff_marital option:selected").text("请选择婚姻"); //婚姻状况中文
    $("#staff_health").val(""); //精神健康代码
    $("#staff_health option:selected").text("请选择健康状况"); //精神健康中文
    $(".religion").val(""); //宗教信仰情况
    $(".crime").val(""); //违反犯罪情况
    $(".organinfo").val(""); //参加何种组织情况
    $("#textarea").val(""); //本人自述
    $(".othersituation").val(""); //其它需要说明的情况
    $("#staff_telephonenumb").val(""); //手机号码
    $("#staff_officetelephone").val(""); //联系电话
    $("#staffChange_personno").val(""); //人员编码
    $(".registere").val(""); //户籍所在地
    $(".address").val(""); //现居住地址



    $("#staff_laborTime").val(""); //用工时限名称代码
    $("#staff_laborTime option:selected").text("请选择用工时限"); //用工时限名称中文
    $(".staff_datestartinfo").val(""); //用工时限开始时间
    $(".staff_dateendtinfo").val(""); //用工时限结束时间
    $(".worktask").val(""); //工作职责
    $(".workplace").val(""); //工作场所
    $("#staffChange_faxnumber").val(""), //传真号
        $(".reality").val(""); //现实表现
    $(".otherpr").val(""); //其它问题
    $(".firstwkdate").val(""); //首次参加工作时间
    $("#staff_accomby").val(""); //是否陪同人员
    $("#staff_soldierflag").val(""); //是否转业军人
    $("#staff_email").val("") //电子邮箱
    $(".staffChange_worktask").val("") //工作职责
    $(".staffChange_workunitdate").val("") //入司时间
    $(".staffChange_workstationdate").val("") //入岗时间
    $(".staffChange_workbdata").val("") // 工作年限开始时间
    // $(".staffChange_workedata").val("") // 工作年限结束时间
    // $(".staffChange_workcount").val("") // 工作年限

    $("#nation").val("").trigger("change"); //民族代码
    $("#nation option:selected").text("").trigger("change"); //民族名称
    $("#staff_nativeplace").val("").trigger("change"); //籍贯代码
    $("#staff_nativeplace option:selected").text("").trigger("change"); //籍贯中文

    $("#nationality").val("CHN").trigger("change"); //国籍代码
    $("#nationality option:selected").text("中国").trigger("change"); //国籍名称

   
    // $("#staff_unitinfopost").val(""); //职务
    // $("#staff_unitinfopost option:selected").text("请选择职务"); //职务中文
    $("#staff_unitinfopost").val(""); //职务
    // $("#staff_unitinfopost option:selected").text("请选择职务"); //职务中文
    $("#staff_employmenttype").val(""); //用工性质代码
    $("#staff_employmenttype option:selected").text("请选择用工性质"); //用工性质中文
    moreworkflag = "0";
    $(".staffChange_moreworkflag").val(moreworkflag); //是否成为兼职专办员  默认否
    $("#staff_depName").val("").trigger("change"); //部门id
    $("#staff_depName option:selected").text("").trigger("change"); //部门名称
    $("#staff_postName").val("").trigger("change"); //岗位id
    $("#staff_postName option:selected").text("").trigger("change"); //岗位名称

    // 清空教育列表； 
    $(".schooltrnum").remove();
    // 清空工作列表；
    $(".Workrnum").remove();
    staff_code("staff_passtype", "01");
    staff_code("staff_soldierflag","0");  //是否转业军人
    staffChange_newwadd_ddateinitfun();  //初始化日期
    //清空相片
    stafff_closeallimgdata();
    // 清空关系人列表
    relationpeopletableinitfun();
    // 清空工作教育经历列表
    workArray = []; eduArray = [];
    staffChange_WorkDataTabl(workArray);
    staffChange_educateDataTabl(eduArray);


    staffChange_nationalityjuage = true;
}

// $("#cs").on("click",function(){

// })



// 根据判断条件 姓名+性别+出生日期+证件种类+证件号码+部门+岗位是否可以保存数据；
function staffChangeajaxpost_judgefun(countryid, countrytext, savedatastype) {
    // 1、如果国籍/地区选择的是中国（CHN），
    // 则证件类型只能是居民身份证（01）或军官证（03）或士兵证（04），
    // 证件号码为身份证号的要校验号码规则；
    // 同时中文姓和中文名都不能为空；
    // console.log(savedatastype);
    var staffChangeastaffpasstype_judge = false;
    var countrytextjudge = "";
    var countryidjudge = "";
    // console.log(savedata_type);
    // console.log(nationalitytext)
    // console.log(countrytext)
    // console.log(countryid)
    if (savedata_type == "1") {
        countryidjudge = $("#nationality").val();
        countrytextjudge = $("#nationality option:selected").text()
    } else if (savedata_type == "2") {
        countryidjudge = countryid;
        countrytextjudge = countrytext
    }

    if (savedatastype == "2") {
        if (countryidjudge == "") {
            BootstrapDialog.show({
                type: BootstrapDialog.TYPE_WARNING,
                message: '国籍/地区不能为空，请选择！',
                title: "信息提示",
                closeByBackdrop: false, //不能通过点击其他部分关闭
                buttons: [{
                    label: '确定',
                    action: function (dialogItself) {
                        dialogItself.close(); //可以认为是关闭的回调方法
                        //数据保存成功清空数据 继续新增
                        $("#nationality").focus();
                    }
                }]
            });
        } else if (countryidjudge == "CHN") {
            if (($("#staff_passtype").val() != "01" && $("#staff_passtype").val() != "03" && $("#staff_passtype").val() != "04") && $("#staff_passtype").val() != "") {
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_WARNING,
                    message: '国籍/地区为' + countrytextjudge + ',证件类型只能选择居民身份证或军官证或士兵证，请重新选择！',
                    title: "信息提示",
                    closeByBackdrop: false, //不能通过点击其他部分关闭
                    buttons: [{
                        label: '确定',
                        action: function (dialogItself) {
                            dialogItself.close(); //可以认为是关闭的回调方法
                            //数据保存成功清空数据 继续新增
                            $("#staff_passtype").focus();
                        }
                    }]
                });
                staffChangeajaxpost_judge = false;
                return false;
            } else if ($(".staff_basicInfo_cnx").val() == "" || $(".staff_basicInfo_cnm").val() == "") {
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_WARNING,
                    message: '国籍/地区为' + countrytextjudge + '，中文姓和中文名都不能为空！',
                    title: "信息提示",
                    closeByBackdrop: false, //不能通过点击其他部分关闭
                    buttons: [{
                        label: '确定',
                        action: function (dialogItself) {
                            dialogItself.close(); //可以认为是关闭的回调方法
                            //数据保存成功清空数据 继续新增
                            if ($(".staff_basicInfo_cnx").val() == "") {
                                $(".staff_basicInfo_cnx").focus();
                            } else if ($(".staff_basicInfo_cnm").val() == "") {
                                $(".staff_basicInfo_cnm").focus();
                            }

                        }
                    }]
                });
                staffChangeajaxpost_judge = false;
                return false;
            } else {
                staffChangeastaffpasstype_judge = true;
            }
        } else if (countryidjudge == "MAC" || countryidjudge == "HKG") {
            if ($("#staff_passtype").val() != "06" && $("#staff_passtype").val() != "") {
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_WARNING,
                    message: '国籍/地区为' + countrytextjudge + ',证件类型只能选择港澳居民通行证，请重新选择！',
                    title: "信息提示",
                    closeByBackdrop: false, //不能通过点击其他部分关闭
                    buttons: [{
                        label: '确定',
                        action: function (dialogItself) {
                            dialogItself.close(); //可以认为是关闭的回调方法
                            //数据保存成功清空数据 继续新增
                            $("#staff_passtype").focus();
                        }
                    }]
                });
                staffChangeajaxpost_judge = false;
                return false;
            } else if ($(".staff_basicInfo_cnx").val() == "" || $(".staff_basicInfo_cnm").val() == "") {
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_WARNING,
                    message: '国籍/地区为' + countrytextjudge + '，中文姓和中文名都不能为空！',
                    title: "信息提示",
                    closeByBackdrop: false, //不能通过点击其他部分关闭
                    buttons: [{
                        label: '确定',
                        action: function (dialogItself) {
                            dialogItself.close(); //可以认为是关闭的回调方法
                            //数据保存成功清空数据 继续新增
                            if ($(".staff_basicInfo_cnx").val() == "") {
                                $(".staff_basicInfo_cnx").focus();
                            } else if ($(".staff_basicInfo_cnm").val() == "") {
                                $(".staff_basicInfo_cnm").focus();
                            }

                        }
                    }]
                });
                staffChangeajaxpost_judge = false;
                return false;
            } else {
                staffChangeastaffpasstype_judge = true;
            }
        } else if (countryidjudge == "TWN") {

            if ($("#staff_passtype").val() != "07" && $("#staff_passtype").val() != "") {
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_WARNING,
                    message: '国籍/地区为' + countrytextjudge + ',证件类型只能选择台湾通行证，请重新选择！',
                    title: "信息提示",
                    closeByBackdrop: false, //不能通过点击其他部分关闭
                    buttons: [{
                        label: '确定',
                        action: function (dialogItself) {
                            dialogItself.close(); //可以认为是关闭的回调方法
                            //数据保存成功清空数据 继续新增
                            $("#staff_passtype").focus();
                        }
                    }]
                });
                staffChangeajaxpost_judge = false;
                return false;
            } else if ($(".staff_basicInfo_cnx").val() == "" || $(".staff_basicInfo_cnm").val() == "") {
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_WARNING,
                    message: '国籍/地区为' + nationalitytext + '，中文姓和中文名都不能为空！',
                    title: "信息提示",
                    closeByBackdrop: false, //不能通过点击其他部分关闭
                    buttons: [{
                        label: '确定',
                        action: function (dialogItself) {
                            dialogItself.close(); //可以认为是关闭的回调方法
                            //数据保存成功清空数据 继续新增
                            if ($(".staff_basicInfo_cnx").val() == "") {
                                $(".staff_basicInfo_cnx").focus();
                            } else if ($(".staff_basicInfo_cnm").val() == "") {
                                $(".staff_basicInfo_cnm").focus();
                            }

                        }
                    }]
                });
                staffChangeajaxpost_judge = false;
                return false;
            } else {
                staffChangeastaffpasstype_judge = true;
            }
        } else if (countryidjudge != null) {
            if ($("#staff_passtype").val() != "02" && $("#staff_passtype").val() != "") {
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_WARNING,
                    message: '国籍/地区为' + countrytextjudge + ',证件类型只能选择护照，请重新选择！',
                    title: "信息提示",
                    closeByBackdrop: false, //不能通过点击其他部分关闭
                    buttons: [{
                        label: '确定',
                        action: function (dialogItself) {
                            dialogItself.close(); //可以认为是关闭的回调方法
                            //数据保存成功清空数据 继续新增
                            $("#staff_passtype").focus();
                        }
                    }]
                });
                staffChangeajaxpost_judge = false;
                return false;
            } else if ($(".staff_basicInfo_enx").val() == "" || $(".staff_basicInfo_enm").val() == "") {
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_WARNING,
                    message: '外国国籍，英文姓和英文名都不能为空！',
                    title: "信息提示",
                    closeByBackdrop: false, //不能通过点击其他部分关闭
                    buttons: [{
                        label: '确定',
                        action: function (dialogItself) {
                            dialogItself.close(); //可以认为是关闭的回调方法
                            //数据保存成功清空数据 继续新增
                            if ($(".staff_basicInfo_enx").val() == "") {
                                $(".staff_basicInfo_enx").focus();
                            } else if ($(".staff_basicInfo_enm").val() == "") {
                                $(".staff_basicInfo_enm").focus();
                            }

                        }
                    }]
                });
                staffChangeajaxpost_judge = false;
                return false;
            } else {
                staffChangeastaffpasstype_judge = true;
            }
        }
    } else {
        if (countryidjudge == "CHN") {
            if (($("#staff_passtype").val() != "01" && $("#staff_passtype").val() != "03" && $("#staff_passtype").val() != "04") && $("#staff_passtype").val() != "") {
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_WARNING,
                    message: '国籍/地区为' + countrytextjudge + ',证件类型只能选择居民身份证或军官证或士兵证，请重新选择！',
                    title: "信息提示",
                    closeByBackdrop: false, //不能通过点击其他部分关闭
                    buttons: [{
                        label: '确定',
                        action: function (dialogItself) {
                            dialogItself.close(); //可以认为是关闭的回调方法
                            //数据保存成功清空数据 继续新增
                            $("#staff_passtype").focus();
                        }
                    }]
                });
                staffChangeajaxpost_judge = false;
                return false;
            } else if ($(".staff_basicInfo_cnx").val() == "" || $(".staff_basicInfo_cnm").val() == "") {
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_WARNING,
                    message: '国籍/地区为' + countrytextjudge + '，中文姓和中文名都不能为空！',
                    title: "信息提示",
                    closeByBackdrop: false, //不能通过点击其他部分关闭
                    buttons: [{
                        label: '确定',
                        action: function (dialogItself) {
                            dialogItself.close(); //可以认为是关闭的回调方法
                            //数据保存成功清空数据 继续新增
                            if ($(".staff_basicInfo_cnx").val() == "") {
                                $(".staff_basicInfo_cnx").focus();
                            } else if ($(".staff_basicInfo_cnm").val() == "") {
                                $(".staff_basicInfo_cnm").focus();
                            }

                        }
                    }]
                });
                staffChangeajaxpost_judge = false;
                return false;
            } else {
                staffChangeastaffpasstype_judge = true;
            }
        } else if (countryidjudge == "MAC" || countryidjudge == "HKG") {
            if ($("#staff_passtype").val() != "06" && $("#staff_passtype").val() != "") {
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_WARNING,
                    message: '国籍/地区为' + countrytextjudge + ',证件类型只能选择港澳居民通行证，请重新选择！',
                    title: "信息提示",
                    closeByBackdrop: false, //不能通过点击其他部分关闭
                    buttons: [{
                        label: '确定',
                        action: function (dialogItself) {
                            dialogItself.close(); //可以认为是关闭的回调方法
                            //数据保存成功清空数据 继续新增
                            $("#staff_passtype").focus();
                        }
                    }]
                });
                staffChangeajaxpost_judge = false;
                return false;
            } else if ($(".staff_basicInfo_cnx").val() == "" || $(".staff_basicInfo_cnm").val() == "") {
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_WARNING,
                    message: '国籍/地区为' + countrytextjudge + '，中文姓和中文名都不能为空！',
                    title: "信息提示",
                    closeByBackdrop: false, //不能通过点击其他部分关闭
                    buttons: [{
                        label: '确定',
                        action: function (dialogItself) {
                            dialogItself.close(); //可以认为是关闭的回调方法
                            //数据保存成功清空数据 继续新增
                            if ($(".staff_basicInfo_cnx").val() == "") {
                                $(".staff_basicInfo_cnx").focus();
                            } else if ($(".staff_basicInfo_cnm").val() == "") {
                                $(".staff_basicInfo_cnm").focus();
                            }

                        }
                    }]
                });
                staffChangeajaxpost_judge = false;
                return false;
            } else {
                staffChangeastaffpasstype_judge = true;
            }
        } else if (countryidjudge == "TWN") {

            if ($("#staff_passtype").val() != "07" && $("#staff_passtype").val() != "") {
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_WARNING,
                    message: '国籍/地区为' + countrytextjudge + ',证件类型只能选择台湾通行证，请重新选择！',
                    title: "信息提示",
                    closeByBackdrop: false, //不能通过点击其他部分关闭
                    buttons: [{
                        label: '确定',
                        action: function (dialogItself) {
                            dialogItself.close(); //可以认为是关闭的回调方法
                            //数据保存成功清空数据 继续新增
                            $("#staff_passtype").focus();
                        }
                    }]
                });
                staffChangeajaxpost_judge = false;
                return false;
            } else if ($(".staff_basicInfo_cnx").val() == "" || $(".staff_basicInfo_cnm").val() == "") {
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_WARNING,
                    message: '国籍/地区为' + nationalitytext + '，中文姓和中文名都不能为空！',
                    title: "信息提示",
                    closeByBackdrop: false, //不能通过点击其他部分关闭
                    buttons: [{
                        label: '确定',
                        action: function (dialogItself) {
                            dialogItself.close(); //可以认为是关闭的回调方法
                            //数据保存成功清空数据 继续新增
                            if ($(".staff_basicInfo_cnx").val() == "") {
                                $(".staff_basicInfo_cnx").focus();
                            } else if ($(".staff_basicInfo_cnm").val() == "") {
                                $(".staff_basicInfo_cnm").focus();
                            }

                        }
                    }]
                });
                staffChangeajaxpost_judge = false;
                return false;
            } else {
                staffChangeastaffpasstype_judge = true;
            }
        } else if (countryidjudge != null) {
            if ($("#staff_passtype").val() != "02" && $("#staff_passtype").val() != "") {
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_WARNING,
                    message: '国籍/地区为' + countrytextjudge + ',证件类型只能选择护照，请重新选择！',
                    title: "信息提示",
                    closeByBackdrop: false, //不能通过点击其他部分关闭
                    buttons: [{
                        label: '确定',
                        action: function (dialogItself) {
                            dialogItself.close(); //可以认为是关闭的回调方法
                            //数据保存成功清空数据 继续新增
                            $("#staff_passtype").focus();
                        }
                    }]
                });
                staffChangeajaxpost_judge = false;
                return false;
            } else if ($(".staff_basicInfo_enx").val() == "" || $(".staff_basicInfo_enm").val() == "") {
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_WARNING,
                    message: '外国国籍，英文姓和英文名都不能为空！',
                    title: "信息提示",
                    closeByBackdrop: false, //不能通过点击其他部分关闭
                    buttons: [{
                        label: '确定',
                        action: function (dialogItself) {
                            dialogItself.close(); //可以认为是关闭的回调方法
                            //数据保存成功清空数据 继续新增
                            if ($(".staff_basicInfo_enx").val() == "") {
                                $(".staff_basicInfo_enx").focus();
                            } else if ($(".staff_basicInfo_enm").val() == "") {
                                $(".staff_basicInfo_enm").focus();
                            }

                        }
                    }]
                });
                staffChangeajaxpost_judge = false;
                return false;
            } else {
                staffChangeastaffpasstype_judge = true;
            }
        }
    }


    var staffChangename_judge = false;
    if ($(".staff_basicInfo_cnx").val() == "" && $(".staff_basicInfo_cnm").val() == "" && $(".staff_basicInfo_enm").val() == "" && $(".staff_basicInfo_enx").val() == "") {
        BootstrapDialog.show({
            type: BootstrapDialog.TYPE_WARNING,
            title: "信息提示",
            closeByBackdrop: false, //不能通过点击其他部分关闭
            message: "【中文姓+中文名】 或者 【英文姓+英文名】不能同时为空！",
            buttons: [{
                label: '确定',
                action: function (dialogItself) {
                    dialogItself.close(); //可以认为是关闭的回调方法
                    //数据保存成功清空数据 继续新增
                    $(".staff_basicInfo_cnx").focus();
                }
            }]
        });

        staffChangeajaxpost_judge = false;
        return false;
    } else {
        if ($(".staff_basicInfo_cnx").val() != "" && $(".staff_basicInfo_cnm").val() == "") {
            BootstrapDialog.show({
                type: BootstrapDialog.TYPE_WARNING,
                title: "信息提示",
                closeByBackdrop: false, //不能通过点击其他部分关闭
                message: "请输入中文名！",
                buttons: [{
                    label: '确定',
                    action: function (dialogItself) {
                        dialogItself.close(); //可以认为是关闭的回调方法
                        //数据保存成功清空数据 继续新增
                        $(".staff_basicInfo_cnm").focus();
                    }
                }]
            });
            staffChangeajaxpost_judge = false;
            staffChangename_judge = false;
            return false;
        }
        if ($(".staff_basicInfo_cnm").val() != "" && $(".staff_basicInfo_cnx").val() == "") {
            BootstrapDialog.show({
                type: BootstrapDialog.TYPE_WARNING,
                title: "信息提示",
                closeByBackdrop: false, //不能通过点击其他部分关闭
                message: "请输入中文姓！",
                buttons: [{
                    label: '确定',
                    action: function (dialogItself) {
                        dialogItself.close(); //可以认为是关闭的回调方法
                        //数据保存成功清空数据 继续新增
                        $(".staff_basicInfo_cnx").focus();
                    }
                }]
            });
            staffChangeajaxpost_judge = false;
            staffChangename_judge = false;
            return false;
        }
        if ($(".staff_basicInfo_enx").val() != "" && $(".staff_basicInfo_enm").val() == "") {
            BootstrapDialog.show({
                type: BootstrapDialog.TYPE_WARNING,
                title: "信息提示",
                closeByBackdrop: false, //不能通过点击其他部分关闭
                message: "请输入英文名！",
                buttons: [{
                    label: '确定',
                    action: function (dialogItself) {
                        dialogItself.close(); //可以认为是关闭的回调方法
                        //数据保存成功清空数据 继续新增
                        $(".staff_basicInfo_enm").focus();
                    }
                }]
            });

            staffChangeajaxpost_judge = false;
            staffChangename_judge = false;
            return false;
        }
        if ($(".staff_basicInfo_enm").val() != "" && $(".staff_basicInfo_enx").val() == "") {
            BootstrapDialog.show({
                type: BootstrapDialog.TYPE_WARNING,
                title: "信息提示",
                closeByBackdrop: false, //不能通过点击其他部分关闭
                message: "请输入英文姓！",
                buttons: [{
                    label: '确定',
                    action: function (dialogItself) {
                        dialogItself.close(); //可以认为是关闭的回调方法
                        //数据保存成功清空数据 继续新增
                        $(".staff_basicInfo_enx").focus();
                    }
                }]
            });

            staffChangeajaxpost_judge = false;
            staffChangename_judge = false;
            return false;
        }

        if ($(".staff_basicInfo_enm").val() != "" && $(".staff_basicInfo_enx").val() != "") {
            staffChangename_judge = true;
        }
        if ($(".staff_basicInfo_cnx").val() != "" && $(".staff_basicInfo_cnm").val() != "") {
            staffChangename_judge = true;
        }

    }

    if ($("#staff_basicInfo_sex").val() == "") {
        BootstrapDialog.show({
            type: BootstrapDialog.TYPE_WARNING,
            title: "信息提示",
            closeByBackdrop: false, //不能通过点击其他部分关闭
            message: "请选择性别！",
            buttons: [{
                label: '确定',
                action: function (dialogItself) {
                    dialogItself.close(); //可以认为是关闭的回调方法
                    //数据保存成功清空数据 继续新增
                    $("#staff_basicInfo_sex").focus();
                }
            }]
        });
        return false;
    }
    if ($(".staff_basicInfo_bday").val() == "") {
        BootstrapDialog.show({
            type: BootstrapDialog.TYPE_WARNING,
            title: "信息提示",
            closeByBackdrop: false, //不能通过点击其他部分关闭
            message: "请选择出生日期！",
            buttons: [{
                label: '确定',
                action: function (dialogItself) {
                    dialogItself.close(); //可以认为是关闭的回调方法
                    //数据保存成功清空数据 继续新增
                    $(".staff_basicInfo_bday").focus();
                }
            }]
        });
        return false;
    }
    if ($("#staff_passtype").val() == "") {
        BootstrapDialog.show({
            type: BootstrapDialog.TYPE_WARNING,
            title: "信息提示",
            closeByBackdrop: false, //不能通过点击其他部分关闭
            message: "请选择证件类型！",
            buttons: [{
                label: '确定',
                action: function (dialogItself) {
                    dialogItself.close(); //可以认为是关闭的回调方法
                    //数据保存成功清空数据 继续新增
                    $("#staff_passtype").focus();
                }
            }]
        });
        return false;
    }

    if ($("#staff_passno").val() == "") {
        BootstrapDialog.show({
            type: BootstrapDialog.TYPE_WARNING,
            title: "信息提示",
            closeByBackdrop: false, //不能通过点击其他部分关闭
            message: "请输入证件号码！",
            buttons: [{
                label: '确定',
                action: function (dialogItself) {
                    dialogItself.close(); //可以认为是关闭的回调方法
                    //数据保存成功清空数据 继续新增
                    $("#staff_passno").focus();
                }
            }]
        });
        return false;
    }

    if ($("#staff_depName").val() == "") {
        BootstrapDialog.show({
            type: BootstrapDialog.TYPE_WARNING,
            title: "信息提示",
            closeByBackdrop: false, //不能通过点击其他部分关闭
            message: "请选择部门！",
            buttons: [{
                label: '确定',
                action: function (dialogItself) {
                    dialogItself.close(); //可以认为是关闭的回调方法
                    //数据保存成功清空数据 继续新增
                    $("#staff_depName").focus();
                }
            }]
        });
        return false;
    }

    if ($("#staff_postName").val() == "") {
        BootstrapDialog.show({
            type: BootstrapDialog.TYPE_WARNING,
            title: "信息提示",
            closeByBackdrop: false, //不能通过点击其他部分关闭
            message: "请选择岗位！",
            buttons: [{
                label: '确定',
                action: function (dialogItself) {
                    dialogItself.close(); //可以认为是关闭的回调方法
                    //数据保存成功清空数据 继续新增
                    $("#staff_postName").focus();
                }
            }]
        });
        return false;
    }


    if (savedatastype == "1") {
        if ($("#staff_basicInfo_sex").val() != "" && $(".staff_basicInfo_bday").val() != "" && $("#staff_passtype").val() != "" && $("#staff_passno").val() != "" &&
            $("#staff_depName").val() != "" && $("#staff_postName").val() != "" && staffChangename_judge) {
            staffChangeajaxpost_judge = true;
        }
    } else if (savedatastype == "2") {
        if ($("#staff_basicInfo_sex").val() != "" && $(".staff_basicInfo_bday").val() != "" && $("#staff_passtype").val() != "" && $("#staff_passno").val() != "" &&
            $("#staff_depName").val() != "" && $("#staff_postName").val() != "" && staffChangename_judge && staffChangeastaffpasstype_judge) {
            staffChangeajaxpost_judge = true;
        }
    }

}

function save_Submit_Drafts(e) {
    var edata = e;

    var maritaldata = {
        passtype: $("#staff_passtype").val(),
        passno: $("#staff_passno").val()
    }
    var maritaldatas = {
        "sessionid": sessionid,
        "funcid": "BJAirport-user.PersonManageService.moreWorkCheck",
        "data": maritaldata
    };
    $.axpost("/BJAirportWeb/entrance/index.do", JSON.stringify(maritaldatas), true, function (result) {
        if (result.success == true) {
            save_Submit_Draftsfun(edata);
        } else {
            if (result.result == "0001") {
                BootstrapDialog.show({
                    message: '该人员信息已在其他单位登记，并且是证件专办员身份,是否成为兼职专办员！',
                    title: "信息提示",
                    closeByBackdrop: false, //不能通过点击其他部分关闭
                    buttons: [{
                        // cssClass: "btn-primary",
                        label: '是',
                        action: function (dialogItself) {
                            dialogItself.close(); //可以认为是关闭的回调方法
                            moreworkflag = 1;
                            $(".staffChange_moreworkflag").val(moreworkflag);
                            save_Submit_Draftsfun(edata);
                        }
                    }, {
                        label: '否',
                        action: function (dialogItself) {
                            dialogItself.close(); //可以认为是关闭的回调方法
                        }
                    }]
                });
            } else if (result.result == "0002") {
                BootstrapDialog.alert({
                    type: BootstrapDialog.TYPE_WARNING,
                    message: result.message,
                });
            } else {
                BootstrapDialog.alert({
                    type: BootstrapDialog.TYPE_DANGER,
                    message: result.message,
                });
            }

        }
    })

    // 判断是否成为兼职专办员；





}

var save_Submit_Draftsfun = function (e) {
    //    保存草稿的时候姓名 性别  出生日期 证件类型  证件号码  为必填项 其它均可以为空  
    var nativeplacetextjuddagess = "",
        nativeplaceidjuddagess = "",
        countrytextjuddagess = "",
        countryidjuddagess = "";
    // console.log($("#nationality option:selected").text())
    if ($("#nationality option:selected").text() == "请选择国籍") {
        countrytextjuddagess = "";
        countryidjuddagess = "";
    } else if ($("#nationality option:selected").text() == null || $("#nationality option:selected").text() == "") {

        countrytextjuddagess = countrytextjuddage;
        countryidjuddagess = countryidjuddage
    } else {
        countrytextjuddagess = $("#nationality option:selected").text();
        countryidjuddagess = $("#nationality").val();
    }
    //	获取保存类型 1 为草稿 2 为提交申请
    // console.log(e.dataset.savetype); 
    savedatas = e.dataset.savetype;
    staffChangeajaxpost_judgefun(countryidjuddagess, countrytextjuddagess, savedatas);
    if (savedatas == "1") {
        // staffChangeajaxpost_judge = true;

    } else if (savedatas == "2") {

        if (staffChangeajaxpost_judge) {
            if (!bootstrapValidator_DateFun()) {
                return;
            }
            if (!staffChange_formValidatorinitfun()) {
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_WARNING,
                    message: '您还有信息项未填写或填写错误，请核实！',
                    title: "信息提示",
                    closeByBackdrop: false, //不能通过点击其他部分关闭
                    buttons: [{
                        label: '确定',
                        action: function (dialogItself) {
                            dialogItself.close(); //可以认为是关闭的回调方法
                            //数据保存成功清空数据 继续新增
                            // $("#upImg").focus();
                            var judgebase1 = $('#staffChange_fromValidatorbase_Info').data('bootstrapValidator').isValid();
                            var judgebase2 = $('#staffChange_fromValidator').data('bootstrapValidator').isValid();
                            // var judgebase3 = $('#staffChange_fromValidatortab_content').data('bootstrapValidator').isValid();
                            if (!judgebase1) {
                                $('#staffChange_fromValidatorbase_Info').data('bootstrapValidator').validate();
                                var InvalidFieldbasedatas = $('#staffChange_fromValidatorbase_Info').data('bootstrapValidator').getInvalidFields()
                                $("#" + InvalidFieldbasedatas[0].id).focus();
                                return;
                            } else if (!judgebase2) {
                                $('#staffChange_fromValidator').data('bootstrapValidator').validate();
                                var InvalidFielddatas = $('#staffChange_fromValidator').data('bootstrapValidator').getInvalidFields()
                                $("#" + InvalidFielddatas[0].id).focus();
                                return;
                            }
                            // else if(!judgebase3){
                            // 	$('#staffChange_fromValidatortab_content').data('bootstrapValidator').validate();
                            // 	var InvalidFieldtabdatas = $('#staffChange_fromValidatortab_content').data('bootstrapValidator').getInvalidFields()
                            // 	$("#"+InvalidFieldtabdatas[0].id).focus();
                            // 	return;
                            // }

                        }
                    }]
                });
                return;
            }
        }
    }

    if (staffChangeajaxpost_judge) {
        // 判断是否是修改 是就获取IDImgchange
        if (savedata_type == "2") {
            var idImgval = $("#IDImg").attr("data-idImgchange");
            var MyIDfaceImgval = $("#MyIDfaceImg").attr("data-idImgchange");
            var MyIDSideImgval = $("#MyIDSideImg").attr("data-idImgchange");
        }


        if ($("#staff_nativeplace option:selected").text() == "请选择籍贯") {

            nativeplacetextjuddagess = "";
            nativeplaceidjuddagess = "";
        } else if ($("#staff_nativeplace option:selected").text() == null || $("#staff_nativeplace option:selected").text() == "") {

            nativeplacetextjuddagess = nativeplacetextjuddage;
            nativeplaceidjuddagess = nativeplaceidjuddage;
        } else {
            nativeplacetextjuddagess = $("#staff_nativeplace option:selected").text();
            nativeplaceidjuddagess = $("#staff_nativeplace").val();
        }
        // console.log(post_staffuntidname);
        var staff_Unitpersonphototbl = [];
        //	单位人员信息表
        var savestaff_basicInfo_cnx = $(".staff_basicInfo_cnx").val()
        var savestaff_basicInfo_cnm = $(".staff_basicInfo_cnm").val()
        savestaff_basicInfoname_cn = savestaff_basicInfo_cnx + savestaff_basicInfo_cnm
        var savestaff_basicInfo_enx = $(".staff_basicInfo_enx").val()
        var savestaff_basicInfo_enm = $(".staff_basicInfo_enm").val()
        savestaff_basicInfoname_en = savestaff_basicInfo_enx + savestaff_basicInfo_enm



        var staff_Unitpersontbl = {
            personid: personid, //人员id
            unitid: post_staffuntidid, //单位id
            fullname: post_staffuntidname, //单位全称
            // 基本信息：
            chnsurname: $(".staff_basicInfo_cnx").val().replace(/\-/g, '').trim(), //中文姓
            chngivename: $(".staff_basicInfo_cnm").val().replace(/\-/g, '').trim(), //中文名
            chnname: savestaff_basicInfoname_cn, //中文姓名
            ensurname: $(".staff_basicInfo_enx").val().replace(/\-/g, '').trim(), //英文姓
            engivename: $(".staff_basicInfo_enm").val().replace(/\-/g, '').trim(), //英文名
            enname: savestaff_basicInfoname_en, //英文姓名
            aliasname: $(".staff_aliasnameinfo").val(), //曾用名
            nation: $("#nation").val(), //民族代码
            cnation: $("#nation option:selected").text() == "请选择民族" ? "" : $("#nation option:selected").text(), //民族名称
            sex: $("#staff_basicInfo_sex").val(), //性别代码
            csex: $("#staff_basicInfo_sex option:selected").text(), //性别名称
            birthday: $(".staff_basicInfo_bday").val().replace(/\-/g, '').trim(), //出生日期
            passtype: $("#staff_passtype").val(), //证件类型代码
            cpasstype: $("#staff_passtype option:selected").text() == "请选择证件类型" ? "" : $("#staff_passtype option:selected").text(), //证件类型中文
            passno: $("#staff_passno").val(), //证件号码
            country: countryidjuddagess, //国籍代码
            ccountry: countrytextjuddagess, //国籍名称
            nativeplace: nativeplaceidjuddagess, //籍贯代码
            cnativeplace: nativeplacetextjuddagess, //籍贯中文
            educational: $("#staff_culture").val(), //文化程度代码
            ceducational: $("#staff_culture option:selected").text() == "请选择文化程度" ? "" : $("#staff_culture option:selected").text(), //文化程度中文
            marriage: $("#staff_marital").val(), //婚姻状况代码
            cmarriage: $("#staff_marital option:selected").text() == "请选择婚姻状况" ? "" : $("#staff_marital option:selected").text(), //婚姻状况中文
            political: $("#staff_political").val(), //政治面貌代码
            cpolitical: $("#staff_political option:selected").text() == "请选择政治面貌" ? "" : $("#staff_political option:selected").text(), //政治面貌中文
            politicaldate: $("#joinTime").val().replace(/\-/g, '').trim(), //何时加入该党派
            spirit: $("#staff_health").val(), //精神健康代码
            cspirit: $("#staff_health option:selected").text() == "请选择健康状况" ? "" : $("#staff_health option:selected").text(), //精神健康中文
            telephone: $("#staff_telephonenumb").val().replace(/\-/g, '').trim(), //手机号码
            callno: $("#staff_officetelephone").val().trim(), //联系电话/办公电话
            personno: $("#staffChange_personno").val().trim(),//人员编码
            pemail: $("#staff_email").val(), //电子邮箱
            religion: $(".religion").val(), //宗教信仰情况
            registere: $(".registere").val(), //户籍所在地
            address: $(".address").val(), //现居住地址
            crime: $(".crime").val(), //违反犯罪情况
            organinfo: $(".organinfo").val(), //参加何种组织情况
            othersituation: $(".othersituation").val(), //其它需要说明问题
            // 人员单位信息：
            shortname: "", //单位简称 
            depid: $("#staff_depName").val(), //部门id
            depname: $("#staff_depName option:selected").text(), //部门名称
            stationid: $("#staff_postName").val(), //岗位id
            stationname: $("#staff_postName option:selected").text(), //岗位名称		
            // post: $("#staff_unitinfopost").val(), //职务代码
            // cpost: $("#staff_unitinfopost option:selected").text(), //职务中文
            post: "", //职务代码
            cpost: $("#staff_unitinfopost").val(), //职务中文
            worktask: $(".staffChange_worktask").val(), //工作职责
            workunitdate: $(".staffChange_workunitdate").val().replace(/\-/g, '').trim(), //入司时间
            workstationdate: $(".staffChange_workstationdate").val().replace(/\-/g, '').trim(), //本次入岗时间
            employmenttime: $("#staff_laborTime").val(), //用工时限名称代码
            cemploymenttime: $("#staff_laborTime option:selected").text() == "请选择用工时限名称" ? "" : $("#staff_laborTime option:selected").text(), //用工时限名称中文
            employmenttimebdate: $(".staff_datestartinfo").val().replace(/\-/g, '').trim(), //用工时限开始时间
            employmenttimeedate: $(".staff_dateendtinfo").val().replace(/\-/g, '').trim(), //用工时限结束时间
            employmenttype: $("#staff_employmenttype").val(), // 用工性质代码
            cemploymenttype: $("#staff_employmenttype option:selected").text() == "请选择用工性质" ? "" : $("#staff_employmenttype option:selected").text(), //用工性质中文CEMPLOYMENTTYPE
            accompanyflag: $("#staff_accomby").val(), //是否陪同人员
            caccompanyflag: $("#staff_accomby option:selected").text() == "是否具备陪同资格" ? "" : $("#staff_accomby option:selected").text(), ////是否陪同人员中文
            soldierflag:$("#staff_soldierflag").val(), //是否转业军人
            csoldierflag: $("#staff_soldierflag option:selected").text() == "是否转业军人" ? "" : $("#staff_soldierflag option:selected").text(), //是否转业军人中文
           
            firstwkdate: $(".firstwkdate").val().replace(/\-/g, '').trim(), //首次参加工作时间
            workbdate: $(".staffChange_workbdata").val().replace(/\-/g, '').trim(), // 工作年限开始时间
            // workedate: $(".staffChange_workedata").val().replace(/\-/g, '').trim(), // 工作年限结束时间
            // workcount: $(".staffChange_workcount").val(), // 工作年限
            moreworkflag: $(".staffChange_moreworkflag").val(), // 是否成为兼职专办员  1 是  0否 
            myownaccount: $("#textarea").val(), //本人自述
            workplace: $(".workplace").val(), //工作场所
            faxnumber: $("#staffChange_faxnumber").val(), //传真号
            reality: $(".reality").val(), //现实表现
            otherpr: $(".otherpr").val(), //其它问题
            attachfilepath: $("#satffChangePersonPath_path").val(),//无犯罪记录证明pdf格式
            attachfilename: $("#satffChangePersonPath_btn_fileName").val()
        };

        //	单位人员教育工作经历表

        var staff_Unitpersoneduworktbl = new Array();
        var schooltrnumjson;
        var schooltrnumlength = eduArray.length;
        for (var i = 0; i < schooltrnumlength; i++) {
            eduArray[i].personid = personid;
            eduArray[i].ewtype = "1";
            eduArray[i].post = "";
            eduArray[i].cewtype = "教育经历";
        }
        for (var i = 0; i < eduArray.length; i++) {
            staff_Unitpersoneduworktbl.push(eduArray[i]);
        }
        var Workrnumlength = workArray.length
        for (var i = 0; i < Workrnumlength; i++) {

            workArray[i].personid = personid;
            workArray[i].ewtype = "2";
            workArray[i].post = "";
            workArray[i].cewtype = "工作经历";

        }
        for (var i = 0; i < workArray.length; i++) {
            staff_Unitpersoneduworktbl.push(workArray[i]);
        }
        // console.log(staff_Unitpersoneduworktbl)

        //人员大头像

        var IDImgurl = $("#IDImg").attr("src")
        IDImgurl = IDImgurl.substring(IDImgurl.length - 3, IDImgurl.length);
        var IDImg = "";
        if (IDImgurl == "jpg" || IDImgurl == "img" || IDImgurl == "png") {
            IDImg = "";
        } else {
            IDImg = $("#IDImg").attr("src");
        }
        //人员正面照片	
        var MyIDfaceImg = "";
        if ($("#MyIDfacefile").val == "") {
            MyIDfaceImg = "";
        } else {
            MyIDfaceImg = $("#MyIDfaceImg").attr("src");
        }
        //人员反面照片
        var MyIDSideImg = "";
        if ($("#MyIDsideFile").val == "") {
            MyIDSideImg = "";
        } else {
            MyIDSideImg = $("#MyIDSideImg").attr("src");
        }

        if (savedata_type == "1") {
            //    人员照片表
            staff_Unitpersonphototbl = [
                //		制证相片PRPHOTO
                {
                    phototype: "1",
                    cphototype: "制证相片",
                    photobase: IDImg
                },

                //		 身份证正面
                {
                    phototype: "3",
                    cphototype: "身份证正面",
                    photobase: MyIDfaceImg
                },
                //		 身份证反面
                {
                    phototype: "4",
                    cphototype: "身份证反面",
                    photobase: MyIDSideImg
                }
            ]
        } else if (savedata_type == "2") {
            staff_Unitpersonphototbl = [
                //		制证相片PRPHOTO
                {
                    phototype: "1",
                    cphototype: "制证相片",
                    photobase: IDImg,
                    imgchange: idImgval
                },

                //		 身份证正面
                {
                    phototype: "3",
                    cphototype: "身份证正面",
                    photobase: MyIDfaceImg,
                    imgchange: MyIDfaceImgval
                },
                //		 身份证反面
                {
                    phototype: "4",
                    cphototype: "身份证反面",
                    photobase: MyIDSideImg,
                    imgchange: MyIDSideImgval

                }
            ]
        }


        //判断照片是否上传------------------------start
        if (savedatas == "1") {
            for (var i = 0; i < staff_Unitpersonphototbl.length; i++) {
                var urlarr = staff_Unitpersonphototbl[i].photobase + "";
                urlarr = urlarr.substring(urlarr.length - 3, urlarr.length);
                // console.log(urlarr);
                if (urlarr == "jpg" || urlarr == "img" || urlarr == "png" || urlarr == "") {
                    // console.log(staff_Unitpersonphototbl)

                    if (staff_Unitpersonphototbl.length == 1) {
                        staff_Unitpersonphototbl = new Array();
                        break;
                    } else {
                        staff_Unitpersonphototbl.splice(i, 1);
                        i = i - 1;
                    }
                }

            }
        } else {
            // 提交的照片验证
            for (var i = 0; i < staff_Unitpersonphototbl.length; i++) {
                var urlarr = staff_Unitpersonphototbl[i].photobase + "";
                urlarr = urlarr.substring(urlarr.length - 3, urlarr.length);
                // console.log(urlarr);
                if (urlarr == "jpg" || urlarr == "img" || urlarr == "png" || urlarr == "") {
                    // console.log(staff_Unitpersonphototbl)

                    if (staff_Unitpersonphototbl.length == 1) {
                        staff_Unitpersonphototbl = new Array();
                        break;
                    } else {
                        staff_Unitpersonphototbl.splice(i, 1);
                        i = i - 1;
                    }
                    BootstrapDialog.show({
                        type: BootstrapDialog.TYPE_WARNING,
                        message: '相片信息,以及身份证正反照不能为空！',
                        title: "信息提示",
                        closeByBackdrop: false, //不能通过点击其他部分关闭
                        buttons: [{
                            label: '确定',
                            action: function (dialogItself) {
                                dialogItself.close(); //可以认为是关闭的回调方法
                                //数据保存成功清空数据 继续新增
                                $("#upImg").focus();
                            }
                        }]
                    });
                    return;
                }

            }
            // 提交的工作经历验证
            // if (staff_Unitpersoneduworktbl.length > 0) {

            // }  else {
            //     BootstrapDialog.show({
            //         type: BootstrapDialog.TYPE_WARNING,
            //         message: '人员信息保存，工作经历不能为空，请填写工作经历信息！',
            //         title: "信息提示",
            //         closeByBackdrop: false, //不能通过点击其他部分关闭
            //         buttons: [{
            //             label: '确定',
            //             action: function (dialogItself) {
            //                 dialogItself.close(); //可以认为是关闭的回调方法
            //             }
            //         }]
            //     });
            //     return;
            // }




        }

        //   预申请区域

        var regionArry = [];

        var regionArryAllcheckbox = $(".staffChangeTwo_area_div").find("input:checkbox[name='staffTwo_regionArry']:checked");
        // console.log(regionArryAllcheckbox)
        for (var k = 0; k < regionArryAllcheckbox.length; k++) {
            var regionobject = {};
            var regionArrycode = regionArryAllcheckbox[k].getAttribute("data-code");
            var regionArrynote = regionArryAllcheckbox[k].getAttribute("data-note");
            var regionArrymodal = regionArryAllcheckbox[k].getAttribute("data-modal");
            regionobject['areasubinfo'] = regionArrycode;
            regionobject['careasubinfo'] = regionArrynote;
            regionobject['areatype'] = regionArrymodal;
            regionArry.push(regionobject);
        }

        // 门禁预申请信息
        var guardArry = []
        var guardArryAllcheckbox = $(".staffChangeTwo_area_div").find("input:checkbox[name='staffTwo_guardArry']:checked");

        for (var j = 0; j < guardArryAllcheckbox.length; j++) {
            var guardobject = {};
            var guardArrycode = guardArryAllcheckbox[j].getAttribute("data-code");
            var guardArrynote = guardArryAllcheckbox[j].getAttribute("data-note");
            var guardArrymodal = guardArryAllcheckbox[j].getAttribute("data-modal");
            guardobject['doorsubinfo'] = guardArrycode;
            guardobject['cdoorsubinfo'] = guardArrynote;
            guardobject['areatype'] = guardArrymodal;
            guardArry.push(guardobject);
        }


        //  console.log( $("#staffChangTwo_political").val())
        //  console.log( $("#staffchangeTwo_passbeginvali").val())
        //  console.log( $("#staffchangeTwo_passendvali").val())
        //  console.log( $("#staffTwo_applypassbdate").val())
        //  console.log( $("#staffTwo_applypassedate").val())
        //  console.log( $("#staffTwo_applyreason").val())
        var Submitbtype = "";
        var Submitpassbeginvali = "";
        var Submitpassendvali = "";
        var Submitapplypassbdate = "";
        var Submitbtapplypassedateype = "";
        var Submitapplyreason = "";
        var Unitpersonattachmenttbldata = [];
        var personnoRel_tabledata = $('#personnoRel_table').DataTable().data();

        //  console.log(personnoRel_tabledata)
        if (savedata_type == "1") {
            //  新增
            Submitbtype = $("#staffChangTwo_political").val() == undefined ? "" : $("#staffChangTwo_political").val(), // BTYPE  //申请类别代码
                Submitpassbeginvali = $("#staffchangeTwo_passbeginvali").val() == undefined ? "" : $("#staffchangeTwo_passbeginvali").val(), // PASSBEGINVALI //申请证件期限起始日
                Submitpassendvali = $("#staffchangeTwo_passendvali").val() == undefined ? "" : $("#staffchangeTwo_passendvali").val(), // PASSENDVALI  //申请证件期限终止日
                Submitapplypassbdate = $("#staffTwo_applypassbdate").val() == undefined ? "" : $("#staffTwo_applypassbdate").val(), // APPLYPASSBDATE  //现持通行证号码
                Submitapplypassedate = $("#staffTwo_applypassedate").val() == undefined ? "" : $("#staffTwo_applypassedate").val(), // APPLYPASSEDATE  //现持通行证卡号
                Submitapplyreason = $("#staffTwo_applyreason").val() == undefined ? "" : $("#staffTwo_applyreason").val() // APPLYREASON  //申请事由

            //人员附件数据 //获取datatable数据，封装成数组对象    

            for (var i = 0; i < personnoRel_tabledata.length; i++) {

                Unitpersonattachmenttbldata.push({
                    pattachmenttype: personnoRel_tabledata[i].pattachmenttype,
                    cpattachmenttype: personnoRel_tabledata[i].cpattachmenttype,
                    attachmentfullname: personnoRel_tabledata[i].attachmentfullname,
                    corrtype: "application/pdf",
                    attachbase64: personnoRel_tabledata[i].attachBase64.substring(personnoRel_tabledata[i].attachBase64.indexOf(',') + 1)

                })
            }

        } else if (savedata_type == "2") {
            // 修改
            Submitbtype = $("#staffChangTwo_changepolitical").val() == undefined ? "" : $("#staffChangTwo_changepolitical").val(), // BTYPE  //申请类别代码
                Submitpassbeginvali = $("#staffchangeTwo_changepassbeginvali").val() == undefined ? "" : $("#staffchangeTwo_changepassbeginvali").val(), // PASSBEGINVALI //申请证件期限起始日
                Submitpassendvali = $("#staffchangeTwo_changepassendvali").val() == undefined ? "" : $("#staffchangeTwo_changepassendvali").val(), // PASSENDVALI  //申请证件期限终止日
                Submitapplypassbdate = $("#staffTwo_changeapplypassbdate").val() == undefined ? "" : $("#staffTwo_changeapplypassbdate").val(), // APPLYPASSBDATE  //现持通行证号码
                Submitapplypassedate = $("#staffTwo_changeapplypassedate").val() == undefined ? "" : $("#staffTwo_changeapplypassedate").val(), // APPLYPASSEDATE  //现持通行证卡号
                Submitapplyreason = $("#staffTwo_changeapplyreason").val() == undefined ? "" : $("#staffTwo_changeapplyreason").val() // APPLYREASON  //申请事由

            for (var i = 0; i < personnoRel_tabledata.length; i++) {
                if (personnoRel_tabledata[i].pattachmentid == undefined) {
                    Unitpersonattachmenttbldata.push({
                        pattachmenttype: personnoRel_tabledata[i].pattachmenttype,
                        cpattachmenttype: personnoRel_tabledata[i].cpattachmenttype,
                        attachmentfullname: personnoRel_tabledata[i].attachmentfullname,
                        corrtype: "application/pdf",
                        attachbase64: personnoRel_tabledata[i].attachBase64.substring(personnoRel_tabledata[i].attachBase64.indexOf(',') + 1)
                    })
                } else {
                    Unitpersonattachmenttbldata.push({
                        pattachmenttype: personnoRel_tabledata[i].pattachmenttype,
                        cpattachmenttype: personnoRel_tabledata[i].cpattachmenttype,
                        attachmentfullname: personnoRel_tabledata[i].attachmentfullname,
                        corrtype: "application/pdf",
                        attachbase64: personnoRel_tabledata[i].attachBase64.substring(personnoRel_tabledata[i].attachBase64.indexOf(',') + 1),
                        pattachmentid: personnoRel_tabledata[i].pattachmentid
                    })
                }

            }
        }


        var savesubmitdatas = {
            personid: personid, //人员ID
            moreworkflag: $(".staffChange_moreworkflag").val(), // 兼职证件专办员
            unitid: post_staffuntidid, //单位Id,
            uptype: savedatas, //提交保存的数据类型
            Deleteall: edtwkidArray, //提交删除的教育工作id数据
            Unitpersontbl: staff_Unitpersontbl,
            Unitpersoneduworktbl: staff_Unitpersoneduworktbl,
            Unitpersonphototbl: staff_Unitpersonphototbl,
            preapplypassareaList: regionArry,
            preapplypassdoorList: guardArry, //    预申请区域 
            btype: Submitbtype,
            passbeginvali: Submitpassbeginvali,
            passendvali: Submitpassendvali,
            applypassbdate: Submitapplypassbdate,
            applypassedate: Submitapplypassedate,
            applyreason: Submitapplyreason,
            Unitpersonattachmenttbl: Unitpersonattachmenttbldata 	// 人员附件数据；
        }


        var querysavePersondata = "";

        if (savedata_type == "1") {
            //		新增操作
            querysavePersondata = {
                "sessionid": sessionid,
                "funcid": "BJAirport-user.PersonManageService.savePerson",
                "data": savesubmitdatas
            }
        } else if (savedata_type == "2") {
            //			修改操作
            querysavePersondata = {
                "sessionid": sessionid,
                "funcid": "BJAirport-user.PersonManageService.updatePerson",
                "data": savesubmitdatas
            }
        }

        // console.log(querysavePersondata)
        // console.log(querysavePersondata.data.savesubmitdatas.Unitpersontbl)
        // console.log("------------------------data.UnitpersontblquerysavePersonda-------------------------")
        // console.log(querysavePersondata.data.savesubmitdatas.Unitpersonphototbl)
        // console.log("------------------------data.UnitpersontblquerysavePersonda-------------------------")
        // 判断姓名+性别+出生日期+证件种类+证件号码+部门+岗位的值不能为空，否则不能进行人员新增
        var passnostrjuage = $("#staff_passno").val();
        var birthdayjuage = $(".staff_basicInfo_bday").val();
        if ((passnostrjuage.substr(6, 8) != birthdayjuage) && $("#staff_passtype").val() == "01") {
            BootstrapDialog.show({
                type: BootstrapDialog.TYPE_WARNING,
                message: '出生日期和身份证信息不一致，是否保存？',
                title: "信息提示",
                closeByBackdrop: false, //不能通过点击其他部分关闭
                buttons: [{
                    cssClass: "btn-primary",
                    label: '是',
                    action: function (dialogItself) {
                        $.axpost("/BJAirportWeb/entrance/index.do", JSON.stringify(querysavePersondata), true, function (data) {
                            if (data.success == true) {
                                // 新增成功后将状态置反
                                staffChangeajaxpost_judge = false;
                                // 判断保存类型  修改的保存还是新增的保存
                                if (savedata_type == "1") {
                                    //   新增
                                    //给出提示是否继续新增人员 
                                    var buttonDia = BootstrapDialog.show({
                                        type: BootstrapDialog.TYPE_SUCCESS,
                                        message: '人员新增成功，是否继续新增人员！',
                                        title: "信息提示",
                                        closeByBackdrop: false, //不能通过点击其他部分关闭
                                        buttons: [{
                                            cssClass: "btn-primary",
                                            label: '是',
                                            action: function (dialogItself) {

                                                staffChange_nationalityjuage = false;
                                                dialogItself.close(); //可以认为是关闭的回调方法

                                                $("#myTabOne").children().first().addClass("active")
                                                $("#myTabOne").children().first().siblings().removeClass("active")
                                                $("#work").addClass("active").removeClass("fade");

                                                $("#educate").removeClass("active").addClass("fade")
                                                $("#satffChangePersonPath").removeClass("active").addClass("fade")
                                                $("#relation").removeClass("active").addClass("fade")

                                                //数据保存成功清空数据 继续新增
                                                $('#staffChange_fromValidatorbase_Info').data('bootstrapValidator').destroy();
                                                $('#staffChange_fromValidatorbase_Info').data('bootstrapValidator', null);
                                                $('#staffChange_fromValidator').data('bootstrapValidator').destroy();
                                                $('#staffChange_fromValidator').data('bootstrapValidator', null);
                                                // $('#staffChange_fromValidatortab_content').data('bootstrapValidator').destroy();
                                                // $('#staffChange_fromValidatortab_content').data('bootstrapValidator', null);

                                                $('#peopleRel_fromValidator').data('bootstrapValidator').destroy();
                                                $('#peopleRel_fromValidator').data('bootstrapValidator', null);
                                                peopleRel_fromValidatorfun();
                                                $('#otherpeopleRel_fromValidator').data('bootstrapValidator').destroy();
                                                $('#otherpeopleRel_fromValidator').data('bootstrapValidator', null);
                                                // 清空人员附件列表
                                                staffChange_personnoRel_tblData = [];
                                                personnoRel_tableinitfun(staffChange_personnoRel_tblData);

                                                $(".staffChangeTwo_area_div").find("input:checkbox[name='staffTwo_regionArry']").prop("checked", false);
                                                $(".staffChangeTwo_area_div").find("input:checkbox[name='staffTwo_guardArry']").prop("checked", false);
                                                // 清空预申请区域及门禁信息
                                                if (savedata_type == "1") {
                                                    //  新增
                                                    $("#staffChangTwo_political").val("");// BTYPE  //申请类别代码
                                                    $("#staffchangeTwo_passbeginvali").val(""); // PASSBEGINVALI //申请证件期限起始日
                                                    $("#staffchangeTwo_passendvali").val(""); // PASSENDVALI  //申请证件期限终止日
                                                    $("#staffTwo_applypassbdate").val("");// APPLYPASSBDATE  //现持通行证号码
                                                    $("#staffTwo_applypassedate").val(""); // APPLYPASSEDATE  //现持通行证卡号
                                                    $("#staffTwo_applyreason").val(""); // APPLYREASON  //申请事由
                                                } else if (savedata_type == "2") {
                                                    // 修改
                                                    $("#staffChangTwo_changepolitical").val("");// BTYPE  //申请类别代码
                                                    $("#staffchangeTwo_changepassbeginvali").val(""); // PASSBEGINVALI //申请证件期限起始日
                                                    $("#staffchangeTwo_changepassendvali").val(""); // PASSENDVALI  //申请证件期限终止日
                                                    $("#staffTwo_changeapplypassbdate").val(""); // APPLYPASSBDATE  //现持通行证号码
                                                    $("#staffTwo_changeapplypassedate").val(""); // APPLYPASSEDATE  //现持通行证卡号
                                                    $("#staffTwo_changeapplyreason").val(""); // APPLYREASON  //申请事由
                                                }
                                                save_Submitclear();
                                                otherpeopleRel_fromValidatorfun()


                                                staffChange_formValidatorfun();
                                                if ($("#post_manage_datatabledunitpeople") != undefined) {
                                                    $("#post_manage_datatabledunitpeople").DataTable().draw();
                                                    post_managefun.post_manageSysteminit_querypeopletablefun();
                                                }
                                                // var speed = 200;
                                                // $('body.hold-transition,html').animate({
                                                // 	scrollTop:0
                                                // },speed);
                                                // return false;
                                            }
                                        }, {
                                            label: '否',
                                            action: function (dialogItself) {
                                                dialogItself.close(); //可以认为是关闭的回调方法
                                                // 清空数据，关闭新增人员窗口
                                                // save_Submitclear();

                                                // $('#staffChange_fromValidatorbase_Info').data('bootstrapValidator').destroy();
                                                // $('#staffChange_fromValidatorbase_Info').data('bootstrapValidator', null);
                                                // $('#staffChange_fromValidator').data('bootstrapValidator').destroy();
                                                // $('#staffChange_fromValidator').data('bootstrapValidator', null);
                                                // $('#staffChange_fromValidatortab_content').data('bootstrapValidator').destroy();
                                                // $('#staffChange_fromValidatortab_content').data('bootstrapValidator', null);
                                                staffChange_nationalityjuage = false;
                                                if ($("#post_manage_datatabledunitpeople") != undefined) {
                                                    $("#post_manage_datatabledunitpeople").DataTable().draw();
                                                    post_managefun.post_manageSysteminit_querypeopletablefun();
                                                }
                                                multitabs.close($('.nav.nav-tabs').children('.active'));
                                            }
                                        }]
                                    });
                                } else if (savedata_type == "2") {
                                    // 修改
                                    BootstrapDialog.alert({
                                        type: BootstrapDialog.TYPE_SUCCESS,
                                        message: data.message,
                                    });
                                    save_Submitclear();
                                    if ($("#post_manage_datatabledunitpeople") != undefined) {
                                        $("#post_manage_datatabledunitpeople").DataTable().draw();
                                        post_managefun.post_manageSysteminit_querypeopletablefun();
                                    }
                                    multitabs.close($('.nav.nav-tabs').children('.active'));
                                }
                            } else {
                                // layer.alert(data.message + "11")
                                BootstrapDialog.alert({
                                    type: BootstrapDialog.TYPE_DANGER,
                                    message: data.message,

                                });
                            }
                        });
                        dialogItself.close(); //可以认为是关闭的回调方法;
                    }
                }, {
                    label: '否',
                    action: function (dialogItself) {
                        $(".staff_basicInfo_bday").focus();
                        dialogItself.close(); //可以认为是关闭的回调方法;
                    }
                }]
            });
        } else {
            $.axpost("/BJAirportWeb/entrance/index.do", JSON.stringify(querysavePersondata), true, function (data) {
                if (data.success == true) {
                    // 新增成功后将状态置反
                    staffChangeajaxpost_judge = false;
                    // 判断保存类型  修改的保存还是新增的保存
                    if (savedata_type == "1") {
                        //   新增
                        //给出提示是否继续新增人员 
                        var buttonDia = BootstrapDialog.show({
                            type: BootstrapDialog.TYPE_SUCCESS,
                            message: '人员新增成功，是否继续新增人员！',
                            title: "信息提示",
                            closeByBackdrop: false, //不能通过点击其他部分关闭
                            buttons: [{
                                cssClass: "btn-primary",
                                label: '是',
                                action: function (dialogItself) {

                                    staffChange_nationalityjuage = false;
                                    dialogItself.close(); //可以认为是关闭的回调方法

                                    $("#myTabOne").children().first().addClass("active")
                                    $("#myTabOne").children().first().siblings().removeClass("active")
                                    $("#work").addClass("active").removeClass("fade");

                                    $("#educate").removeClass("active").addClass("fade")
                                    $("#satffChangePersonPath").removeClass("active").addClass("fade")
                                    $("#relation").removeClass("active").addClass("fade")

                                    //数据保存成功清空数据 继续新增
                                    $('#staffChange_fromValidatorbase_Info').data('bootstrapValidator').destroy();
                                    $('#staffChange_fromValidatorbase_Info').data('bootstrapValidator', null);
                                    $('#staffChange_fromValidator').data('bootstrapValidator').destroy();
                                    $('#staffChange_fromValidator').data('bootstrapValidator', null);
                                    // $('#staffChange_fromValidatortab_content').data('bootstrapValidator').destroy();
                                    // $('#staffChange_fromValidatortab_content').data('bootstrapValidator', null);

                                    $('#peopleRel_fromValidator').data('bootstrapValidator').destroy();
                                    $('#peopleRel_fromValidator').data('bootstrapValidator', null);
                                    peopleRel_fromValidatorfun();
                                    $('#otherpeopleRel_fromValidator').data('bootstrapValidator').destroy();
                                    $('#otherpeopleRel_fromValidator').data('bootstrapValidator', null);
                                    // 清空人员附件列表
                                    staffChange_personnoRel_tblData = [];
                                    personnoRel_tableinitfun(staffChange_personnoRel_tblData);

                                    $(".staffChangeTwo_area_div").find("input:checkbox[name='staffTwo_regionArry']").prop("checked", false);
                                    $(".staffChangeTwo_area_div").find("input:checkbox[name='staffTwo_guardArry']").prop("checked", false);
                                    // 清空预申请区域及门禁信息
                                    if (savedata_type == "1") {
                                        //  新增
                                        $("#staffChangTwo_political").val("");// BTYPE  //申请类别代码
                                        $("#staffchangeTwo_passbeginvali").val(""); // PASSBEGINVALI //申请证件期限起始日
                                        $("#staffchangeTwo_passendvali").val(""); // PASSENDVALI  //申请证件期限终止日
                                        $("#staffTwo_applypassbdate").val("");// APPLYPASSBDATE  //现持通行证号码
                                        $("#staffTwo_applypassedate").val(""); // APPLYPASSEDATE  //现持通行证卡号
                                        $("#staffTwo_applyreason").val(""); // APPLYREASON  //申请事由
                                    } else if (savedata_type == "2") {
                                        // 修改
                                        $("#staffChangTwo_changepolitical").val("");// BTYPE  //申请类别代码
                                        $("#staffchangeTwo_changepassbeginvali").val(""); // PASSBEGINVALI //申请证件期限起始日
                                        $("#staffchangeTwo_changepassendvali").val(""); // PASSENDVALI  //申请证件期限终止日
                                        $("#staffTwo_changeapplypassbdate").val(""); // APPLYPASSBDATE  //现持通行证号码
                                        $("#staffTwo_changeapplypassedate").val(""); // APPLYPASSEDATE  //现持通行证卡号
                                        $("#staffTwo_changeapplyreason").val(""); // APPLYREASON  //申请事由
                                    }
                                    save_Submitclear();
                                    otherpeopleRel_fromValidatorfun()


                                    staffChange_formValidatorfun();
                                    if ($("#post_manage_datatabledunitpeople") != undefined) {
                                        $("#post_manage_datatabledunitpeople").DataTable().draw();
                                        post_managefun.post_manageSysteminit_querypeopletablefun();
                                    }
                                    // var speed = 200;
                                    // $('body.hold-transition,html').animate({
                                    // 	scrollTop:0
                                    // },speed);
                                    // return false;
                                }
                            }, {
                                label: '否',
                                action: function (dialogItself) {
                                    dialogItself.close(); //可以认为是关闭的回调方法
                                    // 清空数据，关闭新增人员窗口
                                    // save_Submitclear();

                                    // $('#staffChange_fromValidatorbase_Info').data('bootstrapValidator').destroy();
                                    // $('#staffChange_fromValidatorbase_Info').data('bootstrapValidator', null);
                                    // $('#staffChange_fromValidator').data('bootstrapValidator').destroy();
                                    // $('#staffChange_fromValidator').data('bootstrapValidator', null);
                                    // $('#staffChange_fromValidatortab_content').data('bootstrapValidator').destroy();
                                    // $('#staffChange_fromValidatortab_content').data('bootstrapValidator', null);
                                    staffChange_nationalityjuage = false;
                                    if ($("#post_manage_datatabledunitpeople") != undefined) {
                                        $("#post_manage_datatabledunitpeople").DataTable().draw();
                                        post_managefun.post_manageSysteminit_querypeopletablefun();
                                    }
                                    multitabs.close($('.nav.nav-tabs').children('.active'));
                                }
                            }]
                        });
                    } else if (savedata_type == "2") {
                        // 修改
                        BootstrapDialog.alert({
                            type: BootstrapDialog.TYPE_SUCCESS,
                            message: data.message,
                        });
                        save_Submitclear();
                        if ($("#post_manage_datatabledunitpeople") != undefined) {
                            $("#post_manage_datatabledunitpeople").DataTable().draw();
                            post_managefun.post_manageSysteminit_querypeopletablefun();
                        }
                        multitabs.close($('.nav.nav-tabs').children('.active'));
                    }
                } else {
                    // layer.alert(data.message + "11")
                    BootstrapDialog.alert({
                        type: BootstrapDialog.TYPE_DANGER,
                        message: data.message,

                    });
                }
            });

        }

    }

}


// $("#csbtn").on("click",function(){

// })


// photoid1=""  反面,photoid2="" 正面,photoid3="" 制证相片;
var photoid1 = "",
    photoid2 = "",
    photoid3 = "";
//---------------------人员信息修改回填-----------------		

var countrytextjuddage = "",
    countryidjuddage = "",
    nativeplacetextjuddage = "",
    nativeplaceidjuddage = "",
    staffChangeTwoControlArea = [],
    staffChangeTwoStopArea = [];


function staffpersoniddatafun() {
    //给照片添加属性来判断是否有修改照片信息
    $("#IDImg").attr("data-idImgchange", "0");
    $("#MyIDfaceImg").attr("data-idImgchange", "0");
    $("#MyIDSideImg").attr("data-idImgchange", "0");


    var post_staffpersoniddata = {
        personid: post_staffpersonid
    }

    var taffpersoniddatas = {
        "sessionid": sessionid,
        "funcid": "BJAirport-unit.PersonManageService.queryPersonByid",
        "data": post_staffpersoniddata
    }
    // console.log(taffpersoniddatas);



    $("#staffChange_upload").removeClass("none").addClass("block");
    // debugger;
    $.axpost("/BJAirportWeb/entrance/index.do", JSON.stringify(taffpersoniddatas), false, function (data) {
        // 开启动画
        if (data.success == true) {

            // layer.alert(data.message+"12");
            // sessionStorage.removeItem('new_postmodulurl');
            // console.log(data)

            //渲染关系人列表 ，将关系人类表设置为可选$("#peopleRelation").removeAttr("disabled");
            // relationpeopletable();
            $("#peopleRelation").removeAttr("disabled");
            var returnpersondataarr = "";
            if ('object' == typeof data.data) {
                returnpersondataarr = data.data;
            } else {
                returnpersondataarr = $.parseJSON(data.data);
            }

            staffChangeTwoControlArea = [],
                staffChangeTwoStopArea = [];

            console.log(returnpersondataarr)
            // console.log(returnpersondataarr.attachmentList)
            staffChange_personnoRel_tblData = returnpersondataarr.attachmentList;
            //   人员附件信息表
            personnoRel_tableinitfun(staffChange_personnoRel_tblData);
            var staffChangeTwoControlAreas = returnpersondataarr.preapplypassareaList
            for (var z = 0; z < staffChangeTwoControlAreas.length; z++) {
                staffChangeTwoControlArea.push(staffChangeTwoControlAreas[z].AREASUBINFO)
            }
            // console.log(staffChangeTwoStopArea)
            staffchangetwoChange.getChangeControlAreafun(staffChangeTwoControlArea);
            //    门禁信息
            var staffChangeTwoStopAreas = returnpersondataarr.preapplypassdoorList
            for (var y = 0; y < staffChangeTwoStopAreas.length; y++) {
                staffChangeTwoStopArea.push(staffChangeTwoStopAreas[y].DOORSUBINFO)
            }
            staffchangetwoChange.getChangeStopAreafun(staffChangeTwoStopArea);
            //回填证件预申请信息
            var staffChangeTwo_preapplyInfo = returnpersondataarr.preapply;

            var staffChangeTwo_preapplybtypeInfo = staffChangeTwo_preapplyInfo.BTYPE;
            staffchangetwoChange.staffTwo_changecodefun(staffChangeTwo_preapplybtypeInfo);

            $("#staffchangeTwo_changepassbeginvali").val(staffChangeTwo_preapplyInfo.PASSBEGINVALI); //申请证件起始
            $("#staffchangeTwo_changepassendvali").val(staffChangeTwo_preapplyInfo.PASSENDVALI); //申请证件终止；
            $("#staffTwo_changeapplypassbdate").val(staffChangeTwo_preapplyInfo.APPLYPASSBDATE); //现持通行证号码
            $("#staffTwo_changeapplypassedate").val(staffChangeTwo_preapplyInfo.APPLYPASSEDATE); //现持通行证卡号；
            $("#staffTwo_changeapplyreason").val(staffChangeTwo_preapplyInfo.APPLYREASON); //申请事由
            //               部门岗位信息数据
            var depdataarr = returnpersondataarr.deplist[0];
            // console.log("------------部门岗位信息数据---------")
            // console.log(depdataarr)
            // console.log("------------部门岗位信息数据---------")


            // console.log("------------照片信息数据---------")
            // console.log(returnpersondataarr.photolist)
            // console.log("------------照片信息数据---------")
            //				 人员信息数据
            var persiondataarr = returnpersondataarr.list[0];
            // console.log("------------人员信息数据---------")
            // console.log(persiondataarr)
            // console.log("------------人员信息数据---------")
            // console.log(depdataarr.stationid);
            // console.log(depdataarr.stationname);

            //				出生日期

            staffChange_createdate = persiondataarr.createdate //创建时间
            //              何时加入党派时间

            $(".staff_basicInfo_cnx").val(persiondataarr.chnsurname); //中文姓
            $(".staff_basicInfo_cnm").val(persiondataarr.chngivename); //中文名
            $(".staff_basicInfo_enx").val(persiondataarr.ensurname); //英文姓
            $(".staff_basicInfo_enm").val(persiondataarr.engivename); //英文名
            $(".staff_aliasnameinfo").val(persiondataarr.aliasname); //曾用名

            // $("#staff_basicInfo_sex").val(persiondataarr.sex); //性别代码
            staff_code("staff_basicInfo_sex", persiondataarr.sex);


            // $("#staff_basicInfo_sex option:selected").text(persiondataarr.csex); //性别名称
            $(".staff_basicInfo_bday").val(persiondataarr.birthday) //出生日期
            // $("#staff_passtype").val(persiondataarr.passtype); //证件类型代码

            staff_code("staff_passtype", persiondataarr.passtype);



            $("#staff_passno").val(persiondataarr.passno); //证件号码
            // $("#nation").val(persiondataarr.nation).trigger("change"); //民族代码
            // $("#nation option:selected").text(persiondataarr.cnation).trigger("change"); //民族名称
            stafff_ChangeNationfun(persiondataarr.nation);


            // $("#nationality").val(persiondataarr.country).trigger("change"); //国籍代码
            // $("#nationality option:selected").text(persiondataarr.ccountry).trigger("change"); //国籍名称

            countryidjuddage = persiondataarr.country;
            countrytextjuddage = persiondataarr.ccountry;
            // console.log("countryidjuddagcountryidjuddagecountryidjuddagecountryidjuddagecountryidjuddagee"+countryidjuddage)
            // console.log(countryidjuddage == null)
            if (countryidjuddage == "" || countryidjuddage == undefined || countryidjuddage == null) {
                // alert("4")
                baseselec2fun("CHN", "中国");
            } else {
                baseselec2fun(countryidjuddage, countrytextjuddage);
            }
            // $("#select2-nationality-container").text(countrytextjuddage);


            nativeplaceidjuddage = persiondataarr.nativeplace;
            nativeplacetextjuddage = persiondataarr.cnativeplace;
            console.log("+++++++++++++++++++++++++++++++++")
            console.log(nativeplaceidjuddage)
            console.log(nativeplacetextjuddage)
            if (nativeplaceidjuddage == "" || nativeplaceidjuddage == undefined || nativeplaceidjuddage == null) {
                staff_changenativeplacefun("", "");
            } else {
                staff_changenativeplacefun(persiondataarr.nativeplace, persiondataarr.cnativeplace);
                $("#staff_nativeplace").val(persiondataarr.nativeplace).trigger("change"); //籍贯代码
                $("#staff_nativeplace option:selected").text(persiondataarr.cnativeplace).trigger("change"); //籍贯中文
            }

            // $("#select2-staff_nativeplace-container").text(nativeplacetextjuddage);

            $("#staff_email").val(persiondataarr.pemail);
            // $("#staff_culture").val(persiondataarr.educational); //文化程度代码
            // $("#staff_culture option:selected").text(persiondataarr.ceducational); //文化程度中文
            staff_code("staff_culture", persiondataarr.educational);

            // $("#staff_political").val(persiondataarr.political); //政治面貌代码
            // $("#staff_political option:selected").text(persiondataarr.cpolitical); //政治面貌中文
            staff_code("staff_political", persiondataarr.political);


            // 判断政治面貌  如果为其它则没有加入时间
            var staff_political = persiondataarr.political;

            $("#joinTime").val(persiondataarr.politicaldate); //何时加入该党派
            // $("#staff_marital").val(persiondataarr.marriage); //婚姻状况代码
            // $("#staff_marital option:selected").text(persiondataarr.cmarriage); //婚姻状况中文
            staff_code("staff_marital", persiondataarr.marriage);

            // $("#staff_health").val(persiondataarr.spirit); //精神健康代码
            // $("#staff_health option:selected").text(persiondataarr.cspirit); //精神健康中文
            staff_code("staff_health", persiondataarr.spirit);


            $(".religion").val(persiondataarr.religion); //宗教信仰情况
            $(".crime").val(persiondataarr.crime); //违反犯罪情况
            $(".organinfo").val(persiondataarr.organinfo); //参加何种组织情况

            // 单位基本信息
            $("#staff_untidname").val(depdataarr.unitname) //回填单位名称
            var csdepdataarrdepid = depdataarr.depid;
            var csdepdataarrdepname = depdataarr.depname;
            var csdepdataarrstationid = depdataarr.stationid;
            var csdepdataarrstationname = depdataarr.stationname;

            staff_postNameid = csdepdataarrstationid;
            staff_depNameSelect(csdepdataarrdepid, csdepdataarrdepname);
            staff_depNameselect2(csdepdataarrdepid, csdepdataarrstationid, csdepdataarrstationname);

            $("#staff_unitinfopost").val(persiondataarr.cpost); // 职务中文cpost
            staffChange_worktask = persiondataarr.worktask;
            $(".staffChange_worktask").val(persiondataarr.worktask); //工作职责
            //             入司时间
            $(".staffChange_workunitdate").val(persiondataarr.workunitdate)
            // }
            //    入岗时间
            // var workstationdate = persiondataarr.workstationdate;
            // if (workstationdate != "" && workstationdate != null) {
            // var workstationdates = insertStr(workstationdate, 4, "-");
            // var workstationdatey_m_d = insertStr(workstationdates, 7, "-"); 
            $(".staffChange_workstationdate").val(persiondataarr.workstationdate)
            // }


            // 工作年限开始时间
            // var staffChange_workbdata = persiondataarr.workbdate;
            // if (staffChange_workbdata != "" && staffChange_workbdata != null) {
            // var staffChange_workbdatas = insertStr(staffChange_workbdata, 4, "-");
            // var staffChange_workbdatay_m_d = insertStr(staffChange_workbdatas, 7, "-"); 
            $(".staffChange_workbdata").val(persiondataarr.workbdate);
            // staffChange_workcountfun();
            // $(".staffChange_workcount").val(persiondataarr.workcount); // 工作年限 workcount
            // }

            // 工作年限结束时间
            // var staffChange_workedata = persiondataarr.workedate;
            // if (staffChange_workedata != "" && staffChange_workedata != null) {
            // var staffChange_workedatas = insertStr(staffChange_workedata, 4, "-");
            // var staffChange_workedatay_m_d = insertStr(staffChange_workedatas, 7, "-"); 
            // $(".staffChange_workedata").val(persiondataarr.workedate)
            // }
            // $("#staff_laborTime").val(persiondataarr.employmenttime); //用工时限名称代码EMPLOYMENTTIME
            // $("#staff_laborTime option:selected").text(persiondataarr.cemploymenttime); //用工时限名称中文CEMPLOYMENTTIME
            staff_code("staff_laborTime", persiondataarr.employmenttime);

            $(".staff_datestartinfo").val(persiondataarr.employmenttimebdate); //用工时限开始时间
            if (persiondataarr.employmenttype == "02") {
                $(".staff_dateendtinfo").val("无固定期");
                $(".staff_dateendtinfo").attr("disabled", true)
            } else {
                $(".staff_dateendtinfo").val(persiondataarr.employmenttimeedate); //用工时限结束时间
            }


            // $("#staff_employmenttype").val(persiondataarr.employmenttype); // 用工性质代码
            staff_code("staff_employmenttype", persiondataarr.employmenttype); //用工性质
            // $("#staff_employmenttype option:selected").text(persiondataarr.cemploymenttype); //用工性质中文



            // $("#staff_accomby").val(persiondataarr.accompanyflag); //是否陪同人员代码
            // $("#staff_accomby option:selected").text(persiondataarr.caccompanyflag); //是否陪同人员中文
            staff_code("staff_accomby", persiondataarr.accompanyflag);

            staff_code("staff_soldierflag", persiondataarr.soldierflag);


            $(".staffChange_moreworkflag").val(persiondataarr.moreworkflag); // 是否成为兼职专办员 moreworkflag
            // $(".staffChange_moreworkflag option:selected").text(persiondataarr.moreworkflag); //是否成为兼职专办员中文

            $("#textarea").val(persiondataarr.myownaccount); //本人自述
            $(".othersituation").val(persiondataarr.othersituation); //其它需要说明的情况
            $("#staff_telephonenumb").val(persiondataarr.telephone); //手机号码
            $("#staff_officetelephone").val(persiondataarr.callno); //联系电话
            $("#staffChange_personno").val(persiondataarr.personno),//人员编码
                $(".registere").val(persiondataarr.registere); //户籍所在地
            $(".address").val(persiondataarr.address); //现居住地址



            $(".workplace").val(persiondataarr.workplace); //工作场所
            $("#staffChange_faxnumber").val(persiondataarr.faxnumber), //传真号
                $(".reality").val(persiondataarr.reality); //现实表现
            $(".otherpr").val(persiondataarr.otherpr); //其它问题
            $(".firstwkdate").val(persiondataarr.firstwkdate); //首次参加工作时间

            //			    图片信息的回填  获取 照片对应的id//				 人员图片信息数据
            for (var i = 0; i < returnpersondataarr.photolist.length; i++) {
                if (returnpersondataarr.photolist[i].cphototype == "身份证反面") {
                    //src='data:image/png;base64,bsae64Str'
                    var MyIDSideImggurl_base = returnpersondataarr.photolist[i].photo
                    $("#MyIDSideImg").attr("src", "data:image/png;base64," + MyIDSideImggurl_base)
                    photoid1 = returnpersondataarr.photolist[i].photoid
                } else if (returnpersondataarr.photolist[i].cphototype == "身份证正面") {
                    var MyIDfaceImgurl_base = returnpersondataarr.photolist[i].photo
                    $("#MyIDfaceImg").attr("src", "data:image/png;base64," + MyIDfaceImgurl_base)
                    photoid2 = returnpersondataarr.photolist[i].photoid
                } else if (returnpersondataarr.photolist[i].cphototype == "制证相片") {
                    var IDImgurl_base = returnpersondataarr.photolist[i].photo
                    $("#IDImg").attr("src", "data:image/png;base64," + IDImgurl_base)
                    photoid3 = returnpersondataarr.photolist[i].photoid
                }
            }
            //          教育信息

            eduArray = returnpersondataarr.edulist;
            // console.log(eduArray)
            // console.log(eduArray.length)
            var newEduArray = new Array();
            for (var i = 0; i < eduArray.length; i++) {
                newEduArray.push({
                    placename: eduArray[i].placename,
                    ewbegindate: eduArray[i].ewbegindate,
                    ewenddate: eduArray[i].ewenddate,
                    cpost: eduArray[i].cpost,
                    authenticator: eduArray[i].authenticator,
                    authenticatortel: eduArray[i].authenticatortel,
                    edtwkid: eduArray[i].edtwkid,
                    createdate: eduArray[i].createdate
                });
            }
            eduArray = newEduArray;
            staffChange_educateDataTabl(eduArray);
            //          工作经历
            workArray = returnpersondataarr.worklist;
            var newWorkArray = new Array();
            for (var i = 0; i < workArray.length; i++) {
                newWorkArray.push({
                    placename: workArray[i].placename,
                    ewbegindate: workArray[i].ewbegindate,
                    ewenddate: workArray[i].ewenddate,
                    cpost: workArray[i].cpost,
                    authenticator: workArray[i].authenticator,
                    authenticatortel: workArray[i].authenticatortel,
                    edtwkid: workArray[i].edtwkid,
                    createdate: workArray[i].createdate
                });
            }

            workArray = newWorkArray;
            staffChange_WorkDataTabl(workArray);
            // //  无犯罪记录
            // $("#satffChangePersonPath_path").val(persiondataarr.attachfilepath);
            // $("#satffChangeView_PersonPath_path").val(persiondataarr.attachfilepath);
            // $("#satffChangePersonPath_btn_fileName").val(persiondataarr.attachfilename);

            $("#staffChange_upload").removeClass("block").addClass("none");
        } else {
            // 人员已在审核流程中，无法修改信息！
            if (data.result == "1001") {
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_WARNING,
                    message: data.message,
                    title: "信息提示",
                    closeByBackdrop: false, //不能通过点击其他部分关闭
                    buttons: [{
                        // cssClass: "btn-primary",
                        label: '确定',
                        action: function (dialogItself) {
                            dialogItself.close(); //可以认为是关闭的回调方法
                            multitabs.close($('.nav.nav-tabs').children('.active'));
                            $("#staffChange_upload").removeClass("block").addClass("none");
                        }
                    }]
                });
            } else {
                BootstrapDialog.alert({
                    type: BootstrapDialog.TYPE_DANGER,
                    message: data.message,
                });
                $("#staffChange_upload").removeClass("block").addClass("none");
            }


        }

        // 关闭动画



    })


    // $.ajax({
    // 	type: "post",
    // 	url: "/BJAirportWeb/entrance/index.do",
    // 	dataType: 'json',
    // 	data: JSON.stringify(taffpersoniddatas),
    // 	success: function (data) {

    // 	},
    // 	error: function (XMLHttpRequest, textStatus, errorThrown) {
    // 		layer.alert('访问网络失败！' + XMLHttpRequest.responseJSON.error);
    // 	}
    // })

}

//---------------------------单位人员提交修改的回填信息--------------------

function save_changesubmit_Drafts(e) {

    // bootstrapValidator_DateFun();
    // console.log(bootstrapValidator_DateFun)
    if (!bootstrapValidator_DateFun()) {
        return;
    }

    staffChange_formValidatorfun();

    if (!staffChange_formValidatorinitfun()) {
        BootstrapDialog.show({
            type: BootstrapDialog.TYPE_WARNING,
            message: '您还有信息项未填写或填写错误，请核实！',
            title: "信息提示",
            closeByBackdrop: false, //不能通过点击其他部分关闭
            buttons: [{
                label: '确定',
                action: function (dialogItself) {
                    dialogItself.close(); //可以认为是关闭的回调方法
                    //数据保存成功清空数据 继续新增
                    // $("#upImg").focus();
                    var judgebase1 = $('#staffChange_fromValidatorbase_Info').data('bootstrapValidator').isValid();
                    var judgebase2 = $('#staffChange_fromValidator').data('bootstrapValidator').isValid();
                    // var judgebase3 = $('#staffChange_fromValidatortab_content').data('bootstrapValidator').isValid();
                    if (!judgebase1) {
                        $('#staffChange_fromValidatorbase_Info').data('bootstrapValidator').validate();
                        var InvalidFieldbasedatas = $('#staffChange_fromValidatorbase_Info').data('bootstrapValidator').getInvalidFields()

                        $("#" + InvalidFieldbasedatas[0].id).focus();
                        return;
                    } else if (!judgebase2) {
                        $('#staffChange_fromValidator').data('bootstrapValidator').validate();
                        var InvalidFielddatas = $('#staffChange_fromValidator').data('bootstrapValidator').getInvalidFields()

                        $("#" + InvalidFielddatas[0].id).focus();
                        return;
                    }
                    // else if(!judgebase3){
                    // 	$('#staffChange_fromValidatortab_content').data('bootstrapValidator').validate();
                    // 	var InvalidFieldtabdatas = $('#staffChange_fromValidatortab_content').data('bootstrapValidator').getInvalidFields()

                    // 	$("#"+InvalidFieldtabdatas[0].id).focus();
                    // 	return;
                    // }

                }
            }]
        });
        return;
    }
    var uptype = "";
    // 判断修改类型 如果是有效 修改  type = 2 ；如果是草稿修改的保存草稿 type = 1； 如果是草稿的提交申请  type  =  3 ；
    if (post_staffpersonvalidflag == "1") {
        // type = 2
        uptype = "2"

    } else if (post_staffpersonvalidflag == "9") {
        // type  =  3 
        uptype = "2"
    }

    //获取自定义属性判断图片是否有更改过	

    var idImgval = $("#IDImg").attr("data-idimgchange");
    var MyIDfaceImgval = $("#MyIDfaceImg").attr("data-idimgchange");
    var MyIDSideImgval = $("#MyIDSideImg").attr("data-idimgchange");


    // console.log($("#staff_untidname").val());
    var staff_basicInfochang_cnx = $(".staff_basicInfo_cnx").val()
    var staff_basicInfochang_cnm = $(".staff_basicInfo_cnm").val()
    var staff_basicInfochangname_cn = staff_basicInfochang_cnx + staff_basicInfochang_cnm
    // console.log(staff_basicInfochang_cnx)
    // console.log(staff_basicInfochang_cnm)
    // console.log(staff_basicInfochangname_cn)
    var staff_basicInfochang_enx = $(".staff_basicInfo_enx").val()
    var staff_basicInfochang_enm = $(".staff_basicInfo_enm").val()
    var staff_basicInfochangname_en = staff_basicInfochang_enx + staff_basicInfochang_enm
    // console.log(staff_basicInfochang_enx)
    // console.log(staff_basicInfochang_enm)
    // console.log(staff_basicInfochangname_en)

    var staff_Unitpersonphototbl = [];


    var nativeplacetextjuddages = "",
        nativeplaceidjuddages = "",
        countrytextjuddages = "",
        countryidjuddages = "";
    // console.log($("#nationality option:selected").text())
    if ($("#nationality option:selected").text() == "请选择国籍") {
        countrytextjuddages = "";
        countryidjuddages = "";
    } else if ($("#nationality option:selected").text() == null || $("#nationality option:selected").text() == "") {

        countrytextjuddages = countrytextjuddage;
        countryidjuddages = countryidjuddage
    } else {

        countrytextjuddages = $("#nationality option:selected").text();
        countryidjuddages = $("#nationality").val();
    }
    if ($("#staff_nativeplace option:selected").text() == "请选择籍贯") {

        nativeplacetextjuddages = "";
        nativeplaceidjuddages = "";
    } else if ($("#staff_nativeplace option:selected").text() == null || $("#staff_nativeplace option:selected").text() == "") {

        nativeplacetextjuddages = nativeplacetextjuddage;
        nativeplaceidjuddages = nativeplaceidjuddage;
    } else {

        nativeplacetextjuddages = $("#staff_nativeplace option:selected").text();
        nativeplaceidjuddages = $("#staff_nativeplace").val();
    }

    //	单位人员信息表
    var staff_Unitpersontbl = {
        personid: personid, //人员id
        unitid: post_staffuntidid, //单位id
        fullname: $("#staff_untidname").val(), //单位全称
        // 基本信息：
        chnsurname: $(".staff_basicInfo_cnx").val().replace(/\-/g, '').trim(), //中文姓
        chngivename: $(".staff_basicInfo_cnm").val().replace(/\-/g, '').trim(), //中文名
        chnname: staff_basicInfochangname_cn, //中文姓名
        ensurname: $(".staff_basicInfo_enx").val().replace(/\-/g, '').trim(), //英文姓
        engivename: $(".staff_basicInfo_enm").val().replace(/\-/g, '').trim(), //英文名
        enname: staff_basicInfochangname_en, //英文姓名
        aliasname: $(".staff_aliasnameinfo").val(), //曾用名
        nation: $("#nation").val(), //民族代码
        cnation: $("#nation option:selected").text() == "请选择民族" ? "" : $("#nation option:selected").text(), //民族名称
        sex: $("#staff_basicInfo_sex").val(), //性别代码
        csex: $("#staff_basicInfo_sex option:selected").text(), //性别名称
        birthday: $(".staff_basicInfo_bday").val().replace(/\-/g, '').trim(), //出生日期
        passtype: $("#staff_passtype").val(), //证件类型代码
        cpasstype: $("#staff_passtype option:selected").text() == "请选择证件类型" ? "" : $("#staff_passtype option:selected").text(), //证件类型中文
        passno: $("#staff_passno").val(), //证件号码
        country: countryidjuddages, //国籍代码
        ccountry: countrytextjuddages, //国籍名称
        nativeplace: nativeplaceidjuddages, //籍贯代码
        cnativeplace: nativeplacetextjuddages, //籍贯中文
        educational: $("#staff_culture").val(), //文化程度代码
        ceducational: $("#staff_culture option:selected").text() == "请选择文化程度" ? "" : $("#staff_culture option:selected").text(), //文化程度中文
        marriage: $("#staff_marital").val(), //婚姻状况代码
        cmarriage: $("#staff_marital option:selected").text() == "请选择婚姻状况" ? "" : $("#staff_marital option:selected").text(), //婚姻状况中文
        political: $("#staff_political").val(), //政治面貌代码
        cpolitical: $("#staff_political option:selected").text() == "请选择政治面貌" ? "" : $("#staff_political option:selected").text(), //政治面貌中文
        politicaldate: $("#joinTime").val().replace(/\-/g, '').trim(), //何时加入该党派
        spirit: $("#staff_health").val(), //精神健康代码
        cspirit: $("#staff_health option:selected").text() == "请选择健康状况" ? "" : $("#staff_health option:selected").text(), //精神健康中文
        telephone: $("#staff_telephonenumb").val().replace(/\-/g, '').trim(), //手机号码
        callno: $("#staff_officetelephone").val().trim(), //联系电话/办公电话
        personno: $("#staffChange_personno").val().trim(),//人员编码
        pemail: $("#staff_email").val(), //电子邮箱
        religion: $(".religion").val(), //宗教信仰情况
        registere: $(".registere").val(), //户籍所在地
        address: $(".address").val(), //现居住地址
        crime: $(".crime").val(), //违反犯罪情况
        organinfo: $(".organinfo").val(), //参加何种组织情况
        othersituation: $(".othersituation").val(), //其它需要说明问题
        // 人员单位信息：
        // shortname: "", //单位简称 
        depid: $("#staff_depName").val(), //部门id
        depname: $("#staff_depName option:selected").text(), //部门名称
        stationid: $("#staff_postName").val(), //岗位id
        stationname: $("#staff_postName option:selected").text(), //岗位名称		
        // post: $("#staff_unitinfopost").val(), //职务代码
        // cpost: $("#staff_unitinfopost option:selected").text(), //职务中文
        post: "", //职务代码
        cpost: $("#staff_unitinfopost").val(), //职务中文
        worktask: $(".staffChange_worktask").val(), //工作职责
        workunitdate: $(".staffChange_workunitdate").val().replace(/\-/g, '').trim(), //入司时间
        workstationdate: $(".staffChange_workstationdate").val().replace(/\-/g, '').trim(), //本次入岗时间
        otherpr: $(".otherpr").val(),
        employmenttime: $("#staff_laborTime").val(), //用工时限名称代码
        cemploymenttime: $("#staff_laborTime option:selected").text() == "请选择用工时限名称" ? "" : $("#staff_laborTime option:selected").text(), //用工时限名称中文
        employmenttimebdate: $(".staff_datestartinfo").val().replace(/\-/g, '').trim(), //用工时限开始时间
        employmenttimeedate: $(".staff_dateendtinfo").val().replace(/\-/g, '').trim(), //用工时限结束时间
        employmenttype: $("#staff_employmenttype").val(), // 用工性质
        cemploymenttype: $("#staff_employmenttype option:selected").text() == "请选择用工性质" ? "" : $("#staff_employmenttype option:selected").text(), //用工性质中文CEMPLOYMENTTYPE
        accompanyflag: $("#staff_accomby").val(), //是否陪同人员
        caccompanyflag: $("#staff_accomby option:selected").text() == "是否具备陪同资格" ? "" : $("#staff_accomby option:selected").text(), ////是否陪同人员中文
        soldierflag: $("#staff_soldierflag").val(), //是否转业军人
        csoldierflag: $("#staff_soldierflag option:selected").text() == "是否转业军人" ? "" : $("#staff_soldierflag option:selected").text(), //是否转业军人中文
        firstwkdate: $(".firstwkdate").val().replace(/\-/g, '').trim(), //首次参加工作时间
        workbdate: $(".staffChange_workbdata").val().replace(/\-/g, '').trim(), // 工作年限开始时间
        // workedate: $(".staffChange_workedata").val().replace(/\-/g, '').trim(), // 工作年限结束时间
        // workcount: $(".staffChange_workcount").val().replace(/\-/g, '').trim(), // 工作年限
        moreworkflag: $(".staffChange_moreworkflag").val(), // 是否成为兼职专办员  1 是  0否 
        myownaccount: $("#textarea").val(), //本人自述
        workplace: $(".workplace").val(), //主要工作场所
        faxnumber: $("#staffChange_faxnumber").val(), //传真号码
        reality: $(".reality").val(), //现实表现
        otherpr: $(".otherpr").val(), //其它问题
        createdate: staffChange_createdate, //创建时间
        personvalidflag: post_staffpersonvalidflag, // 判断状态
        cbgstate: post_staffcbgstate, // 背调状态中文
        bgstate: post_staffbgstate // 背调状态代码
    };
    //	单位人员教育工作经历表
    var staff_Unitpersoneduworktbl = new Array();
    var schooltrnumjson;
    var schooltrnumlength = eduArray.length;
    for (var i = 0; i < schooltrnumlength; i++) {
        eduArray[i].personid = personid;
        eduArray[i].ewtype = "1";
        eduArray[i].post = "";
        eduArray[i].cewtype = "教育经历";
    }
    for (var i = 0; i < eduArray.length; i++) {
        staff_Unitpersoneduworktbl.push(eduArray[i]);
    }
    var Workrnumlength = workArray.length
    for (var i = 0; i < Workrnumlength; i++) {

        workArray[i].personid = personid;
        workArray[i].ewtype = "2";
        workArray[i].post = "";
        workArray[i].cewtype = "工作经历";

    }
    for (var i = 0; i < workArray.length; i++) {
        staff_Unitpersoneduworktbl.push(workArray[i]);
    }
    // console.log(staff_Unitpersoneduworktbl)


    //人员大头像

    var IDImgurl = $("#IDImg").attr("src")
    IDImgurl = IDImgurl.substring(IDImgurl.length - 3, IDImgurl.length);
    var IDImg = "";
    if (IDImgurl == "jpg" || IDImgurl == "img" || IDImgurl == "png") {
        IDImg = "";
    } else {
        IDImg = $("#IDImg").attr("src");
    }
    //人员正面照片	
    var MyIDfaceImg = "";
    if ($("#MyIDfacefile").val == "") {
        MyIDfaceImg = "";
    } else {
        MyIDfaceImg = $("#MyIDfaceImg").attr("src");
    }
    //人员反面照片
    var MyIDSideImg = "";
    if ($("#MyIDsideFile").val == "") {
        MyIDSideImg = "";
    } else {
        MyIDSideImg = $("#MyIDSideImg").attr("src");
    }


    //    人员照片表
    staff_Unitpersonphototbl = [
        //		制证相片PRPHOTO
        {
            phototype: "1",
            cphototype: "制证相片",
            photobase: IDImg,
            imgchange: idImgval,
            photoid: photoid3
        },

        //		 身份证正面
        {
            phototype: "3",
            cphototype: "身份证正面",
            photobase: MyIDfaceImg,
            imgchange: MyIDfaceImgval,
            photoid: photoid2
        },
        //		 身份证反面
        {
            phototype: "4",
            cphototype: "身份证反面",
            photobase: MyIDSideImg,
            imgchange: MyIDSideImgval,
            photoid: photoid1

        }
    ]

    //判断照片是否上传------------------------start
    // for (var i = 0; i < staff_Unitpersonphototbl.length; i++) {
    // 	var urlarr = staff_Unitpersonphototbl[i].photobase + "";
    // 	urlarr = urlarr.substring(urlarr.length - 3, urlarr.length);
    // 	console.log(urlarr);
    // 	if (urlarr == "jpg" || urlarr == "img" || urlarr == "png" || urlarr == "") {
    // 		if (updataimgdata.length == 1) {
    // 			updataimgdata = new Array();
    // 			break;
    // 		} else {
    // 			updataimgdata.splice(i, 1);
    // 			i = i - 1;
    // 		}
    // 	}
    // }
    for (var i = 0; i < staff_Unitpersonphototbl.length; i++) {
        var urlarr = staff_Unitpersonphototbl[i].photobase + "";
        urlarr = urlarr.substring(urlarr.length - 3, urlarr.length);
        // console.log(urlarr);
        if (urlarr == "jpg" || urlarr == "img" || urlarr == "png" || urlarr == "") {
            // console.log(staff_Unitpersonphototbl)

            if (staff_Unitpersonphototbl.length == 1) {
                staff_Unitpersonphototbl = new Array();
                break;
            } else {
                staff_Unitpersonphototbl.splice(i, 1);
                i = i - 1;
            }
            BootstrapDialog.show({
                type: BootstrapDialog.TYPE_WARNING,
                message: '相片信息,以及身份证正反照不能为空！',
                title: "信息提示",
                closeByBackdrop: false, //不能通过点击其他部分关闭
                buttons: [{
                    label: '确定',
                    action: function (dialogItself) {
                        dialogItself.close(); //可以认为是关闭的回调方法
                        //数据保存成功清空数据 继续新增
                        $("#upImg").focus();
                    }
                }]
            });
            return;
        }

    }
    // if (staff_Unitpersoneduworktbl.length > 0) {

    // } else {
    //     BootstrapDialog.show({
    //         type: BootstrapDialog.TYPE_WARNING,
    //         message: '人员信息保存，工作经历不能为空，请填写工作经历信息！',
    //         title: "信息提示",
    //         closeByBackdrop: false, //不能通过点击其他部分关闭
    //         buttons: [{
    //             label: '确定',
    //             action: function (dialogItself) {
    //                 dialogItself.close(); //可以认为是关闭的回调方法
    //             }
    //         }]
    //     });
    //     return;
    // }
    //   预申请区域

    var regionArrySubmit = [];

    var regionArrySubmitAllcheckbox = $(".staffChangeTwo_area_div").find("input:checkbox[name='staffTwo_regionArry']:checked");
    // console.log(regionArrySubmitAllcheckbox)
    for (var k = 0; k < regionArrySubmitAllcheckbox.length; k++) {
        var regionobjectSubmit = {};
        var regionArrySubmitcode = regionArrySubmitAllcheckbox[k].getAttribute("data-code");
        var regionArrySubmitnote = regionArrySubmitAllcheckbox[k].getAttribute("data-note");
        var regionArrySubmitmodal = regionArrySubmitAllcheckbox[k].getAttribute("data-modal");
        regionobjectSubmit['areasubinfo'] = regionArrySubmitcode;
        regionobjectSubmit['careasubinfo'] = regionArrySubmitnote;
        regionobjectSubmit['areatype'] = regionArrySubmitmodal;
        regionArrySubmit.push(regionobjectSubmit);
    }

    // 门禁预申请信息
    var guardArrySubmit = []
    var guardArrySubmitAllcheckbox = $(".staffChangeTwo_area_div").find("input:checkbox[name='staffTwo_guardArry']:checked");

    for (var j = 0; j < guardArrySubmitAllcheckbox.length; j++) {
        var guardobjectSubmit = {};
        var guardArrySubmitcode = guardArrySubmitAllcheckbox[j].getAttribute("data-code");
        var guardArrySubmitnote = guardArrySubmitAllcheckbox[j].getAttribute("data-note");
        var guardArrySubmitmodal = guardArrySubmitAllcheckbox[j].getAttribute("data-modal");
        guardobjectSubmit['doorsubinfo'] = guardArrySubmitcode;
        guardobjectSubmit['cdoorsubinfo'] = guardArrySubmitnote;
        guardobjectSubmit['areatype'] = guardArrySubmitmodal;
        guardArrySubmit.push(guardobjectSubmit);
    }

    var staff_changeInfoname_cn = $(".staff_basicInfo_cnx").val() + $(".staff_basicInfo_cnm").val();
    var staff_changeInfoname_en = $(".staff_basicInfo_enx").val() + $(".staff_basicInfo_enm").val();

    var Submitchangbtype = "";
    var Submitchangpassbeginvali = "";
    var Submitchangpassendvali = "";
    var Submitchangapplypassbdate = "";
    var Submitchangapplypassedate = "";
    var Submitchangapplyreason = "";

    if (savedata_type == "1") {
        //  新增
        Submitchangbtype = $("#staffChangTwo_political").val() == undefined ? "" : $("#staffChangTwo_political").val(), // BTYPE  //申请类别代码
            Submitchangpassbeginvali = $("#staffchangeTwo_passbeginvali").val() == undefined ? "" : $("#staffchangeTwo_passbeginvali").val(), // PASSBEGINVALI //申请证件期限起始日
            Submitchangpassendvali = $("#staffchangeTwo_passendvali").val() == undefined ? "" : $("#staffchangeTwo_passendvali").val(), // PASSENDVALI  //申请证件期限终止日
            Submitchangapplypassbdate = $("#staffTwo_applypassbdate").val() == undefined ? "" : $("#staffTwo_applypassbdate").val(), // APPLYPASSBDATE  //现持通行证号码
            Submitchangapplypassedate = $("#staffTwo_applypassedate").val() == undefined ? "" : $("#staffTwo_applypassedate").val(), // APPLYPASSEDATE  //现持通行证卡号
            Submitchangapplyreason = $("#staffTwo_applyreason").val() == undefined ? "" : $("#staffTwo_applyreason").val() // APPLYREASON  //申请事由

    } else if (savedata_type == "2") {
        // 修改
        Submitchangbtype = $("#staffChangTwo_changepolitical").val() == undefined ? "" : $("#staffChangTwo_changepolitical").val(), // BTYPE  //申请类别代码
            Submitchangpassbeginvali = $("#staffchangeTwo_changepassbeginvali").val() == undefined ? "" : $("#staffchangeTwo_changepassbeginvali").val(), // PASSBEGINVALI //申请证件期限起始日
            Submitchangpassendvali = $("#staffchangeTwo_changepassendvali").val() == undefined ? "" : $("#staffchangeTwo_changepassendvali").val(), // PASSENDVALI  //申请证件期限终止日
            Submitchangapplypassbdate = $("#staffTwo_changeapplypassbdate").val() == undefined ? "" : $("#staffTwo_changeapplypassbdate").val(), // APPLYPASSBDATE  //现持通行证号码
            Submitchangapplypassedate = $("#staffTwo_changeapplypassedate").val() == undefined ? "" : $("#staffTwo_changeapplypassedate").val(), // APPLYPASSEDATE  //现持通行证卡号
            Submitchangapplyreason = $("#staffTwo_changeapplyreason").val() == undefined ? "" : $("#staffTwo_changeapplyreason").val() // APPLYREASON  //申请事由
    }
    var SubmitUnitpersonattachmenttbldata = [];
    var SubmitpersonnoRel_tabledata = $('#personnoRel_table').DataTable().data();

    for (var i = 0; i < SubmitpersonnoRel_tabledata.length; i++) {
        if (SubmitpersonnoRel_tabledata[i].pattachmentid == undefined) {
            SubmitUnitpersonattachmenttbldata.push({
                pattachmenttype: SubmitpersonnoRel_tabledata[i].pattachmenttype,
                cpattachmenttype: SubmitpersonnoRel_tabledata[i].cpattachmenttype,
                attachmentfullname: SubmitpersonnoRel_tabledata[i].attachmentfullname,
                corrtype: "application/pdf",
                attachbase64: SubmitpersonnoRel_tabledata[i].attachBase64.substring(SubmitpersonnoRel_tabledata[i].attachBase64.indexOf(',') + 1)
            })
        } else {
            SubmitUnitpersonattachmenttbldata.push({
                pattachmenttype: SubmitpersonnoRel_tabledata[i].pattachmenttype,
                cpattachmenttype: SubmitpersonnoRel_tabledata[i].cpattachmenttype,
                attachmentfullname: SubmitpersonnoRel_tabledata[i].attachmentfullname,
                corrtype: "application/pdf",
                attachbase64: SubmitpersonnoRel_tabledata[i].attachBase64.substring(SubmitpersonnoRel_tabledata[i].attachBase64.indexOf(',') + 1),
                pattachmentid: SubmitpersonnoRel_tabledata[i].pattachmentid
            })
        }


    }


    var savesubmitdatas = {
        personid: post_staffpersonid, //人员ID
        moreworkflag: $(".staffChange_moreworkflag").val(), // 兼职证件专办员
        unitid: post_staffuntidid, //单位Id,
        uptype: uptype,
        // type: savedata_type, //修改的类型
        Deleteall: edtwkidArray, //提交删除的教育工作id数据
        Unitpersontbl: staff_Unitpersontbl,
        Unitpersoneduworktbl: staff_Unitpersoneduworktbl,
        Unitpersonphototbl: staff_Unitpersonphototbl,
        preapplypassareaList: regionArrySubmit,
        preapplypassdoorList: guardArrySubmit, //    预申请区域 
        // 申请事由
        btype: Submitchangbtype, // BTYPE  //申请类别代码
        passbeginvali: Submitchangpassbeginvali, // PASSBEGINVALI //申请证件期限起始日
        passendvali: Submitchangpassendvali, // PASSENDVALI  //申请证件期限终止日
        applypassbdate: Submitchangapplypassbdate, // APPLYPASSBDATE  //现持通行证号码
        applypassedate: Submitchangapplypassedate, // APPLYPASSEDATE  //现持通行证卡号
        applyreason: Submitchangapplyreason,// APPLYREASON  //申请事由
        Unitpersonattachmenttbl: SubmitUnitpersonattachmenttbldata

    }


    var querysavePersondatass = "";
    if (savedata_type == "1") {
        //		新增操作
        querysavePersondatass = {
            "sessionid": sessionid,
            "funcid": "BJAirport-user.PersonManageService.savePerson",
            "data": savesubmitdatas
        }
    } else if (savedata_type == "2") {
        //			修改操作
        querysavePersondatass = {
            "sessionid": sessionid,
            "funcid": "BJAirport-user.PersonManageService.updatePerson",
            "data": savesubmitdatas
        }
    }




    // console.log(querysavePersondatass)
    //	console.log("querysavePersondataconsole.log(querysavePersondata)console.log(querysavePersondata)")
    //	console.log(savesubmitdatas.Unitpersonphototbl)
    //	console.log("querysavePersondataconsole.log(querysavePersondata)console.log(querysavePersondata)")

    staffChangeajaxpost_judgefun(countryidjuddages, countrytextjuddages, uptype);



    if (staffChangeajaxpost_judge) {

        var passnostrjuage = $("#staff_passno").val();
        var birthdayjuage = $(".staff_basicInfo_bday").val();
        if ((passnostrjuage.substr(6, 8) != birthdayjuage) && $("#staff_passtype").val() == "01") {
            BootstrapDialog.show({
                type: BootstrapDialog.TYPE_WARNING,
                message: '出生日期和身份证信息不一致，是否确认保存？',
                title: "信息提示",
                closeByBackdrop: false, //不能通过点击其他部分关闭
                buttons: [{
                    cssClass: "btn-primary",
                    label: '是',
                    action: function (dialogItself) {
                        $.axpost("/BJAirportWeb/entrance/index.do", JSON.stringify(querysavePersondatass), true, function (data) {
                            // console.log(data);
                            if (data.success == true) {
                                //数据保存成功清空数据 跳转到前面的页面并刷新
                                save_Submitclear();
                                BootstrapDialog.alert({
                                    type: BootstrapDialog.TYPE_SUCCESS,
                                    message: data.message
                                });
                                if ($("#post_manage_datatabledunitpeople") != undefined) {
                                    $("#post_manage_datatabledunitpeople").DataTable().draw();
                                    post_managefun.post_manageSysteminit_querypeopletablefun();
                                }
                                multitabs.close($('.nav.nav-tabs').children('.active'));

                            } else {
                                // layer.alert(data.message + "14")
                                BootstrapDialog.alert({
                                    type: BootstrapDialog.TYPE_DANGER,
                                    message: data.message
                                });
                            }
                        })
                        dialogItself.close(); //可以认为是关闭的回调方法;
                    }
                }, {
                    label: '否',
                    action: function (dialogItself) {
                        $(".staff_basicInfo_bday").focus();
                        dialogItself.close(); //可以认为是关闭的回调方法;
                    }
                }]
            });
        } else {
            $.axpost("/BJAirportWeb/entrance/index.do", JSON.stringify(querysavePersondatass), true, function (data) {
                // console.log(data);
                if (data.success == true) {
                    //数据保存成功清空数据 跳转到前面的页面并刷新
                    save_Submitclear();
                    BootstrapDialog.alert({
                        type: BootstrapDialog.TYPE_SUCCESS,
                        message: data.message
                    });
                    if ($("#post_manage_datatabledunitpeople") != undefined) {
                        $("#post_manage_datatabledunitpeople").DataTable().draw();
                        post_managefun.post_manageSysteminit_querypeopletablefun();
                    }
                    multitabs.close($('.nav.nav-tabs').children('.active'));

                } else {
                    // layer.alert(data.message + "14")
                    BootstrapDialog.alert({
                        type: BootstrapDialog.TYPE_DANGER,
                        message: data.message
                    });
                }
            })
        }



    }




}

//判断输入的是否号码
$("#staff_telephonenumb").bind("keydown", function () {
    $("#staff_telephonenumb").attr("maxlength", "11");
})

function staff_telephonenumb(value) {
    var phone1 = /^1/;
    var phonestr = $("#staff_telephonenumb").val();
    if (phone1.test(phonestr)) {

        var phone11 = /\d{10}$/;
        if (phone11.test(phonestr)) {

        } else {
            // layer.alert("请输入正确的号码格式");
            BootstrapDialog.alert({
                type: BootstrapDialog.TYPE_WARNING,
                message: "请输入正确的号码格式!",
            });
            $("#staff_telephonenumb").val("");
            $("#staff_telephonenumb").focus();
        }
    } else {
        // layer.alert("请输入正确的号码格式");
        BootstrapDialog.alert({
            type: BootstrapDialog.TYPE_WARNING,
            message: "请输入正确的号码格式!",
        });
        $("#staff_telephonenumb").val("");
        $("#staff_telephonenumb").focus();
    }
}
//		电话  办公电话判断staff_homeofficetelephone		

// $("#staff_officetelephone,#staff_officetelephone").bind("keydown", function () {
// 	$("#staff_officetelephone,#staff_officetelephone").attr("maxlength", "15");
// })
//关闭窗口
$(".staffChange_close").on("click", function () {
    multitabs.close($('.nav.nav-tabs').children('.active'));
    var activeNavTab = $('.nav-tabs > li').find('a[data-menuid="0115"]')
    // console.log(activeNavTab[0])
    if (activeNavTab[0] != undefined) {
        // console.log("激活")
        multitabs.active(activeNavTab[0])
    } else {
        // console.log("重新创建")
        multitabs.create({
            iframe: false, //指定为iframe模式，当值为false的时候，为智能模式，自动判断（内网用ajax，外网用iframe）。缺省为false。
            title: '单位信息管理', //标题（可选），没有则显示网址
            url: '../userManager/unitPostManager/post_manag_system.html' //链接（必须），如为外链，强制为info页
        }, true); //true 则激活新增的tab页
    }
})


// function staff_officetelephone(value) {
// 	var phonestr = $("#" + value).val();
// 	var phone = /\d{7,8}$/;
// 	if (phone.test(phonestr)) {

// 	} else {
// 		// layer.alert("请输入正确的号码格式");
// 		BootstrapDialog.alert({
// 			type: BootstrapDialog.TYPE_WARNING,
// 			message: "请输入正确的号码格式",
// 		});
// 		$("#" + value).val("");
// 		$("#" + value).focus();
// 	}
// }

// function otherpeopleRelationIdNum(value) {
// 	var cardNo = $("#" + value).val();
// 	var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
// 	if (reg.test(cardNo) === false) {
// 		// layer.alert("身份证号码格式不正确");
// 		BootstrapDialog.alert({
// 			type: BootstrapDialog.TYPE_WARNING,
// 			message: "身份证号码格式不正确!",
// 		});
// 		$("#" + value).val("")
// 		$("#" + value).focus();
// 		return false;
// 	}
// }




var staffChange_formValidatorfun = function () {
    // 人员基本信息
    $('#staffChange_fromValidatorbase_Info').bootstrapValidator({
        fields: {
            staffChange_chnsurname: {
                validators: {
                    regexp: {
                        regexp: /^[\u4e00-\u9fa5]+$/,
                        message: '请输入中文！'
                    }
                }
            },
            ustaffChange_ensurname: {
                validators: {
                    regexp: {
                        regexp: /^[a-zA-Z]+$/,
                        message: '请输入英文大写字母！'
                    }
                }
            },
            staff_aliasnameinfo: {
                // message: '用户名验证失败',
                validators: {
                    notEmpty: {
                        message: '输入不为空'
                    },
                }
            },
            staff_email: {
                validators: {
                    notEmpty: {
                        message: '输入不为空'
                    },
                    // emailAddress: {
                    // 	message: '请输入正确的邮箱地址如：123@qq.com'
                    // },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                        message: '请输入正确的邮箱地址如：123@qq.com'
                    }

                }
            },
            staff_officetelephone: {
                validators: {
                    notEmpty: {
                        message: '输入不为空'
                    },
                    regexp: {
                        // regexp: /^((0\d{2,3}-\d{7,8})|(\d{7,8}))$/,
                        regexp:/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9})|(\d{7,8}))$/,
                        message: '请输入正确的电话号码'
                    }
                }
            },
            // staffChange_personno: {
            // 	validators: {
            // 		notEmpty: {
            // 			message: '输入不为空'
            // 		},
            // 		regexp: {
            // 			regexp: /^[0-9]*$/,
            // 			message: '请输入正确的人员编号'
            // 		}
            // 	}
            // },
            staff_telephonenumb: {
                validators: {
                    notEmpty: {
                        message: '输入不为空'
                    },
                    regexp: {
                        regexp: /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/,
                        message: '请输入正确的手机号码'
                    }

                }
            },
            staff_ChangenotEmpty_registere: {
                validators: {
                    notEmpty: {
                        message: '输入不为空'
                    },

                }
            },
            staff_ChangenotEmpty_address: {
                validators: {
                    notEmpty: {
                        message: '输入不为空'
                    },

                }
            },
            // staff_ChangenotEmpty_religion: {
            //     validators: {
            //         notEmpty: {
            //             message: '输入不为空'
            //         },

            //     }
            // },
            // staff_ChangenotEmpty_crime: {
            //     validators: {
            //         notEmpty: {
            //             message: '输入不为空'
            //         },

            //     }
            // },
            // staff_ChangenotEmpty_organinfo: {
            //     validators: {
            //         notEmpty: {
            //             message: '输入不为空'
            //         },

            //     }
            // },
            // staff_ChangenotEmpty_othersituation: {
            //     validators: {
            //         notEmpty: {
            //             message: '输入不为空'
            //         },

            //     }
            // },
            // staff_ChangenotEmpty_textarea: {
            //     validators: {
            //         notEmpty: {
            //             message: '输入不为空'
            //         },

            //     }
            // },
            staff_ChangenotEmpty: {
                validators: {
                    notEmpty: {
                        message: '输入不为空'
                    },
                }
            },
            staff_passnonotEmpty: {
                validators: {
                    callback: {
                        message: "请输入正确的证件号码!",
                        callback: function (value, $field, options) {
                            var staff_passtypeVal = $("#staff_passtype").val();
                            var cardNo = $("#staff_passno").val()
                            var reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
                            // console.log("aaaa")
                            if (staff_passtypeVal == "01") {
                                if (checkIdcard(cardNo) === false) {
                                    return false;
                                } else {
                                    return true;
                                }
                            } else {
                                if (cardNo == "") {
                                    return false;
                                } else {
                                    return true;
                                }
                            }
                        }
                    }


                }
            },
            // staff_martialSelect: {
            //     validators: {
            //         notEmpty: {
            //             message: '请选中一个选项'
            //         },

            //     }
            // },
            staff_ChangeSelect: {
                validators: {
                    notEmpty: {
                        message: '请选中一个选项'
                    },

                }
            },
            staff_nationalSelect: {
                validators: {
                    callback: {
                        message: "请选中一个选项",
                        callback: function (value, $field, options) {
                            var staff_nationalVal = $("#nationality").val();
                            if (staff_nationalVal != "") {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    }
                }
            },
            staff_nativeSelect: {
                validators: {
                    callback: {
                        message: "请选中一个选项",
                        callback: function (value, $field, options) {
                            var staff_nativeplaceVal = $("#staff_nativeplace").val()
                            if (staff_nativeplaceVal != "") {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    }
                }
            },

        }
    }).on('success.form.bv', function (e) {
        // 阻止默认事件提交
        e.preventDefault();
    });;
    //人员单位信息
    $('#staffChange_fromValidator').bootstrapValidator({
        fields: {
            staff_depName: {
                // message: '输入不正确', //默认的提示信息，一般来说不必填写（但是如果有使用自定义规则的input校验中，Label没按规则来写，又不想加的，可以加上这个参数作为错误提示信息）
                validators: {
                    notEmpty: { //内置的，不带message的话，会用默认的，可以引入中文js
                        message: '请选择部门'
                    },
                }
            },
            staffChange_faxnumber: {
                validators: {
                    notEmpty: {
                        message: '输入不为空'
                    },
                    regexp: {
                        regexp: /^((0\d{2,3}-\d{7,8})|(\d{7,8}))$/,
                        message: '请输入正确的传真号'
                    }
                }
            },
            staff_postName: {
                validators: {
                    notEmpty: {
                        message: '请选择岗位'
                    }

                }
            },
            staff_unitinfopost: {
                validators: {
                    notEmpty: {
                        message: '输入不为空'
                    }

                }
            },
            staffChange_worktask: {
                validators: {
                    notEmpty: {
                        message: '输入不为空'
                    }

                }
            },

            staff_laborTime: {
                validators: {
                    notEmpty: {
                        message: '请选择用工时限名称'
                    }
                }
            },

            staff_employmenttype: {
                validators: {
                    notEmpty: {
                        message: '请选择用工性质'
                    }

                }
            },
            staff_accomby: {
                validators: {
                    notEmpty: {
                        message: '请选择是否具备陪同人员'
                    }

                }
            },
            staff_soldierflag: {
                validators: {
                    notEmpty: {
                        message: '请选择是否转业军人'
                    }
                }
            },
            // staffChange_workcount: {
            //     validators: {
            //         notEmpty: {
            //             message: '请输入工作年限'
            //         },
            //         regexp: {
            //             regexp: /^[0-9]*$/,
            //             message: '请输入工作年限，例如 2 或者 3'
            //         }
            //     }
            // },
            staffChange_moreworkflag: {
                validators: {
                    notEmpty: {
                        message: '请选择是否兼职证件专办员'
                    }

                }
            },
            staffChange_workplace: {
                validators: {
                    notEmpty: {
                        message: '输入不为空'
                    }

                }
            },
            staffChange_reality: {
                validators: {
                    notEmpty: {
                        message: '输入不为空'
                    }

                }
            },
            staffChange_otherpr: {
                validators: {
                    notEmpty: {
                        message: '输入不为空'
                    }

                }
            }
        }
    }).on('success.form.bv', function (e) {
        // 阻止默认事件提交
        e.preventDefault();
    });
    // 人员tab信息
}

var staffChange_formValidatorinitfun = function () {
    $('#staffChange_fromValidator').data('bootstrapValidator').validate();
    var judge1 = $('#staffChange_fromValidator').data('bootstrapValidator').isValid();
    $('#staffChange_fromValidatorbase_Info').data('bootstrapValidator').validate();
    var judge2 = $('#staffChange_fromValidatorbase_Info').data('bootstrapValidator').isValid();
    // $('#staffChange_fromValidatortab_content').data('bootstrapValidator').validate();
    // var judge3 = $('#staffChange_fromValidatortab_content').data('bootstrapValidator').isValid();
    if (judge1 && judge2) {
        return true;
    } else {
        return false;
    }
}


// 关系人提交form表单验证
var peopleRel_fromValidatorfun = function () {
    if($("#peopleRelation").val() == "03" || $("#peopleRelation").val() == "04"){
        $("#peopleRel_fromValidator").bootstrapValidator({
            fields: {
                peopleRel_notEmpty: {
                    validators: {
                        notEmpty: {
                            message: '输入不为空'
                        }
                    }
                },
                peopleRelworkStation_notEmpty:{
                    validators: {
                        notEmpty: {
                            message: '输入不为空'
                        }
                    }
                },
                peopleRel_Age: {
                    validators: {
                        // notEmpty: {
                        //     message: '请输入年龄'
                        // },
                        regexp: {
                            regexp: /^[0-9]*$/,
                            message: '请输入年龄，如22或者23！'
                        }
                    }
                },
                peopleRel_passno: {
                    validators: {
                        callback: {
                            message: "请输入正确的证件号码!",
                            callback: function (value, $field, options) {
                                var cardNo = $("#otherpeopleRelationIdNum").val()
                                var reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
                                // console.log("aaaa")
                                if (cardNo == "") {
                                    return false;
                                } else {
                                    if (checkIdcard(cardNo) === false) {
                                        return false;
                                    } else {
                                        return true;
                                    }
                                }
                            }
                        }
    
    
                    }
                },
                peopleReltelephone_notEmpty: {
                    validators: {
                        regexp: {
                            regexp: /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9})|(\d{7,8}))$/,
                            message: '请输入正确的电话号码'
                        }
                    }
                },
    
            }
        })
    }else {
        $("#peopleRel_fromValidator").bootstrapValidator({
            fields: {
                peopleRel_notEmpty: {
                    validators: {
                        notEmpty: {
                            message: '输入不为空'
                        }
                    }
                },
                peopleRel_Age: {
                    validators: {
                        // notEmpty: {
                        //     message: '请输入年龄'
                        // },
                        regexp: {
                            regexp: /^[0-9]*$/,
                            message: '请输入年龄，如22或者23！'
                        }
                    }
                },
                peopleRel_passno: {
                    validators: {
                        callback: {
                            message: "请输入正确的证件号码!",
                            callback: function (value, $field, options) {
                                var cardNo = $("#otherpeopleRelationIdNum").val()
                                var reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
                                // console.log("aaaa")
                                if (cardNo == "") {
                                    return false;
                                } else {
                                    if (checkIdcard(cardNo) === false) {
                                        return false;
                                    } else {
                                        return true;
                                    }
                                }
                            }
                        }
    
    
                    }
                },
                peopleReltelephone_notEmpty: {
                    validators: {
                        regexp: {
                            regexp: /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9})|(\d{7,8}))$/,
                            message: '请输入正确的电话号码'
                        }
                    }
                },
    
            }
        })
    }
  
}
peopleRel_fromValidatorfun();
var peopleRel_fromValidatorinitfun = function () {
    $('#peopleRel_fromValidator').data('bootstrapValidator').validate();
    var peopleReljudge = $('#peopleRel_fromValidator').data('bootstrapValidator').isValid();
    if (peopleReljudge) {
        return true;
    } else {
        return false;
    }
}
//其它关系人提交form表单验证
var otherpeopleRel_fromValidatorfun = function () {
    $("#otherpeopleRel_fromValidator").bootstrapValidator({
        fields: {
            peopleRelationName: {
                validators: {
                    notEmpty: {
                        message: '请输入姓名！'
                    }
                }
            },
            // otherpeopleRel_notEmpty: {
            //     validators: {
            //         notEmpty: {
            //             message: '请输入单位名称！'
            //         }
            //     }
            // },
            // otherpeopleRelationSex: {
            //     validators: {
            //         notEmpty: {
            //             message: '请选择性别'
            //         }

            //     }
            // },
            peopleRelationAge: {
                validators: {
                    // notEmpty: {
                    //     message: '请输入年龄'
                    // },
                    regexp: {
                        regexp: /^[0-9]*$/,
                        message: '请输入年龄，如22或者23！'
                    }
                }
            },
            // otherpeopleRelationPolitics: {
            //     validators: {
            //         notEmpty: {
            //             message: '请选择政治面貌！'
            //         }

            //     }
            // },
            // otherpeopleRelationPost: {
            //     validators: {
            //         notEmpty: {
            //             message: '请选择职业！'
            //         }

            //     }
            // },
            // otherworkStation: {
            //     validators: {
            //         notEmpty: {
            //             message: '请输入工作单位名称！'
            //         }
            //     }
            // },

        }
    })
}
otherpeopleRel_fromValidatorfun();

var otherpeopleRel_fromValidatorinitfun = function () {
    $('#otherpeopleRel_fromValidator').data('bootstrapValidator').validate();
    var otherpeopleReljudge = $('#otherpeopleRel_fromValidator').data('bootstrapValidator').isValid();
    if (otherpeopleReljudge) {
        return true;
    } else {
        return false;
    }
}



// 初始化日期控件
var staffChange_newwadd_ddateinitfun = function () {
    // 出生日期
    $(".staff_basicInfo_bday").click(function () {
        $(".staff_basicInfo_bday").data("daterangepicker").autoUpdateInput = true;
    });
    $.stFromYear("staff_basicInfo_bday", null, null, null, ".staff_ChangedateTimeBox");
    $(".staff_basicInfo_bday").data("daterangepicker").autoUpdateInput = true;

    // 入党时间
    $(".staffChangejoinTime").click(function () {
        $(".staffChangejoinTime").data("daterangepicker").autoUpdateInput = true;
        // $(".staffChangejoinTime").data("daterangepicker").autoApply = false;
    });
    $.stFromYear("staffChangejoinTime", null, null, null, ".staffChangejoinTimeBox");
    $(".staffChangejoinTime").data("daterangepicker").autoUpdateInput = true;
    // $(".staffChangejoinTime").data("daterangepicker").autoApply = false;

    //  入司时间   
    $(".staffChange_workunitdate").click(function () {
        $(".staffChange_workunitdate").data("daterangepicker").autoUpdateInput = true;
    });
    // 入岗时间
    $(".staffChange_workstationdate").click(function () {
        $(".staffChange_workstationdate").data("daterangepicker").autoUpdateInput = true;
    });

    $.stFromYear("staffChange_workunitdate", "staffChange_workstationdate", "nomax", false, ".staffChange_workunitdate_Box");

    $.stToYear("staffChange_workunitdate", "staffChange_workstationdate", "nomin", false, ".staffChange_workstationdate_Box");

    $(".staffChange_workunitdate").data("daterangepicker").autoUpdateInput = true;
    $(".staffChange_workstationdate").data("daterangepicker").autoUpdateInput = true;

    // 用工时限开始时间
    $(".staff_datestartinfo").click(function () {

        $(".staff_datestartinfo").data("daterangepicker").autoUpdateInput = true;
    });
    // 用工时限结束时间
    $(".staff_dateendtinfo").click(function () {
        $(".staff_dateendtinfo").data("daterangepicker").autoUpdateInput = true;
    });
    // $("#staff_employmenttype").on("change",function(){
    //     if($("#staff_employmenttype").val() != "02"){
    //         alert("1")

    //     }else{
    //         alert("2")

    //         // $(".staff_dateendtinfo").data("daterangepicker").autoUpdateInput = true;
    //     }
    // })
    $.stFromYear("staff_datestartinfo", "staff_dateendtinfo", "nomax", false, ".staff_datestartinfo_Box");
    $.stToYear("staff_datestartinfo", "staff_dateendtinfo", "nomin", false, ".staff_dateendtinfo_Box");

    $(".staff_datestartinfo").data("daterangepicker").autoUpdateInput = true;
    $(".staff_dateendtinfo").data("daterangepicker").autoUpdateInput = true;

    // 首次参加工作时间
    $(".firstwkdate").click(function () {
        $(".firstwkdate").data("daterangepicker").autoUpdateInput = true;
    });
    $.stFromYear("firstwkdate", null, null, null, ".firstwkdate_Box");
    $(".firstwkdate").data("daterangepicker").autoUpdateInput = true;
    // 工作年限（开始日期）
    $(".staffChange_workbdata").click(function () {
        $(".staffChange_workbdata").data("daterangepicker").autoUpdateInput = true;
    });
    // 工作年限（结束日期）
    // $(".staffChange_workedata").click(function () {
    // $(".staffChange_workedata").data("daterangepicker").autoUpdateInput = true;
    // });
    $.stFromYear("staffChange_workbdata", null, null, null, ".staffChange_workbdata_Box");

    // $.stToYear("staffChange_workbdata", "staffChange_workedata", "nomin", false, ".staffChange_workedata_Box");

    // $(".staffChange_workbdata").data("daterangepicker").autoUpdateInput = true;
    // $(".staffChange_workedata").data("daterangepicker").autoUpdateInput = true;

    // 教育经历开始时间
    $(".schooDateStart").click(function () {
        $(".schooDateStart").data("daterangepicker").autoUpdateInput = true;
    });
    // 教育经历结束时间
    $(".schooDateEnd").click(function () {
        $(".schooDateEnd").data("daterangepicker").autoUpdateInput = true;
    });
    $.stFromYear("schooDateStart", "schooDateEnd", "nomax", false, ".schooDateStart_Box");

    $.stToYear("schooDateStart", "schooDateEnd", "nomin", false, ".schooDateEnd_Box");

    $(".schooDateStart").data("daterangepicker").autoUpdateInput = true;
    $(".schooDateEnd").data("daterangepicker").autoUpdateInput = true;
    // 工作经历开始时间
    $(".workTimeDateStart").click(function () {
        $(".workTimeDateStart").data("daterangepicker").autoUpdateInput = true;
    });
    // 工作经历结束时间
    $(".workTimeDateEnd").click(function () {
        $(".workTimeDateEnd").data("daterangepicker").autoUpdateInput = true;
    });
    $.stFromYear("workTimeDateStart", "workTimeDateEnd", "nomax", false, ".workTimeDateStart_Box");

    $.stToYear("workTimeDateStart", "workTimeDateEnd", "nomin", false, ".workTimeDateEnd_Box");

    $(".workTimeDateStart").data("daterangepicker").autoUpdateInput = true;
    $(".workTimeDateEnd").data("daterangepicker").autoUpdateInput = true;

}

staffChange_newwadd_ddateinitfun();

// $("#joinTime").off("blur").on("blur",function(){
// 	var staff_politicaldates = $("#staff_political").val();
// 	if(staff_politicaldates == "03" || staff_politicaldates == "13" || staff_politicaldates == "99" || staff_politicaldates == "12"){
// 		$("#joinTime").val("")
// 	}
// })
// 日期时间验证
function bootstrapValidator_DateFun() {
    // 出生日期
    if ($(".staff_basicInfo_bday").val() == "") {
        BootstrapDialog.show({
            type: BootstrapDialog.TYPE_WARNING,
            message: '出生日期不为空，请选择出生日期！',
            title: "信息提示",
            closeByBackdrop: false, //不能通过点击其他部分关闭
            buttons: [{
                cssClass: "btn-primary",
                label: '确定',
                action: function (dialogItself) {
                    dialogItself.close(); //可以认为是关闭的回调方法
                    $(".staff_basicInfo_bday").focus();
                }
            }]
        });
        return false;
    }
    var staff_politicaldate = $("#staff_political").val();
    // console.log(staff_politicaldate)
    // 入党时间
    var joinTimejuddage = true;
    if (staff_politicaldate == "03" || staff_politicaldate == "" || staff_politicaldate == "13" || staff_politicaldate == "99" || staff_politicaldate == "12") {
        joinTimejuddage = true;
    } else if ($("#joinTime").val() == "") {
        joinTimejuddage = false;
        BootstrapDialog.show({
            type: BootstrapDialog.TYPE_WARNING,
            message: '何时加入党派日期不能为空，请选择日期！',
            title: "信息提示",
            closeByBackdrop: false, //不能通过点击其他部分关闭
            buttons: [{
                cssClass: "btn-primary",
                label: '确定',
                action: function (dialogItself) {
                    dialogItself.close(); //可以认为是关闭的回调方法
                    $("#joinTime").focus();
                }
            }]
        });
        return false;
    }
    // 入司时间
    if ($(".staffChange_workunitdate").val() == "") {
        BootstrapDialog.show({
            type: BootstrapDialog.TYPE_WARNING,
            message: '入司时间不能为空，请选择日期！',
            title: "信息提示",
            closeByBackdrop: false, //不能通过点击其他部分关闭
            buttons: [{
                cssClass: "btn-primary",
                label: '确定',
                action: function (dialogItself) {
                    dialogItself.close(); //可以认为是关闭的回调方法
                    $(".staffChange_workunitdate").focus();
                }
            }]
        });
        return false;
    }
    // 本次入岗时间
    if ($(".staffChange_workstationdate").val() == "") {
        BootstrapDialog.show({
            type: BootstrapDialog.TYPE_WARNING,
            message: '入岗日期不能为空，请选择日期！',
            title: "信息提示",
            closeByBackdrop: false, //不能通过点击其他部分关闭
            buttons: [{
                cssClass: "btn-primary",
                label: '确定',
                action: function (dialogItself) {
                    dialogItself.close(); //可以认为是关闭的回调方法
                    $(".staffChange_workstationdate").focus();
                }
            }]
        });
        return false;
    }
    // 用工时限开始时间
    if ($(".staff_datestartinfo").val() == "") {
        BootstrapDialog.show({
            type: BootstrapDialog.TYPE_WARNING,
            message: '用工时限开始日期不能为空，请选择日期！',
            title: "信息提示",
            closeByBackdrop: false, //不能通过点击其他部分关闭
            buttons: [{
                cssClass: "btn-primary",
                label: '确定',
                action: function (dialogItself) {
                    dialogItself.close(); //可以认为是关闭的回调方法
                    $(".staff_datestartinfo").focus();
                }
            }]
        });
        return false;
    }
    //  用工时限结束时间
    var staff_employmenttypejuddage = true;
    if ($("#staff_employmenttype").val() == "02") {
        staff_employmenttypejuddage = true;
    }else if ($(".staff_dateendtinfo").val() == "") {
        staff_employmenttypejuddage = false;
        BootstrapDialog.show({
            type: BootstrapDialog.TYPE_WARNING,
            message: '用工时限结束日期不能为空,请选择日期！',
            title: "信息提示",
            closeByBackdrop: false, //不能通过点击其他部分关闭
            buttons: [{
                cssClass: "btn-primary",
                label: '确定',
                action: function (dialogItself) {
                    dialogItself.close(); //可以认为是关闭的回调方法
                    $(".staff_dateendtinfo").focus();
                }
            }]
        });
        return false;
    }
    // 首次参加工作时间
    if ($(".firstwkdate").val() == "") {
        BootstrapDialog.show({
            type: BootstrapDialog.TYPE_WARNING,
            message: '首次参加工作日期不能为空，请选择日期！',
            title: "信息提示",
            closeByBackdrop: false, //不能通过点击其他部分关闭
            buttons: [{
                cssClass: "btn-primary",
                label: '确定',
                action: function (dialogItself) {
                    dialogItself.close(); //可以认为是关闭的回调方法
                    $(".firstwkdate").focus();
                }
            }]
        });
        return false;
    }
    // 作年限（起始日期）
    if ($(".staffChange_workbdata").val() == "") {
        BootstrapDialog.show({
            type: BootstrapDialog.TYPE_WARNING,
            message: '工作年限开始日期不能为空，请选择日期！',
            title: "信息提示",
            closeByBackdrop: false, //不能通过点击其他部分关闭
            buttons: [{
                cssClass: "btn-primary",
                label: '确定',
                action: function (dialogItself) {
                    dialogItself.close(); //可以认为是关闭的回调方法
                    $(".staffChange_workbdata").focus();
                }
            }]
        });
        return false;
    }
    //工作年限结束日期
    if ($(".staffChange_workedata").val() == "") {
        BootstrapDialog.show({
            type: BootstrapDialog.TYPE_WARNING,
            message: '工作年限结束日期不能为空，请选择日期！',
            title: "信息提示",
            closeByBackdrop: false, //不能通过点击其他部分关闭
            buttons: [{
                cssClass: "btn-primary",
                label: '确定',
                action: function (dialogItself) {
                    dialogItself.close(); //可以认为是关闭的回调方法
                    $(".staffChange_workedata").focus();
                }
            }]
        });
        return false;
    }
    if ($(".staff_basicInfo_bday").val() != "" && staff_employmenttypejuddage && joinTimejuddage && $(".staffChange_workunitdate").val() != "" && $(".staffChange_workstationdate").val() != "" && $(".staff_datestartinfo").val() != "" && $(".firstwkdate").val() != "" && $(".staffChange_workbdata").val() != "" && $(".staffChange_workedata").val() != "") {
        return true;
    }
    // if (staff_employmenttypejuddage && joinTimejuddage   && $(".staffChange_workbdata").val() != "" ) {
    //     return true;
    // }
}

// 18位身份证验证
var staff_CheckIdcard = function (value) {
    var factorArr = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1);
    var error;
    var varArray = new Array();
    var intValue;
    var lngProduct = 0;
    var intCheckDigit;
    var intStrLen = value.length;
    var idNumber = value;
    if (intStrLen != 18) {
        return false;
    }
    for (i = 0; i < intStrLen; i++) {
        varArray[i] = idNumber.charAt(i);
        if ((varArray[i] < '0' || varArray[i] > '9') && (i != 17)) {
            return false;
        } else if (i < 17) {
            varArray[i] = varArray[i] * factorArr[i];
        }
    }
    for (i = 0; i < 17; i++) {
        lngProduct = lngProduct + varArray[i];
    }
    intCheckDigit = 12 - lngProduct % 11;
    switch (intCheckDigit) {
        case 10:
            intCheckDigit = 'X';
            break;
        case 11:
            intCheckDigit = 0;
            break;
        case 12:
            intCheckDigit = 1;
            break;
    }
    if (varArray[17].toUpperCase() != intCheckDigit) {
        return false;
    }
 
    return true;
}

// 无犯罪记录附件上传
var satffChangePersonPath = function () {
    $(".satffChangePersonPath_btn").off("click").on("click", function () {
        $("#satffChangePersonPath_path").click();
        $("#satffChangePersonPath_path").off("change").on("change", function (event) {
            // 获取文件对象
            var personfile = this.files[0];
            var personfilename = personfile.name;
            $("#satffChangePersonPath_btn_fileName").val(personfilename);
            // 确认选择的文件是图片
            // if (file.type.indexOf("image") == 0) {
            var reader = new FileReader();
            // 使用fileReader对文件对象进行操作
            reader.readAsDataURL(personfile);
            reader.onload = function (e) {
                // 图片base64化 reader.result的结果是base64编码数据
                var newUrl = this.result;
                // console.log(newUrl);
                personPathattachBase64 = newUrl;
                // Mypreviewface.src = newUrl;
            };
            event.target.value = "";
            // }
        })
    })
    //  添加附件
    $(".satffChangeAddPersonPath_btn").off("click").on("click", function () {

        // 构造datatable数据 
        var pattachmenttype = $("#staffChange_pattachmenttype option:selected").val();
        var cpattachmenttype = $("#staffChange_pattachmenttype option:selected").text();
        var cpattachmenttypefileName = $("#satffChangePersonPath_btn_fileName").val();
        var staffChange_personnoRel_tblDatafullname = [];
        // console.log(staffChange_personnoRel_tblData)
        if (staffChange_personnoRel_tblData == null) {
            staffChange_personnoRel_tblData = [];
        } else {
            if (staffChange_personnoRel_tblData.length > 0) {
                for (var i = 0; i < staffChange_personnoRel_tblData.length; i++) {
                    staffChange_personnoRel_tblDatafullname.push(staffChange_personnoRel_tblData[i].attachmentfullname)
                }

            }
        }

        // console.log(staffChange_personnoRel_tblDatafullname)
        // console.log(staffChange_personnoRel_tblDatafullname.indexOf(cpattachmenttypefileName) > -1)
        if (pattachmenttype == "") {
            BootstrapDialog.alert({
                type: BootstrapDialog.TYPE_WARNING,
                message: "添加附件时，请选择附件类型！",
            });
            return;
        } else if (cpattachmenttypefileName == "") {
            BootstrapDialog.alert({
                type: BootstrapDialog.TYPE_WARNING,
                message: "添加附件时，请选择需要上传的附件！",
            });
            return;
        } else if (staffChange_personnoRel_tblDatafullname.indexOf(cpattachmenttypefileName) > -1) {  //判断文件名是否存在 
            BootstrapDialog.alert({
                type: BootstrapDialog.TYPE_WARNING,
                message: "该附件名称已存在，请核对！",
            });
            return;
        } else {
            // console.log(staffChange_personnoRel_tblData)
            staffChange_personnoRel_tblData.push({
                pattachmenttype: pattachmenttype,// 附件类型代码
                cpattachmenttype: cpattachmenttype,//附件类型中文
                attachmentfullname: cpattachmenttypefileName,// 附件名称
                attachBase64: personPathattachBase64// base64路径
            })
            // console.log(staffChange_personnoRel_tblData)
            personnoRel_tableinitfun(staffChange_personnoRel_tblData);

        }

    })

    // $("#satffChangePersonPath_path").val(path);
    // $("#satffChangeView_PersonPath_path").val(path);
    // console.log(path)

    // $('.registration_contract_unit_from_check_class').data('bootstrapValidator').resetForm();

}

satffChangePersonPath();


// 无犯罪记录附件列表
function personnoRel_tableinitfun(data) {
    // alert("12")
    // 	清空附件类型 和附件名称
    $("#staffChange_pattachmenttype").val("");
    $("#satffChangePersonPath_btn_fileName").val("");
    var earth_start = 0;
    var personnoRel_tableinit = $('#personnoRel_table').DataTable({
        dom: '<"top">t<"bottom"<"col-xs-6 col_paddingall"<"col-xs-7 col_paddingall"i><"col-xs-5"l>><"col-xs-6 col_paddingall"p>><"clear">',
        destroy: true,
        data: data,
        paging: false,
        ordering: false,
        info: true,
        autoWidth: false,
        pageLength: 5,
        lengthMenu: [10, 15, 20],
        bFilter: false, //去掉搜索框方法三：这种方法可以
        bLengthChange: true,
        sLoadingRecords: "载入中...",
        serverSide: false,
        fnDrawCallback: function () {
            let api = this.api();
            api.column(0).nodes().each(function (cell, i) {
                cell.innerHTML = earth_start + i + 1;
            });
        },
        columns: [{
            "data": null,
            "targets": 0,
            "sTitle": "序号",
        },
        {
            "data": "cpattachmenttype",
            "sTitle": "附件类型",
            "defaultContent": "<i></i>"
        },
        {
            "data": "pattachmentid",
            "sTitle": "附件类型id",
            "defaultContent": "<i></i>",
            "sClass": "hidden"
        },
        {
            "data": "attachmentfullname",
            "sTitle": "附件名称",
            "defaultContent": "<i></i>",
        },
        {
            "data": "attachBase64",
            "sTitle": "附件地址",
            "defaultContent": "<i></i>",
            "sClass": "hidden"
        },
        {
            "data": "relationworkunit",
            "sTitle": "附件id",
            "defaultContent": "<i></i>",
            "sClass": "hidden"
        }

        ],
        columnDefs: [{
            // 定义操作列,######以下是重点########
            "sTitle": "操作",
            "targets": 6, //操作按钮目标列
            "data": null,
            "render": function (data, type, row) {
                var html = '<button class="btn btn-danger  btnpadding PersonPathDele_btn" >删除</button>'
                html += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp<input type="button" value="文件预览"  class="btn btn-info btnpadding satffChangeView_PersonPath_btn">'
                return html;
            }
        },
        {
            "searchable": false,
            "orderable": false,
            "targets": 0
        },
        ]
    });
    personnoRel_tableinit.on('order.dt search.dt', function () {
        personnoRel_tableinit.column(0, {
            search: 'applied',
            order: 'applied'
        }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();
}
personnoRel_tableinitfun();


var datatablattachBase64 = "";
// 文件删除
$(document).off("click", ".PersonPathDele_btn").on("click", ".PersonPathDele_btn", function () {
    //  修改删除获取id
    //先拿到点击的行号  
    var rowIndex = $(this).parents("tr").index();
    // console.log(staffChange_personnoRel_tblData)
    // console.log(rowIndex)
    staffChange_personnoRel_tblData.splice(rowIndex, 1);
    // console.log(staffChange_personnoRel_tblData)
    personnoRel_tableinitfun(staffChange_personnoRel_tblData);

});


// 无犯罪记录附件 预览
$(document).off("click", ".satffChangeView_PersonPath_btn").on("click", ".satffChangeView_PersonPath_btn", function () {
    // alert("预览"); //getFileBase64
    // docPath="+tempData.attachFilePath + "&sessionId="+sessionid
    // 获取当前行的base64路径
    var rowIndex = $(this).parents("tr").index();
    datatablattachBase64 = $('#personnoRel_table').DataTable().row(rowIndex).data().attachBase64;
    // console.log(datatablattachBase64);

    // console.log(datatablattachBase64)
    // console.log(datatablattachBase64.substring(datatablattachBase64.indexOf(',') + 1))
    datatablattachBase64 = datatablattachBase64.substring(datatablattachBase64.indexOf(',') + 1)
    // console.log(datatablattachBase64)
    var data = {
        "flags": "personPathpdf",
        "docpersonPath": datatablattachBase64
    }
    sessionStorage.setItem("viewer_data", JSON.stringify(data));
    window.open("../public/assets/libs/pdfjs/web/viewer.html", null, " height=1000px,width=1000px,  Left=300px,Top=20px, menubar=no,titlebar=no,scrollbar=no,toolbar=no, status=no,location=no")
    // showpdf_function();
})


// 自动计算年限
var staffChange_workcountfun = function () {
    var staffChange_workbdataCount = "", staffChange_workedataCount = '', staffChange_workcounts = "";
    staffChange_workbdataCount = $(".staffChange_workbdata").val();
    console.log(staffChange_workbdataCount)
    staffChange_workedataCount = staffChange_fwqDate;
    console.log(staffChange_workedataCount)
    if (staffChange_workbdataCount != "" && staffChange_workedataCount != "") {
        // console.log(Number(staffChange_workbdataCount))
        // console.log(Number(staffChange_workedataCount))
        // console.log((Number(staffChange_workedataCount) - Number(staffChange_workbdataCount)))
        staffChange_workcounts = Math.floor(((Number(staffChange_workedataCount) - Number(staffChange_workbdataCount)) / 10000))
        console.log(staffChange_workcounts)
        if (staffChange_workcounts < 0) {
            BootstrapDialog.show({
                type: BootstrapDialog.TYPE_WARNING,
                message: '工作时限开始日期不能小于当前日期！',
                title: "信息提示",
                closeByBackdrop: false, //不能通过点击其他部分关闭
                buttons: [{
                    cssClass: "btn-primary",
                    label: '确定',
                    action: function (dialogItself) {
                        dialogItself.close(); //可以认为是关闭的回调方法
                        $(".staffChange_workbdata ").focus();
                    }
                }]
            });
        } else {
            // $("#staffChange_workcount").val(staffChange_workcounts);
            // $(".staffChange_workcount").attr("disabled",true);
        }

    }
}

$(".staffChange_workedata").off("change").on("change", function () {
    if ($(".staffChange_workbdata").val() == "") {
        BootstrapDialog.show({
            type: BootstrapDialog.TYPE_WARNING,
            message: '请选择工作时限开始时间！',
            title: "信息提示",
            closeByBackdrop: false, //不能通过点击其他部分关闭
            buttons: [{
                cssClass: "btn-primary",
                label: '确定',
                action: function (dialogItself) {
                    dialogItself.close(); //可以认为是关闭的回调方法
                    $(".staffChange_workbdata").focus();
                }
            }]
        });
    }
    // staffChange_workcountfun();
})
$(".staffChange_workbdata").off("change").on("change", function () {
    if ($(".staffChange_workedata").val() != "") {
        // staffChange_workcountfun();
    }
})

// 籍贯民族判断
function staffChange_nationalityJGfun() {
    if ($("#nationality").val() == "CHN") {
        if ($("#staff_nativeplace").val() == "999999" && $("#staff_nativeplace").val() != "") {
            BootstrapDialog.show({
                type: BootstrapDialog.TYPE_WARNING,
                message: '内地居民,籍贯不能选择【 其他 】，请重新选择！',
                title: "信息提示",
                closeByBackdrop: false, //不能通过点击其他部分关闭
                buttons: [{
                    // cssClass: "btn-primary",
                    label: '确定',
                    action: function (dialogItself) {
                        dialogItself.close(); //可以认为是关闭的回调方法
                        $("#staff_nativeplace").val("").trigger("change");
                    }
                }]
            });
        }
    } else {
        if ($("#staff_nativeplace").val() != "999999" && $("#staff_nativeplace").val() != "") {
            BootstrapDialog.show({
                type: BootstrapDialog.TYPE_WARNING,
                message: '非内地居民，籍贯请选择 【 其他 】！',
                title: "信息提示",
                closeByBackdrop: false, //不能通过点击其他部分关闭
                buttons: [{
                    // cssClass: "btn-primary",
                    label: '确定',
                    action: function (dialogItself) {
                        dialogItself.close(); //可以认为是关闭的回调方法
                        $("#staff_nativeplace").val("").trigger("change");
                    }
                }]
            });
        }
    }
}

// 清空时间控件值
clearAll_beginvaliddateIptfun();

// 2018.10.28
// 当用工时间选择为无固定期合同时候，将用工时限和工作时限默认设置为2099.12.31

$("#staff_employmenttype").off("change").on("change", function () {
    $(".staff_datestartinfo").val("");
    $(".staff_dateendtinfo").val("");
    if ($(this).val() == "02") {
        $(".staff_dateendtinfo").val("无固定期");
        $(".staff_dateendtinfo").attr("disabled", true);
        $.stFromYear("staff_datestartinfo", null, null, null, ".staff_datestartinfo_Box");
        $(".staff_datestartinfo").data("daterangepicker").autoUpdateInput = true;

    } else {
        $(".staff_dateendtinfo").val("");
        $(".staff_dateendtinfo").removeAttr("disabled")

        $.stFromYear("staff_datestartinfo", "staff_dateendtinfo", "nomax", false, ".staff_datestartinfo_Box");
        $.stToYear("staff_datestartinfo", "staff_dateendtinfo", "nomin", false, ".staff_dateendtinfo_Box"); $(".staff_datestartinfo").data("daterangepicker").autoUpdateInput = true;
        $(".staff_dateendtinfo").data("daterangepicker").autoUpdateInput = true;
    }
})
// 2018.11.29
// 根据身份证信息自动回填 性别及其出生日期
$("#staff_passno").on("blur", function () {
    if ($("#staff_passtype").val() == "01") {
        var passnostr = $("#staff_passno").val();
        //15位身份证 
        // if (strId.length == 15) {
        //     //从ID NO 中截取生日6位数字，前面加上19 
        //     var idBirthday = "19" + strId.substr(6, 6);
        //     //日期字符串中的8位生日数字 
        //     var textBirthday = arr_date[0] + arr_date[1] + arr_date[2];
        //     if (idBirthday == textBirthday) {
        //         return true;
        //     } else {
        //         alert("出生日期与身份证日期不一致，请检查！");
        //         return false;
        //     }
        // }
        //18位身份证 
        if (passnostr.length == 18) {
            //从ID NO 中截取生日8位数字 
            var idBirthday = passnostr.substr(6, 8);
            $(".staff_basicInfo_bday").val(idBirthday);
            //从ID NO 中截取判断性别位数字 
            var idSexdata = passnostr.substr(14, 3);
            if (parseInt(idSexdata) % 2 == 0) {
                $("#staff_basicInfo_sex").val("2")
            }
            else {
                $("#staff_basicInfo_sex").val("1")
            }
        }
    }
})


