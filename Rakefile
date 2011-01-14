require 'rubygems'
require 'bundler/setup'

task :default => :compile

desc 'Compila o projeto em pkg/dist'
task :compile do
  FileUtils.mkdir_p "pkg/dist"
  Dir["pkg/dist/*"].each{|file| FileUtils.rm_rf file}
  Dir["src/*"].each{|file| FileUtils.cp_r file, "pkg/dist"}
  `java -jar vendor/closure/compiler.jar --jscomp_warning undefinedVars --charset utf8 --compilation_level ADVANCED_OPTIMIZATIONS --js src/1.0.js --js_output_file pkg/dist/1.0.js`
  puts "Compilado em pkg/dist"
end