(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e8fe4"],{"8c47":function(e,r,s){"use strict";s.r(r);var t=function(){var e=this,r=e.$createElement,s=e._self._c||r;return s("div",{staticClass:"app-container"},[s("el-row",{attrs:{gutter:20}},[s("el-col",{attrs:{span:12,offset:6}},[s("div",{staticClass:"grid-content bg-purple"},[s("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,"status-icon":"",rules:e.rules,"label-width":"100px"}},[s("el-form-item",{attrs:{label:"原密码",prop:"oldPass"}},[s("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:e.ruleForm.oldPass,callback:function(r){e.$set(e.ruleForm,"oldPass",r)},expression:"ruleForm.oldPass"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"新密码",prop:"pass"}},[s("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:e.ruleForm.pass,callback:function(r){e.$set(e.ruleForm,"pass",r)},expression:"ruleForm.pass"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"确认密码",prop:"checkPass"}},[s("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:e.ruleForm.checkPass,callback:function(r){e.$set(e.ruleForm,"checkPass",r)},expression:"ruleForm.checkPass"}})],1),e._v(" "),s("el-form-item",[s("div",{staticClass:"flex jc-between"},[s("el-button",{attrs:{type:"primary"},on:{click:function(r){return e.submitForm("ruleForm")}}},[e._v("提交")]),e._v(" "),s("el-button",{on:{click:function(r){return e.resetForm("ruleForm")}}},[e._v("重置")])],1)])],1)],1)])],1)],1)},o=[],l={data:function(){var e=this,r=function(e,r,s){""===r&&s(new Error("请输入旧密码"))},s=function(r,s,t){""===s?t(new Error("请输入新密码")):(""!==e.ruleForm.checkPass&&e.$refs.ruleForm.validateField("checkPass"),t())},t=function(r,s,t){""===s?t(new Error("请再次输入新密码")):s!==e.ruleForm.pass?t(new Error("两次输入密码不一致!")):t()};return{ruleForm:{oldPass:"",pass:"",checkPass:""},rules:{oldPass:[{validator:r,trigger:"blur"}],pass:[{validator:s,trigger:"blur"}],checkPass:[{validator:t,trigger:"blur"}]}}},methods:{submitForm:function(e){this.$refs[e].validate((function(e){if(!e)return console.log("error submit!!"),!1;alert("submit!")}))},resetForm:function(e){this.$refs[e].resetFields()}}},a=l,u=s("2877"),n=Object(u["a"])(a,t,o,!1,null,null,null);r["default"]=n.exports}}]);