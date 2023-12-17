// ==UserScript==
// @author       longxiaokong
// @match        https://www.wjx.top/*
// @match        https://www.wjx.cn/*
// @match        https://wenjuan.shanghaitech.edu.cn/*
// @require      https://cdn.staticfile.org/jquery/3.4.1/jquery.min.js
// ==/UserScript==

// 请在以上区域自行增加@match语句以增加脚本可用网站。
/*
**info 第一个参数:匹配的标题（正则表达式）
**info 第二个参数:对应的填入选项（字符串）
**info 第三个参数:(可选)，当答题框为单选时匹配的选项（正则表达式）
*/
(function() {
    'use strict';
    $('head').append($('<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.1/jquery.min.js"></script>')); // 引入jquery
    const info=[ // 匹配语料和答案的区域
        [/是否已完成组队/,"是",/是/],
        [/第一位队员/,"111"],
        [/第二位队员/,"222"],
        [/第三位队员/,"333"],
        [/选择一个没选满/,"",/选择题目一/],
    ];
    const ini={
        module:".ui-field-contain",
        title:".topichtml",
        type:{
           "input_text":".ui-input-text", //查找文本题，随问卷星更新ui而改变，如果脚本失效请自行f12查看元素更新。
           "radio":".ui-controlgroup", //查找单选题，随问卷星更新ui而改变，如果脚本失效请自行f12查看元素更新。
        }
    };
    $(document).ready(function(){
        $(ini.module).each(function(){
            let title=$(this).find(ini.title).text();
            let No=$(this).find(".topicnumber").text()-0; //查找题号。随问卷星更新ui而改变，如果脚本失效请自行f12查看元素更新。
            for(let i=0;i<info.length;i++){
                if(info[i][0].test(title)){
                   for(let tp in ini.type){
                       let dom=$(this).find(ini.type[tp]);
                       if(dom.length>0){
                           switch(tp){
                               case "input_text":
                                   $("#q"+No).val(info[i][1]);
                                   break;
                               case "radio":
                                   $(this).find(".ui-radio").each(function(){
                                       if(info[i].length>=3&&info[i][2].test($(this).text())){
                                           $(this).click();
                                       }
                                   })
                                   break;
                               default:alert("ini.type中没有匹配"+tp+"的键值");
                           }
                           break;
                       }
                   }
                    break;
                }
            }
        });
        // $('.submitbtn').click(); // 自动点击提交，不建议，有智能检测，反而卡时间。
    });
})();