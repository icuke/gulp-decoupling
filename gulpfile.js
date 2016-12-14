var gulp = require(`gulp`),
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
    
    
    
    config = {
        port: parseInt(Math.random() * 9000) + 1000,

        jsBase: `js/component/base`,
        jsPlugins: `js/component/plugins`,

        cssBase: `base`,
        cssComponent: `component`,
        ui: `ui`,
        src: `linkage`
    };

// sass
gulp.task(`sass`, () => {
    gulp.src([`src/sass/${config.cssBase}/*.scss`])
        .pipe(sass().on(`error`, sass.logError))
        .pipe(gulp.dest(`dist/css/${config.cssBase}`))
        .pipe(rename({ suffix: `.min` }))
        .pipe(minifycss())
        .pipe(gulp.dest(`dist/css/${config.cssBase}`));

    gulp.src([`src/sass/modules/*.scss`])
        .pipe(sass().on(`error`, sass.logError))
        .pipe(gulp.dest(`dist/css/${config.cssComponent}`))
        .pipe(rename({ suffix: `.min` }))
        .pipe(minifycss())
        .pipe(gulp.dest(`dist/css/${config.cssComponent}`))
        .pipe(notify({ message: `Styles task complete` }));
});

// babel
gulp.task(`babel`, () => {
    // ES6 源码存放的路径
    gulp.src([`src/${config.jsBase}/*.js`])
        .pipe(babel({
            presets: [`es2015`]
        }))
        .pipe(gulp.dest(`./dist/${config.jsBase}`))
        .pipe(uglify())
        .pipe(rename({suffix: `.min` }))
        //转换成 ES5 存放的路径
        .pipe(gulp.dest(`./dist/${config.jsBase}`));

    gulp.src([`src/${config.jsPlugins}/*.js`])
        .pipe(babel({
            presets: [`es2015`]
        }))
        .pipe(gulp.dest(`./dist/${config.jsPlugins}`))
        .pipe(uglify())
        .pipe(rename({suffix: `.min` }))
        .pipe(gulp.dest(`./dist/${config.jsPlugins}`));

    gulp.src([`src/js/*.js`])
        .pipe(babel({
            presets: [`es2015`]
        }))
        .pipe(gulp.dest(`./dist/js/*.js`))
        .pipe(uglify())
        .pipe(rename({suffix: `.min`}))
        .pipe(gulp.dest(`./dist/js/*.js`))
        .pipe(notify({ message: `es6 task complete` }));
});

// inclued
gulp.task(`fileinclude`, () => {
    gulp.src([`./src/html/*.html`])
        .pipe(fileinclude({
            prefix: `@@`,
            basepath: `@file`
        }))
        .pipe(gulp.dest(`./dist/html`))
        .pipe(notify({ message: `fileinclude task complete` }));
});

gulp.task(`sprite`, () => {
    return gulp.src(`./src/images/shop/*.png`)
        .pipe(spritesmith({
            imgName: `shop.png`,
            cssName: `shop.css`
        }))
        .pipe(gulp.dest(`./dist/images/base/`))
        .pipe(notify({ message: `sprite task complete` }));;
});

// 切换 sass
gulp.task(`spritesass`, () => {
    return gulp.src(`./src/images/icon/*.png`)
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
    gulp.src(`dist/**/*.html`)
        .pipe(connect.reload());
});

gulp.task(`watch`, () => {
    //return gulp.watch([`./sass/workbench.scss`], [`sass`]);

    //监控dist文件
    gulp.watch([`dist/**/*.html`, `dist/**/*.js`, `dist/**/*css`], [`html`]);

    //编译html文件
    gulp.watch([`src/html/*.html`, `src/html/**/*.html`], [`fileinclude`]);

    gulp.watch([`src/js/*.js`, `src/js/**/*.js`], [`babel`]);

    gulp.watch([`src/sass/*.scss`, `src/sass/**/*.scss`], [`sass`]);
});

gulp.task(`connect`, () => {
    connect.server({
        //host : `192.168.1.172`, //地址，可不写，不写的话，默认localhost 
        port: 9999, //端口号，可不写，默认8000
        root: `./`, //当前项目主目录
        livereload: true //自动刷新
    });
});

// webserver
gulp.task(`webserver`, () => {
    gulp.src(`./`)
        .pipe(webserver({
            port: config.port,
            livereload: true,
            directoryListing: true,
            // 启动服务器打开的页面
            open: `./dist/html/index.html`
        }));
});
// 默认任务
gulp.task(`plugins`, [`connect`, `watch`]);
