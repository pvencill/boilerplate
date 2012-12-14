var hbs = require('handlebars'),
	fs  = require('fs'),
	wrench = require('wrench'),
	path = require('path');



function expandTemplatesRecursive(dir, data, cb){
	fs.exists(dir, function(exists){
		if(exists){
			wrench.readdirRecursive(dir, expandTemplates(data, cb));
		}else{
			cb('Could not find',dir);
		}
	});
}

function expandTemplates(data, cb){
	return function(err, files){
		if(err) return cb(err);
		if(files){
			var count = files.length;
			files.forEach(template(data, function(err,data){
				if(err) return cb(err);
				count--
				if(count == 0)
					cb(null);
			}));
		}
	}
}

function template(data, cb){
	return function (file){
		if(fs.existsSync(file) && path.extname(file) == '.template'){
			fs.readFile(file, 'utf-8', function(err,content){
				if(err) return cb(err);

				var tmpl = hbs.compile(content);
				var output = tmpl(data);
				var outPath = path.join(path.dirname(file), path.basename(file,'.template'));
				fs.writeFile(outPath, output, 'utf-8', function(err){
					if(err) return cb(err);
					fs.unlink(file);
					cb(null, {filePath:outPath, fileName:file});
				});
			});
		}else{
			cb(file + ' not found');
		}
	}
}

// todo: this should probably be in the first function
module.exports = function(location, data, cb){
	cb = cb || function(){};
	if(!fs.existsSync(location)){
		cb(location+' could not be found');
		return;
	}
	fs.stat(location, function(err,stat){
		if(stat.isDirectory()){
			expandTemplatesRecursive(location, data, cb);
		}else{
			template(data,cb)(location);
		}
	})
}
