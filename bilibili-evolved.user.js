// ==UserScript==
// @name         Bilibili Evolved
// @version      0.9.6.1
// @description  增强哔哩哔哩Web端体验.
// @author       Grant Howard
// @match        *://*.bilibili.com/*
// @match        *://*.bilibili.com
// @updateURL    https://github.com/the1812/Bilibili-Evolved/raw/master/bilibili-evolved.user.js
// @downloadURL  https://github.com/the1812/Bilibili-Evolved/raw/master/bilibili-evolved.user.js
// @supportURL   https://github.com/the1812/Bilibili-Evolved/issues
// @homepage     https://github.com/the1812/Bilibili-Evolved
// @grant        unsafeWindow
// @grant        GM_getValue
// @grant        GM_setValue
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// @icon         https://raw.githubusercontent.com/the1812/Bilibili-Evolved/master/images/logo.png
// ==/UserScript==
(self$ =>
{
    const $ = unsafeWindow.$ || self$;
    $(document).ready(() =>
    {
        const settings = {
            removeAds: true,
            touchNavBar: false,
            touchVideoPlayer: false,
            watchLaterRedirect: true,
            expandDanmakuList: true,
            customStyleColor: "#00A0D8",
            blurBackgroundOpacity: 0.382,
            overrideNavBar: true,
            showBanner: true,
            useDarkStyle: false,
            useNewStyle: true
        };
        const ajaxReload = [
            "touchVideoPlayer",
            "watchLaterRedirect",
            "expandDanmakuList"
        ];
        function waitForQuery()
        {
            const MaxRetry = 30;
            let retry = 0;
            const tryQuery = (query, condition, action, failed) =>
            {
                if (retry >= MaxRetry)
                {
                    if (failed)
                    {
                        failed();
                    }
                }
                else
                {
                    const result = query();
                    if (condition(result))
                    {
                        action(result);
                    }
                    else
                    {
                        retry++;
                        setTimeout(() => tryQuery(query, condition, action, failed), 500);
                    }
                }
            };
            return tryQuery;
        }
        // $.ajax will be modified by bilibili, so I have to use my own implementation.
        function ajax(url, done)
        {
            const xhr = new XMLHttpRequest();
            xhr.addEventListener("load", () => done(xhr.responseText));
            xhr.open("GET", url);
            xhr.send();
        }
        function reload(resources)
        {
            for (const key in settings)
            {
                if (settings[key] === true)
                {
                    const func = eval(resources.data[key]);
                    if (func)
                    {
                        func(settings, resources);
                        if (ajaxReload.indexOf(key) !== -1)
                        {
                            $(document).ajaxComplete(() =>
                            {
                                func(settings, resources);
                            });
                        }
                    }
                }
            }
        }
        function loadSettings()
        {
            for (const key in settings)
            {
                settings[key] = GM_getValue(key, settings[key]);
            }
            settings.guiSettings = true;
            settings.debug = false;
        }
        function saveSettings(newSettings)
        {
            for (const key in settings)
            {
                GM_setValue(key, newSettings[key]);
            }
        }
        class ExternalResource
        {
            static get resourceUrls()
            {
                const root = "https://raw.githubusercontent.com/the1812/Bilibili-Evolved/master/";
                const urls = {
                    style: "style/style.scss",
                    oldStyle: "style/style-old.scss",
                    darkStyle: "style/style-dark.scss",
                    touchPlayerStyle: "style/style-touch-player.scss",
                    navbarOverrideStyle: "style/style-navbar-override.css",
                    noBannerStyle: "style/style-no-banner.css",
                    guiSettingsStyle: "style/style-gui-settings.scss",
                    guiSettingsDom: "utils/gui-settings.html",
                    guiSettings: "utils/gui-settings.min.js",
                    useDarkStyle: "style/dark-styles.min.js",
                    useNewStyle: "style/new-styles.min.js",
                    touchNavBar: "touch/touch-navbar.min.js",
                    touchVideoPlayer: "touch/touch-player.min.js",
                    expandDanmakuList: "utils/expand-danmaku.min.js",
                    removeAds: "utils/remove-promotions.min.js",
                    watchLaterRedirect: "utils/watchlater.min.js"
                };
                for (const key in urls)
                {
                    urls[key] = root + urls[key];
                }
                return urls;
            }
            constructor()
            {
                this.data = {};
                const foreground = (() =>
                {
                    const regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(settings.customStyleColor);
                    const color = regex ? {
                        r: parseInt(regex[1], 16),
                        g: parseInt(regex[2], 16),
                        b: parseInt(regex[3], 16)
                    } : undefined;
                    if (color)
                    {
                        const grey = 1 - (0.299 * color.r + 0.587 * color.g + 0.114 * color.b) / 255;
                        if (grey < 0.35)
                        {
                            return "#000";
                        }
                        else
                        {
                            return "#fff";
                        }
                    }
                    else
                    {
                        return "#fff";
                    }
                })();
                settings.foreground = foreground;
                settings.brightness = `${foreground === "#000" ? "100" : "0"}%`;
                settings.filterBrightness = foreground === "#000" ? "0" : "100";
                const replaceCustomColor = (style) =>
                {
                    for (const key of Object.keys(settings))
                    {
                        style = style.replace(new RegExp("\\$" + key, "g"), settings[key]);
                    }
                    return style;
                };
                const urls = ExternalResource.resourceUrls;
                const resourceCount = Object.keys(urls).length;
                let downloadedCount = 0;
                for (const key in urls)
                {
                    const url = urls[key];
                    ajax(url, data =>
                    {
                        if (url.indexOf(".scss") !== -1)
                        {
                            this.data[key] = replaceCustomColor(data);
                        }
                        else
                        {
                            this.data[key] = data;
                        }
                        downloadedCount++;
                        if (downloadedCount >= resourceCount && this.callback)
                        {
                            this.callback();
                        }
                    });
                }
            }
            ready(callback)
            {
                this.callback = callback;
            }k
            getStyle(key, id)
            {
                return `<style id='${id}'>${this.data[key]}</style>`;
            }
        }

        loadSettings();
        const resources = new ExternalResource();
        resources.ready(() =>
        {
            reload(resources);
        });
    });
})(window.jQuery.noConflict(true));
