var stylus = require('stylus'),
    nib = require('nib'),
    _thoughtpad;

var init = function (thoughtpad) {
    _thoughtpad = thoughtpad;
    _thoughtpad.subscribe("stylesheet-compile-request", compile);
},

compile = function *(obj) {
    if (obj.ext !== "styl") return;

    _thoughtpad.notify("stylesheet-compile-complete", stylus(obj.contents).use(nib()).render());
};

module.exports = {
    init: init
};