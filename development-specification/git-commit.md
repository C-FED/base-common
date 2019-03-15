# git 提交规范


## Commit message 的格式

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



#### 参考 

http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html