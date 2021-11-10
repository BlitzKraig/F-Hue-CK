class HueJASS {

    static manager;

    static Types = {
        LIGHT: 0,
        GROUP: 1
    }

    static async onInit() {
        HueJASS.registerSettings();
        HueJASS.manager = new HueJASSManager();
    }

    static registerSettings() {
        game.settings.register('HueJASS', 'bridgeIP', {
            name: "Bridge IP",
            scope: 'client',
            config: true,
            default: '',
            type: String,
            onChange: value => {
                HueJASS.manager.bridge = HueJASS.manager.hue.bridge(value)
            }
        });
        game.settings.register('HueJASS', 'user', {
            name: "Bridge User",
            scope: 'client',
            config: true,
            default: '',
            type: String,
            onChange: value => {
                HueJASS.manager.user = HueJASS.manager.bridge.user(value);
            }
        });
        game.settings.register('HueJASS', 'defaultLightID', {
            name: "Default Light or Group ID",
            scope: 'client',
            config: true,
            default: 3,
            type: Number,
            onChange: value => {
                HueJASS.manager.defaults.id = value
            }
        })
    }

    static addSceneControls(controls) {
        let lightControls = controls.find(control => control.name === 'lighting');
        lightControls.tools.push({
            name: 'hue-manager',
            title: 'HueJASS',
            icon: 'fas fa-horse',
            visible: game.user.isGM,
            onClick: ()=>{HueJASS.manager.helpers.toggle()},
            button: true
        });
    }
}

Hooks.once('ready', HueJASS.onInit);
Hooks.on('getSceneControlButtons', HueJASS.addSceneControls);