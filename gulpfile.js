'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    concat       = require('gulp-concat'),
    rigger = require('gulp-rigger'),
    cssnano      = require('gulp-cssnano'),
    rename       = require('gulp-rename'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    cache        = require('gulp-cache'),
    reload = browserSync.reload;

var path = {
    build: {
        html: 'dist',
        js: 'dist/js/',
        css: 'dist/css/',
        img: 'dist/images/',
        fonts: 'dist/fonts/'
    },
    src: {
        html: 'src/template/**/**/*.html',
        // js: 'src/js/scripts.js',
        js: [
            'src/js/vendors/*.js',
            'src/js/_layout.js',
        ],
        style: 'src/scss/styles.scss',
        img: 'src/images/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/template/**/**/*.html',
        js: 'src/js/**/**/*.js',
        style: 'src/**/**/**/*.scss',
        img: 'src/images/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './dist'
};

var config = {
    server: {
        baseDir: "./dist"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Melanina"
};

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(concat('scripts.js'))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass({
            sourceMap: true,
            errLogToConsole: true
        }))
        .pipe(prefixer())
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img)
        .pipe(cache(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        })))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build'
]);


gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});


gulp.task('default', ['build', 'webserver', 'watch']);

// var gulp         = require('gulp'), // Подключаем Gulp
//     sass         = require('gulp-sass'), //Подключаем Sass пакет,
//     browserSync  = require('browser-sync'), // Подключаем Browser Sync
//     concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
//     uglify       = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
//     cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
//     rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
//     del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
//     imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
//     pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
//     cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
//     autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов


// /* ------------------------
//  Собираем в src
//  ------------------------ */
// // Создаем таск browser-sync
// gulp.task('browser-sync', function() {
//     browserSync({ // Выполняем browserSync
//         server: { // Определяем параметры сервера
//             baseDir: './dist' // Директория для сервера - app
//         },
//     });
// });
//
// // Создаем таск Sass
// gulp.task('sass', function(){
//     return gulp.src('src/scss/styles.scss') // Берем источник
//         .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
//         .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
//         .pipe(gulp.dest('src/css')) // Выгружаем результата в папку src/css
//         .pipe(browserSync.stream()) // Обновляем CSS на странице при изменении
// });
//
// // Выбираем файл для минификации
// gulp.task('css-libs', ['sass'], function() {
//     return gulp.src('src/css/styles.css')
//         .pipe(cssnano()) // Сжимаем
//         .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
//         .pipe(gulp.dest('src/css')) // Выгружаем в папку app/css
//         .pipe(browserSync.stream());
// });
//
// // Создаем таск JS
// gulp.task('scripts', function() {
//     return gulp.src([ // Берем все необходимые библиотеки
//         'src/js/vendors/*.js', // Берем js из vendors_js
//         'src/components/menu/_classie.js', // Берем js из компонентов
//         'src/components/menu/_mlpushmenu.js',
//         'src/js/_layout.js', // Берем дополнительные скрипты шаблона
//     ])
//         .pipe(concat('scripts.js')) // Конкатенируем файлы в один src/js/scripts.js
//         .pipe(uglify()) // Сжимаем JS файл
//         .pipe(gulp.dest('src/js')) // Выгружаем в папку src/js
//         .pipe(browserSync.stream());
// });
//
// // Наблюдение за файлами
// gulp.task('watch', ['browser-sync', 'css-libs', 'scripts', 'sass'], function() {
//     gulp.watch('src/**/**/**/**/**/*.scss', ['sass', 'css-libs']); // Наблюдение за scss файлами в scss
//     gulp.watch('src/**/**/**/**/*.pug', ['build']); // Наблюдение за pug файлами
//     gulp.watch('src/js/**/**/*.js', ['scripts', 'build']);   // Наблюдение за JS файлами в папке js
// });
//
// /* ------------------------
//  Переносим в dist
//  ------------------------ */
//
// // Очищаем папку dist перед сборкой
// gulp.task('clean', function() {
//     return del.sync('dist')
// });
//
// // Оптимизируем изображения
// gulp.task('img', function() {
//     return gulp.src('src/images/**/*') // Берем все изображения из src
//         .pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
//             interlaced: true,
//             progressive: true,
//             svgoPlugins: [{removeViewBox: false}],
//             use: [pngquant()]
//         })))
//         .pipe(gulp.dest('dist/images')); // Выгружаем в продакшен
// });
//
// // Переносим библиотеки в dist
// gulp.task('build', ['clean', 'img', 'scripts', 'sass'], function() {
//
//     // Переносим стили
//     var buildCss = gulp.src('src/css/styles.min.css')
//         .pipe(gulp.dest('dist/css'));
//
//     // Переносим шрифты
//     var buildFonts = gulp.src('src/fonts/**/**/**/*')
//         .pipe(gulp.dest('dist/fonts'));
//
//     // Переносим скрипты
//     var buildJs = gulp.src('src/js/scripts.min.js')
//         .pipe(gulp.dest('dist/js'));
//
//     // Переносим HTML
//     var buildHtml = gulp.src('src/template/**/*.html')
//         .pipe(gulp.dest('dist'));
//
// });
//
// gulp.task('clear', function (callback) {
//     return cache.clearAll();
// });
//
// gulp.task('default', ['watch']);