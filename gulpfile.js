var gulp = require("gulp");
var browserify = require("browserify");
var babelify = require("babelify");
var source = require("vinyl-source-stream");
var concat = require("gulp-concat");
var ngHtml2Js = require('browserify-ng-html2js');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var clean = require('gulp-clean');

var devFiles = require("./config/devFiles.json");
var libs = require("./config/libs.json");


// require("./node_modules/angular-ui-router/release/angular-ui-router.min.js");
gulp.task("clean-dev-scripts", ["scripts-build"], function(){
    return gulp.src("./prod/scripts-dev.js")
        .pipe(clean());
});
gulp.task("scripts-dev", function () {
    return browserify(devFiles)
        .transform(babelify, {ignore: /node_modules/, presets: ["es2015"]})
        .transform(ngHtml2Js({
            module: "company.templates",
            baseDir: "app",
            extension: 'html'
        }))
        .bundle()
        .pipe(source("scripts-dev.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest("./prod"));
});

gulp.task("scripts-build", ["scripts-dev"], function(){
    var withDevScripts = ["./prod/scripts-dev.js"];
   return gulp.src(libs.concat(withDevScripts))
       .pipe(concat("scripts.js"))
       .pipe(gulp.dest("./prod"));
});

gulp.task("scripts", ["clean-dev-scripts"]);


gulp.task("styles", function(){
    return gulp.src(["./sass/**/*.scss", "./app/**/*.scss"])
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(concat("styles.css"))
        .pipe(gulp.dest("./prod"))
});

gulp.task("watch", function() {
    gulp.watch(devFiles, ["scripts"]);
    gulp.watch(["./sass/**/*.scss", "./app/**/*.scss"], ["styles"]);
});

gulp.task("default", ["scripts", "styles", "watch"]);