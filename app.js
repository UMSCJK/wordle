const [express, path, cors] = [ // 引入模块
	require('express'),
	require('path'),
	require('cors')
]
const PORT = 8080 // 设置监听端口
const app = express() // 声明app

app.use(cors(), express.json())
app.use(express.static(path.join(__dirname, 'static')))

app.get('/', (req, res) => {
	res.send('Hello World!')
})

app.listen(PORT, () => {
	console.clear()
	console.log(`Server is running on http://127.0.0.1:${PORT}`)
})