# wordle

后端基于ExpressJS的全栈Wordle游戏，灵感：
- <https://wordly.org/ru>
- <https://wordfinder.co/wordle-solver>

## 中间件

以下值适用于整个项目

| 值           | 意义                                |
| ------------ | ----------------------------------- |
| `0`或`null`  | 占位符 ~~对应字母在原单词中不存在~~ |
| `1`或`true`  | 对应字母存在，且位置正确            |
| `2`或`false` | 对应字母存在，但位置不对            |

### 判断单词是否存在

- 路由：GET `/api/exist` (Query)
- 示例请求URL
  - <http://127.0.0.1:8080/api/exist?lan=ru&wrd=тест>
  - <http://127.0.0.1:8080/api/exist?lan=en&wrd=chinglish>

### 对比单词

- 路由：GET `/api/compare` (Query)
- 示例请求URL：
  - <http://127.0.0.1:8080/api/compare?a=кино&g=окно>

接受两个query参数`a`和`i`，分别为答案和猜测，传回对比结果对象。

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
- 示例请求URL：
  - <http://127.0.0.1:8080/api/find?lan=ru&wrd=окно&sta=2211&exc=>
<!-- - 示例Ajax请求：
```js
const conditions = {
	lan: 'ru',
	word: 'окно',
	state: [null, false, true, true],
	exc: ['ф', 'е']
}
$.post('/api/find', conditions, (res) => {
	console.log(res)
}, 'json')
``` -->