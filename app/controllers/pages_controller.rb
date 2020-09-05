class PagesController < ApplicationController
  layout "application"

  def home
    @posts = Blog.all
    @skills = Skill.all
    @page_title = "Home"
  end

  def about
    @skills = Skill.all
    @page_title = "About"
  end

  def contact
    @page_title = "Contact"
  end

  def news
    @tweets = SocialTool.twitter_search
    @page_title = "News"
  end
end
