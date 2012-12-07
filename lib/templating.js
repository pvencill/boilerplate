var hbs = require('handlebars'),
	fs  = require('fs'),
	wrench = require('wrench'),
	path = require('path');



function expandTemplatesRecursive(dir, data){
	if(fs.existsSync(dir)){
		wrench.readdirRecursive(dir, expandTemplates(data));
	}
}

// todo: skip directories on the blacklist
function expandTemplates(data){
	return function(files){
		if(files){
			files.forEach(template(data));
		}
	}
}

function template(data){
	return function (file){
		if(fs.existsSync(file) path.extname(file) == '.template')
		{
			fs.readFile(file, 'utf-8', function(err,content){
				if(err) return console.error(err);
				var tmpl = hbs.compile(content);
				var output = tmpl(data);
				var outPath = path.join(path.dirname(file), path.basename(file,'.template'));
				fs.writeFile(outPath, output, 'utf-8', function(err){
					if(err) return console.error(err);
					console.log('Wrote template>', outPath);
					fs.unlink(file);
				}
			});
		}
	}
}

// what to export?
