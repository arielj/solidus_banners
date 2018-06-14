Deface::Override.new(:virtual_path => "spree/admin/shared/_menu",
                     :name => "banners_admin_tab",
                     :insert_bottom => "[data-hook='admin_tabs']",
                     :disabled => false) do
                      <<-HTML
                        <% if can? :admin, Spree::Banner %>
                          <%= tab(:banners, label: 'Banners', icon: 'picture-o') %>
                        <% end %>
                      HTML
                     end
