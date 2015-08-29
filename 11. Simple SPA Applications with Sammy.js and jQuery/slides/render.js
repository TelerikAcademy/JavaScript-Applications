var render = (function() {
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
          eval('attr=' + attrString);
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

  function render(filename) {
    $.ajax(filename, {
      success: function(markdown) {
        var sections = parseMarkdown(markdown);
        fillSections(sections);
        setupRevealJs();
      },
      error: function(err) {
        console.log(JSON.stringify(err));
        $('<section />')
          .attr('data-markdown', '')
          .html(
            '#  If the presentation does not show locally\n' +
            '*  If the presentation does not show locally' +
            ' 1.  Install Node.js\n' +
            ' 2.  Run on the Command Line `npm install & npm start`\n'
          ).appendTo('#slides-container');
      }
    });
  }

  return render;
}());
