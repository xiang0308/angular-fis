### ry-datepicker

* 日期选择控件-old

#### config配置

| 属性     | 类型     | 描述               |
| -------- | ------ | ------------ |
| ng-model | string | 赋值         |
| options  | object | 参考以下网址 |
|          |        |              |


[options配置信息](https://github.com/fragaria/angular-daterangepicker)

#### code 单日期

```html
<ry-datepicker ng-model="vm.datepickerSingle"></ry-datepicker>
```

```javascript
vm.datepickerSingle = {
    start
}
```
