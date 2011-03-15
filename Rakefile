require 'rubygems'
require 'bundler/setup'
require 'evergreen'

task :default => :compile

desc 'Compila o projeto em pkg/dist'
task :compile => 'spec:javascripts' do
  FileUtils.mkdir_p "pkg/dist"
  Dir["pkg/dist/*"].each{|file| FileUtils.rm_rf file}
  Dir["src/*"].each{|file| FileUtils.cp_r file, "pkg/dist"}
  `java -jar vendor/closure/compiler.jar --jscomp_warning undefinedVars --charset utf8 --compilation_level ADVANCED_OPTIMIZATIONS --js src/1.0.js --js_output_file pkg/dist/1.0.js`
  puts "Compilado em pkg/dist"
end

desc "Run a development server."
task :server => :compile do
  require 'webrick'
  server = WEBrick::HTTPServer.new(:Port => 3333, :DocumentRoot => './pkg/dist')
  server.mount '/run.html', WEBrick::HTTPServlet::FileHandler, './run.html'
  server.mount '/lib', WEBrick::HTTPServlet::FileHandler, './lib'
  server.mount '/src', WEBrick::HTTPServlet::FileHandler, './src'
  server.mount '/pkg', WEBrick::HTTPServlet::FileHandler, './pkg'
  ['INT', 'TERM'].each{|signal| trap(signal) { server.shutdown }}
  puts "Serving pkg/dist directory on http://127.0.0.1:3333\n"
  server.start
end

task :spec => 'spec:javascripts'
namespace :spec do
  desc "Run JavaScript specs via Evergreen"
  task :javascripts do
    result = Evergreen::Suite.new(File.dirname(__FILE__)).run
    Kernel.exit(1) unless result
  end
end
