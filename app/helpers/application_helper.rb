module ApplicationHelper
  def login_helper
    if current_user.is_a?(User)
      link_to "Logout", destroy_user_session_path, method: :delete
    else
      (link_to "Login", new_user_session_path) + "<br>".html_safe + (link_to "Register", new_user_registration_path)
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
