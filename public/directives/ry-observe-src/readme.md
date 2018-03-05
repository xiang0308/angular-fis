### ry-observe-src

* 监控src变化

#### config配置

| 属性           | 类型 | 描述           |
| -------------- | ---- | -------------- |
| ry-observe-src | null | 不用传递任何值 |
|                |      |                |


#### code

```html
<img ng-src="{{vm.src}}" ry-observe-src/>
```

```javascript
vm.src = 'http://img.png';
```
