/**
 * obj2table jQuery plugin
 * jQuery plugin to generate table from JavaScript object.
 *
 * Version: 1.0.0
 * Author: Alex Skrypnyk (alex.designworks@gmail.com)
 * License: GPL-2.0
 */

(function ($, undefined) {
  'use strict';

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
     * Process settings.
     */
    this.processSettings = function (s) {
      // Reset all elements to divs if the table is responsive, and prevent auto
      // spanning.
      if (s.responsive) {
        s.tagTable = s.tagCaption = s.tagBody = s.tagHeader = s.tagHeaderCell = s.tagFooter = s.tagFooterCell = s.tagRow = s.tagCell = 'div';
        s.autospan = false;
      }

      // Calculate max columns for header, footer and body to allow set colspan
      // for cells, if required.
      if (s.autospan) {
        s.autospan = this.getMaxColumns([s.rows, s.header, s.footer]);
      }

      this.settings = s;
    };

    /**
     * Create table from provided object.
     */
    this.createTable = function () {
      var $table, sectionMap, key, s = this.settings;

      // Create table.
      $table = this.createElement(s.tagTable);
      this.setAttributes($table, s.attributes);

      // Create table caption.
      this.createCaption($table);

      // Map of table sections: header, body and footer.
      sectionMap = {
        header: {
          tag: s.tagHeader,
          tagRow: s.tagRow,
          tagCell: s.tagHeaderCell,
          data: s.header
        },
        body: {
          tag: s.tagBody,
          tagRow: s.tagRow,
          tagCell: s.tagCell,
          data: s.rows
        },
        footer: {
          tag: s.tagFooter,
          tagRow: s.tagRow,
          tagCell: s.tagFooterCell,
          data: s.footer
        }
      };

      // Create table sections from the provided section map.
      for (key in sectionMap) {
        if (sectionMap.hasOwnProperty(key) && sectionMap[key].data.length > 0) {
          $table.append(this.createElement(sectionMap[key].tag, this.createRows(sectionMap[key].data, sectionMap[key].tagRow, sectionMap[key].tagCell)));
        }
      }

      // Return rendered table markup.
      return this.renderElement($table);
    };

    /**
     * Create table caption.
     */
    this.createCaption = function ($table) {
      if (this.settings.caption !== '') {
        $table.append(this.createElement(this.settings.tagCaption, this.settings.caption));
      }
    };

    /**
     * Create rows with specified tags for rows and cells.
     */
    this.createRows = function (rows, tagRow, tagCell) {
      var $rows = $(), $row, i;
      for (i = 0; i < rows.length; i++) {
        $row = this.createRow(rows[i], tagRow, tagCell);
        this.setDefaultRowClasses($row, i, rows.length);
        $.merge($rows, $row);
      }

      return $rows;
    };

    /**
     * Create a single row with specified tags for rows and cells.
     */
    this.createRow = function (row, tagRow, tagCell) {
      var $row = this.createElement(tagRow), $cell, i;
      row = this.normaliseDataNode(row);

      for (i = 0; i < row.data.length; i++) {
        $cell = this.createCell(row.data[i], tagCell);
        this.setDefaultCellClasses($cell, i, row.data.length);

        this.setCellAutospan($cell, i, row.data.length);

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
      if (typeof $el !== 'undefined' && typeof attibutes !== 'undefined' && attibutes.length !== 0) {
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
     * Get element's rendered markup.
     */
    this.renderElement = function ($el) {
      return $el.wrap('<div/>').parent().html();
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
    this.setDefaultRowClasses = function ($el, index, total) {
      var s = this.settings;

      if (s.incrementRows) {
        $el.addClass('row-' + (index + 1).toString());
      }

      if (index === 0) {
        $el.addClass(s.rowFirst);
      }

      if (index === total - 1) {
        $el.addClass(s.rowLast);
      }

      if (settings.zebra) {
        $el.addClass(index % 2 ? s.zebraEven : s.zebraOdd);
      }
    };

    /**
     * Set default css classes for a cell.
     */
    this.setDefaultCellClasses = function ($el, index, total) {
      var s = this.settings;

      if (s.incrementColumns) {
        $el.addClass('column-' + (index + 1).toString());
      }

      if (index === 0) {
        $el.addClass(s.columnFirst);
      }

      if (index === total - 1) {
        $el.addClass(s.columnLast);
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
    this.setCellAutospan = function ($el, index, total) {
      if (this.settings.autospan && index === total - 1 && total < this.settings.autospan) {
        $el.attr('colspan', this.settings.autospan - total + 1);
      }
    };

    /**
     * Render empty table result.
     */
    this.renderEmpty = function () {
      if (this.settings.empty === false) {
        // Do not render anything.
        return '';
      }
      else if (typeof this.settings.empty === 'string') {
        // Render empty text.
        return this.settings.empty;
      }
      else {
        // Boolean true - add at least one row and one cell.
        this.settings.rows.push(['']);
        return this.createTable();
      }
    };

    // Process settings.
    this.processSettings(settings);

    return api ? this : (this.settings.rows.length === 0 ? this.renderEmpty() : this.createTable());
  };
}(jQuery));
