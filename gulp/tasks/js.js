import babel from 'gulp-babel'
import webpack from 'webpack-stream'
import TerserPlugin from 'terser-webpack-plugin'

export const js = () => {
	return app.gulp
		.src(app.path.src.js)
		.pipe(
			app.plugins.plumber(
				app.plugins.notify.onError({
					title: 'JS',
					message: 'Error: <%= error.message %>',
				})
			)
		)
		.pipe(babel())
		.pipe(
			webpack({
				entry: {
					app: './src/js/app.js',
					map: './src/js/map.js',
					mapdealers: './src/js/mapdealers.js',
					bootstrap: './src/js/bootstrap.js',
				},
				output: {
					filename: '[name].js',
					path: '/dist/js',
				},
				mode: 'production',
				optimization: {
					usedExports: true,
					minimize: true,
					minimizer: [
						new TerserPlugin({
							terserOptions: {
								format: {
									comments: false,
								},
							},
							extractComments: false,
						}),
					],
				},
				devtool: app.isDev ? 'source-map' : undefined,
			})
		)
		.pipe(app.gulp.dest(app.path.build.js))
		.pipe(app.plugins.browsersync.stream())
}
