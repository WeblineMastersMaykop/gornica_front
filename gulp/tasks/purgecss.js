import purgecss from 'gulp-purgecss'

export const purgethecss = () => {
	return app.gulp
		.src(app.path.src.css)
		.pipe(
			app.plugins.plumber(
				app.plugins.notify.onError({
					title: 'SCSS',
					message: 'Error: <%= error.message %>',
				})
			)
		)
		.pipe(
			app.plugins.if(
				app.isBuild,
				purgecss({
					content: ['./dist/**/*.html', './dist/**/*.js'],
					variables: true,
				})
			)
		)
		.pipe(app.gulp.dest(app.path.build.css))
}
