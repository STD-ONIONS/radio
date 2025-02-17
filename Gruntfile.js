module.exports = function(grunt) {
	process.removeAllListeners('warning');

	const fs = require("node:fs");

	require('load-grunt-tasks')(grunt);

	var pkg = grunt.file.readJSON('package.json');
	//fs.readFileSync('tpl/component.html');
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
					plugins: [
						
					],
					data: function(dest, src) {
						return {
							"hash": uniqid(),
						}
					}
				},
				files: {
					'src/css/radiostation.css': [
						'src/less/radiostation.less',
					]
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
					]
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
		},
		replace: {
			components: {
				options: {
					patterns: [
						{
							match: /%template%/g,
							replacement: fs.readFileSync('src/test/radiostation.html').toString()
						}
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
				},
			},
		},
	});
	grunt.registerTask(
		'default',
		[
			// Font`s create && convert
			//"webfont",
			"ttf2woff2",
			// Components
			"less:components",
			"cssmin:components",
			"pug:components",
			"replace:components",
			"uglify:components",
			// Application
		]
	);
}