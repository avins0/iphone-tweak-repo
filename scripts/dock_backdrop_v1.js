// @param: switch | hideBackdrop | Hide Dock Background | true
// Local Dock Backdrop 1.0.0 — experimental, target iPhone16,2 / iOS 18.5.
// Uses Cyanide's QuickLoader API; no injected library or persistent file edits.
// Set Hide Dock Background OFF and run again to show the background.
// Stopping/removing a QuickLoader script alone does not undo view changes.
// Source references for the API and iOS 18 dock hierarchy:
// https://github.com/kolbicz/Cyanide/blob/v1.7.2/Cyanide/tweaks/remote_objc.h
// https://github.com/0xjohnnydev/0xjohnnydev.github.io/blob/main/hide_dock.js
(() => {
    "use strict";
    const prefix = "[LocalDock 1.0.0] ";
    let stage = "settings";

    function pointer(value, label) {
        if (typeof value !== "string" || !/^0x[0-9a-f]+$/i.test(value) ||
            /^0x0+$/i.test(value)) {
            throw new Error(label + " unavailable");
        }
        return value;
    }

    function boolean(value, label) {
        if (typeof value !== "string" || !/^0x[0-9a-f]+$/i.test(value)) {
            throw new Error(label + " returned an invalid value");
        }
        return parseInt(value.slice(2).slice(-2), 16) !== 0;
    }

    function call(target, selector, arg) {
        if (!r_responds(target, selector)) {
            throw new Error("Missing selector: " + selector);
        }
        return r_msg2_main(target, selector, arg === undefined ? 0 : arg);
    }

    function object(target, selector) {
        return pointer(call(target, selector), selector);
    }

    try {
        if (typeof hideBackdrop !== "boolean") {
            throw new Error("QuickLoader must supply the Hide Dock Background switch");
        }
        log(prefix + "START: requested hidden=" + hideBackdrop);
        stage = "SpringBoard identity";
        const app = object(pointer(r_class("UIApplication"), "UIApplication"), "sharedApplication");
        const sb = pointer(r_class("SpringBoard"), "SpringBoard");
        if (!boolean(call(app, "isKindOfClass:", sb), "identity")) {
            throw new Error("Target application is not SpringBoard");
        }

        stage = "dock lookup";
        const controller = object(pointer(r_class("SBIconController"), "SBIconController"), "sharedInstance");
        const manager = object(controller, "iconManager");
        const icons = object(manager, "dockListView");
        const dock = object(icons, "superview");
        const dockClass = pointer(r_class("SBDockView"), "SBDockView");
        if (!boolean(call(dock, "isKindOfClass:", dockClass), "dock class")) {
            throw new Error("Unsupported dock hierarchy; no view changed");
        }
        const backdrop = object(dock, "backgroundView");

        stage = "backdrop change";
        const before = boolean(call(backdrop, "isHidden"), "current hidden state");
        if (before !== hideBackdrop) call(backdrop, "setHidden:", hideBackdrop ? 1 : 0);
        const after = boolean(call(backdrop, "isHidden"), "hidden state readback");
        if (after !== hideBackdrop) throw new Error("Hidden state did not match the request");
        log(prefix + "PASS: dock background hidden=" + after + " (was " + before + ")");
        log(prefix + "To restore: switch Hide Dock Background OFF and Run Tweak again.");
    } catch (error) {
        log(prefix + "FAIL at " + stage + ": " + String(error));
        throw error;
    }
})();
