### ry-upload-preview

* 上传图片预览

#### config配置

| 属性     | 类型   | 描述                        |
| -------- | ------ | --------------------------- |
| config   | object |                             |
| -> type  | string | 类型，img or video or flash |
| -> src   | string | 素材地址                    |
| -> index | int    | 宽度                        |
| -> list  | array  | 一组图片素材                |
|          |        |                             |


#### code 预览图片
```html
<ry-upload-preview config="vm.config" ng-if="{
    src: vm.config.src,
    type: vm.config.type
}">
</ry-upload-preview>
```

```javascript
vm.config = {
    src: 'http://',
    type: 'img'
}
```

#### code 预览图片带大图
```html
<ry-upload-preview config="vm.config" ng-if="{
    src: vm.config.src,
    type: vm.config.type,
    index: 0,
    list: [vm.config.src]
}">
</ry-upload-preview>
```

```javascript
vm.config = {
    src: 'http://',
    type: 'img'
}
```
