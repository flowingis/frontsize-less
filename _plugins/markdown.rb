=begin
  Jekyll tag to include Markdown text from _includes directory preprocessing with Liquid.
  Usage:
    {% markdown %}
    [Markdown link](http://url.com)
    {% endmarkdown %}
  Dependency:
    - kramdown
=end
module Jekyll
  class MarkdownBlock < Liquid::Block
    def initialize(tag_name, text, tokens)
      super
    end
    require "kramdown"
    def render(context)
      content = super
      "#{Kramdown::Document.new(content).to_html}"
    end
  end
end
Liquid::Template.register_tag('markdown', Jekyll::MarkdownBlock)
