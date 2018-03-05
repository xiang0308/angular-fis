### ry-radio

* 简单封装的复选框

#### config配置

| 属性     | 类型          | 描述                  |
| -------- | ------------- | --------------------- |
| ng-model | string or int | 如果和value相等就选中 |
| ng-value | string or int | 真实值                |



#### code 多个复选框
```html
<div class="ui-dib" ng-repeat="item in vm.deelResult.data track by $index">
     <ry-radio ng-model="vm.deelResult.ngModel" ng-value="item.value">{{item.text}}</ry-radio>
</div>
```

```javascript
vm.deelResult = {
    ngModel: 1,
    data: [
        {
            value: 1,
            text: '维修中'
        },
        {
            value: 2,
            text: '设备正常，无需维修'
        },
        {
            value: 3,
            text: '已报废'
        }
    ]
};
```
