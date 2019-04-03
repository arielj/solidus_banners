# -*- encoding: utf-8 -*-
# stub: solidus_banners 1.1.0 ruby lib

Gem::Specification.new do |s|
    s.name = "solidus_banners".freeze
    s.version = "1.0.0"

    s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
    s.require_paths = ["lib".freeze]
    s.authors = ["Ariel Juodziukynas".freeze]
    s.date = "2018-06-06"
    s.description = "A Banner model integrated with Solidus E-Commerce platform.".freeze
    s.email = "arieljuod@gmail.com".freeze
    #s.files = [".gitignore".freeze, "Gemfile".freeze, "LICENSE".freeze, "README.md".freeze, "Rakefile".freeze, "lib/generators/solidus_banners/install/install_generator.rb".freeze, "lib/solidus_banners.rb".freeze, "lib/solidus_banners/engine.rb".freeze, "lib/solidus_banners/solidus_banners_ability.rb".freeze, "solidus_banners.gemspec".freeze]
    s.homepage = "https://github.com/arielj/solidus_banners".freeze
    s.required_ruby_version = Gem::Requirement.new(">= 2.0.0".freeze)
    s.requirements = ["none".freeze]
    s.rubygems_version = "2.6.14".freeze
    s.summary = "SolidusBanners: A Solidus banner model".freeze
    #s.test_files = []

    s.installed_by_version = "2.6.14" if s.respond_to? :installed_by_version

    if s.respond_to? :specification_version then
      s.specification_version = 4

      if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
        s.add_runtime_dependency(%q<solidus>.freeze, ["> 1.0"])
        s.add_runtime_dependency(%q<deface>.freeze, ["~> 1"])
      else
        s.add_dependency(%q<solidus>.freeze, ["> 1.0"])
        s.add_dependency(%q<deface>.freeze, ["~> 1"])
      end
    else
      s.add_dependency(%q<solidus>.freeze, ["> 1.0"])
      s.add_dependency(%q<deface>.freeze, ["~> 1"])
    end
    s.add_dependency('papercrop')
  end
