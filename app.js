'use strict';

module.exports = app => {
    // put before other core middlewares
    app.logger.info(`[master] ENV: ${app.config.env} NODE_ENV:${process.env.NODE_ENV} EGG_SERVER_ENV:${process.env.EGG_SERVER_ENV} `);
    app.config.coreMiddlewares.unshift('cors');

    // if security plugin enabled, and origin config is not provided, will only allow safe domains support CORS.
    app.config.cors.origin = app.config.cors.origin || function corsOrigin(ctx) {
        const origin = ctx.get('origin');

        if (!ctx.isSafeDomain || ctx.isSafeDomain(origin)) {
            return origin;
        }
        return origin;
    };
};