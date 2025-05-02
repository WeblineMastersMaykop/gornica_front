import svgSprite from 'gulp-svg-sprite'

export const icons = () => {
	return app.gulp
		.src(app.path.src.icons)
		.pipe(
			app.plugins.plumber(
				app.plugins.notify.onError({
					title: 'ICONS',
					message: 'Error: <%= error.message %>',
				})
			)
		)
		.pipe(
			svgSprite({
				mode: {
					symbol: {
						sprite: '../sprite.symbol.svg',
					},
				},
				shape: {
					transform: [
						{
							svgo: {
								js2svg: { indent: 4, pretty: true },
								plugins: [
									{
										name: 'removeAttrs',
										params: {
											attrs: '(fill|stroke)',
										},
									},
								],
							},
						},
					],
				},
			})
		)
		.pipe(app.gulp.dest(app.path.build.icons))

		.pipe(app.plugins.browsersync.stream())
}
