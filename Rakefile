require 'rubygems'
require 'rake'

task :compile do
  `rm -rf pkg/dist`
  `mkdir -p pkg/dist`
  `cp src/*.gif pkg/dist`
  `java -jar vendor/closure/compiler.jar --jscomp_warning undefinedVars --charset utf8 --compilation_level ADVANCED_OPTIMIZATIONS --js src/1.0.js --js_output_file pkg/dist/1.0.js --externs lib/jquery.externs.js`
  `gzip -9 -c pkg/dist/1.0.js > pkg/dist/1.0.js.gz`
end