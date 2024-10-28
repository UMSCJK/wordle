# wordle

后端基于ExpressJS的全栈Wordle游戏

## 中间件

### 判断单词是否存在

- 路由：GET `/api/exist` (Query)
- 示例请求URL
  - <http://127.0.0.1:8080/api/exist?lan=ru&wrd=тест>
  - <http://127.0.0.1:8080/api/exist?lan=en&wrd=chinglish>

### 对比单词

- 路由：GET `/api/compare` (Query)
- 示例请求URL：
  - <http://127.0.0.1:8080/api/compare?a=кино&g=кофе>

接受两个query参数`a`和`i`，分别为答案和猜测，传回对比结果对象。

`result`键的值为一个数组，表示每个字母的对比结果，支持三种值，分别表示：

| 值      | 意义                     |
| ------- | ------------------------ |
| `true`  | 对应字母存在，且位置正确 |
| `false` | 对应字母存在，但位置不对 |
| `null`  | 对应字母在原单词中不存在 |

#### 示例

- 完全正确：`кино`, `кино`

```json
{ // 返回数据
	"same": true, // 是否相同
	"input": ["кино", "кино"], // 答案、猜测
	"result": [true, true, true, true]
}
```

- 一般情况：`море`, `роса`

```json
{ // 返回数据
	"same": false, // 是否相同
	"input": ["море", "роса"], // 答案、猜测
	"result": [false, true, null, null]
}
```

- 单词长度不一样：`море`, `океан`

```json
{ // 返回数据
	"info": "Different lengths" // 报错信息
}
```

### 查找单词

- 路由：POST `/api/find` (Body)
- 示例Ajax请求：
```js
const conditions = []
$.ajax({
	url: '/api/find',
	type: 'POST',
	contentType: 'application/json; charset=utf-8',
	data: JSON.stringify(conditions),
	success: data => console.log(data)
})
```