/**
 * @@title
 * @@description
 *
 * Version: @@version
 * Author: @@author_name (@@author_email)
 * License: @@license
 */

;
(function ($, window, document, undefined) {
  "use strict";
  $.fn.obj2table = function (obj) {
    // Merge with defaults.
    obj = $.extend({}, {
      caption: '',
      responsive: false,
      header: [],
      rows: [],
      attributes: [],
      zebra: false,
      autospan: false,
      columnFirst: '',
      columnLast: '',
      rowFirst: '',
      rowLast: '',
      incrementCols: false,
      incrementRows: false,
      empty: false,
      tableTag: 'table',
      captionTag: 'caption',
      headTag: 'thead',
      bodyTag: 'tbody',
      headCellTag: 'th',
      rowTag: 'tr',
      cellTag: 'td'
    }, obj);

    var _createTable = function (obj) {
      // Reset all elements to divs if the table is responsive, and prevent auto
      // spanning.
      if (obj.responsive) {
        obj.tableTag = obj.captionTag = obj.headTag = obj.bodyTag = obj.rowTag = obj.cellTag = 'div';
      }

      // Return early if there are no rows to display.
      if (obj.rows.length == 0) {
        if (obj.empty === false) {
          // Do not render anything.
          return '';
        }
        else if (typeof obj.empty == 'string') {
          // Render empty text.
          return obj.empty;
        }
        else {
          // Boolean true - continue and display table 'as-is'.
        }
      }

      // Create table.
      var $table = $('<' + obj.tableTag + '></' + obj.tableTag + '>')
        .addClass('obj2table-table');

      if (obj.responsive) {
        $table.addClass('obj2table-responsive');
      }

      // Create caption.
      if (obj.caption != '') {
        $table.append('<' + obj.captionTag + ' class="obj2table-caption">' + obj.caption + '</' + obj.captionTag + '>');
      }

      // @todo: Implement this.
      if (obj.header.length > 0) {
        var $thead = $('<' + obj.headTag + '></' + obj.headTag + '>')
          .addClass('obj2table-head');
        _createRow($thead, obj.header, 'headCellTag', obj);
        $table.append($thead);
      }

      // Body.
      var $tbody = $('<' + obj.bodyTag + '></' + obj.bodyTag + '>')
        .addClass('obj2table-body');
      for (var i = 0; i < obj.rows.length; i++) {
        _createRow($tbody, obj.rows[i], 'cellTag', obj);

      }

      $table.append($tbody);

      _setAttributes($table, obj.attributes);

      // Add 'cellspan' attribute automatically to the last cell.
      if (obj.autospan !== false) {
        _autospan($table, obj.responsive);
      }

      // Add zebra striping.
      if (obj.zebra) {
        $table.find('obj2table-row').each(function (i) {
          if (i % 2) {
            $(this).addClass('even');
          }
          else {
            $(this).addClass('odd');
          }
        });
      }

      if (obj.incrementCols !== false || obj.incrementRows) {
        _increment($table, obj.incrementRows, obj.incrementCols);
      }

      _markFirstLast($table, obj.rowFirst, obj.rowLast, obj.columnFirst, obj.columnLast);

      // Return table's markup.
      return $table.wrap('<div/>').parent().html();
    };

    var _createRow = function ($container, value, type, settings) {
      if (typeof type == 'undefined') {
        type = 'bodyTag';
      }
      var $row = $('<' + settings.rowTag + '></' + settings.rowTag + '>')
        .attr('class', 'obj2table-row');
      var rowAttr;
      if ($.isPlainObject(value)) {
        if (typeof value.data == 'undefined') {
          // Malformed object - skip it.
          return;
        }
        rowAttr = typeof value.attributes != 'undefined' ? value.attributes : {};
        value = value.data;
        _setAttributes($row, rowAttr);
      }

      for (var j = 0; j < value.length; j++) {
        _createCell($row, value[j], settings[type]);
      }

      $container.append($row);
    };

    var _createCell = function ($container, value, tag) {
      if (typeof tag == 'undefined') {
        tag = 'td';
      }

      var $cell = $('<' + tag + '></' + tag + '>');
      var cell = value;
      var cellAttr;
      if ($.isPlainObject(value)) {
        if (typeof value.data == 'undefined') {
          // Malformed object - skip it.
          return;
        }
        cell = value.data;
        cellAttr = typeof value.attributes != 'undefined' ? value.attributes : {};
        _setAttributes($cell, cellAttr);

        $cell.addClass('obj2table-cell');
      }
      // Insert value.
      $cell.html(cell);
      $container.append($cell);
    };

    var _setAttributes = function ($el, attr) {
      if (typeof $el != 'undefined' && typeof attr != 'undefined' && attr.length != 0) {
        for (var attr_name in attr) {
          $el.attr(attr_name, attr[attr_name]);
        }
      }
    };

    // Autospan does not run on responsive tables.
    var _autospan = function ($table) {
      var headCount = $table.find('thead tr th').length;
      // Assess max cells count per row.
      var rowsMax = 0;
      var $rows = $table.find('tbody tr');
      for (var r = 0; r < $rows.length; r++) {
        rowsMax = Math.max(rowsMax, $rows.eq(r).find('td').length);
      }

      if (headCount > 0 && headCount < rowsMax) {
        $table.find('thead tr th:last').attr('colspan', rowsMax - headCount + 1);
      }

      for (var r = 0; r < $rows.length; r++) {
        var l = $rows.eq(r).find('td').length;
        if (l < rowsMax) {
          $table.find('tbody tr td:last').attr('colspan', rowsMax - headCount);
        }
        $rows.eq(r).find('td:last').attr('colspan', rowsMax - l + 1);
      }
    };

    var _markFirstLast = function ($table, rowsFirst, rowsLast, colsFirst, colsLast) {
      $table.find('thead tr:first, tbody tr:first').addClass(rowsFirst);
      $table.find('thead tr:last, tbody tr:last').addClass(rowsLast);
      $table.find('thead tr, tbody tr').each(function () {
        $(this).find('th:first, td:first').addClass(colsFirst);
        $(this).find('th:last, td:last').addClass(colsLast);
      });
    };

    var _increment = function ($table, rows, cols) {
      $table.find('.obj2table-head .obj2table-row').each(function (i) {
        if (rows !== false) {
          $(this).addClass('row-' + (i + (rows === true ? 0 : rows)));
        }
        $(this).find('.obj2table-cell').each(function (i) {
          if (cols !== false) {
            $(this).addClass('col-' + (i + (cols === true ? 0 : cols)));
          }
        });
      });

      $table.find('.obj2table-body .obj2table-row').each(function (i) {
        if (rows !== false) {
          $(this).addClass('row-' + (i + (rows === true ? 0 : rows)));
        }
        $(this).find('.obj2table-cell').each(function (i) {
          if (cols !== false) {
            $(this).addClass('col-' + (i + (cols === true ? 0 : cols)));
          }
        });
      });
    };

    return _createTable(obj);
  };
}(jQuery, window, document));
