'use strict';

import Detectizr from '../detectizr';

/*
 * CORE
*/

/*
 * PATHS
*/

export const ROOT_URL = window.location.origin || window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');

export const PATH_SRC = '/src';

export const PATH_BUILD = '/build';

export const PATH_GLSL = PATH_SRC + '/glsl';

export const PATH_IMAGES = PATH_BUILD + '/img';

export const PATH_TEXTURES = PATH_IMAGES + '/textures';

/*
 * LOCALS
*/

export const DATE =  new Date();

export const TIMEZONE_OFFSET = -(DATE.getTimezoneOffset() / 60);

/*
 * DEVICE
*/

export const BROWSER_ENGINE = Detectizr.browser.engine;

export const BROWSER_NAME = Detectizr.browser.name;

export const BROWSER_USERAGENT = Detectizr.browser.userAgent;

export const BROWSER_VERSION = Detectizr.browser.version;

export const DEVICE_MODEL = Detectizr.device.model;

export const DEVICE_ORIENTATION = Detectizr.device.orientation;

export const DEVICE_TYPE = Detectizr.device.type;

export const OS_NAME = Detectizr.os.name;

export const IS_DESKTOP = (Detectizr.device.type === 'desktop') ? true : false;

export const IS_TABLET = (Detectizr.device.type === 'tablet') ? true : false;

export const IS_MOBILE = (Detectizr.device.type === 'mobile') ? true : false;
