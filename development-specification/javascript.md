# Javascript 开发规范
> 这是一个开发规范，用于团队内部使用，为了愉快和谐开发，请严格遵守

## 命名规范

-  文件命名

- 文件夹名小写，多个单词用 “-” 分割   
`src`  
`front-end`  

- 文件名小写（除特殊文件大写），多个单词用 “_” 分割  
`index.js`  
`router_map.js`    
`LICENSE`  （特殊文件，名字全部大写）  
`README.md`  
`webpack.config.js` （配置文件以 x.config.x 命名）

-  代码命名

- 常量全部大写，多个单词用 “_” 分割  
```js
const USERNAME="yf";
const ROOT_PATH="/sso";
```
- 变量用小驼峰写法，（camelCase）  
```js
let name="yf";
let userAgent="chrome";
```
- 构造函数/类 ，用大驼峰写法，（PascalCase）
```js
function People() {
    // ......
}
class BrightAnimal {
    // ......
}
```
- 函数/方法，用动词+名词命名，并且使用小驼峰写法  
```js
// 获取所有用户列表
function getAllUsers() { /*......*/ }
// 生成随机颜色
function makeRandomColor() { /*......*/ }
// 图像转base64格式  “to、for” 等单词可以写为谐音数字
function img2Base64() { /*......*/ } 
// 为了初始化，删除XXX
function deleteInfo4Reset() { /*......*/ }
```

<table>
<thead>
<tr>
<th>动词</th>
<th>含义</th>
<th>返回值</th>
</tr>
</thead>
<tbody>
<tr>
<td>can</td>
<td>判断是否可执行某个动作 ( 权限 )</td>
<td>函数返回一个布尔值。true：可执行；false：不可执行</td>
</tr>
<tr>
<td>has</td>
<td>判断是否含有某个值</td>
<td>函数返回一个布尔值。true：含有此值；false：不含有此值</td>
</tr>
<tr>
<td>is</td>
<td>判断是否为某个值</td>
<td>函数返回一个布尔值。true：为某个值；false：不为某个值</td>
</tr>
<tr>
<td>get</td>
<td>获取某个值</td>
<td>函数返回一个非布尔值</td>
</tr>
<tr>
<td>set</td>
<td>设置某个值</td>
<td>无返回值、返回是否设置成功或者返回链式对象</td>
</tr>
</tbody>
</table>

## 代码规范

- 函数/方法参数不宜超过3个，超过按如下方式书写
```js
// 参数小于等于3个时
function sum(a,b) {return +a+b;}
function reduce(a,b,c) {return +a+b+c;}
// 参数大于3个时
/**
 * createElement
 * @param {string} name 
 * @param {object} options {id,className,onclick}
 * @param {Array<HTMLElement>|string} children
 */
function render(name,options,children) { /* ... */ }
/**
 * set-cookie
 * @param {string} key 
 * @param {string} val
 * @param {object} options {expires,domain,path}
 */
function setCookie(key,val,options) { /* ... */ }
```

- 避免全局命名空间污染  
```js
;(function($, w, d){
  'use strict';

  $(function() {
    w.alert(d.querySelectorAll('div').length);
  });
}(jQuery, window, document));
```

-  变量声明  
尽量将所有变量放到函数或文件顶部
```js 
let user;
let age;

function calcNum(a,b) {
    let initVal=0;
}
```

-  代码格式化   
编辑器自带格式化功能，格式化代码便于阅读，代码逻辑清晰，一目了然

-  Tab用2个空格代替
适应不同环境，保证不同编辑器打开代码的格式一致

-  不要省略分号
```js
let userAgent="chrome";
function sum(a,b) {
    return +a+b;
}
```

-  不要省略 `if else`（即便是只有一行） ，`for` 等语句的括号  
```js
if (a===1) {
    // ......
}
for (let i=0;i<2;i++) {
    // ......
}
function sum(a,b) {
    if (a===void 0 || b===void 0) {
        return a|| b || 0;
    }
    return +a+b;
}
```

