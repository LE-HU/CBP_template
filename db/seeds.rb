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

10.times do |x|
  Blog.create!(
    title: "Blog post #{x}",
    body: "lorem ipsum paragraph latin sentence ok
    lorem ipsum paragraph latin sentence ok
    lorem ipsum paragraph latin sentence ok
    lorem ipsum paragraph latin sentence ok
    lorem ipsum paragraph latin sentence ok
    ",
  )
end

puts "Blog posts created."

5.times do |x|
  Skill.create!(
    title: "Rails #{x}",
    percent_utilized: 15,
  )
end

puts "Skills created."

9.times do |x|
  Portfolio.create!(
    title: "Item #{x}",
    subtitle: "Subtitle xyz",
    body: "Lorem ipsum body latin latin",
    main_image: "http://placehold.it/600x400",
    thumb_image: "http://placehold.it/350x200",
  )
end

puts "Portfolio items created"
