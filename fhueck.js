class FHueCK {

    static async onInit() {
        ui.notifications.notify("FHUECK READY");
        FHueCK.helpers.discover();
    }

    static helpers = {
        discover() {
            FHueCK.request.GET("https://discovery.meethue.com/", {
                success: (response, status, request) => {
                    ui.notifications.notify(`Discover: ${response}`);
                },
                error: (request, error, exception) => {
                    ui.notifications.error(error)
                },
                complete: (request, status) => {
                    ui.notifications.notify(status)
                }
            })
        }
    }

    static request = {
        GET(url, callbacks) {
            $.ajax({
                url: url,
                type: 'GET',
                success: callbacks.success,
                error: callbacks.error,
                complete: callbacks.complete
            });
        },
        POST() {

        },
        PUT() {

        }
    }

}

Hooks.once('ready', FHueCK.onInit);