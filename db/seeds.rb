# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

3.times do |x|
  Topic.create!(
    title: "Topic #{x}",
  )
end

puts "Topics created."

3.times do |x|
  Blog.create!(
    title: "Blog post #{x}",
    body: "# Markdown
## is fully functional
### with code highlighting

```ruby
puts 'some string'
def method
end
```

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
",
    topic_id: Topic.first.id,
  )
end

3.times do |x|
  Blog.create!(
    title: "Blog post #{x}",
    body: "# Markdown
## is fully functional
### with code highlighting

```ruby
puts 'some string'
def method
end
```

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
",
    topic_id: Topic.second.id,
    status: 1,
  )
end

3.times do |x|
  Blog.create!(
    title: "Blog post #{x}",
    body: "# Markdown
## is fully functional
### with code highlighting

```ruby
puts 'some string'
def method
end
```

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
",
    topic_id: Topic.last.id,
    status: 1,
  )
end

puts "Blog posts created."

5.times do |x|
  Skill.create!(
    title: "Skill #{x}",
    percent_utilized: 15 * x,
  )
end

puts "Skills created."

7.times do |x|
  Portfolio.create!(
    title: "Item #{x}",
    subtitle: "Subtitle #{x}",
    body: "Lorem ipsum body latin latin",
    main_image: "http://placehold.it/600x400",
    thumb_image: "http://placehold.it/350x200",
  )
end

puts "Portfolio items created."

3.times do |x|
  Technology.create!(
    name: "Technology #{x}",
    portfolio_id: Portfolio.last.id,

  )
end

puts "Technologies created."
