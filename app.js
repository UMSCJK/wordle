const fs = require('fs'), path = require('path'), // 模块
	cors = require('cors'), express = require('express'),
	PORT = 8080, app = express(), // 常量
	db = { en: 'en.json', ru: 'ru.json' }

app.use(cors(), express.json())
app.use(express.static(path.join(__dirname, 'public')))

for (let lan in db) {
	const filePath = path.join(__dirname, 'db', db[lan])
	const dict = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
	db[lan] = {}
	for (let len in dict) {
		const re = new RegExp(`.{${Number(len)}}`, 'g')
		db[lan][len] = dict[len].toLowerCase().match(re) || []
	}
}

const compare = (ans, gue) => { // answer, guess
	if (ans.length !== gue.length) return []
	const a = ans.toLowerCase(), g = gue.toLowerCase(), diff = []
	for (let i = 0; i < a.length; i++) {
		diff.push(a[i] === g[i] ? 1 : a.includes(g[i]) ? 2 : 0)
	}
	return diff
}

const find = (lan, gue, sta, exc) => { // 语言 猜测 状态 排除
	let list = db[lan][gue.length.toString()]
	for (let e of exc) { list = list.filter(w => !w.includes(e)) } // exc
	return list.filter(w => compare(w, gue).join('') === sta)
}

app.get('/api/exist', (req, res) => {
	const { lan, wrd } = req.query
	res.send(db[lan][wrd.length.toString()].includes(wrd))
})

app.get('/api/compare', (req, res) => {
	const { a, g } = req.query
	res.json(a.length !== g.length ? { info: "Unequal len" } : {
		same: a === g, pair: { a: a, g: g }, diff: compare(a, g)
	})
})

app.get('/api/find', (req, res) => {
	const { lan, wrd, sta, exc = '' } = req.query
	res.json(find(lan, wrd, sta, exc.split('')))
})

app.listen(PORT, () => {
	console.clear()
	console.log(`Server is running on http://127.0.0.1:${PORT}`)
	// fs.writeFileSync('db.json', JSON.stringify(db, null, 4))
})