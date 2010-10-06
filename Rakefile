require 'rubygems'
require 'rake'
require 'fileutils'

task :compile do
  FileUtils.mkdir_p "pkg/dist"
  Dir["pkg/dist/*"].each{|file| FileUtils.rm file}
  Dir["src/**/*"].each{|file| FileUtils.cp file, "pkg/dist"}
  `java -jar vendor/closure/compiler.jar --jscomp_warning undefinedVars --charset utf8 --compilation_level ADVANCED_OPTIMIZATIONS --js src/1.0.js --js_output_file pkg/dist/1.0.js`
  `java -jar vendor/closure/yui.jar src/1.0.js --charset utf8 -o pkg/dist/1.0.yui.js`
  `gzip -9 -c pkg/dist/1.0.js > pkg/dist/1.0.js.gz`
end