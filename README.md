Boilerplate
=====

Fast, generic, highly customizeable application generator using node.js.

## Installation

For now, just clone this repository. Hopefully we'll resolve the npm module registration soon.

## Quick start

The current version of boilerplate just recursively copies a directory or git repo to the location of your choosing.  We intend to add file templating in the next release update.  Using the command line, the format is: 

  $ ./bin/generate <src> <dst>

Generating based on a local template would therefore look like:

  $ ./bin/generate ~/templates/some-app ~/workspace/my-new-app

And generating based on a git URL would be similar:

  $ ./bin/generate git://github.com/myname/myrepo  ~/workspace/my-new-app

The latter would work with http:// or https:// as well as git://.

## Using Boilerplate Programmatically

Boilerplate can be used programmatically as well.  An app can simply require the module and use its api:

```js
var boilerplate = require('boilerplate');

boilerplate.generate('git://github.com/myname/myrepo', '~/workspace/my-new-app', function(err){  console.log(err); });

## Preferences

While not exposed to the cli yet, the api offers the ability to add and remove aliases for sources as well.  This information is stored in a file in your home directory called .node-boilerplate.json.  Setting it programmatically is as simple as:

```js
boilerplate.register('default', 'git://github.com/myname/myrepo');

After that, using the term 'default' as the source in either the cli or programmatically will resolve to the git URL listed above.  