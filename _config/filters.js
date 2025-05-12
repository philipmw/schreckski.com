import { DateTime } from "luxon";

export default function(eleventyConfig) {
  // https://github.com/11ty/eleventy/issues/1072
  eleventyConfig.addFilter("dropContentFolder", (path) => {
    if (path.endsWith("/index")) {
      path = path.substring(0, -6);
    }

    const pathToDrop = "/content"
    if (path.indexOf(pathToDrop) !== 0) {
      return path;
    }

    return path.slice(pathToDrop.length);
  });

  eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
    // Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
    return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "dd LLLL yyyy");
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    // dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat('yyyy-LL-dd');
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if(!Array.isArray(array) || array.length === 0) {
      return [];
    }
    if( n < 0 ) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  // Return the smallest number argument
  eleventyConfig.addFilter("min", (...numbers) => {
    return Math.min.apply(null, numbers);
  });

  // Return the keys used in an object
  eleventyConfig.addFilter("getKeys", target => {
    return Object.keys(target);
  });

  eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
    return (tags || []).filter(tag => ["all", "posts"].indexOf(tag) === -1);
  });

  eleventyConfig.addFilter("sortAlphabetically", strings =>
    (strings || []).sort((b, a) => b.localeCompare(a))
  );
};
