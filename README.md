# jquery-obj2table [![Build Status](https://travis-ci.org/alexdesignworks/jquery-obj2table.svg)](https://travis-ci.org/alexdesignworks/jquery-obj2table)

## Converts this

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
<table class="obj2table-table">
  <tbody class="obj2table-body">
  <tr class="obj2table-row">
    <td>A11</td>
    <td>B12</td>
    <td>C13</td>
  </tr>
  <tr class="obj2table-row">
    <td>A21</td>
    <td>B22</td>
    <td>C23</td>
  </tr>
  <tr class="obj2table-row">
    <td>A31</td>
    <td>B32</td>
    <td>C33</td>
  </tr>
  </tbody>
</table>
```
to produce this table

<table class="obj2table-table">
  <tbody class="obj2table-body">
  <tr class="obj2table-row">
    <td>A11</td>
    <td>B12</td>
    <td>C13</td>
  </tr>
  <tr class="obj2table-row">
    <td>A21</td>
    <td>B22</td>
    <td>C23</td>
  </tr>
  <tr class="obj2table-row">
    <td>A31</td>
    <td>B32</td>
    <td>C33</td>
  </tr>
  </tbody>
</table>

## Or this
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
  autospan: true,
  attributes: {
    border: '1'
  }
}
```
to this
```html
<table class="obj2table-table" border="1">
  <caption class="obj2table-caption">Missing cells - autospan ON</caption>
  <tbody class="obj2table-body">
  <tr class="obj2table-row">
    <td>A11</td>
    <td>B12</td>
    <td>C13</td>
    <td bgcolor="blue" class="obj2table-cell" colspan="2">C14</td>
  </tr>
  <tr class="obj2table-row">
    <td>A21</td>
    <td>B22</td>
    <td colspan="3">C23</td>
  </tr>
  <tr class="obj2table-row">
    <td>A31</td>
    <td>B32</td>
    <td>C33</td>
    <td>C34</td>
    <td colspan="1">C35</td>
  </tr>
  <tr class="obj2table-row">
    <td>A41</td>
    <td>B42</td>
    <td colspan="3">C43</td>
  </tr>
  <tr class="obj2table-row">
    <td>A51</td>
    <td>B52</td>
    <td colspan="3">C53</td>
  </tr>
  </tbody>
</table>
```
to produce this more advance table
<table class="obj2table-table" border="1">
  <caption class="obj2table-caption">Missing cells - autospan ON</caption>
  <tbody class="obj2table-body">
  <tr class="obj2table-row">
    <td>A11</td>
    <td>B12</td>
    <td>C13</td>
    <td bgcolor="blue" class="obj2table-cell" colspan="2">C14</td>
  </tr>
  <tr class="obj2table-row">
    <td>A21</td>
    <td>B22</td>
    <td colspan="3">C23</td>
  </tr>
  <tr class="obj2table-row">
    <td>A31</td>
    <td>B32</td>
    <td>C33</td>
    <td>C34</td>
    <td colspan="1">C35</td>
  </tr>
  <tr class="obj2table-row">
    <td>A41</td>
    <td>B42</td>
    <td colspan="3">C43</td>
  </tr>
  <tr class="obj2table-row">
    <td>A51</td>
    <td>B52</td>
    <td colspan="3">C53</td>
  </tr>
  </tbody>
</table>
