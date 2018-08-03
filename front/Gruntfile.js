module.exports = function (grunt) {

  grunt.initConfig({
    responsive_images: {
      dev: {
        options: {
          sizes: [{
            name: 'mobile',
            width: '30%',
            quality: 50
          }, {
            name: 'tablet',
            width: '50%',
            quality: 70
          }, {
            name: 'desktop',
            width: '100%',
            quality: 100
          }]
        },
        files: [{
          expand: true,
          src: ['*.{gif,jpg,png}'],
          cwd: 'src/assets/img',
          dest: 'src/assets/images'
        }]
      }
    },
  });

  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.registerTask('default', ['responsive_images']);

};