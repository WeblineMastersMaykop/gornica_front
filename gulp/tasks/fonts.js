import fs from 'fs'
import fonter from 'gulp-fonter'
import ttf2woff2 from 'gulp-ttf2woff2'

export const otfToTtf = () => {
	// Поиск файлов шрифтов .otf
	return (
		app.gulp
			.src(`${app.path.srcFolder}/fonts/*.otf`, {})
			.pipe(
				app.plugins.plumber(
					app.plugins.notify.onError({
						title: 'FONTS',
						message: 'Error: <%= error.message %>',
					})
				)
			)
			// Конвертация в .ttf
			.pipe(
				fonter({
					formats: ['ttf'],
				})
			)
			//Выгрузка в исходную папку
			.pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
	)
}

export const ttfToWoff = () => {
	// Поиск файлов шрифтов .ttf
	return (
		app.gulp
			.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
			.pipe(
				app.plugins.plumber(
					app.plugins.notify.onError({
						title: 'FONTS',
						message: 'Error: <%= error.message %>',
					})
				)
			)
			// Конвертация в .woff
			.pipe(
				fonter({
					formats: ['woff'],
				})
			)
			//Выгрузка в папку с результатом
			.pipe(app.gulp.dest(`${app.path.build.fonts}`))
			// Поиск файлов .ttf
			.pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
			// Конвертация в .woff2
			.pipe(ttf2woff2())
			//Выгрузка в папку с результатом
			.pipe(app.gulp.dest(`${app.path.build.fonts}`))
	)
}

export const fontsStyle = () => {
	// Файл стилей подключения шрифтов
	let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`
	// Проверка существования файлов шрифтов
	fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
		if (fontsFiles) {
			// Проверка существования файла стилей для подключения шрифтов
			if (!fs.existsSync(fontsFile)) {
				// Если файла нет, он создаётся
				fs.writeFile(fontsFile, '', cb)
				let newFileOnly
				for (var i = 0; i < fontsFiles.length; i++) {
					// Запись подключения шрифтов в файл стилей
					let fontFileName = fontsFiles[i].split('.')[0]
					if (newFileOnly !== fontFileName) {
						let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName
						let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName
						if (fontWeight.toLowerCase() === 'thin') {
							fontWeight = 100
						} else if (fontWeight.toLowerCase() === 'extralight') {
							fontWeight = 200
						} else if (fontWeight.toLowerCase() === 'light') {
							fontWeight = 300
						} else if (fontWeight.toLowerCase() === 'medium') {
							fontWeight = 500
						} else if (fontWeight.toLowerCase() === 'semibold') {
							fontWeight = 600
						} else if (fontWeight.toLowerCase() === 'bold') {
							fontWeight = 700
						} else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
							fontWeight = 800
						} else if (fontWeight.toLowerCase() === 'black') {
							fontWeight = 900
						} else {
							fontWeight = 400
						}

						fs.appendFile(
							fontsFile,
							`@font-face{\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`,
							cb
						)
						newFileOnly = fontFileName
					}
				}
			} else {
				console.log('Удалите scss/fonts.scss, если добавляли новые шрифты')
			}
		}
	})

	return app.gulp.src(`${app.path.srcFolder}`)
	function cb() {}
}
