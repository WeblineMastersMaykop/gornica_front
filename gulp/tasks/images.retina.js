import sharpResponsive from 'gulp-sharp-responsive'
import imagemin, { gifsicle, optipng } from 'gulp-imagemin'

export const images = () => {
	return app.gulp
		.src(app.path.src.images)
		.pipe(
			app.plugins.plumber(
				app.plugins.notify.onError({
					title: 'IMAGES',
					message: 'Error: <%= error.message %>',
				})
			)
		)
		.pipe(app.plugins.newer(app.path.build.images))
		.pipe(
			sharpResponsive({
				formats: [
					{
						format: 'webp',
						width: metadata => metadata.width * 0.5,
						webpOptions: { quality: 80 },
					},
					{
						format: 'webp',
						rename: { suffix: '@2x' },
						webpOptions: { quality: 80 },
					},
					{
						width: metadata => metadata.width * 0.5,
					},
					{
						rename: { suffix: '@2x' },
					},
				],
			})
		)
		.pipe(
			imagemin([optipng({ optimizationLevel: 5 }), gifsicle({ interlaced: true })], {
				verbose: true,
			})
		)
		.pipe(app.gulp.dest(app.path.build.images))

		.pipe(app.gulp.src(app.path.src.svg))
		.pipe(app.gulp.dest(app.path.build.images))

		.pipe(app.plugins.browsersync.stream())
}
