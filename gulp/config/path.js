import * as nodePath from 'path'
const rootFolder = nodePath.basename(nodePath.resolve())

const buildFolder = `./dist`
const srcFolder = `./src`

export const path = {
	build: {
		js: `${buildFolder}/js/`,
		css: `${buildFolder}/css/`,
		html: `${buildFolder}/`,
		images: `${buildFolder}/img/`,
		icons: `${buildFolder}/img/`,
		fonts: `${buildFolder}/fonts/`,
		files: `${buildFolder}/files/`,
		favicon: `${buildFolder}/favicon/`,
	},
	src: {
		js: `${srcFolder}/js/app.js`,
		images: [`${srcFolder}/img/**/*.{jpg,jpeg,png,svg,gif,webp}`, `!${srcFolder}/img/svgicons/**/*.*`],
		svg: [`${srcFolder}/img/**/*.svg`, `!${srcFolder}/img/svgicons/**/*.*`],
		icons: `${srcFolder}/img/svgicons/**/*.svg`,
		scss: `${srcFolder}/scss/*.scss`,
		css: `${buildFolder}/css/style.min.css`,
		html: `${srcFolder}/*.html`,
		files: `${srcFolder}/files/**/*.*`,
		favicon: `${srcFolder}/favicon/**/*.*`,
	},
	watch: {
		js: `${srcFolder}/js/**/*.js`,
		scss: `${srcFolder}/scss/**/*.scss`,
		html: `${srcFolder}/**/*.html`,
		images: [`${srcFolder}/img/**/*.{jpg,jpeg,png,svg,gif,webp}`, `!${srcFolder}/img/svgicons/**/*.*`],
		icons: `${srcFolder}/img/svgicons/**/*.svg`,
		files: `${srcFolder}/files/**/*.*`,
		favicon: `${srcFolder}/favicon/**/*.*`,
	},
	clean: buildFolder,
	buildFolder: buildFolder,
	srcFolder: srcFolder,
	rootFolder: rootFolder,
}
