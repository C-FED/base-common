## IE8一些常见的BUG

### JS
- js 采用 `ES5` 标准书写
- 使用 `jQuery` 1.x.x 版本，为了支持ie8
- 不要使用 `for in` 遍历数组，用 `$.each`
- 不要使用 `$("title").text("new title")` 操作 `title`，用原生 js 代替
```js
document.title="new title";
```
- 不要使用 `tbody.innerHTML=""` 修改 `table` ，使用 jQuery 方法代替
```js
$("tbody").html("");
```
- 用 `$.fn.data` 方法操作 `dataset`
```js
$("#el").data("some data");
```
- 不存在 `HTMLElement`，加入如下腻子脚本
```js
if (typeof HTMLElement !== "function") {
    window.HTMLElement = window.HTMLElement || Element;
}
```
- `URL` 带中文参数的，请一定编码后再使用
```js
var originLink="http://xxx.xxx.xxx/users?name="+encodeURIComponent("张三");
```

### HTML标签
- 严格按照标准的 `HTML` 规范书写
```html
<table>
    <thead>
        <tr>
            <th>序号</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td><a href="http://xxx.xxx.xxx/xxx">第二届贵州法学论坛文集</a></td>
            <td>贵州省法学会</td>
            <td>2001-08</td>
            <td>94</td>
        </tr>
    </tbody>
</table>
```
- 不使用 DOM0 级 事件绑定
```html
<!-- bad -->
<button onclick="searchName()">Search</button>
<!-- good -->
<button id="btn-search">Search</button>
<script>
    var $btnSearch=$("#btn-search");
    $btnSearch.on("click",searchName);
</script>
```

### CSS

- 最好不使用 CSS3 （或引入 ie-css3.htc，来支持）
