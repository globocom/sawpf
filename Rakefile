require "rubygems"
require "hanoi"

namespace :test do
  desc "Runs all the JavaScript tests and collects the results"
  JavaScriptTestTask.new(:js) do |t|
    test_cases        = ENV['TESTS'] && ENV['TESTS'].split(',')
    browsers          = ENV['BROWSERS'] && ENV['BROWSERS'].split(',')
    # change this path according to your configuration,
    # it should indicate the root directory of your JavaScript files
    sources_directory = File.expand_path(File.dirname(__FILE__) + "/src")

    t.setup(sources_directory, test_cases, browsers)
  end
end
