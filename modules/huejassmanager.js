class HueJASSManager {
    constructor() {
        this.hue = jsHue();
        this.bridge;
        this.user;
        this.originalConfig;

        this.defaults = {
            type: HueJASS.Types.LIGHT,
            id: game.settings.get('HueJASS', 'defaultLightID'),
            brightness: 200
        }
        this.lightStates = {}
        this.groupStates = {}

        this.discover();
    }

    async authenticate() {
        let user = game.settings.get('HueJASS', 'user');
        if (user) {
            this.user = this.bridge.user(user);
            this.originalConfig = await this.helpers.getState();
        } else {
            this.bridge.createUser('HueJASS').then(async (response) => {
                if (response[0].error) {
                    let error = response[0].error;
                    if (error.type === 101) {
                        ui.notifications.notify("Press your button...")
                        setTimeout(() => {
                            this.authenticate()
                        }, 5000);
                    }
                } else if (response[0].success) {
                    var username = response[0].success.username;
                    game.settings.set('HueJASS', 'user', username);
                    this.originalConfig = await this.helpers.getState();
                }
            })
        }
    }
    
    discover() {
        let ip = game.settings.get('HueJASS', 'bridgeIP')
        if (ip) {
            this.bridge = this.hue.bridge(ip)
            this.authenticate();
        } else {
            this.hue.discover().then(bridges => {
                if (bridges.length === 0) {
                    console.log('No bridges found. :(');
                } else {
                    game.settings.set('HueJASS', 'bridgeIP', bridges[0].internalipaddress)
                    this.authenticate();
                }
            }).catch(e => console.log('Error finding bridges', e));
        }
        
    }

    helpers = {
        turnOn : (light = this.defaults, transitionTime = 0) => {
            switch (light.type) {
                case HueJASS.Types.LIGHT:
                    this.user.setLightState(light.id, this.lightStates[light.id] = {on:true, transitiontime: transitionTime, bri: light.brightness})
                    break;
                case HueJASS.Types.GROUP:
                    this.user.setGroupState(light.id, this.groupStates[light.id] = {on:true, transitiontime: transitionTime, bri: light.brightness})
                    
                    break
                default:
                    break;
            }
        },
        turnOff : (light = this.defaults, transitionTime = 0, actuallyOff = false) => {
            // Changing brightness is much faster than switching on/off
            let data = {transitiontime: transitionTime}
            if(actuallyOff){
                data.on = false;
            } else {
                data.bri = 0;
            }
            switch (light.type) {
                case HueJASS.Types.LIGHT:
                    this.user.setLightState(light.id, this.lightStates[light.id] = data)
                    break;
                case HueJASS.Types.GROUP:
                    this.user.setGroupState(light.id, this.groupStates[light.id] = data)
                    break
                default:
                    break;
            }
        },
        getState : async(light = this.defaults) => {
            let lightObj;
            switch (light.type) {
                case HueJASS.Types.LIGHT:
                    if(this.lightStates[light.id]){
                        return this.lightStates[light.id]
                    }
                    lightObj = await this.user.getLight(light.id)
                    lightObj.state.alert = "none"
                    this.lightStates[light.id] = lightObj.state
                    break;
                case HueJASS.Types.GROUP:
                    if(this.groupStates[light.id]){
                        return this.lightStates[light.id]
                    }
                    lightObj = await this.user.getGroup(light.id)
                    lightObj.action.alert = "none"
                    this.groupStates[light.id] = lightObj.action
                    break
                default:
                    break;
            }
            return lightObj.action || lightObj.state;
        },
        toggle : async() => {
            let state = await this.helpers.getState()
            if(state.on){
                this.helpers.turnOff()
            } else {
                this.helpers.turnOn();
            }
        },
        setBrightness: (light = this.defaults, brightness, transitionTime=0)=> {
            switch (light.type) {
                case HueJASS.Types.LIGHT:
                    this.user.setLightState(light.id, {bri: brightness, transitiontime: transitionTime})
                    break;
                case HueJASS.Types.GROUP:
                    this.user.setGroupState(light.id, {bri: brightness, transitiontime: transitionTime})
                    break
                default:
                    break;
            }
        },
        flash: async() => {
            let timeout = 100;
            this.helpers.setBrightness(50);
            setTimeout(() => {
                this.helpers.setBrightness(255);
                setTimeout(() => {
                    this.helpers.setBrightness(50);
                    setTimeout(() => {
                        this.helpers.setBrightness(255);
                        setTimeout(() => {
                            this.helpers.setBrightness(50);
                            setTimeout(() => {
                                this.user.setGroupState(2, this.originalConfig)
                            }, timeout);
                        }, timeout);
                    }, timeout);
                }, timeout);
            }, timeout);
        }
    }

}