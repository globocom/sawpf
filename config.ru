require "rubygems"
require "sinatra"

class Application < Sinatra::Base
  set :static, true
  set :public, File.expand_path("..", __FILE__)
end

run Application