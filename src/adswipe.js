/*jshint esnext: true */
import Config from 'util/config.js';
import Util from 'util/util.js';
import HammerAS from 'util/hammer-as.js';
import Ajax from 'util/ajax.js';

var config = new Config();
var util = new Util(config);
var hammer = new HammerAS(config);

util.checkFingerprint();    // generate unique fingerprint for user

/**
 * Allow API endpoint url to be returned or updated
 * @return  string or bool  if get (empty arg), return endpoint string; if set, update and return true
 */
export function endpoint(newEndpoint) {
    if( util.empty(newEndpoint) ){
        return config.endpoint;
    } else {
       config.endpoint = newEndpoint; // ie 'http://adswipejs.dev.192.168.1.117.xip.io/';
       return true;
    }
}

/**
 * Allow debug mode to be toggled
 * @return  bool        if get (empty arg), return debug bool; if set, update and return true
 */
export function debug(newDebug) {
    if( util.empty(newDebug) ){
        return config.debug;
    } else {
       config.debug = newDebug;
       return true;
    }
}

/**
 * Return version number
 * @return string       version number
 */
export function version() {
    return config.version;
}

/**
 * Return API version number (promise)
 * @return string       api version number
 */
export function apiVersion() {
    // basically wrap api.get() promise in a promise
    return new Promise((resolve, reject) => {
        var api = new Ajax();
        api.url = config.endpoint+`version`;
        api.get().then((response) => {
            resolve(response);
        }, function(error){
            reject(error);
        });
    });
}

/**
 * Set up and display new ad
 * @param  {int} campaignID     campaign ID hash
 */
export function show(campaignID) {
    if( util.empty(campaignID) ) {
        if( config.debug )
            console.log('Error: no campaign ID found');
        return false;
    }
    return hammer.show(campaignID);
}

/**
 * Set or get gesture capture layer tap timeout
 * @return int
 */
export function tapTimeout(newTimeout) {
    if( util.empty(newTimeout) ){
        return config.tapTimeout;
    } else {
       config.tapTimeout = newTimeout;
       return true;
    }
}

/**
 * Reset ad when orientation changed
 */
window.onorientationchange = function() {
    //var orientation = window.orientation;
    hammer.reset();
};
