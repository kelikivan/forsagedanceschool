const gulp = require('gulp');
const GulpSSH = require('gulp-ssh')

const config = {
    host: '31.31.196.165',
    port: 22,
    username: 'u0635367',
    password: '7hSY9u4rt0AWKpbu',
}

const gulpSSH = new GulpSSH({
    ignoreErrors: false,
    sshConfig: config
})

gulp.task('deploy:production', function () {
    return gulp
        .src(['dist/**/*'])
        .pipe(gulpSSH.dest('www/forsagedanceschool.ru/'))
})
