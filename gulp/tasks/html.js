import fileinclude from 'gulp-file-include'
import webpHTML from 'gulp-webp-retina-html'
import typograf from 'gulp-typograf'
import prettier from 'gulp-prettier'

export const html = () => {
	return (
		app.gulp
			.src(app.path.src.html)
			.pipe(
				app.plugins.plumber(
					app.plugins.notify.onError({
						title: 'HTML',
						message: 'Error: <%= error.message %>',
					})
				)
			)

			.pipe(fileinclude())
			.pipe(app.plugins.replace(/@img\//g, 'img/'))
			// .pipe(
			// 	typograf({
			// 		locale: ['ru', 'en-US'],
			// 		htmlEntity: { type: 'digit' },
			// 		safeTags: [
			// 			['<\\?php', '\\?>'],
			// 			['<no-typography>', '</no-typography>'],
			// 		],
			// 	})
			// )
			.pipe(
				webpHTML({
					extensions: ['jpg', 'jpeg', 'png', 'webp'],
					// retina: {
					// 	1: '',
					// 	2: '@2x',
					// },
				})
			)
			.pipe(
				prettier({
					useTabs: true,
					semi: false,
					singleQuote: true,
					arrowParens: 'avoid',
					printWidth: 155,
				})
			)
			.pipe(app.gulp.dest(app.path.build.html))
			.pipe(app.plugins.browsersync.stream())
	)
}
