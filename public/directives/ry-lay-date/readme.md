### ry-lay-date

* lay-date 日期选择控件

#### config配置

| 属性           | 类型     | 描述     |
| -------------- | -------- | -------- |
| config         | object   |          |
| -> placeholder | string   | 提示信息 |
| -> value       | string   | 值       |
| -> done        | function | 改变调用 |
|                |          |          |


[参考文档](http://www.layui.com/laydate/)

#### code

```html
<ry-lay-date config="{
        placeholder: '选择时间',
        value: vm.time,
        done: vm.changeDateTimePicker('time')
    }">
</ry-lay-date>
```

```javascript
vm.time = '';
vm.changeDateTimePicker = function(key) {
    return function(val) {
        $scope.$apply(function() {
            vm[key] = val;
        });
    }
}
```
