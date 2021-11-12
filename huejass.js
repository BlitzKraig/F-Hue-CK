class HueJASS {

    static manager;

    static Types = {
        LIGHT: 0,
        GROUP: 1
    }

    static async onInit() {
        HueJASS.registerSettings();
        if(game.settings.get('hue-jass', 'hueControl')){
            HueJASS.manager = new HueJASSManager();
        }
    }

    static registerSettings() {
        game.settings.register('hue-jass', 'bridgeIP', {
            name: "Bridge IP",
            scope: 'client',
            config: true,
            default: '',
            type: String,
            onChange: value => {
                HueJASS.manager.bridge = HueJASS.manager.hue.bridge(value)
            }
        });
        game.settings.register('hue-jass', 'user', {
            name: "Bridge User",
            scope: 'client',
            config: true,
            default: '',
            type: String,
            onChange: value => {
                HueJASS.manager.user = HueJASS.manager.bridge.user(value);
            }
        });
        game.settings.register('hue-jass', 'defaultLightID', {
            name: "Default Light or Group ID",
            scope: 'client',
            config: true,
            default: 3,
            type: Number,
            onChange: value => {
                HueJASS.manager.defaults.id = value
            }
        })
        game.settings.register('hue-jass', 'hueControl', {
            name: "Enable Hue control for this user",
            scope: 'client',
            config: true,
            default: false,
            type: Boolean,
            onChange: value => {
                window.location.reload();
            }
        })
    }

    static addSceneControls(controls) {
        let lightControls = controls.find(control => control.name === 'lighting');
        lightControls.tools.push({
            name: 'hue-manager',
            title: 'HueJASS',
            icon: 'fas fa-horse',
            visible: true,
            onClick: ()=>{HueJASS.manager.helpers.toggle()},
            button: true
        });
    }
}

Hooks.once('ready', HueJASS.onInit);
Hooks.on('getSceneControlButtons', HueJASS.addSceneControls);