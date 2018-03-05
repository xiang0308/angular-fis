### change-machine-status

* 下拉框默认是string，自动转换成int

#### config配置

| 属性              | 类型 | 描述         |
| ----------------- | ---- | ------------ |
| convert-to-number | -    | 不需要任何值 |
|                   |      |              |

#### code

```html
<select name="" convert-to-number ng-model="vm.ngModel">
    <option value="">请选择</option>
    <option value="1">111</option>
    <option value="2">222</option>
</select>
```

```javascript
vm.ngModel = 1;
```
#### result

```
输入结果
    有值是int类型
    无值是''
```
