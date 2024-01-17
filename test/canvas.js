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

// Add some useful extensions to HTMLCanvasElement:
// - HTMLCanvasElement#type, so we can switch to a PDF canvas
// - Various Node-Canvas methods, routed through from HTMLCanvasElement:
//   toBuffer, pngStream, createPNGStream, jpegStream, createJPEGStream

module.exports = function (self) {
    var Canvas;
    Canvas = require("canvas").Canvas;

    var HTMLCanvasElement = self.HTMLCanvasElement,
        idlUtils = require("jsdom/lib/jsdom/living/generated/utils");

    // Add fake HTMLCanvasElement#type property:
    Object.defineProperty(HTMLCanvasElement.prototype, "type", {
        get: function () {
            var canvas = idlUtils.implForWrapper(this)._canvas;
            return (canvas && canvas.type) || "image";
        },

        set: function (type) {
            // Allow replacement of internal node-canvas, so we can switch to a
            // PDF canvas.
            var impl = idlUtils.implForWrapper(this),
                size = impl._canvas || impl;
            impl._canvas = new Canvas(size.width, size.height, type);
            impl._context = null;
        },
    });

    // Extend HTMLCanvasElement with useful methods from the underlying Canvas:
    var methods = [
        "toBuffer",
        "pngStream",
        "createPNGStream",
        "jpegStream",
        "createJPEGStream",
    ];
    methods.forEach(function (key) {
        HTMLCanvasElement.prototype[key] = function () {
            var canvas = idlUtils.implForWrapper(this)._canvas;
            return canvas[key].apply(canvas, arguments);
        };
    });
};
