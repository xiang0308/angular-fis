### ry-select2

* 封装 jq select2 下拉选插件

#### config配置

| 属性             | 类型       | 描述                                       |
| -------------- | -------- | :--------------------------------------- |
| config         | object   | 配置                                       |
| -> placeholder | string   | 提示信息                                     |
| -> data        | array    | 下拉框数据源                                   |
| -> key         | string   | 插件默认使用id和text加载下拉列表，自定义展示字段key，如key="label" |
| -> allowClear  | boolean  | 是否允许清空选中的值，true为允许默认false                |
| -> change      | function | 选择下拉列表后，获取变化的值                           |
| -> isEdit      | boolean  | 是否编辑状态                                   |
| -> value       | string   | 选中的值                                     |


[参考文档](http://select2.github.io/select2/)

#### code

```html
<ry-select2 config="vm.config"></ry-select2>
```

```javascript
vm.config = {
  placeholder: '请选择设备主',
  key: 'label',
  data: [{
    id: '',
    label: ''
  }, {
    id: 0,
    label: '设备主1'
  }, {
    id: 1,
    label: '设备主2'
  }, {
    id: 2,
    label: '设备主3'
  }, {
    id: 3,
    label: '设备主4'
  }, {
    id: 4,
    label: '设备主5'
  }],
  change: changeField('machineUser')
};
function changeField(key) {
    return function(value) {
        $scope.$applyAsync(function() {
            vm.config.data[key] = value;
        });
    }
}
```
