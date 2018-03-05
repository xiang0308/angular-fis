### ry-upload

* 上传组件

#### config配置

| 属性             | 类型     | 描述                  |
| ---------------- | -------- | --------------------- |
| config           | object   |                       |
| -> type          | string   | img or flash or video |
| -> src           | string   | 素材地址              |
| -> pattern       | string   |                       |
| -> size          | int      |                       |
| -> width         | int      |                       |
| -> height        | int      |                       |
| -> changeFileSrc | function |                       |
| -> index         | int      |                       |
|                  |          |                       |


#### code 多个复选框
```html
<ry-upload
    config="{
        src: vm.src,
        type: 'img',
        pattern: '.png,.jpg',
        size: '5MB',
        lock: false,
        changeFileSrc: vm.changeFileSrc
    }">
</ry-upload>
```

```javascript
vm.src = '';
vm.changeFileSrc = function(src, index) {
    vm.src = src;
}
```
