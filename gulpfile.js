const { src, dest } = require('gulp');
const concat = require('gulp-concat');

function package() {
    return src('./dist/child1/{runtime, polyfills, styles, main}.js')
    .pipe(concat('elements.js'))         // 合并all.js文件
    .pipe(dest('./dist'));
}

exports.package = package;