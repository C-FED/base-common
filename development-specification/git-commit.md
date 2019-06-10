## git 提交规范


### Commit message 的格式

每次提交，Commit message 都包括三个部分：Header，Body 和 Footer。
```
<type>(<scope>): <subject>
// 空一行
<body>
// 空一行
<footer>
```

其中，Header 是必需的，Body 和 Footer 可以省略


Header部分只有一行，包括三个字段：type（必需）、scope（可选）和subject（必需）。

（1）type

type用于说明 commit 的类别，只允许使用下面7个标识。
```
feat：新功能（feature）
fix：修补bug
docs：文档（documentation）
style： 格式（不影响代码运行的变动）
refactor：重构（即不是新增功能，也不是修改bug的代码变动）
test：增加测试
chore：构建过程或辅助工具的变动
```

（2）scope

scope用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。

（3）subject

subject是 commit 目的的简短描述，不超过50个字符。

### Commit Example

```
feat(index)：新增 index 页面的XXX功能
fix(navi)：修补 navi 页面的bug
docs：新增开发文档
style(index)： 修复 index 页面的样式
refactor(index.js)：重构 index.js 代码
test：增加测试
chore：构建工具由 webpack 转为 rollup
```


### git 分支命名规范


|分支|		命名|		说明|
|:--:|:--:|:--:|
|主分支|		master		|主分支，所有提供给用户使用的正式版本，都在这个主分支上发布|
|开发分支|		dev 		|开发分支，永远是功能最新最全的分支|
|功能分支|		feature-*	|新功能分支，某个功能点正在开发阶段|
|发布版本|		release-* |发布定期要上线的功能|
|修复分支|		bug-*		|修复线上代码的 bug|




### 参考 

http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html
