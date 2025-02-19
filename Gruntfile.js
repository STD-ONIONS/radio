module.exports = function(grunt) {
	process.removeAllListeners('warning');

	const fs = require("node:fs"),
		path = require("node:path"),
		md5 = require("md5");

	require('load-grunt-tasks')(grunt);

	var pkg = grunt.file.readJSON('package.json'),
		version = (new Date()).getTime().toString();

	const md5_file2text = function(file = "") {
		file = path.normalize(path.join(__dirname, file));
		if(fs.existsSync(file)) {
			// Файл присутствует
			// Прочитать файл и получить его текст
			// Текст в MD5
			let text = fs.readFileSync(file).toString();
			return md5(text, {encoding: "utf-8"});
		} else {
			// Файл отсутствует
			return (new Date().getTime()).toString();
		}
	}
	grunt.initConfig({
		globalConfig: {},
		pkg: pkg,
		webfont: {
			main: {
				src: 'src/glyph/*.svg',
				dest: 'src/font',
				options: {
					engine: 'node',
					hashes: true,
					destLess: 'src/less/fonts',
					relativeFontPath: "/fonts/",
					font: 'radioapp',
					types: 'ttf',
					fontFamilyName: 'Radio App',
					stylesheets: ['less'],
					syntax: 'bootstrap',
					execMaxBuffer: 1024 * 400,
					htmlDemo: false,
					version: '1.0.0',
					normalize: true,
					startCodepoint: 0xE900,
					iconsStyles: false,
					autoHint: false,
					templateOptions: {
						baseClass: '',
						classPrefix: 'icon-'
					},
					template: 'src/radioapp.less'
				}
			}
		},
		ttf2woff2: {
			main: {
				src: ["src/font/*"],
				dest: "docs/fonts",
			},
		},
		less: {
			components: {
				options: {
					compress: false,
					ieCompat: false,
					plugins: [],
					data: function(dest, src) {
						return {
							"hash": version,
						}
					}
				},
				files: {
					'src/css/radiostation.css': [
						'src/less/radiostation.less',
					],
					'docs/css/main.css': [
						'src/less/main.less'
					],
				}
			},
		},
		cssmin: {
			options: {
				mergeIntoShorthands: false,
				roundingPrecision: -1
			},
			components: {
				files: {
					'src/css/radiostation.css': [
						'src/css/radiostation.css'
					],
					'docs/css/main.css': [
						'docs/css/main.css'
					],
				}
			},
		},
		pug: {
			components: {
				options: {
					pretty: '',
					separator: '',
				},
				files: [{
					expand: true,
					cwd: 'src/pug/components/',
					src: '*.pug',
					dest: 'src/test/',
					filter: 'isFile',
					ext: '.html',
				}],
			},
			main: {
				options: {
					pretty: '',
					separator: '',
					data: function(dest, src) {
						return {
							"hash": version,
							"hash_station": md5_file2text(`docs/js/radiostation.js`),
							"hash_main": md5_file2text(`docs/js/main.js`),
							"hash_css": md5_file2text(`docs/css/main.css`),
						}
					}
				},
				files: [{
					expand: true,
					cwd: 'src/pug/',
					src: '*.pug',
					dest: 'docs/',
					filter: 'isFile',
					ext: '.html',
				}],
			}
		},
		replace: {
			components: {
				options: {
					patterns: [
						{
							match: /%template%/g,
							replacement: fs.readFileSync('src/test/radiostation.html').toString()
						},
					]
				},
				files: [
					{
						expand: true,
						flatten : true,
						src: [
							'src/js/components/radiostation.js'
						],
						dest: 'docs/js/',
						filter: 'isFile'
					},
				]
			},
			main: {
				options: {
					patterns: [
						{
							match: /content:"(e\d+)"/g,
							replacement: `content:"\\\\$1"`
						}
					]
				},
				files: [
					{
						expand: true,
						flatten : true,
						src: [
							'docs/js/radiostation.js'
						],
						dest: 'docs/js/',
						filter: 'isFile'
					},
				]
			}
		},
		uglify : {
			options: {
				ASCIIOnly: true,
				compress: false,
				//beautify: true
			},
			components: {
				files: {
					'docs/js/radiostation.js': [
						'docs/js/radiostation.js',
					],
					'docs/js/main.js': [
						'src/js/main.js',
					],
				},
			},
		},
	});
	grunt.registerTask(
		'default',
		[
			// Fonts
			/**
			 * Создание шрифта
			 * 
			 * После первого запуска закомментировать
			 * Если добавили глифы - раскомментировать.
			 * На следующий запуск - закомментировать
			 */
			
			//"webfont",

			/**
			 * Конвертирование шрифтов ttf в woff2
			 * 
			 * После первого запуска закомментировать
			 * Если добавили или изменили шрифт через webfont - раскомментировать.
			 * На следующий запуск - закомментировать
			 */

			//"ttf2woff2",

			// Components
			"less:components",
			"cssmin:components",
			"pug:components",
			"replace:components",

			// Application
			"uglify:components",
			"replace:main",
			"pug:main",
		]
	);
}