## form-validation

## 原子项

### 非空

```js

str.trim()!=='';

```

### 特殊字符

- 不能输入 “< > /  \”

```js

/[<>\/\\]+/

```

### 数字

```js

/^\d+$/

```



## 基础验证

### 用户名

- 非空
- 4到16位（字母，数字，下划线，减号）

```js

/^[a-zA-Z0-9_-]{4,16}$/

```


### 密码

- 6到8位（字母、数字）

```js

/^[a-zA-Z0-9]{6,8}$/

```

### 密码 增强验证

- 不能重复出现2次以上

```js

/(\w)\1{2}/

```


- 至少包活1个字母，1个数字

```js

/(\d[a-zA-Z])|([a-zA-Z]\d){1,}/

```



### 邮箱 


```js

/^\w+@\w+\.\w{2,4}$/

```



### 手机号

- 130 0000 0000 -> 199 9999 9999

```js

/^1[3-9][0-9]\d{8}$/

```

### 验证码

- 4位（数字、字母）

```js

/^[a-zA-Z0-9]{4}$/

```




