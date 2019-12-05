# fc-common-lib  
前端公用的依赖库集合

## QueryComposer  
本库只处理生成 query 参数的工作，不处理前缀 ?，请开发者自行添加。  

1. only use part of dependencies.
```javascript
import QueryComposer from 'fc-common-lib/query-composer';

QueryComposer.fromObject({});
```
2. use total lib  
```javascript
import { QueryComposer } from 'fc-common-lib';
QueryComposer.fromObject({});
```