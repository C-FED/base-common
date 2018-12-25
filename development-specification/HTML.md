# HTML 开发规范
> 这是一个开发规范，用于团队内部使用，为了愉快和谐开发，请严格遵守

## 命名规范

1. 标签名全部小写（除React JSX外）
```html
<header></header>
<h1></h1>
```

## 标签规范

1. 标签的属性必须用单引号、双引号包裹
```html
<a href="http://xxx.xxx.xxx">Link</a>
```
2. 最好不要使用内联样式，用 `class` 代替
```html
<span class="tool-tip"></span>
```
3. 一定要声明文档类型（推荐HTML5），[原因](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Quirks_Mode_and_Standards_Mode)
```html
<!DOCTYPE html>
```
4. CSS外联文件放置到 `head` 里，Javascript外联文件放置到 `body` 结束标签之前（这里考虑到 IE 浏览器，所有js按这个位置放置）
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
    <!-- css放置位置 -->
    <link rel="stylesheet" href="ui.css" />
    <link rel="stylesheet" href="main.css" />
  </head>
  <body>
    <div id="app">...</div>
    <!-- js放置位置 -->
    <script src="axios.js"></script>
    <script src="vue.js"></script>
    <script src="main.js"></script>
  </body>
</html>
```
5. 使用语义化的标签，不要滥用 `div`，`span` 
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
    <link rel="stylesheet" href="main.css" />
  </head>
  <body>
    <div id="app">
        <header>
            <nav>
                <ul>
                    <li class="nav-item"><a href="#home">Home</a></li>
                    <li class="nav-item"><a href="#news">News</a></li>
                    <li class="nav-item"><a href="#about">About</a></li>
                </ul>
            </nav>
        </header>
        <article>
            <section>...</section>
            <section>...</section>
        </article>
        <footer>
            <p>Copy right</p>
        </footer>
    </div>
    <!-- js放置位置 -->
    <script src="main.js"></script>
  </body>
</html>
```
6. `img` 标签的 `alt` 属性不要为空，给 `img` 标签添加容错函数
```html
<img id="img-dw" alt="下载" src="/images/download.gif" />
<script>
    let imgDwEl=document.getElementById("img-dw");
    imgDwEl.addEventListener("error",function (){
        this.src="/images/EMPTY.png"; // 替换图片
    });
</script>
```

7. 最好严格按照 [XHTML](http://www.w3school.com.cn/xhtml/index.asp) 标准书写标签
```html
<meta charset="UTF-8" />
<table>
    <thead>
        <tr>
            <th>动词</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>can</td>
            <td>判断是否可执行某个动作 ( 权限 )</td>
            <td>函数返回一个布尔值。true：可执行；false：不可执行</td>
        </tr>
    </tbody>
</table>
```

8. 结构、表现、行为三者分离  
尽量在文档和模板中只包含结构性的 HTML；而将所有表现代码，移入样式表中；将所有动作行为，移入脚本之中。

#### 参考 

https://www.css88.com/archives/1668  
https://www.cnblogs.com/fliu/articles/5244866.html