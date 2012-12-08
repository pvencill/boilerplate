var hbs = require('handlebars'),
	fs  = require('fs'),
	wrench = require('wrench'),
	path = require('path');



function expandTemplatesRecursive(dir, data){
	if(fs.existsSync(dir)){
		wrench.readdirRecursive(dir, expandTemplates(data));
	}
}

function expandTemplates(data){
	return function(err, files){
		console.log(files);
		if(files){
			files.forEach(template(data));
		}
	}
}

function template(data){
	return function (file){
		if(fs.existsSync(file) && path.extname(file) == '.template'){
			fs.readFile(file, 'utf-8', function(err,content){
				if(err) return console.error(err);

				var tmpl = hbs.compile(content);
				var output = tmpl(data);
				var outPath = path.join(path.dirname(file), path.basename(file,'.template'));
				fs.writeFile(outPath, output, 'utf-8', function(err){
					if(err) return console.error(err);
					console.log('Wrote template>', outPath);
					fs.unlink(file);
				});
			});
		}
	}
}

// todo: this should probably be in the first function
module.exports = function(location, data){
	if(!fs.existsSync(location)){
		console.log(location,'could not be found');
		return;
	}
	fs.stat(location, function(err,stat){
		if(stat.isDirectory()){
			expandTemplatesRecursive(location, data);
		}else{
			template(data)(location);
		}
	})
}
