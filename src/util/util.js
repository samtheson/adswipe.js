/*jshint esnext: true */
import Fingerprint2 from 'fingerprint2';

class Util {
    constructor(config) {
        this.config = config;
    }
    /**
     * Shortcut to check if variable is empty or not
     * @param  string       variable to check
     * @return bool         true if empty, false if not
     */
    empty(arg){
        if( typeof arg === 'undefined' || arg === null )
            return true;
        else
            return false;
    }
    /**
     * Generate and store (in config/LocalStorage) unique user fingerprint to track user's swipes/clicks
     * @return n/a
     */
    checkFingerprint() {
        var $ = this;
        if( !$.config.fingerprint ) {
            // if not in local storage, generate fingerprint - else, get from localstorage
            if( !localStorage.as_fingerprint ) {
                new Fingerprint2().get(function(result){
                    $.config.fingerprint = result;
                    localStorage.as_fingerprint = result;
                });
            } else {
                $.config.fingerprint = localStorage.as_fingerprint;
            }
        }
    }
    /**
     * Go through all the elements on the page and find the next highest z-index so adswipe appears on top
     * @return {int}    z-index number to set adswipe to
     */
    findNextZIndex() {
        var $ = this;
        var all = document.getElementsByTagName('*');
        var highest = 0;

        for( var i = 0; i < all.length; i++ ) {
            var zi = document.defaultView.getComputedStyle(all[i],null).getPropertyValue("z-index");
            if( (zi > highest) && (zi != 'auto') )
                highest = zi;
        }

        // cast highest as integer, add one (for next zindex), add to config
        $.config.zIndex = Number(highest)+1;
    }
}

export default Util;