-  不要使用 `for in` 遍历数组，原因[点击](https://www.cnblogs.com/jkj-jim/p/6389572.html)查看  

-  总是使用严格等判断  
总是使用 === 精确的比较操作符，避免在判断的过程中，由 JavaScript 的强制类型转换所造成的困扰
```js
+[]==[]; // true
+[2]==[2]; // true
null==undefined; // true
0==false; // true
```
-  永远不要使用 `eval`  
以下方式也不可取
```js
new Function("msg","alert(msg);");
setTimeout("search",3000);
setInterval("search",3000);
```

## 注释规范

-  变量声明/赋值，注释写在本行，与文字之间留一个空格
```js
let userAgent; // 浏览器标示
userAgent="chrome"; // 标示浏览器为chrome
```
-  函数/方法声明，注释写在前面，遵循 [javadoc](https://baike.baidu.com/item/javadoc) 要求
```js
/**
 * 格式化日期
 * @param {String} fmt 格式
 * @param {Date} date 日期
 * @returns {String} 
 */

function toFormatDate(fmt, date) { /*......*/ }

let singleton={
    /**
     * 格式化日期
     * @param {String} fmt 格式
     * @param {Date} date 日期
     * @returns {String} 
     */
    toFormatDate(fmt, date) { /*......*/ }
};

```

## 框架使用规范

-  Vue
- Vue 实例的 `this` 用 `vm` 命名的变量保存
- Vue `methods`，等方法和生命周期，不要用箭头函数声明

```js
new Vue({
    methods:{
        getUserList() {
            let vm=this;
        }
    },
    mounted() {
        this.getUserList();
    }
});
```

- Vue 逻辑判断复杂时用 `computed` 计算属性代替

```html
<template>
    <div>
        <h1 v-if="isTeacher">Only teacher can see that</h1>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                a:1,
                b:3,
            };
        },
        computed:{
            isTeacher(){
                return this.a===1 && this.b>2;
            }
        },
    }
</script>
```

- Vue `template` 模版必须且只有一个根元素
```html
<template>
    <div>
        <h1>{{msg}}</h1>
        <p>Hello Vue</p>
    </div>
</template>
```

- Vue 子组件的 使用 `v-for` 时 必须定义唯一的 `key` 属性
```html
<template>
    <ul>
        <li v-for="(item,n) in arr" v-bind:key="item.id">
            {{item.name}}
        </li>
    </ul>
</template>
```

- Vue 不要 `v-if` 和 `v-for` 一起用，可以用 `computed` 或 `filter` 处理后在进行遍历，[BUG复现](https://segmentfault.com/q/1010000015782628)，[原因](https://cn.vuejs.org/v2/guide/list.html#v-for-with-v-if)


- 标签上加 `v-cloak`，指令，防止页面加载时闪烁 `{{}}`
，或使用 `v-text`，`v-html` 代替
```html
<style>
[v-cloak] {
  display: none;
}
</style>

<!--div 不会显示，直到编译结束。--> 
<div v-cloak>
  {{ message }}
</div>
```

-  React

- 简单组件，无 `state`，用函数式声明方式
```jsx
function ThirdParty() {
    return <div>QQ</div>;
}
```

- 在 `constructor` 中绑定事件
```jsx
class AutoHomer extend React.Component{
    constructor(props) {
        super(props);
        this.openDoor=this.openDoor.bind(this);
    }
    openDoor() {
        // ......
    }
    render() {
        return (
            <div>
                <button onClick={this.openDoor}>Click me</button>
            </div>
        );
    }
}
```

-  jQuery
- 用变量保存 `DOM`
- 用 `$`开头命名 `jQuery` 变量
- 尽量用 id 选择器查询 `DOM`
```js
let $elShowListBox=$("#show-list-box");
```

## 兼容性问题


#### 参考  

https://github.com/airbnb/javascript  
https://github.com/bendc/frontend-guidelines#semicolons  
https://juejin.im/post/592d4a5b0ce463006b43b6da  
https://juejin.im/post/5be163f451882516f70929d8  
https://github.com/airbnb/javascript/tree/master/react  
https://zhuanlan.zhihu.com/p/20616464?columnSlug=FrontendMagazine 