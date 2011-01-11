require "rubygems"
require "bundler/setup"
require "sinatra/base"

class Application < Sinatra::Base
  set :static, true
  set :public, "pkg/dist"
end

run Application