var gulp       = require('gulp'), // Подключаем Gulp
    concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
    imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
    pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
    svgSprite = require("gulp-svg-sprites"), // Создание спрайтов
    cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
    autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов


/* ------------------------
 Собираем в src
 ------------------------ */

// Создаем таск autoprefixer
gulp.task('autoprefixer', function(){
    return gulp.src('src/css/styles.css') // Берем источник
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
        .pipe(gulp.dest('dist/css')); // Выгружаем результата в папку src/css
});

// Создаем таск JS
gulp.task('scripts', function() {
    return gulp.src([ // Берем все необходимые библиотеки
        'src/js/vendors/*.js', // Берем js из vendors_js
        'src/js/_layout.js', // Берем дополнительные скрипты шаблона
        'src/components/**/**/**/**/*.js' // Берем js из компонентов
    ])
        .pipe(concat('scripts.js')) // Конкатенируем файлы в один src/js/scripts.js
        .pipe(gulp.dest('src/js')); // Выгружаем в папку src/js
});



/* ------------------------
 Переносим в dist
 ------------------------ */

// Очищаем папку dist перед сборкой
gulp.task('clean', function() {
    return del.sync('dist');
});

// Оптимизируем изображения
gulp.task('img', function() {
    return gulp.src('src/images/**/*') // Берем все изображения из src
        .pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/images')); // Выгружаем в продакшен
});

// Переносим библиотеки
gulp.task('build', ['clean', 'img', 'scripts'], function() {

    // Переносим стили
    var buildCss = gulp.src('src/css/styles.min.css')
        .pipe(gulp.dest('dist/css'));

    // Переносим шрифты
    var buildFonts = gulp.src('src/fonts/**/**/**/*')
        .pipe(gulp.dest('dist/fonts'));

    // Переносим скрипты
    var buildJs = gulp.src('src/js/scripts.min.js')
        .pipe(gulp.dest('dist/js'));

    // Переносим HTML
    var buildHtml = gulp.src('src/template/pages/**/*.html')
        .pipe(gulp.dest('dist'));

});

gulp.task('clear', function (callback) {
    return cache.clearAll();
});

gulp.task('default', ['build']);
