export default {
  permalink: "news/{{ page.date | date: '%Y/%m' }}/{{ page.fileSlug }}/index.html",
  tags: [
    "posts"
  ],
  layout: "layouts/news.njk",
};
