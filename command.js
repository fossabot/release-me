'use strict';

var defaults = require('./defaults');

module.exports = require('yargs')
  .usage('Usage: $0 [options]')
  .option('release-as', {
    alias: 'r',
    describe: 'Specify the release type manually (like npm version <major|minor|patch>)',
    requiresArg: true,
    string: true,
    global: true
  })
  .option('prerelease', {
    alias: 'p',
    describe: 'make a pre-release with optional option value to specify a tag id',
    string: true,
    global: true
  })
  .option('infile', {
    alias: 'i',
    describe: 'Read the CHANGELOG from this file',
    default: defaults.infile,
    global: true
  })
  .option('message', {
    alias: 'm',
    describe: 'Commit message, replaces %s with new version',
    type: 'string',
    default: defaults.message,
    global: true
  })
  .option('first-release', {
    alias: 'f',
    describe: 'Is this the first release?',
    type: 'boolean',
    default: defaults.firstRelease,
    global: true
  })
  .option('release-count', {
    describe: 'How many releases to be generated from the latest. If 0, the whole changelog will be regenerated and the outfile will be overwritten',
    type: 'int',
    default: defaults.releaseCount,
    global: true
  })
  .option('sign', {
    alias: 's',
    describe: 'Should the git commit and tag be signed?',
    type: 'boolean',
    default: defaults.sign,
    global: true
  })
  .option('no-verify', {
    alias: 'n',
    describe: 'Bypass pre-commit or commit-msg git hooks during the commit phase',
    type: 'boolean',
    default: defaults.noVerify,
    global: true
  })
  .option('commit-all', {
    alias: 'a',
    describe: 'Commit all staged changes, not just files affected by release-me',
    type: 'boolean',
    default: defaults.commitAll,
    global: true
  })
  .option('silent', {
    describe: 'Don\'t print logs and errors',
    type: 'boolean',
    default: defaults.silent,
    global: true
  })
  .option('tag-prefix', {
    alias: 't',
    describe: 'Set a custom prefix for the git tag to be created',
    type: 'string',
    default: defaults.tagPrefix,
    global: true
  })
  .option('scripts', {
    describe: 'Scripts to execute for lifecycle events (prebump, precommit, etc.,)',
    default: {}
  })
  .option('skip', {
    describe: 'Map of steps in the release process that should be skipped',
    default: defaults.scripts
  })
  .option('dry-run', {
    type: 'boolean',
    default: defaults.dryRun,
    describe: 'See the commands that running release-me would run'
  })
  .check(function (argv) {
    /* istanbul ignore next */
    if (typeof argv.scripts !== 'object' || Array.isArray(argv.scripts)) {
      throw Error('scripts must be an object');
    } else if (typeof argv.skip !== 'object' || Array.isArray(argv.skip)) {
      throw Error('skip must be an object');
    } else {
      return true;
    }
  })
  .version()
  .alias('version', 'v')
  .help()
  .alias('help', 'h')
  .example('$0', 'Update changelog and tag release')
  .example('$0 -m "%s: see changelog for details"',
  'Update changelog and tag release with custom commit message')
  .pkgConf('release-me')
  .wrap(97);
