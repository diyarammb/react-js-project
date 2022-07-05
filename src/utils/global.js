import React from 'react';
const globals = {
    cloneObject(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        if (obj instanceof Array) {
            var copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = this.cloneObject(obj[i]);
            }
            return copy;
        }
        if (obj instanceof Object) {
            var copy2 = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy2[attr] = this.cloneObject(obj[attr]);
            }
            return copy2;
        }
        return obj;
    },
    _buildTags: function (item, index, stateData, self, children) {
        var o = globals.cloneObject(item.propAttr);
        o.key = o.key || index;
        if (typeof o.render !== 'undefined') {

            switch (o.render) {
                case '!ifMobile':
                    if (globals.isMobile) return;
                    break;
                case 'ifMobile':
                    if (!globals.isMobile) return;
                    break;
                default: // true, false, null, undefined, emptyobj, validobj, "string"
                    let renderFlag = !this.isEmptyObject(stateData) ? (typeof stateData[o.render] === "boolean" ? stateData[o.render] === false : this.isEmptyObject(stateData[o.render])) : false;
                    if ((o.render === false) || renderFlag) {
                        return;
                    }
                    break;
            }
            delete o.render;
        }


        if (o.settings !== undefined) {
            for (let i in o.settings) {
                if (o.settings[i].apiKey !== undefined)
                    o[o.settings[i].prop] = this.getDeepObject(stateData, o.settings[i].apiKey);
                if (o.settings[i].funcName !== undefined) {
                    o[o.settings[i].prop] = self[o.settings[i].funcName];
                }
            }
        }
        return React.createElement(item.component, o, children);

    },
    getDeepObject(obj, path) {
        try {
            path = path.split('.')
            for (var i = 0, len = path.length; i < len; i++) {
                obj = obj[path[i]];
            }
            return obj;
        } catch (e) {
            return null;
        }
    },
    isEmptyObject(obj) {
        try {
            if (typeof obj === 'undefined' || obj == null || Object.keys(obj).length === 0) {
                if (typeof obj === 'Array' && obj.length > 0) {
                    return false;
                }
                return true;
            }
            return false;
        } catch (e) {
            return true;
        }

    },
    _mapRender: function (items, stateData, self, section, childRenderFlg = false) {
        let h = [];
        for (let i in items) {
            if (!this.isEmptyObject(stateData.dynamicWidgets) && !childRenderFlg) {
                if (i === 0) h = (this._handleDynamicWidget(stateData.dynamicWidgets, section, "before", self, h));
                if (items[i].propAttr && items[i].propAttr.adPrefix) h = (this._handleDynamicWidget(stateData.dynamicWidgets, items[i].propAttr.adPrefix, "before", self, h));
            }

            if (Array.isArray(items[i].children)) {
                h.push(globals._buildTags(items[i], i, stateData, self, globals._mapRender(items[i].children, stateData, self, section, true)));
            } else {
                h.push(globals._buildTags(items[i], i, stateData, self, items[i].children));
            }

            if (!this.isEmptyObject(stateData.dynamicWidgets) && !childRenderFlg) {
                if (items[i].propAttr && !items[i].propAttr.adPrefix) h = (this._handleDynamicWidget(stateData.dynamicWidgets, section, stateData.index !== undefined ? stateData.index : i, self, h));
                if (items[i].propAttr && items[i].propAttr.adPrefix) h = (this._handleDynamicWidget(stateData.dynamicWidgets, items[i].propAttr.adPrefix, "after", self, h));
                if (i === items.length - 1) h = (this._handleDynamicWidget(stateData.dynamicWidgets, section, "after", self, h));
            }
        }
        return h;

    }
}
export default globals;