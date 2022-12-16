const htmlmin = require("html-minifier");
const yaml = require("js-yaml");
const markdownIt = require("markdown-it");
const markdownItRenderer = new markdownIt();
const { DateTime } = require("luxon");

module.exports = (config) => {
  config.addPassthroughCopy("src/images");
  config.addPassthroughCopy({ "src/static": "/" });
  // config.addPassthroughCopy("src/admin/config.yml");
  config.addFilter("markdown", (data) => markdownItRenderer.render(data));
  config.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "dd LLL yyyy"
    );
  });
  config.addDataExtension("yaml", (contents) =>
    yaml.safeLoad(contents)
  );
  config.addTransform("htmlmin", function (content, outputPath) {
    if (outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }

    return content;
  });

  return {
    dir: {
      input: "src",
    },
      htmlTemplateEngine: "njk",
  }
};
