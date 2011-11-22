Evergreen.configure do |config|
  config.root = File.expand_path(File.join(__FILE__, '../..'))
  config.public_dir = ''
  config.template_dir = 'spec/templates'
  config.spec_dir = 'spec'
end
