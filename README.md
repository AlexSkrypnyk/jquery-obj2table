# jquery-obj2table [![Build Status](https://travis-ci.org/alexdesignworks/jquery-obj2table.svg)](https://travis-ci.org/alexdesignworks/jquery-obj2table)

Converts

```javascript
{
  rows: [
    ['A11', 'B12', 'C13'],
    ['A21', 'B22', 'C23'],
    ['A31', 'B32', 'C33']
  ]
}
```

to

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
