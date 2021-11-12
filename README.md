# Foundry Hue Javascript API with Simplified Scripting

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
