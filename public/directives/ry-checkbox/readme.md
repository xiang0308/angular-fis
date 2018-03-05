### ry-checkbox

* 简单封装的复选框

#### config配置

| 属性      | 类型     | 描述                              |
| --------- | -------- | --------------------------------- |
| config    | object   |                                   |
| -> change | function | 改变函数                          |
| ng-model  | bool     | 默认是否选中，和外面的ngModel双绑 |
|           |          |                                   |

#### code 一个单选框

```html
<ry-checkbox ng-model="vm.isAble">可用</ry-checkbox>
```

```javascript
vm.isAble = false;
```


#### code 多个复选框
```html
<div class="ui-dib" ng-repeat="item in vm.checkboxList track by $index">
    <ry-checkbox ng-model="item.checked" config="{
        change: vm.changeCheckBox($index)
    }">{{item.text}}</ry-checkbox>
</div>
```

```javascript
vm.checkboxList = [{
        value: 1,
        checked: false,
        text: '周一'
    },
    {
        value: 2,
        checked: false,
        text: '周二'
    },
    {
        value: 3,
        checked: false,
        text: '周三'
    },
    {
        value: 4,
        checked: false,
        text: '周四'
    },
    {
        value: 5,
        checked: false,
        text: '周五'
    },
    {
        value: 6,
        checked: false,
        text: '周六'
    },
    {
        value: 7,
        checked: false,
        text: '周天'
    }];
vm.changeCheckBox = function($index) {
    return function(val) {
        // do change
    }
}
```
