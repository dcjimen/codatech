// DEPENDENCIES
var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	order = require('gulp-order'),
	sass = require('gulp-sass'),
	minifyCss = require('gulp-clean-css'),
	sourcemaps = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer'),
	gcmq = require('gulp-group-css-media-queries'),
	pug = require('gulp-pug'),
	rename = require('gulp-rename'),
	purgecss = require('gulp-purgecss'),
	watch = require('gulp-watch'),
	purgecss = require('gulp-purgecss'),
	dateFormat = require('dateformat'),
	browserSync = require('browser-sync').create(),
	reload = browserSync.reload;
	
// IMAGES
gulp.task('images',  () => {
	return gulp.src(['src/assets/img/**/*'])
		.pipe(gulp.dest('dist/images'));
});
//FONTS
gulp.task('fonts', () => {
	return gulp.src(['src/assets/fonts/**/*', 'src/assets/fonts/*'])
		.pipe(gulp.dest('dist/fonts'));
});
//JS
//**//components
gulp.task('components-js', () => {
	return gulp.src(['src/components/**/*.js', 'src/base/js/main.js', 'src/base/partials/**/*.js'])
		.pipe(concat('components.js'))
		.pipe(gulp.dest('dist/js'));
});
gulp.task('js-min', () => {
	return gulp.src(['src/components/**/*.js', 'src/base/js/main.js', 'src/base/partials/**/*.js'])
		.pipe(concat('components.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});
//**//library
gulp.task('scripts-min', () => {
	return gulp.src(['src/base/js/vendors/**.js'])
		.pipe(order([
			'src/base/js/vendors/jquery-2.2.4.min.js',
			'src/base/js/vendors/bootstrap.min.js',
			'src/base/js/vendors/datepicker.js',
			'src/base/js/vendors/*.js'
		], { base: './' }))
		.pipe(concat('scripts.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});
//STYLE
//**// css general
gulp.task('styles-css', () => {
	return gulp.src('src/base/scss/main.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
		
		.pipe(autoprefixer())
		.pipe(concat('styles.css'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/css'));
});
//**// remove unused css general
gulp.task('purgecss', () => {
	return gulp.src(['dist/css/styles.css'])
		.pipe(purgecss({
			content: ['dist/**/*.html', 'dist/**/*.js', 'src/components/**/*.scss', 'src/base/scss/general.scss']
		}))
		.pipe(minifyCss({ processImport: false }))
		.pipe(rename('styles.min.css'))
		.pipe(gulp.dest('dist/css/'))
})
//**// css library
gulp.task('styles-vendors', (done) => {
	gulp.src(['src/base/scss/vendors/**/*.css'])
		.pipe(concat('vendors-concat.css'))
		.pipe(minifyCss({ processImport: false }))
		.pipe(rename('vendors.min.css'))
		.pipe(gulp.dest('dist/css'));
	done();
});

gulp.task('styles-maqueta-css', () => {
	return gulp.src('src/base/scss/main-maqueta.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))

		.pipe(autoprefixer())
		.pipe(concat('styles-maqueta.css'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/css'));
});

gulp.task('purgecss-maqueta', () => {
	return gulp.src(['dist/css/styles-maqueta.css'])
		.pipe(purgecss({
			content: ['dist/**/*.html', 'dist/**/*.js', 'src/components/**/*.scss', 'src/base/scss/general.scss']
		}))
		.pipe(minifyCss({ processImport: false }))
		.pipe(rename('styles-maqueta.min.css'))
		.pipe(gulp.dest('dist/css/'))
})

//**// remove unused css vendors
// gulp.task('purgeVendors', () => {
// 	return gulp.src(['dist/css/vendors.css'])
// 		.pipe(purgecss({
// 			content: ['dist/**/*.html', 'dist/**/*.js']
// 		}))
// 		.pipe(rename('vendors.min.css'))
// 		.pipe(gulp.dest('dist/css/'))
// })

//PUG
gulp.task('pug-comp', (done) => {
	gulp.src(['src/pages/*.pug'])
		.pipe(pug({ pretty: true }))
		.pipe(gulp.dest('dist'));
	done();
});

//COMPILATION COMPONENTS
gulp.task('components', (done) => {
	gulp.src(['src/components/**/*.pug'])
		.pipe(pug({ pretty: true }))
		.pipe(gulp.dest('dist/components/components'));
	gulp.src('src/components/**/*.scss')
		.pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
		.pipe(minifyCss({ processImport: false }))
		.pipe(autoprefixer())
		.pipe(gulp.dest('dist/components/components'));
	gulp.src('src/components/**/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist/components/components'));
	done()
});
//COMPILATION PARTIALS
gulp.task('partials', (done) => {
	gulp.src(['src/base/partials/**/*.pug'])
		.pipe(pug({ pretty: true }))
		.pipe(gulp.dest('dist/components/partials'));
	gulp.src('src/base/partials/**/*.scss')
		.pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
		.pipe(minifyCss({ processImport: false }))
		.pipe(autoprefixer())
		.pipe(gulp.dest('dist/components/partials'));
	gulp.src('src/base/partials/**/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist/components/partials'));
	done()
});


gulp.task('default', gulp.series(['styles-css', 'pug-comp', 'components-js', 'js-min', 'scripts-min', 'images', 'fonts', 'components', 'partials', 'styles-vendors', 'styles-maqueta-css', 'purgecss-maqueta', 'purgecss'], (done) => {
	gulp.watch(['src/base/scss/*.scss', 'src/components/**/*.scss', 'src/base/partials/**/*.scss'], gulp.parallel(["styles-css"]));
	gulp.watch('src/base/scss/vendors/**/*.css', gulp.parallel(["styles-vendors"]));
	gulp.watch(['src/base/scss/*.scss', 'src/components/**/*.scss', 'src/base/partials/**/*.scss'], gulp.parallel(["styles-maqueta-css"]));
	gulp.watch('dist/css/styles.css', gulp.parallel(["purgecss-maqueta"]));
	// gulp.watch('dist/css/vendors.css', gulp.parallel(["purgeVendors"]));
	gulp.watch(['src/pages/*.pug', 'src/components/**/*.pug', 'src/base/pug/*.pug', 'src/base/partials/**/*.pug'], gulp.parallel(["pug-comp", 'styles-css', 'purgecss']));
	gulp.watch(['src/base/js/main.js', 'src/components/**/*.js', 'src/base/partials/**/*.js'], gulp.parallel(["components-js"]));
	gulp.watch(['src/base/js/main.js', 'src/components/**/*.js', 'src/base/partials/**/*.js'], gulp.parallel(["js-min"]));
	gulp.watch('src/base/js/**/*.js', gulp.parallel(["scripts-min"]));
	gulp.watch('src/assets/fonts/**/*', gulp.parallel(["fonts"]));
	gulp.watch('src/assets/img/**/*', gulp.parallel(["images"]));
	gulp.watch(['src/components/**/*.pug', 'src/components/**/*.scss', 'src/components/**/*.js'], gulp.parallel(["components"]));

	browserSync.init({
		server: {
			baseDir: "./dist",
			index: "index.html"
		},
	});

	gulp = require('gulp'),                                                
	gls = require('gulp-live-server');
	gulp.task('serve',()=> {                                          
		server = gls.static('.', 9900);                    
		server.start();                                                   
	});
	gulp.task('default', gulp.series('serve'));


	gulp.watch("dist/css/*.css").on("change", browserSync.reload);
	gulp.watch("dist/*.html").on("change", browserSync.reload);
	gulp.watch("dist/js/*.js").on("change", browserSync.reload);
	gulp.watch("dist/images/*").on("change", browserSync.reload);
	gulp.watch("dist/fonts/*").on("change", browserSync.reload);

}));