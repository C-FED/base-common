# CSS 开发规范
> 这是一个开发规范，用于团队内部使用，为了愉快和谐开发，请严格遵守

## 命名规范
1. 选择器名全部小写
1. 选择器名全部用有意义英文单词或词组
1. 不采用 `id` 选择器、标签选择器（除 `reset.css` 之外）
1. 采用 [BEM](https://en.bem.info/methodology/css/) 命名法
```html
<!-- block__item--modifier -->
<!-- 块__子元素--修饰符 -->
<div class="article">
    <div class="article__body">
        <div class="tag"></div>
        <button  class="article__button--primary"></button>
        <button  class="article__button--success"></button>
    </div>
</div>
```

#### 参考 

https://en.bem.info/methodology/css/  