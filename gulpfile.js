const gulp = require(`gulp`),
    sass = require(`gulp-sass`),
    minifycss = require(`gulp-minify-css`),
    rename = require(`gulp-rename`),
    notify = require(`gulp-notify`),
    babel = require(`gulp-babel`),
    concat = require(`gulp-concat`),
    uglify = require(`gulp-uglify`),
    watch = require(`gulp-watch`),
    fileinclude = require(`gulp-file-include`),
    spritesmith = require(`gulp.spritesmith`),
    connect = require(`gulp-connect`),
    webserver = require(`gulp-webserver`),

    config = require(`./config`),
    appConfig = config.app,
    sassConfig = config.sass,
    babelConfig = config.babel,
    htmlConfig = config.html,
    watchConfig = config.watch;
    appConfig.port = appConfig.port || 8888;

// sass
gulp.task(`sass`, () => {
    let i = 0,
        src = sassConfig.src,
        outer = sassConfig.outer,
        len = src.length;

    for (; i < len; i++) {
        gulp.src(src[i])
            .pipe(sass().on(`error`, sass.logError))
            .pipe(gulp.dest(outer[i]))
            .pipe(rename({ suffix: `.min` }))
            .pipe(minifycss())
            .pipe(gulp.dest(outer[i]));
    }
});

// babel
gulp.task(`babel`, () => {
    let i = 0,
        src = babelConfig.src,
        outer = babelConfig.outer,
        len = src.length;

    for (; i < len; i++) {
        // ES6 源码存放的路径
        gulp.src(src[i])
            .pipe(babel({
                presets: [`es2015`]
            }))
            .pipe(gulp.dest(outer[i]))
            .pipe(uglify())
            .pipe(rename({ suffix: `.min` }))
            //转换成 ES5 存放的路径
            .pipe(gulp.dest(outer[i]))
            .pipe(notify({ message: `bable task complete` }));
    }
});

// inclued
gulp.task(`fileinclude`, () => {
    let i = 0,
        src = htmlConfig.src,
        outer = htmlConfig.outer,
        len = src.length;

    for (; i < len; i++) {
        gulp.src(src[i])
            .pipe(fileinclude({
                prefix: `@@`,
                basepath: `@file`
            }))
            .pipe(gulp.dest(outer[i]))
            .pipe(notify({ message: `fileinclude task complete` }));
    }
});

gulp.task(`sprite`, () => {
    gulp.src(`./src/images/shop/*.png`)
        .pipe(spritesmith({
            imgName: `shop.png`,
            cssName: `shop.css`
        }))
        .pipe(gulp.dest(`./dist/images/base/`))
        .pipe(notify({ message: `sprite task complete` }));;
});

// 切换 sass
gulp.task(`spritesass`, () => {
    gulp.src(`./src/images/icon/*.png`)
        .pipe(spritesmith({
            imgName: `icon.png`,
            cssName: `sprite.scss`,
            cssFormat: `scss`
        }))
        .pipe(gulp.dest(`./src/sass/base/`))
        .pipe(notify({ message: `sprite task complete` }));;
});

// 自动刷新的 html 路径
gulp.task(`html`, () => {
    let src = htmlConfig.watch;

    gulp.src(src)
        .pipe(connect.reload());
});

gulp.task(`watch`, () => {

    let i = 0,
        src = watchConfig.src,
        task = watchConfig.task,
        len = src.length;

    for (; i < len; i++) {
        gulp.watch(src[i], task[i]);
    }
});

gulp.task(`connect`, () => {
    connect.server({
        //host : `192.168.1.172`, //地址，写默认localhost 
        port: appConfig.port, //端口号，可不写，默认8000
        root: `./`, //当前项目主目录
        livereload: true //自动刷新
    });
});

// webserver
gulp.task(`webserver`, () => {
    gulp.src(`./`)
        .pipe(webserver({
            port: appConfig.port,
            livereload: true,
            directoryListing: true,
            // 启动服务器打开的页面
            open: appConfig.open || `dist/html/index.html`
        }));
});
// 默认任务
gulp.task(`plugins`, [appConfig.server || `connect`, `watch`]);
