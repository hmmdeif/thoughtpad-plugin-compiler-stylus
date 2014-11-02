var should = require('should'),
    app = require('./../src/main'),
    man = require('thoughtpad-plugin-manager'),
    thoughtpad;

describe("stylus compilation plugin", function () {
    it("should register correctly to events", function () {
        thoughtpad = man.registerPlugins([app]);

        thoughtpad.subscribe("stylesheet-compile-complete", function *() {
            true.should.be.true;
        });

        thoughtpad.notify("stylesheet-compile-request", { ext: "" });
    });

    it("should ignore anything other than stylus", function () {
        thoughtpad = man.registerPlugins([app]);

        thoughtpad.subscribe("stylesheet-compile-complete", function *() {
            true.should.be.false; // Should never hit here because the extension is not coffee
        });

        thoughtpad.notify("stylesheet-compile-request", { ext: "css" });
    });

    it("should compile stylus", function () {
        thoughtpad = man.registerPlugins([app]);

        thoughtpad.subscribe("stylesheet-compile-complete", function *(contents) {
            contents.should.equal("table {\n  width: 100%;\n}\ntable .white td {\n  background-color: #eee;\n}\n");
        });

        thoughtpad.notify("stylesheet-compile-request", { ext: "styl", contents: "table\n\twidth: 100%\n\n\t.white td\n\t\tbackground-color: #eee" });
    });
});