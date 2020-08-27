module ApplicationHelper
  def login_helper(style)
    if current_user.is_a?(GuestUser)
      (link_to "Register", new_user_registration_path, class: style) + (link_to "Login", new_user_session_path, class: style)
    else
      link_to "Logout", destroy_user_session_path, class: style, method: :delete
    end
  end

  def copyright_generator
    LehuViewTool::Renderer.copyright "Wojciech Lech",
                                     "All  rights reserved"
  end

  module LehuViewTool
    class Renderer
      def self.copyright(name, msg)
        "&copy; #{Time.now.year} | <b>#{name}</b> #{msg}".html_safe
      end
    end
  end
end
