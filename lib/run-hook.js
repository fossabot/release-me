'use strict';

var chalk = require('chalk');
var checkpoint = require('./checkpoint');
var figures = require('figures');
var runExec = require('./run-exec');

module.exports = function (args, hookName, newVersion, hooks, cb) {
  if (!hooks[hookName]) {
    return Promise.resolve();
  }

  var command = hooks[hookName] + ' --new-version="' + newVersion + '"';

  checkpoint(args, 'Running lifecycle hook "%s"', [hookName]);
  checkpoint(args, '- hook command: "%s"', [command], chalk.blue(figures.info));

  return runExec(args, command);
};
