// 引入模块
const gulp = require('gulp');
const cssmin = require('gulp-cssmin');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');

// 创建压缩CSS代码任务
function css() {
    return gulp
        .src('./css/**')
        .pipe(cssmin({
            collapseWhitespace: true, // 表示去除空格
            removeEmptyAttributes: true, // 移出空的属性
            minifyCSS: true, // 压缩 style 标签
            minifyJS: true, // 压缩 script 标签
        }))
        .pipe(gulp.dest('./dist/css'))
}

// 创建一个压缩JS代码任务
function js() {
    return gulp
        .src('./js/**')
        .pipe(babel({
             presets: ["env"]
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
}

// 创建一个压缩HTML代码任务
function html() {
    return gulp
        .src('./html/**')
        .pipe(htmlmin({
            removeComments: true, // 清除注释
            collapseWhitespace: true, // 表示去除空格
            removeEmptyAttributes: true, // 移出空的属性
            minifyCSS: true, // 压缩 style 标签
            minifyJS: true, // 压缩 script 标签
        }))
        .pipe(gulp.dest('./dist/html'))
        
}

// 复制静态资源
function data() {
    return gulp
        .src('')
        
}

// 输出任务
exports.css = css
exports.js = js;
exports.html = html;