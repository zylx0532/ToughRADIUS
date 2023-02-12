if (!window.settingsUi)
    window.settingsUi = {};


settingsUi.getConfigView = function (citem) {
    if (citem.name === "system") {
        return settingsUi.getSystemConfigView(citem);
    } else if (citem.name === "radius") {
        return settingsUi.getRadiusConfigView(citem);
    } else if (citem.name === "tr069") {
        return settingsUi.getTr069ConfigView(citem);
    }
    return {id: "settings_form_view"}
}


settingsUi.getSystemConfigView = function (citem) {
    let formid = webix.uid().toString();
    return {
        id: "settings_form_view",
        rows: [
            {
                padding: 7,
                cols: [
                    {
                        view: "label", label: " <i class='" + citem.icon + "'></i> " + citem.title,
                        css: "dash-title-b", width: 240, align: "left"
                    },
                    {},
                    wxui.getPrimaryButton(gtr("Save"), 150, false, function () {
                        let param = $$(formid).getValues();
                        param['ctype'] = 'system';
                        webix.ajax().post('/admin/settings/update', param).then(function (result) {
                            let resp = result.json();
                            webix.message({type: resp.msgtype, text: resp.msg, expire: 3000});
                        });
                    }),
                ],
            },
            {
                id: formid,
                view: "form",
                scroll: true,
                paddingX: 10,
                paddingY: 10,
                elementsConfig: {
                    labelWidth: 180,
                    labelPosition: "left",
                },
                url: "/admin/settings/system/query",
                elements: [
                    {
                        view: "radio", name: "SystemTheme", labelPosition: "top", label: tr("settings", "System Theme"),
                        options: ["light", "dark"]
                    },
                    {view: "text", name: "SystemTitle", labelPosition: "top", label: tr("settings", "Page title (browser title bar)")},
                    {view: "text", name: "SystemLoginRemark", labelPosition: "top", label: tr("settings", "Login screen prompt description")},
                    {view: "text", name: "SystemLoginSubtitle", labelPosition: "top", label: tr("settings", "Login form title")},
                    {}
                ],
            }
        ]
    }

}

settingsUi.getRadiusConfigView = function (citem) {
    let formid = webix.uid().toString();
    return {
        id: "settings_form_view",
        rows: [
            {
                padding: 7,
                cols: [
                    {
                        view: "label", label: " <i class='" + citem.icon + "'></i> " + citem.title,
                        css: "dash-title-b", width: 240, align: "left"
                    },
                    {},
                    wxui.getPrimaryButton(gtr("Save"), 150, false, function () {
                        let param = $$(formid).getValues();
                        param['ctype'] = 'radius';
                        webix.ajax().post('/admin/settings/update', param).then(function (result) {
                            let resp = result.json();
                            webix.message({type: resp.msgtype, text: resp.msg, expire: 3000});
                        });
                    }),
                ],
            },
            {
                id: formid,
                view: "form",
                scroll: true,
                paddingX: 10,
                paddingY: 10,
                elementsConfig: {
                    labelWidth: 180,
                    labelPosition: "left",
                },
                url: "/admin/settings/radius/query",
                elements: [
                    {
                        view: "counter", name: "AcctInterimInterval", labelPosition: "top", label: tr("settings", "Default Acctounting interim interval"),
                        bottomLabel: tr("settings", "Default Acctounting interim interval, Recommended 120-600 seconds")
                    },
                    {
                        view: "counter", name: "AccountingHistoryDays", labelPosition: "top", label: tr("global", "Radius accounting logging expire days"),
                        bottomLabel: tr("settings", "Radius logging expire days, set according to the disk size. ")
                    },
                    {
                        view: "radio", name: "RadiusIgnorePwd", labelPosition: "top", label: tr("settings", "Ignore Passowrd check"),
                        options: [{id: 'enabled', value: gtr("Yes")}, {id: 'disabled', value: gtr("No")}],
                        bottomLabel: tr("settings", "Password authentication is ignored, but does not apply to MsChapv2 authentication mode.")
                    },
                    {}
                ],
            }
        ]
    }

}

settingsUi.getTr069ConfigView = function (citem) {
    let formid = webix.uid().toString();
    return {
        id: "settings_form_view",
        rows: [
            {
                padding: 7,
                cols: [
                    {
                        view: "label", label: " <i class='" + citem.icon + "'></i> " + citem.title,
                        css: "dash-title-b", width: 240, align: "left"
                    },
                    {},
                    wxui.getPrimaryButton(gtr("Save"), 150, false, function () {
                        let param = $$(formid).getValues();
                        param['ctype'] = 'tr069';
                        webix.ajax().post('/admin/settings/update', param).then(function (result) {
                            let resp = result.json();
                            webix.message({type: resp.msgtype, text: resp.msg, expire: 3000});
                        });
                    }),
                ],
            },
            {
                id: formid,
                view: "form",
                scroll: true,
                paddingX: 10,
                paddingY: 10,
                elementsConfig: {
                    labelWidth: 180,
                    labelPosition: "left",
                },
                url: "/admin/settings/tr069/query",
                elements: [
                    {
                        view: "radio", name: "CpeAutoRegister",labelPosition: "top", label: tr("settings", "Cpe auto register"),
                        options: ["enabled", "disabled"],
                        bottomLabel: tr("settings", "Automatic registration of new CPE devices")
                    },
                    {
                        view: "text", name: "CwmpDownloadUrlPrefix",labelPosition: "top", label: tr("settings", "Tr069 Download Url Prefix"),
                        bottomLabel: tr("settings", "The CPE downloads the configuration file through this URL")
                    },
                    {
                        view: "text", name: "CpeConnectionRequestPassword",labelPosition: "top", label: tr("settings", "CPE Connection authentication password"),
                        bottomLabel: tr("settings", "tr069 The authentication password used when the server connects to cpe")
                    },
                    {}
                ],
            }
        ]
    }
}


