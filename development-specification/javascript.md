# Javascript 开发规范
> 这是一个开发规范，用于团队内部使用，为了愉快和谐开发，请严格遵守

## 命名规范

1. 文件命名

- 文件夹名小写，多个单词用 “-” 分割   
`src`  
`front-end`  

- 文件名小写（除特殊文件大写），多个单词用 “_” 分割  
`index.js`  
`router_map.js`    
`LICENSE`  （特殊文件，名字全部大写）  
`README.md`  
`webpack.config.js` （配置文件以 x.config.x 命名）

2. 代码命名

- 常量全部大写，多个单词用 “_” 分割  
```js
const USERNAME="yf";
const ROOT_PATH="/sso";
```
- 变量用小驼峰写法，（camelCase）  
```js
let name="yf";
let userAgent="chrome";
```
- 构造函数/类 ，用大驼峰写法，（PascalCase）
```js
function People() {
    // ......
}
class BrightAnimal {
    // ......
}
```
- 函数/方法，用动词+名词命名，并且使用小驼峰写法  
```js
// 获取所有用户列表
function getAllUsers() { /*......*/ }
// 生成随机颜色
function makeRandomColor() { /*......*/ }
// 图像转base64格式  “to、for” 等单词可以写为谐音数字
function img2Base64() { /*......*/ } 
// 为了初始化，删除XXX
function deleteInfo4Reset() { /*......*/ }
```

## 代码规范

1. 变量声明  
尽量将所有变量放到函数或文件顶部
```js 
let user;
let age;

function calcNum(a,b) {
    let initVal=0;
}
```

2. 代码格式化   
编辑器自带格式化功能，格式化代码便于阅读，代码逻辑清晰，一目了然

3. Tab用2个空格代替*
适应不同环境，不同编辑器打开代码的格式一致

4. 不要省略分号
```js
let userAgent="chrome";
function sum(a,b) {
    return +a+b;
}
```

5. 不要省略 `if else` ，`for` 等语句的括号  
```js
if (a===1) {
    // ......
}
for (let i=0;i<2;i++) {
    // ......
}
```

6. 不要使用 `for in` 遍历数组，原因[点击](https://www.cnblogs.com/jkj-jim/p/6389572.html)查看  


## 注释规范

1. 变量声明/赋值，注释写在本行
```js
let userAgent; // 浏览器标示
userAgent="chrome"; // 标示浏览器为chrome
```
2. 函数/方法声明，注释写在前面，遵循 [javadoc](https://baike.baidu.com/item/javadoc) 要求
```js
/**
 * 格式化日期
 * @param {String} fmt 格式
 * @param {Date} date 日期
 * @returns {String} 
 */

function toFormatDate(fmt, date) { /*......*/ }

let singleton={
    /**
     * 格式化日期
     * @param {String} fmt 格式
     * @param {Date} date 日期
     * @returns {String} 
     */
    toFormatDate(fmt, date) { /*......*/ }
};

```


## 兼容性问题

## 框架使用规范



#### 参考  

https://github.com/bendc/frontend-guidelines#semicolons  
https://juejin.im/post/592d4a5b0ce463006b43b6da  
https://juejin.im/post/5be163f451882516f70929d8  