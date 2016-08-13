module Fdfinder
  class Engine < ::Rails::Engine
    initializer "fdfinder.assets.precompile" do |app|
      #app.config.assets.precompile += %w(../../vendor/assets/fdfinder/*)
      #app.config.assets.precompile += %w(../vendor/assets/images/fdfinder/*)
      #app.config.assets.precompile += %w(fdfinder.css.erb)
      app.config.assets.precompile += %w(assets/images/fdfinder/*)
      app.config.assets.precompile += %w(fdfinder.css)
      app.config.assets.precompile += %w(fdfinder.js)
    end
  end
end
