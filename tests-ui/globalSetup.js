module.exports = async function () {
	global.ResizeObserver = class ResizeObserver {
		observe() {}
		unobserve() {}
		disconnect() {}
	};

	const { nop } = require("./utils/nopProxy");
	global.enableWebGLCanvas = nop;

	HTMLCanvasElement.prototype.getContext = nop;

	const { _t } = require('./utils/i18n');
	global._t = _t;

	localStorage["Comfy.Settings.Comfy.Logging.Enabled"] = "false";
};
