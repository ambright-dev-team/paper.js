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

QUnit.module('Getting and Matching Items');

test('Item#matches()', function() {
    var path = new Path();
    equals(function() {
        return path.matches({
            visible: false
        });
    }, false);

    equals(function() {
        return path.matches({
            visible: true
        });
    }, true);
});

test('Project#getItems() with compare function', function() {
    var firstPath = new Path();
    var path = new Path({
        opacity: 0.5
    });

    var items = paper.project.getItems({
        opacity: function(value) {
            return value < 1;
        }
    });
    equals(function() {
        return items.length == 1 && items[0] == path;
    }, true);
});

test('Project#getItems() with specific property value', function() {
    var path = new Path();
    var decoyPath = new Path({
        opacity: 0.5
    });

    var items = paper.project.getItems({
        opacity: 1,
        type: 'path'
    });
    equals(function() {
        return items.length == 1 && items[0] == path;
    }, true);
});

test('Project#getItems() with regex function', function() {
    var layer = paper.project.activeLayer;
    var stopPath = new Path({
        name: 'stop'
    });

    var pausePath = new Path({
        name: 'pause'
    });

    var startPath = new Path({
        name: 'starting'
    });

    var items = paper.project.getItems({
        name: /^start/g
    });

    // console.log(paper.project.activeLayer);
    equals(function() {
        return items.length == 1 && items[0] == startPath;
    }, true);

    equals(function() {
        var items = paper.project.getItems({
            name: /^st/g
        });
        return items.length == 2;
    }, true);
});

test('Project#getItems() empty: true', function() {
    var layer = new Layer();
    var empty1 = new Path();
    var empty2 = new Path();

    equals(function() {
        return layer.children.length;
    }, 2);

    equals(function() {
        return paper.project.getItems({
            empty: true
        }).length;
    }, 2);
});

test('Project#getItems() overlapping', function() {
    var path = new Path.Circle({
        radius: 100,
        center: [200, 200],
        fillColor: 'red'
    });

    equals(function() {
        var matches = project.getItems({
            class: Path,
            overlapping: [0, 0, 400, 400]
        });
        return matches.length == 1 && matches[0] == path;
    }, true);

    equals(function() {
        var matches = project.getItems({
            class: Path,
            overlapping: [200, 0, 400, 400]
        });
        return matches.length == 1 && matches[0] == path;
    }, true);

    equals(function() {
        var matches = project.getItems({
            class: Path,
            overlapping: [400, 0, 400, 400]
        });
        return matches.length == 0;
    }, true);
});

test('Project#getItems() inside', function() {
    var path = new Path.Circle({
        radius: 100,
        center: [200, 200],
        fillColor: 'red'
    });

    equals(function() {
        var matches = project.getItems({
            class: Path,
            inside: [0, 0, 400, 400]
        });
        return matches.length == 1 && matches[0] == path;
    }, true);

    equals(function() {
        var matches = project.getItems({
            class: Path,
            inside: [200, 0, 400, 400]
        });
        return matches.length == 0;
    }, true);
});
