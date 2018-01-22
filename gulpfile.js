var gulp = require('gulp'); 
var runSequence = require('run-sequence'); // Run tasks sequentially 
var protractor = require("gulp-protractor").protractor; 
var child_process = require('child_process'); 
var path = require('path'); 
 
// define the default task 
gulp.task('default', ['fet']); 
 
gulp.task('stop', function() { 
    process.env.TEST_IN_PROGRESS = "false"; 
    process.exit(); 
}); 
 
////////////////////////////////////////////////////////////////////////////////////////////////////// 
//  FRONT END TESTING 
////////////////////////////////////////////////////////////////////////////////////////////////////// 
 
gulp.task('fet', function(){ 
    runSequence('protractor-install', 'frontTests', 'stop'); 
}) 
 
// Runs all API tests 
gulp.task('frontTests', function () { 
    return gulp.src(['./frontend.test.js']) 
    .pipe(protractor({ 
        configFile: "conf.js", 
    })) 
    .on('error', process.exit.bind(process, 1)); 
})

gulp.task('protractor-install', function(done){ 
    child_process.spawn(getProtractorBinary('webdriver-manager'), ['update'], { 
        stdio: 'inherit' 
    }).once('close', done); 
}); 
 
function getProtractorBinary(binaryName){ 
    var winExt = /^win/.test(process.platform)? '.cmd' : ''; 
    var pkgPath = require.resolve('protractor'); 
    var protractorDir = path.resolve(path.join(path.dirname(pkgPath), '..', 'bin')); 
    return path.join(protractorDir, '/'+binaryName+winExt); 
} 
 
////////////////////////////////////////////////////////////////////////////////////////////////////// 
//  END FRONT END TESTING 
////////////////////////////////////////////////////////////////////////////////////////////////////// 
 
//This will prevent hanging builds and allow for faster failure/feedback 
function swallowError (error) { 
    // If you want details of the error in the console 
    console.log(error.toString()) 
    this.emit('end') 
}