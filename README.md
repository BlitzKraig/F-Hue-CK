# Foundry Hue Javascript API with Simplified Scripting

# Don't use this, it's broken af right now... Looking at a fix

![HueJASS Release](https://github.com/BlitzKraig/fvtt-HueJASS/workflows/HueJASS%20Release/badge.svg)
![Latest Release Download Count](https://img.shields.io/github/downloads/BlitzKraig/fvtt-HueJASS/latest/huejass-release.zip)

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/Q5Q01YIEJ)

A Phillips Hue library for Foundry VTT.

Some basic functionality provided in helpers, as well as a 'bridge' to functionality provided by JSHue <https://github.com/blargoner/jshue>

Hacked together as a proof of concept. Unfortunately, I can't find a simple way to take advantage of the "Entertainment" API to stream data to the lights, so we must use the standard, slow API.

This could be solved with a simple Node server, but that becomes a hassle to run when you want to run a session.

## How to use

* Activate the module
* Enable Hue Control in module settings
* Set the default light ID in module settings (default is 3, which is the ID of the light I'm testing on)
* Press the big button on your Hue bridge
* Press the horse button in the light sidebar to test

You can get your light ID's using `await HueJASS.manager.user.getLights()`
You can do all sorts of fun stuff in macros.

Use `HueJASS.manager.user.setLightState(lightID, {data})` or `HueJASS.manager.user.setGroupState(groupID, {data})`, where `data` contains props from <https://developers.meethue.com/develop/hue-api/lights-api/>

Using this approach, you can use any light ID, so go nuts. You can do all sorts by playing with `HueJASS.manager.user...`

## Troubleshooting

There are currently some SSL issues to address. If you are unable to use the module, try visiting `https://your-bridge-ip` in the browser, clicking advanced, and allowing the connection. Refresh foundry once you've done this, and you should now be able to connect to the bridge.

## Simple Use-Case Example
* Set up a 'Normal' scene, and a 'Combat' scene via the Hue app.
* Use `await HueJASS.manager.user.getScenes()` to get a list of known scenes.
* Note the scene identifiers for your scenes.
* Use `await HueJASS.manager.user.getGroups()` to get a list of known groups.
* Note the ID for the group that matches the scene
* Create a macro for Combat Start, and another for Combat End (or link them to hooks)
* Use `await HueJASS.manager.user.setGroupState(GROUP_ID, {scene:'SCENE_ID'})` in your macros to switch the scene
