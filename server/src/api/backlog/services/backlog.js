'use strict';

/**
 * backlog service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::backlog.backlog');
