/**
 * @file
 * QUnit tests.
 */

(function () {
  QUnit.assert.tableResult = function (obj, html) {
    var actual = $.fn.obj2table(obj);
    return this.equal(actual, html.replace(/>\s+</g, '><'));
  };

  QUnit.module('Render');
  test('Rows', function (assert) {
    assert.tableResult({
        rows: [
          ['A11', 'B12', 'C13'],
          ['A21', 'B22', 'C23'],
          ['A31', 'B32', 'C33']
        ]
      },
      '<table>' +
      '  <tbody>' +
      '    <tr>' +
      '      <td>A11</td>' +
      '      <td>B12</td>' +
      '      <td>C13</td>' +
      '    </tr>' +
      '    <tr>' +
      '      <td>A21</td>' +
      '      <td>B22</td>' +
      '      <td>C23</td>' +
      '    </tr>' +
      '    <tr>' +
      '      <td>A31</td>' +
      '      <td>B32</td>' +
      '      <td>C33</td>' +
      '    </tr>' +
      '  </tbody>' +
      '</table>');
  });

  test('Rows, header, footer', function (assert) {
    assert.tableResult({
        header: [
          ['HA11', 'HB12', 'HC13']
        ],
        rows: [
          ['A11', 'B12', 'C13'],
          ['A21', 'B22', 'C23'],
          ['A31', 'B32', 'C33']
        ],
        footer: [
          ['FA11', 'FB12', 'FC13']
        ]
      },
      '<table>' +
      '  <thead>' +
      '    <tr>' +
      '      <th>HA11</th>' +
      '      <th>HB12</th>' +
      '      <th>HC13</th>' +
      '    </tr>' +
      '  </thead>' +
      '  <tbody>' +
      '    <tr>' +
      '      <td>A11</td>' +
      '      <td>B12</td>' +
      '      <td>C13</td>' +
      '    </tr>' +
      '    <tr>' +
      '      <td>A21</td>' +
      '      <td>B22</td>' +
      '      <td>C23</td>' +
      '    </tr>' +
      '    <tr>' +
      '      <td>A31</td>' +
      '      <td>B32</td>' +
      '      <td>C33</td>' +
      '    </tr>' +
      '  </tbody>' +
      '  <tfoot>' +
      '    <tr>' +
      '      <th>FA11</th>' +
      '      <th>FB12</th>' +
      '      <th>FC13</th>' +
      '    </tr>' +
      '  </tfoot>' +
      '</table>');
  });

  test('Rows with caption', function (assert) {
    assert.tableResult({
        caption: 'Simple example',
        rows: [
          ['A11', 'B12', 'C13'],
          ['A21', 'B22', 'C23'],
          ['A31', 'B32', 'C33']
        ]
      },
      '<table>' +
      '  <caption>Simple example</caption>' +
      '  <tbody>' +
      '    <tr>' +
      '      <td>A11</td>' +
      '      <td>B12</td>' +
      '      <td>C13</td>' +
      '    </tr>' +
      '    <tr>' +
      '      <td>A21</td>' +
      '      <td>B22</td>' +
      '      <td>C23</td>' +
      '    </tr>' +
      '    <tr>' +
      '      <td>A31</td>' +
      '      <td>B32</td>' +
      '      <td>C33</td>' +
      '    </tr>' +
      '  </tbody>' +
      '</table>');
  });

  test('Caption no rows', function (assert) {
    assert.tableResult({
        caption: 'Simple example'
      },
      '');
  });

  test('Table attributes', function (assert) {
    assert.tableResult({
        caption: 'Simple example',
        rows: [
          ['A11']
        ],
        attributes: {
          class: 'class-1 class-2',
          width: '50%'
        }
      },
      '<table class="class-1 class-2" width="50%">' +
      '  <caption>Simple example</caption>' +
      '  <tbody>' +
      '    <tr>' +
      '      <td>A11</td>' +
      '    </tr>' +
      '  </tbody>' +
      '</table>');
  });

  test('Row attributes', function (assert) {
    assert.tableResult({
        caption: 'Simple example',
        rows: [{
          data: ['A11'],
          attributes: {
            class: 'row-class-1 row-class-2',
            width: '50%'
          }
        }]
      },
      '<table>' +
      '  <caption>Simple example</caption>' +
      '  <tbody>' +
      '    <tr class="row-class-1 row-class-2" width="50%">' +
      '      <td>A11</td>' +
      '    </tr>' +
      '  </tbody>' +
      '</table>');
  });

  test('Cell attributes', function (assert) {
    assert.tableResult({
        caption: 'Simple example',
        rows: [[{
          data: 'A11',
          attributes: {
            class: 'cell-class-1 cell-class-2',
            width: '50%'
          }
        }]]
      },
      '<table>' +
      '  <caption>Simple example</caption>' +
      '  <tbody>' +
      '    <tr>' +
      '      <td class="cell-class-1 cell-class-2" width="50%">A11</td>' +
      '    </tr>' +
      '  </tbody>' +
      '</table>');
  });

  test('Empty rows: false', function (assert) {
    assert.tableResult({
        rows: []
      },
      '');
  });

  test('Empty rows: true', function (assert) {
    assert.tableResult({
        rows: [],
        empty: true
      },
      '<table>' +
      '  <tbody>' +
      '    <tr>' +
      '      <td></td>' +
      '    </tr>' +
      '  </tbody>' +
      '</table>');
  });

  test('Empty rows: text', function (assert) {
    assert.tableResult({
        rows: [],
        empty: 'Table has no rows'
      },
      'Table has no rows');
  });

  test('Rows zebra', function (assert) {
    assert.tableResult({
        rows: [
          ['A11'],
          ['A21'],
          ['A31'],
          ['A41']
        ],
        zebra: true
      },
      '<table>' +
      '  <tbody>' +
      '    <tr class="odd">' +
      '      <td>A11</td>' +
      '    </tr>' +
      '    <tr class="even">' +
      '      <td>A21</td>' +
      '    </tr>' +
      '    <tr class="odd">' +
      '      <td>A31</td>' +
      '    </tr>' +
      '    <tr class="even">' +
      '      <td>A41</td>' +
      '    </tr>' +
      '  </tbody>' +
      '</table>');
  });

  test('Rows and columns first/last', function (assert) {
    assert.tableResult({
        rows: [
          ['A11', 'B12', 'C13'],
          ['A21', 'B22', 'C23'],
          ['A31', 'B32', 'C33']
        ],
        rowFirst: 'row-first',
        rowLast: 'row-last',
        columnFirst: 'column-first',
        columnLast: 'column-last'
      },
      '<table>' +
      '  <tbody>' +
      '    <tr class="row-first">' +
      '      <td class="column-first">A11</td>' +
      '      <td>B12</td>' +
      '      <td class="column-last">C13</td>' +
      '    </tr>' +
      '    <tr>' +
      '      <td class="column-first">A21</td>' +
      '      <td>B22</td>' +
      '      <td class="column-last">C23</td>' +
      '    </tr>' +
      '    <tr class="row-last">' +
      '      <td class="column-first">A31</td>' +
      '      <td>B32</td>' +
      '      <td class="column-last">C33</td>' +
      '    </tr>' +
      '  </tbody>' +
      '</table>');
  });

  test('Rows and columns first/last - single', function (assert) {
    assert.tableResult({
        rows: [
          ['A11']
        ],
        rowFirst: 'row-first',
        rowLast: 'row-last',
        columnFirst: 'column-first',
        columnLast: 'column-last'
      },
      '<table>' +
      '  <tbody>' +
      '    <tr class="row-first row-last">' +
      '      <td class="column-first column-last">A11</td>' +
      '    </tr>' +
      '  </tbody>' +
      '</table>');
  });

  test('Rows and columns increment', function (assert) {
    assert.tableResult({
        rows: [
          ['A11', 'B12'],
          ['A21', 'B22']
        ],
        incrementRows: true,
        incrementColumns: true
      },
      '<table>' +
      '  <tbody>' +
      '    <tr class="row-1">' +
      '      <td class="column-1">A11</td>' +
      '      <td class="column-2">B12</td>' +
      '    </tr>' +
      '    <tr class="row-2">' +
      '      <td class="column-1">A21</td>' +
      '      <td class="column-2">B22</td>' +
      '    </tr>' +
      '  </tbody>' +
      '</table>');
  });

  test('Columns autospan', function (assert) {
    assert.tableResult({
        rows: [
          ['A11', 'B12', 'C13'],
          ['A21', 'B22'],
          ['A31', 'B32', 'C33']
        ],
        autospan: true
      },
      '<table>' +
      '  <tbody>' +
      '    <tr>' +
      '      <td>A11</td>' +
      '      <td>B12</td>' +
      '      <td>C13</td>' +
      '    </tr>' +
      '    <tr>' +
      '      <td>A21</td>' +
      '      <td colspan="2">B22</td>' +
      '    </tr>' +
      '    <tr>' +
      '      <td>A31</td>' +
      '      <td>B32</td>' +
      '      <td>C33</td>' +
      '    </tr>' +
      '  </tbody>' +
      '</table>');
  });

  test('Columns autospan - header, body, footer', function (assert) {
    assert.tableResult({
        header: [
          ['HA11', 'HB12', 'HC13']
        ],
        rows: [
          ['A11', 'B12', 'C13', 'D14'],
          ['A21', 'B22'],
          ['A31', 'B32', 'C33']
        ],
        footer: [
          ['FA11', 'FB12']
        ],
        autospan: true
      },
      '<table>' +
      '  <thead>' +
      '    <tr>' +
      '      <th>HA11</th>' +
      '      <th>HB12</th>' +
      '      <th colspan="2">HC13</th>' +
      '    </tr>' +
      '  </thead>' +
      '  <tbody>' +
      '    <tr>' +
      '      <td>A11</td>' +
      '      <td>B12</td>' +
      '      <td>C13</td>' +
      '      <td>D14</td>' +
      '    </tr>' +
      '    <tr>' +
      '      <td>A21</td>' +
      '      <td colspan="3">B22</td>' +
      '    </tr>' +
      '    <tr>' +
      '      <td>A31</td>' +
      '      <td>B32</td>' +
      '      <td colspan="2">C33</td>' +
      '    </tr>' +
      '  </tbody>' +
      '  <tfoot>' +
      '    <tr>' +
      '      <th>FA11</th>' +
      '      <th colspan="3">FB12</th>' +
      '    </tr>' +
      '  </tfoot>' +
      '</table>');
  });

  test('Columns autospan - no colspan=1', function (assert) {
    assert.tableResult({
        rows: [
          ['A11', 'B12'],
          ['A21', 'B22'],
          ['A31', 'B32']
        ],
        autospan: true
      },
      '<table>' +
      '  <tbody>' +
      '    <tr>' +
      '      <td>A11</td>' +
      '      <td>B12</td>' +
      '    </tr>' +
      '    <tr>' +
      '      <td>A21</td>' +
      '      <td>B22</td>' +
      '    </tr>' +
      '    <tr>' +
      '      <td>A31</td>' +
      '      <td>B32</td>' +
      '    </tr>' +
      '  </tbody>' +
      '</table>');
  });

  test('Responsive', function (assert) {
    assert.tableResult({
        caption: 'Simple example',
        rows: [
          ['A11', 'B12', 'C13'],
          ['A21', 'B22', 'C23'],
          ['A31', 'B32', 'C33']
        ],
        responsive: true
      },
      '<div>' +
      '  <div>Simple example</div>' +
      '  <div>' +
      '    <div>' +
      '      <div>A11</div>' +
      '      <div>B12</div>' +
      '      <div>C13</div>' +
      '    </div>' +
      '    <div>' +
      '      <div>A21</div>' +
      '      <div>B22</div>' +
      '      <div>C23</div>' +
      '    </div>' +
      '    <div>' +
      '      <div>A31</div>' +
      '      <div>B32</div>' +
      '      <div>C33</div>' +
      '    </div>' +
      '   </div>' +
      '</div>');
  });

  test('Responsive advanced', function (assert) {
    assert.tableResult({
        caption: 'Simple example',
        rows: [
          ['A11', 'B12', 'C13'],
          ['A21', 'B22', 'C23'],
          ['A31', 'B32', 'C33']
        ],
        responsive: true,
        incrementRows: true,
        incrementColumns: true,
        zebra: true,
        rowFirst: 'row-first',
        rowLast: 'row-last',
        columnFirst: 'column-first',
        columnLast: 'column-last'
      },
      '<div>' +
      '  <div>Simple example</div>' +
      '  <div>' +
      '    <div class="row-1 row-first odd">' +
      '      <div class="column-1 column-first">A11</div>' +
      '      <div class="column-2">B12</div>' +
      '      <div class="column-3 column-last">C13</div>' +
      '    </div>' +
      '    <div class="row-2 even">' +
      '      <div class="column-1 column-first">A21</div>' +
      '      <div class="column-2">B22</div>' +
      '      <div class="column-3 column-last">C23</div>' +
      '    </div>' +
      '    <div class="row-3 row-last odd">' +
      '      <div class="column-1 column-first">A31</div>' +
      '      <div class="column-2">B32</div>' +
      '      <div class="column-3 column-last">C33</div>' +
      '    </div>' +
      '   </div>' +
      '</div>');
  });

  QUnit.module('API');
  test('Arguments', function (assert) {
    var api = $.fn.obj2table({
      rows: [
        ['A11']
      ]
    }, true);
    assert.ok($.isPlainObject(api), 'Return API is an object when explicitly set to true');

    api = $.fn.obj2table({
      rows: [
        ['A11']
      ]
    }, false);
    assert.ok(typeof api === 'string', 'Return API is an string when explicitly set to false');

    api = $.fn.obj2table({
      rows: [
        ['A11']
      ]
    });
    assert.ok(typeof api === 'string', 'Return API is an string when not explicitly set');
  });

  test('Settings', function (assert) {
    var api = $.fn.obj2table({}, true);

    assert.ok($.isPlainObject(api.settings), 'Settings is available through API');
    assert.ok(typeof api.settings.version === 'string', 'Settings value are available through API');
  });

  test('getMaxColumns', function (assert) {
    var api = $.fn.obj2table({}, true),
      header, rows, footer;

    header = [[1, 2], [1, 2, 3], [1, 2]];
    rows = [[1, 2], [1, 2, 3, 4], [1, 2]];
    footer = [[1, 2], [1, 2, 3], [1, 2]];
    assert.equal(api.getMaxColumns([header, rows, footer]), 4, 'Normal rows and cells');

    header = [];
    rows = [[1, 2], [1, 2, 3, 4], [1, 2]];
    footer = [[1, 2], [], [1, 2]];
    assert.equal(api.getMaxColumns([header, rows, footer]), 4, 'Some empty rows and cells');
  });
}());
