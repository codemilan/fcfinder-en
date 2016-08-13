# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'fcfinder/version'

Gem::Specification.new do |spec|
  spec.name          = "fcfinder-en"
  spec.version       = Fcfinder::VERSION
  spec.authors       = ["Furkan \xC3\x87elik", "Indra Dhanurendra"]
  spec.email         = ["furkan.celik32@gmail.com", "indra.dhanurendra@gmail.com"]

  spec.summary       = %q{Rails web-based file explorer}
  spec.description   = %q{Web File Manager For The Rails Integrated in ckeditor and TinyMCE with File Explorer you can use as a quick and simple way.}
  spec.homepage      = "https://github.com/indradha/fcfinder-en"
  spec.license       = "MIT"

  
  spec.files         = `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec|features)/}) }
  spec.bindir        = "exe"
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 1.9"
  spec.add_development_dependency "rake", "~> 10.0"
  spec.add_dependency "mini_magick", "~> 4.2"
  spec.add_dependency "rubyzip", "~> 1.1"

  #spec.requirements << "zip"
  #spec.requirements << "mini_magick"

end
