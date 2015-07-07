# jquery-obj2table [![Build Status](https://travis-ci.org/alexdesignworks/jquery-obj2table.svg)](https://travis-ci.org/alexdesignworks/jquery-obj2table) [![Code Climate](https://codeclimate.com/github/alexdesignworks/jquery-obj2table/badges/gpa.svg)](https://codeclimate.com/github/alexdesignworks/jquery-obj2table)

Converts this

```javascript
{
  rows: [
    ['A11', 'B12', 'C13'],
    ['A21', 'B22', 'C23'],
    ['A31', 'B32', 'C33']
  ]
}
```
to this
```html
<table>
  <tbody>
    <tr>
      <td>A11</td>
      <td>B12</td>
      <td>C13</td>
    </tr>
    <tr>
      <td>A21</td>
      <td>B22</td>
      <td>C23</td>
    </tr>
    <tr>
      <td>A31</td>
      <td>B32</td>
      <td>C33</td>
    </tr>
  </tbody>
</table>
```
to produce this table

<table>
  <tbody>
    <tr>
      <td>A11</td>
      <td>B12</td>
      <td>C13</td>
    </tr>
    <tr>
      <td>A21</td>
      <td>B22</td>
      <td>C23</td>
    </tr>
    <tr>
      <td>A31</td>
      <td>B32</td>
      <td>C33</td>
    </tr>
  </tbody>
</table>

Or this
```javascript
{
  caption: 'Missing cells - autospan ON',
  rows: [
    ['A11', 'B12', 'C13', {
      data: 'C14',
      attributes: {
        bgcolor: 'blue'
      }
    }],
    ['A21', 'B22', 'C23'],
    ['A31', 'B32', 'C33', 'C34', 'C35'],
    ['A41', 'B42', 'C43'],
    ['A51', 'B52', 'C53']
  ],
  attributes: {
    border: '1'
  },
  autospan: true,
  incrementRows: true,
  incrementColumns: true,
  zebra: true,
  rowFirst: 'row-first',
  rowLast: 'row-last',
  columnFirst: 'column-first',
  columnLast: 'column-last'
}
```
to this
```
<table border="1">
  <caption>Missing cells - autospan ON</caption>
  <tbody>
    <tr class="row-1 row-first odd">
      <td class="column-1 column-first">A11</td>
      <td class="column-2">B12</td>
      <td class="column-3">C13</td>
      <td bgcolor="blue" class="column-4 column-last" colspan="2">C14</td>
    </tr>
    <tr class="row-2 even">
      <td class="column-1 column-first">A21</td>
      <td class="column-2">B22</td>
      <td class="column-3 column-last" colspan="3">C23</td>
    </tr>
    <tr class="row-3 odd">
      <td class="column-1 column-first">A31</td>
      <td class="column-2">B32</td>
      <td class="column-3">C33</td>
      <td class="column-4">C34</td>
      <td class="column-5 column-last">C35</td>
    </tr>
    <tr class="row-4 even">
      <td class="column-1 column-first">A41</td>
      <td class="column-2">B42</td>
      <td class="column-3 column-last" colspan="3">C43</td>
    </tr>
    <tr class="row-5 row-last odd">
      <td class="column-1 column-first">A51</td>
      <td class="column-2">B52</td>
      <td class="column-3 column-last" colspan="3">C53</td>
    </tr>
  </tbody>
</table>
```
to produce this more advance table
<table border="1">
  <caption>Missing cells - autospan ON</caption>
  <tbody>
    <tr class="row-1 row-first odd">
      <td class="column-1 column-first">A11</td>
      <td class="column-2">B12</td>
      <td class="column-3">C13</td>
      <td bgcolor="blue" class="column-4 column-last" colspan="2">C14</td>
    </tr>
    <tr class="row-2 even">
      <td class="column-1 column-first">A21</td>
      <td class="column-2">B22</td>
      <td class="column-3 column-last" colspan="3">C23</td>
    </tr>
    <tr class="row-3 odd">
      <td class="column-1 column-first">A31</td>
      <td class="column-2">B32</td>
      <td class="column-3">C33</td>
      <td class="column-4">C34</td>
      <td class="column-5 column-last">C35</td>
    </tr>
    <tr class="row-4 even">
      <td class="column-1 column-first">A41</td>
      <td class="column-2">B42</td>
      <td class="column-3 column-last" colspan="3">C43</td>
    </tr>
    <tr class="row-5 row-last odd">
      <td class="column-1 column-first">A51</td>
      <td class="column-2">B52</td>
      <td class="column-3 column-last" colspan="3">C53</td>
    </tr>
  </tbody>
</table>

## Configuration options

```javascript
{
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
}
```      
