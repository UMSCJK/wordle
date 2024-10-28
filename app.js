const fs = require('fs'), // 导入模块
	path = require('path'),
	cors = require('cors'),
	express = require('express')

const PORT = 8080, // 常量
	app = express(),
	db = { en: 'en.json', ru: 'ru.json' }

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

for (let lan in db) {
	const filePath = path.join(__dirname, 'db', db[lan]),
		str = fs.readFileSync(filePath, 'utf-8'),
		dict = JSON.parse(str)
	db[lan] = {}
	for (let len in dict) {
		const re = new RegExp(`.{${Number(len)}}`, 'g')
		db[lan][len] = dict[len].toLowerCase().match(re) || []
	}
}

// DEBUG: Write db into db.json
// fs.writeFileSync('db.json', JSON.stringify(db, null, 4))

// Route list
app.get('/', (req, res) => res.send('Hello World!'))

app.get('/api/exist', (req, res) => { // 检测单词是否存在
	const { lan, wrd } = req.query
	const len = wrd.length.toString()
	res.send(db[lan][len].includes(wrd))
})

app.get('/api/compare', (req, res) => { // 对比两个单词
	const a = req.query.a.toLowerCase()
	const g = req.query.g.toLowerCase()
	if (a.length !== g.length) { // 错误处理：若长度不一样
		res.json({ info: "Different lengths" })
	} else {
		let result = new Array(a.length).fill(undefined)
		for (let i = 0; i < g.length; i++) {
			if (a[i] === g[i]) {
				result[i] = true
			} else if (a.includes(g[i])) {
				result[i] = false
			} else {
				result[i] = null
			}
		}
		res.json({
			same: a === g,
			input: [a, g],
			result: result
		})
	}
})

app.post('/api/find', (req, res) => { // 返回符合条件的词表
	// TODO: 使用req.body，先写文档
	// https://wordfinder.co/wordle-solver
})

app.listen(PORT, () => {
	console.clear()
	console.log(`Server is running on http://127.0.0.1:${PORT}`)
})