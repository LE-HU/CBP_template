# CBP_template

## Cover/Blog/Portfolio website template

Site inspired by DevcampPortfolio by Jordan Hudgens.

Project presents a working solution of:

- Cover layout including home/about/contact static pages.
- Blog site template with markdown integration.
- Portfolio showcase using bootstrap cards for portfolio items.
- Twitter API connection for tweet feed as an extras.

- Authentication/Authorization using devise & petergate gems for site_admin user role.
- Site admin user is authorized to perform CRUD operations on Blogs and Portfolios. App does have separate admin panels for such ops.

Aesthetics/layout composed using the Bootstrap framework.

## Fork/reuse instructions

- In order to use Twitter API, please provide API keys in .env file (dotenv-rails way of storing credentials).
- Seeds file populated with all of the example resources needed to populate the pages - run the following in your terminal

```ruby
rails db:setup
```

- Authorize a user by setting it's role parameter to :site_admin. Mind presence of example admin user in predefined seeds.rb file.

# Heroku live app

- Live app available for demo @ https://cbp-template.herokuapp.com/
- Site_admin password changed from default seed-one :)

# MIT License
