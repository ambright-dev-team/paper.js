var jsdom, self;

jsdom = require("jsdom");

// Create our document and window objects through jsdom.
/* global document:true, window:true */
var document = new jsdom.JSDOM("<html><body></body></html>", {
    // Use the current working directory as the document's origin, so
    // requests to local files work correctly with CORS.
    url: "file://" + process.cwd() + "/",
    resources: "usable",
});
self = document.window;
require("./canvas.js")(self);
require("./xml.js")(self);

global.window = self.window;
global.document = self.document;
global.navigator = "Some string";
