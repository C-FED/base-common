# Javascript 开发规范
> 这是一个开发规范，用于团队内部使用，为了愉快和谐开发，请严格遵守

## 命名规范

1. 文件命名

- 文件夹名小写，多个单词用 “-” 分割   
`src`  
`front-end`  

- 文件名小写（除特殊文件大写），多个单词用 “_” 分割  
`index.js`  
`router_map.js`    
`LICENSE`  （特殊文件，名字全部大写）  
`README.md`  
`webpack.config.js` （配置文件以 x.config.x 命名）

2. 代码命名

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

## 代码规范

1. 变量声明  
尽量将所有变量放到函数或文件顶部
```js 
let user;
let age;

function calcNum(a,b) {
    let initVal=0;
}
```

2. 代码格式化   
编辑器自带格式化功能，格式化代码便于阅读，代码逻辑清晰，一目了然

3. Tab用2个空格代替
适应不同环境，保证不同编辑器打开代码的格式一致

4. 不要省略分号
```js
let userAgent="chrome";
function sum(a,b) {
    return +a+b;
}
```

5. 不要省略 `if else` ，`for` 等语句的括号  
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

6. 不要使用 `for in` 遍历数组，原因[点击](https://www.cnblogs.com/jkj-jim/p/6389572.html)查看  


## 注释规范

1. 变量声明/赋值，注释写在本行，与文字之间留一个空格
```js
let userAgent; // 浏览器标示
userAgent="chrome"; // 标示浏览器为chrome
```
2. 函数/方法声明，注释写在前面，遵循 [javadoc](https://baike.baidu.com/item/javadoc) 要求
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

1. Vue
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

2. React

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

3. jQuery
- 用变量保存 `DOM`
- 用 `$`开头命名 `jQuery` 变量
- 尽量用 id 选择器查询 `DOM`
```js
let $elShowListBox=$("#show-list-box");
```

## 兼容性问题


#### 参考  

https://github.com/bendc/frontend-guidelines#semicolons  
https://juejin.im/post/592d4a5b0ce463006b43b6da  
https://juejin.im/post/5be163f451882516f70929d8  
https://github.com/airbnb/javascript/tree/master/react  
https://zhuanlan.zhihu.com/p/20616464?columnSlug=FrontendMagazine 