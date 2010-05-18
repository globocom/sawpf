require "rubygems"
require "rake"
$:.unshift(::File.expand_path('../vendor/unittest_js/lib', __FILE__))
require "unittest_js"

namespace :test do
  desc 'Runs all the JavaScript unit tests and collects the results'
  task :run do
    testcases = ENV['TESTCASES']
    browsers_to_test = ENV['BROWSERS'] && ENV['BROWSERS'].split(',')
    tests_to_run = ENV['TESTS'] && ENV['TESTS'].split(',')
    runner = UnittestJS::WEBrickRunner::Runner.new(:test_dir => 'pkg/tests')

    Dir['pkg/tests/*_test.html'].each do |file|
      file = File.basename(file)
      test = file.sub('_test.html', '')
      unless tests_to_run && !tests_to_run.include?(test)
        runner.add_test(file, testcases)
      end
    end
    
    UnittestJS::Browser::SUPPORTED.each do |browser|
      unless browsers_to_test && !browsers_to_test.include?(browser)
        runner.add_browser(browser.to_sym)
      end
    end
    
    trap('INT') { runner.teardown; exit }
    runner.run
  end
  
  desc "xxxx"
  task :build do
    `rm -rf pkg/test && mkdir -p pkg/tests/lib_assets`
    builder = UnittestJS::Builder::SuiteBuilder.new(:input_dir  => "test/unit", :assets_dir => "src", :output_dir => "pkg/tests")
    selected_tests = (ENV['TESTS'] || '').split(',')
    builder.collect(*selected_tests)
    builder.render
  end
end