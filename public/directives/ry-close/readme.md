### ry-close

* 弹窗的关闭组件

#### config配置

| 属性     | 类型     | 描述               |
| -------- | -------- | ------------------ |
| config   | object   |                    |
| -> click | function | 点击调用父传递函数 |
|          |          |                    |

#### code

```html
<ry-close config="vm.ryCloseConfig"></ry-close>
```

```javascript
vm.ryCloseConfig = {
    click: function() {
        console.log('click');
    }
}
```
