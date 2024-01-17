/*
 * Paper.js - The Swiss Army Knife of Vector Graphics Scripting.
 * http://paperjs.org/
 *
 * Copyright (c) 2011 - 2020, Jürg Lehni & Jonathan Puckey
 * http://juerglehni.com/ & https://puckey.studio/
 *
 * Distributed under the MIT license. See LICENSE file for details.
 *
 * All rights reserved.
 */

var gulp = require('gulp'),
    qunits = require('gulp-qunits');

gulp.task('test', ['test:node']);

gulp.task('test:node', [], function(callback) {
    return gulp.src('load.js', { cwd: 'test' })
        .pipe(qunits({
            require: [
                // To dynamically load the tests files from the sources, we need
                // to require Prepro.js first.
                'prepro/lib/node.js',
                { path: '../test/domFix.js' },
                // Note that loading dist/paper-full.js also works in
                // combination with `gulp load`, in which case Prepro.js is
                // present and handles the loading transparently.
                { path: '../dist/paper.js', namespace: 'paper' }
            ],
            timeout: 40
        }));
});
