//#region Dark mode switcher
const ls = localStorage
const pcs = matchMedia("(prefers-color-scheme: dark)").matches
const changeTheme = theme => {
	$('html').attr('data-bs-theme', theme)
	$('#drop-light, #drop-dark').removeClass('active')
	$(`#drop-${theme}`).addClass('active')
	ls.setItem('theme', theme)
	// console.log(`Theme: ${ls.getItem('theme')}`)
}

$('#drop-light').click(() => changeTheme('light'))
$('#drop-dark').click(() => changeTheme('dark'))

changeTheme(ls.getItem('theme') || (!pcs ? 'light' : 'dark'))
//#endregion

$('#input>div>button>input').on('input', function () {
	$(this).val($(this).val().toUpperCase())
	console.log($(this).val().toUpperCase())
})