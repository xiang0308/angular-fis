### ng_indeterminate

* 单选框半选状态

#### config配置

| 属性             | 类型 | 描述                     |
| ---------------- | ---- | ------------------------ |
| ng-indeterminate | bool | true 半选 / false 非半选 |
|                  |      |                          |

#### code

```html
<input type="checkbox" ng-indeterminate="vm.isIndeterminate"/>
```

```javascript
vm.isIndeterminate = true;
```
