# API接口 开发规范
> 这是一个开发规范，用于团队内部使用，为了愉快和谐开发，请严格遵守

## 命名规范

- 最好统一下返回的 `json` 格式，如下
```json
// 成功返回
{
    success: true,
    results: []
}
// 失败返回
{
    success: false,
    message: ""
}
```

- 最好统一下返回字段的命名方式，如下（小驼峰）
```json
{
    success: true,
    results: [
        {
            name:"zhangh",
            id:"123",
            pId:"1",
            userDetail:"XXX"
        }
    ]
}
```

- 不要将错误 `throw` 出到响应体
```json
// 失败返回
{
    success: false,
    message: "出错原因写到这里"
}
```

#### 参考  

