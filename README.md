# fc-common-lib  
前端公用的依赖库集合

## 包含功能库  
### QueryComposer  
本库只处理生成 query 参数的工作，不处理前缀 ?，请开发者自行添加。  

### Privilege  
权限检查模块，可以检查 tab、field、Object 以及 Action 的。

## 使用范例（QueryComposer）  

1. only use part of the lib.
```javascript
import QueryComposer from 'fc-common-lib/query-composer';

QueryComposer.fromObject({});
```
2. use total lib  
```javascript
import { QueryComposer } from 'fc-common-lib';
QueryComposer.fromObject({});
```