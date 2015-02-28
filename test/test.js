var should = require('should'),
    app = require('./../src/main'),
    man = require('thoughtpad-plugin-manager'),
    co = require('co'),
    thoughtpad;

describe("stylus compilation plugin", function () {
    it("should register correctly to events", function (done) {
        thoughtpad = man.registerPlugins([app]);

        thoughtpad.subscribe("css-compile-complete", function *() {
            true.should.be.true;
        });

        co(function *() {
            yield thoughtpad.notify("css-compile-request", { ext: "styl", contents: "" });
            done();
        }).catch(done);
    });

    it("should ignore anything other than stylus", function (done) {
        thoughtpad = man.registerPlugins([app]);

        thoughtpad.subscribe("css-compile-complete", function *() {
            true.should.be.false; // Should never hit here because the extension is not stylus
        });

        co(function *() {
            yield thoughtpad.notify("css-compile-request", { ext: "css" });
            done();
        }).catch(done);
    });

    it("should compile stylus", function (done) {
        var contents = "",
            name = "";

        thoughtpad = man.registerPlugins([app]);

        thoughtpad.subscribe("css-compile-complete", function *(res) {
            contents = res.contents;
            name = res.name;
        });

        co(function *() {
            yield thoughtpad.notify("css-compile-request", { ext: "styl", contents: "table\n\twidth: 100%\n\n\t.white td\n\t\tbackground-color: #eee", name: 'hello' });
            contents.should.equal("table {\n  width: 100%;\n}\ntable .white td {\n  background-color: #eee;\n}\n");
            name.should.equal('hello');
            done();
        }).catch(done);
    });
});