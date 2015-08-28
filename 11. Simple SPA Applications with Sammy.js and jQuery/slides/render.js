function setup() {
  /* globals Reveal, hljs */
  // Full list of configuration options available at:
  // https://github.com/hakimel/reveal.js#configuration
  Reveal.initialize({
    controls: true,
    progress: true,
    history: true,
    center: true,
    slideNumber: 'c / t',
    transition: 'slide', // none/fade/slide/convex/concave/zoom
    // Optional reveal.js plugins
    dependencies: [{
      src: 'https://rawgit.com/TelerikAcademy/Common/master/revealjs-theme/lib/js/classList.js',
      condition: function() {
        return !document.body.classList;
      }
    }, {
      src: 'https://rawgit.com/TelerikAcademy/Common/master/revealjs-theme/plugin/markdown/marked.js',
      condition: function() {
        return !!document.querySelector('[data-markdown]');
      }
    }, {
      src: 'https://rawgit.com/TelerikAcademy/Common/master/revealjs-theme/plugin/markdown/markdown.js',
      condition: function() {
        return !!document.querySelector('[data-markdown]');
      }
    }, {
      src: 'https://rawgit.com/TelerikAcademy/Common/master/revealjs-theme/plugin/highlight/highlight.js',
      async: true,
      /*condition: function() {
          return !!document.querySelector('pre code');
      },*/
      callback: function() {
        hljs.initHighlightingOnLoad();
      }
    }, {
      src: 'https://rawgit.com/TelerikAcademy/Common/master/revealjs-theme/plugin/zoom-js/zoom.js',
      async: true
    }, {
      src: 'https://rawgit.com/TelerikAcademy/Common/master/revealjs-theme/plugin/notes/notes.js',
      async: true
    }]
  });
}

function parseMarkdown(markdown) {
  var sectionsStrings = markdown.split(/<!--[ ]+section start[ ]+-->/g);
  var sections = [];

  markdown = markdown.trim();
  sectionsStrings.forEach(function(sectionString) {

    var slides = [];
    var sectionLines = sectionString.split('\n')
      .filter(function(line) {
        return line !== '';
      });


    var slides = [],
      slide = '';
    sectionLines.forEach(function(sectionLine) {
      sectionLine.trim();
      if (sectionLine.trim().indexOf('# ') === 0 ||
        sectionLine.trim().indexOf('#\t') === 0 ||
        sectionLine.trim().indexOf('attr:') > 0) {
        if (slide.trim() !== '') {
          slides.push(slide);
        }
        if (slide.indexOf('Web Services Overview') >= 0) {
          console.log(slide);
        }
        slide = '';
      }
      slide += sectionLine;
      slide += '\n';
    });
    if (slide.trim() !== '') {
      slides.push(slide);
    }

    sections.push({
      slides
    });
  });
  return sections;
}

function fillSections(sections) {
  'use strict';
  var $sectionsContainer = $("<div/>");
  sections.forEach(function(section, index) {
    if (!section.slides || !section.slides.length || section.slides.every(function(slide) {
        return slide.trim() === '';
      })) {
      return;
    }
    var $masterSection = $('<section />')
      .appendTo($sectionsContainer);

    var attr = {};
    section.slides.forEach(function(slide) {
      slide = slide.trim();
      if (slide.indexOf('<!-- attr: ') >= 0) {
        var fromIndex = slide.indexOf('<!-- attr:'),
          toIndex = slide.indexOf('}', fromIndex + 1),
          attrString = slide.substring(fromIndex + '<!-- attr:'.length, toIndex + 1);
        try {
          eval('attr=' + attrString);
        } catch (ex) {
          console.log(attrString);
        }
        return;
      }

      var $section = $('<section/>')
        .attr('data-markdown', '')
        .appendTo($masterSection);
      if (attr.hasScriptWrapper) {
        slide = '<' + 'script type="text/md-tmp">' +
          slide +
          '</' + 'script>';
      }
      $section.html(slide);

      for (var attrName in attr) {
        $section.attr(attrName, attr[attrName]);
      }
      attr = {};
    });
  });
  $('#slides-container').html($sectionsContainer.html());
}

$(function() {
  $.ajax('README.md', {
    success: function(markdown) {
      var sections = parseMarkdown(markdown);
      fillSections(sections);
      setup();
    }
  });
});
