import imagemin, { gifsicle, mozjpeg, optipng } from 'gulp-imagemin'
import imageminWebp from 'imagemin-webp'
import rename from 'gulp-rename'

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
			imagemin([
				imageminWebp({
					quality: 80,
				}),
			])
		)
		.pipe(rename({ extname: '.webp' }))
		.pipe(app.gulp.dest(app.path.build.images))

		.pipe(app.gulp.src(app.path.src.images))
		.pipe(app.plugins.newer(app.path.build.images))
		.pipe(
			imagemin([mozjpeg({ quality: 80, progressive: true }), optipng({ optimizationLevel: 5 }), gifsicle({ interlaced: true })], {
				verbose: true,
			})
		)
		.pipe(app.gulp.dest(app.path.build.images))

		.pipe(app.gulp.src(app.path.src.svg))
		.pipe(app.gulp.dest(app.path.build.images))

		.pipe(app.plugins.browsersync.stream())
}
