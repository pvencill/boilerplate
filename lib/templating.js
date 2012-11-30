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
	return function(files){
		if(files){
			files.forEach(template(data));
		}
	}
}

function template(data){
	return function (file){
		if(fs.existsSync(file) && file.)
		// todo: template that file if it's a template file
	}
}