const app = {
        name: `linkage`,
        port: parseInt(Math.random() * 9000) + 1000,

        jsBase: `js/component/base`,
        jsPlugins: `js/component/plugins`,

        cssBase: `base`,
        cssComponent: `component`,
        ui: `ui`,
        src: `linkage`,
        open: `dist/html/linkage.html`,
        server: `webserver`||`connect`
    },

    // sass
    sass = {
        src: [
            [`src/sass/${app.cssBase}/*.scss`],
            [`src/sass/modules/*.scss`]
        ],

        outer: [`dist/css/${app.cssBase}`, `dist/css/${app.cssComponent}`]
    },

    // babel
    babel = {
        src: [
            [`src/${app.jsBase}/*.js`],
            [`src/${app.jsPlugins}/*.js`],
            [`src/js/*.js`]
        ],

        outer: [`dist/${app.jsBase}`, `dist/${app.jsPlugins}`, `dist/${app.jsPlugins}`]
    },

    // include
    html = {
        src: [
            [`src/html/*.html`]
        ],

        outer: [`dist/html`],

        // 自动刷新的页面
        watch: [`dist/**/*.html`]
    },

    // 文件监听
    watch = {
        src: [
            [`dist/**/*.html`, `dist/**/*.js`, `dist/**/*css`],
            [`src/html/*.html`, `src/html/**/*.html`],
            [`src/js/*.js`, `src/js/**/*.js`],
            [`src/sass/*.scss`, `src/sass/**/*.scss`]
        ],

        task: [
            [`html`],
            [`fileinclude`],
            [`babel`],
            [`sass`]
        ]
    };

module.exports = {

    app: app,

    sass: sass,

    babel: babel,

    html: html,

    watch: watch

}