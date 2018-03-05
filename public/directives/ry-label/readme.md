### ry-label

* 简单封装bootstrap-label

#### config配置

| 属性        | 类型   | 描述                      |
| ----------- | ------ | ------------------------- |
| config      | object |                           |
| -> isDanger | bool   | 是否危险，不是就是success |
|             |        |                           |


#### code

```html
<ry-label config="vm.ryLabelConfig">
    状态
</ry-label>
```

```javascript
vm.ryLabelConfig = {
    isDanger: true
}
```
