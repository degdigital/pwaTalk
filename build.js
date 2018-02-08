const uglifyJS = require('uglify-es');
const path = require('path');
const fs = require('fs-extra');
const dir = require('node-dir');
const postcss = require('postcss');

const buildCSS = () => {
	const cssSourceFilepath = './source/css/main.css';
	const cssDestFilepath = './public/css/main.css';

	const plugins = [
		require('postcss-import'),
		require('postcss-custom-properties'),
		require('postcss-custom-media'),
		require('postcss-responsive-type'),
		require('postcss-nested'),
		require('autoprefixer'),
		require('csswring')
	];

	ensureDir(path.dirname(cssDestFilepath));

	fs.readFile(cssSourceFilepath)
		.then(contents =>
			postcss(plugins).process(contents, {
				from: cssSourceFilepath,
				to: cssDestFilepath
			})
		)
		.then(result => fs.writeFile(cssDestFilepath, result.css));
}

const buildJS = () => {
	const jsSourceDirPath = path.normalize('./source/js');
	const jsDestDirPath = path.normalize('./public/js');

	dir.readFiles(jsSourceDirPath,
	    function(err, content, filename, next) {
	    	const destFilepath = getDestinationFilepath(jsDestDirPath, path.relative(jsSourceDirPath, filename));
	    	minifyJSFile(destFilepath, content);
	    	next();
	    });
}

const getDestinationFilepath = (basePath, filepath) => path.resolve(basePath, filepath);

const minifyJSFile = (filepath, fileContent) => {
	const output = uglifyJS.minify(fileContent);

	ensureDir(path.dirname(filepath));
	fs.writeFile(filepath, output.code);
}

const ensureDir = dirName => {
	if (!fs.existsSync(dirName)){
    	fs.mkdirSync(dirName);
	}
}

const buildImages = () => {
	const htmlSourceDirPath = './source/images/';
	const htmlDestDirPath = './public/images/';

	fs.copy(htmlSourceDirPath, htmlDestDirPath);
}

const buildMisc = () => {
	const files = [
		'index.html',
		'manifest.json',
		'slides.json'
	];

	files.forEach(file => {
		const sourceFilepath = path.resolve('./source', file);
		const destFilepath = path.resolve('./public', file);

		fs.copy(sourceFilepath, destFilepath);
	});
}

buildCSS();
buildJS();
buildImages();
buildMisc();