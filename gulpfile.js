const gulp = require('gulp');
const webpack = require('webpack-stream');
const plugins = require('gulp-load-plugins')();
const pkg = require('./package');
const now = new Date();
const scripts = {
  docs: 'docs/js',
  dest: 'dist',
  entry: 'src/js/picker.js',
  i18n: 'i18n/*.js',
  output: 'dist/picker.js',
  src: 'src/js/*.js',
};
const styles = {
  docs: 'docs/css',
  dest: 'dist',
  entry: 'src/less/picker.less',
  output: 'dist/picker.css',
  src: 'src/less/*.less',
};
const banner = `/*!
 * Picker.js v${pkg.version}
 * ${pkg.homepage}
 *
 * Copyright (c) ${now.getFullYear()} ${pkg.author.name}
 * Released under the ${pkg.license} license
 *
 * Date: ${now.toISOString()}
 */

`;

gulp.task('eslint', () => {
  return gulp.src([
    scripts.src,
    'test/**/*.js',
  ])
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format());
});

gulp.task('webpack', () => {
  return gulp.src(scripts.entry)
    .pipe(webpack({
      output: {
        filename: 'picker.js',
        // library: 'Picker',
        libraryTarget: 'umd',
      },
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel',
            query: {
              presets: ['es2015'],
            },
          },
        ],
      },
      devtool: 'source-map',
    }))
    .pipe(gulp.dest(scripts.docs))
    .pipe(gulp.dest(scripts.dest));
});

gulp.task('i18n', () => {
  return gulp.src(scripts.i18n)
    .pipe(gulp.dest(scripts.docs));
});

gulp.task('js', ['eslint', 'webpack', 'i18n'], () => {
  return gulp.src(scripts.output)
    .pipe(plugins.banner(banner))
    .pipe(gulp.dest(scripts.docs))
    .pipe(gulp.dest(scripts.dest))
    .pipe(plugins.uglify())
    .pipe(plugins.banner(banner))
    .pipe(plugins.rename({
      suffix: '.min',
    }))
    .pipe(gulp.dest(scripts.dest));
});

gulp.task('less', () => {
  return gulp.src(styles.entry)
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.less())
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest(styles.docs))
    .pipe(gulp.dest(styles.dest));
});

gulp.task('css', ['less'], () => {
  return gulp.src(styles.output)
    .pipe(plugins.autoprefixer({
      browsers: [
        'Chrome >= 35',
        'Firefox >= 31',
        'Edge >= 12',
        'Explorer >= 9',
        'iOS >= 8',
        'Safari >= 8',
        'Android 2.3',
        'Android >= 4',
        'Opera >= 12',
      ],
    }))
    .pipe(plugins.banner(banner))
    .pipe(gulp.dest(styles.docs))
    .pipe(gulp.dest(styles.dest))
    .pipe(plugins.cleanCss({
      keepSpecialComments: 0,
    }))
    .pipe(plugins.banner(banner))
    .pipe(plugins.rename({
      suffix: '.min',
    }))
    .pipe(gulp.dest(styles.dest));
});

gulp.task('release', ['js', 'css']);

gulp.task('watch', () => {
  gulp.watch(scripts.src, ['webpack']);
  gulp.watch(styles.src, ['less']);
  gulp.watch(scripts.i18n, ['i18n']);
});

gulp.task('default', ['watch']);
