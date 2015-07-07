/**
 * obj2table jQuery plugin
 * jQuery plugin to generate table from JavaScript object.
 *
 * Version: 1.0.0
 * Author: Alex Skrypnyk (alex.designworks@gmail.com)
 * License: GPL-2.0
 */

;(function ($, undefined) {
  "use strict";

  var pluginName = 'obj2table',
    version = '1.0.0';

  $.fn[pluginName] = function (obj, api) {
    var settings;

    // Default API usage to false.
    api = api || false;

    // Normalise array of rows.
    obj = $.isArray(obj) ? {rows: obj} : obj;

    // Merge with defaults.
    settings = $.extend({}, {
      // Table caption.
      caption: '',
      // Array of table header cells.
      header: [],
      // Array of table body cells.
      rows: [],
      // Array of table footer cells.
      footer: [],
      // Table attributes object.
      attributes: {},
      // Use zebra classes.
      zebra: false,
      zebraOdd: 'odd',
      zebraEven: 'even',
      // First row class.
      rowFirst: '',
      // First column class.
      rowLast: '',
      // First column class.
      columnFirst: '',
      // Last column class.
      columnLast: '',
      // Boolean flag to add row increment class.
      incrementRows: false,
      // Boolean flag to add column increment class.
      incrementColumns: false,
      // Boolean flag to render table with no data or string for empty text.
      empty: false,
      // Boolean flag to automatically span columns if row length is different.
      autospan: false,
      // Convert table to responsive: all tags become <div>'s.
      responsive: false,
      // Table elements tags.
      tagTable: 'table',
      tagCaption: 'caption',
      tagBody: 'tbody',
      tagHeader: 'thead',
      tagHeaderCell: 'th',
      tagFooter: 'tfoot',
      tagFooterCell: 'th',
      tagRow: 'tr',
      tagCell: 'td'
    }, obj);

    settings.version = version;

    /**
     * Create table from provided object.
     */
    this.createTable = function (s) {
      // Reset all elements to divs if the table is responsive, and prevent auto
      // spanning.
      if (s.responsive) {
        s.tagTable = s.tagCaption = s.tagBody = s.tagHeader = s.tagHeaderCell = s.tagFooter = s.tagFooterCell = s.tagRow = s.tagCell = 'div';
        s.autospan = false;
      }

      // Return early if there are no rows to display.
      if (s.rows.length == 0) {
        if (s.empty === false) {
          // Do not render anything.
          return '';
        }
        else if (typeof s.empty == 'string') {
          // Render empty text.
          return s.empty;
        }
        else {
          // Boolean true - add at lease one row and one cell.
          s.rows.push(['']);
        }
      }

      // Calculate max columns for header, footer and body to allow set colspan
      // for cells, if required.
      if (s.autospan) {
        s.autospan = this.getMaxColumns([s.rows, s.header, s.footer]);
      }

      // Create table.
      var $table = $('<' + s.tagTable + '></' + s.tagTable + '>');
      this.setAttributes($table, s.attributes);

      // Create caption.
      if (s.caption != '') {
        $table.append('<' + s.tagCaption + '>' + s.caption + '</' + s.tagCaption + '>');
      }

      // Create header rows, if provided.
      if (s.header.length > 0) {
        $table.append(this.createElement(s.tagHeader, this.createRows(s.header, s.tagRow, s.tagHeaderCell, s)));
      }

      // Create body rows.
      $table.append(this.createElement(s.tagBody, this.createRows(s.rows, s.tagRow, s.tagCell, s)));

      // Create foot rows, if provided.
      if (s.footer.length > 0) {
        $table.append(this.createElement(s.tagFooter, this.createRows(s.footer, s.tagRow, s.tagFooterCell, s)));
      }

      // Return rendered table markup.
      return $table.wrap('<div/>').parent().html();
    };

    /**
     * Create rows with specified tags for rows and cells.
     */
    this.createRows = function (rows, tagRow, tagCell, settings) {
      var $rows = $(), $row;
      for (var i = 0; i < rows.length; i++) {
        $row = this.createRow(rows[i], tagRow, tagCell, settings);
        this.setDefaultRowClasses($row, i, rows.length, settings);
        $.merge($rows, $row);
      }

      return $rows;
    };

    /**
     * Create a single row with specified tags for rows and cells.
     */
    this.createRow = function (row, tagRow, tagCell, settings) {
      row = this.normaliseDataNode(row);
      var $row = this.createElement(tagRow), $cell;

      for (var i = 0; i < row.data.length; i++) {
        $cell = this.createCell(row.data[i], tagCell);
        this.setDefaultCellClasses($cell, i, row.data.length, settings);

        this.setCellAutospan($cell, i, row.data.length, settings);

        $row.append($cell);
      }

      $row.setAttributes($row, row.attributes);

      return $row;
    };

    /**
     * Create a single cell with specified tag and data
     */
    this.createCell = function (value, tagCell) {
      // Normalise node data to become an expected object.
      value = this.normaliseDataNode(value);
      var $cell = this.createElement(tagCell);

      $cell.html(value.data);
      this.setAttributes($cell, value.attributes);

      return $cell;
    };

    /**
     * Set attributes for provided element.
     */
    this.setAttributes = function ($el, attibutes) {
      if (typeof $el !== 'undefined' && typeof attibutes != 'undefined' && attibutes.length != 0) {
        for (var attribute in attibutes) {
          if (attibutes.hasOwnProperty(attribute)) {
            $el.attr(attribute, attibutes[attribute]);
          }
        }
      }
    };

    /**
     * Create jQuery element with specified tag and value.
     */
    this.createElement = function (tagName, value) {
      value = value || '';
      return $('<' + tagName + '></' + tagName + '>').append(value);
    };

    /**
     * Normalise data node to contain 'data' and 'attributes' fields.
     */
    this.normaliseDataNode = function (node) {
      if ($.isPlainObject(node)) {
        node.data = typeof node.data === 'undefined' ? '' : node.data;
        node.attributes = typeof node.attributes === 'undefined' ? {} : node.attributes;
      }
      else {
        node = {
          data: node,
          attributes: {}
        };
      }

      return node;
    };

    /**
     * Set default css classes for a row.
     */
    this.setDefaultRowClasses = function ($el, index, total, settings) {
      if (settings.incrementRows) {
        $el.addClass('row-' + (index + 1).toString());
      }

      if (index === 0) {
        $el.addClass(settings.rowFirst)
      }

      if (index === total - 1) {
        $el.addClass(settings.rowLast);
      }

      if (settings.zebra) {
        $el.addClass(index % 2 ? settings.zebraEven : settings.zebraOdd);
      }
    };

    /**
     * Set default css classes for a cell.
     */
    this.setDefaultCellClasses = function ($el, index, total, settings) {
      if (settings.incrementColumns) {
        $el.addClass('column-' + (index + 1).toString());
      }

      if (index === 0) {
        $el.addClass(settings.columnFirst)
      }

      if (index === total - 1) {
        $el.addClass(settings.columnLast);
      }
    };

    /**
     * Get max columns across all tables, provided as arguments.
     */
    this.getMaxColumns = function (arrays) {
      var maxCols = 0, i, j;
      for (i = 0; i < arrays.length; i++) {
        for (j = 0; j < arrays[i].length; j++) {
          maxCols = Math.max(maxCols, arrays[i][j].length);
        }
      }

      return maxCols;
    };

    /**
     * Set autospan value for specified cell element.
     *
     * Autospan does not run on responsive tables.
     */
    this.setCellAutospan = function ($el, index, total, settings) {
      if (settings.autospan && index === total - 1 && total < settings.autospan) {
        $el.attr('colspan', settings.autospan - total + 1);
      }
    };

    // Return current plugin object or rendered table markup.
    return api ? this : this.createTable(settings);
  };
}(jQuery));
