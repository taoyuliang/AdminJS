(function (designSystem, adminjs, React, reactRedux, reactRouter, styledComponents) {
    'use strict';

    function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

    var React__default = /*#__PURE__*/_interopDefault(React);

    const RelationConfigProvider=({children:a,...b})=>{const[c,d]=React.useState(0),e=React.useCallback(()=>{d(new Date().getTime());},[]);return/*#__PURE__*/React__default.default.createElement(OwnerRecordContext.Provider,{value:{...b,refreshToken:c,refresh:e}},a)};const OwnerRecordContext=/*#__PURE__*/React.createContext(null);const useRelationConfig=()=>{const a=React.useContext(OwnerRecordContext);if(!a)throw new Error("useRelationConfig used outside of RelationConfigProvider");return a};

    const api$2=new adminjs.ApiClient;const useRelationRecords=a=>{const{record:b,resource:c,targetResourceId:d,tab:e}=a,{relation:f,refreshToken:g}=useRelationConfig(),[h,i]=React.useState(),[j,k]=React.useState(!0),{direction:l,sortBy:m,page:n,parsedQuery:o}=adminjs.useQueryParams(),p=adminjs.useNotice();return React.useEffect(()=>{e===f&&b&&(k(!0),api$2.recordAction({actionName:"findRelation",recordId:b.id,resourceId:c.id,params:{relation:f,direction:l,sortBy:m,page:n}}).then(({data:{records:a,meta:b,notice:c}})=>{c&&p(c),k(!1),i({records:a,meta:b});}).finally(()=>{k(!1);}));},[e,f,b,c.id,d,l,m,n,o,g]),{data:h,isLoading:j}};

    let RelationType=/*#__PURE__*/function(a){return a.OneToMany="one-to-many",a.ManyToMany="many-to-many",a}({});

    let Messages=/*#__PURE__*/function(a){return a.MissingConfiguration="[@adminjs/relations]_missingConfiguration",a.MissingRecordId="[@adminjs/relations]_missingRecordId",a.InvalidRelationType="[@adminjs/relations]_invalidRelationType",a.JoinKeyMissing="[@adminjs/relations]_joinKeyMissing",a.NoRelationRecordsTitle="[@adminjs/relations]_noRelationRecordsTitle",a.NoRelationRecords="[@adminjs/relations]_noRelationRecords",a.JunctionMissing="[@adminjs/relations]_junctionMissing",a.JunctionResourceIdMissing="[@adminjs/relations]_junctionResourceIdMissing",a.JunctionResourceMissing="[@adminjs/relations]_junctionResourceMissing",a.ChooseItemSubtitle="[@adminjs/relations]_chooseItemSubtitle",a.ManyToManyRelationAlreadyExists="[@adminjs/relations]_mnRelationAlreadyExists",a.RelationSuccessfullyAdded="[@adminjs/relations]_relationSuccessfullyAdded",a.RelationSuccessfullyDeleted="[@adminjs/relations]_relationSuccessfullyDeleted",a.QueryParamsMissing="[@adminjs/relations]_queryParamsMissing",a.JunctionRecordMissing="[@adminjs/relations]_junctionRecordMissing",a}({});let Labels=/*#__PURE__*/function(a){return a.ChooseItemHeader="[@adminjs/relations]_chooseItemHeader",a.DeleteRelationHeader="[@adminjs/relations]_deleteRelationHeader",a}({});let Actions=/*#__PURE__*/function(a){return a.AddItem="[@adminjs/relations]_addItem",a.RemoveRelation="[@adminjs/relations]_removeRelation",a.RemoveRecord="[@adminjs/relations]_removeRecord",a}({});

    const RelationNoRecords$1=a=>{const{resource:{name:b,id:c,resourceActions:d}}=a,{ownerRecord:e,relations:f,relation:g}=useRelationConfig(),{tb:h,tm:i}=adminjs.useTranslation(),j=f[g].target.resourceId,k=f[g].junction?.joinKey,l=f[g].junction?.inverseJoinKey;if(!j||!k||!l)return null;const m=d.find(({name:a})=>"new"===a);return/*#__PURE__*/React__default.default.createElement(designSystem.InfoBox,{title:i(Messages.NoRelationRecordsTitle,c),illustration:"Docs"},/*#__PURE__*/React__default.default.createElement(designSystem.Text,{mb:"xxl"},i(Messages.NoRelationRecords,c,{relationName:b})),m&&/*#__PURE__*/React__default.default.createElement(adminjs.ActionButton,{action:m,resourceId:c,queryParams:{[k]:e.id,junctionResourceId:f[g].junction?.throughResourceId,joinKey:k,inverseJoinKey:l,redirectUrl:location.href}},/*#__PURE__*/React__default.default.createElement(designSystem.Button,{variant:"contained"},/*#__PURE__*/React__default.default.createElement(designSystem.Icon,{icon:"Plus"}),h("createFirstRecord",c))))};

    const useRedirectUrl=()=>{const a=new URL(location.href);// Remove current redirectUrl to prevent infinite redirections
    return a.searchParams.get("redirectUrl")&&a.searchParams.delete("redirectUrl"),a.href};

    const api$1=new adminjs.ApiClient;const RelationRecordInListActions$1=a=>{const{record:{recordActions:b,id:c},resource:{id:d}}=a,[e,f]=React.useState(!1),{ownerRecord:g,ownerResource:h,relation:i,relations:j,refresh:k}=useRelationConfig(),{deleteOptions:{enableDeleteRelation:l,enableDeleteRelatedRecord:m}={enableDeleteRelatedRecord:!0,enableDeleteRelation:!0}}=j[i],n=adminjs.useNotice(),{ta:o,tl:p}=adminjs.useTranslation(),q=useRedirectUrl(),r=(a=!1)=>{a&&k(),f(!1);},s=async()=>{const a=await api$1.recordAction({resourceId:h.id,actionName:"deleteRelation",recordId:g.id,params:{targetRecordId:c,relation:i}}),{data:b}=a;return b},t=async()=>{const a=await api$1.recordAction({resourceId:d,actionName:"delete",recordId:c}),{data:b}=a;return b},u=[],v={variant:"outlined",label:o(Actions.RemoveRelation,d),onClick:async()=>{const a=await s();r(!0),z(a);}},w={variant:"outlined",label:o(Actions.RemoveRecord,d),color:"danger",onClick:async()=>{let a=await s();const{notice:b}=a;r(!0),b&&"success"===b.type&&(a=await t(),z(a));}},x=g.recordActions.find(a=>"deleteRelation"===a.name);l&&x&&u.push(v);const y=b.find(a=>"delete"===a.name);m&&y&&u.push(w);const z=a=>{const{notice:b}=a;b&&n(b);},A={title:p(Labels.DeleteRelationHeader),onOverlayClick:r,onClose:r,buttons:u},B={show:"Eye",edit:"Edit2",delete:"Trash2"},C=b.filter(a=>"delete"!==a.name);return/*#__PURE__*/React__default.default.createElement(designSystem.Box,{flex:!0},C.map(a=>/*#__PURE__*/React__default.default.createElement(adminjs.ActionButton,{key:a.name,action:a,resourceId:d,recordId:c,queryParams:{redirectUrl:q}},/*#__PURE__*/React__default.default.createElement(designSystem.Button,{size:"icon",rounded:!0,color:a.variant},/*#__PURE__*/React__default.default.createElement(designSystem.Icon,{icon:B[a.name]})))),u.length&&/*#__PURE__*/React__default.default.createElement(React__default.default.Fragment,null,e&&/*#__PURE__*/React__default.default.createElement(designSystem.Modal,A),/*#__PURE__*/React__default.default.createElement(designSystem.Button,{size:"icon",rounded:!0,color:"danger",onClick:()=>f(!0)},/*#__PURE__*/React__default.default.createElement(designSystem.Icon,{icon:B["delete"]}))))};

    const RelationRecordInList$1=a=>{const{resource:b,record:c,isLoading:d}=a;return/*#__PURE__*/React__default.default.createElement(designSystem.TableRow,{"data-id":c.id,"data-css":[b.id,"row"].join("-")},/*#__PURE__*/React__default.default.createElement(designSystem.TableCell,{width:0}),b.listProperties.map(a=>/*#__PURE__*/React__default.default.createElement(designSystem.TableCell,{style:{cursor:"pointer",whiteSpace:"nowrap"},key:a.propertyPath,"data-property-name":a.propertyPath,display:"table-cell","data-css":[b.id,a.name,"cell"].join("-")},d?/*#__PURE__*/React__default.default.createElement(designSystem.Placeholder,{style:{height:14}}):/*#__PURE__*/React__default.default.createElement(adminjs.BasePropertyComponent,{key:a.propertyPath,where:"list",property:a,resource:b,record:c}))),/*#__PURE__*/React__default.default.createElement(designSystem.TableCell,{key:"options",className:"options"},d?/*#__PURE__*/React__default.default.createElement(designSystem.Placeholder,{style:{height:14}}):/*#__PURE__*/React__default.default.createElement(RelationRecordInListActions$1,{record:c,resource:b})))};

    const RelationRecordsTable$1=a=>{const{targetResource:b,records:c,isLoading:d}=a,{ownerResource:e}=useRelationConfig(),{direction:f,sortBy:g}=adminjs.useQueryParams();if(!c.length&&!d)return/*#__PURE__*/React__default.default.createElement(RelationNoRecords$1,{resource:b});const h={...b,listProperties:b.listProperties.filter(({reference:a})=>a!==e.id)};return/*#__PURE__*/React__default.default.createElement(designSystem.Box,{overflow:"auto"},/*#__PURE__*/React__default.default.createElement(designSystem.Table,{"data-css":"relations-table"},/*#__PURE__*/React__default.default.createElement(adminjs.RecordsTableHeader,{properties:h.listProperties,titleProperty:h.titleProperty,direction:f,sortBy:g}),/*#__PURE__*/React__default.default.createElement(designSystem.TableBody,{"data-css":"relations-table-body"},c.map(a=>/*#__PURE__*/React__default.default.createElement(RelationRecordInList$1,{key:a.id,record:a,resource:h,isLoading:d})))))};

    const api=new adminjs.ApiClient;const AddItemModal=({targetResource:a,ownerResource:b,ownerRecord:c,relation:d,onCloseModal:e})=>{const[f,g]=React.useState(null),[h,i]=React.useState(),[j,k]=React.useState(),[l,m]=React.useState(0),{tb:n,tm:o}=adminjs.useTranslation();React.useEffect(()=>{if(f){m(a=>a+1);const b=new adminjs.ApiClient;b.recordAction({actionName:"show",resourceId:a.id,recordId:f+""}).then(({data:a})=>{i(a.record);}).finally(()=>{m(a=>a-1);});}},[f,a]);const p=h,q=f&&p?{value:p.id,label:p.title}:{value:"",label:""};return/*#__PURE__*/React__default.default.createElement(designSystem.Box,{flex:!0,flexDirection:"column",width:"100%",mt:"md"},j&&/*#__PURE__*/React__default.default.createElement(designSystem.MessageBox,{message:o(j.message,j.resourceId,j.options),variant:"error"===j.type?"danger":j.type??"info",my:"md"}),/*#__PURE__*/React__default.default.createElement(designSystem.SelectAsync,{cacheOptions:!0,value:q,defaultOptions:!0,loadOptions:async b=>{const c=await api.searchRecords({resourceId:a.id,query:b}),d=c.map(a=>({value:a.id,label:a.title,record:a}));return d},onChange:a=>{a?g(a.value):g(null);},isClearable:!0,isLoading:!!l}),/*#__PURE__*/React__default.default.createElement(designSystem.Box,{flex:!0,justifyContent:"center",mt:"xxl"},/*#__PURE__*/React__default.default.createElement(designSystem.Button,{variant:"light",color:"primary",onClick:()=>e(!1),mr:"md"},n("cancel")),/*#__PURE__*/React__default.default.createElement(designSystem.Button,{variant:"contained",color:"primary",onClick:async()=>{k(void 0);const a=await api.recordAction({recordId:c.id,resourceId:b.id,actionName:"addManyToManyRelation",data:{targetId:f},params:{relation:d}}),{data:g}=a,{notice:h}=g??{};h&&("success"===h.type?e(!0):k(h));},disabled:!f},n("submit"))))};

    const RelationResourceActions$1=a=>{const{targetResource:b,ownerResource:c,junctionResource:d}=a,{ownerRecord:e,relations:f,relation:g,refresh:h}=useRelationConfig(),[i,j]=React.useState(!1),{ta:k,tl:l,tm:m}=adminjs.useTranslation(),n=useRedirectUrl(),o=f[g].target.resourceId,p=f[g].junction?.joinKey,q=f[g].junction?.inverseJoinKey,r=(a=!1)=>{a&&h(),j(!1);};if(!p||!q)return null;const s={title:l(Labels.ChooseItemHeader,b.id),subTitle:m(Messages.ChooseItemSubtitle,b.id),onOverlayClick:r,onClose:r},t=d.resourceActions.find(({name:a})=>"new"===a),u=b.resourceActions.filter(({name:a})=>"new"===a);return t?/*#__PURE__*/React__default.default.createElement(designSystem.Box,{flex:!0,justifyContent:"end"},t&&/*#__PURE__*/React__default.default.createElement(React__default.default.Fragment,null,i&&/*#__PURE__*/React__default.default.createElement(designSystem.Modal,s,/*#__PURE__*/React__default.default.createElement(AddItemModal,{targetResource:b,ownerResource:c,ownerRecord:e,relation:g,onCloseModal:r})),/*#__PURE__*/React__default.default.createElement(designSystem.Box,{flex:!0,mb:"xl",mr:"xl",justifyContent:"end"},/*#__PURE__*/React__default.default.createElement(designSystem.Button,{variant:"outline",onClick:()=>{j(!0);}},/*#__PURE__*/React__default.default.createElement(designSystem.Icon,{icon:"PlusCircle"}),k(Actions.AddItem,b.id)))),u.map(a=>/*#__PURE__*/React__default.default.createElement(designSystem.Box,{key:a.name,flex:!0,mb:"xl",justifyContent:"end"},/*#__PURE__*/React__default.default.createElement(adminjs.ActionButton,{action:a,resourceId:o,queryParams:{[p]:e.id,junctionResourceId:f[g].junction?.throughResourceId,joinKey:p,inverseJoinKey:q,redirectUrl:n}},/*#__PURE__*/React__default.default.createElement(designSystem.Button,{variant:"contained"},/*#__PURE__*/React__default.default.createElement(designSystem.Icon,{icon:a.icon}),k(a.name,b.id)))))):null};

    const RelationNoRecords=a=>{const{resource:{name:b,id:c,resourceActions:d}}=a,{ownerRecord:e,relations:f,relation:g}=useRelationConfig(),{tb:h,tm:i}=adminjs.useTranslation(),j=f[g].target.joinKey,k=d.find(({name:a})=>"new"===a);return j?/*#__PURE__*/React__default.default.createElement(designSystem.InfoBox,{title:i(Messages.NoRelationRecordsTitle,c),illustration:"Docs"},/*#__PURE__*/React__default.default.createElement(designSystem.Text,{mb:"xxl"},i(Messages.NoRelationRecords,c,{relationName:b})),k&&/*#__PURE__*/React__default.default.createElement(adminjs.ActionButton,{action:k,resourceId:c,queryParams:{[j]:e.id,redirectUrl:location.href}},/*#__PURE__*/React__default.default.createElement(designSystem.Button,{variant:"contained"},/*#__PURE__*/React__default.default.createElement(designSystem.Icon,{icon:"Plus"}),h("createFirstRecord",c)))):null};

    const RelationRecordInListActions=a=>{const{record:{recordActions:b,id:c},resource:{id:d}}=a,{refresh:e}=useRelationConfig(),f=reactRouter.useNavigate(),g=useRedirectUrl(),{pathname:h,search:i}=reactRouter.useLocation(),j={show:"Eye",edit:"Edit2",delete:"Trash2"},k=({notice:a})=>{a&&"success"===a.type&&(f({pathname:h,search:i}),e());};return/*#__PURE__*/React__default.default.createElement(designSystem.Box,{flex:!0,justifyContent:"end"},b.map(a=>/*#__PURE__*/React__default.default.createElement(adminjs.ActionButton,{key:a.name,action:a,resourceId:d,recordId:c,actionPerformed:k,queryParams:{redirectUrl:g}},/*#__PURE__*/React__default.default.createElement(designSystem.Button,{size:"icon",rounded:!0,color:a.variant},/*#__PURE__*/React__default.default.createElement(designSystem.Icon,{icon:j[a.name]})))))};

    const v=new adminjs.ViewHelpers;const RelationRecordInList=a=>{const{resource:b,record:c,isLoading:d}=a,e=reactRouter.useNavigate(),f=useRedirectUrl(),g=c.recordActions.find(({name:a})=>"show"===a);return/*#__PURE__*/React__default.default.createElement(designSystem.TableRow,{"data-id":c.id,"data-css":[b.id,"row"].join("-"),onClick:()=>{if(g){const a=v.recordActionUrl({actionName:g.name,recordId:c.id,resourceId:b.id,search:`?redirectUrl=${encodeURIComponent(f)}`});e(a);}}},/*#__PURE__*/React__default.default.createElement(designSystem.TableCell,{width:0}),b.listProperties.map(a=>/*#__PURE__*/React__default.default.createElement(designSystem.TableCell,{style:{cursor:g?"pointer":"initial",whiteSpace:"nowrap"},key:a.propertyPath,"data-property-name":a.propertyPath,display:"table-cell","data-css":[b.id,a.name,"cell"].join("-")},d?/*#__PURE__*/React__default.default.createElement(designSystem.Placeholder,{style:{height:14}}):/*#__PURE__*/React__default.default.createElement(adminjs.BasePropertyComponent,{key:a.propertyPath,where:"list",property:a,resource:b,record:c}))),/*#__PURE__*/React__default.default.createElement(designSystem.TableCell,{key:"options",className:"options"},d?/*#__PURE__*/React__default.default.createElement(designSystem.Placeholder,{style:{height:14}}):/*#__PURE__*/React__default.default.createElement(RelationRecordInListActions,{record:c,resource:b})))};

    const RelationRecordsTable=a=>{const{targetResource:b,records:c,isLoading:d}=a,{ownerResource:e}=useRelationConfig(),{direction:f,sortBy:g}=adminjs.useQueryParams();if(!c.length&&!d)return/*#__PURE__*/React__default.default.createElement(RelationNoRecords,{resource:b});const h={...b,listProperties:b.listProperties.filter(({reference:a})=>a!==e.id)};return/*#__PURE__*/React__default.default.createElement(designSystem.Box,{overflow:"auto"},/*#__PURE__*/React__default.default.createElement(designSystem.Table,{"data-css":"relations-table"},/*#__PURE__*/React__default.default.createElement(adminjs.RecordsTableHeader,{properties:h.listProperties,titleProperty:h.titleProperty,direction:f,sortBy:g}),/*#__PURE__*/React__default.default.createElement(designSystem.TableBody,{"data-css":"relations-table-body"},c.map(a=>/*#__PURE__*/React__default.default.createElement(RelationRecordInList,{key:a.id,record:a,resource:h,isLoading:d})))))};

    const RelationResourceActions=a=>{const{targetResource:b}=a,{ownerRecord:c,relations:d,relation:e}=useRelationConfig(),{ta:f}=adminjs.useTranslation(),g=useRedirectUrl(),h=d[e].target.resourceId,i=d[e].target.joinKey;if(!i)return null;const j=b.resourceActions.filter(({name:a})=>"new"===a);return j.length?/*#__PURE__*/React__default.default.createElement(designSystem.Box,{flex:!0,mb:"xl",justifyContent:"end"},j.map(a=>/*#__PURE__*/React__default.default.createElement(adminjs.ActionButton,{key:a.name,action:a,resourceId:h,queryParams:{[i]:c.id,redirectUrl:g}},/*#__PURE__*/React__default.default.createElement(designSystem.Button,{variant:"contained"},/*#__PURE__*/React__default.default.createElement(designSystem.Icon,{icon:a.icon}),f(a.name,b.id))))):null};

    const RelationTab=()=>{const{relation:a,ownerRecord:b,ownerResource:c,relations:d}=useRelationConfig(),e=reactRedux.useSelector(a=>a.resources),{storeParams:f}=adminjs.useQueryParams(),{currentTab:g}=designSystem.useTabs(),h=d[a].target.resourceId,i=d[a].junction?.throughResourceId,j=d[a].type,{data:k,isLoading:l}=useRelationRecords({record:b,relation:a,resource:c,targetResourceId:h,tab:g}),m=a=>f({page:a.toString()});if(g!==a)return null;if(!k)return/*#__PURE__*/React__default.default.createElement(designSystem.Loader,null);if(j===RelationType.OneToMany){const a=e.find(a=>a.id===h);if(!a)return null;const{records:b,meta:{total:c,page:d,perPage:f}}=k;return/*#__PURE__*/React__default.default.createElement(designSystem.Box,{py:"xl"},/*#__PURE__*/React__default.default.createElement(RelationResourceActions,{targetResource:a}),/*#__PURE__*/React__default.default.createElement(RelationRecordsTable,{targetResource:a,records:b,isLoading:l}),/*#__PURE__*/React__default.default.createElement(designSystem.Box,{flex:!0,justifyContent:"center",mt:"xl"},/*#__PURE__*/React__default.default.createElement(designSystem.Pagination,{total:c,perPage:f,page:+d,onChange:m})))}if(j===RelationType.ManyToMany){if(!i)return null;const a=e.find(a=>a.id===h),b=e.find(a=>a.id===i);if(!a||!b)return null;const{records:d,meta:{total:f,page:g,perPage:j}}=k;return/*#__PURE__*/React__default.default.createElement(designSystem.Box,{py:"xl"},/*#__PURE__*/React__default.default.createElement(RelationResourceActions$1,{targetResource:a,ownerResource:c,junctionResource:b}),/*#__PURE__*/React__default.default.createElement(RelationRecordsTable$1,{targetResource:a,records:d,isLoading:l}),/*#__PURE__*/React__default.default.createElement(designSystem.Box,{flex:!0,justifyContent:"center",mt:"xl"},/*#__PURE__*/React__default.default.createElement(designSystem.Pagination,{total:f,perPage:j,page:+g,onChange:m})))}return null};

    const RelationsShowPropertyComponent=a=>{const{resource:b,record:c,property:d}=a,{id:e,properties:f}=b,{relations:g}=f[d.path].props,h=Object.keys(g),{tab:j=h[0],storeParams:i}=adminjs.useQueryParams(),{tl:k}=adminjs.useTranslation(),l=React.useCallback(a=>{i({tab:a,sortBy:void 0,direction:void 0,redirectUrl:void 0});},[]);return c&&h.length?/*#__PURE__*/React__default.default.createElement(designSystem.Tabs,{currentTab:j,onChange:l},h.map(a=>/*#__PURE__*/React__default.default.createElement(designSystem.Tab,{key:a,id:a,label:k(a,e)},/*#__PURE__*/React__default.default.createElement(RelationConfigProvider,{relation:a,relations:g,ownerResource:b,ownerRecord:c},/*#__PURE__*/React__default.default.createElement(RelationTab,null))))):null};var RelationsShowPropertyComponent$1 = /*#__PURE__*/React.memo(RelationsShowPropertyComponent);

    const RelationsEditPropertyComponent=()=>/*#__PURE__*/React__default.default.createElement(React__default.default.Fragment,null);var RelationsEditPropertyComponent$1 = /*#__PURE__*/React.memo(RelationsEditPropertyComponent);

    const RelationsListPropertyComponent=a=>{const{resource:{properties:c},property:b}=a,{relationsTargets:d}=c[b.path].props,e=Object.values(d),{tl:f}=adminjs.useTranslation();return/*#__PURE__*/React__default.default.createElement(React__default.default.Fragment,null,e.map(({resourceId:a})=>/*#__PURE__*/React__default.default.createElement(designSystem.Badge,{key:a,mr:"sm"},f(a,a))))};var RelationsListPropertyComponent$1 = /*#__PURE__*/React.memo(RelationsListPropertyComponent);

    const ImportComponent = ({
      resource
    }) => {
      const [file, setFile] = React.useState(null);
      const sendNotice = adminjs.useNotice();
      const [isFetching, setFetching] = React.useState();
      const onUpload = uploadedFile => {
        setFile(uploadedFile?.[0] ?? null);
      };
      const onSubmit = async () => {
        if (!file) {
          return;
        }
        setFetching(true);
        try {
          const importData = new FormData();
          importData.append('file', file, file?.name);
          await new adminjs.ApiClient().resourceAction({
            method: 'post',
            resourceId: resource.id,
            actionName: 'import',
            data: importData
          });
          sendNotice({
            message: 'Imported successfully',
            type: 'success'
          });
        } catch (e) {
          sendNotice({
            message: e.message,
            type: 'error'
          });
        }
        setFetching(false);
      };
      if (isFetching) {
        return /*#__PURE__*/React__default.default.createElement(designSystem.Loader, null);
      }
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        margin: "auto",
        maxWidth: 600,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.DropZone, {
        files: [],
        onChange: onUpload,
        multiple: false
      }), file && /*#__PURE__*/React__default.default.createElement(designSystem.DropZoneItem, {
        file: file,
        filename: file.name,
        onRemove: () => setFile(null)
      }), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        display: "flex",
        justifyContent: "center",
        m: 10
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
        onClick: onSubmit,
        disabled: !file || isFetching
      }, "Upload")));
    };

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    var FileSaver_min = {exports: {}};

    (function (module, exports) {
    	(function(a,b){b();})(commonjsGlobal,function(){function b(a,b){return "undefined"==typeof b?b={autoBom:!1}:"object"!=typeof b&&(console.warn("Deprecated: Expected third argument to be a object"),b={autoBom:!b}),b.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob(["\uFEFF",a],{type:a.type}):a}function c(a,b,c){var d=new XMLHttpRequest;d.open("GET",a),d.responseType="blob",d.onload=function(){g(d.response,b,c);},d.onerror=function(){console.error("could not download file");},d.send();}function d(a){var b=new XMLHttpRequest;b.open("HEAD",a,!1);try{b.send();}catch(a){}return 200<=b.status&&299>=b.status}function e(a){try{a.dispatchEvent(new MouseEvent("click"));}catch(c){var b=document.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),a.dispatchEvent(b);}}var f="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof commonjsGlobal&&commonjsGlobal.global===commonjsGlobal?commonjsGlobal:void 0,a=f.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),g=f.saveAs||("object"!=typeof window||window!==f?function(){}:"download"in HTMLAnchorElement.prototype&&!a?function(b,g,h){var i=f.URL||f.webkitURL,j=document.createElement("a");g=g||b.name||"download",j.download=g,j.rel="noopener","string"==typeof b?(j.href=b,j.origin===location.origin?e(j):d(j.href)?c(b,g,h):e(j,j.target="_blank")):(j.href=i.createObjectURL(b),setTimeout(function(){i.revokeObjectURL(j.href);},4E4),setTimeout(function(){e(j);},0));}:"msSaveOrOpenBlob"in navigator?function(f,g,h){if(g=g||f.name||"download","string"!=typeof f)navigator.msSaveOrOpenBlob(b(f,h),g);else if(d(f))c(f,g,h);else {var i=document.createElement("a");i.href=f,i.target="_blank",setTimeout(function(){e(i);});}}:function(b,d,e,g){if(g=g||open("","_blank"),g&&(g.document.title=g.document.body.innerText="downloading..."),"string"==typeof b)return c(b,d,e);var h="application/octet-stream"===b.type,i=/constructor/i.test(f.HTMLElement)||f.safari,j=/CriOS\/[\d]+/.test(navigator.userAgent);if((j||h&&i||a)&&"undefined"!=typeof FileReader){var k=new FileReader;k.onloadend=function(){var a=k.result;a=j?a:a.replace(/^data:[^;]*;/,"data:attachment/file;"),g?g.location.href=a:location=a,g=null;},k.readAsDataURL(b);}else {var l=f.URL||f.webkitURL,m=l.createObjectURL(b);g?g.location=m:location.href=m,g=null,setTimeout(function(){l.revokeObjectURL(m);},4E4);}});f.saveAs=g.saveAs=g,(module.exports=g);});

    	
    } (FileSaver_min));

    var FileSaver_minExports = FileSaver_min.exports;

    function _typeof(o) {
      "@babel/helpers - typeof";

      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
        return typeof o;
      } : function (o) {
        return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
      }, _typeof(o);
    }

    function requiredArgs(required, args) {
      if (args.length < required) {
        throw new TypeError(required + ' argument' + (required > 1 ? 's' : '') + ' required, but only ' + args.length + ' present');
      }
    }

    /**
     * @name isDate
     * @category Common Helpers
     * @summary Is the given value a date?
     *
     * @description
     * Returns true if the given value is an instance of Date. The function works for dates transferred across iframes.
     *
     * @param {*} value - the value to check
     * @returns {boolean} true if the given value is a date
     * @throws {TypeError} 1 arguments required
     *
     * @example
     * // For a valid date:
     * const result = isDate(new Date())
     * //=> true
     *
     * @example
     * // For an invalid date:
     * const result = isDate(new Date(NaN))
     * //=> true
     *
     * @example
     * // For some value:
     * const result = isDate('2014-02-31')
     * //=> false
     *
     * @example
     * // For an object:
     * const result = isDate({})
     * //=> false
     */
    function isDate(value) {
      requiredArgs(1, arguments);
      return value instanceof Date || _typeof(value) === 'object' && Object.prototype.toString.call(value) === '[object Date]';
    }

    /**
     * @name toDate
     * @category Common Helpers
     * @summary Convert the given argument to an instance of Date.
     *
     * @description
     * Convert the given argument to an instance of Date.
     *
     * If the argument is an instance of Date, the function returns its clone.
     *
     * If the argument is a number, it is treated as a timestamp.
     *
     * If the argument is none of the above, the function returns Invalid Date.
     *
     * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
     *
     * @param {Date|Number} argument - the value to convert
     * @returns {Date} the parsed date in the local time zone
     * @throws {TypeError} 1 argument required
     *
     * @example
     * // Clone the date:
     * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
     * //=> Tue Feb 11 2014 11:30:30
     *
     * @example
     * // Convert the timestamp to date:
     * const result = toDate(1392098430000)
     * //=> Tue Feb 11 2014 11:30:30
     */
    function toDate(argument) {
      requiredArgs(1, arguments);
      var argStr = Object.prototype.toString.call(argument);

      // Clone the date
      if (argument instanceof Date || _typeof(argument) === 'object' && argStr === '[object Date]') {
        // Prevent the date to lose the milliseconds when passed to new Date() in IE10
        return new Date(argument.getTime());
      } else if (typeof argument === 'number' || argStr === '[object Number]') {
        return new Date(argument);
      } else {
        if ((typeof argument === 'string' || argStr === '[object String]') && typeof console !== 'undefined') {
          // eslint-disable-next-line no-console
          console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments");
          // eslint-disable-next-line no-console
          console.warn(new Error().stack);
        }
        return new Date(NaN);
      }
    }

    /**
     * @name isValid
     * @category Common Helpers
     * @summary Is the given date valid?
     *
     * @description
     * Returns false if argument is Invalid Date and true otherwise.
     * Argument is converted to Date using `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
     * Invalid Date is a Date, whose time value is NaN.
     *
     * Time value of Date: http://es5.github.io/#x15.9.1.1
     *
     * @param {*} date - the date to check
     * @returns {Boolean} the date is valid
     * @throws {TypeError} 1 argument required
     *
     * @example
     * // For the valid date:
     * const result = isValid(new Date(2014, 1, 31))
     * //=> true
     *
     * @example
     * // For the value, convertable into a date:
     * const result = isValid(1393804800000)
     * //=> true
     *
     * @example
     * // For the invalid date:
     * const result = isValid(new Date(''))
     * //=> false
     */
    function isValid(dirtyDate) {
      requiredArgs(1, arguments);
      if (!isDate(dirtyDate) && typeof dirtyDate !== 'number') {
        return false;
      }
      var date = toDate(dirtyDate);
      return !isNaN(Number(date));
    }

    function toInteger(dirtyNumber) {
      if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
        return NaN;
      }
      var number = Number(dirtyNumber);
      if (isNaN(number)) {
        return number;
      }
      return number < 0 ? Math.ceil(number) : Math.floor(number);
    }

    /**
     * @name addMilliseconds
     * @category Millisecond Helpers
     * @summary Add the specified number of milliseconds to the given date.
     *
     * @description
     * Add the specified number of milliseconds to the given date.
     *
     * @param {Date|Number} date - the date to be changed
     * @param {Number} amount - the amount of milliseconds to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
     * @returns {Date} the new date with the milliseconds added
     * @throws {TypeError} 2 arguments required
     *
     * @example
     * // Add 750 milliseconds to 10 July 2014 12:45:30.000:
     * const result = addMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
     * //=> Thu Jul 10 2014 12:45:30.750
     */
    function addMilliseconds(dirtyDate, dirtyAmount) {
      requiredArgs(2, arguments);
      var timestamp = toDate(dirtyDate).getTime();
      var amount = toInteger(dirtyAmount);
      return new Date(timestamp + amount);
    }

    /**
     * @name subMilliseconds
     * @category Millisecond Helpers
     * @summary Subtract the specified number of milliseconds from the given date.
     *
     * @description
     * Subtract the specified number of milliseconds from the given date.
     *
     * @param {Date|Number} date - the date to be changed
     * @param {Number} amount - the amount of milliseconds to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
     * @returns {Date} the new date with the milliseconds subtracted
     * @throws {TypeError} 2 arguments required
     *
     * @example
     * // Subtract 750 milliseconds from 10 July 2014 12:45:30.000:
     * const result = subMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
     * //=> Thu Jul 10 2014 12:45:29.250
     */
    function subMilliseconds(dirtyDate, dirtyAmount) {
      requiredArgs(2, arguments);
      var amount = toInteger(dirtyAmount);
      return addMilliseconds(dirtyDate, -amount);
    }

    var MILLISECONDS_IN_DAY = 86400000;
    function getUTCDayOfYear(dirtyDate) {
      requiredArgs(1, arguments);
      var date = toDate(dirtyDate);
      var timestamp = date.getTime();
      date.setUTCMonth(0, 1);
      date.setUTCHours(0, 0, 0, 0);
      var startOfYearTimestamp = date.getTime();
      var difference = timestamp - startOfYearTimestamp;
      return Math.floor(difference / MILLISECONDS_IN_DAY) + 1;
    }

    function startOfUTCISOWeek(dirtyDate) {
      requiredArgs(1, arguments);
      var weekStartsOn = 1;
      var date = toDate(dirtyDate);
      var day = date.getUTCDay();
      var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
      date.setUTCDate(date.getUTCDate() - diff);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }

    function getUTCISOWeekYear(dirtyDate) {
      requiredArgs(1, arguments);
      var date = toDate(dirtyDate);
      var year = date.getUTCFullYear();
      var fourthOfJanuaryOfNextYear = new Date(0);
      fourthOfJanuaryOfNextYear.setUTCFullYear(year + 1, 0, 4);
      fourthOfJanuaryOfNextYear.setUTCHours(0, 0, 0, 0);
      var startOfNextYear = startOfUTCISOWeek(fourthOfJanuaryOfNextYear);
      var fourthOfJanuaryOfThisYear = new Date(0);
      fourthOfJanuaryOfThisYear.setUTCFullYear(year, 0, 4);
      fourthOfJanuaryOfThisYear.setUTCHours(0, 0, 0, 0);
      var startOfThisYear = startOfUTCISOWeek(fourthOfJanuaryOfThisYear);
      if (date.getTime() >= startOfNextYear.getTime()) {
        return year + 1;
      } else if (date.getTime() >= startOfThisYear.getTime()) {
        return year;
      } else {
        return year - 1;
      }
    }

    function startOfUTCISOWeekYear(dirtyDate) {
      requiredArgs(1, arguments);
      var year = getUTCISOWeekYear(dirtyDate);
      var fourthOfJanuary = new Date(0);
      fourthOfJanuary.setUTCFullYear(year, 0, 4);
      fourthOfJanuary.setUTCHours(0, 0, 0, 0);
      var date = startOfUTCISOWeek(fourthOfJanuary);
      return date;
    }

    var MILLISECONDS_IN_WEEK$1 = 604800000;
    function getUTCISOWeek(dirtyDate) {
      requiredArgs(1, arguments);
      var date = toDate(dirtyDate);
      var diff = startOfUTCISOWeek(date).getTime() - startOfUTCISOWeekYear(date).getTime();

      // Round the number of days to the nearest integer
      // because the number of milliseconds in a week is not constant
      // (e.g. it's different in the week of the daylight saving time clock shift)
      return Math.round(diff / MILLISECONDS_IN_WEEK$1) + 1;
    }

    var defaultOptions = {};
    function getDefaultOptions() {
      return defaultOptions;
    }

    function startOfUTCWeek(dirtyDate, options) {
      var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
      requiredArgs(1, arguments);
      var defaultOptions = getDefaultOptions();
      var weekStartsOn = toInteger((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);

      // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
      if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
        throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
      }
      var date = toDate(dirtyDate);
      var day = date.getUTCDay();
      var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
      date.setUTCDate(date.getUTCDate() - diff);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }

    function getUTCWeekYear(dirtyDate, options) {
      var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
      requiredArgs(1, arguments);
      var date = toDate(dirtyDate);
      var year = date.getUTCFullYear();
      var defaultOptions = getDefaultOptions();
      var firstWeekContainsDate = toInteger((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1);

      // Test if weekStartsOn is between 1 and 7 _and_ is not NaN
      if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
        throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively');
      }
      var firstWeekOfNextYear = new Date(0);
      firstWeekOfNextYear.setUTCFullYear(year + 1, 0, firstWeekContainsDate);
      firstWeekOfNextYear.setUTCHours(0, 0, 0, 0);
      var startOfNextYear = startOfUTCWeek(firstWeekOfNextYear, options);
      var firstWeekOfThisYear = new Date(0);
      firstWeekOfThisYear.setUTCFullYear(year, 0, firstWeekContainsDate);
      firstWeekOfThisYear.setUTCHours(0, 0, 0, 0);
      var startOfThisYear = startOfUTCWeek(firstWeekOfThisYear, options);
      if (date.getTime() >= startOfNextYear.getTime()) {
        return year + 1;
      } else if (date.getTime() >= startOfThisYear.getTime()) {
        return year;
      } else {
        return year - 1;
      }
    }

    function startOfUTCWeekYear(dirtyDate, options) {
      var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
      requiredArgs(1, arguments);
      var defaultOptions = getDefaultOptions();
      var firstWeekContainsDate = toInteger((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1);
      var year = getUTCWeekYear(dirtyDate, options);
      var firstWeek = new Date(0);
      firstWeek.setUTCFullYear(year, 0, firstWeekContainsDate);
      firstWeek.setUTCHours(0, 0, 0, 0);
      var date = startOfUTCWeek(firstWeek, options);
      return date;
    }

    var MILLISECONDS_IN_WEEK = 604800000;
    function getUTCWeek(dirtyDate, options) {
      requiredArgs(1, arguments);
      var date = toDate(dirtyDate);
      var diff = startOfUTCWeek(date, options).getTime() - startOfUTCWeekYear(date, options).getTime();

      // Round the number of days to the nearest integer
      // because the number of milliseconds in a week is not constant
      // (e.g. it's different in the week of the daylight saving time clock shift)
      return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
    }

    function addLeadingZeros(number, targetLength) {
      var sign = number < 0 ? '-' : '';
      var output = Math.abs(number).toString();
      while (output.length < targetLength) {
        output = '0' + output;
      }
      return sign + output;
    }

    /*
     * |     | Unit                           |     | Unit                           |
     * |-----|--------------------------------|-----|--------------------------------|
     * |  a  | AM, PM                         |  A* |                                |
     * |  d  | Day of month                   |  D  |                                |
     * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
     * |  m  | Minute                         |  M  | Month                          |
     * |  s  | Second                         |  S  | Fraction of second             |
     * |  y  | Year (abs)                     |  Y  |                                |
     *
     * Letters marked by * are not implemented but reserved by Unicode standard.
     */
    var formatters$1 = {
      // Year
      y: function y(date, token) {
        // From http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_tokens
        // | Year     |     y | yy |   yyy |  yyyy | yyyyy |
        // |----------|-------|----|-------|-------|-------|
        // | AD 1     |     1 | 01 |   001 |  0001 | 00001 |
        // | AD 12    |    12 | 12 |   012 |  0012 | 00012 |
        // | AD 123   |   123 | 23 |   123 |  0123 | 00123 |
        // | AD 1234  |  1234 | 34 |  1234 |  1234 | 01234 |
        // | AD 12345 | 12345 | 45 | 12345 | 12345 | 12345 |

        var signedYear = date.getUTCFullYear();
        // Returns 1 for 1 BC (which is year 0 in JavaScript)
        var year = signedYear > 0 ? signedYear : 1 - signedYear;
        return addLeadingZeros(token === 'yy' ? year % 100 : year, token.length);
      },
      // Month
      M: function M(date, token) {
        var month = date.getUTCMonth();
        return token === 'M' ? String(month + 1) : addLeadingZeros(month + 1, 2);
      },
      // Day of the month
      d: function d(date, token) {
        return addLeadingZeros(date.getUTCDate(), token.length);
      },
      // AM or PM
      a: function a(date, token) {
        var dayPeriodEnumValue = date.getUTCHours() / 12 >= 1 ? 'pm' : 'am';
        switch (token) {
          case 'a':
          case 'aa':
            return dayPeriodEnumValue.toUpperCase();
          case 'aaa':
            return dayPeriodEnumValue;
          case 'aaaaa':
            return dayPeriodEnumValue[0];
          case 'aaaa':
          default:
            return dayPeriodEnumValue === 'am' ? 'a.m.' : 'p.m.';
        }
      },
      // Hour [1-12]
      h: function h(date, token) {
        return addLeadingZeros(date.getUTCHours() % 12 || 12, token.length);
      },
      // Hour [0-23]
      H: function H(date, token) {
        return addLeadingZeros(date.getUTCHours(), token.length);
      },
      // Minute
      m: function m(date, token) {
        return addLeadingZeros(date.getUTCMinutes(), token.length);
      },
      // Second
      s: function s(date, token) {
        return addLeadingZeros(date.getUTCSeconds(), token.length);
      },
      // Fraction of second
      S: function S(date, token) {
        var numberOfDigits = token.length;
        var milliseconds = date.getUTCMilliseconds();
        var fractionalSeconds = Math.floor(milliseconds * Math.pow(10, numberOfDigits - 3));
        return addLeadingZeros(fractionalSeconds, token.length);
      }
    };

    var dayPeriodEnum = {
      am: 'am',
      pm: 'pm',
      midnight: 'midnight',
      noon: 'noon',
      morning: 'morning',
      afternoon: 'afternoon',
      evening: 'evening',
      night: 'night'
    };
    /*
     * |     | Unit                           |     | Unit                           |
     * |-----|--------------------------------|-----|--------------------------------|
     * |  a  | AM, PM                         |  A* | Milliseconds in day            |
     * |  b  | AM, PM, noon, midnight         |  B  | Flexible day period            |
     * |  c  | Stand-alone local day of week  |  C* | Localized hour w/ day period   |
     * |  d  | Day of month                   |  D  | Day of year                    |
     * |  e  | Local day of week              |  E  | Day of week                    |
     * |  f  |                                |  F* | Day of week in month           |
     * |  g* | Modified Julian day            |  G  | Era                            |
     * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
     * |  i! | ISO day of week                |  I! | ISO week of year               |
     * |  j* | Localized hour w/ day period   |  J* | Localized hour w/o day period  |
     * |  k  | Hour [1-24]                    |  K  | Hour [0-11]                    |
     * |  l* | (deprecated)                   |  L  | Stand-alone month              |
     * |  m  | Minute                         |  M  | Month                          |
     * |  n  |                                |  N  |                                |
     * |  o! | Ordinal number modifier        |  O  | Timezone (GMT)                 |
     * |  p! | Long localized time            |  P! | Long localized date            |
     * |  q  | Stand-alone quarter            |  Q  | Quarter                        |
     * |  r* | Related Gregorian year         |  R! | ISO week-numbering year        |
     * |  s  | Second                         |  S  | Fraction of second             |
     * |  t! | Seconds timestamp              |  T! | Milliseconds timestamp         |
     * |  u  | Extended year                  |  U* | Cyclic year                    |
     * |  v* | Timezone (generic non-locat.)  |  V* | Timezone (location)            |
     * |  w  | Local week of year             |  W* | Week of month                  |
     * |  x  | Timezone (ISO-8601 w/o Z)      |  X  | Timezone (ISO-8601)            |
     * |  y  | Year (abs)                     |  Y  | Local week-numbering year      |
     * |  z  | Timezone (specific non-locat.) |  Z* | Timezone (aliases)             |
     *
     * Letters marked by * are not implemented but reserved by Unicode standard.
     *
     * Letters marked by ! are non-standard, but implemented by date-fns:
     * - `o` modifies the previous token to turn it into an ordinal (see `format` docs)
     * - `i` is ISO day of week. For `i` and `ii` is returns numeric ISO week days,
     *   i.e. 7 for Sunday, 1 for Monday, etc.
     * - `I` is ISO week of year, as opposed to `w` which is local week of year.
     * - `R` is ISO week-numbering year, as opposed to `Y` which is local week-numbering year.
     *   `R` is supposed to be used in conjunction with `I` and `i`
     *   for universal ISO week-numbering date, whereas
     *   `Y` is supposed to be used in conjunction with `w` and `e`
     *   for week-numbering date specific to the locale.
     * - `P` is long localized date format
     * - `p` is long localized time format
     */

    var formatters = {
      // Era
      G: function G(date, token, localize) {
        var era = date.getUTCFullYear() > 0 ? 1 : 0;
        switch (token) {
          // AD, BC
          case 'G':
          case 'GG':
          case 'GGG':
            return localize.era(era, {
              width: 'abbreviated'
            });
          // A, B
          case 'GGGGG':
            return localize.era(era, {
              width: 'narrow'
            });
          // Anno Domini, Before Christ
          case 'GGGG':
          default:
            return localize.era(era, {
              width: 'wide'
            });
        }
      },
      // Year
      y: function y(date, token, localize) {
        // Ordinal number
        if (token === 'yo') {
          var signedYear = date.getUTCFullYear();
          // Returns 1 for 1 BC (which is year 0 in JavaScript)
          var year = signedYear > 0 ? signedYear : 1 - signedYear;
          return localize.ordinalNumber(year, {
            unit: 'year'
          });
        }
        return formatters$1.y(date, token);
      },
      // Local week-numbering year
      Y: function Y(date, token, localize, options) {
        var signedWeekYear = getUTCWeekYear(date, options);
        // Returns 1 for 1 BC (which is year 0 in JavaScript)
        var weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;

        // Two digit year
        if (token === 'YY') {
          var twoDigitYear = weekYear % 100;
          return addLeadingZeros(twoDigitYear, 2);
        }

        // Ordinal number
        if (token === 'Yo') {
          return localize.ordinalNumber(weekYear, {
            unit: 'year'
          });
        }

        // Padding
        return addLeadingZeros(weekYear, token.length);
      },
      // ISO week-numbering year
      R: function R(date, token) {
        var isoWeekYear = getUTCISOWeekYear(date);

        // Padding
        return addLeadingZeros(isoWeekYear, token.length);
      },
      // Extended year. This is a single number designating the year of this calendar system.
      // The main difference between `y` and `u` localizers are B.C. years:
      // | Year | `y` | `u` |
      // |------|-----|-----|
      // | AC 1 |   1 |   1 |
      // | BC 1 |   1 |   0 |
      // | BC 2 |   2 |  -1 |
      // Also `yy` always returns the last two digits of a year,
      // while `uu` pads single digit years to 2 characters and returns other years unchanged.
      u: function u(date, token) {
        var year = date.getUTCFullYear();
        return addLeadingZeros(year, token.length);
      },
      // Quarter
      Q: function Q(date, token, localize) {
        var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
        switch (token) {
          // 1, 2, 3, 4
          case 'Q':
            return String(quarter);
          // 01, 02, 03, 04
          case 'QQ':
            return addLeadingZeros(quarter, 2);
          // 1st, 2nd, 3rd, 4th
          case 'Qo':
            return localize.ordinalNumber(quarter, {
              unit: 'quarter'
            });
          // Q1, Q2, Q3, Q4
          case 'QQQ':
            return localize.quarter(quarter, {
              width: 'abbreviated',
              context: 'formatting'
            });
          // 1, 2, 3, 4 (narrow quarter; could be not numerical)
          case 'QQQQQ':
            return localize.quarter(quarter, {
              width: 'narrow',
              context: 'formatting'
            });
          // 1st quarter, 2nd quarter, ...
          case 'QQQQ':
          default:
            return localize.quarter(quarter, {
              width: 'wide',
              context: 'formatting'
            });
        }
      },
      // Stand-alone quarter
      q: function q(date, token, localize) {
        var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
        switch (token) {
          // 1, 2, 3, 4
          case 'q':
            return String(quarter);
          // 01, 02, 03, 04
          case 'qq':
            return addLeadingZeros(quarter, 2);
          // 1st, 2nd, 3rd, 4th
          case 'qo':
            return localize.ordinalNumber(quarter, {
              unit: 'quarter'
            });
          // Q1, Q2, Q3, Q4
          case 'qqq':
            return localize.quarter(quarter, {
              width: 'abbreviated',
              context: 'standalone'
            });
          // 1, 2, 3, 4 (narrow quarter; could be not numerical)
          case 'qqqqq':
            return localize.quarter(quarter, {
              width: 'narrow',
              context: 'standalone'
            });
          // 1st quarter, 2nd quarter, ...
          case 'qqqq':
          default:
            return localize.quarter(quarter, {
              width: 'wide',
              context: 'standalone'
            });
        }
      },
      // Month
      M: function M(date, token, localize) {
        var month = date.getUTCMonth();
        switch (token) {
          case 'M':
          case 'MM':
            return formatters$1.M(date, token);
          // 1st, 2nd, ..., 12th
          case 'Mo':
            return localize.ordinalNumber(month + 1, {
              unit: 'month'
            });
          // Jan, Feb, ..., Dec
          case 'MMM':
            return localize.month(month, {
              width: 'abbreviated',
              context: 'formatting'
            });
          // J, F, ..., D
          case 'MMMMM':
            return localize.month(month, {
              width: 'narrow',
              context: 'formatting'
            });
          // January, February, ..., December
          case 'MMMM':
          default:
            return localize.month(month, {
              width: 'wide',
              context: 'formatting'
            });
        }
      },
      // Stand-alone month
      L: function L(date, token, localize) {
        var month = date.getUTCMonth();
        switch (token) {
          // 1, 2, ..., 12
          case 'L':
            return String(month + 1);
          // 01, 02, ..., 12
          case 'LL':
            return addLeadingZeros(month + 1, 2);
          // 1st, 2nd, ..., 12th
          case 'Lo':
            return localize.ordinalNumber(month + 1, {
              unit: 'month'
            });
          // Jan, Feb, ..., Dec
          case 'LLL':
            return localize.month(month, {
              width: 'abbreviated',
              context: 'standalone'
            });
          // J, F, ..., D
          case 'LLLLL':
            return localize.month(month, {
              width: 'narrow',
              context: 'standalone'
            });
          // January, February, ..., December
          case 'LLLL':
          default:
            return localize.month(month, {
              width: 'wide',
              context: 'standalone'
            });
        }
      },
      // Local week of year
      w: function w(date, token, localize, options) {
        var week = getUTCWeek(date, options);
        if (token === 'wo') {
          return localize.ordinalNumber(week, {
            unit: 'week'
          });
        }
        return addLeadingZeros(week, token.length);
      },
      // ISO week of year
      I: function I(date, token, localize) {
        var isoWeek = getUTCISOWeek(date);
        if (token === 'Io') {
          return localize.ordinalNumber(isoWeek, {
            unit: 'week'
          });
        }
        return addLeadingZeros(isoWeek, token.length);
      },
      // Day of the month
      d: function d(date, token, localize) {
        if (token === 'do') {
          return localize.ordinalNumber(date.getUTCDate(), {
            unit: 'date'
          });
        }
        return formatters$1.d(date, token);
      },
      // Day of year
      D: function D(date, token, localize) {
        var dayOfYear = getUTCDayOfYear(date);
        if (token === 'Do') {
          return localize.ordinalNumber(dayOfYear, {
            unit: 'dayOfYear'
          });
        }
        return addLeadingZeros(dayOfYear, token.length);
      },
      // Day of week
      E: function E(date, token, localize) {
        var dayOfWeek = date.getUTCDay();
        switch (token) {
          // Tue
          case 'E':
          case 'EE':
          case 'EEE':
            return localize.day(dayOfWeek, {
              width: 'abbreviated',
              context: 'formatting'
            });
          // T
          case 'EEEEE':
            return localize.day(dayOfWeek, {
              width: 'narrow',
              context: 'formatting'
            });
          // Tu
          case 'EEEEEE':
            return localize.day(dayOfWeek, {
              width: 'short',
              context: 'formatting'
            });
          // Tuesday
          case 'EEEE':
          default:
            return localize.day(dayOfWeek, {
              width: 'wide',
              context: 'formatting'
            });
        }
      },
      // Local day of week
      e: function e(date, token, localize, options) {
        var dayOfWeek = date.getUTCDay();
        var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
        switch (token) {
          // Numerical value (Nth day of week with current locale or weekStartsOn)
          case 'e':
            return String(localDayOfWeek);
          // Padded numerical value
          case 'ee':
            return addLeadingZeros(localDayOfWeek, 2);
          // 1st, 2nd, ..., 7th
          case 'eo':
            return localize.ordinalNumber(localDayOfWeek, {
              unit: 'day'
            });
          case 'eee':
            return localize.day(dayOfWeek, {
              width: 'abbreviated',
              context: 'formatting'
            });
          // T
          case 'eeeee':
            return localize.day(dayOfWeek, {
              width: 'narrow',
              context: 'formatting'
            });
          // Tu
          case 'eeeeee':
            return localize.day(dayOfWeek, {
              width: 'short',
              context: 'formatting'
            });
          // Tuesday
          case 'eeee':
          default:
            return localize.day(dayOfWeek, {
              width: 'wide',
              context: 'formatting'
            });
        }
      },
      // Stand-alone local day of week
      c: function c(date, token, localize, options) {
        var dayOfWeek = date.getUTCDay();
        var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
        switch (token) {
          // Numerical value (same as in `e`)
          case 'c':
            return String(localDayOfWeek);
          // Padded numerical value
          case 'cc':
            return addLeadingZeros(localDayOfWeek, token.length);
          // 1st, 2nd, ..., 7th
          case 'co':
            return localize.ordinalNumber(localDayOfWeek, {
              unit: 'day'
            });
          case 'ccc':
            return localize.day(dayOfWeek, {
              width: 'abbreviated',
              context: 'standalone'
            });
          // T
          case 'ccccc':
            return localize.day(dayOfWeek, {
              width: 'narrow',
              context: 'standalone'
            });
          // Tu
          case 'cccccc':
            return localize.day(dayOfWeek, {
              width: 'short',
              context: 'standalone'
            });
          // Tuesday
          case 'cccc':
          default:
            return localize.day(dayOfWeek, {
              width: 'wide',
              context: 'standalone'
            });
        }
      },
      // ISO day of week
      i: function i(date, token, localize) {
        var dayOfWeek = date.getUTCDay();
        var isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
        switch (token) {
          // 2
          case 'i':
            return String(isoDayOfWeek);
          // 02
          case 'ii':
            return addLeadingZeros(isoDayOfWeek, token.length);
          // 2nd
          case 'io':
            return localize.ordinalNumber(isoDayOfWeek, {
              unit: 'day'
            });
          // Tue
          case 'iii':
            return localize.day(dayOfWeek, {
              width: 'abbreviated',
              context: 'formatting'
            });
          // T
          case 'iiiii':
            return localize.day(dayOfWeek, {
              width: 'narrow',
              context: 'formatting'
            });
          // Tu
          case 'iiiiii':
            return localize.day(dayOfWeek, {
              width: 'short',
              context: 'formatting'
            });
          // Tuesday
          case 'iiii':
          default:
            return localize.day(dayOfWeek, {
              width: 'wide',
              context: 'formatting'
            });
        }
      },
      // AM or PM
      a: function a(date, token, localize) {
        var hours = date.getUTCHours();
        var dayPeriodEnumValue = hours / 12 >= 1 ? 'pm' : 'am';
        switch (token) {
          case 'a':
          case 'aa':
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: 'abbreviated',
              context: 'formatting'
            });
          case 'aaa':
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: 'abbreviated',
              context: 'formatting'
            }).toLowerCase();
          case 'aaaaa':
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: 'narrow',
              context: 'formatting'
            });
          case 'aaaa':
          default:
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: 'wide',
              context: 'formatting'
            });
        }
      },
      // AM, PM, midnight, noon
      b: function b(date, token, localize) {
        var hours = date.getUTCHours();
        var dayPeriodEnumValue;
        if (hours === 12) {
          dayPeriodEnumValue = dayPeriodEnum.noon;
        } else if (hours === 0) {
          dayPeriodEnumValue = dayPeriodEnum.midnight;
        } else {
          dayPeriodEnumValue = hours / 12 >= 1 ? 'pm' : 'am';
        }
        switch (token) {
          case 'b':
          case 'bb':
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: 'abbreviated',
              context: 'formatting'
            });
          case 'bbb':
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: 'abbreviated',
              context: 'formatting'
            }).toLowerCase();
          case 'bbbbb':
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: 'narrow',
              context: 'formatting'
            });
          case 'bbbb':
          default:
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: 'wide',
              context: 'formatting'
            });
        }
      },
      // in the morning, in the afternoon, in the evening, at night
      B: function B(date, token, localize) {
        var hours = date.getUTCHours();
        var dayPeriodEnumValue;
        if (hours >= 17) {
          dayPeriodEnumValue = dayPeriodEnum.evening;
        } else if (hours >= 12) {
          dayPeriodEnumValue = dayPeriodEnum.afternoon;
        } else if (hours >= 4) {
          dayPeriodEnumValue = dayPeriodEnum.morning;
        } else {
          dayPeriodEnumValue = dayPeriodEnum.night;
        }
        switch (token) {
          case 'B':
          case 'BB':
          case 'BBB':
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: 'abbreviated',
              context: 'formatting'
            });
          case 'BBBBB':
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: 'narrow',
              context: 'formatting'
            });
          case 'BBBB':
          default:
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: 'wide',
              context: 'formatting'
            });
        }
      },
      // Hour [1-12]
      h: function h(date, token, localize) {
        if (token === 'ho') {
          var hours = date.getUTCHours() % 12;
          if (hours === 0) hours = 12;
          return localize.ordinalNumber(hours, {
            unit: 'hour'
          });
        }
        return formatters$1.h(date, token);
      },
      // Hour [0-23]
      H: function H(date, token, localize) {
        if (token === 'Ho') {
          return localize.ordinalNumber(date.getUTCHours(), {
            unit: 'hour'
          });
        }
        return formatters$1.H(date, token);
      },
      // Hour [0-11]
      K: function K(date, token, localize) {
        var hours = date.getUTCHours() % 12;
        if (token === 'Ko') {
          return localize.ordinalNumber(hours, {
            unit: 'hour'
          });
        }
        return addLeadingZeros(hours, token.length);
      },
      // Hour [1-24]
      k: function k(date, token, localize) {
        var hours = date.getUTCHours();
        if (hours === 0) hours = 24;
        if (token === 'ko') {
          return localize.ordinalNumber(hours, {
            unit: 'hour'
          });
        }
        return addLeadingZeros(hours, token.length);
      },
      // Minute
      m: function m(date, token, localize) {
        if (token === 'mo') {
          return localize.ordinalNumber(date.getUTCMinutes(), {
            unit: 'minute'
          });
        }
        return formatters$1.m(date, token);
      },
      // Second
      s: function s(date, token, localize) {
        if (token === 'so') {
          return localize.ordinalNumber(date.getUTCSeconds(), {
            unit: 'second'
          });
        }
        return formatters$1.s(date, token);
      },
      // Fraction of second
      S: function S(date, token) {
        return formatters$1.S(date, token);
      },
      // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
      X: function X(date, token, _localize, options) {
        var originalDate = options._originalDate || date;
        var timezoneOffset = originalDate.getTimezoneOffset();
        if (timezoneOffset === 0) {
          return 'Z';
        }
        switch (token) {
          // Hours and optional minutes
          case 'X':
            return formatTimezoneWithOptionalMinutes(timezoneOffset);

          // Hours, minutes and optional seconds without `:` delimiter
          // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
          // so this token always has the same output as `XX`
          case 'XXXX':
          case 'XX':
            // Hours and minutes without `:` delimiter
            return formatTimezone(timezoneOffset);

          // Hours, minutes and optional seconds with `:` delimiter
          // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
          // so this token always has the same output as `XXX`
          case 'XXXXX':
          case 'XXX': // Hours and minutes with `:` delimiter
          default:
            return formatTimezone(timezoneOffset, ':');
        }
      },
      // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
      x: function x(date, token, _localize, options) {
        var originalDate = options._originalDate || date;
        var timezoneOffset = originalDate.getTimezoneOffset();
        switch (token) {
          // Hours and optional minutes
          case 'x':
            return formatTimezoneWithOptionalMinutes(timezoneOffset);

          // Hours, minutes and optional seconds without `:` delimiter
          // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
          // so this token always has the same output as `xx`
          case 'xxxx':
          case 'xx':
            // Hours and minutes without `:` delimiter
            return formatTimezone(timezoneOffset);

          // Hours, minutes and optional seconds with `:` delimiter
          // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
          // so this token always has the same output as `xxx`
          case 'xxxxx':
          case 'xxx': // Hours and minutes with `:` delimiter
          default:
            return formatTimezone(timezoneOffset, ':');
        }
      },
      // Timezone (GMT)
      O: function O(date, token, _localize, options) {
        var originalDate = options._originalDate || date;
        var timezoneOffset = originalDate.getTimezoneOffset();
        switch (token) {
          // Short
          case 'O':
          case 'OO':
          case 'OOO':
            return 'GMT' + formatTimezoneShort(timezoneOffset, ':');
          // Long
          case 'OOOO':
          default:
            return 'GMT' + formatTimezone(timezoneOffset, ':');
        }
      },
      // Timezone (specific non-location)
      z: function z(date, token, _localize, options) {
        var originalDate = options._originalDate || date;
        var timezoneOffset = originalDate.getTimezoneOffset();
        switch (token) {
          // Short
          case 'z':
          case 'zz':
          case 'zzz':
            return 'GMT' + formatTimezoneShort(timezoneOffset, ':');
          // Long
          case 'zzzz':
          default:
            return 'GMT' + formatTimezone(timezoneOffset, ':');
        }
      },
      // Seconds timestamp
      t: function t(date, token, _localize, options) {
        var originalDate = options._originalDate || date;
        var timestamp = Math.floor(originalDate.getTime() / 1000);
        return addLeadingZeros(timestamp, token.length);
      },
      // Milliseconds timestamp
      T: function T(date, token, _localize, options) {
        var originalDate = options._originalDate || date;
        var timestamp = originalDate.getTime();
        return addLeadingZeros(timestamp, token.length);
      }
    };
    function formatTimezoneShort(offset, dirtyDelimiter) {
      var sign = offset > 0 ? '-' : '+';
      var absOffset = Math.abs(offset);
      var hours = Math.floor(absOffset / 60);
      var minutes = absOffset % 60;
      if (minutes === 0) {
        return sign + String(hours);
      }
      var delimiter = dirtyDelimiter;
      return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
    }
    function formatTimezoneWithOptionalMinutes(offset, dirtyDelimiter) {
      if (offset % 60 === 0) {
        var sign = offset > 0 ? '-' : '+';
        return sign + addLeadingZeros(Math.abs(offset) / 60, 2);
      }
      return formatTimezone(offset, dirtyDelimiter);
    }
    function formatTimezone(offset, dirtyDelimiter) {
      var delimiter = dirtyDelimiter || '';
      var sign = offset > 0 ? '-' : '+';
      var absOffset = Math.abs(offset);
      var hours = addLeadingZeros(Math.floor(absOffset / 60), 2);
      var minutes = addLeadingZeros(absOffset % 60, 2);
      return sign + hours + delimiter + minutes;
    }

    var dateLongFormatter = function dateLongFormatter(pattern, formatLong) {
      switch (pattern) {
        case 'P':
          return formatLong.date({
            width: 'short'
          });
        case 'PP':
          return formatLong.date({
            width: 'medium'
          });
        case 'PPP':
          return formatLong.date({
            width: 'long'
          });
        case 'PPPP':
        default:
          return formatLong.date({
            width: 'full'
          });
      }
    };
    var timeLongFormatter = function timeLongFormatter(pattern, formatLong) {
      switch (pattern) {
        case 'p':
          return formatLong.time({
            width: 'short'
          });
        case 'pp':
          return formatLong.time({
            width: 'medium'
          });
        case 'ppp':
          return formatLong.time({
            width: 'long'
          });
        case 'pppp':
        default:
          return formatLong.time({
            width: 'full'
          });
      }
    };
    var dateTimeLongFormatter = function dateTimeLongFormatter(pattern, formatLong) {
      var matchResult = pattern.match(/(P+)(p+)?/) || [];
      var datePattern = matchResult[1];
      var timePattern = matchResult[2];
      if (!timePattern) {
        return dateLongFormatter(pattern, formatLong);
      }
      var dateTimeFormat;
      switch (datePattern) {
        case 'P':
          dateTimeFormat = formatLong.dateTime({
            width: 'short'
          });
          break;
        case 'PP':
          dateTimeFormat = formatLong.dateTime({
            width: 'medium'
          });
          break;
        case 'PPP':
          dateTimeFormat = formatLong.dateTime({
            width: 'long'
          });
          break;
        case 'PPPP':
        default:
          dateTimeFormat = formatLong.dateTime({
            width: 'full'
          });
          break;
      }
      return dateTimeFormat.replace('{{date}}', dateLongFormatter(datePattern, formatLong)).replace('{{time}}', timeLongFormatter(timePattern, formatLong));
    };
    var longFormatters = {
      p: timeLongFormatter,
      P: dateTimeLongFormatter
    };

    /**
     * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
     * They usually appear for dates that denote time before the timezones were introduced
     * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
     * and GMT+01:00:00 after that date)
     *
     * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
     * which would lead to incorrect calculations.
     *
     * This function returns the timezone offset in milliseconds that takes seconds in account.
     */
    function getTimezoneOffsetInMilliseconds(date) {
      var utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
      utcDate.setUTCFullYear(date.getFullYear());
      return date.getTime() - utcDate.getTime();
    }

    var protectedDayOfYearTokens = ['D', 'DD'];
    var protectedWeekYearTokens = ['YY', 'YYYY'];
    function isProtectedDayOfYearToken(token) {
      return protectedDayOfYearTokens.indexOf(token) !== -1;
    }
    function isProtectedWeekYearToken(token) {
      return protectedWeekYearTokens.indexOf(token) !== -1;
    }
    function throwProtectedError(token, format, input) {
      if (token === 'YYYY') {
        throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(format, "`) for formatting years to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
      } else if (token === 'YY') {
        throw new RangeError("Use `yy` instead of `YY` (in `".concat(format, "`) for formatting years to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
      } else if (token === 'D') {
        throw new RangeError("Use `d` instead of `D` (in `".concat(format, "`) for formatting days of the month to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
      } else if (token === 'DD') {
        throw new RangeError("Use `dd` instead of `DD` (in `".concat(format, "`) for formatting days of the month to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
      }
    }

    var formatDistanceLocale = {
      lessThanXSeconds: {
        one: 'less than a second',
        other: 'less than {{count}} seconds'
      },
      xSeconds: {
        one: '1 second',
        other: '{{count}} seconds'
      },
      halfAMinute: 'half a minute',
      lessThanXMinutes: {
        one: 'less than a minute',
        other: 'less than {{count}} minutes'
      },
      xMinutes: {
        one: '1 minute',
        other: '{{count}} minutes'
      },
      aboutXHours: {
        one: 'about 1 hour',
        other: 'about {{count}} hours'
      },
      xHours: {
        one: '1 hour',
        other: '{{count}} hours'
      },
      xDays: {
        one: '1 day',
        other: '{{count}} days'
      },
      aboutXWeeks: {
        one: 'about 1 week',
        other: 'about {{count}} weeks'
      },
      xWeeks: {
        one: '1 week',
        other: '{{count}} weeks'
      },
      aboutXMonths: {
        one: 'about 1 month',
        other: 'about {{count}} months'
      },
      xMonths: {
        one: '1 month',
        other: '{{count}} months'
      },
      aboutXYears: {
        one: 'about 1 year',
        other: 'about {{count}} years'
      },
      xYears: {
        one: '1 year',
        other: '{{count}} years'
      },
      overXYears: {
        one: 'over 1 year',
        other: 'over {{count}} years'
      },
      almostXYears: {
        one: 'almost 1 year',
        other: 'almost {{count}} years'
      }
    };
    var formatDistance = function formatDistance(token, count, options) {
      var result;
      var tokenValue = formatDistanceLocale[token];
      if (typeof tokenValue === 'string') {
        result = tokenValue;
      } else if (count === 1) {
        result = tokenValue.one;
      } else {
        result = tokenValue.other.replace('{{count}}', count.toString());
      }
      if (options !== null && options !== void 0 && options.addSuffix) {
        if (options.comparison && options.comparison > 0) {
          return 'in ' + result;
        } else {
          return result + ' ago';
        }
      }
      return result;
    };

    function buildFormatLongFn(args) {
      return function () {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        // TODO: Remove String()
        var width = options.width ? String(options.width) : args.defaultWidth;
        var format = args.formats[width] || args.formats[args.defaultWidth];
        return format;
      };
    }

    var dateFormats = {
      full: 'EEEE, MMMM do, y',
      long: 'MMMM do, y',
      medium: 'MMM d, y',
      short: 'MM/dd/yyyy'
    };
    var timeFormats = {
      full: 'h:mm:ss a zzzz',
      long: 'h:mm:ss a z',
      medium: 'h:mm:ss a',
      short: 'h:mm a'
    };
    var dateTimeFormats = {
      full: "{{date}} 'at' {{time}}",
      long: "{{date}} 'at' {{time}}",
      medium: '{{date}}, {{time}}',
      short: '{{date}}, {{time}}'
    };
    var formatLong = {
      date: buildFormatLongFn({
        formats: dateFormats,
        defaultWidth: 'full'
      }),
      time: buildFormatLongFn({
        formats: timeFormats,
        defaultWidth: 'full'
      }),
      dateTime: buildFormatLongFn({
        formats: dateTimeFormats,
        defaultWidth: 'full'
      })
    };

    var formatRelativeLocale = {
      lastWeek: "'last' eeee 'at' p",
      yesterday: "'yesterday at' p",
      today: "'today at' p",
      tomorrow: "'tomorrow at' p",
      nextWeek: "eeee 'at' p",
      other: 'P'
    };
    var formatRelative = function formatRelative(token, _date, _baseDate, _options) {
      return formatRelativeLocale[token];
    };

    function buildLocalizeFn(args) {
      return function (dirtyIndex, options) {
        var context = options !== null && options !== void 0 && options.context ? String(options.context) : 'standalone';
        var valuesArray;
        if (context === 'formatting' && args.formattingValues) {
          var defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
          var width = options !== null && options !== void 0 && options.width ? String(options.width) : defaultWidth;
          valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
        } else {
          var _defaultWidth = args.defaultWidth;
          var _width = options !== null && options !== void 0 && options.width ? String(options.width) : args.defaultWidth;
          valuesArray = args.values[_width] || args.values[_defaultWidth];
        }
        var index = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex;
        // @ts-ignore: For some reason TypeScript just don't want to match it, no matter how hard we try. I challenge you to try to remove it!
        return valuesArray[index];
      };
    }

    var eraValues = {
      narrow: ['B', 'A'],
      abbreviated: ['BC', 'AD'],
      wide: ['Before Christ', 'Anno Domini']
    };
    var quarterValues = {
      narrow: ['1', '2', '3', '4'],
      abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
      wide: ['1st quarter', '2nd quarter', '3rd quarter', '4th quarter']
    };

    // Note: in English, the names of days of the week and months are capitalized.
    // If you are making a new locale based on this one, check if the same is true for the language you're working on.
    // Generally, formatted dates should look like they are in the middle of a sentence,
    // e.g. in Spanish language the weekdays and months should be in the lowercase.
    var monthValues = {
      narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
      abbreviated: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      wide: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    };
    var dayValues = {
      narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      short: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      abbreviated: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      wide: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    };
    var dayPeriodValues = {
      narrow: {
        am: 'a',
        pm: 'p',
        midnight: 'mi',
        noon: 'n',
        morning: 'morning',
        afternoon: 'afternoon',
        evening: 'evening',
        night: 'night'
      },
      abbreviated: {
        am: 'AM',
        pm: 'PM',
        midnight: 'midnight',
        noon: 'noon',
        morning: 'morning',
        afternoon: 'afternoon',
        evening: 'evening',
        night: 'night'
      },
      wide: {
        am: 'a.m.',
        pm: 'p.m.',
        midnight: 'midnight',
        noon: 'noon',
        morning: 'morning',
        afternoon: 'afternoon',
        evening: 'evening',
        night: 'night'
      }
    };
    var formattingDayPeriodValues = {
      narrow: {
        am: 'a',
        pm: 'p',
        midnight: 'mi',
        noon: 'n',
        morning: 'in the morning',
        afternoon: 'in the afternoon',
        evening: 'in the evening',
        night: 'at night'
      },
      abbreviated: {
        am: 'AM',
        pm: 'PM',
        midnight: 'midnight',
        noon: 'noon',
        morning: 'in the morning',
        afternoon: 'in the afternoon',
        evening: 'in the evening',
        night: 'at night'
      },
      wide: {
        am: 'a.m.',
        pm: 'p.m.',
        midnight: 'midnight',
        noon: 'noon',
        morning: 'in the morning',
        afternoon: 'in the afternoon',
        evening: 'in the evening',
        night: 'at night'
      }
    };
    var ordinalNumber = function ordinalNumber(dirtyNumber, _options) {
      var number = Number(dirtyNumber);

      // If ordinal numbers depend on context, for example,
      // if they are different for different grammatical genders,
      // use `options.unit`.
      //
      // `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
      // 'day', 'hour', 'minute', 'second'.

      var rem100 = number % 100;
      if (rem100 > 20 || rem100 < 10) {
        switch (rem100 % 10) {
          case 1:
            return number + 'st';
          case 2:
            return number + 'nd';
          case 3:
            return number + 'rd';
        }
      }
      return number + 'th';
    };
    var localize = {
      ordinalNumber: ordinalNumber,
      era: buildLocalizeFn({
        values: eraValues,
        defaultWidth: 'wide'
      }),
      quarter: buildLocalizeFn({
        values: quarterValues,
        defaultWidth: 'wide',
        argumentCallback: function argumentCallback(quarter) {
          return quarter - 1;
        }
      }),
      month: buildLocalizeFn({
        values: monthValues,
        defaultWidth: 'wide'
      }),
      day: buildLocalizeFn({
        values: dayValues,
        defaultWidth: 'wide'
      }),
      dayPeriod: buildLocalizeFn({
        values: dayPeriodValues,
        defaultWidth: 'wide',
        formattingValues: formattingDayPeriodValues,
        defaultFormattingWidth: 'wide'
      })
    };

    function buildMatchFn(args) {
      return function (string) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var width = options.width;
        var matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
        var matchResult = string.match(matchPattern);
        if (!matchResult) {
          return null;
        }
        var matchedString = matchResult[0];
        var parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
        var key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, function (pattern) {
          return pattern.test(matchedString);
        }) : findKey(parsePatterns, function (pattern) {
          return pattern.test(matchedString);
        });
        var value;
        value = args.valueCallback ? args.valueCallback(key) : key;
        value = options.valueCallback ? options.valueCallback(value) : value;
        var rest = string.slice(matchedString.length);
        return {
          value: value,
          rest: rest
        };
      };
    }
    function findKey(object, predicate) {
      for (var key in object) {
        if (object.hasOwnProperty(key) && predicate(object[key])) {
          return key;
        }
      }
      return undefined;
    }
    function findIndex(array, predicate) {
      for (var key = 0; key < array.length; key++) {
        if (predicate(array[key])) {
          return key;
        }
      }
      return undefined;
    }

    function buildMatchPatternFn(args) {
      return function (string) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var matchResult = string.match(args.matchPattern);
        if (!matchResult) return null;
        var matchedString = matchResult[0];
        var parseResult = string.match(args.parsePattern);
        if (!parseResult) return null;
        var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
        value = options.valueCallback ? options.valueCallback(value) : value;
        var rest = string.slice(matchedString.length);
        return {
          value: value,
          rest: rest
        };
      };
    }

    var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
    var parseOrdinalNumberPattern = /\d+/i;
    var matchEraPatterns = {
      narrow: /^(b|a)/i,
      abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
      wide: /^(before christ|before common era|anno domini|common era)/i
    };
    var parseEraPatterns = {
      any: [/^b/i, /^(a|c)/i]
    };
    var matchQuarterPatterns = {
      narrow: /^[1234]/i,
      abbreviated: /^q[1234]/i,
      wide: /^[1234](th|st|nd|rd)? quarter/i
    };
    var parseQuarterPatterns = {
      any: [/1/i, /2/i, /3/i, /4/i]
    };
    var matchMonthPatterns = {
      narrow: /^[jfmasond]/i,
      abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
      wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
    };
    var parseMonthPatterns = {
      narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
      any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
    };
    var matchDayPatterns = {
      narrow: /^[smtwf]/i,
      short: /^(su|mo|tu|we|th|fr|sa)/i,
      abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
      wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
    };
    var parseDayPatterns = {
      narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
      any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
    };
    var matchDayPeriodPatterns = {
      narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
      any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
    };
    var parseDayPeriodPatterns = {
      any: {
        am: /^a/i,
        pm: /^p/i,
        midnight: /^mi/i,
        noon: /^no/i,
        morning: /morning/i,
        afternoon: /afternoon/i,
        evening: /evening/i,
        night: /night/i
      }
    };
    var match = {
      ordinalNumber: buildMatchPatternFn({
        matchPattern: matchOrdinalNumberPattern,
        parsePattern: parseOrdinalNumberPattern,
        valueCallback: function valueCallback(value) {
          return parseInt(value, 10);
        }
      }),
      era: buildMatchFn({
        matchPatterns: matchEraPatterns,
        defaultMatchWidth: 'wide',
        parsePatterns: parseEraPatterns,
        defaultParseWidth: 'any'
      }),
      quarter: buildMatchFn({
        matchPatterns: matchQuarterPatterns,
        defaultMatchWidth: 'wide',
        parsePatterns: parseQuarterPatterns,
        defaultParseWidth: 'any',
        valueCallback: function valueCallback(index) {
          return index + 1;
        }
      }),
      month: buildMatchFn({
        matchPatterns: matchMonthPatterns,
        defaultMatchWidth: 'wide',
        parsePatterns: parseMonthPatterns,
        defaultParseWidth: 'any'
      }),
      day: buildMatchFn({
        matchPatterns: matchDayPatterns,
        defaultMatchWidth: 'wide',
        parsePatterns: parseDayPatterns,
        defaultParseWidth: 'any'
      }),
      dayPeriod: buildMatchFn({
        matchPatterns: matchDayPeriodPatterns,
        defaultMatchWidth: 'any',
        parsePatterns: parseDayPeriodPatterns,
        defaultParseWidth: 'any'
      })
    };

    /**
     * @type {Locale}
     * @category Locales
     * @summary English locale (United States).
     * @language English
     * @iso-639-2 eng
     * @author Sasha Koss [@kossnocorp]{@link https://github.com/kossnocorp}
     * @author Lesha Koss [@leshakoss]{@link https://github.com/leshakoss}
     */
    var locale = {
      code: 'en-US',
      formatDistance: formatDistance,
      formatLong: formatLong,
      formatRelative: formatRelative,
      localize: localize,
      match: match,
      options: {
        weekStartsOn: 0 /* Sunday */,
        firstWeekContainsDate: 1
      }
    };

    // - [yYQqMLwIdDecihHKkms]o matches any available ordinal number token
    //   (one of the certain letters followed by `o`)
    // - (\w)\1* matches any sequences of the same letter
    // - '' matches two quote characters in a row
    // - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
    //   except a single quote symbol, which ends the sequence.
    //   Two quote characters do not end the sequence.
    //   If there is no matching single quote
    //   then the sequence will continue until the end of the string.
    // - . matches any single character unmatched by previous parts of the RegExps
    var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;

    // This RegExp catches symbols escaped by quotes, and also
    // sequences of symbols P, p, and the combinations like `PPPPPPPppppp`
    var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
    var escapedStringRegExp = /^'([^]*?)'?$/;
    var doubleQuoteRegExp = /''/g;
    var unescapedLatinCharacterRegExp = /[a-zA-Z]/;

    /**
     * @name format
     * @category Common Helpers
     * @summary Format the date.
     *
     * @description
     * Return the formatted date string in the given format. The result may vary by locale.
     *
     * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
     * > See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     *
     * The characters wrapped between two single quotes characters (') are escaped.
     * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
     * (see the last example)
     *
     * Format of the string is based on Unicode Technical Standard #35:
     * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
     * with a few additions (see note 7 below the table).
     *
     * Accepted patterns:
     * | Unit                            | Pattern | Result examples                   | Notes |
     * |---------------------------------|---------|-----------------------------------|-------|
     * | Era                             | G..GGG  | AD, BC                            |       |
     * |                                 | GGGG    | Anno Domini, Before Christ        | 2     |
     * |                                 | GGGGG   | A, B                              |       |
     * | Calendar year                   | y       | 44, 1, 1900, 2017                 | 5     |
     * |                                 | yo      | 44th, 1st, 0th, 17th              | 5,7   |
     * |                                 | yy      | 44, 01, 00, 17                    | 5     |
     * |                                 | yyy     | 044, 001, 1900, 2017              | 5     |
     * |                                 | yyyy    | 0044, 0001, 1900, 2017            | 5     |
     * |                                 | yyyyy   | ...                               | 3,5   |
     * | Local week-numbering year       | Y       | 44, 1, 1900, 2017                 | 5     |
     * |                                 | Yo      | 44th, 1st, 1900th, 2017th         | 5,7   |
     * |                                 | YY      | 44, 01, 00, 17                    | 5,8   |
     * |                                 | YYY     | 044, 001, 1900, 2017              | 5     |
     * |                                 | YYYY    | 0044, 0001, 1900, 2017            | 5,8   |
     * |                                 | YYYYY   | ...                               | 3,5   |
     * | ISO week-numbering year         | R       | -43, 0, 1, 1900, 2017             | 5,7   |
     * |                                 | RR      | -43, 00, 01, 1900, 2017           | 5,7   |
     * |                                 | RRR     | -043, 000, 001, 1900, 2017        | 5,7   |
     * |                                 | RRRR    | -0043, 0000, 0001, 1900, 2017     | 5,7   |
     * |                                 | RRRRR   | ...                               | 3,5,7 |
     * | Extended year                   | u       | -43, 0, 1, 1900, 2017             | 5     |
     * |                                 | uu      | -43, 01, 1900, 2017               | 5     |
     * |                                 | uuu     | -043, 001, 1900, 2017             | 5     |
     * |                                 | uuuu    | -0043, 0001, 1900, 2017           | 5     |
     * |                                 | uuuuu   | ...                               | 3,5   |
     * | Quarter (formatting)            | Q       | 1, 2, 3, 4                        |       |
     * |                                 | Qo      | 1st, 2nd, 3rd, 4th                | 7     |
     * |                                 | QQ      | 01, 02, 03, 04                    |       |
     * |                                 | QQQ     | Q1, Q2, Q3, Q4                    |       |
     * |                                 | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
     * |                                 | QQQQQ   | 1, 2, 3, 4                        | 4     |
     * | Quarter (stand-alone)           | q       | 1, 2, 3, 4                        |       |
     * |                                 | qo      | 1st, 2nd, 3rd, 4th                | 7     |
     * |                                 | qq      | 01, 02, 03, 04                    |       |
     * |                                 | qqq     | Q1, Q2, Q3, Q4                    |       |
     * |                                 | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
     * |                                 | qqqqq   | 1, 2, 3, 4                        | 4     |
     * | Month (formatting)              | M       | 1, 2, ..., 12                     |       |
     * |                                 | Mo      | 1st, 2nd, ..., 12th               | 7     |
     * |                                 | MM      | 01, 02, ..., 12                   |       |
     * |                                 | MMM     | Jan, Feb, ..., Dec                |       |
     * |                                 | MMMM    | January, February, ..., December  | 2     |
     * |                                 | MMMMM   | J, F, ..., D                      |       |
     * | Month (stand-alone)             | L       | 1, 2, ..., 12                     |       |
     * |                                 | Lo      | 1st, 2nd, ..., 12th               | 7     |
     * |                                 | LL      | 01, 02, ..., 12                   |       |
     * |                                 | LLL     | Jan, Feb, ..., Dec                |       |
     * |                                 | LLLL    | January, February, ..., December  | 2     |
     * |                                 | LLLLL   | J, F, ..., D                      |       |
     * | Local week of year              | w       | 1, 2, ..., 53                     |       |
     * |                                 | wo      | 1st, 2nd, ..., 53th               | 7     |
     * |                                 | ww      | 01, 02, ..., 53                   |       |
     * | ISO week of year                | I       | 1, 2, ..., 53                     | 7     |
     * |                                 | Io      | 1st, 2nd, ..., 53th               | 7     |
     * |                                 | II      | 01, 02, ..., 53                   | 7     |
     * | Day of month                    | d       | 1, 2, ..., 31                     |       |
     * |                                 | do      | 1st, 2nd, ..., 31st               | 7     |
     * |                                 | dd      | 01, 02, ..., 31                   |       |
     * | Day of year                     | D       | 1, 2, ..., 365, 366               | 9     |
     * |                                 | Do      | 1st, 2nd, ..., 365th, 366th       | 7     |
     * |                                 | DD      | 01, 02, ..., 365, 366             | 9     |
     * |                                 | DDD     | 001, 002, ..., 365, 366           |       |
     * |                                 | DDDD    | ...                               | 3     |
     * | Day of week (formatting)        | E..EEE  | Mon, Tue, Wed, ..., Sun           |       |
     * |                                 | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
     * |                                 | EEEEE   | M, T, W, T, F, S, S               |       |
     * |                                 | EEEEEE  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
     * | ISO day of week (formatting)    | i       | 1, 2, 3, ..., 7                   | 7     |
     * |                                 | io      | 1st, 2nd, ..., 7th                | 7     |
     * |                                 | ii      | 01, 02, ..., 07                   | 7     |
     * |                                 | iii     | Mon, Tue, Wed, ..., Sun           | 7     |
     * |                                 | iiii    | Monday, Tuesday, ..., Sunday      | 2,7   |
     * |                                 | iiiii   | M, T, W, T, F, S, S               | 7     |
     * |                                 | iiiiii  | Mo, Tu, We, Th, Fr, Sa, Su        | 7     |
     * | Local day of week (formatting)  | e       | 2, 3, 4, ..., 1                   |       |
     * |                                 | eo      | 2nd, 3rd, ..., 1st                | 7     |
     * |                                 | ee      | 02, 03, ..., 01                   |       |
     * |                                 | eee     | Mon, Tue, Wed, ..., Sun           |       |
     * |                                 | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
     * |                                 | eeeee   | M, T, W, T, F, S, S               |       |
     * |                                 | eeeeee  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
     * | Local day of week (stand-alone) | c       | 2, 3, 4, ..., 1                   |       |
     * |                                 | co      | 2nd, 3rd, ..., 1st                | 7     |
     * |                                 | cc      | 02, 03, ..., 01                   |       |
     * |                                 | ccc     | Mon, Tue, Wed, ..., Sun           |       |
     * |                                 | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
     * |                                 | ccccc   | M, T, W, T, F, S, S               |       |
     * |                                 | cccccc  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
     * | AM, PM                          | a..aa   | AM, PM                            |       |
     * |                                 | aaa     | am, pm                            |       |
     * |                                 | aaaa    | a.m., p.m.                        | 2     |
     * |                                 | aaaaa   | a, p                              |       |
     * | AM, PM, noon, midnight          | b..bb   | AM, PM, noon, midnight            |       |
     * |                                 | bbb     | am, pm, noon, midnight            |       |
     * |                                 | bbbb    | a.m., p.m., noon, midnight        | 2     |
     * |                                 | bbbbb   | a, p, n, mi                       |       |
     * | Flexible day period             | B..BBB  | at night, in the morning, ...     |       |
     * |                                 | BBBB    | at night, in the morning, ...     | 2     |
     * |                                 | BBBBB   | at night, in the morning, ...     |       |
     * | Hour [1-12]                     | h       | 1, 2, ..., 11, 12                 |       |
     * |                                 | ho      | 1st, 2nd, ..., 11th, 12th         | 7     |
     * |                                 | hh      | 01, 02, ..., 11, 12               |       |
     * | Hour [0-23]                     | H       | 0, 1, 2, ..., 23                  |       |
     * |                                 | Ho      | 0th, 1st, 2nd, ..., 23rd          | 7     |
     * |                                 | HH      | 00, 01, 02, ..., 23               |       |
     * | Hour [0-11]                     | K       | 1, 2, ..., 11, 0                  |       |
     * |                                 | Ko      | 1st, 2nd, ..., 11th, 0th          | 7     |
     * |                                 | KK      | 01, 02, ..., 11, 00               |       |
     * | Hour [1-24]                     | k       | 24, 1, 2, ..., 23                 |       |
     * |                                 | ko      | 24th, 1st, 2nd, ..., 23rd         | 7     |
     * |                                 | kk      | 24, 01, 02, ..., 23               |       |
     * | Minute                          | m       | 0, 1, ..., 59                     |       |
     * |                                 | mo      | 0th, 1st, ..., 59th               | 7     |
     * |                                 | mm      | 00, 01, ..., 59                   |       |
     * | Second                          | s       | 0, 1, ..., 59                     |       |
     * |                                 | so      | 0th, 1st, ..., 59th               | 7     |
     * |                                 | ss      | 00, 01, ..., 59                   |       |
     * | Fraction of second              | S       | 0, 1, ..., 9                      |       |
     * |                                 | SS      | 00, 01, ..., 99                   |       |
     * |                                 | SSS     | 000, 001, ..., 999                |       |
     * |                                 | SSSS    | ...                               | 3     |
     * | Timezone (ISO-8601 w/ Z)        | X       | -08, +0530, Z                     |       |
     * |                                 | XX      | -0800, +0530, Z                   |       |
     * |                                 | XXX     | -08:00, +05:30, Z                 |       |
     * |                                 | XXXX    | -0800, +0530, Z, +123456          | 2     |
     * |                                 | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
     * | Timezone (ISO-8601 w/o Z)       | x       | -08, +0530, +00                   |       |
     * |                                 | xx      | -0800, +0530, +0000               |       |
     * |                                 | xxx     | -08:00, +05:30, +00:00            | 2     |
     * |                                 | xxxx    | -0800, +0530, +0000, +123456      |       |
     * |                                 | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
     * | Timezone (GMT)                  | O...OOO | GMT-8, GMT+5:30, GMT+0            |       |
     * |                                 | OOOO    | GMT-08:00, GMT+05:30, GMT+00:00   | 2     |
     * | Timezone (specific non-locat.)  | z...zzz | GMT-8, GMT+5:30, GMT+0            | 6     |
     * |                                 | zzzz    | GMT-08:00, GMT+05:30, GMT+00:00   | 2,6   |
     * | Seconds timestamp               | t       | 512969520                         | 7     |
     * |                                 | tt      | ...                               | 3,7   |
     * | Milliseconds timestamp          | T       | 512969520900                      | 7     |
     * |                                 | TT      | ...                               | 3,7   |
     * | Long localized date             | P       | 04/29/1453                        | 7     |
     * |                                 | PP      | Apr 29, 1453                      | 7     |
     * |                                 | PPP     | April 29th, 1453                  | 7     |
     * |                                 | PPPP    | Friday, April 29th, 1453          | 2,7   |
     * | Long localized time             | p       | 12:00 AM                          | 7     |
     * |                                 | pp      | 12:00:00 AM                       | 7     |
     * |                                 | ppp     | 12:00:00 AM GMT+2                 | 7     |
     * |                                 | pppp    | 12:00:00 AM GMT+02:00             | 2,7   |
     * | Combination of date and time    | Pp      | 04/29/1453, 12:00 AM              | 7     |
     * |                                 | PPpp    | Apr 29, 1453, 12:00:00 AM         | 7     |
     * |                                 | PPPppp  | April 29th, 1453 at ...           | 7     |
     * |                                 | PPPPpppp| Friday, April 29th, 1453 at ...   | 2,7   |
     * Notes:
     * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
     *    are the same as "stand-alone" units, but are different in some languages.
     *    "Formatting" units are declined according to the rules of the language
     *    in the context of a date. "Stand-alone" units are always nominative singular:
     *
     *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
     *
     *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
     *
     * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
     *    the single quote characters (see below).
     *    If the sequence is longer than listed in table (e.g. `EEEEEEEEEEE`)
     *    the output will be the same as default pattern for this unit, usually
     *    the longest one (in case of ISO weekdays, `EEEE`). Default patterns for units
     *    are marked with "2" in the last column of the table.
     *
     *    `format(new Date(2017, 10, 6), 'MMM') //=> 'Nov'`
     *
     *    `format(new Date(2017, 10, 6), 'MMMM') //=> 'November'`
     *
     *    `format(new Date(2017, 10, 6), 'MMMMM') //=> 'N'`
     *
     *    `format(new Date(2017, 10, 6), 'MMMMMM') //=> 'November'`
     *
     *    `format(new Date(2017, 10, 6), 'MMMMMMM') //=> 'November'`
     *
     * 3. Some patterns could be unlimited length (such as `yyyyyyyy`).
     *    The output will be padded with zeros to match the length of the pattern.
     *
     *    `format(new Date(2017, 10, 6), 'yyyyyyyy') //=> '00002017'`
     *
     * 4. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
     *    These tokens represent the shortest form of the quarter.
     *
     * 5. The main difference between `y` and `u` patterns are B.C. years:
     *
     *    | Year | `y` | `u` |
     *    |------|-----|-----|
     *    | AC 1 |   1 |   1 |
     *    | BC 1 |   1 |   0 |
     *    | BC 2 |   2 |  -1 |
     *
     *    Also `yy` always returns the last two digits of a year,
     *    while `uu` pads single digit years to 2 characters and returns other years unchanged:
     *
     *    | Year | `yy` | `uu` |
     *    |------|------|------|
     *    | 1    |   01 |   01 |
     *    | 14   |   14 |   14 |
     *    | 376  |   76 |  376 |
     *    | 1453 |   53 | 1453 |
     *
     *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
     *    except local week-numbering years are dependent on `options.weekStartsOn`
     *    and `options.firstWeekContainsDate` (compare [getISOWeekYear]{@link https://date-fns.org/docs/getISOWeekYear}
     *    and [getWeekYear]{@link https://date-fns.org/docs/getWeekYear}).
     *
     * 6. Specific non-location timezones are currently unavailable in `date-fns`,
     *    so right now these tokens fall back to GMT timezones.
     *
     * 7. These patterns are not in the Unicode Technical Standard #35:
     *    - `i`: ISO day of week
     *    - `I`: ISO week of year
     *    - `R`: ISO week-numbering year
     *    - `t`: seconds timestamp
     *    - `T`: milliseconds timestamp
     *    - `o`: ordinal number modifier
     *    - `P`: long localized date
     *    - `p`: long localized time
     *
     * 8. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
     *    You should enable `options.useAdditionalWeekYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     *
     * 9. `D` and `DD` tokens represent days of the year but they are often confused with days of the month.
     *    You should enable `options.useAdditionalDayOfYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     *
     * @param {Date|Number} date - the original date
     * @param {String} format - the string of tokens
     * @param {Object} [options] - an object with options.
     * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
     * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
     * @param {Number} [options.firstWeekContainsDate=1] - the day of January, which is
     * @param {Boolean} [options.useAdditionalWeekYearTokens=false] - if true, allows usage of the week-numbering year tokens `YY` and `YYYY`;
     *   see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     * @param {Boolean} [options.useAdditionalDayOfYearTokens=false] - if true, allows usage of the day of year tokens `D` and `DD`;
     *   see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     * @returns {String} the formatted date string
     * @throws {TypeError} 2 arguments required
     * @throws {RangeError} `date` must not be Invalid Date
     * @throws {RangeError} `options.locale` must contain `localize` property
     * @throws {RangeError} `options.locale` must contain `formatLong` property
     * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
     * @throws {RangeError} `options.firstWeekContainsDate` must be between 1 and 7
     * @throws {RangeError} use `yyyy` instead of `YYYY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     * @throws {RangeError} use `yy` instead of `YY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     * @throws {RangeError} use `d` instead of `D` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     * @throws {RangeError} use `dd` instead of `DD` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     * @throws {RangeError} format string contains an unescaped latin alphabet character
     *
     * @example
     * // Represent 11 February 2014 in middle-endian format:
     * const result = format(new Date(2014, 1, 11), 'MM/dd/yyyy')
     * //=> '02/11/2014'
     *
     * @example
     * // Represent 2 July 2014 in Esperanto:
     * import { eoLocale } from 'date-fns/locale/eo'
     * const result = format(new Date(2014, 6, 2), "do 'de' MMMM yyyy", {
     *   locale: eoLocale
     * })
     * //=> '2-a de julio 2014'
     *
     * @example
     * // Escape string by single quote characters:
     * const result = format(new Date(2014, 6, 2, 15), "h 'o''clock'")
     * //=> "3 o'clock"
     */

    function format(dirtyDate, dirtyFormatStr, options) {
      var _ref, _options$locale, _ref2, _ref3, _ref4, _options$firstWeekCon, _defaultOptions$local, _defaultOptions$local2, _ref5, _ref6, _ref7, _options$weekStartsOn, _defaultOptions$local3, _defaultOptions$local4;
      requiredArgs(2, arguments);
      var formatStr = String(dirtyFormatStr);
      var defaultOptions = getDefaultOptions();
      var locale$1 = (_ref = (_options$locale = void 0 ) !== null && _options$locale !== void 0 ? _options$locale : defaultOptions.locale) !== null && _ref !== void 0 ? _ref : locale;
      var firstWeekContainsDate = toInteger((_ref2 = (_ref3 = (_ref4 = (_options$firstWeekCon = void 0 ) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : void 0 ) !== null && _ref4 !== void 0 ? _ref4 : defaultOptions.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : 1);

      // Test if weekStartsOn is between 1 and 7 _and_ is not NaN
      if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
        throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively');
      }
      var weekStartsOn = toInteger((_ref5 = (_ref6 = (_ref7 = (_options$weekStartsOn = void 0 ) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : void 0 ) !== null && _ref7 !== void 0 ? _ref7 : defaultOptions.weekStartsOn) !== null && _ref6 !== void 0 ? _ref6 : (_defaultOptions$local3 = defaultOptions.locale) === null || _defaultOptions$local3 === void 0 ? void 0 : (_defaultOptions$local4 = _defaultOptions$local3.options) === null || _defaultOptions$local4 === void 0 ? void 0 : _defaultOptions$local4.weekStartsOn) !== null && _ref5 !== void 0 ? _ref5 : 0);

      // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
      if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
        throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
      }
      if (!locale$1.localize) {
        throw new RangeError('locale must contain localize property');
      }
      if (!locale$1.formatLong) {
        throw new RangeError('locale must contain formatLong property');
      }
      var originalDate = toDate(dirtyDate);
      if (!isValid(originalDate)) {
        throw new RangeError('Invalid time value');
      }

      // Convert the date in system timezone to the same date in UTC+00:00 timezone.
      // This ensures that when UTC functions will be implemented, locales will be compatible with them.
      // See an issue about UTC functions: https://github.com/date-fns/date-fns/issues/376
      var timezoneOffset = getTimezoneOffsetInMilliseconds(originalDate);
      var utcDate = subMilliseconds(originalDate, timezoneOffset);
      var formatterOptions = {
        firstWeekContainsDate: firstWeekContainsDate,
        weekStartsOn: weekStartsOn,
        locale: locale$1,
        _originalDate: originalDate
      };
      var result = formatStr.match(longFormattingTokensRegExp).map(function (substring) {
        var firstCharacter = substring[0];
        if (firstCharacter === 'p' || firstCharacter === 'P') {
          var longFormatter = longFormatters[firstCharacter];
          return longFormatter(substring, locale$1.formatLong);
        }
        return substring;
      }).join('').match(formattingTokensRegExp).map(function (substring) {
        // Replace two single quote characters with one single quote character
        if (substring === "''") {
          return "'";
        }
        var firstCharacter = substring[0];
        if (firstCharacter === "'") {
          return cleanEscapedString(substring);
        }
        var formatter = formatters[firstCharacter];
        if (formatter) {
          if (isProtectedWeekYearToken(substring)) {
            throwProtectedError(substring, dirtyFormatStr, String(dirtyDate));
          }
          if (isProtectedDayOfYearToken(substring)) {
            throwProtectedError(substring, dirtyFormatStr, String(dirtyDate));
          }
          return formatter(utcDate, substring, locale$1.localize, formatterOptions);
        }
        if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
          throw new RangeError('Format string contains an unescaped latin alphabet character `' + firstCharacter + '`');
        }
        return substring;
      }).join('');
      return result;
    }
    function cleanEscapedString(input) {
      var matched = input.match(escapedStringRegExp);
      if (!matched) {
        return input;
      }
      return matched[1].replace(doubleQuoteRegExp, "'");
    }

    const Exporters = ['csv', 'json', 'xml'];

    const mimeTypes = {
      json: 'application/json',
      csv: 'text/csv',
      xml: 'text/xml'
    };
    const getExportedFileName = extension => `export-${format(Date.now(), 'yyyy-MM-dd_HH-mm')}.${extension}`;
    const ExportComponent = ({
      resource
    }) => {
      const [isFetching, setFetching] = React.useState();
      const sendNotice = adminjs.useNotice();
      const exportData = async type => {
        setFetching(true);
        try {
          const {
            data: {
              exportedData
            }
          } = await new adminjs.ApiClient().resourceAction({
            method: 'post',
            resourceId: resource.id,
            actionName: 'export',
            params: {
              type
            }
          });
          const blob = new Blob([exportedData], {
            type: mimeTypes[type]
          });
          FileSaver_minExports.saveAs(blob, getExportedFileName(type));
          sendNotice({
            message: 'Exported successfully',
            type: 'success'
          });
        } catch (e) {
          sendNotice({
            message: e.message,
            type: 'error'
          });
        }
        setFetching(false);
      };
      if (isFetching) {
        return /*#__PURE__*/React__default.default.createElement(designSystem.Loader, null);
      }
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        display: "flex",
        justifyContent: "center"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        variant: "lg"
      }, "Choose export format:")), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        display: "flex",
        justifyContent: "center"
      }, Exporters.map(parserType => /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        key: parserType,
        m: 2
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
        onClick: () => exportData(parserType),
        disabled: isFetching
      }, parserType.toUpperCase())))));
    };

    const Edit = ({ property, record, onChange }) => {
        const { translateProperty } = adminjs.useTranslation();
        const { params } = record;
        const { custom } = property;
        const path = adminjs.flat.get(params, custom.filePathProperty);
        const key = adminjs.flat.get(params, custom.keyProperty);
        const file = adminjs.flat.get(params, custom.fileProperty);
        const [originalKey, setOriginalKey] = React.useState(key);
        const [filesToUpload, setFilesToUpload] = React.useState([]);
        React.useEffect(() => {
            // it means means that someone hit save and new file has been uploaded
            // in this case fliesToUpload should be cleared.
            // This happens when user turns off redirect after new/edit
            if ((typeof key === 'string' && key !== originalKey)
                || (typeof key !== 'string' && !originalKey)
                || (typeof key !== 'string' && Array.isArray(key) && key.length !== originalKey.length)) {
                setOriginalKey(key);
                setFilesToUpload([]);
            }
        }, [key, originalKey]);
        const onUpload = (files) => {
            setFilesToUpload(files);
            onChange(custom.fileProperty, files);
        };
        const handleRemove = () => {
            onChange(custom.fileProperty, null);
        };
        const handleMultiRemove = (singleKey) => {
            const index = (adminjs.flat.get(record.params, custom.keyProperty) || []).indexOf(singleKey);
            const filesToDelete = adminjs.flat.get(record.params, custom.filesToDeleteProperty) || [];
            if (path && path.length > 0) {
                const newPath = path.map((currentPath, i) => (i !== index ? currentPath : null));
                let newParams = adminjs.flat.set(record.params, custom.filesToDeleteProperty, [...filesToDelete, index]);
                newParams = adminjs.flat.set(newParams, custom.filePathProperty, newPath);
                onChange({
                    ...record,
                    params: newParams,
                });
            }
            else {
                // eslint-disable-next-line no-console
                console.log('You cannot remove file when there are no uploaded files yet');
            }
        };
        return (React__default.default.createElement(designSystem.FormGroup, null,
            React__default.default.createElement(designSystem.Label, null, translateProperty(property.label, property.resourceId)),
            React__default.default.createElement(designSystem.DropZone, { onChange: onUpload, multiple: custom.multiple, validate: {
                    mimeTypes: custom.mimeTypes,
                    maxSize: custom.maxSize,
                }, files: filesToUpload }),
            !custom.multiple && key && path && !filesToUpload.length && file !== null && (React__default.default.createElement(designSystem.DropZoneItem, { filename: key, src: path, onRemove: handleRemove })),
            custom.multiple && key && key.length && path ? (React__default.default.createElement(React__default.default.Fragment, null, key.map((singleKey, index) => {
                // when we remove items we set only path index to nulls.
                // key is still there. This is because
                // we have to maintain all the indexes. So here we simply filter out elements which
                // were removed and display only what was left
                const currentPath = path[index];
                return currentPath ? (React__default.default.createElement(designSystem.DropZoneItem, { key: singleKey, filename: singleKey, src: path[index], onRemove: () => handleMultiRemove(singleKey) })) : '';
            }))) : ''));
    };

    const AudioMimeTypes = [
        'audio/aac',
        'audio/midi',
        'audio/x-midi',
        'audio/mpeg',
        'audio/ogg',
        'application/ogg',
        'audio/opus',
        'audio/wav',
        'audio/webm',
        'audio/3gpp2',
    ];
    const ImageMimeTypes = [
        'image/bmp',
        'image/gif',
        'image/jpeg',
        'image/png',
        'image/svg+xml',
        'image/vnd.microsoft.icon',
        'image/tiff',
        'image/webp',
    ];

    // eslint-disable-next-line import/no-extraneous-dependencies
    const SingleFile = (props) => {
        const { name, path, mimeType, width } = props;
        if (path && path.length) {
            if (mimeType && ImageMimeTypes.includes(mimeType)) {
                return (React__default.default.createElement("img", { src: path, style: { maxHeight: width, maxWidth: width }, alt: name }));
            }
            if (mimeType && AudioMimeTypes.includes(mimeType)) {
                return (React__default.default.createElement("audio", { controls: true, src: path },
                    "Your browser does not support the",
                    React__default.default.createElement("code", null, "audio"),
                    React__default.default.createElement("track", { kind: "captions" })));
            }
        }
        return (React__default.default.createElement(designSystem.Box, null,
            React__default.default.createElement(designSystem.Button, { as: "a", href: path, ml: "default", size: "sm", rounded: true, target: "_blank" },
                React__default.default.createElement(designSystem.Icon, { icon: "DocumentDownload", color: "white", mr: "default" }),
                name)));
    };
    const File = ({ width, record, property }) => {
        const { custom } = property;
        let path = adminjs.flat.get(record?.params, custom.filePathProperty);
        if (!path) {
            return null;
        }
        const name = adminjs.flat.get(record?.params, custom.fileNameProperty ? custom.fileNameProperty : custom.keyProperty);
        const mimeType = custom.mimeTypeProperty
            && adminjs.flat.get(record?.params, custom.mimeTypeProperty);
        if (!property.custom.multiple) {
            if (custom.opts && custom.opts.baseUrl) {
                path = `${custom.opts.baseUrl}/${name}`;
            }
            return (React__default.default.createElement(SingleFile, { path: path, name: name, width: width, mimeType: mimeType }));
        }
        if (custom.opts && custom.opts.baseUrl) {
            const baseUrl = custom.opts.baseUrl || '';
            path = path.map((singlePath, index) => `${baseUrl}/${name[index]}`);
        }
        return (React__default.default.createElement(React__default.default.Fragment, null, path.map((singlePath, index) => (React__default.default.createElement(SingleFile, { key: singlePath, path: singlePath, name: name[index], width: width, mimeType: mimeType[index] })))));
    };

    const List = (props) => (React__default.default.createElement(File, { width: 100, ...props }));

    const Show = (props) => {
        const { property } = props;
        const { translateProperty } = adminjs.useTranslation();
        return (React__default.default.createElement(designSystem.FormGroup, null,
            React__default.default.createElement(designSystem.Label, null, translateProperty(property.label, property.resourceId)),
            React__default.default.createElement(File, { width: "100%", ...props })));
    };

    const Cell = styledComponents.styled(designSystem.TableCell) `
  width: 100%;
  word-break: break-word;
`;
    const Row = styledComponents.styled(designSystem.TableRow) `
  display: flex;
  position: unset;
`;
    const Head = styledComponents.styled(designSystem.TableHead) `
  display: flex;
  position: unset;
`;
    const Table = styledComponents.styled(designSystem.Table) `
  width: 100%;
  position: unset;
  display: block;
`;
    const RecordDifference = ({ record, property }) => {
        const differences = JSON.parse(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        adminjs.flat.unflatten(record?.params ?? {})?.[property.name] ?? {});
        if (!differences) {
            return null;
        }
        return (React__default.default.createElement(designSystem.FormGroup, null,
            React__default.default.createElement(designSystem.Label, null, property.label),
            React__default.default.createElement(Table, null,
                React__default.default.createElement(Head, null,
                    React__default.default.createElement(Row, null,
                        React__default.default.createElement(Cell, null, "Property name"),
                        React__default.default.createElement(Cell, null, "Before"),
                        React__default.default.createElement(Cell, null, "After"))),
                React__default.default.createElement(designSystem.TableBody, null, Object.entries(differences).map(([propertyName, { before, after }]) => {
                    return (React__default.default.createElement(Row, { key: propertyName },
                        React__default.default.createElement(Cell, { width: 1 / 3 }, propertyName),
                        React__default.default.createElement(Cell, { color: "red", width: 1 / 3 }, JSON.stringify(before) || 'undefined'),
                        React__default.default.createElement(Cell, { color: "green", width: 1 / 3 }, JSON.stringify(after) || 'undefined')));
                })))));
    };

    const getLogPropertyName = (property, mapping = {}) => {
        if (!mapping[property]) {
            return property;
        }
        return mapping[property];
    };

    const viewHelpers = new adminjs.ViewHelpers();
    const RecordLink = ({ record, property }) => {
        if (!record?.params) {
            return null;
        }
        const { custom = {} } = property;
        const { propertiesMapping = {} } = custom;
        const recordIdParam = getLogPropertyName('recordId', propertiesMapping);
        const resourceIdParam = getLogPropertyName('resource', propertiesMapping);
        const recordTitleParam = getLogPropertyName('recordTitle', propertiesMapping);
        const recordId = record.params[recordIdParam];
        const resource = record.params[resourceIdParam];
        record.params[recordTitleParam];
        if (!recordId || !resource) {
            return null;
        }
        return (React__default.default.createElement(designSystem.FormGroup, null,
            React__default.default.createElement(designSystem.Link, { href: viewHelpers.recordActionUrl({
                    actionName: 'show',
                    recordId,
                    resourceId: resource,
                }) }, recordId)));
    };

    // URL: http://localhost:3000/admin/api/resources/supplier/actions/search/alice?searchProperty=name
    // const callApi = () => api.searchRecords({resourceId:'supplier',searchProperty:'name',query:'alice'}).then((res) => console.log('callapi',res))
    // searchRecords has 50 limit returned records defined by Prisma take argumnet, USE resourceAction instead to specify take argument as aaxiosParams
    // const callApi = () => api.searchRecords({resourceId:'supplier',searchProperty:'id',query:JSON.stringify({gt:10})}).then((res) => console.log('return value is array',res))

    const MyHelloComponent = () => /*#__PURE__*/React__default.default.createElement("p", {
      style: {
        textAlign: 'center',
        paddingTop: '30rem',
        fontSize: '5rem'
      }
    }, "Hello Administrator");

    AdminJS.UserComponents = {};
    AdminJS.UserComponents.RelationsShowPropertyComponent = RelationsShowPropertyComponent$1;
    AdminJS.UserComponents.RelationsEditPropertyComponent = RelationsEditPropertyComponent$1;
    AdminJS.UserComponents.RelationsListPropertyComponent = RelationsListPropertyComponent$1;
    AdminJS.UserComponents.ImportComponent = ImportComponent;
    AdminJS.UserComponents.ExportComponent = ExportComponent;
    AdminJS.UserComponents.UploadEditComponent = Edit;
    AdminJS.UserComponents.UploadListComponent = List;
    AdminJS.UserComponents.UploadShowComponent = Show;
    AdminJS.UserComponents.RecordDifference = RecordDifference;
    AdminJS.UserComponents.RecordLink = RecordLink;
    AdminJS.UserComponents.Dashboard = MyHelloComponent;

})(AdminJSDesignSystem, AdminJS, React, ReactRedux, ReactRouter, styled);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvcmVsYXRpb25zL2xpYi9wcm92aWRlcnMvUmVsYXRpb25Db25maWdQcm92aWRlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy9yZWxhdGlvbnMvbGliL2hvb2tzL3VzZVJlbGF0aW9uUmVjb3Jkcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy9yZWxhdGlvbnMvbGliL3R5cGVzL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3JlbGF0aW9ucy9saWIvY29uc3RhbnRzL21lc3NhZ2VzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3JlbGF0aW9ucy9saWIvY29tcG9uZW50cy9tYW55LXRvLW1hbnkvUmVsYXRpb25Ob1JlY29yZHMuanMiLCIuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvcmVsYXRpb25zL2xpYi9jb21wb25lbnRzL3NoYXJlZC91c2VSZWRpcmVjdFVybC5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy9yZWxhdGlvbnMvbGliL2NvbXBvbmVudHMvbWFueS10by1tYW55L1JlbGF0aW9uUmVjb3JkSW5MaXN0QWN0aW9ucy5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy9yZWxhdGlvbnMvbGliL2NvbXBvbmVudHMvbWFueS10by1tYW55L1JlbGF0aW9uUmVjb3JkSW5MaXN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3JlbGF0aW9ucy9saWIvY29tcG9uZW50cy9tYW55LXRvLW1hbnkvUmVsYXRpb25SZWNvcmRzVGFibGUuanMiLCIuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvcmVsYXRpb25zL2xpYi9jb21wb25lbnRzL21hbnktdG8tbWFueS9BZGRJdGVtTW9kYWxDb250ZW50LmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3JlbGF0aW9ucy9saWIvY29tcG9uZW50cy9tYW55LXRvLW1hbnkvUmVsYXRpb25SZXNvdXJjZUFjdGlvbnMuanMiLCIuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvcmVsYXRpb25zL2xpYi9jb21wb25lbnRzL29uZS10by1tYW55L1JlbGF0aW9uTm9SZWNvcmRzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3JlbGF0aW9ucy9saWIvY29tcG9uZW50cy9vbmUtdG8tbWFueS9SZWxhdGlvblJlY29yZEluTGlzdEFjdGlvbnMuanMiLCIuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvcmVsYXRpb25zL2xpYi9jb21wb25lbnRzL29uZS10by1tYW55L1JlbGF0aW9uUmVjb3JkSW5MaXN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3JlbGF0aW9ucy9saWIvY29tcG9uZW50cy9vbmUtdG8tbWFueS9SZWxhdGlvblJlY29yZHNUYWJsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy9yZWxhdGlvbnMvbGliL2NvbXBvbmVudHMvb25lLXRvLW1hbnkvUmVsYXRpb25SZXNvdXJjZUFjdGlvbnMuanMiLCIuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvcmVsYXRpb25zL2xpYi9jb21wb25lbnRzL3NoYXJlZC9SZWxhdGlvblRhYi5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy9yZWxhdGlvbnMvbGliL2NvbXBvbmVudHMvUmVsYXRpb25zU2hvd1Byb3BlcnR5Q29tcG9uZW50LmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3JlbGF0aW9ucy9saWIvY29tcG9uZW50cy9SZWxhdGlvbnNFZGl0UHJvcGVydHlDb21wb25lbnQuanMiLCIuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvcmVsYXRpb25zL2xpYi9jb21wb25lbnRzL1JlbGF0aW9uc0xpc3RQcm9wZXJ0eUNvbXBvbmVudC5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy9pbXBvcnQtZXhwb3J0L2xpYi9jb21wb25lbnRzL0ltcG9ydENvbXBvbmVudC5qc3giLCIuLi9ub2RlX21vZHVsZXMvZmlsZS1zYXZlci9kaXN0L0ZpbGVTYXZlci5taW4uanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdHlwZW9mLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vaXNEYXRlL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS90b0RhdGUvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2lzVmFsaWQvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvdG9JbnRlZ2VyL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9hZGRNaWxsaXNlY29uZHMvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL3N1Yk1pbGxpc2Vjb25kcy9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vX2xpYi9nZXRVVENEYXlPZlllYXIvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvc3RhcnRPZlVUQ0lTT1dlZWsvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvZ2V0VVRDSVNPV2Vla1llYXIvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvc3RhcnRPZlVUQ0lTT1dlZWtZZWFyL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9fbGliL2dldFVUQ0lTT1dlZWsvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvZGVmYXVsdE9wdGlvbnMvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvc3RhcnRPZlVUQ1dlZWsvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvZ2V0VVRDV2Vla1llYXIvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvc3RhcnRPZlVUQ1dlZWtZZWFyL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9fbGliL2dldFVUQ1dlZWsvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvYWRkTGVhZGluZ1plcm9zL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9fbGliL2Zvcm1hdC9saWdodEZvcm1hdHRlcnMvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvZm9ybWF0L2Zvcm1hdHRlcnMvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvZm9ybWF0L2xvbmdGb3JtYXR0ZXJzL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9fbGliL2dldFRpbWV6b25lT2Zmc2V0SW5NaWxsaXNlY29uZHMvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvcHJvdGVjdGVkVG9rZW5zL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9sb2NhbGUvZW4tVVMvX2xpYi9mb3JtYXREaXN0YW5jZS9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vbG9jYWxlL19saWIvYnVpbGRGb3JtYXRMb25nRm4vaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2xvY2FsZS9lbi1VUy9fbGliL2Zvcm1hdExvbmcvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2xvY2FsZS9lbi1VUy9fbGliL2Zvcm1hdFJlbGF0aXZlL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9sb2NhbGUvX2xpYi9idWlsZExvY2FsaXplRm4vaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2xvY2FsZS9lbi1VUy9fbGliL2xvY2FsaXplL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9sb2NhbGUvX2xpYi9idWlsZE1hdGNoRm4vaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2xvY2FsZS9fbGliL2J1aWxkTWF0Y2hQYXR0ZXJuRm4vaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2xvY2FsZS9lbi1VUy9fbGliL21hdGNoL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9sb2NhbGUvZW4tVVMvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2Zvcm1hdC9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy9pbXBvcnQtZXhwb3J0L2xpYi9leHBvcnRlci50eXBlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL2ltcG9ydC1leHBvcnQvbGliL2NvbXBvbmVudHMvRXhwb3J0Q29tcG9uZW50LmpzeCIsIi4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvYnVpbGQvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9VcGxvYWRFZGl0Q29tcG9uZW50LmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9idWlsZC9mZWF0dXJlcy91cGxvYWQtZmlsZS90eXBlcy9taW1lLXR5cGVzLnR5cGUuanMiLCIuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvdXBsb2FkL2J1aWxkL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvZmlsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvYnVpbGQvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9VcGxvYWRMaXN0Q29tcG9uZW50LmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9idWlsZC9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL1VwbG9hZFNob3dDb21wb25lbnQuanMiLCIuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvbG9nZ2VyL2xpYi9jb21wb25lbnRzL1JlY29yZERpZmZlcmVuY2UuanMiLCIuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvbG9nZ2VyL2xpYi91dGlscy9nZXQtbG9nLXByb3BlcnR5LW5hbWUuanMiLCIuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvbG9nZ2VyL2xpYi9jb21wb25lbnRzL1JlY29yZExpbmsuanMiLCIuLi9kYXNoYm9hcmQudHN4IiwiZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LHtjcmVhdGVDb250ZXh0LHVzZUNvbnRleHR9ZnJvbVwicmVhY3RcIjtpbXBvcnR7dXNlU3RhdGV9ZnJvbVwicmVhY3RcIjtpbXBvcnR7dXNlQ2FsbGJhY2t9ZnJvbVwicmVhY3RcIjtleHBvcnQgY29uc3QgUmVsYXRpb25Db25maWdQcm92aWRlcj0oe2NoaWxkcmVuOmEsLi4uYn0pPT57Y29uc3RbYyxkXT11c2VTdGF0ZSgwKSxlPXVzZUNhbGxiYWNrKCgpPT57ZChuZXcgRGF0ZSgpLmdldFRpbWUoKSl9LFtdKTtyZXR1cm4vKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChPd25lclJlY29yZENvbnRleHQuUHJvdmlkZXIse3ZhbHVlOnsuLi5iLHJlZnJlc2hUb2tlbjpjLHJlZnJlc2g6ZX19LGEpfTtjb25zdCBPd25lclJlY29yZENvbnRleHQ9LyojX19QVVJFX18qL2NyZWF0ZUNvbnRleHQobnVsbCk7ZXhwb3J0IGNvbnN0IHVzZVJlbGF0aW9uQ29uZmlnPSgpPT57Y29uc3QgYT11c2VDb250ZXh0KE93bmVyUmVjb3JkQ29udGV4dCk7aWYoIWEpdGhyb3cgbmV3IEVycm9yKFwidXNlUmVsYXRpb25Db25maWcgdXNlZCBvdXRzaWRlIG9mIFJlbGF0aW9uQ29uZmlnUHJvdmlkZXJcIik7cmV0dXJuIGF9OyIsImltcG9ydHtBcGlDbGllbnQsdXNlTm90aWNlLHVzZVF1ZXJ5UGFyYW1zfWZyb21cImFkbWluanNcIjtpbXBvcnR7dXNlRWZmZWN0LHVzZVN0YXRlfWZyb21cInJlYWN0XCI7aW1wb3J0e3VzZVJlbGF0aW9uQ29uZmlnfWZyb21cIi4uL3Byb3ZpZGVycy9SZWxhdGlvbkNvbmZpZ1Byb3ZpZGVyLmpzXCI7Y29uc3QgYXBpPW5ldyBBcGlDbGllbnQ7ZXhwb3J0IGNvbnN0IHVzZVJlbGF0aW9uUmVjb3Jkcz1hPT57Y29uc3R7cmVjb3JkOmIscmVzb3VyY2U6Yyx0YXJnZXRSZXNvdXJjZUlkOmQsdGFiOmV9PWEse3JlbGF0aW9uOmYscmVmcmVzaFRva2VuOmd9PXVzZVJlbGF0aW9uQ29uZmlnKCksW2gsaV09dXNlU3RhdGUoKSxbaixrXT11c2VTdGF0ZSghMCkse2RpcmVjdGlvbjpsLHNvcnRCeTptLHBhZ2U6bixwYXJzZWRRdWVyeTpvfT11c2VRdWVyeVBhcmFtcygpLHA9dXNlTm90aWNlKCk7cmV0dXJuIHVzZUVmZmVjdCgoKT0+e2U9PT1mJiZiJiYoayghMCksYXBpLnJlY29yZEFjdGlvbih7YWN0aW9uTmFtZTpcImZpbmRSZWxhdGlvblwiLHJlY29yZElkOmIuaWQscmVzb3VyY2VJZDpjLmlkLHBhcmFtczp7cmVsYXRpb246ZixkaXJlY3Rpb246bCxzb3J0Qnk6bSxwYWdlOm59fSkudGhlbigoe2RhdGE6e3JlY29yZHM6YSxtZXRhOmIsbm90aWNlOmN9fSk9PntjJiZwKGMpLGsoITEpLGkoe3JlY29yZHM6YSxtZXRhOmJ9KX0pLmZpbmFsbHkoKCk9PntrKCExKX0pKX0sW2UsZixiLGMuaWQsZCxsLG0sbixvLGddKSx7ZGF0YTpoLGlzTG9hZGluZzpqfX07IiwiZXhwb3J0IGxldCBSZWxhdGlvblR5cGU9LyojX19QVVJFX18qL2Z1bmN0aW9uKGEpe3JldHVybiBhLk9uZVRvTWFueT1cIm9uZS10by1tYW55XCIsYS5NYW55VG9NYW55PVwibWFueS10by1tYW55XCIsYX0oe30pOyIsImV4cG9ydCBsZXQgTWVzc2FnZXM9LyojX19QVVJFX18qL2Z1bmN0aW9uKGEpe3JldHVybiBhLk1pc3NpbmdDb25maWd1cmF0aW9uPVwiW0BhZG1pbmpzL3JlbGF0aW9uc11fbWlzc2luZ0NvbmZpZ3VyYXRpb25cIixhLk1pc3NpbmdSZWNvcmRJZD1cIltAYWRtaW5qcy9yZWxhdGlvbnNdX21pc3NpbmdSZWNvcmRJZFwiLGEuSW52YWxpZFJlbGF0aW9uVHlwZT1cIltAYWRtaW5qcy9yZWxhdGlvbnNdX2ludmFsaWRSZWxhdGlvblR5cGVcIixhLkpvaW5LZXlNaXNzaW5nPVwiW0BhZG1pbmpzL3JlbGF0aW9uc11fam9pbktleU1pc3NpbmdcIixhLk5vUmVsYXRpb25SZWNvcmRzVGl0bGU9XCJbQGFkbWluanMvcmVsYXRpb25zXV9ub1JlbGF0aW9uUmVjb3Jkc1RpdGxlXCIsYS5Ob1JlbGF0aW9uUmVjb3Jkcz1cIltAYWRtaW5qcy9yZWxhdGlvbnNdX25vUmVsYXRpb25SZWNvcmRzXCIsYS5KdW5jdGlvbk1pc3Npbmc9XCJbQGFkbWluanMvcmVsYXRpb25zXV9qdW5jdGlvbk1pc3NpbmdcIixhLkp1bmN0aW9uUmVzb3VyY2VJZE1pc3Npbmc9XCJbQGFkbWluanMvcmVsYXRpb25zXV9qdW5jdGlvblJlc291cmNlSWRNaXNzaW5nXCIsYS5KdW5jdGlvblJlc291cmNlTWlzc2luZz1cIltAYWRtaW5qcy9yZWxhdGlvbnNdX2p1bmN0aW9uUmVzb3VyY2VNaXNzaW5nXCIsYS5DaG9vc2VJdGVtU3VidGl0bGU9XCJbQGFkbWluanMvcmVsYXRpb25zXV9jaG9vc2VJdGVtU3VidGl0bGVcIixhLk1hbnlUb01hbnlSZWxhdGlvbkFscmVhZHlFeGlzdHM9XCJbQGFkbWluanMvcmVsYXRpb25zXV9tblJlbGF0aW9uQWxyZWFkeUV4aXN0c1wiLGEuUmVsYXRpb25TdWNjZXNzZnVsbHlBZGRlZD1cIltAYWRtaW5qcy9yZWxhdGlvbnNdX3JlbGF0aW9uU3VjY2Vzc2Z1bGx5QWRkZWRcIixhLlJlbGF0aW9uU3VjY2Vzc2Z1bGx5RGVsZXRlZD1cIltAYWRtaW5qcy9yZWxhdGlvbnNdX3JlbGF0aW9uU3VjY2Vzc2Z1bGx5RGVsZXRlZFwiLGEuUXVlcnlQYXJhbXNNaXNzaW5nPVwiW0BhZG1pbmpzL3JlbGF0aW9uc11fcXVlcnlQYXJhbXNNaXNzaW5nXCIsYS5KdW5jdGlvblJlY29yZE1pc3Npbmc9XCJbQGFkbWluanMvcmVsYXRpb25zXV9qdW5jdGlvblJlY29yZE1pc3NpbmdcIixhfSh7fSk7ZXhwb3J0IGxldCBMYWJlbHM9LyojX19QVVJFX18qL2Z1bmN0aW9uKGEpe3JldHVybiBhLkNob29zZUl0ZW1IZWFkZXI9XCJbQGFkbWluanMvcmVsYXRpb25zXV9jaG9vc2VJdGVtSGVhZGVyXCIsYS5EZWxldGVSZWxhdGlvbkhlYWRlcj1cIltAYWRtaW5qcy9yZWxhdGlvbnNdX2RlbGV0ZVJlbGF0aW9uSGVhZGVyXCIsYX0oe30pO2V4cG9ydCBsZXQgQWN0aW9ucz0vKiNfX1BVUkVfXyovZnVuY3Rpb24oYSl7cmV0dXJuIGEuQWRkSXRlbT1cIltAYWRtaW5qcy9yZWxhdGlvbnNdX2FkZEl0ZW1cIixhLlJlbW92ZVJlbGF0aW9uPVwiW0BhZG1pbmpzL3JlbGF0aW9uc11fcmVtb3ZlUmVsYXRpb25cIixhLlJlbW92ZVJlY29yZD1cIltAYWRtaW5qcy9yZWxhdGlvbnNdX3JlbW92ZVJlY29yZFwiLGF9KHt9KTsiLCJpbXBvcnR7SW5mb0JveCxUZXh0LEJ1dHRvbixJY29ufWZyb21cIkBhZG1pbmpzL2Rlc2lnbi1zeXN0ZW1cIjtpbXBvcnR7QWN0aW9uQnV0dG9uLHVzZVRyYW5zbGF0aW9ufWZyb21cImFkbWluanNcIjtpbXBvcnQgUmVhY3QgZnJvbVwicmVhY3RcIjtpbXBvcnR7TWVzc2FnZXN9ZnJvbVwiLi4vLi4vY29uc3RhbnRzL21lc3NhZ2VzLmpzXCI7aW1wb3J0e3VzZVJlbGF0aW9uQ29uZmlnfWZyb21cIi4uLy4uL3Byb3ZpZGVycy9SZWxhdGlvbkNvbmZpZ1Byb3ZpZGVyLmpzXCI7ZXhwb3J0IGNvbnN0IFJlbGF0aW9uTm9SZWNvcmRzPWE9Pntjb25zdHtyZXNvdXJjZTp7bmFtZTpiLGlkOmMscmVzb3VyY2VBY3Rpb25zOmR9fT1hLHtvd25lclJlY29yZDplLHJlbGF0aW9uczpmLHJlbGF0aW9uOmd9PXVzZVJlbGF0aW9uQ29uZmlnKCkse3RiOmgsdG06aX09dXNlVHJhbnNsYXRpb24oKSxqPWZbZ10udGFyZ2V0LnJlc291cmNlSWQsaz1mW2ddLmp1bmN0aW9uPy5qb2luS2V5LGw9ZltnXS5qdW5jdGlvbj8uaW52ZXJzZUpvaW5LZXk7aWYoIWp8fCFrfHwhbClyZXR1cm4gbnVsbDtjb25zdCBtPWQuZmluZCgoe25hbWU6YX0pPT5cIm5ld1wiPT09YSk7cmV0dXJuLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoSW5mb0JveCx7dGl0bGU6aShNZXNzYWdlcy5Ob1JlbGF0aW9uUmVjb3Jkc1RpdGxlLGMpLGlsbHVzdHJhdGlvbjpcIkRvY3NcIn0sLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCx7bWI6XCJ4eGxcIn0saShNZXNzYWdlcy5Ob1JlbGF0aW9uUmVjb3JkcyxjLHtyZWxhdGlvbk5hbWU6Yn0pKSxtJiYvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChBY3Rpb25CdXR0b24se2FjdGlvbjptLHJlc291cmNlSWQ6YyxxdWVyeVBhcmFtczp7W2tdOmUuaWQsanVuY3Rpb25SZXNvdXJjZUlkOmZbZ10uanVuY3Rpb24/LnRocm91Z2hSZXNvdXJjZUlkLGpvaW5LZXk6ayxpbnZlcnNlSm9pbktleTpsLHJlZGlyZWN0VXJsOmxvY2F0aW9uLmhyZWZ9fSwvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b24se3ZhcmlhbnQ6XCJjb250YWluZWRcIn0sLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoSWNvbix7aWNvbjpcIlBsdXNcIn0pLGgoXCJjcmVhdGVGaXJzdFJlY29yZFwiLGMpKSkpfTsiLCJleHBvcnQgY29uc3QgdXNlUmVkaXJlY3RVcmw9KCk9Pntjb25zdCBhPW5ldyBVUkwobG9jYXRpb24uaHJlZik7Ly8gUmVtb3ZlIGN1cnJlbnQgcmVkaXJlY3RVcmwgdG8gcHJldmVudCBpbmZpbml0ZSByZWRpcmVjdGlvbnNcbnJldHVybiBhLnNlYXJjaFBhcmFtcy5nZXQoXCJyZWRpcmVjdFVybFwiKSYmYS5zZWFyY2hQYXJhbXMuZGVsZXRlKFwicmVkaXJlY3RVcmxcIiksYS5ocmVmfTsiLCJpbXBvcnR7Qm94LEJ1dHRvbixJY29uLE1vZGFsfWZyb21cIkBhZG1pbmpzL2Rlc2lnbi1zeXN0ZW1cIjtpbXBvcnR7QWN0aW9uQnV0dG9uLEFwaUNsaWVudCx1c2VOb3RpY2UsdXNlVHJhbnNsYXRpb259ZnJvbVwiYWRtaW5qc1wiO2ltcG9ydCBSZWFjdCx7dXNlU3RhdGV9ZnJvbVwicmVhY3RcIjtpbXBvcnR7QWN0aW9ucyxMYWJlbHN9ZnJvbVwiLi4vLi4vY29uc3RhbnRzL21lc3NhZ2VzLmpzXCI7aW1wb3J0e3VzZVJlbGF0aW9uQ29uZmlnfWZyb21cIi4uLy4uL3Byb3ZpZGVycy9SZWxhdGlvbkNvbmZpZ1Byb3ZpZGVyLmpzXCI7aW1wb3J0e3VzZVJlZGlyZWN0VXJsfWZyb21cIi4uL3NoYXJlZC91c2VSZWRpcmVjdFVybC5qc1wiO2NvbnN0IGFwaT1uZXcgQXBpQ2xpZW50O2V4cG9ydCBjb25zdCBSZWxhdGlvblJlY29yZEluTGlzdEFjdGlvbnM9YT0+e2NvbnN0e3JlY29yZDp7cmVjb3JkQWN0aW9uczpiLGlkOmN9LHJlc291cmNlOntpZDpkfX09YSxbZSxmXT11c2VTdGF0ZSghMSkse293bmVyUmVjb3JkOmcsb3duZXJSZXNvdXJjZTpoLHJlbGF0aW9uOmkscmVsYXRpb25zOmoscmVmcmVzaDprfT11c2VSZWxhdGlvbkNvbmZpZygpLHtkZWxldGVPcHRpb25zOntlbmFibGVEZWxldGVSZWxhdGlvbjpsLGVuYWJsZURlbGV0ZVJlbGF0ZWRSZWNvcmQ6bX09e2VuYWJsZURlbGV0ZVJlbGF0ZWRSZWNvcmQ6ITAsZW5hYmxlRGVsZXRlUmVsYXRpb246ITB9fT1qW2ldLG49dXNlTm90aWNlKCkse3RhOm8sdGw6cH09dXNlVHJhbnNsYXRpb24oKSxxPXVzZVJlZGlyZWN0VXJsKCkscj0oYT0hMSk9PnthJiZrKCksZighMSl9LHM9YXN5bmMoKT0+e2NvbnN0IGE9YXdhaXQgYXBpLnJlY29yZEFjdGlvbih7cmVzb3VyY2VJZDpoLmlkLGFjdGlvbk5hbWU6XCJkZWxldGVSZWxhdGlvblwiLHJlY29yZElkOmcuaWQscGFyYW1zOnt0YXJnZXRSZWNvcmRJZDpjLHJlbGF0aW9uOml9fSkse2RhdGE6Yn09YTtyZXR1cm4gYn0sdD1hc3luYygpPT57Y29uc3QgYT1hd2FpdCBhcGkucmVjb3JkQWN0aW9uKHtyZXNvdXJjZUlkOmQsYWN0aW9uTmFtZTpcImRlbGV0ZVwiLHJlY29yZElkOmN9KSx7ZGF0YTpifT1hO3JldHVybiBifSx1PVtdLHY9e3ZhcmlhbnQ6XCJvdXRsaW5lZFwiLGxhYmVsOm8oQWN0aW9ucy5SZW1vdmVSZWxhdGlvbixkKSxvbkNsaWNrOmFzeW5jKCk9Pntjb25zdCBhPWF3YWl0IHMoKTtyKCEwKSx6KGEpfX0sdz17dmFyaWFudDpcIm91dGxpbmVkXCIsbGFiZWw6byhBY3Rpb25zLlJlbW92ZVJlY29yZCxkKSxjb2xvcjpcImRhbmdlclwiLG9uQ2xpY2s6YXN5bmMoKT0+e2xldCBhPWF3YWl0IHMoKTtjb25zdHtub3RpY2U6Yn09YTtyKCEwKSxiJiZcInN1Y2Nlc3NcIj09PWIudHlwZSYmKGE9YXdhaXQgdCgpLHooYSkpfX0seD1nLnJlY29yZEFjdGlvbnMuZmluZChhPT5cImRlbGV0ZVJlbGF0aW9uXCI9PT1hLm5hbWUpO2wmJngmJnUucHVzaCh2KTtjb25zdCB5PWIuZmluZChhPT5cImRlbGV0ZVwiPT09YS5uYW1lKTttJiZ5JiZ1LnB1c2godyk7Y29uc3Qgej1hPT57Y29uc3R7bm90aWNlOmJ9PWE7YiYmbihiKX0sQT17dGl0bGU6cChMYWJlbHMuRGVsZXRlUmVsYXRpb25IZWFkZXIpLG9uT3ZlcmxheUNsaWNrOnIsb25DbG9zZTpyLGJ1dHRvbnM6dX0sQj17c2hvdzpcIkV5ZVwiLGVkaXQ6XCJFZGl0MlwiLGRlbGV0ZTpcIlRyYXNoMlwifSxDPWIuZmlsdGVyKGE9PlwiZGVsZXRlXCIhPT1hLm5hbWUpO3JldHVybi8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KEJveCx7ZmxleDohMH0sQy5tYXAoYT0+LyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoQWN0aW9uQnV0dG9uLHtrZXk6YS5uYW1lLGFjdGlvbjphLHJlc291cmNlSWQ6ZCxyZWNvcmRJZDpjLHF1ZXJ5UGFyYW1zOntyZWRpcmVjdFVybDpxfX0sLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLHtzaXplOlwiaWNvblwiLHJvdW5kZWQ6ITAsY29sb3I6YS52YXJpYW50fSwvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChJY29uLHtpY29uOkJbYS5uYW1lXX0pKSkpLHUubGVuZ3RoJiYvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCxudWxsLGUmJi8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KE1vZGFsLEEpLC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvbix7c2l6ZTpcImljb25cIixyb3VuZGVkOiEwLGNvbG9yOlwiZGFuZ2VyXCIsb25DbGljazooKT0+ZighMCl9LC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KEljb24se2ljb246QltcImRlbGV0ZVwiXX0pKSkpfTsiLCJpbXBvcnR7UGxhY2Vob2xkZXIsVGFibGVDZWxsLFRhYmxlUm93fWZyb21cIkBhZG1pbmpzL2Rlc2lnbi1zeXN0ZW1cIjtpbXBvcnR7QmFzZVByb3BlcnR5Q29tcG9uZW50fWZyb21cImFkbWluanNcIjtpbXBvcnQgUmVhY3QgZnJvbVwicmVhY3RcIjtpbXBvcnR7UmVsYXRpb25SZWNvcmRJbkxpc3RBY3Rpb25zfWZyb21cIi4vUmVsYXRpb25SZWNvcmRJbkxpc3RBY3Rpb25zLmpzXCI7ZXhwb3J0IGNvbnN0IFJlbGF0aW9uUmVjb3JkSW5MaXN0PWE9Pntjb25zdHtyZXNvdXJjZTpiLHJlY29yZDpjLGlzTG9hZGluZzpkfT1hO3JldHVybi8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlUm93LHtcImRhdGEtaWRcIjpjLmlkLFwiZGF0YS1jc3NcIjpbYi5pZCxcInJvd1wiXS5qb2luKFwiLVwiKX0sLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLHt3aWR0aDowfSksYi5saXN0UHJvcGVydGllcy5tYXAoYT0+LyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLHtzdHlsZTp7Y3Vyc29yOlwicG9pbnRlclwiLHdoaXRlU3BhY2U6XCJub3dyYXBcIn0sa2V5OmEucHJvcGVydHlQYXRoLFwiZGF0YS1wcm9wZXJ0eS1uYW1lXCI6YS5wcm9wZXJ0eVBhdGgsZGlzcGxheTpcInRhYmxlLWNlbGxcIixcImRhdGEtY3NzXCI6W2IuaWQsYS5uYW1lLFwiY2VsbFwiXS5qb2luKFwiLVwiKX0sZD8vKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChQbGFjZWhvbGRlcix7c3R5bGU6e2hlaWdodDoxNH19KTovKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChCYXNlUHJvcGVydHlDb21wb25lbnQse2tleTphLnByb3BlcnR5UGF0aCx3aGVyZTpcImxpc3RcIixwcm9wZXJ0eTphLHJlc291cmNlOmIscmVjb3JkOmN9KSkpLC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCx7a2V5Olwib3B0aW9uc1wiLGNsYXNzTmFtZTpcIm9wdGlvbnNcIn0sZD8vKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChQbGFjZWhvbGRlcix7c3R5bGU6e2hlaWdodDoxNH19KTovKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChSZWxhdGlvblJlY29yZEluTGlzdEFjdGlvbnMse3JlY29yZDpjLHJlc291cmNlOmJ9KSkpfTsiLCJpbXBvcnR7Qm94LFRhYmxlLFRhYmxlQm9keX1mcm9tXCJAYWRtaW5qcy9kZXNpZ24tc3lzdGVtXCI7aW1wb3J0e1JlY29yZHNUYWJsZUhlYWRlcix1c2VRdWVyeVBhcmFtc31mcm9tXCJhZG1pbmpzXCI7aW1wb3J0IFJlYWN0IGZyb21cInJlYWN0XCI7aW1wb3J0e3VzZVJlbGF0aW9uQ29uZmlnfWZyb21cIi4uLy4uL3Byb3ZpZGVycy9SZWxhdGlvbkNvbmZpZ1Byb3ZpZGVyLmpzXCI7aW1wb3J0e1JlbGF0aW9uTm9SZWNvcmRzfWZyb21cIi4vUmVsYXRpb25Ob1JlY29yZHMuanNcIjtpbXBvcnR7UmVsYXRpb25SZWNvcmRJbkxpc3R9ZnJvbVwiLi9SZWxhdGlvblJlY29yZEluTGlzdC5qc1wiO2V4cG9ydCBjb25zdCBSZWxhdGlvblJlY29yZHNUYWJsZT1hPT57Y29uc3R7dGFyZ2V0UmVzb3VyY2U6YixyZWNvcmRzOmMsaXNMb2FkaW5nOmR9PWEse293bmVyUmVzb3VyY2U6ZX09dXNlUmVsYXRpb25Db25maWcoKSx7ZGlyZWN0aW9uOmYsc29ydEJ5Omd9PXVzZVF1ZXJ5UGFyYW1zKCk7aWYoIWMubGVuZ3RoJiYhZClyZXR1cm4vKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChSZWxhdGlvbk5vUmVjb3Jkcyx7cmVzb3VyY2U6Yn0pO2NvbnN0IGg9ey4uLmIsbGlzdFByb3BlcnRpZXM6Yi5saXN0UHJvcGVydGllcy5maWx0ZXIoKHtyZWZlcmVuY2U6YX0pPT5hIT09ZS5pZCl9O3JldHVybi8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KEJveCx7b3ZlcmZsb3c6XCJhdXRvXCJ9LC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlLHtcImRhdGEtY3NzXCI6XCJyZWxhdGlvbnMtdGFibGVcIn0sLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoUmVjb3Jkc1RhYmxlSGVhZGVyLHtwcm9wZXJ0aWVzOmgubGlzdFByb3BlcnRpZXMsdGl0bGVQcm9wZXJ0eTpoLnRpdGxlUHJvcGVydHksZGlyZWN0aW9uOmYsc29ydEJ5Omd9KSwvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUJvZHkse1wiZGF0YS1jc3NcIjpcInJlbGF0aW9ucy10YWJsZS1ib2R5XCJ9LGMubWFwKGE9Pi8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFJlbGF0aW9uUmVjb3JkSW5MaXN0LHtrZXk6YS5pZCxyZWNvcmQ6YSxyZXNvdXJjZTpoLGlzTG9hZGluZzpkfSkpKSkpfTsiLCJpbXBvcnR7Qm94LEJ1dHRvbixNZXNzYWdlQm94LFNlbGVjdEFzeW5jfWZyb21cIkBhZG1pbmpzL2Rlc2lnbi1zeXN0ZW1cIjtpbXBvcnR7QXBpQ2xpZW50LHVzZVRyYW5zbGF0aW9ufWZyb21cImFkbWluanNcIjtpbXBvcnQgUmVhY3Qse3VzZUVmZmVjdCx1c2VTdGF0ZX1mcm9tXCJyZWFjdFwiO2NvbnN0IGFwaT1uZXcgQXBpQ2xpZW50O2V4cG9ydCBjb25zdCBBZGRJdGVtTW9kYWw9KHt0YXJnZXRSZXNvdXJjZTphLG93bmVyUmVzb3VyY2U6Yixvd25lclJlY29yZDpjLHJlbGF0aW9uOmQsb25DbG9zZU1vZGFsOmV9KT0+e2NvbnN0W2YsZ109dXNlU3RhdGUobnVsbCksW2gsaV09dXNlU3RhdGUoKSxbaixrXT11c2VTdGF0ZSgpLFtsLG1dPXVzZVN0YXRlKDApLHt0YjpuLHRtOm99PXVzZVRyYW5zbGF0aW9uKCk7dXNlRWZmZWN0KCgpPT57aWYoZil7bShhPT5hKzEpO2NvbnN0IGI9bmV3IEFwaUNsaWVudDtiLnJlY29yZEFjdGlvbih7YWN0aW9uTmFtZTpcInNob3dcIixyZXNvdXJjZUlkOmEuaWQscmVjb3JkSWQ6ZitcIlwifSkudGhlbigoe2RhdGE6YX0pPT57aShhLnJlY29yZCl9KS5maW5hbGx5KCgpPT57bShhPT5hLTEpfSl9fSxbZixhXSk7Y29uc3QgcD1oLHE9ZiYmcD97dmFsdWU6cC5pZCxsYWJlbDpwLnRpdGxlfTp7dmFsdWU6XCJcIixsYWJlbDpcIlwifTtyZXR1cm4vKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChCb3gse2ZsZXg6ITAsZmxleERpcmVjdGlvbjpcImNvbHVtblwiLHdpZHRoOlwiMTAwJVwiLG10OlwibWRcIn0saiYmLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoTWVzc2FnZUJveCx7bWVzc2FnZTpvKGoubWVzc2FnZSxqLnJlc291cmNlSWQsai5vcHRpb25zKSx2YXJpYW50OlwiZXJyb3JcIj09PWoudHlwZT9cImRhbmdlclwiOmoudHlwZT8/XCJpbmZvXCIsbXk6XCJtZFwifSksLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0QXN5bmMse2NhY2hlT3B0aW9uczohMCx2YWx1ZTpxLGRlZmF1bHRPcHRpb25zOiEwLGxvYWRPcHRpb25zOmFzeW5jIGI9Pntjb25zdCBjPWF3YWl0IGFwaS5zZWFyY2hSZWNvcmRzKHtyZXNvdXJjZUlkOmEuaWQscXVlcnk6Yn0pLGQ9Yy5tYXAoYT0+KHt2YWx1ZTphLmlkLGxhYmVsOmEudGl0bGUscmVjb3JkOmF9KSk7cmV0dXJuIGR9LG9uQ2hhbmdlOmE9PnthP2coYS52YWx1ZSk6ZyhudWxsKX0saXNDbGVhcmFibGU6ITAsaXNMb2FkaW5nOiEhbH0pLC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KEJveCx7ZmxleDohMCxqdXN0aWZ5Q29udGVudDpcImNlbnRlclwiLG10OlwieHhsXCJ9LC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvbix7dmFyaWFudDpcImxpZ2h0XCIsY29sb3I6XCJwcmltYXJ5XCIsb25DbGljazooKT0+ZSghMSksbXI6XCJtZFwifSxuKFwiY2FuY2VsXCIpKSwvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b24se3ZhcmlhbnQ6XCJjb250YWluZWRcIixjb2xvcjpcInByaW1hcnlcIixvbkNsaWNrOmFzeW5jKCk9PntrKHZvaWQgMCk7Y29uc3QgYT1hd2FpdCBhcGkucmVjb3JkQWN0aW9uKHtyZWNvcmRJZDpjLmlkLHJlc291cmNlSWQ6Yi5pZCxhY3Rpb25OYW1lOlwiYWRkTWFueVRvTWFueVJlbGF0aW9uXCIsZGF0YTp7dGFyZ2V0SWQ6Zn0scGFyYW1zOntyZWxhdGlvbjpkfX0pLHtkYXRhOmd9PWEse25vdGljZTpofT1nPz97fTtoJiYoXCJzdWNjZXNzXCI9PT1oLnR5cGU/ZSghMCk6ayhoKSl9LGRpc2FibGVkOiFmfSxuKFwic3VibWl0XCIpKSkpfTtleHBvcnQgZGVmYXVsdCBBZGRJdGVtTW9kYWw7IiwiaW1wb3J0e0JveCxCdXR0b24sSWNvbixNb2RhbH1mcm9tXCJAYWRtaW5qcy9kZXNpZ24tc3lzdGVtXCI7aW1wb3J0e0FjdGlvbkJ1dHRvbix1c2VUcmFuc2xhdGlvbn1mcm9tXCJhZG1pbmpzXCI7aW1wb3J0IFJlYWN0LHt1c2VTdGF0ZX1mcm9tXCJyZWFjdFwiO2ltcG9ydHtBY3Rpb25zLExhYmVscyxNZXNzYWdlc31mcm9tXCIuLi8uLi9jb25zdGFudHMvbWVzc2FnZXMuanNcIjtpbXBvcnR7dXNlUmVsYXRpb25Db25maWd9ZnJvbVwiLi4vLi4vcHJvdmlkZXJzL1JlbGF0aW9uQ29uZmlnUHJvdmlkZXIuanNcIjtpbXBvcnQgQWRkSXRlbU1vZGFsQ29udGVudCBmcm9tXCIuL0FkZEl0ZW1Nb2RhbENvbnRlbnQuanNcIjtpbXBvcnR7dXNlUmVkaXJlY3RVcmx9ZnJvbVwiLi4vc2hhcmVkL3VzZVJlZGlyZWN0VXJsLmpzXCI7ZXhwb3J0IGNvbnN0IFJlbGF0aW9uUmVzb3VyY2VBY3Rpb25zPWE9Pntjb25zdHt0YXJnZXRSZXNvdXJjZTpiLG93bmVyUmVzb3VyY2U6YyxqdW5jdGlvblJlc291cmNlOmR9PWEse293bmVyUmVjb3JkOmUscmVsYXRpb25zOmYscmVsYXRpb246ZyxyZWZyZXNoOmh9PXVzZVJlbGF0aW9uQ29uZmlnKCksW2ksal09dXNlU3RhdGUoITEpLHt0YTprLHRsOmwsdG06bX09dXNlVHJhbnNsYXRpb24oKSxuPXVzZVJlZGlyZWN0VXJsKCksbz1mW2ddLnRhcmdldC5yZXNvdXJjZUlkLHA9ZltnXS5qdW5jdGlvbj8uam9pbktleSxxPWZbZ10uanVuY3Rpb24/LmludmVyc2VKb2luS2V5LHI9KGE9ITEpPT57YSYmaCgpLGooITEpfTtpZighcHx8IXEpcmV0dXJuIG51bGw7Y29uc3Qgcz17dGl0bGU6bChMYWJlbHMuQ2hvb3NlSXRlbUhlYWRlcixiLmlkKSxzdWJUaXRsZTptKE1lc3NhZ2VzLkNob29zZUl0ZW1TdWJ0aXRsZSxiLmlkKSxvbk92ZXJsYXlDbGljazpyLG9uQ2xvc2U6cn0sdD1kLnJlc291cmNlQWN0aW9ucy5maW5kKCh7bmFtZTphfSk9PlwibmV3XCI9PT1hKSx1PWIucmVzb3VyY2VBY3Rpb25zLmZpbHRlcigoe25hbWU6YX0pPT5cIm5ld1wiPT09YSk7cmV0dXJuIHQ/LyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LHtmbGV4OiEwLGp1c3RpZnlDb250ZW50OlwiZW5kXCJ9LHQmJi8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LG51bGwsaSYmLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoTW9kYWwscywvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChBZGRJdGVtTW9kYWxDb250ZW50LHt0YXJnZXRSZXNvdXJjZTpiLG93bmVyUmVzb3VyY2U6Yyxvd25lclJlY29yZDplLHJlbGF0aW9uOmcsb25DbG9zZU1vZGFsOnJ9KSksLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LHtmbGV4OiEwLG1iOlwieGxcIixtcjpcInhsXCIsanVzdGlmeUNvbnRlbnQ6XCJlbmRcIn0sLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLHt2YXJpYW50Olwib3V0bGluZVwiLG9uQ2xpY2s6KCk9PntqKCEwKX19LC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KEljb24se2ljb246XCJQbHVzQ2lyY2xlXCJ9KSxrKEFjdGlvbnMuQWRkSXRlbSxiLmlkKSkpKSx1Lm1hcChhPT4vKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChCb3gse2tleTphLm5hbWUsZmxleDohMCxtYjpcInhsXCIsanVzdGlmeUNvbnRlbnQ6XCJlbmRcIn0sLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoQWN0aW9uQnV0dG9uLHthY3Rpb246YSxyZXNvdXJjZUlkOm8scXVlcnlQYXJhbXM6e1twXTplLmlkLGp1bmN0aW9uUmVzb3VyY2VJZDpmW2ddLmp1bmN0aW9uPy50aHJvdWdoUmVzb3VyY2VJZCxqb2luS2V5OnAsaW52ZXJzZUpvaW5LZXk6cSxyZWRpcmVjdFVybDpufX0sLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLHt2YXJpYW50OlwiY29udGFpbmVkXCJ9LC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KEljb24se2ljb246YS5pY29ufSksayhhLm5hbWUsYi5pZCkpKSkpKTpudWxsfTsiLCJpbXBvcnR7SW5mb0JveCxUZXh0LEJ1dHRvbixJY29ufWZyb21cIkBhZG1pbmpzL2Rlc2lnbi1zeXN0ZW1cIjtpbXBvcnR7QWN0aW9uQnV0dG9uLHVzZVRyYW5zbGF0aW9ufWZyb21cImFkbWluanNcIjtpbXBvcnQgUmVhY3QgZnJvbVwicmVhY3RcIjtpbXBvcnR7TWVzc2FnZXN9ZnJvbVwiLi4vLi4vY29uc3RhbnRzL21lc3NhZ2VzLmpzXCI7aW1wb3J0e3VzZVJlbGF0aW9uQ29uZmlnfWZyb21cIi4uLy4uL3Byb3ZpZGVycy9SZWxhdGlvbkNvbmZpZ1Byb3ZpZGVyLmpzXCI7ZXhwb3J0IGNvbnN0IFJlbGF0aW9uTm9SZWNvcmRzPWE9Pntjb25zdHtyZXNvdXJjZTp7bmFtZTpiLGlkOmMscmVzb3VyY2VBY3Rpb25zOmR9fT1hLHtvd25lclJlY29yZDplLHJlbGF0aW9uczpmLHJlbGF0aW9uOmd9PXVzZVJlbGF0aW9uQ29uZmlnKCkse3RiOmgsdG06aX09dXNlVHJhbnNsYXRpb24oKSxqPWZbZ10udGFyZ2V0LmpvaW5LZXksaz1kLmZpbmQoKHtuYW1lOmF9KT0+XCJuZXdcIj09PWEpO3JldHVybiBqPy8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KEluZm9Cb3gse3RpdGxlOmkoTWVzc2FnZXMuTm9SZWxhdGlvblJlY29yZHNUaXRsZSxjKSxpbGx1c3RyYXRpb246XCJEb2NzXCJ9LC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFRleHQse21iOlwieHhsXCJ9LGkoTWVzc2FnZXMuTm9SZWxhdGlvblJlY29yZHMsYyx7cmVsYXRpb25OYW1lOmJ9KSksayYmLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoQWN0aW9uQnV0dG9uLHthY3Rpb246ayxyZXNvdXJjZUlkOmMscXVlcnlQYXJhbXM6e1tqXTplLmlkLHJlZGlyZWN0VXJsOmxvY2F0aW9uLmhyZWZ9fSwvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b24se3ZhcmlhbnQ6XCJjb250YWluZWRcIn0sLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoSWNvbix7aWNvbjpcIlBsdXNcIn0pLGgoXCJjcmVhdGVGaXJzdFJlY29yZFwiLGMpKSkpOm51bGx9OyIsImltcG9ydHtCb3gsQnV0dG9uLEljb259ZnJvbVwiQGFkbWluanMvZGVzaWduLXN5c3RlbVwiO2ltcG9ydHtBY3Rpb25CdXR0b259ZnJvbVwiYWRtaW5qc1wiO2ltcG9ydCBSZWFjdCBmcm9tXCJyZWFjdFwiO2ltcG9ydHt1c2VMb2NhdGlvbix1c2VOYXZpZ2F0ZX1mcm9tXCJyZWFjdC1yb3V0ZXJcIjtpbXBvcnR7dXNlUmVsYXRpb25Db25maWd9ZnJvbVwiLi4vLi4vcHJvdmlkZXJzL1JlbGF0aW9uQ29uZmlnUHJvdmlkZXIuanNcIjtpbXBvcnR7dXNlUmVkaXJlY3RVcmx9ZnJvbVwiLi4vc2hhcmVkL3VzZVJlZGlyZWN0VXJsLmpzXCI7ZXhwb3J0IGNvbnN0IFJlbGF0aW9uUmVjb3JkSW5MaXN0QWN0aW9ucz1hPT57Y29uc3R7cmVjb3JkOntyZWNvcmRBY3Rpb25zOmIsaWQ6Y30scmVzb3VyY2U6e2lkOmR9fT1hLHtyZWZyZXNoOmV9PXVzZVJlbGF0aW9uQ29uZmlnKCksZj11c2VOYXZpZ2F0ZSgpLGc9dXNlUmVkaXJlY3RVcmwoKSx7cGF0aG5hbWU6aCxzZWFyY2g6aX09dXNlTG9jYXRpb24oKSxqPXtzaG93OlwiRXllXCIsZWRpdDpcIkVkaXQyXCIsZGVsZXRlOlwiVHJhc2gyXCJ9LGs9KHtub3RpY2U6YX0pPT57YSYmXCJzdWNjZXNzXCI9PT1hLnR5cGUmJihmKHtwYXRobmFtZTpoLHNlYXJjaDppfSksZSgpKX07cmV0dXJuLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LHtmbGV4OiEwLGp1c3RpZnlDb250ZW50OlwiZW5kXCJ9LGIubWFwKGE9Pi8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KEFjdGlvbkJ1dHRvbix7a2V5OmEubmFtZSxhY3Rpb246YSxyZXNvdXJjZUlkOmQscmVjb3JkSWQ6YyxhY3Rpb25QZXJmb3JtZWQ6ayxxdWVyeVBhcmFtczp7cmVkaXJlY3RVcmw6Z319LC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvbix7c2l6ZTpcImljb25cIixyb3VuZGVkOiEwLGNvbG9yOmEudmFyaWFudH0sLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoSWNvbix7aWNvbjpqW2EubmFtZV19KSkpKSl9OyIsImltcG9ydHtQbGFjZWhvbGRlcixUYWJsZUNlbGwsVGFibGVSb3d9ZnJvbVwiQGFkbWluanMvZGVzaWduLXN5c3RlbVwiO2ltcG9ydHtCYXNlUHJvcGVydHlDb21wb25lbnQsVmlld0hlbHBlcnN9ZnJvbVwiYWRtaW5qc1wiO2ltcG9ydCBSZWFjdCBmcm9tXCJyZWFjdFwiO2ltcG9ydHt1c2VOYXZpZ2F0ZX1mcm9tXCJyZWFjdC1yb3V0ZXJcIjtpbXBvcnR7UmVsYXRpb25SZWNvcmRJbkxpc3RBY3Rpb25zfWZyb21cIi4vUmVsYXRpb25SZWNvcmRJbkxpc3RBY3Rpb25zLmpzXCI7aW1wb3J0e3VzZVJlZGlyZWN0VXJsfWZyb21cIi4uL3NoYXJlZC91c2VSZWRpcmVjdFVybC5qc1wiO2NvbnN0IHY9bmV3IFZpZXdIZWxwZXJzO2V4cG9ydCBjb25zdCBSZWxhdGlvblJlY29yZEluTGlzdD1hPT57Y29uc3R7cmVzb3VyY2U6YixyZWNvcmQ6Yyxpc0xvYWRpbmc6ZH09YSxlPXVzZU5hdmlnYXRlKCksZj11c2VSZWRpcmVjdFVybCgpLGc9Yy5yZWNvcmRBY3Rpb25zLmZpbmQoKHtuYW1lOmF9KT0+XCJzaG93XCI9PT1hKTtyZXR1cm4vKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZVJvdyx7XCJkYXRhLWlkXCI6Yy5pZCxcImRhdGEtY3NzXCI6W2IuaWQsXCJyb3dcIl0uam9pbihcIi1cIiksb25DbGljazooKT0+e2lmKGcpe2NvbnN0IGE9di5yZWNvcmRBY3Rpb25Vcmwoe2FjdGlvbk5hbWU6Zy5uYW1lLHJlY29yZElkOmMuaWQscmVzb3VyY2VJZDpiLmlkLHNlYXJjaDpgP3JlZGlyZWN0VXJsPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGYpfWB9KTtlKGEpfX19LC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCx7d2lkdGg6MH0pLGIubGlzdFByb3BlcnRpZXMubWFwKGE9Pi8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCx7c3R5bGU6e2N1cnNvcjpnP1wicG9pbnRlclwiOlwiaW5pdGlhbFwiLHdoaXRlU3BhY2U6XCJub3dyYXBcIn0sa2V5OmEucHJvcGVydHlQYXRoLFwiZGF0YS1wcm9wZXJ0eS1uYW1lXCI6YS5wcm9wZXJ0eVBhdGgsZGlzcGxheTpcInRhYmxlLWNlbGxcIixcImRhdGEtY3NzXCI6W2IuaWQsYS5uYW1lLFwiY2VsbFwiXS5qb2luKFwiLVwiKX0sZD8vKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChQbGFjZWhvbGRlcix7c3R5bGU6e2hlaWdodDoxNH19KTovKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChCYXNlUHJvcGVydHlDb21wb25lbnQse2tleTphLnByb3BlcnR5UGF0aCx3aGVyZTpcImxpc3RcIixwcm9wZXJ0eTphLHJlc291cmNlOmIscmVjb3JkOmN9KSkpLC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCx7a2V5Olwib3B0aW9uc1wiLGNsYXNzTmFtZTpcIm9wdGlvbnNcIn0sZD8vKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChQbGFjZWhvbGRlcix7c3R5bGU6e2hlaWdodDoxNH19KTovKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChSZWxhdGlvblJlY29yZEluTGlzdEFjdGlvbnMse3JlY29yZDpjLHJlc291cmNlOmJ9KSkpfTsiLCJpbXBvcnR7Qm94LFRhYmxlLFRhYmxlQm9keX1mcm9tXCJAYWRtaW5qcy9kZXNpZ24tc3lzdGVtXCI7aW1wb3J0e1JlY29yZHNUYWJsZUhlYWRlcix1c2VRdWVyeVBhcmFtc31mcm9tXCJhZG1pbmpzXCI7aW1wb3J0IFJlYWN0IGZyb21cInJlYWN0XCI7aW1wb3J0e3VzZVJlbGF0aW9uQ29uZmlnfWZyb21cIi4uLy4uL3Byb3ZpZGVycy9SZWxhdGlvbkNvbmZpZ1Byb3ZpZGVyLmpzXCI7aW1wb3J0e1JlbGF0aW9uTm9SZWNvcmRzfWZyb21cIi4vUmVsYXRpb25Ob1JlY29yZHMuanNcIjtpbXBvcnR7UmVsYXRpb25SZWNvcmRJbkxpc3R9ZnJvbVwiLi9SZWxhdGlvblJlY29yZEluTGlzdC5qc1wiO2V4cG9ydCBjb25zdCBSZWxhdGlvblJlY29yZHNUYWJsZT1hPT57Y29uc3R7dGFyZ2V0UmVzb3VyY2U6YixyZWNvcmRzOmMsaXNMb2FkaW5nOmR9PWEse293bmVyUmVzb3VyY2U6ZX09dXNlUmVsYXRpb25Db25maWcoKSx7ZGlyZWN0aW9uOmYsc29ydEJ5Omd9PXVzZVF1ZXJ5UGFyYW1zKCk7aWYoIWMubGVuZ3RoJiYhZClyZXR1cm4vKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChSZWxhdGlvbk5vUmVjb3Jkcyx7cmVzb3VyY2U6Yn0pO2NvbnN0IGg9ey4uLmIsbGlzdFByb3BlcnRpZXM6Yi5saXN0UHJvcGVydGllcy5maWx0ZXIoKHtyZWZlcmVuY2U6YX0pPT5hIT09ZS5pZCl9O3JldHVybi8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KEJveCx7b3ZlcmZsb3c6XCJhdXRvXCJ9LC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlLHtcImRhdGEtY3NzXCI6XCJyZWxhdGlvbnMtdGFibGVcIn0sLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoUmVjb3Jkc1RhYmxlSGVhZGVyLHtwcm9wZXJ0aWVzOmgubGlzdFByb3BlcnRpZXMsdGl0bGVQcm9wZXJ0eTpoLnRpdGxlUHJvcGVydHksZGlyZWN0aW9uOmYsc29ydEJ5Omd9KSwvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUJvZHkse1wiZGF0YS1jc3NcIjpcInJlbGF0aW9ucy10YWJsZS1ib2R5XCJ9LGMubWFwKGE9Pi8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFJlbGF0aW9uUmVjb3JkSW5MaXN0LHtrZXk6YS5pZCxyZWNvcmQ6YSxyZXNvdXJjZTpoLGlzTG9hZGluZzpkfSkpKSkpfTsiLCJpbXBvcnR7Qm94LEJ1dHRvbixJY29ufWZyb21cIkBhZG1pbmpzL2Rlc2lnbi1zeXN0ZW1cIjtpbXBvcnR7QWN0aW9uQnV0dG9uLHVzZVRyYW5zbGF0aW9ufWZyb21cImFkbWluanNcIjtpbXBvcnQgUmVhY3QgZnJvbVwicmVhY3RcIjtpbXBvcnR7dXNlUmVsYXRpb25Db25maWd9ZnJvbVwiLi4vLi4vcHJvdmlkZXJzL1JlbGF0aW9uQ29uZmlnUHJvdmlkZXIuanNcIjtpbXBvcnR7dXNlUmVkaXJlY3RVcmx9ZnJvbVwiLi4vc2hhcmVkL3VzZVJlZGlyZWN0VXJsLmpzXCI7ZXhwb3J0IGNvbnN0IFJlbGF0aW9uUmVzb3VyY2VBY3Rpb25zPWE9Pntjb25zdHt0YXJnZXRSZXNvdXJjZTpifT1hLHtvd25lclJlY29yZDpjLHJlbGF0aW9uczpkLHJlbGF0aW9uOmV9PXVzZVJlbGF0aW9uQ29uZmlnKCkse3RhOmZ9PXVzZVRyYW5zbGF0aW9uKCksZz11c2VSZWRpcmVjdFVybCgpLGg9ZFtlXS50YXJnZXQucmVzb3VyY2VJZCxpPWRbZV0udGFyZ2V0LmpvaW5LZXk7aWYoIWkpcmV0dXJuIG51bGw7Y29uc3Qgaj1iLnJlc291cmNlQWN0aW9ucy5maWx0ZXIoKHtuYW1lOmF9KT0+XCJuZXdcIj09PWEpO3JldHVybiBqLmxlbmd0aD8vKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChCb3gse2ZsZXg6ITAsbWI6XCJ4bFwiLGp1c3RpZnlDb250ZW50OlwiZW5kXCJ9LGoubWFwKGE9Pi8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KEFjdGlvbkJ1dHRvbix7a2V5OmEubmFtZSxhY3Rpb246YSxyZXNvdXJjZUlkOmgscXVlcnlQYXJhbXM6e1tpXTpjLmlkLHJlZGlyZWN0VXJsOmd9fSwvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b24se3ZhcmlhbnQ6XCJjb250YWluZWRcIn0sLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoSWNvbix7aWNvbjphLmljb259KSxmKGEubmFtZSxiLmlkKSkpKSk6bnVsbH07IiwiLyogZXNsaW50LWRpc2FibGUgcHJldHRpZXIvcHJldHRpZXIgKi9pbXBvcnR7Qm94LExvYWRlcixQYWdpbmF0aW9uLHVzZVRhYnN9ZnJvbVwiQGFkbWluanMvZGVzaWduLXN5c3RlbVwiO2ltcG9ydHt1c2VRdWVyeVBhcmFtc31mcm9tXCJhZG1pbmpzXCI7aW1wb3J0IFJlYWN0IGZyb21cInJlYWN0XCI7aW1wb3J0e3VzZVNlbGVjdG9yfWZyb21cInJlYWN0LXJlZHV4XCI7aW1wb3J0e3VzZVJlbGF0aW9uUmVjb3Jkc31mcm9tXCIuLi8uLi9ob29rcy91c2VSZWxhdGlvblJlY29yZHMuanNcIjtpbXBvcnR7dXNlUmVsYXRpb25Db25maWd9ZnJvbVwiLi4vLi4vcHJvdmlkZXJzL1JlbGF0aW9uQ29uZmlnUHJvdmlkZXIuanNcIjtpbXBvcnR7UmVsYXRpb25UeXBlfWZyb21cIi4uLy4uL3R5cGVzL2luZGV4LmpzXCI7aW1wb3J0e1JlbGF0aW9uUmVjb3Jkc1RhYmxlIGFzIE1hbnlUb01hbnlSZWxhdGlvblJlY29yZHNUYWJsZX1mcm9tXCIuLi9tYW55LXRvLW1hbnkvUmVsYXRpb25SZWNvcmRzVGFibGUuanNcIjtpbXBvcnR7UmVsYXRpb25SZXNvdXJjZUFjdGlvbnMgYXMgTWFueVRvTWFueVJlbGF0aW9uUmVzb3VyY2VBY3Rpb25zfWZyb21cIi4uL21hbnktdG8tbWFueS9SZWxhdGlvblJlc291cmNlQWN0aW9ucy5qc1wiO2ltcG9ydHtSZWxhdGlvblJlY29yZHNUYWJsZSBhcyBPbmVUb01hbnlSZWxhdGlvblJlY29yZHNUYWJsZX1mcm9tXCIuLi9vbmUtdG8tbWFueS9SZWxhdGlvblJlY29yZHNUYWJsZS5qc1wiO2ltcG9ydHtSZWxhdGlvblJlc291cmNlQWN0aW9ucyBhcyBPbmVUb01hbnlSZWxhdGlvblJlc291cmNlQWN0aW9uc31mcm9tXCIuLi9vbmUtdG8tbWFueS9SZWxhdGlvblJlc291cmNlQWN0aW9ucy5qc1wiO2V4cG9ydCBjb25zdCBSZWxhdGlvblRhYj0oKT0+e2NvbnN0e3JlbGF0aW9uOmEsb3duZXJSZWNvcmQ6Yixvd25lclJlc291cmNlOmMscmVsYXRpb25zOmR9PXVzZVJlbGF0aW9uQ29uZmlnKCksZT11c2VTZWxlY3RvcihhPT5hLnJlc291cmNlcykse3N0b3JlUGFyYW1zOmZ9PXVzZVF1ZXJ5UGFyYW1zKCkse2N1cnJlbnRUYWI6Z309dXNlVGFicygpLGg9ZFthXS50YXJnZXQucmVzb3VyY2VJZCxpPWRbYV0uanVuY3Rpb24/LnRocm91Z2hSZXNvdXJjZUlkLGo9ZFthXS50eXBlLHtkYXRhOmssaXNMb2FkaW5nOmx9PXVzZVJlbGF0aW9uUmVjb3Jkcyh7cmVjb3JkOmIscmVsYXRpb246YSxyZXNvdXJjZTpjLHRhcmdldFJlc291cmNlSWQ6aCx0YWI6Z30pLG09YT0+Zih7cGFnZTphLnRvU3RyaW5nKCl9KTtpZihnIT09YSlyZXR1cm4gbnVsbDtpZighaylyZXR1cm4vKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChMb2FkZXIsbnVsbCk7aWYoaj09PVJlbGF0aW9uVHlwZS5PbmVUb01hbnkpe2NvbnN0IGE9ZS5maW5kKGE9PmEuaWQ9PT1oKTtpZighYSlyZXR1cm4gbnVsbDtjb25zdHtyZWNvcmRzOmIsbWV0YTp7dG90YWw6YyxwYWdlOmQscGVyUGFnZTpmfX09aztyZXR1cm4vKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChCb3gse3B5OlwieGxcIn0sLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoT25lVG9NYW55UmVsYXRpb25SZXNvdXJjZUFjdGlvbnMse3RhcmdldFJlc291cmNlOmF9KSwvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChPbmVUb01hbnlSZWxhdGlvblJlY29yZHNUYWJsZSx7dGFyZ2V0UmVzb3VyY2U6YSxyZWNvcmRzOmIsaXNMb2FkaW5nOmx9KSwvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChCb3gse2ZsZXg6ITAsanVzdGlmeUNvbnRlbnQ6XCJjZW50ZXJcIixtdDpcInhsXCJ9LC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFBhZ2luYXRpb24se3RvdGFsOmMscGVyUGFnZTpmLHBhZ2U6K2Qsb25DaGFuZ2U6bX0pKSl9aWYoaj09PVJlbGF0aW9uVHlwZS5NYW55VG9NYW55KXtpZighaSlyZXR1cm4gbnVsbDtjb25zdCBhPWUuZmluZChhPT5hLmlkPT09aCksYj1lLmZpbmQoYT0+YS5pZD09PWkpO2lmKCFhfHwhYilyZXR1cm4gbnVsbDtjb25zdHtyZWNvcmRzOmQsbWV0YTp7dG90YWw6ZixwYWdlOmcscGVyUGFnZTpqfX09aztyZXR1cm4vKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChCb3gse3B5OlwieGxcIn0sLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoTWFueVRvTWFueVJlbGF0aW9uUmVzb3VyY2VBY3Rpb25zLHt0YXJnZXRSZXNvdXJjZTphLG93bmVyUmVzb3VyY2U6YyxqdW5jdGlvblJlc291cmNlOmJ9KSwvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChNYW55VG9NYW55UmVsYXRpb25SZWNvcmRzVGFibGUse3RhcmdldFJlc291cmNlOmEscmVjb3JkczpkLGlzTG9hZGluZzpsfSksLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LHtmbGV4OiEwLGp1c3RpZnlDb250ZW50OlwiY2VudGVyXCIsbXQ6XCJ4bFwifSwvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChQYWdpbmF0aW9uLHt0b3RhbDpmLHBlclBhZ2U6aixwYWdlOitnLG9uQ2hhbmdlOm19KSkpfXJldHVybiBudWxsfTsiLCJpbXBvcnR7VGFiLFRhYnN9ZnJvbVwiQGFkbWluanMvZGVzaWduLXN5c3RlbVwiO2ltcG9ydHt1c2VRdWVyeVBhcmFtcyx1c2VUcmFuc2xhdGlvbn1mcm9tXCJhZG1pbmpzXCI7aW1wb3J0IFJlYWN0LHttZW1vLHVzZUNhbGxiYWNrfWZyb21cInJlYWN0XCI7aW1wb3J0e1JlbGF0aW9uQ29uZmlnUHJvdmlkZXJ9ZnJvbVwiLi4vcHJvdmlkZXJzL1JlbGF0aW9uQ29uZmlnUHJvdmlkZXIuanNcIjtpbXBvcnR7UmVsYXRpb25UYWJ9ZnJvbVwiLi9zaGFyZWQvUmVsYXRpb25UYWIuanNcIjtjb25zdCBSZWxhdGlvbnNTaG93UHJvcGVydHlDb21wb25lbnQ9YT0+e2NvbnN0e3Jlc291cmNlOmIscmVjb3JkOmMscHJvcGVydHk6ZH09YSx7aWQ6ZSxwcm9wZXJ0aWVzOmZ9PWIse3JlbGF0aW9uczpnfT1mW2QucGF0aF0ucHJvcHMsaD1PYmplY3Qua2V5cyhnKSx7dGFiOmo9aFswXSxzdG9yZVBhcmFtczppfT11c2VRdWVyeVBhcmFtcygpLHt0bDprfT11c2VUcmFuc2xhdGlvbigpLGw9dXNlQ2FsbGJhY2soYT0+e2koe3RhYjphLHNvcnRCeTp2b2lkIDAsZGlyZWN0aW9uOnZvaWQgMCxyZWRpcmVjdFVybDp2b2lkIDB9KX0sW10pO3JldHVybiBjJiZoLmxlbmd0aD8vKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChUYWJzLHtjdXJyZW50VGFiOmosb25DaGFuZ2U6bH0saC5tYXAoYT0+LyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoVGFiLHtrZXk6YSxpZDphLGxhYmVsOmsoYSxlKX0sLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoUmVsYXRpb25Db25maWdQcm92aWRlcix7cmVsYXRpb246YSxyZWxhdGlvbnM6Zyxvd25lclJlc291cmNlOmIsb3duZXJSZWNvcmQ6Y30sLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoUmVsYXRpb25UYWIsbnVsbCkpKSkpOm51bGx9O2V4cG9ydCBkZWZhdWx0LyojX19QVVJFX18qL21lbW8oUmVsYXRpb25zU2hvd1Byb3BlcnR5Q29tcG9uZW50KTsiLCIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnMgKi9pbXBvcnQgUmVhY3QgZnJvbVwicmVhY3RcIjtpbXBvcnR7bWVtb31mcm9tXCJyZWFjdFwiOy8vIFRPRE86IFtBSlMtNDAwXSBJbnRyb2R1Y2UgcmVsYXRpb25zIGVkaXRcbmNvbnN0IFJlbGF0aW9uc0VkaXRQcm9wZXJ0eUNvbXBvbmVudD0oKT0+LyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoUmVhY3QuRnJhZ21lbnQsbnVsbCk7ZXhwb3J0IGRlZmF1bHQvKiNfX1BVUkVfXyovbWVtbyhSZWxhdGlvbnNFZGl0UHJvcGVydHlDb21wb25lbnQpOyIsImltcG9ydHtCYWRnZX1mcm9tXCJAYWRtaW5qcy9kZXNpZ24tc3lzdGVtXCI7aW1wb3J0e3VzZVRyYW5zbGF0aW9ufWZyb21cImFkbWluanNcIjtpbXBvcnQgUmVhY3Qse21lbW99ZnJvbVwicmVhY3RcIjsvLyBUT0RPOiBbQUpTLTQwMF0gSW50cm9kdWNlIHJlbGF0aW9ucyBlZGl0XG5jb25zdCBSZWxhdGlvbnNMaXN0UHJvcGVydHlDb21wb25lbnQ9YT0+e2NvbnN0e3Jlc291cmNlOntwcm9wZXJ0aWVzOmN9LHByb3BlcnR5OmJ9PWEse3JlbGF0aW9uc1RhcmdldHM6ZH09Y1tiLnBhdGhdLnByb3BzLGU9T2JqZWN0LnZhbHVlcyhkKSx7dGw6Zn09dXNlVHJhbnNsYXRpb24oKTtyZXR1cm4vKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCxudWxsLGUubWFwKCh7cmVzb3VyY2VJZDphfSk9Pi8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KEJhZGdlLHtrZXk6YSxtcjpcInNtXCJ9LGYoYSxhKSkpKX07ZXhwb3J0IGRlZmF1bHQvKiNfX1BVUkVfXyovbWVtbyhSZWxhdGlvbnNMaXN0UHJvcGVydHlDb21wb25lbnQpOyIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEFwaUNsaWVudCwgdXNlTm90aWNlIH0gZnJvbSAnYWRtaW5qcyc7XG5pbXBvcnQgeyBEcm9wWm9uZUl0ZW0sIExvYWRlciwgQm94LCBCdXR0b24sIERyb3Bab25lLCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuY29uc3QgSW1wb3J0Q29tcG9uZW50ID0gKHsgcmVzb3VyY2UgfSkgPT4ge1xuICAgIGNvbnN0IFtmaWxlLCBzZXRGaWxlXSA9IHVzZVN0YXRlKG51bGwpO1xuICAgIGNvbnN0IHNlbmROb3RpY2UgPSB1c2VOb3RpY2UoKTtcbiAgICBjb25zdCBbaXNGZXRjaGluZywgc2V0RmV0Y2hpbmddID0gdXNlU3RhdGUoKTtcbiAgICBjb25zdCBvblVwbG9hZCA9ICh1cGxvYWRlZEZpbGUpID0+IHtcbiAgICAgICAgc2V0RmlsZSh1cGxvYWRlZEZpbGU/LlswXSA/PyBudWxsKTtcbiAgICB9O1xuICAgIGNvbnN0IG9uU3VibWl0ID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICBpZiAoIWZpbGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzZXRGZXRjaGluZyh0cnVlKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGltcG9ydERhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgICAgIGltcG9ydERhdGEuYXBwZW5kKCdmaWxlJywgZmlsZSwgZmlsZT8ubmFtZSk7XG4gICAgICAgICAgICBhd2FpdCBuZXcgQXBpQ2xpZW50KCkucmVzb3VyY2VBY3Rpb24oe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgICAgICAgICAgIHJlc291cmNlSWQ6IHJlc291cmNlLmlkLFxuICAgICAgICAgICAgICAgIGFjdGlvbk5hbWU6ICdpbXBvcnQnLFxuICAgICAgICAgICAgICAgIGRhdGE6IGltcG9ydERhdGEsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNlbmROb3RpY2UoeyBtZXNzYWdlOiAnSW1wb3J0ZWQgc3VjY2Vzc2Z1bGx5JywgdHlwZTogJ3N1Y2Nlc3MnIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBzZW5kTm90aWNlKHsgbWVzc2FnZTogZS5tZXNzYWdlLCB0eXBlOiAnZXJyb3InIH0pO1xuICAgICAgICB9XG4gICAgICAgIHNldEZldGNoaW5nKGZhbHNlKTtcbiAgICB9O1xuICAgIGlmIChpc0ZldGNoaW5nKSB7XG4gICAgICAgIHJldHVybiA8TG9hZGVyIC8+O1xuICAgIH1cbiAgICByZXR1cm4gKDxCb3ggbWFyZ2luPVwiYXV0b1wiIG1heFdpZHRoPXs2MDB9IGRpc3BsYXk9XCJmbGV4XCIganVzdGlmeUNvbnRlbnQ9XCJjZW50ZXJcIiBmbGV4RGlyZWN0aW9uPVwiY29sdW1uXCI+XG4gICAgICA8RHJvcFpvbmUgZmlsZXM9e1tdfSBvbkNoYW5nZT17b25VcGxvYWR9IG11bHRpcGxlPXtmYWxzZX0vPlxuICAgICAge2ZpbGUgJiYgKDxEcm9wWm9uZUl0ZW0gZmlsZT17ZmlsZX0gZmlsZW5hbWU9e2ZpbGUubmFtZX0gb25SZW1vdmU9eygpID0+IHNldEZpbGUobnVsbCl9Lz4pfVxuICAgICAgPEJveCBkaXNwbGF5PVwiZmxleFwiIGp1c3RpZnlDb250ZW50PVwiY2VudGVyXCIgbT17MTB9PlxuICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e29uU3VibWl0fSBkaXNhYmxlZD17IWZpbGUgfHwgaXNGZXRjaGluZ30+XG4gICAgICAgICAgVXBsb2FkXG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgPC9Cb3g+XG4gICAgPC9Cb3g+KTtcbn07XG5leHBvcnQgZGVmYXVsdCBJbXBvcnRDb21wb25lbnQ7XG4iLCIoZnVuY3Rpb24oYSxiKXtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQpZGVmaW5lKFtdLGIpO2Vsc2UgaWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGV4cG9ydHMpYigpO2Vsc2V7YigpLGEuRmlsZVNhdmVyPXtleHBvcnRzOnt9fS5leHBvcnRzfX0pKHRoaXMsZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBiKGEsYil7cmV0dXJuXCJ1bmRlZmluZWRcIj09dHlwZW9mIGI/Yj17YXV0b0JvbTohMX06XCJvYmplY3RcIiE9dHlwZW9mIGImJihjb25zb2xlLndhcm4oXCJEZXByZWNhdGVkOiBFeHBlY3RlZCB0aGlyZCBhcmd1bWVudCB0byBiZSBhIG9iamVjdFwiKSxiPXthdXRvQm9tOiFifSksYi5hdXRvQm9tJiYvXlxccyooPzp0ZXh0XFwvXFxTKnxhcHBsaWNhdGlvblxcL3htbHxcXFMqXFwvXFxTKlxcK3htbClcXHMqOy4qY2hhcnNldFxccyo9XFxzKnV0Zi04L2kudGVzdChhLnR5cGUpP25ldyBCbG9iKFtcIlxcdUZFRkZcIixhXSx7dHlwZTphLnR5cGV9KTphfWZ1bmN0aW9uIGMoYSxiLGMpe3ZhciBkPW5ldyBYTUxIdHRwUmVxdWVzdDtkLm9wZW4oXCJHRVRcIixhKSxkLnJlc3BvbnNlVHlwZT1cImJsb2JcIixkLm9ubG9hZD1mdW5jdGlvbigpe2coZC5yZXNwb25zZSxiLGMpfSxkLm9uZXJyb3I9ZnVuY3Rpb24oKXtjb25zb2xlLmVycm9yKFwiY291bGQgbm90IGRvd25sb2FkIGZpbGVcIil9LGQuc2VuZCgpfWZ1bmN0aW9uIGQoYSl7dmFyIGI9bmV3IFhNTEh0dHBSZXF1ZXN0O2Iub3BlbihcIkhFQURcIixhLCExKTt0cnl7Yi5zZW5kKCl9Y2F0Y2goYSl7fXJldHVybiAyMDA8PWIuc3RhdHVzJiYyOTk+PWIuc3RhdHVzfWZ1bmN0aW9uIGUoYSl7dHJ5e2EuZGlzcGF0Y2hFdmVudChuZXcgTW91c2VFdmVudChcImNsaWNrXCIpKX1jYXRjaChjKXt2YXIgYj1kb2N1bWVudC5jcmVhdGVFdmVudChcIk1vdXNlRXZlbnRzXCIpO2IuaW5pdE1vdXNlRXZlbnQoXCJjbGlja1wiLCEwLCEwLHdpbmRvdywwLDAsMCw4MCwyMCwhMSwhMSwhMSwhMSwwLG51bGwpLGEuZGlzcGF0Y2hFdmVudChiKX19dmFyIGY9XCJvYmplY3RcIj09dHlwZW9mIHdpbmRvdyYmd2luZG93LndpbmRvdz09PXdpbmRvdz93aW5kb3c6XCJvYmplY3RcIj09dHlwZW9mIHNlbGYmJnNlbGYuc2VsZj09PXNlbGY/c2VsZjpcIm9iamVjdFwiPT10eXBlb2YgZ2xvYmFsJiZnbG9iYWwuZ2xvYmFsPT09Z2xvYmFsP2dsb2JhbDp2b2lkIDAsYT1mLm5hdmlnYXRvciYmL01hY2ludG9zaC8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSYmL0FwcGxlV2ViS2l0Ly50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpJiYhL1NhZmFyaS8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSxnPWYuc2F2ZUFzfHwoXCJvYmplY3RcIiE9dHlwZW9mIHdpbmRvd3x8d2luZG93IT09Zj9mdW5jdGlvbigpe306XCJkb3dubG9hZFwiaW4gSFRNTEFuY2hvckVsZW1lbnQucHJvdG90eXBlJiYhYT9mdW5jdGlvbihiLGcsaCl7dmFyIGk9Zi5VUkx8fGYud2Via2l0VVJMLGo9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7Zz1nfHxiLm5hbWV8fFwiZG93bmxvYWRcIixqLmRvd25sb2FkPWcsai5yZWw9XCJub29wZW5lclwiLFwic3RyaW5nXCI9PXR5cGVvZiBiPyhqLmhyZWY9YixqLm9yaWdpbj09PWxvY2F0aW9uLm9yaWdpbj9lKGopOmQoai5ocmVmKT9jKGIsZyxoKTplKGosai50YXJnZXQ9XCJfYmxhbmtcIikpOihqLmhyZWY9aS5jcmVhdGVPYmplY3RVUkwoYiksc2V0VGltZW91dChmdW5jdGlvbigpe2kucmV2b2tlT2JqZWN0VVJMKGouaHJlZil9LDRFNCksc2V0VGltZW91dChmdW5jdGlvbigpe2Uoail9LDApKX06XCJtc1NhdmVPck9wZW5CbG9iXCJpbiBuYXZpZ2F0b3I/ZnVuY3Rpb24oZixnLGgpe2lmKGc9Z3x8Zi5uYW1lfHxcImRvd25sb2FkXCIsXCJzdHJpbmdcIiE9dHlwZW9mIGYpbmF2aWdhdG9yLm1zU2F2ZU9yT3BlbkJsb2IoYihmLGgpLGcpO2Vsc2UgaWYoZChmKSljKGYsZyxoKTtlbHNle3ZhciBpPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO2kuaHJlZj1mLGkudGFyZ2V0PVwiX2JsYW5rXCIsc2V0VGltZW91dChmdW5jdGlvbigpe2UoaSl9KX19OmZ1bmN0aW9uKGIsZCxlLGcpe2lmKGc9Z3x8b3BlbihcIlwiLFwiX2JsYW5rXCIpLGcmJihnLmRvY3VtZW50LnRpdGxlPWcuZG9jdW1lbnQuYm9keS5pbm5lclRleHQ9XCJkb3dubG9hZGluZy4uLlwiKSxcInN0cmluZ1wiPT10eXBlb2YgYilyZXR1cm4gYyhiLGQsZSk7dmFyIGg9XCJhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW1cIj09PWIudHlwZSxpPS9jb25zdHJ1Y3Rvci9pLnRlc3QoZi5IVE1MRWxlbWVudCl8fGYuc2FmYXJpLGo9L0NyaU9TXFwvW1xcZF0rLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO2lmKChqfHxoJiZpfHxhKSYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIEZpbGVSZWFkZXIpe3ZhciBrPW5ldyBGaWxlUmVhZGVyO2sub25sb2FkZW5kPWZ1bmN0aW9uKCl7dmFyIGE9ay5yZXN1bHQ7YT1qP2E6YS5yZXBsYWNlKC9eZGF0YTpbXjtdKjsvLFwiZGF0YTphdHRhY2htZW50L2ZpbGU7XCIpLGc/Zy5sb2NhdGlvbi5ocmVmPWE6bG9jYXRpb249YSxnPW51bGx9LGsucmVhZEFzRGF0YVVSTChiKX1lbHNle3ZhciBsPWYuVVJMfHxmLndlYmtpdFVSTCxtPWwuY3JlYXRlT2JqZWN0VVJMKGIpO2c/Zy5sb2NhdGlvbj1tOmxvY2F0aW9uLmhyZWY9bSxnPW51bGwsc2V0VGltZW91dChmdW5jdGlvbigpe2wucmV2b2tlT2JqZWN0VVJMKG0pfSw0RTQpfX0pO2Yuc2F2ZUFzPWcuc2F2ZUFzPWcsXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZSYmKG1vZHVsZS5leHBvcnRzPWcpfSk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUZpbGVTYXZlci5taW4uanMubWFwIiwiZnVuY3Rpb24gX3R5cGVvZihvKSB7XG4gIFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjtcblxuICByZXR1cm4gX3R5cGVvZiA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIFwic3ltYm9sXCIgPT0gdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA/IGZ1bmN0aW9uIChvKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvO1xuICB9IDogZnVuY3Rpb24gKG8pIHtcbiAgICByZXR1cm4gbyAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgbyAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2YgbztcbiAgfSwgX3R5cGVvZihvKTtcbn1cbmV4cG9ydCB7IF90eXBlb2YgYXMgZGVmYXVsdCB9OyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlcXVpcmVkQXJncyhyZXF1aXJlZCwgYXJncykge1xuICBpZiAoYXJncy5sZW5ndGggPCByZXF1aXJlZCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocmVxdWlyZWQgKyAnIGFyZ3VtZW50JyArIChyZXF1aXJlZCA+IDEgPyAncycgOiAnJykgKyAnIHJlcXVpcmVkLCBidXQgb25seSAnICsgYXJncy5sZW5ndGggKyAnIHByZXNlbnQnKTtcbiAgfVxufSIsImltcG9ydCBfdHlwZW9mIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS90eXBlb2ZcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL19saWIvcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG4vKipcbiAqIEBuYW1lIGlzRGF0ZVxuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBJcyB0aGUgZ2l2ZW4gdmFsdWUgYSBkYXRlP1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiB2YWx1ZSBpcyBhbiBpbnN0YW5jZSBvZiBEYXRlLiBUaGUgZnVuY3Rpb24gd29ya3MgZm9yIGRhdGVzIHRyYW5zZmVycmVkIGFjcm9zcyBpZnJhbWVzLlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgLSB0aGUgdmFsdWUgdG8gY2hlY2tcbiAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlIGlmIHRoZSBnaXZlbiB2YWx1ZSBpcyBhIGRhdGVcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMSBhcmd1bWVudHMgcmVxdWlyZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gRm9yIGEgdmFsaWQgZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IGlzRGF0ZShuZXcgRGF0ZSgpKVxuICogLy89PiB0cnVlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEZvciBhbiBpbnZhbGlkIGRhdGU6XG4gKiBjb25zdCByZXN1bHQgPSBpc0RhdGUobmV3IERhdGUoTmFOKSlcbiAqIC8vPT4gdHJ1ZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBGb3Igc29tZSB2YWx1ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IGlzRGF0ZSgnMjAxNC0wMi0zMScpXG4gKiAvLz0+IGZhbHNlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEZvciBhbiBvYmplY3Q6XG4gKiBjb25zdCByZXN1bHQgPSBpc0RhdGUoe30pXG4gKiAvLz0+IGZhbHNlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzRGF0ZSh2YWx1ZSkge1xuICByZXF1aXJlZEFyZ3MoMSwgYXJndW1lbnRzKTtcbiAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgRGF0ZSB8fCBfdHlwZW9mKHZhbHVlKSA9PT0gJ29iamVjdCcgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufSIsImltcG9ydCBfdHlwZW9mIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS90eXBlb2ZcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL19saWIvcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG4vKipcbiAqIEBuYW1lIHRvRGF0ZVxuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBDb252ZXJ0IHRoZSBnaXZlbiBhcmd1bWVudCB0byBhbiBpbnN0YW5jZSBvZiBEYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQ29udmVydCB0aGUgZ2l2ZW4gYXJndW1lbnQgdG8gYW4gaW5zdGFuY2Ugb2YgRGF0ZS5cbiAqXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgYW4gaW5zdGFuY2Ugb2YgRGF0ZSwgdGhlIGZ1bmN0aW9uIHJldHVybnMgaXRzIGNsb25lLlxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBhIG51bWJlciwgaXQgaXMgdHJlYXRlZCBhcyBhIHRpbWVzdGFtcC5cbiAqXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgbm9uZSBvZiB0aGUgYWJvdmUsIHRoZSBmdW5jdGlvbiByZXR1cm5zIEludmFsaWQgRGF0ZS5cbiAqXG4gKiAqKk5vdGUqKjogKmFsbCogRGF0ZSBhcmd1bWVudHMgcGFzc2VkIHRvIGFueSAqZGF0ZS1mbnMqIGZ1bmN0aW9uIGlzIHByb2Nlc3NlZCBieSBgdG9EYXRlYC5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8TnVtYmVyfSBhcmd1bWVudCAtIHRoZSB2YWx1ZSB0byBjb252ZXJ0XG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIHBhcnNlZCBkYXRlIGluIHRoZSBsb2NhbCB0aW1lIHpvbmVcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMSBhcmd1bWVudCByZXF1aXJlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBDbG9uZSB0aGUgZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IHRvRGF0ZShuZXcgRGF0ZSgyMDE0LCAxLCAxMSwgMTEsIDMwLCAzMCkpXG4gKiAvLz0+IFR1ZSBGZWIgMTEgMjAxNCAxMTozMDozMFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBDb252ZXJ0IHRoZSB0aW1lc3RhbXAgdG8gZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IHRvRGF0ZSgxMzkyMDk4NDMwMDAwKVxuICogLy89PiBUdWUgRmViIDExIDIwMTQgMTE6MzA6MzBcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdG9EYXRlKGFyZ3VtZW50KSB7XG4gIHJlcXVpcmVkQXJncygxLCBhcmd1bWVudHMpO1xuICB2YXIgYXJnU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFyZ3VtZW50KTtcblxuICAvLyBDbG9uZSB0aGUgZGF0ZVxuICBpZiAoYXJndW1lbnQgaW5zdGFuY2VvZiBEYXRlIHx8IF90eXBlb2YoYXJndW1lbnQpID09PSAnb2JqZWN0JyAmJiBhcmdTdHIgPT09ICdbb2JqZWN0IERhdGVdJykge1xuICAgIC8vIFByZXZlbnQgdGhlIGRhdGUgdG8gbG9zZSB0aGUgbWlsbGlzZWNvbmRzIHdoZW4gcGFzc2VkIHRvIG5ldyBEYXRlKCkgaW4gSUUxMFxuICAgIHJldHVybiBuZXcgRGF0ZShhcmd1bWVudC5nZXRUaW1lKCkpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBhcmd1bWVudCA9PT0gJ251bWJlcicgfHwgYXJnU3RyID09PSAnW29iamVjdCBOdW1iZXJdJykge1xuICAgIHJldHVybiBuZXcgRGF0ZShhcmd1bWVudCk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKCh0eXBlb2YgYXJndW1lbnQgPT09ICdzdHJpbmcnIHx8IGFyZ1N0ciA9PT0gJ1tvYmplY3QgU3RyaW5nXScpICYmIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUud2FybihcIlN0YXJ0aW5nIHdpdGggdjIuMC4wLWJldGEuMSBkYXRlLWZucyBkb2Vzbid0IGFjY2VwdCBzdHJpbmdzIGFzIGRhdGUgYXJndW1lbnRzLiBQbGVhc2UgdXNlIGBwYXJzZUlTT2AgdG8gcGFyc2Ugc3RyaW5ncy4gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91cGdyYWRlR3VpZGUubWQjc3RyaW5nLWFyZ3VtZW50c1wiKTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICBjb25zb2xlLndhcm4obmV3IEVycm9yKCkuc3RhY2spO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IERhdGUoTmFOKTtcbiAgfVxufSIsImltcG9ydCBpc0RhdGUgZnJvbSBcIi4uL2lzRGF0ZS9pbmRleC5qc1wiO1xuaW1wb3J0IHRvRGF0ZSBmcm9tIFwiLi4vdG9EYXRlL2luZGV4LmpzXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuLyoqXG4gKiBAbmFtZSBpc1ZhbGlkXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IElzIHRoZSBnaXZlbiBkYXRlIHZhbGlkP1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJucyBmYWxzZSBpZiBhcmd1bWVudCBpcyBJbnZhbGlkIERhdGUgYW5kIHRydWUgb3RoZXJ3aXNlLlxuICogQXJndW1lbnQgaXMgY29udmVydGVkIHRvIERhdGUgdXNpbmcgYHRvRGF0ZWAuIFNlZSBbdG9EYXRlXXtAbGluayBodHRwczovL2RhdGUtZm5zLm9yZy9kb2NzL3RvRGF0ZX1cbiAqIEludmFsaWQgRGF0ZSBpcyBhIERhdGUsIHdob3NlIHRpbWUgdmFsdWUgaXMgTmFOLlxuICpcbiAqIFRpbWUgdmFsdWUgb2YgRGF0ZTogaHR0cDovL2VzNS5naXRodWIuaW8vI3gxNS45LjEuMVxuICpcbiAqIEBwYXJhbSB7Kn0gZGF0ZSAtIHRoZSBkYXRlIHRvIGNoZWNrXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gdGhlIGRhdGUgaXMgdmFsaWRcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMSBhcmd1bWVudCByZXF1aXJlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBGb3IgdGhlIHZhbGlkIGRhdGU6XG4gKiBjb25zdCByZXN1bHQgPSBpc1ZhbGlkKG5ldyBEYXRlKDIwMTQsIDEsIDMxKSlcbiAqIC8vPT4gdHJ1ZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBGb3IgdGhlIHZhbHVlLCBjb252ZXJ0YWJsZSBpbnRvIGEgZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IGlzVmFsaWQoMTM5MzgwNDgwMDAwMClcbiAqIC8vPT4gdHJ1ZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBGb3IgdGhlIGludmFsaWQgZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IGlzVmFsaWQobmV3IERhdGUoJycpKVxuICogLy89PiBmYWxzZVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc1ZhbGlkKGRpcnR5RGF0ZSkge1xuICByZXF1aXJlZEFyZ3MoMSwgYXJndW1lbnRzKTtcbiAgaWYgKCFpc0RhdGUoZGlydHlEYXRlKSAmJiB0eXBlb2YgZGlydHlEYXRlICE9PSAnbnVtYmVyJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgZGF0ZSA9IHRvRGF0ZShkaXJ0eURhdGUpO1xuICByZXR1cm4gIWlzTmFOKE51bWJlcihkYXRlKSk7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdG9JbnRlZ2VyKGRpcnR5TnVtYmVyKSB7XG4gIGlmIChkaXJ0eU51bWJlciA9PT0gbnVsbCB8fCBkaXJ0eU51bWJlciA9PT0gdHJ1ZSB8fCBkaXJ0eU51bWJlciA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4gTmFOO1xuICB9XG4gIHZhciBudW1iZXIgPSBOdW1iZXIoZGlydHlOdW1iZXIpO1xuICBpZiAoaXNOYU4obnVtYmVyKSkge1xuICAgIHJldHVybiBudW1iZXI7XG4gIH1cbiAgcmV0dXJuIG51bWJlciA8IDAgPyBNYXRoLmNlaWwobnVtYmVyKSA6IE1hdGguZmxvb3IobnVtYmVyKTtcbn0iLCJpbXBvcnQgdG9JbnRlZ2VyIGZyb20gXCIuLi9fbGliL3RvSW50ZWdlci9pbmRleC5qc1wiO1xuaW1wb3J0IHRvRGF0ZSBmcm9tIFwiLi4vdG9EYXRlL2luZGV4LmpzXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuLyoqXG4gKiBAbmFtZSBhZGRNaWxsaXNlY29uZHNcbiAqIEBjYXRlZ29yeSBNaWxsaXNlY29uZCBIZWxwZXJzXG4gKiBAc3VtbWFyeSBBZGQgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQWRkIHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gYmUgY2hhbmdlZFxuICogQHBhcmFtIHtOdW1iZXJ9IGFtb3VudCAtIHRoZSBhbW91bnQgb2YgbWlsbGlzZWNvbmRzIHRvIGJlIGFkZGVkLiBQb3NpdGl2ZSBkZWNpbWFscyB3aWxsIGJlIHJvdW5kZWQgdXNpbmcgYE1hdGguZmxvb3JgLCBkZWNpbWFscyBsZXNzIHRoYW4gemVybyB3aWxsIGJlIHJvdW5kZWQgdXNpbmcgYE1hdGguY2VpbGAuXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIG5ldyBkYXRlIHdpdGggdGhlIG1pbGxpc2Vjb25kcyBhZGRlZFxuICogQHRocm93cyB7VHlwZUVycm9yfSAyIGFyZ3VtZW50cyByZXF1aXJlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBBZGQgNzUwIG1pbGxpc2Vjb25kcyB0byAxMCBKdWx5IDIwMTQgMTI6NDU6MzAuMDAwOlxuICogY29uc3QgcmVzdWx0ID0gYWRkTWlsbGlzZWNvbmRzKG5ldyBEYXRlKDIwMTQsIDYsIDEwLCAxMiwgNDUsIDMwLCAwKSwgNzUwKVxuICogLy89PiBUaHUgSnVsIDEwIDIwMTQgMTI6NDU6MzAuNzUwXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFkZE1pbGxpc2Vjb25kcyhkaXJ0eURhdGUsIGRpcnR5QW1vdW50KSB7XG4gIHJlcXVpcmVkQXJncygyLCBhcmd1bWVudHMpO1xuICB2YXIgdGltZXN0YW1wID0gdG9EYXRlKGRpcnR5RGF0ZSkuZ2V0VGltZSgpO1xuICB2YXIgYW1vdW50ID0gdG9JbnRlZ2VyKGRpcnR5QW1vdW50KTtcbiAgcmV0dXJuIG5ldyBEYXRlKHRpbWVzdGFtcCArIGFtb3VudCk7XG59IiwiaW1wb3J0IGFkZE1pbGxpc2Vjb25kcyBmcm9tIFwiLi4vYWRkTWlsbGlzZWNvbmRzL2luZGV4LmpzXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuaW1wb3J0IHRvSW50ZWdlciBmcm9tIFwiLi4vX2xpYi90b0ludGVnZXIvaW5kZXguanNcIjtcbi8qKlxuICogQG5hbWUgc3ViTWlsbGlzZWNvbmRzXG4gKiBAY2F0ZWdvcnkgTWlsbGlzZWNvbmQgSGVscGVyc1xuICogQHN1bW1hcnkgU3VidHJhY3QgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGZyb20gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBTdWJ0cmFjdCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBtaWxsaXNlY29uZHMgZnJvbSB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gYmUgY2hhbmdlZFxuICogQHBhcmFtIHtOdW1iZXJ9IGFtb3VudCAtIHRoZSBhbW91bnQgb2YgbWlsbGlzZWNvbmRzIHRvIGJlIHN1YnRyYWN0ZWQuIFBvc2l0aXZlIGRlY2ltYWxzIHdpbGwgYmUgcm91bmRlZCB1c2luZyBgTWF0aC5mbG9vcmAsIGRlY2ltYWxzIGxlc3MgdGhhbiB6ZXJvIHdpbGwgYmUgcm91bmRlZCB1c2luZyBgTWF0aC5jZWlsYC5cbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgbmV3IGRhdGUgd2l0aCB0aGUgbWlsbGlzZWNvbmRzIHN1YnRyYWN0ZWRcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMiBhcmd1bWVudHMgcmVxdWlyZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU3VidHJhY3QgNzUwIG1pbGxpc2Vjb25kcyBmcm9tIDEwIEp1bHkgMjAxNCAxMjo0NTozMC4wMDA6XG4gKiBjb25zdCByZXN1bHQgPSBzdWJNaWxsaXNlY29uZHMobmV3IERhdGUoMjAxNCwgNiwgMTAsIDEyLCA0NSwgMzAsIDApLCA3NTApXG4gKiAvLz0+IFRodSBKdWwgMTAgMjAxNCAxMjo0NToyOS4yNTBcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3ViTWlsbGlzZWNvbmRzKGRpcnR5RGF0ZSwgZGlydHlBbW91bnQpIHtcbiAgcmVxdWlyZWRBcmdzKDIsIGFyZ3VtZW50cyk7XG4gIHZhciBhbW91bnQgPSB0b0ludGVnZXIoZGlydHlBbW91bnQpO1xuICByZXR1cm4gYWRkTWlsbGlzZWNvbmRzKGRpcnR5RGF0ZSwgLWFtb3VudCk7XG59IiwiaW1wb3J0IHRvRGF0ZSBmcm9tIFwiLi4vLi4vdG9EYXRlL2luZGV4LmpzXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9yZXF1aXJlZEFyZ3MvaW5kZXguanNcIjtcbnZhciBNSUxMSVNFQ09ORFNfSU5fREFZID0gODY0MDAwMDA7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRVVENEYXlPZlllYXIoZGlydHlEYXRlKSB7XG4gIHJlcXVpcmVkQXJncygxLCBhcmd1bWVudHMpO1xuICB2YXIgZGF0ZSA9IHRvRGF0ZShkaXJ0eURhdGUpO1xuICB2YXIgdGltZXN0YW1wID0gZGF0ZS5nZXRUaW1lKCk7XG4gIGRhdGUuc2V0VVRDTW9udGgoMCwgMSk7XG4gIGRhdGUuc2V0VVRDSG91cnMoMCwgMCwgMCwgMCk7XG4gIHZhciBzdGFydE9mWWVhclRpbWVzdGFtcCA9IGRhdGUuZ2V0VGltZSgpO1xuICB2YXIgZGlmZmVyZW5jZSA9IHRpbWVzdGFtcCAtIHN0YXJ0T2ZZZWFyVGltZXN0YW1wO1xuICByZXR1cm4gTWF0aC5mbG9vcihkaWZmZXJlbmNlIC8gTUlMTElTRUNPTkRTX0lOX0RBWSkgKyAxO1xufSIsImltcG9ydCB0b0RhdGUgZnJvbSBcIi4uLy4uL3RvRGF0ZS9pbmRleC5qc1wiO1xuaW1wb3J0IHJlcXVpcmVkQXJncyBmcm9tIFwiLi4vcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzdGFydE9mVVRDSVNPV2VlayhkaXJ0eURhdGUpIHtcbiAgcmVxdWlyZWRBcmdzKDEsIGFyZ3VtZW50cyk7XG4gIHZhciB3ZWVrU3RhcnRzT24gPSAxO1xuICB2YXIgZGF0ZSA9IHRvRGF0ZShkaXJ0eURhdGUpO1xuICB2YXIgZGF5ID0gZGF0ZS5nZXRVVENEYXkoKTtcbiAgdmFyIGRpZmYgPSAoZGF5IDwgd2Vla1N0YXJ0c09uID8gNyA6IDApICsgZGF5IC0gd2Vla1N0YXJ0c09uO1xuICBkYXRlLnNldFVUQ0RhdGUoZGF0ZS5nZXRVVENEYXRlKCkgLSBkaWZmKTtcbiAgZGF0ZS5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbiAgcmV0dXJuIGRhdGU7XG59IiwiaW1wb3J0IHRvRGF0ZSBmcm9tIFwiLi4vLi4vdG9EYXRlL2luZGV4LmpzXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9yZXF1aXJlZEFyZ3MvaW5kZXguanNcIjtcbmltcG9ydCBzdGFydE9mVVRDSVNPV2VlayBmcm9tIFwiLi4vc3RhcnRPZlVUQ0lTT1dlZWsvaW5kZXguanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFVUQ0lTT1dlZWtZZWFyKGRpcnR5RGF0ZSkge1xuICByZXF1aXJlZEFyZ3MoMSwgYXJndW1lbnRzKTtcbiAgdmFyIGRhdGUgPSB0b0RhdGUoZGlydHlEYXRlKTtcbiAgdmFyIHllYXIgPSBkYXRlLmdldFVUQ0Z1bGxZZWFyKCk7XG4gIHZhciBmb3VydGhPZkphbnVhcnlPZk5leHRZZWFyID0gbmV3IERhdGUoMCk7XG4gIGZvdXJ0aE9mSmFudWFyeU9mTmV4dFllYXIuc2V0VVRDRnVsbFllYXIoeWVhciArIDEsIDAsIDQpO1xuICBmb3VydGhPZkphbnVhcnlPZk5leHRZZWFyLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICB2YXIgc3RhcnRPZk5leHRZZWFyID0gc3RhcnRPZlVUQ0lTT1dlZWsoZm91cnRoT2ZKYW51YXJ5T2ZOZXh0WWVhcik7XG4gIHZhciBmb3VydGhPZkphbnVhcnlPZlRoaXNZZWFyID0gbmV3IERhdGUoMCk7XG4gIGZvdXJ0aE9mSmFudWFyeU9mVGhpc1llYXIuc2V0VVRDRnVsbFllYXIoeWVhciwgMCwgNCk7XG4gIGZvdXJ0aE9mSmFudWFyeU9mVGhpc1llYXIuc2V0VVRDSG91cnMoMCwgMCwgMCwgMCk7XG4gIHZhciBzdGFydE9mVGhpc1llYXIgPSBzdGFydE9mVVRDSVNPV2Vlayhmb3VydGhPZkphbnVhcnlPZlRoaXNZZWFyKTtcbiAgaWYgKGRhdGUuZ2V0VGltZSgpID49IHN0YXJ0T2ZOZXh0WWVhci5nZXRUaW1lKCkpIHtcbiAgICByZXR1cm4geWVhciArIDE7XG4gIH0gZWxzZSBpZiAoZGF0ZS5nZXRUaW1lKCkgPj0gc3RhcnRPZlRoaXNZZWFyLmdldFRpbWUoKSkge1xuICAgIHJldHVybiB5ZWFyO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB5ZWFyIC0gMTtcbiAgfVxufSIsImltcG9ydCBnZXRVVENJU09XZWVrWWVhciBmcm9tIFwiLi4vZ2V0VVRDSVNPV2Vla1llYXIvaW5kZXguanNcIjtcbmltcG9ydCBzdGFydE9mVVRDSVNPV2VlayBmcm9tIFwiLi4vc3RhcnRPZlVUQ0lTT1dlZWsvaW5kZXguanNcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3RhcnRPZlVUQ0lTT1dlZWtZZWFyKGRpcnR5RGF0ZSkge1xuICByZXF1aXJlZEFyZ3MoMSwgYXJndW1lbnRzKTtcbiAgdmFyIHllYXIgPSBnZXRVVENJU09XZWVrWWVhcihkaXJ0eURhdGUpO1xuICB2YXIgZm91cnRoT2ZKYW51YXJ5ID0gbmV3IERhdGUoMCk7XG4gIGZvdXJ0aE9mSmFudWFyeS5zZXRVVENGdWxsWWVhcih5ZWFyLCAwLCA0KTtcbiAgZm91cnRoT2ZKYW51YXJ5LnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICB2YXIgZGF0ZSA9IHN0YXJ0T2ZVVENJU09XZWVrKGZvdXJ0aE9mSmFudWFyeSk7XG4gIHJldHVybiBkYXRlO1xufSIsImltcG9ydCB0b0RhdGUgZnJvbSBcIi4uLy4uL3RvRGF0ZS9pbmRleC5qc1wiO1xuaW1wb3J0IHN0YXJ0T2ZVVENJU09XZWVrIGZyb20gXCIuLi9zdGFydE9mVVRDSVNPV2Vlay9pbmRleC5qc1wiO1xuaW1wb3J0IHN0YXJ0T2ZVVENJU09XZWVrWWVhciBmcm9tIFwiLi4vc3RhcnRPZlVUQ0lTT1dlZWtZZWFyL2luZGV4LmpzXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9yZXF1aXJlZEFyZ3MvaW5kZXguanNcIjtcbnZhciBNSUxMSVNFQ09ORFNfSU5fV0VFSyA9IDYwNDgwMDAwMDtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFVUQ0lTT1dlZWsoZGlydHlEYXRlKSB7XG4gIHJlcXVpcmVkQXJncygxLCBhcmd1bWVudHMpO1xuICB2YXIgZGF0ZSA9IHRvRGF0ZShkaXJ0eURhdGUpO1xuICB2YXIgZGlmZiA9IHN0YXJ0T2ZVVENJU09XZWVrKGRhdGUpLmdldFRpbWUoKSAtIHN0YXJ0T2ZVVENJU09XZWVrWWVhcihkYXRlKS5nZXRUaW1lKCk7XG5cbiAgLy8gUm91bmQgdGhlIG51bWJlciBvZiBkYXlzIHRvIHRoZSBuZWFyZXN0IGludGVnZXJcbiAgLy8gYmVjYXVzZSB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBpbiBhIHdlZWsgaXMgbm90IGNvbnN0YW50XG4gIC8vIChlLmcuIGl0J3MgZGlmZmVyZW50IGluIHRoZSB3ZWVrIG9mIHRoZSBkYXlsaWdodCBzYXZpbmcgdGltZSBjbG9jayBzaGlmdClcbiAgcmV0dXJuIE1hdGgucm91bmQoZGlmZiAvIE1JTExJU0VDT05EU19JTl9XRUVLKSArIDE7XG59IiwidmFyIGRlZmF1bHRPcHRpb25zID0ge307XG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVmYXVsdE9wdGlvbnMoKSB7XG4gIHJldHVybiBkZWZhdWx0T3B0aW9ucztcbn1cbmV4cG9ydCBmdW5jdGlvbiBzZXREZWZhdWx0T3B0aW9ucyhuZXdPcHRpb25zKSB7XG4gIGRlZmF1bHRPcHRpb25zID0gbmV3T3B0aW9ucztcbn0iLCJpbXBvcnQgdG9EYXRlIGZyb20gXCIuLi8uLi90b0RhdGUvaW5kZXguanNcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuaW1wb3J0IHRvSW50ZWdlciBmcm9tIFwiLi4vdG9JbnRlZ2VyL2luZGV4LmpzXCI7XG5pbXBvcnQgeyBnZXREZWZhdWx0T3B0aW9ucyB9IGZyb20gXCIuLi9kZWZhdWx0T3B0aW9ucy9pbmRleC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3RhcnRPZlVUQ1dlZWsoZGlydHlEYXRlLCBvcHRpb25zKSB7XG4gIHZhciBfcmVmLCBfcmVmMiwgX3JlZjMsIF9vcHRpb25zJHdlZWtTdGFydHNPbiwgX29wdGlvbnMkbG9jYWxlLCBfb3B0aW9ucyRsb2NhbGUkb3B0aW8sIF9kZWZhdWx0T3B0aW9ucyRsb2NhbCwgX2RlZmF1bHRPcHRpb25zJGxvY2FsMjtcbiAgcmVxdWlyZWRBcmdzKDEsIGFyZ3VtZW50cyk7XG4gIHZhciBkZWZhdWx0T3B0aW9ucyA9IGdldERlZmF1bHRPcHRpb25zKCk7XG4gIHZhciB3ZWVrU3RhcnRzT24gPSB0b0ludGVnZXIoKF9yZWYgPSAoX3JlZjIgPSAoX3JlZjMgPSAoX29wdGlvbnMkd2Vla1N0YXJ0c09uID0gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLndlZWtTdGFydHNPbikgIT09IG51bGwgJiYgX29wdGlvbnMkd2Vla1N0YXJ0c09uICE9PSB2b2lkIDAgPyBfb3B0aW9ucyR3ZWVrU3RhcnRzT24gOiBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IChfb3B0aW9ucyRsb2NhbGUgPSBvcHRpb25zLmxvY2FsZSkgPT09IG51bGwgfHwgX29wdGlvbnMkbG9jYWxlID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX29wdGlvbnMkbG9jYWxlJG9wdGlvID0gX29wdGlvbnMkbG9jYWxlLm9wdGlvbnMpID09PSBudWxsIHx8IF9vcHRpb25zJGxvY2FsZSRvcHRpbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX29wdGlvbnMkbG9jYWxlJG9wdGlvLndlZWtTdGFydHNPbikgIT09IG51bGwgJiYgX3JlZjMgIT09IHZvaWQgMCA/IF9yZWYzIDogZGVmYXVsdE9wdGlvbnMud2Vla1N0YXJ0c09uKSAhPT0gbnVsbCAmJiBfcmVmMiAhPT0gdm9pZCAwID8gX3JlZjIgOiAoX2RlZmF1bHRPcHRpb25zJGxvY2FsID0gZGVmYXVsdE9wdGlvbnMubG9jYWxlKSA9PT0gbnVsbCB8fCBfZGVmYXVsdE9wdGlvbnMkbG9jYWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IChfZGVmYXVsdE9wdGlvbnMkbG9jYWwyID0gX2RlZmF1bHRPcHRpb25zJGxvY2FsLm9wdGlvbnMpID09PSBudWxsIHx8IF9kZWZhdWx0T3B0aW9ucyRsb2NhbDIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kZWZhdWx0T3B0aW9ucyRsb2NhbDIud2Vla1N0YXJ0c09uKSAhPT0gbnVsbCAmJiBfcmVmICE9PSB2b2lkIDAgPyBfcmVmIDogMCk7XG5cbiAgLy8gVGVzdCBpZiB3ZWVrU3RhcnRzT24gaXMgYmV0d2VlbiAwIGFuZCA2IF9hbmRfIGlzIG5vdCBOYU5cbiAgaWYgKCEod2Vla1N0YXJ0c09uID49IDAgJiYgd2Vla1N0YXJ0c09uIDw9IDYpKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3dlZWtTdGFydHNPbiBtdXN0IGJlIGJldHdlZW4gMCBhbmQgNiBpbmNsdXNpdmVseScpO1xuICB9XG4gIHZhciBkYXRlID0gdG9EYXRlKGRpcnR5RGF0ZSk7XG4gIHZhciBkYXkgPSBkYXRlLmdldFVUQ0RheSgpO1xuICB2YXIgZGlmZiA9IChkYXkgPCB3ZWVrU3RhcnRzT24gPyA3IDogMCkgKyBkYXkgLSB3ZWVrU3RhcnRzT247XG4gIGRhdGUuc2V0VVRDRGF0ZShkYXRlLmdldFVUQ0RhdGUoKSAtIGRpZmYpO1xuICBkYXRlLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICByZXR1cm4gZGF0ZTtcbn0iLCJpbXBvcnQgdG9EYXRlIGZyb20gXCIuLi8uLi90b0RhdGUvaW5kZXguanNcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuaW1wb3J0IHN0YXJ0T2ZVVENXZWVrIGZyb20gXCIuLi9zdGFydE9mVVRDV2Vlay9pbmRleC5qc1wiO1xuaW1wb3J0IHRvSW50ZWdlciBmcm9tIFwiLi4vdG9JbnRlZ2VyL2luZGV4LmpzXCI7XG5pbXBvcnQgeyBnZXREZWZhdWx0T3B0aW9ucyB9IGZyb20gXCIuLi9kZWZhdWx0T3B0aW9ucy9pbmRleC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0VVRDV2Vla1llYXIoZGlydHlEYXRlLCBvcHRpb25zKSB7XG4gIHZhciBfcmVmLCBfcmVmMiwgX3JlZjMsIF9vcHRpb25zJGZpcnN0V2Vla0NvbiwgX29wdGlvbnMkbG9jYWxlLCBfb3B0aW9ucyRsb2NhbGUkb3B0aW8sIF9kZWZhdWx0T3B0aW9ucyRsb2NhbCwgX2RlZmF1bHRPcHRpb25zJGxvY2FsMjtcbiAgcmVxdWlyZWRBcmdzKDEsIGFyZ3VtZW50cyk7XG4gIHZhciBkYXRlID0gdG9EYXRlKGRpcnR5RGF0ZSk7XG4gIHZhciB5ZWFyID0gZGF0ZS5nZXRVVENGdWxsWWVhcigpO1xuICB2YXIgZGVmYXVsdE9wdGlvbnMgPSBnZXREZWZhdWx0T3B0aW9ucygpO1xuICB2YXIgZmlyc3RXZWVrQ29udGFpbnNEYXRlID0gdG9JbnRlZ2VyKChfcmVmID0gKF9yZWYyID0gKF9yZWYzID0gKF9vcHRpb25zJGZpcnN0V2Vla0NvbiA9IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5maXJzdFdlZWtDb250YWluc0RhdGUpICE9PSBudWxsICYmIF9vcHRpb25zJGZpcnN0V2Vla0NvbiAhPT0gdm9pZCAwID8gX29wdGlvbnMkZmlyc3RXZWVrQ29uIDogb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX29wdGlvbnMkbG9jYWxlID0gb3B0aW9ucy5sb2NhbGUpID09PSBudWxsIHx8IF9vcHRpb25zJGxvY2FsZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogKF9vcHRpb25zJGxvY2FsZSRvcHRpbyA9IF9vcHRpb25zJGxvY2FsZS5vcHRpb25zKSA9PT0gbnVsbCB8fCBfb3B0aW9ucyRsb2NhbGUkb3B0aW8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9vcHRpb25zJGxvY2FsZSRvcHRpby5maXJzdFdlZWtDb250YWluc0RhdGUpICE9PSBudWxsICYmIF9yZWYzICE9PSB2b2lkIDAgPyBfcmVmMyA6IGRlZmF1bHRPcHRpb25zLmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSkgIT09IG51bGwgJiYgX3JlZjIgIT09IHZvaWQgMCA/IF9yZWYyIDogKF9kZWZhdWx0T3B0aW9ucyRsb2NhbCA9IGRlZmF1bHRPcHRpb25zLmxvY2FsZSkgPT09IG51bGwgfHwgX2RlZmF1bHRPcHRpb25zJGxvY2FsID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX2RlZmF1bHRPcHRpb25zJGxvY2FsMiA9IF9kZWZhdWx0T3B0aW9ucyRsb2NhbC5vcHRpb25zKSA9PT0gbnVsbCB8fCBfZGVmYXVsdE9wdGlvbnMkbG9jYWwyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZGVmYXVsdE9wdGlvbnMkbG9jYWwyLmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSkgIT09IG51bGwgJiYgX3JlZiAhPT0gdm9pZCAwID8gX3JlZiA6IDEpO1xuXG4gIC8vIFRlc3QgaWYgd2Vla1N0YXJ0c09uIGlzIGJldHdlZW4gMSBhbmQgNyBfYW5kXyBpcyBub3QgTmFOXG4gIGlmICghKGZpcnN0V2Vla0NvbnRhaW5zRGF0ZSA+PSAxICYmIGZpcnN0V2Vla0NvbnRhaW5zRGF0ZSA8PSA3KSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdmaXJzdFdlZWtDb250YWluc0RhdGUgbXVzdCBiZSBiZXR3ZWVuIDEgYW5kIDcgaW5jbHVzaXZlbHknKTtcbiAgfVxuICB2YXIgZmlyc3RXZWVrT2ZOZXh0WWVhciA9IG5ldyBEYXRlKDApO1xuICBmaXJzdFdlZWtPZk5leHRZZWFyLnNldFVUQ0Z1bGxZZWFyKHllYXIgKyAxLCAwLCBmaXJzdFdlZWtDb250YWluc0RhdGUpO1xuICBmaXJzdFdlZWtPZk5leHRZZWFyLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICB2YXIgc3RhcnRPZk5leHRZZWFyID0gc3RhcnRPZlVUQ1dlZWsoZmlyc3RXZWVrT2ZOZXh0WWVhciwgb3B0aW9ucyk7XG4gIHZhciBmaXJzdFdlZWtPZlRoaXNZZWFyID0gbmV3IERhdGUoMCk7XG4gIGZpcnN0V2Vla09mVGhpc1llYXIuc2V0VVRDRnVsbFllYXIoeWVhciwgMCwgZmlyc3RXZWVrQ29udGFpbnNEYXRlKTtcbiAgZmlyc3RXZWVrT2ZUaGlzWWVhci5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbiAgdmFyIHN0YXJ0T2ZUaGlzWWVhciA9IHN0YXJ0T2ZVVENXZWVrKGZpcnN0V2Vla09mVGhpc1llYXIsIG9wdGlvbnMpO1xuICBpZiAoZGF0ZS5nZXRUaW1lKCkgPj0gc3RhcnRPZk5leHRZZWFyLmdldFRpbWUoKSkge1xuICAgIHJldHVybiB5ZWFyICsgMTtcbiAgfSBlbHNlIGlmIChkYXRlLmdldFRpbWUoKSA+PSBzdGFydE9mVGhpc1llYXIuZ2V0VGltZSgpKSB7XG4gICAgcmV0dXJuIHllYXI7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHllYXIgLSAxO1xuICB9XG59IiwiaW1wb3J0IGdldFVUQ1dlZWtZZWFyIGZyb20gXCIuLi9nZXRVVENXZWVrWWVhci9pbmRleC5qc1wiO1xuaW1wb3J0IHJlcXVpcmVkQXJncyBmcm9tIFwiLi4vcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG5pbXBvcnQgc3RhcnRPZlVUQ1dlZWsgZnJvbSBcIi4uL3N0YXJ0T2ZVVENXZWVrL2luZGV4LmpzXCI7XG5pbXBvcnQgdG9JbnRlZ2VyIGZyb20gXCIuLi90b0ludGVnZXIvaW5kZXguanNcIjtcbmltcG9ydCB7IGdldERlZmF1bHRPcHRpb25zIH0gZnJvbSBcIi4uL2RlZmF1bHRPcHRpb25zL2luZGV4LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzdGFydE9mVVRDV2Vla1llYXIoZGlydHlEYXRlLCBvcHRpb25zKSB7XG4gIHZhciBfcmVmLCBfcmVmMiwgX3JlZjMsIF9vcHRpb25zJGZpcnN0V2Vla0NvbiwgX29wdGlvbnMkbG9jYWxlLCBfb3B0aW9ucyRsb2NhbGUkb3B0aW8sIF9kZWZhdWx0T3B0aW9ucyRsb2NhbCwgX2RlZmF1bHRPcHRpb25zJGxvY2FsMjtcbiAgcmVxdWlyZWRBcmdzKDEsIGFyZ3VtZW50cyk7XG4gIHZhciBkZWZhdWx0T3B0aW9ucyA9IGdldERlZmF1bHRPcHRpb25zKCk7XG4gIHZhciBmaXJzdFdlZWtDb250YWluc0RhdGUgPSB0b0ludGVnZXIoKF9yZWYgPSAoX3JlZjIgPSAoX3JlZjMgPSAoX29wdGlvbnMkZmlyc3RXZWVrQ29uID0gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSkgIT09IG51bGwgJiYgX29wdGlvbnMkZmlyc3RXZWVrQ29uICE9PSB2b2lkIDAgPyBfb3B0aW9ucyRmaXJzdFdlZWtDb24gOiBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IChfb3B0aW9ucyRsb2NhbGUgPSBvcHRpb25zLmxvY2FsZSkgPT09IG51bGwgfHwgX29wdGlvbnMkbG9jYWxlID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX29wdGlvbnMkbG9jYWxlJG9wdGlvID0gX29wdGlvbnMkbG9jYWxlLm9wdGlvbnMpID09PSBudWxsIHx8IF9vcHRpb25zJGxvY2FsZSRvcHRpbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX29wdGlvbnMkbG9jYWxlJG9wdGlvLmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSkgIT09IG51bGwgJiYgX3JlZjMgIT09IHZvaWQgMCA/IF9yZWYzIDogZGVmYXVsdE9wdGlvbnMuZmlyc3RXZWVrQ29udGFpbnNEYXRlKSAhPT0gbnVsbCAmJiBfcmVmMiAhPT0gdm9pZCAwID8gX3JlZjIgOiAoX2RlZmF1bHRPcHRpb25zJGxvY2FsID0gZGVmYXVsdE9wdGlvbnMubG9jYWxlKSA9PT0gbnVsbCB8fCBfZGVmYXVsdE9wdGlvbnMkbG9jYWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IChfZGVmYXVsdE9wdGlvbnMkbG9jYWwyID0gX2RlZmF1bHRPcHRpb25zJGxvY2FsLm9wdGlvbnMpID09PSBudWxsIHx8IF9kZWZhdWx0T3B0aW9ucyRsb2NhbDIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kZWZhdWx0T3B0aW9ucyRsb2NhbDIuZmlyc3RXZWVrQ29udGFpbnNEYXRlKSAhPT0gbnVsbCAmJiBfcmVmICE9PSB2b2lkIDAgPyBfcmVmIDogMSk7XG4gIHZhciB5ZWFyID0gZ2V0VVRDV2Vla1llYXIoZGlydHlEYXRlLCBvcHRpb25zKTtcbiAgdmFyIGZpcnN0V2VlayA9IG5ldyBEYXRlKDApO1xuICBmaXJzdFdlZWsuc2V0VVRDRnVsbFllYXIoeWVhciwgMCwgZmlyc3RXZWVrQ29udGFpbnNEYXRlKTtcbiAgZmlyc3RXZWVrLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICB2YXIgZGF0ZSA9IHN0YXJ0T2ZVVENXZWVrKGZpcnN0V2Vlaywgb3B0aW9ucyk7XG4gIHJldHVybiBkYXRlO1xufSIsImltcG9ydCB0b0RhdGUgZnJvbSBcIi4uLy4uL3RvRGF0ZS9pbmRleC5qc1wiO1xuaW1wb3J0IHN0YXJ0T2ZVVENXZWVrIGZyb20gXCIuLi9zdGFydE9mVVRDV2Vlay9pbmRleC5qc1wiO1xuaW1wb3J0IHN0YXJ0T2ZVVENXZWVrWWVhciBmcm9tIFwiLi4vc3RhcnRPZlVUQ1dlZWtZZWFyL2luZGV4LmpzXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9yZXF1aXJlZEFyZ3MvaW5kZXguanNcIjtcbnZhciBNSUxMSVNFQ09ORFNfSU5fV0VFSyA9IDYwNDgwMDAwMDtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFVUQ1dlZWsoZGlydHlEYXRlLCBvcHRpb25zKSB7XG4gIHJlcXVpcmVkQXJncygxLCBhcmd1bWVudHMpO1xuICB2YXIgZGF0ZSA9IHRvRGF0ZShkaXJ0eURhdGUpO1xuICB2YXIgZGlmZiA9IHN0YXJ0T2ZVVENXZWVrKGRhdGUsIG9wdGlvbnMpLmdldFRpbWUoKSAtIHN0YXJ0T2ZVVENXZWVrWWVhcihkYXRlLCBvcHRpb25zKS5nZXRUaW1lKCk7XG5cbiAgLy8gUm91bmQgdGhlIG51bWJlciBvZiBkYXlzIHRvIHRoZSBuZWFyZXN0IGludGVnZXJcbiAgLy8gYmVjYXVzZSB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBpbiBhIHdlZWsgaXMgbm90IGNvbnN0YW50XG4gIC8vIChlLmcuIGl0J3MgZGlmZmVyZW50IGluIHRoZSB3ZWVrIG9mIHRoZSBkYXlsaWdodCBzYXZpbmcgdGltZSBjbG9jayBzaGlmdClcbiAgcmV0dXJuIE1hdGgucm91bmQoZGlmZiAvIE1JTExJU0VDT05EU19JTl9XRUVLKSArIDE7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWRkTGVhZGluZ1plcm9zKG51bWJlciwgdGFyZ2V0TGVuZ3RoKSB7XG4gIHZhciBzaWduID0gbnVtYmVyIDwgMCA/ICctJyA6ICcnO1xuICB2YXIgb3V0cHV0ID0gTWF0aC5hYnMobnVtYmVyKS50b1N0cmluZygpO1xuICB3aGlsZSAob3V0cHV0Lmxlbmd0aCA8IHRhcmdldExlbmd0aCkge1xuICAgIG91dHB1dCA9ICcwJyArIG91dHB1dDtcbiAgfVxuICByZXR1cm4gc2lnbiArIG91dHB1dDtcbn0iLCJpbXBvcnQgYWRkTGVhZGluZ1plcm9zIGZyb20gXCIuLi8uLi9hZGRMZWFkaW5nWmVyb3MvaW5kZXguanNcIjtcbi8qXG4gKiB8ICAgICB8IFVuaXQgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICB8IFVuaXQgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8LS0tLS18LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18LS0tLS18LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18XG4gKiB8ICBhICB8IEFNLCBQTSAgICAgICAgICAgICAgICAgICAgICAgICB8ICBBKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBkICB8IERheSBvZiBtb250aCAgICAgICAgICAgICAgICAgICB8ICBEICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBoICB8IEhvdXIgWzEtMTJdICAgICAgICAgICAgICAgICAgICB8ICBIICB8IEhvdXIgWzAtMjNdICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBtICB8IE1pbnV0ZSAgICAgICAgICAgICAgICAgICAgICAgICB8ICBNICB8IE1vbnRoICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBzICB8IFNlY29uZCAgICAgICAgICAgICAgICAgICAgICAgICB8ICBTICB8IEZyYWN0aW9uIG9mIHNlY29uZCAgICAgICAgICAgICB8XG4gKiB8ICB5ICB8IFllYXIgKGFicykgICAgICAgICAgICAgICAgICAgICB8ICBZICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKlxuICogTGV0dGVycyBtYXJrZWQgYnkgKiBhcmUgbm90IGltcGxlbWVudGVkIGJ1dCByZXNlcnZlZCBieSBVbmljb2RlIHN0YW5kYXJkLlxuICovXG52YXIgZm9ybWF0dGVycyA9IHtcbiAgLy8gWWVhclxuICB5OiBmdW5jdGlvbiB5KGRhdGUsIHRva2VuKSB7XG4gICAgLy8gRnJvbSBodHRwOi8vd3d3LnVuaWNvZGUub3JnL3JlcG9ydHMvdHIzNS90cjM1LTMxL3RyMzUtZGF0ZXMuaHRtbCNEYXRlX0Zvcm1hdF90b2tlbnNcbiAgICAvLyB8IFllYXIgICAgIHwgICAgIHkgfCB5eSB8ICAgeXl5IHwgIHl5eXkgfCB5eXl5eSB8XG4gICAgLy8gfC0tLS0tLS0tLS18LS0tLS0tLXwtLS0tfC0tLS0tLS18LS0tLS0tLXwtLS0tLS0tfFxuICAgIC8vIHwgQUQgMSAgICAgfCAgICAgMSB8IDAxIHwgICAwMDEgfCAgMDAwMSB8IDAwMDAxIHxcbiAgICAvLyB8IEFEIDEyICAgIHwgICAgMTIgfCAxMiB8ICAgMDEyIHwgIDAwMTIgfCAwMDAxMiB8XG4gICAgLy8gfCBBRCAxMjMgICB8ICAgMTIzIHwgMjMgfCAgIDEyMyB8ICAwMTIzIHwgMDAxMjMgfFxuICAgIC8vIHwgQUQgMTIzNCAgfCAgMTIzNCB8IDM0IHwgIDEyMzQgfCAgMTIzNCB8IDAxMjM0IHxcbiAgICAvLyB8IEFEIDEyMzQ1IHwgMTIzNDUgfCA0NSB8IDEyMzQ1IHwgMTIzNDUgfCAxMjM0NSB8XG5cbiAgICB2YXIgc2lnbmVkWWVhciA9IGRhdGUuZ2V0VVRDRnVsbFllYXIoKTtcbiAgICAvLyBSZXR1cm5zIDEgZm9yIDEgQkMgKHdoaWNoIGlzIHllYXIgMCBpbiBKYXZhU2NyaXB0KVxuICAgIHZhciB5ZWFyID0gc2lnbmVkWWVhciA+IDAgPyBzaWduZWRZZWFyIDogMSAtIHNpZ25lZFllYXI7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyh0b2tlbiA9PT0gJ3l5JyA/IHllYXIgJSAxMDAgOiB5ZWFyLCB0b2tlbi5sZW5ndGgpO1xuICB9LFxuICAvLyBNb250aFxuICBNOiBmdW5jdGlvbiBNKGRhdGUsIHRva2VuKSB7XG4gICAgdmFyIG1vbnRoID0gZGF0ZS5nZXRVVENNb250aCgpO1xuICAgIHJldHVybiB0b2tlbiA9PT0gJ00nID8gU3RyaW5nKG1vbnRoICsgMSkgOiBhZGRMZWFkaW5nWmVyb3MobW9udGggKyAxLCAyKTtcbiAgfSxcbiAgLy8gRGF5IG9mIHRoZSBtb250aFxuICBkOiBmdW5jdGlvbiBkKGRhdGUsIHRva2VuKSB7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhkYXRlLmdldFVUQ0RhdGUoKSwgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcbiAgLy8gQU0gb3IgUE1cbiAgYTogZnVuY3Rpb24gYShkYXRlLCB0b2tlbikge1xuICAgIHZhciBkYXlQZXJpb2RFbnVtVmFsdWUgPSBkYXRlLmdldFVUQ0hvdXJzKCkgLyAxMiA+PSAxID8gJ3BtJyA6ICdhbSc7XG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgY2FzZSAnYSc6XG4gICAgICBjYXNlICdhYSc6XG4gICAgICAgIHJldHVybiBkYXlQZXJpb2RFbnVtVmFsdWUudG9VcHBlckNhc2UoKTtcbiAgICAgIGNhc2UgJ2FhYSc6XG4gICAgICAgIHJldHVybiBkYXlQZXJpb2RFbnVtVmFsdWU7XG4gICAgICBjYXNlICdhYWFhYSc6XG4gICAgICAgIHJldHVybiBkYXlQZXJpb2RFbnVtVmFsdWVbMF07XG4gICAgICBjYXNlICdhYWFhJzpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBkYXlQZXJpb2RFbnVtVmFsdWUgPT09ICdhbScgPyAnYS5tLicgOiAncC5tLic7XG4gICAgfVxuICB9LFxuICAvLyBIb3VyIFsxLTEyXVxuICBoOiBmdW5jdGlvbiBoKGRhdGUsIHRva2VuKSB7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhkYXRlLmdldFVUQ0hvdXJzKCkgJSAxMiB8fCAxMiwgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcbiAgLy8gSG91ciBbMC0yM11cbiAgSDogZnVuY3Rpb24gSChkYXRlLCB0b2tlbikge1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoZGF0ZS5nZXRVVENIb3VycygpLCB0b2tlbi5sZW5ndGgpO1xuICB9LFxuICAvLyBNaW51dGVcbiAgbTogZnVuY3Rpb24gbShkYXRlLCB0b2tlbikge1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoZGF0ZS5nZXRVVENNaW51dGVzKCksIHRva2VuLmxlbmd0aCk7XG4gIH0sXG4gIC8vIFNlY29uZFxuICBzOiBmdW5jdGlvbiBzKGRhdGUsIHRva2VuKSB7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhkYXRlLmdldFVUQ1NlY29uZHMoKSwgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcbiAgLy8gRnJhY3Rpb24gb2Ygc2Vjb25kXG4gIFM6IGZ1bmN0aW9uIFMoZGF0ZSwgdG9rZW4pIHtcbiAgICB2YXIgbnVtYmVyT2ZEaWdpdHMgPSB0b2tlbi5sZW5ndGg7XG4gICAgdmFyIG1pbGxpc2Vjb25kcyA9IGRhdGUuZ2V0VVRDTWlsbGlzZWNvbmRzKCk7XG4gICAgdmFyIGZyYWN0aW9uYWxTZWNvbmRzID0gTWF0aC5mbG9vcihtaWxsaXNlY29uZHMgKiBNYXRoLnBvdygxMCwgbnVtYmVyT2ZEaWdpdHMgLSAzKSk7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhmcmFjdGlvbmFsU2Vjb25kcywgdG9rZW4ubGVuZ3RoKTtcbiAgfVxufTtcbmV4cG9ydCBkZWZhdWx0IGZvcm1hdHRlcnM7IiwiaW1wb3J0IGdldFVUQ0RheU9mWWVhciBmcm9tIFwiLi4vLi4vLi4vX2xpYi9nZXRVVENEYXlPZlllYXIvaW5kZXguanNcIjtcbmltcG9ydCBnZXRVVENJU09XZWVrIGZyb20gXCIuLi8uLi8uLi9fbGliL2dldFVUQ0lTT1dlZWsvaW5kZXguanNcIjtcbmltcG9ydCBnZXRVVENJU09XZWVrWWVhciBmcm9tIFwiLi4vLi4vLi4vX2xpYi9nZXRVVENJU09XZWVrWWVhci9pbmRleC5qc1wiO1xuaW1wb3J0IGdldFVUQ1dlZWsgZnJvbSBcIi4uLy4uLy4uL19saWIvZ2V0VVRDV2Vlay9pbmRleC5qc1wiO1xuaW1wb3J0IGdldFVUQ1dlZWtZZWFyIGZyb20gXCIuLi8uLi8uLi9fbGliL2dldFVUQ1dlZWtZZWFyL2luZGV4LmpzXCI7XG5pbXBvcnQgYWRkTGVhZGluZ1plcm9zIGZyb20gXCIuLi8uLi9hZGRMZWFkaW5nWmVyb3MvaW5kZXguanNcIjtcbmltcG9ydCBsaWdodEZvcm1hdHRlcnMgZnJvbSBcIi4uL2xpZ2h0Rm9ybWF0dGVycy9pbmRleC5qc1wiO1xudmFyIGRheVBlcmlvZEVudW0gPSB7XG4gIGFtOiAnYW0nLFxuICBwbTogJ3BtJyxcbiAgbWlkbmlnaHQ6ICdtaWRuaWdodCcsXG4gIG5vb246ICdub29uJyxcbiAgbW9ybmluZzogJ21vcm5pbmcnLFxuICBhZnRlcm5vb246ICdhZnRlcm5vb24nLFxuICBldmVuaW5nOiAnZXZlbmluZycsXG4gIG5pZ2h0OiAnbmlnaHQnXG59O1xuLypcbiAqIHwgICAgIHwgVW5pdCAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgIHwgVW5pdCAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwtLS0tLXwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXwtLS0tLXwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXxcbiAqIHwgIGEgIHwgQU0sIFBNICAgICAgICAgICAgICAgICAgICAgICAgIHwgIEEqIHwgTWlsbGlzZWNvbmRzIGluIGRheSAgICAgICAgICAgIHxcbiAqIHwgIGIgIHwgQU0sIFBNLCBub29uLCBtaWRuaWdodCAgICAgICAgIHwgIEIgIHwgRmxleGlibGUgZGF5IHBlcmlvZCAgICAgICAgICAgIHxcbiAqIHwgIGMgIHwgU3RhbmQtYWxvbmUgbG9jYWwgZGF5IG9mIHdlZWsgIHwgIEMqIHwgTG9jYWxpemVkIGhvdXIgdy8gZGF5IHBlcmlvZCAgIHxcbiAqIHwgIGQgIHwgRGF5IG9mIG1vbnRoICAgICAgICAgICAgICAgICAgIHwgIEQgIHwgRGF5IG9mIHllYXIgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgIGUgIHwgTG9jYWwgZGF5IG9mIHdlZWsgICAgICAgICAgICAgIHwgIEUgIHwgRGF5IG9mIHdlZWsgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgIGYgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgIEYqIHwgRGF5IG9mIHdlZWsgaW4gbW9udGggICAgICAgICAgIHxcbiAqIHwgIGcqIHwgTW9kaWZpZWQgSnVsaWFuIGRheSAgICAgICAgICAgIHwgIEcgIHwgRXJhICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgIGggIHwgSG91ciBbMS0xMl0gICAgICAgICAgICAgICAgICAgIHwgIEggIHwgSG91ciBbMC0yM10gICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgIGkhIHwgSVNPIGRheSBvZiB3ZWVrICAgICAgICAgICAgICAgIHwgIEkhIHwgSVNPIHdlZWsgb2YgeWVhciAgICAgICAgICAgICAgIHxcbiAqIHwgIGoqIHwgTG9jYWxpemVkIGhvdXIgdy8gZGF5IHBlcmlvZCAgIHwgIEoqIHwgTG9jYWxpemVkIGhvdXIgdy9vIGRheSBwZXJpb2QgIHxcbiAqIHwgIGsgIHwgSG91ciBbMS0yNF0gICAgICAgICAgICAgICAgICAgIHwgIEsgIHwgSG91ciBbMC0xMV0gICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgIGwqIHwgKGRlcHJlY2F0ZWQpICAgICAgICAgICAgICAgICAgIHwgIEwgIHwgU3RhbmQtYWxvbmUgbW9udGggICAgICAgICAgICAgIHxcbiAqIHwgIG0gIHwgTWludXRlICAgICAgICAgICAgICAgICAgICAgICAgIHwgIE0gIHwgTW9udGggICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgIG4gIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgIE4gIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgIG8hIHwgT3JkaW5hbCBudW1iZXIgbW9kaWZpZXIgICAgICAgIHwgIE8gIHwgVGltZXpvbmUgKEdNVCkgICAgICAgICAgICAgICAgIHxcbiAqIHwgIHAhIHwgTG9uZyBsb2NhbGl6ZWQgdGltZSAgICAgICAgICAgIHwgIFAhIHwgTG9uZyBsb2NhbGl6ZWQgZGF0ZSAgICAgICAgICAgIHxcbiAqIHwgIHEgIHwgU3RhbmQtYWxvbmUgcXVhcnRlciAgICAgICAgICAgIHwgIFEgIHwgUXVhcnRlciAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgIHIqIHwgUmVsYXRlZCBHcmVnb3JpYW4geWVhciAgICAgICAgIHwgIFIhIHwgSVNPIHdlZWstbnVtYmVyaW5nIHllYXIgICAgICAgIHxcbiAqIHwgIHMgIHwgU2Vjb25kICAgICAgICAgICAgICAgICAgICAgICAgIHwgIFMgIHwgRnJhY3Rpb24gb2Ygc2Vjb25kICAgICAgICAgICAgIHxcbiAqIHwgIHQhIHwgU2Vjb25kcyB0aW1lc3RhbXAgICAgICAgICAgICAgIHwgIFQhIHwgTWlsbGlzZWNvbmRzIHRpbWVzdGFtcCAgICAgICAgIHxcbiAqIHwgIHUgIHwgRXh0ZW5kZWQgeWVhciAgICAgICAgICAgICAgICAgIHwgIFUqIHwgQ3ljbGljIHllYXIgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgIHYqIHwgVGltZXpvbmUgKGdlbmVyaWMgbm9uLWxvY2F0LikgIHwgIFYqIHwgVGltZXpvbmUgKGxvY2F0aW9uKSAgICAgICAgICAgIHxcbiAqIHwgIHcgIHwgTG9jYWwgd2VlayBvZiB5ZWFyICAgICAgICAgICAgIHwgIFcqIHwgV2VlayBvZiBtb250aCAgICAgICAgICAgICAgICAgIHxcbiAqIHwgIHggIHwgVGltZXpvbmUgKElTTy04NjAxIHcvbyBaKSAgICAgIHwgIFggIHwgVGltZXpvbmUgKElTTy04NjAxKSAgICAgICAgICAgIHxcbiAqIHwgIHkgIHwgWWVhciAoYWJzKSAgICAgICAgICAgICAgICAgICAgIHwgIFkgIHwgTG9jYWwgd2Vlay1udW1iZXJpbmcgeWVhciAgICAgIHxcbiAqIHwgIHogIHwgVGltZXpvbmUgKHNwZWNpZmljIG5vbi1sb2NhdC4pIHwgIFoqIHwgVGltZXpvbmUgKGFsaWFzZXMpICAgICAgICAgICAgIHxcbiAqXG4gKiBMZXR0ZXJzIG1hcmtlZCBieSAqIGFyZSBub3QgaW1wbGVtZW50ZWQgYnV0IHJlc2VydmVkIGJ5IFVuaWNvZGUgc3RhbmRhcmQuXG4gKlxuICogTGV0dGVycyBtYXJrZWQgYnkgISBhcmUgbm9uLXN0YW5kYXJkLCBidXQgaW1wbGVtZW50ZWQgYnkgZGF0ZS1mbnM6XG4gKiAtIGBvYCBtb2RpZmllcyB0aGUgcHJldmlvdXMgdG9rZW4gdG8gdHVybiBpdCBpbnRvIGFuIG9yZGluYWwgKHNlZSBgZm9ybWF0YCBkb2NzKVxuICogLSBgaWAgaXMgSVNPIGRheSBvZiB3ZWVrLiBGb3IgYGlgIGFuZCBgaWlgIGlzIHJldHVybnMgbnVtZXJpYyBJU08gd2VlayBkYXlzLFxuICogICBpLmUuIDcgZm9yIFN1bmRheSwgMSBmb3IgTW9uZGF5LCBldGMuXG4gKiAtIGBJYCBpcyBJU08gd2VlayBvZiB5ZWFyLCBhcyBvcHBvc2VkIHRvIGB3YCB3aGljaCBpcyBsb2NhbCB3ZWVrIG9mIHllYXIuXG4gKiAtIGBSYCBpcyBJU08gd2Vlay1udW1iZXJpbmcgeWVhciwgYXMgb3Bwb3NlZCB0byBgWWAgd2hpY2ggaXMgbG9jYWwgd2Vlay1udW1iZXJpbmcgeWVhci5cbiAqICAgYFJgIGlzIHN1cHBvc2VkIHRvIGJlIHVzZWQgaW4gY29uanVuY3Rpb24gd2l0aCBgSWAgYW5kIGBpYFxuICogICBmb3IgdW5pdmVyc2FsIElTTyB3ZWVrLW51bWJlcmluZyBkYXRlLCB3aGVyZWFzXG4gKiAgIGBZYCBpcyBzdXBwb3NlZCB0byBiZSB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggYHdgIGFuZCBgZWBcbiAqICAgZm9yIHdlZWstbnVtYmVyaW5nIGRhdGUgc3BlY2lmaWMgdG8gdGhlIGxvY2FsZS5cbiAqIC0gYFBgIGlzIGxvbmcgbG9jYWxpemVkIGRhdGUgZm9ybWF0XG4gKiAtIGBwYCBpcyBsb25nIGxvY2FsaXplZCB0aW1lIGZvcm1hdFxuICovXG5cbnZhciBmb3JtYXR0ZXJzID0ge1xuICAvLyBFcmFcbiAgRzogZnVuY3Rpb24gRyhkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICB2YXIgZXJhID0gZGF0ZS5nZXRVVENGdWxsWWVhcigpID4gMCA/IDEgOiAwO1xuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIC8vIEFELCBCQ1xuICAgICAgY2FzZSAnRyc6XG4gICAgICBjYXNlICdHRyc6XG4gICAgICBjYXNlICdHR0cnOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZXJhKGVyYSwge1xuICAgICAgICAgIHdpZHRoOiAnYWJicmV2aWF0ZWQnXG4gICAgICAgIH0pO1xuICAgICAgLy8gQSwgQlxuICAgICAgY2FzZSAnR0dHR0cnOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZXJhKGVyYSwge1xuICAgICAgICAgIHdpZHRoOiAnbmFycm93J1xuICAgICAgICB9KTtcbiAgICAgIC8vIEFubm8gRG9taW5pLCBCZWZvcmUgQ2hyaXN0XG4gICAgICBjYXNlICdHR0dHJzpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5lcmEoZXJhLCB7XG4gICAgICAgICAgd2lkdGg6ICd3aWRlJ1xuICAgICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIC8vIFllYXJcbiAgeTogZnVuY3Rpb24geShkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICAvLyBPcmRpbmFsIG51bWJlclxuICAgIGlmICh0b2tlbiA9PT0gJ3lvJykge1xuICAgICAgdmFyIHNpZ25lZFllYXIgPSBkYXRlLmdldFVUQ0Z1bGxZZWFyKCk7XG4gICAgICAvLyBSZXR1cm5zIDEgZm9yIDEgQkMgKHdoaWNoIGlzIHllYXIgMCBpbiBKYXZhU2NyaXB0KVxuICAgICAgdmFyIHllYXIgPSBzaWduZWRZZWFyID4gMCA/IHNpZ25lZFllYXIgOiAxIC0gc2lnbmVkWWVhcjtcbiAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKHllYXIsIHtcbiAgICAgICAgdW5pdDogJ3llYXInXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGxpZ2h0Rm9ybWF0dGVycy55KGRhdGUsIHRva2VuKTtcbiAgfSxcbiAgLy8gTG9jYWwgd2Vlay1udW1iZXJpbmcgeWVhclxuICBZOiBmdW5jdGlvbiBZKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSwgb3B0aW9ucykge1xuICAgIHZhciBzaWduZWRXZWVrWWVhciA9IGdldFVUQ1dlZWtZZWFyKGRhdGUsIG9wdGlvbnMpO1xuICAgIC8vIFJldHVybnMgMSBmb3IgMSBCQyAod2hpY2ggaXMgeWVhciAwIGluIEphdmFTY3JpcHQpXG4gICAgdmFyIHdlZWtZZWFyID0gc2lnbmVkV2Vla1llYXIgPiAwID8gc2lnbmVkV2Vla1llYXIgOiAxIC0gc2lnbmVkV2Vla1llYXI7XG5cbiAgICAvLyBUd28gZGlnaXQgeWVhclxuICAgIGlmICh0b2tlbiA9PT0gJ1lZJykge1xuICAgICAgdmFyIHR3b0RpZ2l0WWVhciA9IHdlZWtZZWFyICUgMTAwO1xuICAgICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyh0d29EaWdpdFllYXIsIDIpO1xuICAgIH1cblxuICAgIC8vIE9yZGluYWwgbnVtYmVyXG4gICAgaWYgKHRva2VuID09PSAnWW8nKSB7XG4gICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcih3ZWVrWWVhciwge1xuICAgICAgICB1bml0OiAneWVhcidcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFBhZGRpbmdcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKHdlZWtZZWFyLCB0b2tlbi5sZW5ndGgpO1xuICB9LFxuICAvLyBJU08gd2Vlay1udW1iZXJpbmcgeWVhclxuICBSOiBmdW5jdGlvbiBSKGRhdGUsIHRva2VuKSB7XG4gICAgdmFyIGlzb1dlZWtZZWFyID0gZ2V0VVRDSVNPV2Vla1llYXIoZGF0ZSk7XG5cbiAgICAvLyBQYWRkaW5nXG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhpc29XZWVrWWVhciwgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcbiAgLy8gRXh0ZW5kZWQgeWVhci4gVGhpcyBpcyBhIHNpbmdsZSBudW1iZXIgZGVzaWduYXRpbmcgdGhlIHllYXIgb2YgdGhpcyBjYWxlbmRhciBzeXN0ZW0uXG4gIC8vIFRoZSBtYWluIGRpZmZlcmVuY2UgYmV0d2VlbiBgeWAgYW5kIGB1YCBsb2NhbGl6ZXJzIGFyZSBCLkMuIHllYXJzOlxuICAvLyB8IFllYXIgfCBgeWAgfCBgdWAgfFxuICAvLyB8LS0tLS0tfC0tLS0tfC0tLS0tfFxuICAvLyB8IEFDIDEgfCAgIDEgfCAgIDEgfFxuICAvLyB8IEJDIDEgfCAgIDEgfCAgIDAgfFxuICAvLyB8IEJDIDIgfCAgIDIgfCAgLTEgfFxuICAvLyBBbHNvIGB5eWAgYWx3YXlzIHJldHVybnMgdGhlIGxhc3QgdHdvIGRpZ2l0cyBvZiBhIHllYXIsXG4gIC8vIHdoaWxlIGB1dWAgcGFkcyBzaW5nbGUgZGlnaXQgeWVhcnMgdG8gMiBjaGFyYWN0ZXJzIGFuZCByZXR1cm5zIG90aGVyIHllYXJzIHVuY2hhbmdlZC5cbiAgdTogZnVuY3Rpb24gdShkYXRlLCB0b2tlbikge1xuICAgIHZhciB5ZWFyID0gZGF0ZS5nZXRVVENGdWxsWWVhcigpO1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoeWVhciwgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcbiAgLy8gUXVhcnRlclxuICBROiBmdW5jdGlvbiBRKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIHZhciBxdWFydGVyID0gTWF0aC5jZWlsKChkYXRlLmdldFVUQ01vbnRoKCkgKyAxKSAvIDMpO1xuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIC8vIDEsIDIsIDMsIDRcbiAgICAgIGNhc2UgJ1EnOlxuICAgICAgICByZXR1cm4gU3RyaW5nKHF1YXJ0ZXIpO1xuICAgICAgLy8gMDEsIDAyLCAwMywgMDRcbiAgICAgIGNhc2UgJ1FRJzpcbiAgICAgICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhxdWFydGVyLCAyKTtcbiAgICAgIC8vIDFzdCwgMm5kLCAzcmQsIDR0aFxuICAgICAgY2FzZSAnUW8nOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihxdWFydGVyLCB7XG4gICAgICAgICAgdW5pdDogJ3F1YXJ0ZXInXG4gICAgICAgIH0pO1xuICAgICAgLy8gUTEsIFEyLCBRMywgUTRcbiAgICAgIGNhc2UgJ1FRUSc6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5xdWFydGVyKHF1YXJ0ZXIsIHtcbiAgICAgICAgICB3aWR0aDogJ2FiYnJldmlhdGVkJyxcbiAgICAgICAgICBjb250ZXh0OiAnZm9ybWF0dGluZydcbiAgICAgICAgfSk7XG4gICAgICAvLyAxLCAyLCAzLCA0IChuYXJyb3cgcXVhcnRlcjsgY291bGQgYmUgbm90IG51bWVyaWNhbClcbiAgICAgIGNhc2UgJ1FRUVFRJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLnF1YXJ0ZXIocXVhcnRlciwge1xuICAgICAgICAgIHdpZHRoOiAnbmFycm93JyxcbiAgICAgICAgICBjb250ZXh0OiAnZm9ybWF0dGluZydcbiAgICAgICAgfSk7XG4gICAgICAvLyAxc3QgcXVhcnRlciwgMm5kIHF1YXJ0ZXIsIC4uLlxuICAgICAgY2FzZSAnUVFRUSc6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbG9jYWxpemUucXVhcnRlcihxdWFydGVyLCB7XG4gICAgICAgICAgd2lkdGg6ICd3aWRlJyxcbiAgICAgICAgICBjb250ZXh0OiAnZm9ybWF0dGluZydcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LFxuICAvLyBTdGFuZC1hbG9uZSBxdWFydGVyXG4gIHE6IGZ1bmN0aW9uIHEoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgdmFyIHF1YXJ0ZXIgPSBNYXRoLmNlaWwoKGRhdGUuZ2V0VVRDTW9udGgoKSArIDEpIC8gMyk7XG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgLy8gMSwgMiwgMywgNFxuICAgICAgY2FzZSAncSc6XG4gICAgICAgIHJldHVybiBTdHJpbmcocXVhcnRlcik7XG4gICAgICAvLyAwMSwgMDIsIDAzLCAwNFxuICAgICAgY2FzZSAncXEnOlxuICAgICAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKHF1YXJ0ZXIsIDIpO1xuICAgICAgLy8gMXN0LCAybmQsIDNyZCwgNHRoXG4gICAgICBjYXNlICdxbyc6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKHF1YXJ0ZXIsIHtcbiAgICAgICAgICB1bml0OiAncXVhcnRlcidcbiAgICAgICAgfSk7XG4gICAgICAvLyBRMSwgUTIsIFEzLCBRNFxuICAgICAgY2FzZSAncXFxJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLnF1YXJ0ZXIocXVhcnRlciwge1xuICAgICAgICAgIHdpZHRoOiAnYWJicmV2aWF0ZWQnLFxuICAgICAgICAgIGNvbnRleHQ6ICdzdGFuZGFsb25lJ1xuICAgICAgICB9KTtcbiAgICAgIC8vIDEsIDIsIDMsIDQgKG5hcnJvdyBxdWFydGVyOyBjb3VsZCBiZSBub3QgbnVtZXJpY2FsKVxuICAgICAgY2FzZSAncXFxcXEnOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUucXVhcnRlcihxdWFydGVyLCB7XG4gICAgICAgICAgd2lkdGg6ICduYXJyb3cnLFxuICAgICAgICAgIGNvbnRleHQ6ICdzdGFuZGFsb25lJ1xuICAgICAgICB9KTtcbiAgICAgIC8vIDFzdCBxdWFydGVyLCAybmQgcXVhcnRlciwgLi4uXG4gICAgICBjYXNlICdxcXFxJzpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5xdWFydGVyKHF1YXJ0ZXIsIHtcbiAgICAgICAgICB3aWR0aDogJ3dpZGUnLFxuICAgICAgICAgIGNvbnRleHQ6ICdzdGFuZGFsb25lJ1xuICAgICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIC8vIE1vbnRoXG4gIE06IGZ1bmN0aW9uIE0oZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgdmFyIG1vbnRoID0gZGF0ZS5nZXRVVENNb250aCgpO1xuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIGNhc2UgJ00nOlxuICAgICAgY2FzZSAnTU0nOlxuICAgICAgICByZXR1cm4gbGlnaHRGb3JtYXR0ZXJzLk0oZGF0ZSwgdG9rZW4pO1xuICAgICAgLy8gMXN0LCAybmQsIC4uLiwgMTJ0aFxuICAgICAgY2FzZSAnTW8nOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihtb250aCArIDEsIHtcbiAgICAgICAgICB1bml0OiAnbW9udGgnXG4gICAgICAgIH0pO1xuICAgICAgLy8gSmFuLCBGZWIsIC4uLiwgRGVjXG4gICAgICBjYXNlICdNTU0nOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUubW9udGgobW9udGgsIHtcbiAgICAgICAgICB3aWR0aDogJ2FiYnJldmlhdGVkJyxcbiAgICAgICAgICBjb250ZXh0OiAnZm9ybWF0dGluZydcbiAgICAgICAgfSk7XG4gICAgICAvLyBKLCBGLCAuLi4sIERcbiAgICAgIGNhc2UgJ01NTU1NJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLm1vbnRoKG1vbnRoLCB7XG4gICAgICAgICAgd2lkdGg6ICduYXJyb3cnLFxuICAgICAgICAgIGNvbnRleHQ6ICdmb3JtYXR0aW5nJ1xuICAgICAgICB9KTtcbiAgICAgIC8vIEphbnVhcnksIEZlYnJ1YXJ5LCAuLi4sIERlY2VtYmVyXG4gICAgICBjYXNlICdNTU1NJzpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5tb250aChtb250aCwge1xuICAgICAgICAgIHdpZHRoOiAnd2lkZScsXG4gICAgICAgICAgY29udGV4dDogJ2Zvcm1hdHRpbmcnXG4gICAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgLy8gU3RhbmQtYWxvbmUgbW9udGhcbiAgTDogZnVuY3Rpb24gTChkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICB2YXIgbW9udGggPSBkYXRlLmdldFVUQ01vbnRoKCk7XG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgLy8gMSwgMiwgLi4uLCAxMlxuICAgICAgY2FzZSAnTCc6XG4gICAgICAgIHJldHVybiBTdHJpbmcobW9udGggKyAxKTtcbiAgICAgIC8vIDAxLCAwMiwgLi4uLCAxMlxuICAgICAgY2FzZSAnTEwnOlxuICAgICAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKG1vbnRoICsgMSwgMik7XG4gICAgICAvLyAxc3QsIDJuZCwgLi4uLCAxMnRoXG4gICAgICBjYXNlICdMbyc6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKG1vbnRoICsgMSwge1xuICAgICAgICAgIHVuaXQ6ICdtb250aCdcbiAgICAgICAgfSk7XG4gICAgICAvLyBKYW4sIEZlYiwgLi4uLCBEZWNcbiAgICAgIGNhc2UgJ0xMTCc6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5tb250aChtb250aCwge1xuICAgICAgICAgIHdpZHRoOiAnYWJicmV2aWF0ZWQnLFxuICAgICAgICAgIGNvbnRleHQ6ICdzdGFuZGFsb25lJ1xuICAgICAgICB9KTtcbiAgICAgIC8vIEosIEYsIC4uLiwgRFxuICAgICAgY2FzZSAnTExMTEwnOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUubW9udGgobW9udGgsIHtcbiAgICAgICAgICB3aWR0aDogJ25hcnJvdycsXG4gICAgICAgICAgY29udGV4dDogJ3N0YW5kYWxvbmUnXG4gICAgICAgIH0pO1xuICAgICAgLy8gSmFudWFyeSwgRmVicnVhcnksIC4uLiwgRGVjZW1iZXJcbiAgICAgIGNhc2UgJ0xMTEwnOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLm1vbnRoKG1vbnRoLCB7XG4gICAgICAgICAgd2lkdGg6ICd3aWRlJyxcbiAgICAgICAgICBjb250ZXh0OiAnc3RhbmRhbG9uZSdcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LFxuICAvLyBMb2NhbCB3ZWVrIG9mIHllYXJcbiAgdzogZnVuY3Rpb24gdyhkYXRlLCB0b2tlbiwgbG9jYWxpemUsIG9wdGlvbnMpIHtcbiAgICB2YXIgd2VlayA9IGdldFVUQ1dlZWsoZGF0ZSwgb3B0aW9ucyk7XG4gICAgaWYgKHRva2VuID09PSAnd28nKSB7XG4gICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcih3ZWVrLCB7XG4gICAgICAgIHVuaXQ6ICd3ZWVrJ1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3Mod2VlaywgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcbiAgLy8gSVNPIHdlZWsgb2YgeWVhclxuICBJOiBmdW5jdGlvbiBJKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIHZhciBpc29XZWVrID0gZ2V0VVRDSVNPV2VlayhkYXRlKTtcbiAgICBpZiAodG9rZW4gPT09ICdJbycpIHtcbiAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKGlzb1dlZWssIHtcbiAgICAgICAgdW5pdDogJ3dlZWsnXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhpc29XZWVrLCB0b2tlbi5sZW5ndGgpO1xuICB9LFxuICAvLyBEYXkgb2YgdGhlIG1vbnRoXG4gIGQ6IGZ1bmN0aW9uIGQoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgaWYgKHRva2VuID09PSAnZG8nKSB7XG4gICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihkYXRlLmdldFVUQ0RhdGUoKSwge1xuICAgICAgICB1bml0OiAnZGF0ZSdcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gbGlnaHRGb3JtYXR0ZXJzLmQoZGF0ZSwgdG9rZW4pO1xuICB9LFxuICAvLyBEYXkgb2YgeWVhclxuICBEOiBmdW5jdGlvbiBEKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIHZhciBkYXlPZlllYXIgPSBnZXRVVENEYXlPZlllYXIoZGF0ZSk7XG4gICAgaWYgKHRva2VuID09PSAnRG8nKSB7XG4gICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihkYXlPZlllYXIsIHtcbiAgICAgICAgdW5pdDogJ2RheU9mWWVhcidcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGRheU9mWWVhciwgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcbiAgLy8gRGF5IG9mIHdlZWtcbiAgRTogZnVuY3Rpb24gRShkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICB2YXIgZGF5T2ZXZWVrID0gZGF0ZS5nZXRVVENEYXkoKTtcbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICAvLyBUdWVcbiAgICAgIGNhc2UgJ0UnOlxuICAgICAgY2FzZSAnRUUnOlxuICAgICAgY2FzZSAnRUVFJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogJ2FiYnJldmlhdGVkJyxcbiAgICAgICAgICBjb250ZXh0OiAnZm9ybWF0dGluZydcbiAgICAgICAgfSk7XG4gICAgICAvLyBUXG4gICAgICBjYXNlICdFRUVFRSc6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXkoZGF5T2ZXZWVrLCB7XG4gICAgICAgICAgd2lkdGg6ICduYXJyb3cnLFxuICAgICAgICAgIGNvbnRleHQ6ICdmb3JtYXR0aW5nJ1xuICAgICAgICB9KTtcbiAgICAgIC8vIFR1XG4gICAgICBjYXNlICdFRUVFRUUnOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiAnc2hvcnQnLFxuICAgICAgICAgIGNvbnRleHQ6ICdmb3JtYXR0aW5nJ1xuICAgICAgICB9KTtcbiAgICAgIC8vIFR1ZXNkYXlcbiAgICAgIGNhc2UgJ0VFRUUnOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogJ3dpZGUnLFxuICAgICAgICAgIGNvbnRleHQ6ICdmb3JtYXR0aW5nJ1xuICAgICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIC8vIExvY2FsIGRheSBvZiB3ZWVrXG4gIGU6IGZ1bmN0aW9uIGUoZGF0ZSwgdG9rZW4sIGxvY2FsaXplLCBvcHRpb25zKSB7XG4gICAgdmFyIGRheU9mV2VlayA9IGRhdGUuZ2V0VVRDRGF5KCk7XG4gICAgdmFyIGxvY2FsRGF5T2ZXZWVrID0gKGRheU9mV2VlayAtIG9wdGlvbnMud2Vla1N0YXJ0c09uICsgOCkgJSA3IHx8IDc7XG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgLy8gTnVtZXJpY2FsIHZhbHVlIChOdGggZGF5IG9mIHdlZWsgd2l0aCBjdXJyZW50IGxvY2FsZSBvciB3ZWVrU3RhcnRzT24pXG4gICAgICBjYXNlICdlJzpcbiAgICAgICAgcmV0dXJuIFN0cmluZyhsb2NhbERheU9mV2Vlayk7XG4gICAgICAvLyBQYWRkZWQgbnVtZXJpY2FsIHZhbHVlXG4gICAgICBjYXNlICdlZSc6XG4gICAgICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MobG9jYWxEYXlPZldlZWssIDIpO1xuICAgICAgLy8gMXN0LCAybmQsIC4uLiwgN3RoXG4gICAgICBjYXNlICdlbyc6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKGxvY2FsRGF5T2ZXZWVrLCB7XG4gICAgICAgICAgdW5pdDogJ2RheSdcbiAgICAgICAgfSk7XG4gICAgICBjYXNlICdlZWUnOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiAnYWJicmV2aWF0ZWQnLFxuICAgICAgICAgIGNvbnRleHQ6ICdmb3JtYXR0aW5nJ1xuICAgICAgICB9KTtcbiAgICAgIC8vIFRcbiAgICAgIGNhc2UgJ2VlZWVlJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogJ25hcnJvdycsXG4gICAgICAgICAgY29udGV4dDogJ2Zvcm1hdHRpbmcnXG4gICAgICAgIH0pO1xuICAgICAgLy8gVHVcbiAgICAgIGNhc2UgJ2VlZWVlZSc6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXkoZGF5T2ZXZWVrLCB7XG4gICAgICAgICAgd2lkdGg6ICdzaG9ydCcsXG4gICAgICAgICAgY29udGV4dDogJ2Zvcm1hdHRpbmcnXG4gICAgICAgIH0pO1xuICAgICAgLy8gVHVlc2RheVxuICAgICAgY2FzZSAnZWVlZSc6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiAnd2lkZScsXG4gICAgICAgICAgY29udGV4dDogJ2Zvcm1hdHRpbmcnXG4gICAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgLy8gU3RhbmQtYWxvbmUgbG9jYWwgZGF5IG9mIHdlZWtcbiAgYzogZnVuY3Rpb24gYyhkYXRlLCB0b2tlbiwgbG9jYWxpemUsIG9wdGlvbnMpIHtcbiAgICB2YXIgZGF5T2ZXZWVrID0gZGF0ZS5nZXRVVENEYXkoKTtcbiAgICB2YXIgbG9jYWxEYXlPZldlZWsgPSAoZGF5T2ZXZWVrIC0gb3B0aW9ucy53ZWVrU3RhcnRzT24gKyA4KSAlIDcgfHwgNztcbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICAvLyBOdW1lcmljYWwgdmFsdWUgKHNhbWUgYXMgaW4gYGVgKVxuICAgICAgY2FzZSAnYyc6XG4gICAgICAgIHJldHVybiBTdHJpbmcobG9jYWxEYXlPZldlZWspO1xuICAgICAgLy8gUGFkZGVkIG51bWVyaWNhbCB2YWx1ZVxuICAgICAgY2FzZSAnY2MnOlxuICAgICAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGxvY2FsRGF5T2ZXZWVrLCB0b2tlbi5sZW5ndGgpO1xuICAgICAgLy8gMXN0LCAybmQsIC4uLiwgN3RoXG4gICAgICBjYXNlICdjbyc6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKGxvY2FsRGF5T2ZXZWVrLCB7XG4gICAgICAgICAgdW5pdDogJ2RheSdcbiAgICAgICAgfSk7XG4gICAgICBjYXNlICdjY2MnOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiAnYWJicmV2aWF0ZWQnLFxuICAgICAgICAgIGNvbnRleHQ6ICdzdGFuZGFsb25lJ1xuICAgICAgICB9KTtcbiAgICAgIC8vIFRcbiAgICAgIGNhc2UgJ2NjY2NjJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogJ25hcnJvdycsXG4gICAgICAgICAgY29udGV4dDogJ3N0YW5kYWxvbmUnXG4gICAgICAgIH0pO1xuICAgICAgLy8gVHVcbiAgICAgIGNhc2UgJ2NjY2NjYyc6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXkoZGF5T2ZXZWVrLCB7XG4gICAgICAgICAgd2lkdGg6ICdzaG9ydCcsXG4gICAgICAgICAgY29udGV4dDogJ3N0YW5kYWxvbmUnXG4gICAgICAgIH0pO1xuICAgICAgLy8gVHVlc2RheVxuICAgICAgY2FzZSAnY2NjYyc6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiAnd2lkZScsXG4gICAgICAgICAgY29udGV4dDogJ3N0YW5kYWxvbmUnXG4gICAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgLy8gSVNPIGRheSBvZiB3ZWVrXG4gIGk6IGZ1bmN0aW9uIGkoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgdmFyIGRheU9mV2VlayA9IGRhdGUuZ2V0VVRDRGF5KCk7XG4gICAgdmFyIGlzb0RheU9mV2VlayA9IGRheU9mV2VlayA9PT0gMCA/IDcgOiBkYXlPZldlZWs7XG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgLy8gMlxuICAgICAgY2FzZSAnaSc6XG4gICAgICAgIHJldHVybiBTdHJpbmcoaXNvRGF5T2ZXZWVrKTtcbiAgICAgIC8vIDAyXG4gICAgICBjYXNlICdpaSc6XG4gICAgICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoaXNvRGF5T2ZXZWVrLCB0b2tlbi5sZW5ndGgpO1xuICAgICAgLy8gMm5kXG4gICAgICBjYXNlICdpbyc6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKGlzb0RheU9mV2Vlaywge1xuICAgICAgICAgIHVuaXQ6ICdkYXknXG4gICAgICAgIH0pO1xuICAgICAgLy8gVHVlXG4gICAgICBjYXNlICdpaWknOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiAnYWJicmV2aWF0ZWQnLFxuICAgICAgICAgIGNvbnRleHQ6ICdmb3JtYXR0aW5nJ1xuICAgICAgICB9KTtcbiAgICAgIC8vIFRcbiAgICAgIGNhc2UgJ2lpaWlpJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogJ25hcnJvdycsXG4gICAgICAgICAgY29udGV4dDogJ2Zvcm1hdHRpbmcnXG4gICAgICAgIH0pO1xuICAgICAgLy8gVHVcbiAgICAgIGNhc2UgJ2lpaWlpaSc6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXkoZGF5T2ZXZWVrLCB7XG4gICAgICAgICAgd2lkdGg6ICdzaG9ydCcsXG4gICAgICAgICAgY29udGV4dDogJ2Zvcm1hdHRpbmcnXG4gICAgICAgIH0pO1xuICAgICAgLy8gVHVlc2RheVxuICAgICAgY2FzZSAnaWlpaSc6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiAnd2lkZScsXG4gICAgICAgICAgY29udGV4dDogJ2Zvcm1hdHRpbmcnXG4gICAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgLy8gQU0gb3IgUE1cbiAgYTogZnVuY3Rpb24gYShkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICB2YXIgaG91cnMgPSBkYXRlLmdldFVUQ0hvdXJzKCk7XG4gICAgdmFyIGRheVBlcmlvZEVudW1WYWx1ZSA9IGhvdXJzIC8gMTIgPj0gMSA/ICdwbScgOiAnYW0nO1xuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIGNhc2UgJ2EnOlxuICAgICAgY2FzZSAnYWEnOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5UGVyaW9kKGRheVBlcmlvZEVudW1WYWx1ZSwge1xuICAgICAgICAgIHdpZHRoOiAnYWJicmV2aWF0ZWQnLFxuICAgICAgICAgIGNvbnRleHQ6ICdmb3JtYXR0aW5nJ1xuICAgICAgICB9KTtcbiAgICAgIGNhc2UgJ2FhYSc6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXlQZXJpb2QoZGF5UGVyaW9kRW51bVZhbHVlLCB7XG4gICAgICAgICAgd2lkdGg6ICdhYmJyZXZpYXRlZCcsXG4gICAgICAgICAgY29udGV4dDogJ2Zvcm1hdHRpbmcnXG4gICAgICAgIH0pLnRvTG93ZXJDYXNlKCk7XG4gICAgICBjYXNlICdhYWFhYSc6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXlQZXJpb2QoZGF5UGVyaW9kRW51bVZhbHVlLCB7XG4gICAgICAgICAgd2lkdGg6ICduYXJyb3cnLFxuICAgICAgICAgIGNvbnRleHQ6ICdmb3JtYXR0aW5nJ1xuICAgICAgICB9KTtcbiAgICAgIGNhc2UgJ2FhYWEnOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheVBlcmlvZChkYXlQZXJpb2RFbnVtVmFsdWUsIHtcbiAgICAgICAgICB3aWR0aDogJ3dpZGUnLFxuICAgICAgICAgIGNvbnRleHQ6ICdmb3JtYXR0aW5nJ1xuICAgICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIC8vIEFNLCBQTSwgbWlkbmlnaHQsIG5vb25cbiAgYjogZnVuY3Rpb24gYihkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICB2YXIgaG91cnMgPSBkYXRlLmdldFVUQ0hvdXJzKCk7XG4gICAgdmFyIGRheVBlcmlvZEVudW1WYWx1ZTtcbiAgICBpZiAoaG91cnMgPT09IDEyKSB7XG4gICAgICBkYXlQZXJpb2RFbnVtVmFsdWUgPSBkYXlQZXJpb2RFbnVtLm5vb247XG4gICAgfSBlbHNlIGlmIChob3VycyA9PT0gMCkge1xuICAgICAgZGF5UGVyaW9kRW51bVZhbHVlID0gZGF5UGVyaW9kRW51bS5taWRuaWdodDtcbiAgICB9IGVsc2Uge1xuICAgICAgZGF5UGVyaW9kRW51bVZhbHVlID0gaG91cnMgLyAxMiA+PSAxID8gJ3BtJyA6ICdhbSc7XG4gICAgfVxuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIGNhc2UgJ2InOlxuICAgICAgY2FzZSAnYmInOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5UGVyaW9kKGRheVBlcmlvZEVudW1WYWx1ZSwge1xuICAgICAgICAgIHdpZHRoOiAnYWJicmV2aWF0ZWQnLFxuICAgICAgICAgIGNvbnRleHQ6ICdmb3JtYXR0aW5nJ1xuICAgICAgICB9KTtcbiAgICAgIGNhc2UgJ2JiYic6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXlQZXJpb2QoZGF5UGVyaW9kRW51bVZhbHVlLCB7XG4gICAgICAgICAgd2lkdGg6ICdhYmJyZXZpYXRlZCcsXG4gICAgICAgICAgY29udGV4dDogJ2Zvcm1hdHRpbmcnXG4gICAgICAgIH0pLnRvTG93ZXJDYXNlKCk7XG4gICAgICBjYXNlICdiYmJiYic6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXlQZXJpb2QoZGF5UGVyaW9kRW51bVZhbHVlLCB7XG4gICAgICAgICAgd2lkdGg6ICduYXJyb3cnLFxuICAgICAgICAgIGNvbnRleHQ6ICdmb3JtYXR0aW5nJ1xuICAgICAgICB9KTtcbiAgICAgIGNhc2UgJ2JiYmInOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheVBlcmlvZChkYXlQZXJpb2RFbnVtVmFsdWUsIHtcbiAgICAgICAgICB3aWR0aDogJ3dpZGUnLFxuICAgICAgICAgIGNvbnRleHQ6ICdmb3JtYXR0aW5nJ1xuICAgICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIC8vIGluIHRoZSBtb3JuaW5nLCBpbiB0aGUgYWZ0ZXJub29uLCBpbiB0aGUgZXZlbmluZywgYXQgbmlnaHRcbiAgQjogZnVuY3Rpb24gQihkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICB2YXIgaG91cnMgPSBkYXRlLmdldFVUQ0hvdXJzKCk7XG4gICAgdmFyIGRheVBlcmlvZEVudW1WYWx1ZTtcbiAgICBpZiAoaG91cnMgPj0gMTcpIHtcbiAgICAgIGRheVBlcmlvZEVudW1WYWx1ZSA9IGRheVBlcmlvZEVudW0uZXZlbmluZztcbiAgICB9IGVsc2UgaWYgKGhvdXJzID49IDEyKSB7XG4gICAgICBkYXlQZXJpb2RFbnVtVmFsdWUgPSBkYXlQZXJpb2RFbnVtLmFmdGVybm9vbjtcbiAgICB9IGVsc2UgaWYgKGhvdXJzID49IDQpIHtcbiAgICAgIGRheVBlcmlvZEVudW1WYWx1ZSA9IGRheVBlcmlvZEVudW0ubW9ybmluZztcbiAgICB9IGVsc2Uge1xuICAgICAgZGF5UGVyaW9kRW51bVZhbHVlID0gZGF5UGVyaW9kRW51bS5uaWdodDtcbiAgICB9XG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgY2FzZSAnQic6XG4gICAgICBjYXNlICdCQic6XG4gICAgICBjYXNlICdCQkInOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5UGVyaW9kKGRheVBlcmlvZEVudW1WYWx1ZSwge1xuICAgICAgICAgIHdpZHRoOiAnYWJicmV2aWF0ZWQnLFxuICAgICAgICAgIGNvbnRleHQ6ICdmb3JtYXR0aW5nJ1xuICAgICAgICB9KTtcbiAgICAgIGNhc2UgJ0JCQkJCJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheVBlcmlvZChkYXlQZXJpb2RFbnVtVmFsdWUsIHtcbiAgICAgICAgICB3aWR0aDogJ25hcnJvdycsXG4gICAgICAgICAgY29udGV4dDogJ2Zvcm1hdHRpbmcnXG4gICAgICAgIH0pO1xuICAgICAgY2FzZSAnQkJCQic6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5UGVyaW9kKGRheVBlcmlvZEVudW1WYWx1ZSwge1xuICAgICAgICAgIHdpZHRoOiAnd2lkZScsXG4gICAgICAgICAgY29udGV4dDogJ2Zvcm1hdHRpbmcnXG4gICAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgLy8gSG91ciBbMS0xMl1cbiAgaDogZnVuY3Rpb24gaChkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICBpZiAodG9rZW4gPT09ICdobycpIHtcbiAgICAgIHZhciBob3VycyA9IGRhdGUuZ2V0VVRDSG91cnMoKSAlIDEyO1xuICAgICAgaWYgKGhvdXJzID09PSAwKSBob3VycyA9IDEyO1xuICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIoaG91cnMsIHtcbiAgICAgICAgdW5pdDogJ2hvdXInXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGxpZ2h0Rm9ybWF0dGVycy5oKGRhdGUsIHRva2VuKTtcbiAgfSxcbiAgLy8gSG91ciBbMC0yM11cbiAgSDogZnVuY3Rpb24gSChkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICBpZiAodG9rZW4gPT09ICdIbycpIHtcbiAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKGRhdGUuZ2V0VVRDSG91cnMoKSwge1xuICAgICAgICB1bml0OiAnaG91cidcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gbGlnaHRGb3JtYXR0ZXJzLkgoZGF0ZSwgdG9rZW4pO1xuICB9LFxuICAvLyBIb3VyIFswLTExXVxuICBLOiBmdW5jdGlvbiBLKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIHZhciBob3VycyA9IGRhdGUuZ2V0VVRDSG91cnMoKSAlIDEyO1xuICAgIGlmICh0b2tlbiA9PT0gJ0tvJykge1xuICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIoaG91cnMsIHtcbiAgICAgICAgdW5pdDogJ2hvdXInXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhob3VycywgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcbiAgLy8gSG91ciBbMS0yNF1cbiAgazogZnVuY3Rpb24gayhkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICB2YXIgaG91cnMgPSBkYXRlLmdldFVUQ0hvdXJzKCk7XG4gICAgaWYgKGhvdXJzID09PSAwKSBob3VycyA9IDI0O1xuICAgIGlmICh0b2tlbiA9PT0gJ2tvJykge1xuICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIoaG91cnMsIHtcbiAgICAgICAgdW5pdDogJ2hvdXInXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhob3VycywgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcbiAgLy8gTWludXRlXG4gIG06IGZ1bmN0aW9uIG0oZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgaWYgKHRva2VuID09PSAnbW8nKSB7XG4gICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihkYXRlLmdldFVUQ01pbnV0ZXMoKSwge1xuICAgICAgICB1bml0OiAnbWludXRlJ1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBsaWdodEZvcm1hdHRlcnMubShkYXRlLCB0b2tlbik7XG4gIH0sXG4gIC8vIFNlY29uZFxuICBzOiBmdW5jdGlvbiBzKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIGlmICh0b2tlbiA9PT0gJ3NvJykge1xuICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIoZGF0ZS5nZXRVVENTZWNvbmRzKCksIHtcbiAgICAgICAgdW5pdDogJ3NlY29uZCdcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gbGlnaHRGb3JtYXR0ZXJzLnMoZGF0ZSwgdG9rZW4pO1xuICB9LFxuICAvLyBGcmFjdGlvbiBvZiBzZWNvbmRcbiAgUzogZnVuY3Rpb24gUyhkYXRlLCB0b2tlbikge1xuICAgIHJldHVybiBsaWdodEZvcm1hdHRlcnMuUyhkYXRlLCB0b2tlbik7XG4gIH0sXG4gIC8vIFRpbWV6b25lIChJU08tODYwMS4gSWYgb2Zmc2V0IGlzIDAsIG91dHB1dCBpcyBhbHdheXMgYCdaJ2ApXG4gIFg6IGZ1bmN0aW9uIFgoZGF0ZSwgdG9rZW4sIF9sb2NhbGl6ZSwgb3B0aW9ucykge1xuICAgIHZhciBvcmlnaW5hbERhdGUgPSBvcHRpb25zLl9vcmlnaW5hbERhdGUgfHwgZGF0ZTtcbiAgICB2YXIgdGltZXpvbmVPZmZzZXQgPSBvcmlnaW5hbERhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKTtcbiAgICBpZiAodGltZXpvbmVPZmZzZXQgPT09IDApIHtcbiAgICAgIHJldHVybiAnWic7XG4gICAgfVxuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIC8vIEhvdXJzIGFuZCBvcHRpb25hbCBtaW51dGVzXG4gICAgICBjYXNlICdYJzpcbiAgICAgICAgcmV0dXJuIGZvcm1hdFRpbWV6b25lV2l0aE9wdGlvbmFsTWludXRlcyh0aW1lem9uZU9mZnNldCk7XG5cbiAgICAgIC8vIEhvdXJzLCBtaW51dGVzIGFuZCBvcHRpb25hbCBzZWNvbmRzIHdpdGhvdXQgYDpgIGRlbGltaXRlclxuICAgICAgLy8gTm90ZTogbmVpdGhlciBJU08tODYwMSBub3IgSmF2YVNjcmlwdCBzdXBwb3J0cyBzZWNvbmRzIGluIHRpbWV6b25lIG9mZnNldHNcbiAgICAgIC8vIHNvIHRoaXMgdG9rZW4gYWx3YXlzIGhhcyB0aGUgc2FtZSBvdXRwdXQgYXMgYFhYYFxuICAgICAgY2FzZSAnWFhYWCc6XG4gICAgICBjYXNlICdYWCc6XG4gICAgICAgIC8vIEhvdXJzIGFuZCBtaW51dGVzIHdpdGhvdXQgYDpgIGRlbGltaXRlclxuICAgICAgICByZXR1cm4gZm9ybWF0VGltZXpvbmUodGltZXpvbmVPZmZzZXQpO1xuXG4gICAgICAvLyBIb3VycywgbWludXRlcyBhbmQgb3B0aW9uYWwgc2Vjb25kcyB3aXRoIGA6YCBkZWxpbWl0ZXJcbiAgICAgIC8vIE5vdGU6IG5laXRoZXIgSVNPLTg2MDEgbm9yIEphdmFTY3JpcHQgc3VwcG9ydHMgc2Vjb25kcyBpbiB0aW1lem9uZSBvZmZzZXRzXG4gICAgICAvLyBzbyB0aGlzIHRva2VuIGFsd2F5cyBoYXMgdGhlIHNhbWUgb3V0cHV0IGFzIGBYWFhgXG4gICAgICBjYXNlICdYWFhYWCc6XG4gICAgICBjYXNlICdYWFgnOiAvLyBIb3VycyBhbmQgbWludXRlcyB3aXRoIGA6YCBkZWxpbWl0ZXJcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBmb3JtYXRUaW1lem9uZSh0aW1lem9uZU9mZnNldCwgJzonKTtcbiAgICB9XG4gIH0sXG4gIC8vIFRpbWV6b25lIChJU08tODYwMS4gSWYgb2Zmc2V0IGlzIDAsIG91dHB1dCBpcyBgJyswMDowMCdgIG9yIGVxdWl2YWxlbnQpXG4gIHg6IGZ1bmN0aW9uIHgoZGF0ZSwgdG9rZW4sIF9sb2NhbGl6ZSwgb3B0aW9ucykge1xuICAgIHZhciBvcmlnaW5hbERhdGUgPSBvcHRpb25zLl9vcmlnaW5hbERhdGUgfHwgZGF0ZTtcbiAgICB2YXIgdGltZXpvbmVPZmZzZXQgPSBvcmlnaW5hbERhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKTtcbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICAvLyBIb3VycyBhbmQgb3B0aW9uYWwgbWludXRlc1xuICAgICAgY2FzZSAneCc6XG4gICAgICAgIHJldHVybiBmb3JtYXRUaW1lem9uZVdpdGhPcHRpb25hbE1pbnV0ZXModGltZXpvbmVPZmZzZXQpO1xuXG4gICAgICAvLyBIb3VycywgbWludXRlcyBhbmQgb3B0aW9uYWwgc2Vjb25kcyB3aXRob3V0IGA6YCBkZWxpbWl0ZXJcbiAgICAgIC8vIE5vdGU6IG5laXRoZXIgSVNPLTg2MDEgbm9yIEphdmFTY3JpcHQgc3VwcG9ydHMgc2Vjb25kcyBpbiB0aW1lem9uZSBvZmZzZXRzXG4gICAgICAvLyBzbyB0aGlzIHRva2VuIGFsd2F5cyBoYXMgdGhlIHNhbWUgb3V0cHV0IGFzIGB4eGBcbiAgICAgIGNhc2UgJ3h4eHgnOlxuICAgICAgY2FzZSAneHgnOlxuICAgICAgICAvLyBIb3VycyBhbmQgbWludXRlcyB3aXRob3V0IGA6YCBkZWxpbWl0ZXJcbiAgICAgICAgcmV0dXJuIGZvcm1hdFRpbWV6b25lKHRpbWV6b25lT2Zmc2V0KTtcblxuICAgICAgLy8gSG91cnMsIG1pbnV0ZXMgYW5kIG9wdGlvbmFsIHNlY29uZHMgd2l0aCBgOmAgZGVsaW1pdGVyXG4gICAgICAvLyBOb3RlOiBuZWl0aGVyIElTTy04NjAxIG5vciBKYXZhU2NyaXB0IHN1cHBvcnRzIHNlY29uZHMgaW4gdGltZXpvbmUgb2Zmc2V0c1xuICAgICAgLy8gc28gdGhpcyB0b2tlbiBhbHdheXMgaGFzIHRoZSBzYW1lIG91dHB1dCBhcyBgeHh4YFxuICAgICAgY2FzZSAneHh4eHgnOlxuICAgICAgY2FzZSAneHh4JzogLy8gSG91cnMgYW5kIG1pbnV0ZXMgd2l0aCBgOmAgZGVsaW1pdGVyXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZm9ybWF0VGltZXpvbmUodGltZXpvbmVPZmZzZXQsICc6Jyk7XG4gICAgfVxuICB9LFxuICAvLyBUaW1lem9uZSAoR01UKVxuICBPOiBmdW5jdGlvbiBPKGRhdGUsIHRva2VuLCBfbG9jYWxpemUsIG9wdGlvbnMpIHtcbiAgICB2YXIgb3JpZ2luYWxEYXRlID0gb3B0aW9ucy5fb3JpZ2luYWxEYXRlIHx8IGRhdGU7XG4gICAgdmFyIHRpbWV6b25lT2Zmc2V0ID0gb3JpZ2luYWxEYXRlLmdldFRpbWV6b25lT2Zmc2V0KCk7XG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgLy8gU2hvcnRcbiAgICAgIGNhc2UgJ08nOlxuICAgICAgY2FzZSAnT08nOlxuICAgICAgY2FzZSAnT09PJzpcbiAgICAgICAgcmV0dXJuICdHTVQnICsgZm9ybWF0VGltZXpvbmVTaG9ydCh0aW1lem9uZU9mZnNldCwgJzonKTtcbiAgICAgIC8vIExvbmdcbiAgICAgIGNhc2UgJ09PT08nOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuICdHTVQnICsgZm9ybWF0VGltZXpvbmUodGltZXpvbmVPZmZzZXQsICc6Jyk7XG4gICAgfVxuICB9LFxuICAvLyBUaW1lem9uZSAoc3BlY2lmaWMgbm9uLWxvY2F0aW9uKVxuICB6OiBmdW5jdGlvbiB6KGRhdGUsIHRva2VuLCBfbG9jYWxpemUsIG9wdGlvbnMpIHtcbiAgICB2YXIgb3JpZ2luYWxEYXRlID0gb3B0aW9ucy5fb3JpZ2luYWxEYXRlIHx8IGRhdGU7XG4gICAgdmFyIHRpbWV6b25lT2Zmc2V0ID0gb3JpZ2luYWxEYXRlLmdldFRpbWV6b25lT2Zmc2V0KCk7XG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgLy8gU2hvcnRcbiAgICAgIGNhc2UgJ3onOlxuICAgICAgY2FzZSAnenonOlxuICAgICAgY2FzZSAnenp6JzpcbiAgICAgICAgcmV0dXJuICdHTVQnICsgZm9ybWF0VGltZXpvbmVTaG9ydCh0aW1lem9uZU9mZnNldCwgJzonKTtcbiAgICAgIC8vIExvbmdcbiAgICAgIGNhc2UgJ3p6enonOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuICdHTVQnICsgZm9ybWF0VGltZXpvbmUodGltZXpvbmVPZmZzZXQsICc6Jyk7XG4gICAgfVxuICB9LFxuICAvLyBTZWNvbmRzIHRpbWVzdGFtcFxuICB0OiBmdW5jdGlvbiB0KGRhdGUsIHRva2VuLCBfbG9jYWxpemUsIG9wdGlvbnMpIHtcbiAgICB2YXIgb3JpZ2luYWxEYXRlID0gb3B0aW9ucy5fb3JpZ2luYWxEYXRlIHx8IGRhdGU7XG4gICAgdmFyIHRpbWVzdGFtcCA9IE1hdGguZmxvb3Iob3JpZ2luYWxEYXRlLmdldFRpbWUoKSAvIDEwMDApO1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3ModGltZXN0YW1wLCB0b2tlbi5sZW5ndGgpO1xuICB9LFxuICAvLyBNaWxsaXNlY29uZHMgdGltZXN0YW1wXG4gIFQ6IGZ1bmN0aW9uIFQoZGF0ZSwgdG9rZW4sIF9sb2NhbGl6ZSwgb3B0aW9ucykge1xuICAgIHZhciBvcmlnaW5hbERhdGUgPSBvcHRpb25zLl9vcmlnaW5hbERhdGUgfHwgZGF0ZTtcbiAgICB2YXIgdGltZXN0YW1wID0gb3JpZ2luYWxEYXRlLmdldFRpbWUoKTtcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKHRpbWVzdGFtcCwgdG9rZW4ubGVuZ3RoKTtcbiAgfVxufTtcbmZ1bmN0aW9uIGZvcm1hdFRpbWV6b25lU2hvcnQob2Zmc2V0LCBkaXJ0eURlbGltaXRlcikge1xuICB2YXIgc2lnbiA9IG9mZnNldCA+IDAgPyAnLScgOiAnKyc7XG4gIHZhciBhYnNPZmZzZXQgPSBNYXRoLmFicyhvZmZzZXQpO1xuICB2YXIgaG91cnMgPSBNYXRoLmZsb29yKGFic09mZnNldCAvIDYwKTtcbiAgdmFyIG1pbnV0ZXMgPSBhYnNPZmZzZXQgJSA2MDtcbiAgaWYgKG1pbnV0ZXMgPT09IDApIHtcbiAgICByZXR1cm4gc2lnbiArIFN0cmluZyhob3Vycyk7XG4gIH1cbiAgdmFyIGRlbGltaXRlciA9IGRpcnR5RGVsaW1pdGVyIHx8ICcnO1xuICByZXR1cm4gc2lnbiArIFN0cmluZyhob3VycykgKyBkZWxpbWl0ZXIgKyBhZGRMZWFkaW5nWmVyb3MobWludXRlcywgMik7XG59XG5mdW5jdGlvbiBmb3JtYXRUaW1lem9uZVdpdGhPcHRpb25hbE1pbnV0ZXMob2Zmc2V0LCBkaXJ0eURlbGltaXRlcikge1xuICBpZiAob2Zmc2V0ICUgNjAgPT09IDApIHtcbiAgICB2YXIgc2lnbiA9IG9mZnNldCA+IDAgPyAnLScgOiAnKyc7XG4gICAgcmV0dXJuIHNpZ24gKyBhZGRMZWFkaW5nWmVyb3MoTWF0aC5hYnMob2Zmc2V0KSAvIDYwLCAyKTtcbiAgfVxuICByZXR1cm4gZm9ybWF0VGltZXpvbmUob2Zmc2V0LCBkaXJ0eURlbGltaXRlcik7XG59XG5mdW5jdGlvbiBmb3JtYXRUaW1lem9uZShvZmZzZXQsIGRpcnR5RGVsaW1pdGVyKSB7XG4gIHZhciBkZWxpbWl0ZXIgPSBkaXJ0eURlbGltaXRlciB8fCAnJztcbiAgdmFyIHNpZ24gPSBvZmZzZXQgPiAwID8gJy0nIDogJysnO1xuICB2YXIgYWJzT2Zmc2V0ID0gTWF0aC5hYnMob2Zmc2V0KTtcbiAgdmFyIGhvdXJzID0gYWRkTGVhZGluZ1plcm9zKE1hdGguZmxvb3IoYWJzT2Zmc2V0IC8gNjApLCAyKTtcbiAgdmFyIG1pbnV0ZXMgPSBhZGRMZWFkaW5nWmVyb3MoYWJzT2Zmc2V0ICUgNjAsIDIpO1xuICByZXR1cm4gc2lnbiArIGhvdXJzICsgZGVsaW1pdGVyICsgbWludXRlcztcbn1cbmV4cG9ydCBkZWZhdWx0IGZvcm1hdHRlcnM7IiwidmFyIGRhdGVMb25nRm9ybWF0dGVyID0gZnVuY3Rpb24gZGF0ZUxvbmdGb3JtYXR0ZXIocGF0dGVybiwgZm9ybWF0TG9uZykge1xuICBzd2l0Y2ggKHBhdHRlcm4pIHtcbiAgICBjYXNlICdQJzpcbiAgICAgIHJldHVybiBmb3JtYXRMb25nLmRhdGUoe1xuICAgICAgICB3aWR0aDogJ3Nob3J0J1xuICAgICAgfSk7XG4gICAgY2FzZSAnUFAnOlxuICAgICAgcmV0dXJuIGZvcm1hdExvbmcuZGF0ZSh7XG4gICAgICAgIHdpZHRoOiAnbWVkaXVtJ1xuICAgICAgfSk7XG4gICAgY2FzZSAnUFBQJzpcbiAgICAgIHJldHVybiBmb3JtYXRMb25nLmRhdGUoe1xuICAgICAgICB3aWR0aDogJ2xvbmcnXG4gICAgICB9KTtcbiAgICBjYXNlICdQUFBQJzpcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZvcm1hdExvbmcuZGF0ZSh7XG4gICAgICAgIHdpZHRoOiAnZnVsbCdcbiAgICAgIH0pO1xuICB9XG59O1xudmFyIHRpbWVMb25nRm9ybWF0dGVyID0gZnVuY3Rpb24gdGltZUxvbmdGb3JtYXR0ZXIocGF0dGVybiwgZm9ybWF0TG9uZykge1xuICBzd2l0Y2ggKHBhdHRlcm4pIHtcbiAgICBjYXNlICdwJzpcbiAgICAgIHJldHVybiBmb3JtYXRMb25nLnRpbWUoe1xuICAgICAgICB3aWR0aDogJ3Nob3J0J1xuICAgICAgfSk7XG4gICAgY2FzZSAncHAnOlxuICAgICAgcmV0dXJuIGZvcm1hdExvbmcudGltZSh7XG4gICAgICAgIHdpZHRoOiAnbWVkaXVtJ1xuICAgICAgfSk7XG4gICAgY2FzZSAncHBwJzpcbiAgICAgIHJldHVybiBmb3JtYXRMb25nLnRpbWUoe1xuICAgICAgICB3aWR0aDogJ2xvbmcnXG4gICAgICB9KTtcbiAgICBjYXNlICdwcHBwJzpcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZvcm1hdExvbmcudGltZSh7XG4gICAgICAgIHdpZHRoOiAnZnVsbCdcbiAgICAgIH0pO1xuICB9XG59O1xudmFyIGRhdGVUaW1lTG9uZ0Zvcm1hdHRlciA9IGZ1bmN0aW9uIGRhdGVUaW1lTG9uZ0Zvcm1hdHRlcihwYXR0ZXJuLCBmb3JtYXRMb25nKSB7XG4gIHZhciBtYXRjaFJlc3VsdCA9IHBhdHRlcm4ubWF0Y2goLyhQKykocCspPy8pIHx8IFtdO1xuICB2YXIgZGF0ZVBhdHRlcm4gPSBtYXRjaFJlc3VsdFsxXTtcbiAgdmFyIHRpbWVQYXR0ZXJuID0gbWF0Y2hSZXN1bHRbMl07XG4gIGlmICghdGltZVBhdHRlcm4pIHtcbiAgICByZXR1cm4gZGF0ZUxvbmdGb3JtYXR0ZXIocGF0dGVybiwgZm9ybWF0TG9uZyk7XG4gIH1cbiAgdmFyIGRhdGVUaW1lRm9ybWF0O1xuICBzd2l0Y2ggKGRhdGVQYXR0ZXJuKSB7XG4gICAgY2FzZSAnUCc6XG4gICAgICBkYXRlVGltZUZvcm1hdCA9IGZvcm1hdExvbmcuZGF0ZVRpbWUoe1xuICAgICAgICB3aWR0aDogJ3Nob3J0J1xuICAgICAgfSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdQUCc6XG4gICAgICBkYXRlVGltZUZvcm1hdCA9IGZvcm1hdExvbmcuZGF0ZVRpbWUoe1xuICAgICAgICB3aWR0aDogJ21lZGl1bSdcbiAgICAgIH0pO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnUFBQJzpcbiAgICAgIGRhdGVUaW1lRm9ybWF0ID0gZm9ybWF0TG9uZy5kYXRlVGltZSh7XG4gICAgICAgIHdpZHRoOiAnbG9uZydcbiAgICAgIH0pO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnUFBQUCc6XG4gICAgZGVmYXVsdDpcbiAgICAgIGRhdGVUaW1lRm9ybWF0ID0gZm9ybWF0TG9uZy5kYXRlVGltZSh7XG4gICAgICAgIHdpZHRoOiAnZnVsbCdcbiAgICAgIH0pO1xuICAgICAgYnJlYWs7XG4gIH1cbiAgcmV0dXJuIGRhdGVUaW1lRm9ybWF0LnJlcGxhY2UoJ3t7ZGF0ZX19JywgZGF0ZUxvbmdGb3JtYXR0ZXIoZGF0ZVBhdHRlcm4sIGZvcm1hdExvbmcpKS5yZXBsYWNlKCd7e3RpbWV9fScsIHRpbWVMb25nRm9ybWF0dGVyKHRpbWVQYXR0ZXJuLCBmb3JtYXRMb25nKSk7XG59O1xudmFyIGxvbmdGb3JtYXR0ZXJzID0ge1xuICBwOiB0aW1lTG9uZ0Zvcm1hdHRlcixcbiAgUDogZGF0ZVRpbWVMb25nRm9ybWF0dGVyXG59O1xuZXhwb3J0IGRlZmF1bHQgbG9uZ0Zvcm1hdHRlcnM7IiwiLyoqXG4gKiBHb29nbGUgQ2hyb21lIGFzIG9mIDY3LjAuMzM5Ni44NyBpbnRyb2R1Y2VkIHRpbWV6b25lcyB3aXRoIG9mZnNldCB0aGF0IGluY2x1ZGVzIHNlY29uZHMuXG4gKiBUaGV5IHVzdWFsbHkgYXBwZWFyIGZvciBkYXRlcyB0aGF0IGRlbm90ZSB0aW1lIGJlZm9yZSB0aGUgdGltZXpvbmVzIHdlcmUgaW50cm9kdWNlZFxuICogKGUuZy4gZm9yICdFdXJvcGUvUHJhZ3VlJyB0aW1lem9uZSB0aGUgb2Zmc2V0IGlzIEdNVCswMDo1Nzo0NCBiZWZvcmUgMSBPY3RvYmVyIDE4OTFcbiAqIGFuZCBHTVQrMDE6MDA6MDAgYWZ0ZXIgdGhhdCBkYXRlKVxuICpcbiAqIERhdGUjZ2V0VGltZXpvbmVPZmZzZXQgcmV0dXJucyB0aGUgb2Zmc2V0IGluIG1pbnV0ZXMgYW5kIHdvdWxkIHJldHVybiA1NyBmb3IgdGhlIGV4YW1wbGUgYWJvdmUsXG4gKiB3aGljaCB3b3VsZCBsZWFkIHRvIGluY29ycmVjdCBjYWxjdWxhdGlvbnMuXG4gKlxuICogVGhpcyBmdW5jdGlvbiByZXR1cm5zIHRoZSB0aW1lem9uZSBvZmZzZXQgaW4gbWlsbGlzZWNvbmRzIHRoYXQgdGFrZXMgc2Vjb25kcyBpbiBhY2NvdW50LlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRUaW1lem9uZU9mZnNldEluTWlsbGlzZWNvbmRzKGRhdGUpIHtcbiAgdmFyIHV0Y0RhdGUgPSBuZXcgRGF0ZShEYXRlLlVUQyhkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXREYXRlKCksIGRhdGUuZ2V0SG91cnMoKSwgZGF0ZS5nZXRNaW51dGVzKCksIGRhdGUuZ2V0U2Vjb25kcygpLCBkYXRlLmdldE1pbGxpc2Vjb25kcygpKSk7XG4gIHV0Y0RhdGUuc2V0VVRDRnVsbFllYXIoZGF0ZS5nZXRGdWxsWWVhcigpKTtcbiAgcmV0dXJuIGRhdGUuZ2V0VGltZSgpIC0gdXRjRGF0ZS5nZXRUaW1lKCk7XG59IiwidmFyIHByb3RlY3RlZERheU9mWWVhclRva2VucyA9IFsnRCcsICdERCddO1xudmFyIHByb3RlY3RlZFdlZWtZZWFyVG9rZW5zID0gWydZWScsICdZWVlZJ107XG5leHBvcnQgZnVuY3Rpb24gaXNQcm90ZWN0ZWREYXlPZlllYXJUb2tlbih0b2tlbikge1xuICByZXR1cm4gcHJvdGVjdGVkRGF5T2ZZZWFyVG9rZW5zLmluZGV4T2YodG9rZW4pICE9PSAtMTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc1Byb3RlY3RlZFdlZWtZZWFyVG9rZW4odG9rZW4pIHtcbiAgcmV0dXJuIHByb3RlY3RlZFdlZWtZZWFyVG9rZW5zLmluZGV4T2YodG9rZW4pICE9PSAtMTtcbn1cbmV4cG9ydCBmdW5jdGlvbiB0aHJvd1Byb3RlY3RlZEVycm9yKHRva2VuLCBmb3JtYXQsIGlucHV0KSB7XG4gIGlmICh0b2tlbiA9PT0gJ1lZWVknKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJVc2UgYHl5eXlgIGluc3RlYWQgb2YgYFlZWVlgIChpbiBgXCIuY29uY2F0KGZvcm1hdCwgXCJgKSBmb3IgZm9ybWF0dGluZyB5ZWFycyB0byB0aGUgaW5wdXQgYFwiKS5jb25jYXQoaW5wdXQsIFwiYDsgc2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91bmljb2RlVG9rZW5zLm1kXCIpKTtcbiAgfSBlbHNlIGlmICh0b2tlbiA9PT0gJ1lZJykge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFwiVXNlIGB5eWAgaW5zdGVhZCBvZiBgWVlgIChpbiBgXCIuY29uY2F0KGZvcm1hdCwgXCJgKSBmb3IgZm9ybWF0dGluZyB5ZWFycyB0byB0aGUgaW5wdXQgYFwiKS5jb25jYXQoaW5wdXQsIFwiYDsgc2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91bmljb2RlVG9rZW5zLm1kXCIpKTtcbiAgfSBlbHNlIGlmICh0b2tlbiA9PT0gJ0QnKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJVc2UgYGRgIGluc3RlYWQgb2YgYERgIChpbiBgXCIuY29uY2F0KGZvcm1hdCwgXCJgKSBmb3IgZm9ybWF0dGluZyBkYXlzIG9mIHRoZSBtb250aCB0byB0aGUgaW5wdXQgYFwiKS5jb25jYXQoaW5wdXQsIFwiYDsgc2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91bmljb2RlVG9rZW5zLm1kXCIpKTtcbiAgfSBlbHNlIGlmICh0b2tlbiA9PT0gJ0REJykge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFwiVXNlIGBkZGAgaW5zdGVhZCBvZiBgRERgIChpbiBgXCIuY29uY2F0KGZvcm1hdCwgXCJgKSBmb3IgZm9ybWF0dGluZyBkYXlzIG9mIHRoZSBtb250aCB0byB0aGUgaW5wdXQgYFwiKS5jb25jYXQoaW5wdXQsIFwiYDsgc2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91bmljb2RlVG9rZW5zLm1kXCIpKTtcbiAgfVxufSIsInZhciBmb3JtYXREaXN0YW5jZUxvY2FsZSA9IHtcbiAgbGVzc1RoYW5YU2Vjb25kczoge1xuICAgIG9uZTogJ2xlc3MgdGhhbiBhIHNlY29uZCcsXG4gICAgb3RoZXI6ICdsZXNzIHRoYW4ge3tjb3VudH19IHNlY29uZHMnXG4gIH0sXG4gIHhTZWNvbmRzOiB7XG4gICAgb25lOiAnMSBzZWNvbmQnLFxuICAgIG90aGVyOiAne3tjb3VudH19IHNlY29uZHMnXG4gIH0sXG4gIGhhbGZBTWludXRlOiAnaGFsZiBhIG1pbnV0ZScsXG4gIGxlc3NUaGFuWE1pbnV0ZXM6IHtcbiAgICBvbmU6ICdsZXNzIHRoYW4gYSBtaW51dGUnLFxuICAgIG90aGVyOiAnbGVzcyB0aGFuIHt7Y291bnR9fSBtaW51dGVzJ1xuICB9LFxuICB4TWludXRlczoge1xuICAgIG9uZTogJzEgbWludXRlJyxcbiAgICBvdGhlcjogJ3t7Y291bnR9fSBtaW51dGVzJ1xuICB9LFxuICBhYm91dFhIb3Vyczoge1xuICAgIG9uZTogJ2Fib3V0IDEgaG91cicsXG4gICAgb3RoZXI6ICdhYm91dCB7e2NvdW50fX0gaG91cnMnXG4gIH0sXG4gIHhIb3Vyczoge1xuICAgIG9uZTogJzEgaG91cicsXG4gICAgb3RoZXI6ICd7e2NvdW50fX0gaG91cnMnXG4gIH0sXG4gIHhEYXlzOiB7XG4gICAgb25lOiAnMSBkYXknLFxuICAgIG90aGVyOiAne3tjb3VudH19IGRheXMnXG4gIH0sXG4gIGFib3V0WFdlZWtzOiB7XG4gICAgb25lOiAnYWJvdXQgMSB3ZWVrJyxcbiAgICBvdGhlcjogJ2Fib3V0IHt7Y291bnR9fSB3ZWVrcydcbiAgfSxcbiAgeFdlZWtzOiB7XG4gICAgb25lOiAnMSB3ZWVrJyxcbiAgICBvdGhlcjogJ3t7Y291bnR9fSB3ZWVrcydcbiAgfSxcbiAgYWJvdXRYTW9udGhzOiB7XG4gICAgb25lOiAnYWJvdXQgMSBtb250aCcsXG4gICAgb3RoZXI6ICdhYm91dCB7e2NvdW50fX0gbW9udGhzJ1xuICB9LFxuICB4TW9udGhzOiB7XG4gICAgb25lOiAnMSBtb250aCcsXG4gICAgb3RoZXI6ICd7e2NvdW50fX0gbW9udGhzJ1xuICB9LFxuICBhYm91dFhZZWFyczoge1xuICAgIG9uZTogJ2Fib3V0IDEgeWVhcicsXG4gICAgb3RoZXI6ICdhYm91dCB7e2NvdW50fX0geWVhcnMnXG4gIH0sXG4gIHhZZWFyczoge1xuICAgIG9uZTogJzEgeWVhcicsXG4gICAgb3RoZXI6ICd7e2NvdW50fX0geWVhcnMnXG4gIH0sXG4gIG92ZXJYWWVhcnM6IHtcbiAgICBvbmU6ICdvdmVyIDEgeWVhcicsXG4gICAgb3RoZXI6ICdvdmVyIHt7Y291bnR9fSB5ZWFycydcbiAgfSxcbiAgYWxtb3N0WFllYXJzOiB7XG4gICAgb25lOiAnYWxtb3N0IDEgeWVhcicsXG4gICAgb3RoZXI6ICdhbG1vc3Qge3tjb3VudH19IHllYXJzJ1xuICB9XG59O1xudmFyIGZvcm1hdERpc3RhbmNlID0gZnVuY3Rpb24gZm9ybWF0RGlzdGFuY2UodG9rZW4sIGNvdW50LCBvcHRpb25zKSB7XG4gIHZhciByZXN1bHQ7XG4gIHZhciB0b2tlblZhbHVlID0gZm9ybWF0RGlzdGFuY2VMb2NhbGVbdG9rZW5dO1xuICBpZiAodHlwZW9mIHRva2VuVmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmVzdWx0ID0gdG9rZW5WYWx1ZTtcbiAgfSBlbHNlIGlmIChjb3VudCA9PT0gMSkge1xuICAgIHJlc3VsdCA9IHRva2VuVmFsdWUub25lO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9IHRva2VuVmFsdWUub3RoZXIucmVwbGFjZSgne3tjb3VudH19JywgY291bnQudG9TdHJpbmcoKSk7XG4gIH1cbiAgaWYgKG9wdGlvbnMgIT09IG51bGwgJiYgb3B0aW9ucyAhPT0gdm9pZCAwICYmIG9wdGlvbnMuYWRkU3VmZml4KSB7XG4gICAgaWYgKG9wdGlvbnMuY29tcGFyaXNvbiAmJiBvcHRpb25zLmNvbXBhcmlzb24gPiAwKSB7XG4gICAgICByZXR1cm4gJ2luICcgKyByZXN1bHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiByZXN1bHQgKyAnIGFnbyc7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuZXhwb3J0IGRlZmF1bHQgZm9ybWF0RGlzdGFuY2U7IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRGb3JtYXRMb25nRm4oYXJncykge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcbiAgICAvLyBUT0RPOiBSZW1vdmUgU3RyaW5nKClcbiAgICB2YXIgd2lkdGggPSBvcHRpb25zLndpZHRoID8gU3RyaW5nKG9wdGlvbnMud2lkdGgpIDogYXJncy5kZWZhdWx0V2lkdGg7XG4gICAgdmFyIGZvcm1hdCA9IGFyZ3MuZm9ybWF0c1t3aWR0aF0gfHwgYXJncy5mb3JtYXRzW2FyZ3MuZGVmYXVsdFdpZHRoXTtcbiAgICByZXR1cm4gZm9ybWF0O1xuICB9O1xufSIsImltcG9ydCBidWlsZEZvcm1hdExvbmdGbiBmcm9tIFwiLi4vLi4vLi4vX2xpYi9idWlsZEZvcm1hdExvbmdGbi9pbmRleC5qc1wiO1xudmFyIGRhdGVGb3JtYXRzID0ge1xuICBmdWxsOiAnRUVFRSwgTU1NTSBkbywgeScsXG4gIGxvbmc6ICdNTU1NIGRvLCB5JyxcbiAgbWVkaXVtOiAnTU1NIGQsIHknLFxuICBzaG9ydDogJ01NL2RkL3l5eXknXG59O1xudmFyIHRpbWVGb3JtYXRzID0ge1xuICBmdWxsOiAnaDptbTpzcyBhIHp6enonLFxuICBsb25nOiAnaDptbTpzcyBhIHonLFxuICBtZWRpdW06ICdoOm1tOnNzIGEnLFxuICBzaG9ydDogJ2g6bW0gYSdcbn07XG52YXIgZGF0ZVRpbWVGb3JtYXRzID0ge1xuICBmdWxsOiBcInt7ZGF0ZX19ICdhdCcge3t0aW1lfX1cIixcbiAgbG9uZzogXCJ7e2RhdGV9fSAnYXQnIHt7dGltZX19XCIsXG4gIG1lZGl1bTogJ3t7ZGF0ZX19LCB7e3RpbWV9fScsXG4gIHNob3J0OiAne3tkYXRlfX0sIHt7dGltZX19J1xufTtcbnZhciBmb3JtYXRMb25nID0ge1xuICBkYXRlOiBidWlsZEZvcm1hdExvbmdGbih7XG4gICAgZm9ybWF0czogZGF0ZUZvcm1hdHMsXG4gICAgZGVmYXVsdFdpZHRoOiAnZnVsbCdcbiAgfSksXG4gIHRpbWU6IGJ1aWxkRm9ybWF0TG9uZ0ZuKHtcbiAgICBmb3JtYXRzOiB0aW1lRm9ybWF0cyxcbiAgICBkZWZhdWx0V2lkdGg6ICdmdWxsJ1xuICB9KSxcbiAgZGF0ZVRpbWU6IGJ1aWxkRm9ybWF0TG9uZ0ZuKHtcbiAgICBmb3JtYXRzOiBkYXRlVGltZUZvcm1hdHMsXG4gICAgZGVmYXVsdFdpZHRoOiAnZnVsbCdcbiAgfSlcbn07XG5leHBvcnQgZGVmYXVsdCBmb3JtYXRMb25nOyIsInZhciBmb3JtYXRSZWxhdGl2ZUxvY2FsZSA9IHtcbiAgbGFzdFdlZWs6IFwiJ2xhc3QnIGVlZWUgJ2F0JyBwXCIsXG4gIHllc3RlcmRheTogXCIneWVzdGVyZGF5IGF0JyBwXCIsXG4gIHRvZGF5OiBcIid0b2RheSBhdCcgcFwiLFxuICB0b21vcnJvdzogXCIndG9tb3Jyb3cgYXQnIHBcIixcbiAgbmV4dFdlZWs6IFwiZWVlZSAnYXQnIHBcIixcbiAgb3RoZXI6ICdQJ1xufTtcbnZhciBmb3JtYXRSZWxhdGl2ZSA9IGZ1bmN0aW9uIGZvcm1hdFJlbGF0aXZlKHRva2VuLCBfZGF0ZSwgX2Jhc2VEYXRlLCBfb3B0aW9ucykge1xuICByZXR1cm4gZm9ybWF0UmVsYXRpdmVMb2NhbGVbdG9rZW5dO1xufTtcbmV4cG9ydCBkZWZhdWx0IGZvcm1hdFJlbGF0aXZlOyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkTG9jYWxpemVGbihhcmdzKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoZGlydHlJbmRleCwgb3B0aW9ucykge1xuICAgIHZhciBjb250ZXh0ID0gb3B0aW9ucyAhPT0gbnVsbCAmJiBvcHRpb25zICE9PSB2b2lkIDAgJiYgb3B0aW9ucy5jb250ZXh0ID8gU3RyaW5nKG9wdGlvbnMuY29udGV4dCkgOiAnc3RhbmRhbG9uZSc7XG4gICAgdmFyIHZhbHVlc0FycmF5O1xuICAgIGlmIChjb250ZXh0ID09PSAnZm9ybWF0dGluZycgJiYgYXJncy5mb3JtYXR0aW5nVmFsdWVzKSB7XG4gICAgICB2YXIgZGVmYXVsdFdpZHRoID0gYXJncy5kZWZhdWx0Rm9ybWF0dGluZ1dpZHRoIHx8IGFyZ3MuZGVmYXVsdFdpZHRoO1xuICAgICAgdmFyIHdpZHRoID0gb3B0aW9ucyAhPT0gbnVsbCAmJiBvcHRpb25zICE9PSB2b2lkIDAgJiYgb3B0aW9ucy53aWR0aCA/IFN0cmluZyhvcHRpb25zLndpZHRoKSA6IGRlZmF1bHRXaWR0aDtcbiAgICAgIHZhbHVlc0FycmF5ID0gYXJncy5mb3JtYXR0aW5nVmFsdWVzW3dpZHRoXSB8fCBhcmdzLmZvcm1hdHRpbmdWYWx1ZXNbZGVmYXVsdFdpZHRoXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIF9kZWZhdWx0V2lkdGggPSBhcmdzLmRlZmF1bHRXaWR0aDtcbiAgICAgIHZhciBfd2lkdGggPSBvcHRpb25zICE9PSBudWxsICYmIG9wdGlvbnMgIT09IHZvaWQgMCAmJiBvcHRpb25zLndpZHRoID8gU3RyaW5nKG9wdGlvbnMud2lkdGgpIDogYXJncy5kZWZhdWx0V2lkdGg7XG4gICAgICB2YWx1ZXNBcnJheSA9IGFyZ3MudmFsdWVzW193aWR0aF0gfHwgYXJncy52YWx1ZXNbX2RlZmF1bHRXaWR0aF07XG4gICAgfVxuICAgIHZhciBpbmRleCA9IGFyZ3MuYXJndW1lbnRDYWxsYmFjayA/IGFyZ3MuYXJndW1lbnRDYWxsYmFjayhkaXJ0eUluZGV4KSA6IGRpcnR5SW5kZXg7XG4gICAgLy8gQHRzLWlnbm9yZTogRm9yIHNvbWUgcmVhc29uIFR5cGVTY3JpcHQganVzdCBkb24ndCB3YW50IHRvIG1hdGNoIGl0LCBubyBtYXR0ZXIgaG93IGhhcmQgd2UgdHJ5LiBJIGNoYWxsZW5nZSB5b3UgdG8gdHJ5IHRvIHJlbW92ZSBpdCFcbiAgICByZXR1cm4gdmFsdWVzQXJyYXlbaW5kZXhdO1xuICB9O1xufSIsImltcG9ydCBidWlsZExvY2FsaXplRm4gZnJvbSBcIi4uLy4uLy4uL19saWIvYnVpbGRMb2NhbGl6ZUZuL2luZGV4LmpzXCI7XG52YXIgZXJhVmFsdWVzID0ge1xuICBuYXJyb3c6IFsnQicsICdBJ10sXG4gIGFiYnJldmlhdGVkOiBbJ0JDJywgJ0FEJ10sXG4gIHdpZGU6IFsnQmVmb3JlIENocmlzdCcsICdBbm5vIERvbWluaSddXG59O1xudmFyIHF1YXJ0ZXJWYWx1ZXMgPSB7XG4gIG5hcnJvdzogWycxJywgJzInLCAnMycsICc0J10sXG4gIGFiYnJldmlhdGVkOiBbJ1ExJywgJ1EyJywgJ1EzJywgJ1E0J10sXG4gIHdpZGU6IFsnMXN0IHF1YXJ0ZXInLCAnMm5kIHF1YXJ0ZXInLCAnM3JkIHF1YXJ0ZXInLCAnNHRoIHF1YXJ0ZXInXVxufTtcblxuLy8gTm90ZTogaW4gRW5nbGlzaCwgdGhlIG5hbWVzIG9mIGRheXMgb2YgdGhlIHdlZWsgYW5kIG1vbnRocyBhcmUgY2FwaXRhbGl6ZWQuXG4vLyBJZiB5b3UgYXJlIG1ha2luZyBhIG5ldyBsb2NhbGUgYmFzZWQgb24gdGhpcyBvbmUsIGNoZWNrIGlmIHRoZSBzYW1lIGlzIHRydWUgZm9yIHRoZSBsYW5ndWFnZSB5b3UncmUgd29ya2luZyBvbi5cbi8vIEdlbmVyYWxseSwgZm9ybWF0dGVkIGRhdGVzIHNob3VsZCBsb29rIGxpa2UgdGhleSBhcmUgaW4gdGhlIG1pZGRsZSBvZiBhIHNlbnRlbmNlLFxuLy8gZS5nLiBpbiBTcGFuaXNoIGxhbmd1YWdlIHRoZSB3ZWVrZGF5cyBhbmQgbW9udGhzIHNob3VsZCBiZSBpbiB0aGUgbG93ZXJjYXNlLlxudmFyIG1vbnRoVmFsdWVzID0ge1xuICBuYXJyb3c6IFsnSicsICdGJywgJ00nLCAnQScsICdNJywgJ0onLCAnSicsICdBJywgJ1MnLCAnTycsICdOJywgJ0QnXSxcbiAgYWJicmV2aWF0ZWQ6IFsnSmFuJywgJ0ZlYicsICdNYXInLCAnQXByJywgJ01heScsICdKdW4nLCAnSnVsJywgJ0F1ZycsICdTZXAnLCAnT2N0JywgJ05vdicsICdEZWMnXSxcbiAgd2lkZTogWydKYW51YXJ5JywgJ0ZlYnJ1YXJ5JywgJ01hcmNoJywgJ0FwcmlsJywgJ01heScsICdKdW5lJywgJ0p1bHknLCAnQXVndXN0JywgJ1NlcHRlbWJlcicsICdPY3RvYmVyJywgJ05vdmVtYmVyJywgJ0RlY2VtYmVyJ11cbn07XG52YXIgZGF5VmFsdWVzID0ge1xuICBuYXJyb3c6IFsnUycsICdNJywgJ1QnLCAnVycsICdUJywgJ0YnLCAnUyddLFxuICBzaG9ydDogWydTdScsICdNbycsICdUdScsICdXZScsICdUaCcsICdGcicsICdTYSddLFxuICBhYmJyZXZpYXRlZDogWydTdW4nLCAnTW9uJywgJ1R1ZScsICdXZWQnLCAnVGh1JywgJ0ZyaScsICdTYXQnXSxcbiAgd2lkZTogWydTdW5kYXknLCAnTW9uZGF5JywgJ1R1ZXNkYXknLCAnV2VkbmVzZGF5JywgJ1RodXJzZGF5JywgJ0ZyaWRheScsICdTYXR1cmRheSddXG59O1xudmFyIGRheVBlcmlvZFZhbHVlcyA9IHtcbiAgbmFycm93OiB7XG4gICAgYW06ICdhJyxcbiAgICBwbTogJ3AnLFxuICAgIG1pZG5pZ2h0OiAnbWknLFxuICAgIG5vb246ICduJyxcbiAgICBtb3JuaW5nOiAnbW9ybmluZycsXG4gICAgYWZ0ZXJub29uOiAnYWZ0ZXJub29uJyxcbiAgICBldmVuaW5nOiAnZXZlbmluZycsXG4gICAgbmlnaHQ6ICduaWdodCdcbiAgfSxcbiAgYWJicmV2aWF0ZWQ6IHtcbiAgICBhbTogJ0FNJyxcbiAgICBwbTogJ1BNJyxcbiAgICBtaWRuaWdodDogJ21pZG5pZ2h0JyxcbiAgICBub29uOiAnbm9vbicsXG4gICAgbW9ybmluZzogJ21vcm5pbmcnLFxuICAgIGFmdGVybm9vbjogJ2FmdGVybm9vbicsXG4gICAgZXZlbmluZzogJ2V2ZW5pbmcnLFxuICAgIG5pZ2h0OiAnbmlnaHQnXG4gIH0sXG4gIHdpZGU6IHtcbiAgICBhbTogJ2EubS4nLFxuICAgIHBtOiAncC5tLicsXG4gICAgbWlkbmlnaHQ6ICdtaWRuaWdodCcsXG4gICAgbm9vbjogJ25vb24nLFxuICAgIG1vcm5pbmc6ICdtb3JuaW5nJyxcbiAgICBhZnRlcm5vb246ICdhZnRlcm5vb24nLFxuICAgIGV2ZW5pbmc6ICdldmVuaW5nJyxcbiAgICBuaWdodDogJ25pZ2h0J1xuICB9XG59O1xudmFyIGZvcm1hdHRpbmdEYXlQZXJpb2RWYWx1ZXMgPSB7XG4gIG5hcnJvdzoge1xuICAgIGFtOiAnYScsXG4gICAgcG06ICdwJyxcbiAgICBtaWRuaWdodDogJ21pJyxcbiAgICBub29uOiAnbicsXG4gICAgbW9ybmluZzogJ2luIHRoZSBtb3JuaW5nJyxcbiAgICBhZnRlcm5vb246ICdpbiB0aGUgYWZ0ZXJub29uJyxcbiAgICBldmVuaW5nOiAnaW4gdGhlIGV2ZW5pbmcnLFxuICAgIG5pZ2h0OiAnYXQgbmlnaHQnXG4gIH0sXG4gIGFiYnJldmlhdGVkOiB7XG4gICAgYW06ICdBTScsXG4gICAgcG06ICdQTScsXG4gICAgbWlkbmlnaHQ6ICdtaWRuaWdodCcsXG4gICAgbm9vbjogJ25vb24nLFxuICAgIG1vcm5pbmc6ICdpbiB0aGUgbW9ybmluZycsXG4gICAgYWZ0ZXJub29uOiAnaW4gdGhlIGFmdGVybm9vbicsXG4gICAgZXZlbmluZzogJ2luIHRoZSBldmVuaW5nJyxcbiAgICBuaWdodDogJ2F0IG5pZ2h0J1xuICB9LFxuICB3aWRlOiB7XG4gICAgYW06ICdhLm0uJyxcbiAgICBwbTogJ3AubS4nLFxuICAgIG1pZG5pZ2h0OiAnbWlkbmlnaHQnLFxuICAgIG5vb246ICdub29uJyxcbiAgICBtb3JuaW5nOiAnaW4gdGhlIG1vcm5pbmcnLFxuICAgIGFmdGVybm9vbjogJ2luIHRoZSBhZnRlcm5vb24nLFxuICAgIGV2ZW5pbmc6ICdpbiB0aGUgZXZlbmluZycsXG4gICAgbmlnaHQ6ICdhdCBuaWdodCdcbiAgfVxufTtcbnZhciBvcmRpbmFsTnVtYmVyID0gZnVuY3Rpb24gb3JkaW5hbE51bWJlcihkaXJ0eU51bWJlciwgX29wdGlvbnMpIHtcbiAgdmFyIG51bWJlciA9IE51bWJlcihkaXJ0eU51bWJlcik7XG5cbiAgLy8gSWYgb3JkaW5hbCBudW1iZXJzIGRlcGVuZCBvbiBjb250ZXh0LCBmb3IgZXhhbXBsZSxcbiAgLy8gaWYgdGhleSBhcmUgZGlmZmVyZW50IGZvciBkaWZmZXJlbnQgZ3JhbW1hdGljYWwgZ2VuZGVycyxcbiAgLy8gdXNlIGBvcHRpb25zLnVuaXRgLlxuICAvL1xuICAvLyBgdW5pdGAgY2FuIGJlICd5ZWFyJywgJ3F1YXJ0ZXInLCAnbW9udGgnLCAnd2VlaycsICdkYXRlJywgJ2RheU9mWWVhcicsXG4gIC8vICdkYXknLCAnaG91cicsICdtaW51dGUnLCAnc2Vjb25kJy5cblxuICB2YXIgcmVtMTAwID0gbnVtYmVyICUgMTAwO1xuICBpZiAocmVtMTAwID4gMjAgfHwgcmVtMTAwIDwgMTApIHtcbiAgICBzd2l0Y2ggKHJlbTEwMCAlIDEwKSB7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHJldHVybiBudW1iZXIgKyAnc3QnO1xuICAgICAgY2FzZSAyOlxuICAgICAgICByZXR1cm4gbnVtYmVyICsgJ25kJztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgcmV0dXJuIG51bWJlciArICdyZCc7XG4gICAgfVxuICB9XG4gIHJldHVybiBudW1iZXIgKyAndGgnO1xufTtcbnZhciBsb2NhbGl6ZSA9IHtcbiAgb3JkaW5hbE51bWJlcjogb3JkaW5hbE51bWJlcixcbiAgZXJhOiBidWlsZExvY2FsaXplRm4oe1xuICAgIHZhbHVlczogZXJhVmFsdWVzLFxuICAgIGRlZmF1bHRXaWR0aDogJ3dpZGUnXG4gIH0pLFxuICBxdWFydGVyOiBidWlsZExvY2FsaXplRm4oe1xuICAgIHZhbHVlczogcXVhcnRlclZhbHVlcyxcbiAgICBkZWZhdWx0V2lkdGg6ICd3aWRlJyxcbiAgICBhcmd1bWVudENhbGxiYWNrOiBmdW5jdGlvbiBhcmd1bWVudENhbGxiYWNrKHF1YXJ0ZXIpIHtcbiAgICAgIHJldHVybiBxdWFydGVyIC0gMTtcbiAgICB9XG4gIH0pLFxuICBtb250aDogYnVpbGRMb2NhbGl6ZUZuKHtcbiAgICB2YWx1ZXM6IG1vbnRoVmFsdWVzLFxuICAgIGRlZmF1bHRXaWR0aDogJ3dpZGUnXG4gIH0pLFxuICBkYXk6IGJ1aWxkTG9jYWxpemVGbih7XG4gICAgdmFsdWVzOiBkYXlWYWx1ZXMsXG4gICAgZGVmYXVsdFdpZHRoOiAnd2lkZSdcbiAgfSksXG4gIGRheVBlcmlvZDogYnVpbGRMb2NhbGl6ZUZuKHtcbiAgICB2YWx1ZXM6IGRheVBlcmlvZFZhbHVlcyxcbiAgICBkZWZhdWx0V2lkdGg6ICd3aWRlJyxcbiAgICBmb3JtYXR0aW5nVmFsdWVzOiBmb3JtYXR0aW5nRGF5UGVyaW9kVmFsdWVzLFxuICAgIGRlZmF1bHRGb3JtYXR0aW5nV2lkdGg6ICd3aWRlJ1xuICB9KVxufTtcbmV4cG9ydCBkZWZhdWx0IGxvY2FsaXplOyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkTWF0Y2hGbihhcmdzKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICAgIHZhciB3aWR0aCA9IG9wdGlvbnMud2lkdGg7XG4gICAgdmFyIG1hdGNoUGF0dGVybiA9IHdpZHRoICYmIGFyZ3MubWF0Y2hQYXR0ZXJuc1t3aWR0aF0gfHwgYXJncy5tYXRjaFBhdHRlcm5zW2FyZ3MuZGVmYXVsdE1hdGNoV2lkdGhdO1xuICAgIHZhciBtYXRjaFJlc3VsdCA9IHN0cmluZy5tYXRjaChtYXRjaFBhdHRlcm4pO1xuICAgIGlmICghbWF0Y2hSZXN1bHQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICB2YXIgbWF0Y2hlZFN0cmluZyA9IG1hdGNoUmVzdWx0WzBdO1xuICAgIHZhciBwYXJzZVBhdHRlcm5zID0gd2lkdGggJiYgYXJncy5wYXJzZVBhdHRlcm5zW3dpZHRoXSB8fCBhcmdzLnBhcnNlUGF0dGVybnNbYXJncy5kZWZhdWx0UGFyc2VXaWR0aF07XG4gICAgdmFyIGtleSA9IEFycmF5LmlzQXJyYXkocGFyc2VQYXR0ZXJucykgPyBmaW5kSW5kZXgocGFyc2VQYXR0ZXJucywgZnVuY3Rpb24gKHBhdHRlcm4pIHtcbiAgICAgIHJldHVybiBwYXR0ZXJuLnRlc3QobWF0Y2hlZFN0cmluZyk7XG4gICAgfSkgOiBmaW5kS2V5KHBhcnNlUGF0dGVybnMsIGZ1bmN0aW9uIChwYXR0ZXJuKSB7XG4gICAgICByZXR1cm4gcGF0dGVybi50ZXN0KG1hdGNoZWRTdHJpbmcpO1xuICAgIH0pO1xuICAgIHZhciB2YWx1ZTtcbiAgICB2YWx1ZSA9IGFyZ3MudmFsdWVDYWxsYmFjayA/IGFyZ3MudmFsdWVDYWxsYmFjayhrZXkpIDoga2V5O1xuICAgIHZhbHVlID0gb3B0aW9ucy52YWx1ZUNhbGxiYWNrID8gb3B0aW9ucy52YWx1ZUNhbGxiYWNrKHZhbHVlKSA6IHZhbHVlO1xuICAgIHZhciByZXN0ID0gc3RyaW5nLnNsaWNlKG1hdGNoZWRTdHJpbmcubGVuZ3RoKTtcbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgcmVzdDogcmVzdFxuICAgIH07XG4gIH07XG59XG5mdW5jdGlvbiBmaW5kS2V5KG9iamVjdCwgcHJlZGljYXRlKSB7XG4gIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICBpZiAob2JqZWN0Lmhhc093blByb3BlcnR5KGtleSkgJiYgcHJlZGljYXRlKG9iamVjdFtrZXldKSkge1xuICAgICAgcmV0dXJuIGtleTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cbmZ1bmN0aW9uIGZpbmRJbmRleChhcnJheSwgcHJlZGljYXRlKSB7XG4gIGZvciAodmFyIGtleSA9IDA7IGtleSA8IGFycmF5Lmxlbmd0aDsga2V5KyspIHtcbiAgICBpZiAocHJlZGljYXRlKGFycmF5W2tleV0pKSB7XG4gICAgICByZXR1cm4ga2V5O1xuICAgIH1cbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkTWF0Y2hQYXR0ZXJuRm4oYXJncykge1xuICByZXR1cm4gZnVuY3Rpb24gKHN0cmluZykge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgICB2YXIgbWF0Y2hSZXN1bHQgPSBzdHJpbmcubWF0Y2goYXJncy5tYXRjaFBhdHRlcm4pO1xuICAgIGlmICghbWF0Y2hSZXN1bHQpIHJldHVybiBudWxsO1xuICAgIHZhciBtYXRjaGVkU3RyaW5nID0gbWF0Y2hSZXN1bHRbMF07XG4gICAgdmFyIHBhcnNlUmVzdWx0ID0gc3RyaW5nLm1hdGNoKGFyZ3MucGFyc2VQYXR0ZXJuKTtcbiAgICBpZiAoIXBhcnNlUmVzdWx0KSByZXR1cm4gbnVsbDtcbiAgICB2YXIgdmFsdWUgPSBhcmdzLnZhbHVlQ2FsbGJhY2sgPyBhcmdzLnZhbHVlQ2FsbGJhY2socGFyc2VSZXN1bHRbMF0pIDogcGFyc2VSZXN1bHRbMF07XG4gICAgdmFsdWUgPSBvcHRpb25zLnZhbHVlQ2FsbGJhY2sgPyBvcHRpb25zLnZhbHVlQ2FsbGJhY2sodmFsdWUpIDogdmFsdWU7XG4gICAgdmFyIHJlc3QgPSBzdHJpbmcuc2xpY2UobWF0Y2hlZFN0cmluZy5sZW5ndGgpO1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICByZXN0OiByZXN0XG4gICAgfTtcbiAgfTtcbn0iLCJpbXBvcnQgYnVpbGRNYXRjaEZuIGZyb20gXCIuLi8uLi8uLi9fbGliL2J1aWxkTWF0Y2hGbi9pbmRleC5qc1wiO1xuaW1wb3J0IGJ1aWxkTWF0Y2hQYXR0ZXJuRm4gZnJvbSBcIi4uLy4uLy4uL19saWIvYnVpbGRNYXRjaFBhdHRlcm5Gbi9pbmRleC5qc1wiO1xudmFyIG1hdGNoT3JkaW5hbE51bWJlclBhdHRlcm4gPSAvXihcXGQrKSh0aHxzdHxuZHxyZCk/L2k7XG52YXIgcGFyc2VPcmRpbmFsTnVtYmVyUGF0dGVybiA9IC9cXGQrL2k7XG52YXIgbWF0Y2hFcmFQYXR0ZXJucyA9IHtcbiAgbmFycm93OiAvXihifGEpL2ksXG4gIGFiYnJldmlhdGVkOiAvXihiXFwuP1xccz9jXFwuP3xiXFwuP1xccz9jXFwuP1xccz9lXFwuP3xhXFwuP1xccz9kXFwuP3xjXFwuP1xccz9lXFwuPykvaSxcbiAgd2lkZTogL14oYmVmb3JlIGNocmlzdHxiZWZvcmUgY29tbW9uIGVyYXxhbm5vIGRvbWluaXxjb21tb24gZXJhKS9pXG59O1xudmFyIHBhcnNlRXJhUGF0dGVybnMgPSB7XG4gIGFueTogWy9eYi9pLCAvXihhfGMpL2ldXG59O1xudmFyIG1hdGNoUXVhcnRlclBhdHRlcm5zID0ge1xuICBuYXJyb3c6IC9eWzEyMzRdL2ksXG4gIGFiYnJldmlhdGVkOiAvXnFbMTIzNF0vaSxcbiAgd2lkZTogL15bMTIzNF0odGh8c3R8bmR8cmQpPyBxdWFydGVyL2lcbn07XG52YXIgcGFyc2VRdWFydGVyUGF0dGVybnMgPSB7XG4gIGFueTogWy8xL2ksIC8yL2ksIC8zL2ksIC80L2ldXG59O1xudmFyIG1hdGNoTW9udGhQYXR0ZXJucyA9IHtcbiAgbmFycm93OiAvXltqZm1hc29uZF0vaSxcbiAgYWJicmV2aWF0ZWQ6IC9eKGphbnxmZWJ8bWFyfGFwcnxtYXl8anVufGp1bHxhdWd8c2VwfG9jdHxub3Z8ZGVjKS9pLFxuICB3aWRlOiAvXihqYW51YXJ5fGZlYnJ1YXJ5fG1hcmNofGFwcmlsfG1heXxqdW5lfGp1bHl8YXVndXN0fHNlcHRlbWJlcnxvY3RvYmVyfG5vdmVtYmVyfGRlY2VtYmVyKS9pXG59O1xudmFyIHBhcnNlTW9udGhQYXR0ZXJucyA9IHtcbiAgbmFycm93OiBbL15qL2ksIC9eZi9pLCAvXm0vaSwgL15hL2ksIC9ebS9pLCAvXmovaSwgL15qL2ksIC9eYS9pLCAvXnMvaSwgL15vL2ksIC9ebi9pLCAvXmQvaV0sXG4gIGFueTogWy9eamEvaSwgL15mL2ksIC9ebWFyL2ksIC9eYXAvaSwgL15tYXkvaSwgL15qdW4vaSwgL15qdWwvaSwgL15hdS9pLCAvXnMvaSwgL15vL2ksIC9ebi9pLCAvXmQvaV1cbn07XG52YXIgbWF0Y2hEYXlQYXR0ZXJucyA9IHtcbiAgbmFycm93OiAvXltzbXR3Zl0vaSxcbiAgc2hvcnQ6IC9eKHN1fG1vfHR1fHdlfHRofGZyfHNhKS9pLFxuICBhYmJyZXZpYXRlZDogL14oc3VufG1vbnx0dWV8d2VkfHRodXxmcml8c2F0KS9pLFxuICB3aWRlOiAvXihzdW5kYXl8bW9uZGF5fHR1ZXNkYXl8d2VkbmVzZGF5fHRodXJzZGF5fGZyaWRheXxzYXR1cmRheSkvaVxufTtcbnZhciBwYXJzZURheVBhdHRlcm5zID0ge1xuICBuYXJyb3c6IFsvXnMvaSwgL15tL2ksIC9edC9pLCAvXncvaSwgL150L2ksIC9eZi9pLCAvXnMvaV0sXG4gIGFueTogWy9ec3UvaSwgL15tL2ksIC9edHUvaSwgL153L2ksIC9edGgvaSwgL15mL2ksIC9ec2EvaV1cbn07XG52YXIgbWF0Y2hEYXlQZXJpb2RQYXR0ZXJucyA9IHtcbiAgbmFycm93OiAvXihhfHB8bWl8bnwoaW4gdGhlfGF0KSAobW9ybmluZ3xhZnRlcm5vb258ZXZlbmluZ3xuaWdodCkpL2ksXG4gIGFueTogL14oW2FwXVxcLj9cXHM/bVxcLj98bWlkbmlnaHR8bm9vbnwoaW4gdGhlfGF0KSAobW9ybmluZ3xhZnRlcm5vb258ZXZlbmluZ3xuaWdodCkpL2lcbn07XG52YXIgcGFyc2VEYXlQZXJpb2RQYXR0ZXJucyA9IHtcbiAgYW55OiB7XG4gICAgYW06IC9eYS9pLFxuICAgIHBtOiAvXnAvaSxcbiAgICBtaWRuaWdodDogL15taS9pLFxuICAgIG5vb246IC9ebm8vaSxcbiAgICBtb3JuaW5nOiAvbW9ybmluZy9pLFxuICAgIGFmdGVybm9vbjogL2FmdGVybm9vbi9pLFxuICAgIGV2ZW5pbmc6IC9ldmVuaW5nL2ksXG4gICAgbmlnaHQ6IC9uaWdodC9pXG4gIH1cbn07XG52YXIgbWF0Y2ggPSB7XG4gIG9yZGluYWxOdW1iZXI6IGJ1aWxkTWF0Y2hQYXR0ZXJuRm4oe1xuICAgIG1hdGNoUGF0dGVybjogbWF0Y2hPcmRpbmFsTnVtYmVyUGF0dGVybixcbiAgICBwYXJzZVBhdHRlcm46IHBhcnNlT3JkaW5hbE51bWJlclBhdHRlcm4sXG4gICAgdmFsdWVDYWxsYmFjazogZnVuY3Rpb24gdmFsdWVDYWxsYmFjayh2YWx1ZSkge1xuICAgICAgcmV0dXJuIHBhcnNlSW50KHZhbHVlLCAxMCk7XG4gICAgfVxuICB9KSxcbiAgZXJhOiBidWlsZE1hdGNoRm4oe1xuICAgIG1hdGNoUGF0dGVybnM6IG1hdGNoRXJhUGF0dGVybnMsXG4gICAgZGVmYXVsdE1hdGNoV2lkdGg6ICd3aWRlJyxcbiAgICBwYXJzZVBhdHRlcm5zOiBwYXJzZUVyYVBhdHRlcm5zLFxuICAgIGRlZmF1bHRQYXJzZVdpZHRoOiAnYW55J1xuICB9KSxcbiAgcXVhcnRlcjogYnVpbGRNYXRjaEZuKHtcbiAgICBtYXRjaFBhdHRlcm5zOiBtYXRjaFF1YXJ0ZXJQYXR0ZXJucyxcbiAgICBkZWZhdWx0TWF0Y2hXaWR0aDogJ3dpZGUnLFxuICAgIHBhcnNlUGF0dGVybnM6IHBhcnNlUXVhcnRlclBhdHRlcm5zLFxuICAgIGRlZmF1bHRQYXJzZVdpZHRoOiAnYW55JyxcbiAgICB2YWx1ZUNhbGxiYWNrOiBmdW5jdGlvbiB2YWx1ZUNhbGxiYWNrKGluZGV4KSB7XG4gICAgICByZXR1cm4gaW5kZXggKyAxO1xuICAgIH1cbiAgfSksXG4gIG1vbnRoOiBidWlsZE1hdGNoRm4oe1xuICAgIG1hdGNoUGF0dGVybnM6IG1hdGNoTW9udGhQYXR0ZXJucyxcbiAgICBkZWZhdWx0TWF0Y2hXaWR0aDogJ3dpZGUnLFxuICAgIHBhcnNlUGF0dGVybnM6IHBhcnNlTW9udGhQYXR0ZXJucyxcbiAgICBkZWZhdWx0UGFyc2VXaWR0aDogJ2FueSdcbiAgfSksXG4gIGRheTogYnVpbGRNYXRjaEZuKHtcbiAgICBtYXRjaFBhdHRlcm5zOiBtYXRjaERheVBhdHRlcm5zLFxuICAgIGRlZmF1bHRNYXRjaFdpZHRoOiAnd2lkZScsXG4gICAgcGFyc2VQYXR0ZXJuczogcGFyc2VEYXlQYXR0ZXJucyxcbiAgICBkZWZhdWx0UGFyc2VXaWR0aDogJ2FueSdcbiAgfSksXG4gIGRheVBlcmlvZDogYnVpbGRNYXRjaEZuKHtcbiAgICBtYXRjaFBhdHRlcm5zOiBtYXRjaERheVBlcmlvZFBhdHRlcm5zLFxuICAgIGRlZmF1bHRNYXRjaFdpZHRoOiAnYW55JyxcbiAgICBwYXJzZVBhdHRlcm5zOiBwYXJzZURheVBlcmlvZFBhdHRlcm5zLFxuICAgIGRlZmF1bHRQYXJzZVdpZHRoOiAnYW55J1xuICB9KVxufTtcbmV4cG9ydCBkZWZhdWx0IG1hdGNoOyIsImltcG9ydCBmb3JtYXREaXN0YW5jZSBmcm9tIFwiLi9fbGliL2Zvcm1hdERpc3RhbmNlL2luZGV4LmpzXCI7XG5pbXBvcnQgZm9ybWF0TG9uZyBmcm9tIFwiLi9fbGliL2Zvcm1hdExvbmcvaW5kZXguanNcIjtcbmltcG9ydCBmb3JtYXRSZWxhdGl2ZSBmcm9tIFwiLi9fbGliL2Zvcm1hdFJlbGF0aXZlL2luZGV4LmpzXCI7XG5pbXBvcnQgbG9jYWxpemUgZnJvbSBcIi4vX2xpYi9sb2NhbGl6ZS9pbmRleC5qc1wiO1xuaW1wb3J0IG1hdGNoIGZyb20gXCIuL19saWIvbWF0Y2gvaW5kZXguanNcIjtcbi8qKlxuICogQHR5cGUge0xvY2FsZX1cbiAqIEBjYXRlZ29yeSBMb2NhbGVzXG4gKiBAc3VtbWFyeSBFbmdsaXNoIGxvY2FsZSAoVW5pdGVkIFN0YXRlcykuXG4gKiBAbGFuZ3VhZ2UgRW5nbGlzaFxuICogQGlzby02MzktMiBlbmdcbiAqIEBhdXRob3IgU2FzaGEgS29zcyBbQGtvc3Nub2NvcnBde0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9rb3Nzbm9jb3JwfVxuICogQGF1dGhvciBMZXNoYSBLb3NzIFtAbGVzaGFrb3NzXXtAbGluayBodHRwczovL2dpdGh1Yi5jb20vbGVzaGFrb3NzfVxuICovXG52YXIgbG9jYWxlID0ge1xuICBjb2RlOiAnZW4tVVMnLFxuICBmb3JtYXREaXN0YW5jZTogZm9ybWF0RGlzdGFuY2UsXG4gIGZvcm1hdExvbmc6IGZvcm1hdExvbmcsXG4gIGZvcm1hdFJlbGF0aXZlOiBmb3JtYXRSZWxhdGl2ZSxcbiAgbG9jYWxpemU6IGxvY2FsaXplLFxuICBtYXRjaDogbWF0Y2gsXG4gIG9wdGlvbnM6IHtcbiAgICB3ZWVrU3RhcnRzT246IDAgLyogU3VuZGF5ICovLFxuICAgIGZpcnN0V2Vla0NvbnRhaW5zRGF0ZTogMVxuICB9XG59O1xuZXhwb3J0IGRlZmF1bHQgbG9jYWxlOyIsImltcG9ydCBpc1ZhbGlkIGZyb20gXCIuLi9pc1ZhbGlkL2luZGV4LmpzXCI7XG5pbXBvcnQgc3ViTWlsbGlzZWNvbmRzIGZyb20gXCIuLi9zdWJNaWxsaXNlY29uZHMvaW5kZXguanNcIjtcbmltcG9ydCB0b0RhdGUgZnJvbSBcIi4uL3RvRGF0ZS9pbmRleC5qc1wiO1xuaW1wb3J0IGZvcm1hdHRlcnMgZnJvbSBcIi4uL19saWIvZm9ybWF0L2Zvcm1hdHRlcnMvaW5kZXguanNcIjtcbmltcG9ydCBsb25nRm9ybWF0dGVycyBmcm9tIFwiLi4vX2xpYi9mb3JtYXQvbG9uZ0Zvcm1hdHRlcnMvaW5kZXguanNcIjtcbmltcG9ydCBnZXRUaW1lem9uZU9mZnNldEluTWlsbGlzZWNvbmRzIGZyb20gXCIuLi9fbGliL2dldFRpbWV6b25lT2Zmc2V0SW5NaWxsaXNlY29uZHMvaW5kZXguanNcIjtcbmltcG9ydCB7IGlzUHJvdGVjdGVkRGF5T2ZZZWFyVG9rZW4sIGlzUHJvdGVjdGVkV2Vla1llYXJUb2tlbiwgdGhyb3dQcm90ZWN0ZWRFcnJvciB9IGZyb20gXCIuLi9fbGliL3Byb3RlY3RlZFRva2Vucy9pbmRleC5qc1wiO1xuaW1wb3J0IHRvSW50ZWdlciBmcm9tIFwiLi4vX2xpYi90b0ludGVnZXIvaW5kZXguanNcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL19saWIvcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG5pbXBvcnQgeyBnZXREZWZhdWx0T3B0aW9ucyB9IGZyb20gXCIuLi9fbGliL2RlZmF1bHRPcHRpb25zL2luZGV4LmpzXCI7XG5pbXBvcnQgZGVmYXVsdExvY2FsZSBmcm9tIFwiLi4vX2xpYi9kZWZhdWx0TG9jYWxlL2luZGV4LmpzXCI7IC8vIFRoaXMgUmVnRXhwIGNvbnNpc3RzIG9mIHRocmVlIHBhcnRzIHNlcGFyYXRlZCBieSBgfGA6XG4vLyAtIFt5WVFxTUx3SWREZWNpaEhLa21zXW8gbWF0Y2hlcyBhbnkgYXZhaWxhYmxlIG9yZGluYWwgbnVtYmVyIHRva2VuXG4vLyAgIChvbmUgb2YgdGhlIGNlcnRhaW4gbGV0dGVycyBmb2xsb3dlZCBieSBgb2ApXG4vLyAtIChcXHcpXFwxKiBtYXRjaGVzIGFueSBzZXF1ZW5jZXMgb2YgdGhlIHNhbWUgbGV0dGVyXG4vLyAtICcnIG1hdGNoZXMgdHdvIHF1b3RlIGNoYXJhY3RlcnMgaW4gYSByb3dcbi8vIC0gJygnJ3xbXiddKSsoJ3wkKSBtYXRjaGVzIGFueXRoaW5nIHN1cnJvdW5kZWQgYnkgdHdvIHF1b3RlIGNoYXJhY3RlcnMgKCcpLFxuLy8gICBleGNlcHQgYSBzaW5nbGUgcXVvdGUgc3ltYm9sLCB3aGljaCBlbmRzIHRoZSBzZXF1ZW5jZS5cbi8vICAgVHdvIHF1b3RlIGNoYXJhY3RlcnMgZG8gbm90IGVuZCB0aGUgc2VxdWVuY2UuXG4vLyAgIElmIHRoZXJlIGlzIG5vIG1hdGNoaW5nIHNpbmdsZSBxdW90ZVxuLy8gICB0aGVuIHRoZSBzZXF1ZW5jZSB3aWxsIGNvbnRpbnVlIHVudGlsIHRoZSBlbmQgb2YgdGhlIHN0cmluZy5cbi8vIC0gLiBtYXRjaGVzIGFueSBzaW5nbGUgY2hhcmFjdGVyIHVubWF0Y2hlZCBieSBwcmV2aW91cyBwYXJ0cyBvZiB0aGUgUmVnRXhwc1xudmFyIGZvcm1hdHRpbmdUb2tlbnNSZWdFeHAgPSAvW3lZUXFNTHdJZERlY2loSEtrbXNdb3woXFx3KVxcMSp8Jyd8JygnJ3xbXiddKSsoJ3wkKXwuL2c7XG5cbi8vIFRoaXMgUmVnRXhwIGNhdGNoZXMgc3ltYm9scyBlc2NhcGVkIGJ5IHF1b3RlcywgYW5kIGFsc29cbi8vIHNlcXVlbmNlcyBvZiBzeW1ib2xzIFAsIHAsIGFuZCB0aGUgY29tYmluYXRpb25zIGxpa2UgYFBQUFBQUFBwcHBwcGBcbnZhciBsb25nRm9ybWF0dGluZ1Rva2Vuc1JlZ0V4cCA9IC9QK3ArfFArfHArfCcnfCcoJyd8W14nXSkrKCd8JCl8Li9nO1xudmFyIGVzY2FwZWRTdHJpbmdSZWdFeHAgPSAvXicoW15dKj8pJz8kLztcbnZhciBkb3VibGVRdW90ZVJlZ0V4cCA9IC8nJy9nO1xudmFyIHVuZXNjYXBlZExhdGluQ2hhcmFjdGVyUmVnRXhwID0gL1thLXpBLVpdLztcblxuLyoqXG4gKiBAbmFtZSBmb3JtYXRcbiAqIEBjYXRlZ29yeSBDb21tb24gSGVscGVyc1xuICogQHN1bW1hcnkgRm9ybWF0IHRoZSBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIHRoZSBmb3JtYXR0ZWQgZGF0ZSBzdHJpbmcgaW4gdGhlIGdpdmVuIGZvcm1hdC4gVGhlIHJlc3VsdCBtYXkgdmFyeSBieSBsb2NhbGUuXG4gKlxuICogPiDimqDvuI8gUGxlYXNlIG5vdGUgdGhhdCB0aGUgYGZvcm1hdGAgdG9rZW5zIGRpZmZlciBmcm9tIE1vbWVudC5qcyBhbmQgb3RoZXIgbGlicmFyaWVzLlxuICogPiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9ibG9iL21hc3Rlci9kb2NzL3VuaWNvZGVUb2tlbnMubWRcbiAqXG4gKiBUaGUgY2hhcmFjdGVycyB3cmFwcGVkIGJldHdlZW4gdHdvIHNpbmdsZSBxdW90ZXMgY2hhcmFjdGVycyAoJykgYXJlIGVzY2FwZWQuXG4gKiBUd28gc2luZ2xlIHF1b3RlcyBpbiBhIHJvdywgd2hldGhlciBpbnNpZGUgb3Igb3V0c2lkZSBhIHF1b3RlZCBzZXF1ZW5jZSwgcmVwcmVzZW50IGEgJ3JlYWwnIHNpbmdsZSBxdW90ZS5cbiAqIChzZWUgdGhlIGxhc3QgZXhhbXBsZSlcbiAqXG4gKiBGb3JtYXQgb2YgdGhlIHN0cmluZyBpcyBiYXNlZCBvbiBVbmljb2RlIFRlY2huaWNhbCBTdGFuZGFyZCAjMzU6XG4gKiBodHRwczovL3d3dy51bmljb2RlLm9yZy9yZXBvcnRzL3RyMzUvdHIzNS1kYXRlcy5odG1sI0RhdGVfRmllbGRfU3ltYm9sX1RhYmxlXG4gKiB3aXRoIGEgZmV3IGFkZGl0aW9ucyAoc2VlIG5vdGUgNyBiZWxvdyB0aGUgdGFibGUpLlxuICpcbiAqIEFjY2VwdGVkIHBhdHRlcm5zOlxuICogfCBVbml0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUGF0dGVybiB8IFJlc3VsdCBleGFtcGxlcyAgICAgICAgICAgICAgICAgICB8IE5vdGVzIHxcbiAqIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18LS0tLS0tLS0tfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfC0tLS0tLS18XG4gKiB8IEVyYSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBHLi5HR0cgIHwgQUQsIEJDICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgR0dHRyAgICB8IEFubm8gRG9taW5pLCBCZWZvcmUgQ2hyaXN0ICAgICAgICB8IDIgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEdHR0dHICAgfCBBLCBCICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8IENhbGVuZGFyIHllYXIgICAgICAgICAgICAgICAgICAgfCB5ICAgICAgIHwgNDQsIDEsIDE5MDAsIDIwMTcgICAgICAgICAgICAgICAgIHwgNSAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgeW8gICAgICB8IDQ0dGgsIDFzdCwgMHRoLCAxN3RoICAgICAgICAgICAgICB8IDUsNyAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHl5ICAgICAgfCA0NCwgMDEsIDAwLCAxNyAgICAgICAgICAgICAgICAgICAgfCA1ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB5eXkgICAgIHwgMDQ0LCAwMDEsIDE5MDAsIDIwMTcgICAgICAgICAgICAgIHwgNSAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgeXl5eSAgICB8IDAwNDQsIDAwMDEsIDE5MDAsIDIwMTcgICAgICAgICAgICB8IDUgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHl5eXl5ICAgfCAuLi4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAzLDUgICB8XG4gKiB8IExvY2FsIHdlZWstbnVtYmVyaW5nIHllYXIgICAgICAgfCBZICAgICAgIHwgNDQsIDEsIDE5MDAsIDIwMTcgICAgICAgICAgICAgICAgIHwgNSAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgWW8gICAgICB8IDQ0dGgsIDFzdCwgMTkwMHRoLCAyMDE3dGggICAgICAgICB8IDUsNyAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFlZICAgICAgfCA0NCwgMDEsIDAwLCAxNyAgICAgICAgICAgICAgICAgICAgfCA1LDggICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBZWVkgICAgIHwgMDQ0LCAwMDEsIDE5MDAsIDIwMTcgICAgICAgICAgICAgIHwgNSAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgWVlZWSAgICB8IDAwNDQsIDAwMDEsIDE5MDAsIDIwMTcgICAgICAgICAgICB8IDUsOCAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFlZWVlZICAgfCAuLi4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAzLDUgICB8XG4gKiB8IElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyICAgICAgICAgfCBSICAgICAgIHwgLTQzLCAwLCAxLCAxOTAwLCAyMDE3ICAgICAgICAgICAgIHwgNSw3ICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUlIgICAgICB8IC00MywgMDAsIDAxLCAxOTAwLCAyMDE3ICAgICAgICAgICB8IDUsNyAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFJSUiAgICAgfCAtMDQzLCAwMDAsIDAwMSwgMTkwMCwgMjAxNyAgICAgICAgfCA1LDcgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBSUlJSICAgIHwgLTAwNDMsIDAwMDAsIDAwMDEsIDE5MDAsIDIwMTcgICAgIHwgNSw3ICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUlJSUlIgICB8IC4uLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDMsNSw3IHxcbiAqIHwgRXh0ZW5kZWQgeWVhciAgICAgICAgICAgICAgICAgICB8IHUgICAgICAgfCAtNDMsIDAsIDEsIDE5MDAsIDIwMTcgICAgICAgICAgICAgfCA1ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB1dSAgICAgIHwgLTQzLCAwMSwgMTkwMCwgMjAxNyAgICAgICAgICAgICAgIHwgNSAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgdXV1ICAgICB8IC0wNDMsIDAwMSwgMTkwMCwgMjAxNyAgICAgICAgICAgICB8IDUgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHV1dXUgICAgfCAtMDA0MywgMDAwMSwgMTkwMCwgMjAxNyAgICAgICAgICAgfCA1ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB1dXV1dSAgIHwgLi4uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgMyw1ICAgfFxuICogfCBRdWFydGVyIChmb3JtYXR0aW5nKSAgICAgICAgICAgIHwgUSAgICAgICB8IDEsIDIsIDMsIDQgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFFvICAgICAgfCAxc3QsIDJuZCwgM3JkLCA0dGggICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBRUSAgICAgIHwgMDEsIDAyLCAwMywgMDQgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUVFRICAgICB8IFExLCBRMiwgUTMsIFE0ICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFFRUVEgICAgfCAxc3QgcXVhcnRlciwgMm5kIHF1YXJ0ZXIsIC4uLiAgICAgfCAyICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBRUVFRUSAgIHwgMSwgMiwgMywgNCAgICAgICAgICAgICAgICAgICAgICAgIHwgNCAgICAgfFxuICogfCBRdWFydGVyIChzdGFuZC1hbG9uZSkgICAgICAgICAgIHwgcSAgICAgICB8IDEsIDIsIDMsIDQgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHFvICAgICAgfCAxc3QsIDJuZCwgM3JkLCA0dGggICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBxcSAgICAgIHwgMDEsIDAyLCAwMywgMDQgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgcXFxICAgICB8IFExLCBRMiwgUTMsIFE0ICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHFxcXEgICAgfCAxc3QgcXVhcnRlciwgMm5kIHF1YXJ0ZXIsIC4uLiAgICAgfCAyICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBxcXFxcSAgIHwgMSwgMiwgMywgNCAgICAgICAgICAgICAgICAgICAgICAgIHwgNCAgICAgfFxuICogfCBNb250aCAoZm9ybWF0dGluZykgICAgICAgICAgICAgIHwgTSAgICAgICB8IDEsIDIsIC4uLiwgMTIgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IE1vICAgICAgfCAxc3QsIDJuZCwgLi4uLCAxMnRoICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBNTSAgICAgIHwgMDEsIDAyLCAuLi4sIDEyICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgTU1NICAgICB8IEphbiwgRmViLCAuLi4sIERlYyAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IE1NTU0gICAgfCBKYW51YXJ5LCBGZWJydWFyeSwgLi4uLCBEZWNlbWJlciAgfCAyICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBNTU1NTSAgIHwgSiwgRiwgLi4uLCBEICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBNb250aCAoc3RhbmQtYWxvbmUpICAgICAgICAgICAgIHwgTCAgICAgICB8IDEsIDIsIC4uLiwgMTIgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IExvICAgICAgfCAxc3QsIDJuZCwgLi4uLCAxMnRoICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBMTCAgICAgIHwgMDEsIDAyLCAuLi4sIDEyICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgTExMICAgICB8IEphbiwgRmViLCAuLi4sIERlYyAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IExMTEwgICAgfCBKYW51YXJ5LCBGZWJydWFyeSwgLi4uLCBEZWNlbWJlciAgfCAyICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBMTExMTCAgIHwgSiwgRiwgLi4uLCBEICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBMb2NhbCB3ZWVrIG9mIHllYXIgICAgICAgICAgICAgIHwgdyAgICAgICB8IDEsIDIsIC4uLiwgNTMgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHdvICAgICAgfCAxc3QsIDJuZCwgLi4uLCA1M3RoICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB3dyAgICAgIHwgMDEsIDAyLCAuLi4sIDUzICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBJU08gd2VlayBvZiB5ZWFyICAgICAgICAgICAgICAgIHwgSSAgICAgICB8IDEsIDIsIC4uLiwgNTMgICAgICAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IElvICAgICAgfCAxc3QsIDJuZCwgLi4uLCA1M3RoICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBJSSAgICAgIHwgMDEsIDAyLCAuLi4sIDUzICAgICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCBEYXkgb2YgbW9udGggICAgICAgICAgICAgICAgICAgIHwgZCAgICAgICB8IDEsIDIsIC4uLiwgMzEgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGRvICAgICAgfCAxc3QsIDJuZCwgLi4uLCAzMXN0ICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBkZCAgICAgIHwgMDEsIDAyLCAuLi4sIDMxICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBEYXkgb2YgeWVhciAgICAgICAgICAgICAgICAgICAgIHwgRCAgICAgICB8IDEsIDIsIC4uLiwgMzY1LCAzNjYgICAgICAgICAgICAgICB8IDkgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IERvICAgICAgfCAxc3QsIDJuZCwgLi4uLCAzNjV0aCwgMzY2dGggICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBERCAgICAgIHwgMDEsIDAyLCAuLi4sIDM2NSwgMzY2ICAgICAgICAgICAgIHwgOSAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgREREICAgICB8IDAwMSwgMDAyLCAuLi4sIDM2NSwgMzY2ICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEREREQgICAgfCAuLi4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAzICAgICB8XG4gKiB8IERheSBvZiB3ZWVrIChmb3JtYXR0aW5nKSAgICAgICAgfCBFLi5FRUUgIHwgTW9uLCBUdWUsIFdlZCwgLi4uLCBTdW4gICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgRUVFRSAgICB8IE1vbmRheSwgVHVlc2RheSwgLi4uLCBTdW5kYXkgICAgICB8IDIgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEVFRUVFICAgfCBNLCBULCBXLCBULCBGLCBTLCBTICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBFRUVFRUUgIHwgTW8sIFR1LCBXZSwgVGgsIEZyLCBTYSwgU3UgICAgICAgIHwgICAgICAgfFxuICogfCBJU08gZGF5IG9mIHdlZWsgKGZvcm1hdHRpbmcpICAgIHwgaSAgICAgICB8IDEsIDIsIDMsIC4uLiwgNyAgICAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGlvICAgICAgfCAxc3QsIDJuZCwgLi4uLCA3dGggICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBpaSAgICAgIHwgMDEsIDAyLCAuLi4sIDA3ICAgICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgaWlpICAgICB8IE1vbiwgVHVlLCBXZWQsIC4uLiwgU3VuICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGlpaWkgICAgfCBNb25kYXksIFR1ZXNkYXksIC4uLiwgU3VuZGF5ICAgICAgfCAyLDcgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBpaWlpaSAgIHwgTSwgVCwgVywgVCwgRiwgUywgUyAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgaWlpaWlpICB8IE1vLCBUdSwgV2UsIFRoLCBGciwgU2EsIFN1ICAgICAgICB8IDcgICAgIHxcbiAqIHwgTG9jYWwgZGF5IG9mIHdlZWsgKGZvcm1hdHRpbmcpICB8IGUgICAgICAgfCAyLCAzLCA0LCAuLi4sIDEgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBlbyAgICAgIHwgMm5kLCAzcmQsIC4uLiwgMXN0ICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgZWUgICAgICB8IDAyLCAwMywgLi4uLCAwMSAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGVlZSAgICAgfCBNb24sIFR1ZSwgV2VkLCAuLi4sIFN1biAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBlZWVlICAgIHwgTW9uZGF5LCBUdWVzZGF5LCAuLi4sIFN1bmRheSAgICAgIHwgMiAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgZWVlZWUgICB8IE0sIFQsIFcsIFQsIEYsIFMsIFMgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGVlZWVlZSAgfCBNbywgVHUsIFdlLCBUaCwgRnIsIFNhLCBTdSAgICAgICAgfCAgICAgICB8XG4gKiB8IExvY2FsIGRheSBvZiB3ZWVrIChzdGFuZC1hbG9uZSkgfCBjICAgICAgIHwgMiwgMywgNCwgLi4uLCAxICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgY28gICAgICB8IDJuZCwgM3JkLCAuLi4sIDFzdCAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGNjICAgICAgfCAwMiwgMDMsIC4uLiwgMDEgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBjY2MgICAgIHwgTW9uLCBUdWUsIFdlZCwgLi4uLCBTdW4gICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgY2NjYyAgICB8IE1vbmRheSwgVHVlc2RheSwgLi4uLCBTdW5kYXkgICAgICB8IDIgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGNjY2NjICAgfCBNLCBULCBXLCBULCBGLCBTLCBTICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBjY2NjY2MgIHwgTW8sIFR1LCBXZSwgVGgsIEZyLCBTYSwgU3UgICAgICAgIHwgICAgICAgfFxuICogfCBBTSwgUE0gICAgICAgICAgICAgICAgICAgICAgICAgIHwgYS4uYWEgICB8IEFNLCBQTSAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGFhYSAgICAgfCBhbSwgcG0gICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBhYWFhICAgIHwgYS5tLiwgcC5tLiAgICAgICAgICAgICAgICAgICAgICAgIHwgMiAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgYWFhYWEgICB8IGEsIHAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgQU0sIFBNLCBub29uLCBtaWRuaWdodCAgICAgICAgICB8IGIuLmJiICAgfCBBTSwgUE0sIG5vb24sIG1pZG5pZ2h0ICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBiYmIgICAgIHwgYW0sIHBtLCBub29uLCBtaWRuaWdodCAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgYmJiYiAgICB8IGEubS4sIHAubS4sIG5vb24sIG1pZG5pZ2h0ICAgICAgICB8IDIgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGJiYmJiICAgfCBhLCBwLCBuLCBtaSAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8IEZsZXhpYmxlIGRheSBwZXJpb2QgICAgICAgICAgICAgfCBCLi5CQkIgIHwgYXQgbmlnaHQsIGluIHRoZSBtb3JuaW5nLCAuLi4gICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgQkJCQiAgICB8IGF0IG5pZ2h0LCBpbiB0aGUgbW9ybmluZywgLi4uICAgICB8IDIgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEJCQkJCICAgfCBhdCBuaWdodCwgaW4gdGhlIG1vcm5pbmcsIC4uLiAgICAgfCAgICAgICB8XG4gKiB8IEhvdXIgWzEtMTJdICAgICAgICAgICAgICAgICAgICAgfCBoICAgICAgIHwgMSwgMiwgLi4uLCAxMSwgMTIgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgaG8gICAgICB8IDFzdCwgMm5kLCAuLi4sIDExdGgsIDEydGggICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGhoICAgICAgfCAwMSwgMDIsIC4uLiwgMTEsIDEyICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8IEhvdXIgWzAtMjNdICAgICAgICAgICAgICAgICAgICAgfCBIICAgICAgIHwgMCwgMSwgMiwgLi4uLCAyMyAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgSG8gICAgICB8IDB0aCwgMXN0LCAybmQsIC4uLiwgMjNyZCAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEhIICAgICAgfCAwMCwgMDEsIDAyLCAuLi4sIDIzICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8IEhvdXIgWzAtMTFdICAgICAgICAgICAgICAgICAgICAgfCBLICAgICAgIHwgMSwgMiwgLi4uLCAxMSwgMCAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgS28gICAgICB8IDFzdCwgMm5kLCAuLi4sIDExdGgsIDB0aCAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEtLICAgICAgfCAwMSwgMDIsIC4uLiwgMTEsIDAwICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8IEhvdXIgWzEtMjRdICAgICAgICAgICAgICAgICAgICAgfCBrICAgICAgIHwgMjQsIDEsIDIsIC4uLiwgMjMgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwga28gICAgICB8IDI0dGgsIDFzdCwgMm5kLCAuLi4sIDIzcmQgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGtrICAgICAgfCAyNCwgMDEsIDAyLCAuLi4sIDIzICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8IE1pbnV0ZSAgICAgICAgICAgICAgICAgICAgICAgICAgfCBtICAgICAgIHwgMCwgMSwgLi4uLCA1OSAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgbW8gICAgICB8IDB0aCwgMXN0LCAuLi4sIDU5dGggICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IG1tICAgICAgfCAwMCwgMDEsIC4uLiwgNTkgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8IFNlY29uZCAgICAgICAgICAgICAgICAgICAgICAgICAgfCBzICAgICAgIHwgMCwgMSwgLi4uLCA1OSAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgc28gICAgICB8IDB0aCwgMXN0LCAuLi4sIDU5dGggICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHNzICAgICAgfCAwMCwgMDEsIC4uLiwgNTkgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8IEZyYWN0aW9uIG9mIHNlY29uZCAgICAgICAgICAgICAgfCBTICAgICAgIHwgMCwgMSwgLi4uLCA5ICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgU1MgICAgICB8IDAwLCAwMSwgLi4uLCA5OSAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFNTUyAgICAgfCAwMDAsIDAwMSwgLi4uLCA5OTkgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBTU1NTICAgIHwgLi4uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgMyAgICAgfFxuICogfCBUaW1lem9uZSAoSVNPLTg2MDEgdy8gWikgICAgICAgIHwgWCAgICAgICB8IC0wOCwgKzA1MzAsIFogICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFhYICAgICAgfCAtMDgwMCwgKzA1MzAsIFogICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBYWFggICAgIHwgLTA4OjAwLCArMDU6MzAsIFogICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgWFhYWCAgICB8IC0wODAwLCArMDUzMCwgWiwgKzEyMzQ1NiAgICAgICAgICB8IDIgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFhYWFhYICAgfCAtMDg6MDAsICswNTozMCwgWiwgKzEyOjM0OjU2ICAgICAgfCAgICAgICB8XG4gKiB8IFRpbWV6b25lIChJU08tODYwMSB3L28gWikgICAgICAgfCB4ICAgICAgIHwgLTA4LCArMDUzMCwgKzAwICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgeHggICAgICB8IC0wODAwLCArMDUzMCwgKzAwMDAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHh4eCAgICAgfCAtMDg6MDAsICswNTozMCwgKzAwOjAwICAgICAgICAgICAgfCAyICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB4eHh4ICAgIHwgLTA4MDAsICswNTMwLCArMDAwMCwgKzEyMzQ1NiAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgeHh4eHggICB8IC0wODowMCwgKzA1OjMwLCArMDA6MDAsICsxMjozNDo1NiB8ICAgICAgIHxcbiAqIHwgVGltZXpvbmUgKEdNVCkgICAgICAgICAgICAgICAgICB8IE8uLi5PT08gfCBHTVQtOCwgR01UKzU6MzAsIEdNVCswICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBPT09PICAgIHwgR01ULTA4OjAwLCBHTVQrMDU6MzAsIEdNVCswMDowMCAgIHwgMiAgICAgfFxuICogfCBUaW1lem9uZSAoc3BlY2lmaWMgbm9uLWxvY2F0LikgIHwgei4uLnp6eiB8IEdNVC04LCBHTVQrNTozMCwgR01UKzAgICAgICAgICAgICB8IDYgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHp6enogICAgfCBHTVQtMDg6MDAsIEdNVCswNTozMCwgR01UKzAwOjAwICAgfCAyLDYgICB8XG4gKiB8IFNlY29uZHMgdGltZXN0YW1wICAgICAgICAgICAgICAgfCB0ICAgICAgIHwgNTEyOTY5NTIwICAgICAgICAgICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgdHQgICAgICB8IC4uLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDMsNyAgIHxcbiAqIHwgTWlsbGlzZWNvbmRzIHRpbWVzdGFtcCAgICAgICAgICB8IFQgICAgICAgfCA1MTI5Njk1MjA5MDAgICAgICAgICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBUVCAgICAgIHwgLi4uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgMyw3ICAgfFxuICogfCBMb25nIGxvY2FsaXplZCBkYXRlICAgICAgICAgICAgIHwgUCAgICAgICB8IDA0LzI5LzE0NTMgICAgICAgICAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFBQICAgICAgfCBBcHIgMjksIDE0NTMgICAgICAgICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBQUFAgICAgIHwgQXByaWwgMjl0aCwgMTQ1MyAgICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUFBQUCAgICB8IEZyaWRheSwgQXByaWwgMjl0aCwgMTQ1MyAgICAgICAgICB8IDIsNyAgIHxcbiAqIHwgTG9uZyBsb2NhbGl6ZWQgdGltZSAgICAgICAgICAgICB8IHAgICAgICAgfCAxMjowMCBBTSAgICAgICAgICAgICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBwcCAgICAgIHwgMTI6MDA6MDAgQU0gICAgICAgICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgcHBwICAgICB8IDEyOjAwOjAwIEFNIEdNVCsyICAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHBwcHAgICAgfCAxMjowMDowMCBBTSBHTVQrMDI6MDAgICAgICAgICAgICAgfCAyLDcgICB8XG4gKiB8IENvbWJpbmF0aW9uIG9mIGRhdGUgYW5kIHRpbWUgICAgfCBQcCAgICAgIHwgMDQvMjkvMTQ1MywgMTI6MDAgQU0gICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUFBwcCAgICB8IEFwciAyOSwgMTQ1MywgMTI6MDA6MDAgQU0gICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFBQUHBwcCAgfCBBcHJpbCAyOXRoLCAxNDUzIGF0IC4uLiAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBQUFBQcHBwcHwgRnJpZGF5LCBBcHJpbCAyOXRoLCAxNDUzIGF0IC4uLiAgIHwgMiw3ICAgfFxuICogTm90ZXM6XG4gKiAxLiBcIkZvcm1hdHRpbmdcIiB1bml0cyAoZS5nLiBmb3JtYXR0aW5nIHF1YXJ0ZXIpIGluIHRoZSBkZWZhdWx0IGVuLVVTIGxvY2FsZVxuICogICAgYXJlIHRoZSBzYW1lIGFzIFwic3RhbmQtYWxvbmVcIiB1bml0cywgYnV0IGFyZSBkaWZmZXJlbnQgaW4gc29tZSBsYW5ndWFnZXMuXG4gKiAgICBcIkZvcm1hdHRpbmdcIiB1bml0cyBhcmUgZGVjbGluZWQgYWNjb3JkaW5nIHRvIHRoZSBydWxlcyBvZiB0aGUgbGFuZ3VhZ2VcbiAqICAgIGluIHRoZSBjb250ZXh0IG9mIGEgZGF0ZS4gXCJTdGFuZC1hbG9uZVwiIHVuaXRzIGFyZSBhbHdheXMgbm9taW5hdGl2ZSBzaW5ndWxhcjpcbiAqXG4gKiAgICBgZm9ybWF0KG5ldyBEYXRlKDIwMTcsIDEwLCA2KSwgJ2RvIExMTEwnLCB7bG9jYWxlOiBjc30pIC8vPT4gJzYuIGxpc3RvcGFkJ2BcbiAqXG4gKiAgICBgZm9ybWF0KG5ldyBEYXRlKDIwMTcsIDEwLCA2KSwgJ2RvIE1NTU0nLCB7bG9jYWxlOiBjc30pIC8vPT4gJzYuIGxpc3RvcGFkdSdgXG4gKlxuICogMi4gQW55IHNlcXVlbmNlIG9mIHRoZSBpZGVudGljYWwgbGV0dGVycyBpcyBhIHBhdHRlcm4sIHVubGVzcyBpdCBpcyBlc2NhcGVkIGJ5XG4gKiAgICB0aGUgc2luZ2xlIHF1b3RlIGNoYXJhY3RlcnMgKHNlZSBiZWxvdykuXG4gKiAgICBJZiB0aGUgc2VxdWVuY2UgaXMgbG9uZ2VyIHRoYW4gbGlzdGVkIGluIHRhYmxlIChlLmcuIGBFRUVFRUVFRUVFRWApXG4gKiAgICB0aGUgb3V0cHV0IHdpbGwgYmUgdGhlIHNhbWUgYXMgZGVmYXVsdCBwYXR0ZXJuIGZvciB0aGlzIHVuaXQsIHVzdWFsbHlcbiAqICAgIHRoZSBsb25nZXN0IG9uZSAoaW4gY2FzZSBvZiBJU08gd2Vla2RheXMsIGBFRUVFYCkuIERlZmF1bHQgcGF0dGVybnMgZm9yIHVuaXRzXG4gKiAgICBhcmUgbWFya2VkIHdpdGggXCIyXCIgaW4gdGhlIGxhc3QgY29sdW1uIG9mIHRoZSB0YWJsZS5cbiAqXG4gKiAgICBgZm9ybWF0KG5ldyBEYXRlKDIwMTcsIDEwLCA2KSwgJ01NTScpIC8vPT4gJ05vdidgXG4gKlxuICogICAgYGZvcm1hdChuZXcgRGF0ZSgyMDE3LCAxMCwgNiksICdNTU1NJykgLy89PiAnTm92ZW1iZXInYFxuICpcbiAqICAgIGBmb3JtYXQobmV3IERhdGUoMjAxNywgMTAsIDYpLCAnTU1NTU0nKSAvLz0+ICdOJ2BcbiAqXG4gKiAgICBgZm9ybWF0KG5ldyBEYXRlKDIwMTcsIDEwLCA2KSwgJ01NTU1NTScpIC8vPT4gJ05vdmVtYmVyJ2BcbiAqXG4gKiAgICBgZm9ybWF0KG5ldyBEYXRlKDIwMTcsIDEwLCA2KSwgJ01NTU1NTU0nKSAvLz0+ICdOb3ZlbWJlcidgXG4gKlxuICogMy4gU29tZSBwYXR0ZXJucyBjb3VsZCBiZSB1bmxpbWl0ZWQgbGVuZ3RoIChzdWNoIGFzIGB5eXl5eXl5eWApLlxuICogICAgVGhlIG91dHB1dCB3aWxsIGJlIHBhZGRlZCB3aXRoIHplcm9zIHRvIG1hdGNoIHRoZSBsZW5ndGggb2YgdGhlIHBhdHRlcm4uXG4gKlxuICogICAgYGZvcm1hdChuZXcgRGF0ZSgyMDE3LCAxMCwgNiksICd5eXl5eXl5eScpIC8vPT4gJzAwMDAyMDE3J2BcbiAqXG4gKiA0LiBgUVFRUVFgIGFuZCBgcXFxcXFgIGNvdWxkIGJlIG5vdCBzdHJpY3RseSBudW1lcmljYWwgaW4gc29tZSBsb2NhbGVzLlxuICogICAgVGhlc2UgdG9rZW5zIHJlcHJlc2VudCB0aGUgc2hvcnRlc3QgZm9ybSBvZiB0aGUgcXVhcnRlci5cbiAqXG4gKiA1LiBUaGUgbWFpbiBkaWZmZXJlbmNlIGJldHdlZW4gYHlgIGFuZCBgdWAgcGF0dGVybnMgYXJlIEIuQy4geWVhcnM6XG4gKlxuICogICAgfCBZZWFyIHwgYHlgIHwgYHVgIHxcbiAqICAgIHwtLS0tLS18LS0tLS18LS0tLS18XG4gKiAgICB8IEFDIDEgfCAgIDEgfCAgIDEgfFxuICogICAgfCBCQyAxIHwgICAxIHwgICAwIHxcbiAqICAgIHwgQkMgMiB8ICAgMiB8ICAtMSB8XG4gKlxuICogICAgQWxzbyBgeXlgIGFsd2F5cyByZXR1cm5zIHRoZSBsYXN0IHR3byBkaWdpdHMgb2YgYSB5ZWFyLFxuICogICAgd2hpbGUgYHV1YCBwYWRzIHNpbmdsZSBkaWdpdCB5ZWFycyB0byAyIGNoYXJhY3RlcnMgYW5kIHJldHVybnMgb3RoZXIgeWVhcnMgdW5jaGFuZ2VkOlxuICpcbiAqICAgIHwgWWVhciB8IGB5eWAgfCBgdXVgIHxcbiAqICAgIHwtLS0tLS18LS0tLS0tfC0tLS0tLXxcbiAqICAgIHwgMSAgICB8ICAgMDEgfCAgIDAxIHxcbiAqICAgIHwgMTQgICB8ICAgMTQgfCAgIDE0IHxcbiAqICAgIHwgMzc2ICB8ICAgNzYgfCAgMzc2IHxcbiAqICAgIHwgMTQ1MyB8ICAgNTMgfCAxNDUzIHxcbiAqXG4gKiAgICBUaGUgc2FtZSBkaWZmZXJlbmNlIGlzIHRydWUgZm9yIGxvY2FsIGFuZCBJU08gd2Vlay1udW1iZXJpbmcgeWVhcnMgKGBZYCBhbmQgYFJgKSxcbiAqICAgIGV4Y2VwdCBsb2NhbCB3ZWVrLW51bWJlcmluZyB5ZWFycyBhcmUgZGVwZW5kZW50IG9uIGBvcHRpb25zLndlZWtTdGFydHNPbmBcbiAqICAgIGFuZCBgb3B0aW9ucy5maXJzdFdlZWtDb250YWluc0RhdGVgIChjb21wYXJlIFtnZXRJU09XZWVrWWVhcl17QGxpbmsgaHR0cHM6Ly9kYXRlLWZucy5vcmcvZG9jcy9nZXRJU09XZWVrWWVhcn1cbiAqICAgIGFuZCBbZ2V0V2Vla1llYXJde0BsaW5rIGh0dHBzOi8vZGF0ZS1mbnMub3JnL2RvY3MvZ2V0V2Vla1llYXJ9KS5cbiAqXG4gKiA2LiBTcGVjaWZpYyBub24tbG9jYXRpb24gdGltZXpvbmVzIGFyZSBjdXJyZW50bHkgdW5hdmFpbGFibGUgaW4gYGRhdGUtZm5zYCxcbiAqICAgIHNvIHJpZ2h0IG5vdyB0aGVzZSB0b2tlbnMgZmFsbCBiYWNrIHRvIEdNVCB0aW1lem9uZXMuXG4gKlxuICogNy4gVGhlc2UgcGF0dGVybnMgYXJlIG5vdCBpbiB0aGUgVW5pY29kZSBUZWNobmljYWwgU3RhbmRhcmQgIzM1OlxuICogICAgLSBgaWA6IElTTyBkYXkgb2Ygd2Vla1xuICogICAgLSBgSWA6IElTTyB3ZWVrIG9mIHllYXJcbiAqICAgIC0gYFJgOiBJU08gd2Vlay1udW1iZXJpbmcgeWVhclxuICogICAgLSBgdGA6IHNlY29uZHMgdGltZXN0YW1wXG4gKiAgICAtIGBUYDogbWlsbGlzZWNvbmRzIHRpbWVzdGFtcFxuICogICAgLSBgb2A6IG9yZGluYWwgbnVtYmVyIG1vZGlmaWVyXG4gKiAgICAtIGBQYDogbG9uZyBsb2NhbGl6ZWQgZGF0ZVxuICogICAgLSBgcGA6IGxvbmcgbG9jYWxpemVkIHRpbWVcbiAqXG4gKiA4LiBgWVlgIGFuZCBgWVlZWWAgdG9rZW5zIHJlcHJlc2VudCB3ZWVrLW51bWJlcmluZyB5ZWFycyBidXQgdGhleSBhcmUgb2Z0ZW4gY29uZnVzZWQgd2l0aCB5ZWFycy5cbiAqICAgIFlvdSBzaG91bGQgZW5hYmxlIGBvcHRpb25zLnVzZUFkZGl0aW9uYWxXZWVrWWVhclRva2Vuc2AgdG8gdXNlIHRoZW0uIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2Jsb2IvbWFzdGVyL2RvY3MvdW5pY29kZVRva2Vucy5tZFxuICpcbiAqIDkuIGBEYCBhbmQgYEREYCB0b2tlbnMgcmVwcmVzZW50IGRheXMgb2YgdGhlIHllYXIgYnV0IHRoZXkgYXJlIG9mdGVuIGNvbmZ1c2VkIHdpdGggZGF5cyBvZiB0aGUgbW9udGguXG4gKiAgICBZb3Ugc2hvdWxkIGVuYWJsZSBgb3B0aW9ucy51c2VBZGRpdGlvbmFsRGF5T2ZZZWFyVG9rZW5zYCB0byB1c2UgdGhlbS4gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91bmljb2RlVG9rZW5zLm1kXG4gKlxuICogQHBhcmFtIHtEYXRlfE51bWJlcn0gZGF0ZSAtIHRoZSBvcmlnaW5hbCBkYXRlXG4gKiBAcGFyYW0ge1N0cmluZ30gZm9ybWF0IC0gdGhlIHN0cmluZyBvZiB0b2tlbnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBhbiBvYmplY3Qgd2l0aCBvcHRpb25zLlxuICogQHBhcmFtIHtMb2NhbGV9IFtvcHRpb25zLmxvY2FsZT1kZWZhdWx0TG9jYWxlXSAtIHRoZSBsb2NhbGUgb2JqZWN0LiBTZWUgW0xvY2FsZV17QGxpbmsgaHR0cHM6Ly9kYXRlLWZucy5vcmcvZG9jcy9Mb2NhbGV9XG4gKiBAcGFyYW0gezB8MXwyfDN8NHw1fDZ9IFtvcHRpb25zLndlZWtTdGFydHNPbj0wXSAtIHRoZSBpbmRleCBvZiB0aGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrICgwIC0gU3VuZGF5KVxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmZpcnN0V2Vla0NvbnRhaW5zRGF0ZT0xXSAtIHRoZSBkYXkgb2YgSmFudWFyeSwgd2hpY2ggaXNcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMudXNlQWRkaXRpb25hbFdlZWtZZWFyVG9rZW5zPWZhbHNlXSAtIGlmIHRydWUsIGFsbG93cyB1c2FnZSBvZiB0aGUgd2Vlay1udW1iZXJpbmcgeWVhciB0b2tlbnMgYFlZYCBhbmQgYFlZWVlgO1xuICogICBzZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9ibG9iL21hc3Rlci9kb2NzL3VuaWNvZGVUb2tlbnMubWRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMudXNlQWRkaXRpb25hbERheU9mWWVhclRva2Vucz1mYWxzZV0gLSBpZiB0cnVlLCBhbGxvd3MgdXNhZ2Ugb2YgdGhlIGRheSBvZiB5ZWFyIHRva2VucyBgRGAgYW5kIGBERGA7XG4gKiAgIHNlZTogaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2Jsb2IvbWFzdGVyL2RvY3MvdW5pY29kZVRva2Vucy5tZFxuICogQHJldHVybnMge1N0cmluZ30gdGhlIGZvcm1hdHRlZCBkYXRlIHN0cmluZ1xuICogQHRocm93cyB7VHlwZUVycm9yfSAyIGFyZ3VtZW50cyByZXF1aXJlZFxuICogQHRocm93cyB7UmFuZ2VFcnJvcn0gYGRhdGVgIG11c3Qgbm90IGJlIEludmFsaWQgRGF0ZVxuICogQHRocm93cyB7UmFuZ2VFcnJvcn0gYG9wdGlvbnMubG9jYWxlYCBtdXN0IGNvbnRhaW4gYGxvY2FsaXplYCBwcm9wZXJ0eVxuICogQHRocm93cyB7UmFuZ2VFcnJvcn0gYG9wdGlvbnMubG9jYWxlYCBtdXN0IGNvbnRhaW4gYGZvcm1hdExvbmdgIHByb3BlcnR5XG4gKiBAdGhyb3dzIHtSYW5nZUVycm9yfSBgb3B0aW9ucy53ZWVrU3RhcnRzT25gIG11c3QgYmUgYmV0d2VlbiAwIGFuZCA2XG4gKiBAdGhyb3dzIHtSYW5nZUVycm9yfSBgb3B0aW9ucy5maXJzdFdlZWtDb250YWluc0RhdGVgIG11c3QgYmUgYmV0d2VlbiAxIGFuZCA3XG4gKiBAdGhyb3dzIHtSYW5nZUVycm9yfSB1c2UgYHl5eXlgIGluc3RlYWQgb2YgYFlZWVlgIGZvciBmb3JtYXR0aW5nIHllYXJzIHVzaW5nIFtmb3JtYXQgcHJvdmlkZWRdIHRvIHRoZSBpbnB1dCBbaW5wdXQgcHJvdmlkZWRdOyBzZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9ibG9iL21hc3Rlci9kb2NzL3VuaWNvZGVUb2tlbnMubWRcbiAqIEB0aHJvd3Mge1JhbmdlRXJyb3J9IHVzZSBgeXlgIGluc3RlYWQgb2YgYFlZYCBmb3IgZm9ybWF0dGluZyB5ZWFycyB1c2luZyBbZm9ybWF0IHByb3ZpZGVkXSB0byB0aGUgaW5wdXQgW2lucHV0IHByb3ZpZGVkXTsgc2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91bmljb2RlVG9rZW5zLm1kXG4gKiBAdGhyb3dzIHtSYW5nZUVycm9yfSB1c2UgYGRgIGluc3RlYWQgb2YgYERgIGZvciBmb3JtYXR0aW5nIGRheXMgb2YgdGhlIG1vbnRoIHVzaW5nIFtmb3JtYXQgcHJvdmlkZWRdIHRvIHRoZSBpbnB1dCBbaW5wdXQgcHJvdmlkZWRdOyBzZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9ibG9iL21hc3Rlci9kb2NzL3VuaWNvZGVUb2tlbnMubWRcbiAqIEB0aHJvd3Mge1JhbmdlRXJyb3J9IHVzZSBgZGRgIGluc3RlYWQgb2YgYEREYCBmb3IgZm9ybWF0dGluZyBkYXlzIG9mIHRoZSBtb250aCB1c2luZyBbZm9ybWF0IHByb3ZpZGVkXSB0byB0aGUgaW5wdXQgW2lucHV0IHByb3ZpZGVkXTsgc2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91bmljb2RlVG9rZW5zLm1kXG4gKiBAdGhyb3dzIHtSYW5nZUVycm9yfSBmb3JtYXQgc3RyaW5nIGNvbnRhaW5zIGFuIHVuZXNjYXBlZCBsYXRpbiBhbHBoYWJldCBjaGFyYWN0ZXJcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gUmVwcmVzZW50IDExIEZlYnJ1YXJ5IDIwMTQgaW4gbWlkZGxlLWVuZGlhbiBmb3JtYXQ6XG4gKiBjb25zdCByZXN1bHQgPSBmb3JtYXQobmV3IERhdGUoMjAxNCwgMSwgMTEpLCAnTU0vZGQveXl5eScpXG4gKiAvLz0+ICcwMi8xMS8yMDE0J1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBSZXByZXNlbnQgMiBKdWx5IDIwMTQgaW4gRXNwZXJhbnRvOlxuICogaW1wb3J0IHsgZW9Mb2NhbGUgfSBmcm9tICdkYXRlLWZucy9sb2NhbGUvZW8nXG4gKiBjb25zdCByZXN1bHQgPSBmb3JtYXQobmV3IERhdGUoMjAxNCwgNiwgMiksIFwiZG8gJ2RlJyBNTU1NIHl5eXlcIiwge1xuICogICBsb2NhbGU6IGVvTG9jYWxlXG4gKiB9KVxuICogLy89PiAnMi1hIGRlIGp1bGlvIDIwMTQnXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEVzY2FwZSBzdHJpbmcgYnkgc2luZ2xlIHF1b3RlIGNoYXJhY3RlcnM6XG4gKiBjb25zdCByZXN1bHQgPSBmb3JtYXQobmV3IERhdGUoMjAxNCwgNiwgMiwgMTUpLCBcImggJ28nJ2Nsb2NrJ1wiKVxuICogLy89PiBcIjMgbydjbG9ja1wiXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZm9ybWF0KGRpcnR5RGF0ZSwgZGlydHlGb3JtYXRTdHIsIG9wdGlvbnMpIHtcbiAgdmFyIF9yZWYsIF9vcHRpb25zJGxvY2FsZSwgX3JlZjIsIF9yZWYzLCBfcmVmNCwgX29wdGlvbnMkZmlyc3RXZWVrQ29uLCBfb3B0aW9ucyRsb2NhbGUyLCBfb3B0aW9ucyRsb2NhbGUyJG9wdGksIF9kZWZhdWx0T3B0aW9ucyRsb2NhbCwgX2RlZmF1bHRPcHRpb25zJGxvY2FsMiwgX3JlZjUsIF9yZWY2LCBfcmVmNywgX29wdGlvbnMkd2Vla1N0YXJ0c09uLCBfb3B0aW9ucyRsb2NhbGUzLCBfb3B0aW9ucyRsb2NhbGUzJG9wdGksIF9kZWZhdWx0T3B0aW9ucyRsb2NhbDMsIF9kZWZhdWx0T3B0aW9ucyRsb2NhbDQ7XG4gIHJlcXVpcmVkQXJncygyLCBhcmd1bWVudHMpO1xuICB2YXIgZm9ybWF0U3RyID0gU3RyaW5nKGRpcnR5Rm9ybWF0U3RyKTtcbiAgdmFyIGRlZmF1bHRPcHRpb25zID0gZ2V0RGVmYXVsdE9wdGlvbnMoKTtcbiAgdmFyIGxvY2FsZSA9IChfcmVmID0gKF9vcHRpb25zJGxvY2FsZSA9IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5sb2NhbGUpICE9PSBudWxsICYmIF9vcHRpb25zJGxvY2FsZSAhPT0gdm9pZCAwID8gX29wdGlvbnMkbG9jYWxlIDogZGVmYXVsdE9wdGlvbnMubG9jYWxlKSAhPT0gbnVsbCAmJiBfcmVmICE9PSB2b2lkIDAgPyBfcmVmIDogZGVmYXVsdExvY2FsZTtcbiAgdmFyIGZpcnN0V2Vla0NvbnRhaW5zRGF0ZSA9IHRvSW50ZWdlcigoX3JlZjIgPSAoX3JlZjMgPSAoX3JlZjQgPSAoX29wdGlvbnMkZmlyc3RXZWVrQ29uID0gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSkgIT09IG51bGwgJiYgX29wdGlvbnMkZmlyc3RXZWVrQ29uICE9PSB2b2lkIDAgPyBfb3B0aW9ucyRmaXJzdFdlZWtDb24gOiBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IChfb3B0aW9ucyRsb2NhbGUyID0gb3B0aW9ucy5sb2NhbGUpID09PSBudWxsIHx8IF9vcHRpb25zJGxvY2FsZTIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IChfb3B0aW9ucyRsb2NhbGUyJG9wdGkgPSBfb3B0aW9ucyRsb2NhbGUyLm9wdGlvbnMpID09PSBudWxsIHx8IF9vcHRpb25zJGxvY2FsZTIkb3B0aSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX29wdGlvbnMkbG9jYWxlMiRvcHRpLmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSkgIT09IG51bGwgJiYgX3JlZjQgIT09IHZvaWQgMCA/IF9yZWY0IDogZGVmYXVsdE9wdGlvbnMuZmlyc3RXZWVrQ29udGFpbnNEYXRlKSAhPT0gbnVsbCAmJiBfcmVmMyAhPT0gdm9pZCAwID8gX3JlZjMgOiAoX2RlZmF1bHRPcHRpb25zJGxvY2FsID0gZGVmYXVsdE9wdGlvbnMubG9jYWxlKSA9PT0gbnVsbCB8fCBfZGVmYXVsdE9wdGlvbnMkbG9jYWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IChfZGVmYXVsdE9wdGlvbnMkbG9jYWwyID0gX2RlZmF1bHRPcHRpb25zJGxvY2FsLm9wdGlvbnMpID09PSBudWxsIHx8IF9kZWZhdWx0T3B0aW9ucyRsb2NhbDIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kZWZhdWx0T3B0aW9ucyRsb2NhbDIuZmlyc3RXZWVrQ29udGFpbnNEYXRlKSAhPT0gbnVsbCAmJiBfcmVmMiAhPT0gdm9pZCAwID8gX3JlZjIgOiAxKTtcblxuICAvLyBUZXN0IGlmIHdlZWtTdGFydHNPbiBpcyBiZXR3ZWVuIDEgYW5kIDcgX2FuZF8gaXMgbm90IE5hTlxuICBpZiAoIShmaXJzdFdlZWtDb250YWluc0RhdGUgPj0gMSAmJiBmaXJzdFdlZWtDb250YWluc0RhdGUgPD0gNykpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignZmlyc3RXZWVrQ29udGFpbnNEYXRlIG11c3QgYmUgYmV0d2VlbiAxIGFuZCA3IGluY2x1c2l2ZWx5Jyk7XG4gIH1cbiAgdmFyIHdlZWtTdGFydHNPbiA9IHRvSW50ZWdlcigoX3JlZjUgPSAoX3JlZjYgPSAoX3JlZjcgPSAoX29wdGlvbnMkd2Vla1N0YXJ0c09uID0gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLndlZWtTdGFydHNPbikgIT09IG51bGwgJiYgX29wdGlvbnMkd2Vla1N0YXJ0c09uICE9PSB2b2lkIDAgPyBfb3B0aW9ucyR3ZWVrU3RhcnRzT24gOiBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IChfb3B0aW9ucyRsb2NhbGUzID0gb3B0aW9ucy5sb2NhbGUpID09PSBudWxsIHx8IF9vcHRpb25zJGxvY2FsZTMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IChfb3B0aW9ucyRsb2NhbGUzJG9wdGkgPSBfb3B0aW9ucyRsb2NhbGUzLm9wdGlvbnMpID09PSBudWxsIHx8IF9vcHRpb25zJGxvY2FsZTMkb3B0aSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX29wdGlvbnMkbG9jYWxlMyRvcHRpLndlZWtTdGFydHNPbikgIT09IG51bGwgJiYgX3JlZjcgIT09IHZvaWQgMCA/IF9yZWY3IDogZGVmYXVsdE9wdGlvbnMud2Vla1N0YXJ0c09uKSAhPT0gbnVsbCAmJiBfcmVmNiAhPT0gdm9pZCAwID8gX3JlZjYgOiAoX2RlZmF1bHRPcHRpb25zJGxvY2FsMyA9IGRlZmF1bHRPcHRpb25zLmxvY2FsZSkgPT09IG51bGwgfHwgX2RlZmF1bHRPcHRpb25zJGxvY2FsMyA9PT0gdm9pZCAwID8gdm9pZCAwIDogKF9kZWZhdWx0T3B0aW9ucyRsb2NhbDQgPSBfZGVmYXVsdE9wdGlvbnMkbG9jYWwzLm9wdGlvbnMpID09PSBudWxsIHx8IF9kZWZhdWx0T3B0aW9ucyRsb2NhbDQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kZWZhdWx0T3B0aW9ucyRsb2NhbDQud2Vla1N0YXJ0c09uKSAhPT0gbnVsbCAmJiBfcmVmNSAhPT0gdm9pZCAwID8gX3JlZjUgOiAwKTtcblxuICAvLyBUZXN0IGlmIHdlZWtTdGFydHNPbiBpcyBiZXR3ZWVuIDAgYW5kIDYgX2FuZF8gaXMgbm90IE5hTlxuICBpZiAoISh3ZWVrU3RhcnRzT24gPj0gMCAmJiB3ZWVrU3RhcnRzT24gPD0gNikpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignd2Vla1N0YXJ0c09uIG11c3QgYmUgYmV0d2VlbiAwIGFuZCA2IGluY2x1c2l2ZWx5Jyk7XG4gIH1cbiAgaWYgKCFsb2NhbGUubG9jYWxpemUpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignbG9jYWxlIG11c3QgY29udGFpbiBsb2NhbGl6ZSBwcm9wZXJ0eScpO1xuICB9XG4gIGlmICghbG9jYWxlLmZvcm1hdExvbmcpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignbG9jYWxlIG11c3QgY29udGFpbiBmb3JtYXRMb25nIHByb3BlcnR5Jyk7XG4gIH1cbiAgdmFyIG9yaWdpbmFsRGF0ZSA9IHRvRGF0ZShkaXJ0eURhdGUpO1xuICBpZiAoIWlzVmFsaWQob3JpZ2luYWxEYXRlKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbnZhbGlkIHRpbWUgdmFsdWUnKTtcbiAgfVxuXG4gIC8vIENvbnZlcnQgdGhlIGRhdGUgaW4gc3lzdGVtIHRpbWV6b25lIHRvIHRoZSBzYW1lIGRhdGUgaW4gVVRDKzAwOjAwIHRpbWV6b25lLlxuICAvLyBUaGlzIGVuc3VyZXMgdGhhdCB3aGVuIFVUQyBmdW5jdGlvbnMgd2lsbCBiZSBpbXBsZW1lbnRlZCwgbG9jYWxlcyB3aWxsIGJlIGNvbXBhdGlibGUgd2l0aCB0aGVtLlxuICAvLyBTZWUgYW4gaXNzdWUgYWJvdXQgVVRDIGZ1bmN0aW9uczogaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2lzc3Vlcy8zNzZcbiAgdmFyIHRpbWV6b25lT2Zmc2V0ID0gZ2V0VGltZXpvbmVPZmZzZXRJbk1pbGxpc2Vjb25kcyhvcmlnaW5hbERhdGUpO1xuICB2YXIgdXRjRGF0ZSA9IHN1Yk1pbGxpc2Vjb25kcyhvcmlnaW5hbERhdGUsIHRpbWV6b25lT2Zmc2V0KTtcbiAgdmFyIGZvcm1hdHRlck9wdGlvbnMgPSB7XG4gICAgZmlyc3RXZWVrQ29udGFpbnNEYXRlOiBmaXJzdFdlZWtDb250YWluc0RhdGUsXG4gICAgd2Vla1N0YXJ0c09uOiB3ZWVrU3RhcnRzT24sXG4gICAgbG9jYWxlOiBsb2NhbGUsXG4gICAgX29yaWdpbmFsRGF0ZTogb3JpZ2luYWxEYXRlXG4gIH07XG4gIHZhciByZXN1bHQgPSBmb3JtYXRTdHIubWF0Y2gobG9uZ0Zvcm1hdHRpbmdUb2tlbnNSZWdFeHApLm1hcChmdW5jdGlvbiAoc3Vic3RyaW5nKSB7XG4gICAgdmFyIGZpcnN0Q2hhcmFjdGVyID0gc3Vic3RyaW5nWzBdO1xuICAgIGlmIChmaXJzdENoYXJhY3RlciA9PT0gJ3AnIHx8IGZpcnN0Q2hhcmFjdGVyID09PSAnUCcpIHtcbiAgICAgIHZhciBsb25nRm9ybWF0dGVyID0gbG9uZ0Zvcm1hdHRlcnNbZmlyc3RDaGFyYWN0ZXJdO1xuICAgICAgcmV0dXJuIGxvbmdGb3JtYXR0ZXIoc3Vic3RyaW5nLCBsb2NhbGUuZm9ybWF0TG9uZyk7XG4gICAgfVxuICAgIHJldHVybiBzdWJzdHJpbmc7XG4gIH0pLmpvaW4oJycpLm1hdGNoKGZvcm1hdHRpbmdUb2tlbnNSZWdFeHApLm1hcChmdW5jdGlvbiAoc3Vic3RyaW5nKSB7XG4gICAgLy8gUmVwbGFjZSB0d28gc2luZ2xlIHF1b3RlIGNoYXJhY3RlcnMgd2l0aCBvbmUgc2luZ2xlIHF1b3RlIGNoYXJhY3RlclxuICAgIGlmIChzdWJzdHJpbmcgPT09IFwiJydcIikge1xuICAgICAgcmV0dXJuIFwiJ1wiO1xuICAgIH1cbiAgICB2YXIgZmlyc3RDaGFyYWN0ZXIgPSBzdWJzdHJpbmdbMF07XG4gICAgaWYgKGZpcnN0Q2hhcmFjdGVyID09PSBcIidcIikge1xuICAgICAgcmV0dXJuIGNsZWFuRXNjYXBlZFN0cmluZyhzdWJzdHJpbmcpO1xuICAgIH1cbiAgICB2YXIgZm9ybWF0dGVyID0gZm9ybWF0dGVyc1tmaXJzdENoYXJhY3Rlcl07XG4gICAgaWYgKGZvcm1hdHRlcikge1xuICAgICAgaWYgKCEob3B0aW9ucyAhPT0gbnVsbCAmJiBvcHRpb25zICE9PSB2b2lkIDAgJiYgb3B0aW9ucy51c2VBZGRpdGlvbmFsV2Vla1llYXJUb2tlbnMpICYmIGlzUHJvdGVjdGVkV2Vla1llYXJUb2tlbihzdWJzdHJpbmcpKSB7XG4gICAgICAgIHRocm93UHJvdGVjdGVkRXJyb3Ioc3Vic3RyaW5nLCBkaXJ0eUZvcm1hdFN0ciwgU3RyaW5nKGRpcnR5RGF0ZSkpO1xuICAgICAgfVxuICAgICAgaWYgKCEob3B0aW9ucyAhPT0gbnVsbCAmJiBvcHRpb25zICE9PSB2b2lkIDAgJiYgb3B0aW9ucy51c2VBZGRpdGlvbmFsRGF5T2ZZZWFyVG9rZW5zKSAmJiBpc1Byb3RlY3RlZERheU9mWWVhclRva2VuKHN1YnN0cmluZykpIHtcbiAgICAgICAgdGhyb3dQcm90ZWN0ZWRFcnJvcihzdWJzdHJpbmcsIGRpcnR5Rm9ybWF0U3RyLCBTdHJpbmcoZGlydHlEYXRlKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZm9ybWF0dGVyKHV0Y0RhdGUsIHN1YnN0cmluZywgbG9jYWxlLmxvY2FsaXplLCBmb3JtYXR0ZXJPcHRpb25zKTtcbiAgICB9XG4gICAgaWYgKGZpcnN0Q2hhcmFjdGVyLm1hdGNoKHVuZXNjYXBlZExhdGluQ2hhcmFjdGVyUmVnRXhwKSkge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0Zvcm1hdCBzdHJpbmcgY29udGFpbnMgYW4gdW5lc2NhcGVkIGxhdGluIGFscGhhYmV0IGNoYXJhY3RlciBgJyArIGZpcnN0Q2hhcmFjdGVyICsgJ2AnKTtcbiAgICB9XG4gICAgcmV0dXJuIHN1YnN0cmluZztcbiAgfSkuam9pbignJyk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBjbGVhbkVzY2FwZWRTdHJpbmcoaW5wdXQpIHtcbiAgdmFyIG1hdGNoZWQgPSBpbnB1dC5tYXRjaChlc2NhcGVkU3RyaW5nUmVnRXhwKTtcbiAgaWYgKCFtYXRjaGVkKSB7XG4gICAgcmV0dXJuIGlucHV0O1xuICB9XG4gIHJldHVybiBtYXRjaGVkWzFdLnJlcGxhY2UoZG91YmxlUXVvdGVSZWdFeHAsIFwiJ1wiKTtcbn0iLCJleHBvcnQgY29uc3QgRXhwb3J0ZXJzID0gWydjc3YnLCAnanNvbicsICd4bWwnXTtcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEFwaUNsaWVudCwgdXNlTm90aWNlIH0gZnJvbSAnYWRtaW5qcyc7XG5pbXBvcnQgeyBCb3gsIEJ1dHRvbiwgTG9hZGVyLCBUZXh0IH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5pbXBvcnQgeyBzYXZlQXMgfSBmcm9tICdmaWxlLXNhdmVyJztcbmltcG9ydCBmb3JtYXQgZnJvbSAnZGF0ZS1mbnMvZm9ybWF0JztcbmltcG9ydCB7IEV4cG9ydGVycyB9IGZyb20gJy4uL2V4cG9ydGVyLnR5cGUuanMnO1xuZXhwb3J0IGNvbnN0IG1pbWVUeXBlcyA9IHtcbiAgICBqc29uOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgY3N2OiAndGV4dC9jc3YnLFxuICAgIHhtbDogJ3RleHQveG1sJyxcbn07XG5leHBvcnQgY29uc3QgZ2V0RXhwb3J0ZWRGaWxlTmFtZSA9IChleHRlbnNpb24pID0+IGBleHBvcnQtJHtmb3JtYXQoRGF0ZS5ub3coKSwgJ3l5eXktTU0tZGRfSEgtbW0nKX0uJHtleHRlbnNpb259YDtcbmNvbnN0IEV4cG9ydENvbXBvbmVudCA9ICh7IHJlc291cmNlIH0pID0+IHtcbiAgICBjb25zdCBbaXNGZXRjaGluZywgc2V0RmV0Y2hpbmddID0gdXNlU3RhdGUoKTtcbiAgICBjb25zdCBzZW5kTm90aWNlID0gdXNlTm90aWNlKCk7XG4gICAgY29uc3QgZXhwb3J0RGF0YSA9IGFzeW5jICh0eXBlKSA9PiB7XG4gICAgICAgIHNldEZldGNoaW5nKHRydWUpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgeyBkYXRhOiB7IGV4cG9ydGVkRGF0YSB9LCB9ID0gYXdhaXQgbmV3IEFwaUNsaWVudCgpLnJlc291cmNlQWN0aW9uKHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgICAgICAgICAgICByZXNvdXJjZUlkOiByZXNvdXJjZS5pZCxcbiAgICAgICAgICAgICAgICBhY3Rpb25OYW1lOiAnZXhwb3J0JyxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW2V4cG9ydGVkRGF0YV0sIHsgdHlwZTogbWltZVR5cGVzW3R5cGVdIH0pO1xuICAgICAgICAgICAgc2F2ZUFzKGJsb2IsIGdldEV4cG9ydGVkRmlsZU5hbWUodHlwZSkpO1xuICAgICAgICAgICAgc2VuZE5vdGljZSh7IG1lc3NhZ2U6ICdFeHBvcnRlZCBzdWNjZXNzZnVsbHknLCB0eXBlOiAnc3VjY2VzcycgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHNlbmROb3RpY2UoeyBtZXNzYWdlOiBlLm1lc3NhZ2UsIHR5cGU6ICdlcnJvcicgfSk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0RmV0Y2hpbmcoZmFsc2UpO1xuICAgIH07XG4gICAgaWYgKGlzRmV0Y2hpbmcpIHtcbiAgICAgICAgcmV0dXJuIDxMb2FkZXIgLz47XG4gICAgfVxuICAgIHJldHVybiAoPEJveD5cbiAgICAgIDxCb3ggZGlzcGxheT1cImZsZXhcIiBqdXN0aWZ5Q29udGVudD1cImNlbnRlclwiPlxuICAgICAgICA8VGV4dCB2YXJpYW50PVwibGdcIj5DaG9vc2UgZXhwb3J0IGZvcm1hdDo8L1RleHQ+XG4gICAgICA8L0JveD5cbiAgICAgIDxCb3ggZGlzcGxheT1cImZsZXhcIiBqdXN0aWZ5Q29udGVudD1cImNlbnRlclwiPlxuICAgICAgICB7RXhwb3J0ZXJzLm1hcChwYXJzZXJUeXBlID0+ICg8Qm94IGtleT17cGFyc2VyVHlwZX0gbT17Mn0+XG4gICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9eygpID0+IGV4cG9ydERhdGEocGFyc2VyVHlwZSl9IGRpc2FibGVkPXtpc0ZldGNoaW5nfT5cbiAgICAgICAgICAgICAge3BhcnNlclR5cGUudG9VcHBlckNhc2UoKX1cbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDwvQm94PikpfVxuICAgICAgPC9Cb3g+XG4gICAgPC9Cb3g+KTtcbn07XG5leHBvcnQgZGVmYXVsdCBFeHBvcnRDb21wb25lbnQ7XG4iLCJpbXBvcnQgeyBEcm9wWm9uZSwgRHJvcFpvbmVJdGVtLCBGb3JtR3JvdXAsIExhYmVsIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5pbXBvcnQgeyBmbGF0LCB1c2VUcmFuc2xhdGlvbiB9IGZyb20gJ2FkbWluanMnO1xuaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5jb25zdCBFZGl0ID0gKHsgcHJvcGVydHksIHJlY29yZCwgb25DaGFuZ2UgfSkgPT4ge1xuICAgIGNvbnN0IHsgdHJhbnNsYXRlUHJvcGVydHkgfSA9IHVzZVRyYW5zbGF0aW9uKCk7XG4gICAgY29uc3QgeyBwYXJhbXMgfSA9IHJlY29yZDtcbiAgICBjb25zdCB7IGN1c3RvbSB9ID0gcHJvcGVydHk7XG4gICAgY29uc3QgcGF0aCA9IGZsYXQuZ2V0KHBhcmFtcywgY3VzdG9tLmZpbGVQYXRoUHJvcGVydHkpO1xuICAgIGNvbnN0IGtleSA9IGZsYXQuZ2V0KHBhcmFtcywgY3VzdG9tLmtleVByb3BlcnR5KTtcbiAgICBjb25zdCBmaWxlID0gZmxhdC5nZXQocGFyYW1zLCBjdXN0b20uZmlsZVByb3BlcnR5KTtcbiAgICBjb25zdCBbb3JpZ2luYWxLZXksIHNldE9yaWdpbmFsS2V5XSA9IHVzZVN0YXRlKGtleSk7XG4gICAgY29uc3QgW2ZpbGVzVG9VcGxvYWQsIHNldEZpbGVzVG9VcGxvYWRdID0gdXNlU3RhdGUoW10pO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIC8vIGl0IG1lYW5zIG1lYW5zIHRoYXQgc29tZW9uZSBoaXQgc2F2ZSBhbmQgbmV3IGZpbGUgaGFzIGJlZW4gdXBsb2FkZWRcbiAgICAgICAgLy8gaW4gdGhpcyBjYXNlIGZsaWVzVG9VcGxvYWQgc2hvdWxkIGJlIGNsZWFyZWQuXG4gICAgICAgIC8vIFRoaXMgaGFwcGVucyB3aGVuIHVzZXIgdHVybnMgb2ZmIHJlZGlyZWN0IGFmdGVyIG5ldy9lZGl0XG4gICAgICAgIGlmICgodHlwZW9mIGtleSA9PT0gJ3N0cmluZycgJiYga2V5ICE9PSBvcmlnaW5hbEtleSlcbiAgICAgICAgICAgIHx8ICh0eXBlb2Yga2V5ICE9PSAnc3RyaW5nJyAmJiAhb3JpZ2luYWxLZXkpXG4gICAgICAgICAgICB8fCAodHlwZW9mIGtleSAhPT0gJ3N0cmluZycgJiYgQXJyYXkuaXNBcnJheShrZXkpICYmIGtleS5sZW5ndGggIT09IG9yaWdpbmFsS2V5Lmxlbmd0aCkpIHtcbiAgICAgICAgICAgIHNldE9yaWdpbmFsS2V5KGtleSk7XG4gICAgICAgICAgICBzZXRGaWxlc1RvVXBsb2FkKFtdKTtcbiAgICAgICAgfVxuICAgIH0sIFtrZXksIG9yaWdpbmFsS2V5XSk7XG4gICAgY29uc3Qgb25VcGxvYWQgPSAoZmlsZXMpID0+IHtcbiAgICAgICAgc2V0RmlsZXNUb1VwbG9hZChmaWxlcyk7XG4gICAgICAgIG9uQ2hhbmdlKGN1c3RvbS5maWxlUHJvcGVydHksIGZpbGVzKTtcbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZVJlbW92ZSA9ICgpID0+IHtcbiAgICAgICAgb25DaGFuZ2UoY3VzdG9tLmZpbGVQcm9wZXJ0eSwgbnVsbCk7XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVNdWx0aVJlbW92ZSA9IChzaW5nbGVLZXkpID0+IHtcbiAgICAgICAgY29uc3QgaW5kZXggPSAoZmxhdC5nZXQocmVjb3JkLnBhcmFtcywgY3VzdG9tLmtleVByb3BlcnR5KSB8fCBbXSkuaW5kZXhPZihzaW5nbGVLZXkpO1xuICAgICAgICBjb25zdCBmaWxlc1RvRGVsZXRlID0gZmxhdC5nZXQocmVjb3JkLnBhcmFtcywgY3VzdG9tLmZpbGVzVG9EZWxldGVQcm9wZXJ0eSkgfHwgW107XG4gICAgICAgIGlmIChwYXRoICYmIHBhdGgubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgbmV3UGF0aCA9IHBhdGgubWFwKChjdXJyZW50UGF0aCwgaSkgPT4gKGkgIT09IGluZGV4ID8gY3VycmVudFBhdGggOiBudWxsKSk7XG4gICAgICAgICAgICBsZXQgbmV3UGFyYW1zID0gZmxhdC5zZXQocmVjb3JkLnBhcmFtcywgY3VzdG9tLmZpbGVzVG9EZWxldGVQcm9wZXJ0eSwgWy4uLmZpbGVzVG9EZWxldGUsIGluZGV4XSk7XG4gICAgICAgICAgICBuZXdQYXJhbXMgPSBmbGF0LnNldChuZXdQYXJhbXMsIGN1c3RvbS5maWxlUGF0aFByb3BlcnR5LCBuZXdQYXRoKTtcbiAgICAgICAgICAgIG9uQ2hhbmdlKHtcbiAgICAgICAgICAgICAgICAuLi5yZWNvcmQsXG4gICAgICAgICAgICAgICAgcGFyYW1zOiBuZXdQYXJhbXMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnWW91IGNhbm5vdCByZW1vdmUgZmlsZSB3aGVuIHRoZXJlIGFyZSBubyB1cGxvYWRlZCBmaWxlcyB5ZXQnKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEZvcm1Hcm91cCwgbnVsbCxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChMYWJlbCwgbnVsbCwgdHJhbnNsYXRlUHJvcGVydHkocHJvcGVydHkubGFiZWwsIHByb3BlcnR5LnJlc291cmNlSWQpKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChEcm9wWm9uZSwgeyBvbkNoYW5nZTogb25VcGxvYWQsIG11bHRpcGxlOiBjdXN0b20ubXVsdGlwbGUsIHZhbGlkYXRlOiB7XG4gICAgICAgICAgICAgICAgbWltZVR5cGVzOiBjdXN0b20ubWltZVR5cGVzLFxuICAgICAgICAgICAgICAgIG1heFNpemU6IGN1c3RvbS5tYXhTaXplLFxuICAgICAgICAgICAgfSwgZmlsZXM6IGZpbGVzVG9VcGxvYWQgfSksXG4gICAgICAgICFjdXN0b20ubXVsdGlwbGUgJiYga2V5ICYmIHBhdGggJiYgIWZpbGVzVG9VcGxvYWQubGVuZ3RoICYmIGZpbGUgIT09IG51bGwgJiYgKFJlYWN0LmNyZWF0ZUVsZW1lbnQoRHJvcFpvbmVJdGVtLCB7IGZpbGVuYW1lOiBrZXksIHNyYzogcGF0aCwgb25SZW1vdmU6IGhhbmRsZVJlbW92ZSB9KSksXG4gICAgICAgIGN1c3RvbS5tdWx0aXBsZSAmJiBrZXkgJiYga2V5Lmxlbmd0aCAmJiBwYXRoID8gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVhY3QuRnJhZ21lbnQsIG51bGwsIGtleS5tYXAoKHNpbmdsZUtleSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIC8vIHdoZW4gd2UgcmVtb3ZlIGl0ZW1zIHdlIHNldCBvbmx5IHBhdGggaW5kZXggdG8gbnVsbHMuXG4gICAgICAgICAgICAvLyBrZXkgaXMgc3RpbGwgdGhlcmUuIFRoaXMgaXMgYmVjYXVzZVxuICAgICAgICAgICAgLy8gd2UgaGF2ZSB0byBtYWludGFpbiBhbGwgdGhlIGluZGV4ZXMuIFNvIGhlcmUgd2Ugc2ltcGx5IGZpbHRlciBvdXQgZWxlbWVudHMgd2hpY2hcbiAgICAgICAgICAgIC8vIHdlcmUgcmVtb3ZlZCBhbmQgZGlzcGxheSBvbmx5IHdoYXQgd2FzIGxlZnRcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRQYXRoID0gcGF0aFtpbmRleF07XG4gICAgICAgICAgICByZXR1cm4gY3VycmVudFBhdGggPyAoUmVhY3QuY3JlYXRlRWxlbWVudChEcm9wWm9uZUl0ZW0sIHsga2V5OiBzaW5nbGVLZXksIGZpbGVuYW1lOiBzaW5nbGVLZXksIHNyYzogcGF0aFtpbmRleF0sIG9uUmVtb3ZlOiAoKSA9PiBoYW5kbGVNdWx0aVJlbW92ZShzaW5nbGVLZXkpIH0pKSA6ICcnO1xuICAgICAgICB9KSkpIDogJycpKTtcbn07XG5leHBvcnQgZGVmYXVsdCBFZGl0O1xuIiwiZXhwb3J0IGNvbnN0IEF1ZGlvTWltZVR5cGVzID0gW1xuICAgICdhdWRpby9hYWMnLFxuICAgICdhdWRpby9taWRpJyxcbiAgICAnYXVkaW8veC1taWRpJyxcbiAgICAnYXVkaW8vbXBlZycsXG4gICAgJ2F1ZGlvL29nZycsXG4gICAgJ2FwcGxpY2F0aW9uL29nZycsXG4gICAgJ2F1ZGlvL29wdXMnLFxuICAgICdhdWRpby93YXYnLFxuICAgICdhdWRpby93ZWJtJyxcbiAgICAnYXVkaW8vM2dwcDInLFxuXTtcbmV4cG9ydCBjb25zdCBWaWRlb01pbWVUeXBlcyA9IFtcbiAgICAndmlkZW8veC1tc3ZpZGVvJyxcbiAgICAndmlkZW8vbXBlZycsXG4gICAgJ3ZpZGVvL29nZycsXG4gICAgJ3ZpZGVvL21wMnQnLFxuICAgICd2aWRlby93ZWJtJyxcbiAgICAndmlkZW8vM2dwcCcsXG4gICAgJ3ZpZGVvLzNncHAyJyxcbl07XG5leHBvcnQgY29uc3QgSW1hZ2VNaW1lVHlwZXMgPSBbXG4gICAgJ2ltYWdlL2JtcCcsXG4gICAgJ2ltYWdlL2dpZicsXG4gICAgJ2ltYWdlL2pwZWcnLFxuICAgICdpbWFnZS9wbmcnLFxuICAgICdpbWFnZS9zdmcreG1sJyxcbiAgICAnaW1hZ2Uvdm5kLm1pY3Jvc29mdC5pY29uJyxcbiAgICAnaW1hZ2UvdGlmZicsXG4gICAgJ2ltYWdlL3dlYnAnLFxuXTtcbmV4cG9ydCBjb25zdCBDb21wcmVzc2VkTWltZVR5cGVzID0gW1xuICAgICdhcHBsaWNhdGlvbi94LWJ6aXAnLFxuICAgICdhcHBsaWNhdGlvbi94LWJ6aXAyJyxcbiAgICAnYXBwbGljYXRpb24vZ3ppcCcsXG4gICAgJ2FwcGxpY2F0aW9uL2phdmEtYXJjaGl2ZScsXG4gICAgJ2FwcGxpY2F0aW9uL3gtdGFyJyxcbiAgICAnYXBwbGljYXRpb24vemlwJyxcbiAgICAnYXBwbGljYXRpb24veC03ei1jb21wcmVzc2VkJyxcbl07XG5leHBvcnQgY29uc3QgRG9jdW1lbnRNaW1lVHlwZXMgPSBbXG4gICAgJ2FwcGxpY2F0aW9uL3gtYWJpd29yZCcsXG4gICAgJ2FwcGxpY2F0aW9uL3gtZnJlZWFyYycsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5hbWF6b24uZWJvb2snLFxuICAgICdhcHBsaWNhdGlvbi9tc3dvcmQnLFxuICAgICdhcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQud29yZHByb2Nlc3NpbmdtbC5kb2N1bWVudCcsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5tcy1mb250b2JqZWN0JyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm9hc2lzLm9wZW5kb2N1bWVudC5wcmVzZW50YXRpb24nLFxuICAgICdhcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LnNwcmVhZHNoZWV0JyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm9hc2lzLm9wZW5kb2N1bWVudC50ZXh0JyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm1zLXBvd2VycG9pbnQnLFxuICAgICdhcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQucHJlc2VudGF0aW9ubWwucHJlc2VudGF0aW9uJyxcbiAgICAnYXBwbGljYXRpb24vdm5kLnJhcicsXG4gICAgJ2FwcGxpY2F0aW9uL3J0ZicsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5tcy1leGNlbCcsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC5zcHJlYWRzaGVldG1sLnNoZWV0Jyxcbl07XG5leHBvcnQgY29uc3QgVGV4dE1pbWVUeXBlcyA9IFtcbiAgICAndGV4dC9jc3MnLFxuICAgICd0ZXh0L2NzdicsXG4gICAgJ3RleHQvaHRtbCcsXG4gICAgJ3RleHQvY2FsZW5kYXInLFxuICAgICd0ZXh0L2phdmFzY3JpcHQnLFxuICAgICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAnYXBwbGljYXRpb24vbGQranNvbicsXG4gICAgJ3RleHQvamF2YXNjcmlwdCcsXG4gICAgJ3RleHQvcGxhaW4nLFxuICAgICdhcHBsaWNhdGlvbi94aHRtbCt4bWwnLFxuICAgICdhcHBsaWNhdGlvbi94bWwnLFxuICAgICd0ZXh0L3htbCcsXG5dO1xuZXhwb3J0IGNvbnN0IEJpbmFyeURvY3NNaW1lVHlwZXMgPSBbXG4gICAgJ2FwcGxpY2F0aW9uL2VwdWIremlwJyxcbiAgICAnYXBwbGljYXRpb24vcGRmJyxcbl07XG5leHBvcnQgY29uc3QgRm9udE1pbWVUeXBlcyA9IFtcbiAgICAnZm9udC9vdGYnLFxuICAgICdmb250L3R0ZicsXG4gICAgJ2ZvbnQvd29mZicsXG4gICAgJ2ZvbnQvd29mZjInLFxuXTtcbmV4cG9ydCBjb25zdCBPdGhlck1pbWVUeXBlcyA9IFtcbiAgICAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJyxcbiAgICAnYXBwbGljYXRpb24veC1jc2gnLFxuICAgICdhcHBsaWNhdGlvbi92bmQuYXBwbGUuaW5zdGFsbGVyK3htbCcsXG4gICAgJ2FwcGxpY2F0aW9uL3gtaHR0cGQtcGhwJyxcbiAgICAnYXBwbGljYXRpb24veC1zaCcsXG4gICAgJ2FwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoJyxcbiAgICAndm5kLnZpc2lvJyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm1vemlsbGEueHVsK3htbCcsXG5dO1xuZXhwb3J0IGNvbnN0IE1pbWVUeXBlcyA9IFtcbiAgICAuLi5BdWRpb01pbWVUeXBlcyxcbiAgICAuLi5WaWRlb01pbWVUeXBlcyxcbiAgICAuLi5JbWFnZU1pbWVUeXBlcyxcbiAgICAuLi5Db21wcmVzc2VkTWltZVR5cGVzLFxuICAgIC4uLkRvY3VtZW50TWltZVR5cGVzLFxuICAgIC4uLlRleHRNaW1lVHlwZXMsXG4gICAgLi4uQmluYXJ5RG9jc01pbWVUeXBlcyxcbiAgICAuLi5PdGhlck1pbWVUeXBlcyxcbiAgICAuLi5Gb250TWltZVR5cGVzLFxuICAgIC4uLk90aGVyTWltZVR5cGVzLFxuXTtcbiIsIi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tZXh0cmFuZW91cy1kZXBlbmRlbmNpZXNcbmltcG9ydCB7IEJveCwgQnV0dG9uLCBJY29uIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5pbXBvcnQgeyBmbGF0IH0gZnJvbSAnYWRtaW5qcyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQXVkaW9NaW1lVHlwZXMsIEltYWdlTWltZVR5cGVzIH0gZnJvbSAnLi4vdHlwZXMvbWltZS10eXBlcy50eXBlLmpzJztcbmNvbnN0IFNpbmdsZUZpbGUgPSAocHJvcHMpID0+IHtcbiAgICBjb25zdCB7IG5hbWUsIHBhdGgsIG1pbWVUeXBlLCB3aWR0aCB9ID0gcHJvcHM7XG4gICAgaWYgKHBhdGggJiYgcGF0aC5sZW5ndGgpIHtcbiAgICAgICAgaWYgKG1pbWVUeXBlICYmIEltYWdlTWltZVR5cGVzLmluY2x1ZGVzKG1pbWVUeXBlKSkge1xuICAgICAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW1nXCIsIHsgc3JjOiBwYXRoLCBzdHlsZTogeyBtYXhIZWlnaHQ6IHdpZHRoLCBtYXhXaWR0aDogd2lkdGggfSwgYWx0OiBuYW1lIH0pKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWltZVR5cGUgJiYgQXVkaW9NaW1lVHlwZXMuaW5jbHVkZXMobWltZVR5cGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJhdWRpb1wiLCB7IGNvbnRyb2xzOiB0cnVlLCBzcmM6IHBhdGggfSxcbiAgICAgICAgICAgICAgICBcIllvdXIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHRoZVwiLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJjb2RlXCIsIG51bGwsIFwiYXVkaW9cIiksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInRyYWNrXCIsIHsga2luZDogXCJjYXB0aW9uc1wiIH0pKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgbnVsbCxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b24sIHsgYXM6IFwiYVwiLCBocmVmOiBwYXRoLCBtbDogXCJkZWZhdWx0XCIsIHNpemU6IFwic21cIiwgcm91bmRlZDogdHJ1ZSwgdGFyZ2V0OiBcIl9ibGFua1wiIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEljb24sIHsgaWNvbjogXCJEb2N1bWVudERvd25sb2FkXCIsIGNvbG9yOiBcIndoaXRlXCIsIG1yOiBcImRlZmF1bHRcIiB9KSxcbiAgICAgICAgICAgIG5hbWUpKSk7XG59O1xuY29uc3QgRmlsZSA9ICh7IHdpZHRoLCByZWNvcmQsIHByb3BlcnR5IH0pID0+IHtcbiAgICBjb25zdCB7IGN1c3RvbSB9ID0gcHJvcGVydHk7XG4gICAgbGV0IHBhdGggPSBmbGF0LmdldChyZWNvcmQ/LnBhcmFtcywgY3VzdG9tLmZpbGVQYXRoUHJvcGVydHkpO1xuICAgIGlmICghcGF0aCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgbmFtZSA9IGZsYXQuZ2V0KHJlY29yZD8ucGFyYW1zLCBjdXN0b20uZmlsZU5hbWVQcm9wZXJ0eSA/IGN1c3RvbS5maWxlTmFtZVByb3BlcnR5IDogY3VzdG9tLmtleVByb3BlcnR5KTtcbiAgICBjb25zdCBtaW1lVHlwZSA9IGN1c3RvbS5taW1lVHlwZVByb3BlcnR5XG4gICAgICAgICYmIGZsYXQuZ2V0KHJlY29yZD8ucGFyYW1zLCBjdXN0b20ubWltZVR5cGVQcm9wZXJ0eSk7XG4gICAgaWYgKCFwcm9wZXJ0eS5jdXN0b20ubXVsdGlwbGUpIHtcbiAgICAgICAgaWYgKGN1c3RvbS5vcHRzICYmIGN1c3RvbS5vcHRzLmJhc2VVcmwpIHtcbiAgICAgICAgICAgIHBhdGggPSBgJHtjdXN0b20ub3B0cy5iYXNlVXJsfS8ke25hbWV9YDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2luZ2xlRmlsZSwgeyBwYXRoOiBwYXRoLCBuYW1lOiBuYW1lLCB3aWR0aDogd2lkdGgsIG1pbWVUeXBlOiBtaW1lVHlwZSB9KSk7XG4gICAgfVxuICAgIGlmIChjdXN0b20ub3B0cyAmJiBjdXN0b20ub3B0cy5iYXNlVXJsKSB7XG4gICAgICAgIGNvbnN0IGJhc2VVcmwgPSBjdXN0b20ub3B0cy5iYXNlVXJsIHx8ICcnO1xuICAgICAgICBwYXRoID0gcGF0aC5tYXAoKHNpbmdsZVBhdGgsIGluZGV4KSA9PiBgJHtiYXNlVXJsfS8ke25hbWVbaW5kZXhdfWApO1xuICAgIH1cbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVhY3QuRnJhZ21lbnQsIG51bGwsIHBhdGgubWFwKChzaW5nbGVQYXRoLCBpbmRleCkgPT4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2luZ2xlRmlsZSwgeyBrZXk6IHNpbmdsZVBhdGgsIHBhdGg6IHNpbmdsZVBhdGgsIG5hbWU6IG5hbWVbaW5kZXhdLCB3aWR0aDogd2lkdGgsIG1pbWVUeXBlOiBtaW1lVHlwZVtpbmRleF0gfSkpKSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IEZpbGU7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEZpbGUgZnJvbSAnLi9maWxlLmpzJztcbmNvbnN0IExpc3QgPSAocHJvcHMpID0+IChSZWFjdC5jcmVhdGVFbGVtZW50KEZpbGUsIHsgd2lkdGg6IDEwMCwgLi4ucHJvcHMgfSkpO1xuZXhwb3J0IGRlZmF1bHQgTGlzdDtcbiIsImltcG9ydCB7IEZvcm1Hcm91cCwgTGFiZWwgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmltcG9ydCB7IHVzZVRyYW5zbGF0aW9uIH0gZnJvbSAnYWRtaW5qcyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEZpbGUgZnJvbSAnLi9maWxlLmpzJztcbmNvbnN0IFNob3cgPSAocHJvcHMpID0+IHtcbiAgICBjb25zdCB7IHByb3BlcnR5IH0gPSBwcm9wcztcbiAgICBjb25zdCB7IHRyYW5zbGF0ZVByb3BlcnR5IH0gPSB1c2VUcmFuc2xhdGlvbigpO1xuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChGb3JtR3JvdXAsIG51bGwsXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTGFiZWwsIG51bGwsIHRyYW5zbGF0ZVByb3BlcnR5KHByb3BlcnR5LmxhYmVsLCBwcm9wZXJ0eS5yZXNvdXJjZUlkKSksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRmlsZSwgeyB3aWR0aDogXCIxMDAlXCIsIC4uLnByb3BzIH0pKSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgU2hvdztcbiIsImltcG9ydCB7IEZvcm1Hcm91cCwgTGFiZWwsIFRhYmxlIGFzIEFkbWluVGFibGUsIFRhYmxlQm9keSwgVGFibGVDZWxsLCBUYWJsZUhlYWQsIFRhYmxlUm93LCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuaW1wb3J0IHsgZmxhdCB9IGZyb20gJ2FkbWluanMnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHN0eWxlZCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0vc3R5bGVkLWNvbXBvbmVudHMnO1xuY29uc3QgQ2VsbCA9IHN0eWxlZChUYWJsZUNlbGwpIGBcbiAgd2lkdGg6IDEwMCU7XG4gIHdvcmQtYnJlYWs6IGJyZWFrLXdvcmQ7XG5gO1xuY29uc3QgUm93ID0gc3R5bGVkKFRhYmxlUm93KSBgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIHBvc2l0aW9uOiB1bnNldDtcbmA7XG5jb25zdCBIZWFkID0gc3R5bGVkKFRhYmxlSGVhZCkgYFxuICBkaXNwbGF5OiBmbGV4O1xuICBwb3NpdGlvbjogdW5zZXQ7XG5gO1xuY29uc3QgVGFibGUgPSBzdHlsZWQoQWRtaW5UYWJsZSkgYFxuICB3aWR0aDogMTAwJTtcbiAgcG9zaXRpb246IHVuc2V0O1xuICBkaXNwbGF5OiBibG9jaztcbmA7XG5jb25zdCBSZWNvcmREaWZmZXJlbmNlID0gKHsgcmVjb3JkLCBwcm9wZXJ0eSB9KSA9PiB7XG4gICAgY29uc3QgZGlmZmVyZW5jZXMgPSBKU09OLnBhcnNlKFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgZmxhdC51bmZsYXR0ZW4ocmVjb3JkPy5wYXJhbXMgPz8ge30pPy5bcHJvcGVydHkubmFtZV0gPz8ge30pO1xuICAgIGlmICghZGlmZmVyZW5jZXMpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChGb3JtR3JvdXAsIG51bGwsXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTGFiZWwsIG51bGwsIHByb3BlcnR5LmxhYmVsKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZSwgbnVsbCxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSGVhZCwgbnVsbCxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFJvdywgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChDZWxsLCBudWxsLCBcIlByb3BlcnR5IG5hbWVcIiksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ2VsbCwgbnVsbCwgXCJCZWZvcmVcIiksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ2VsbCwgbnVsbCwgXCJBZnRlclwiKSkpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUJvZHksIG51bGwsIE9iamVjdC5lbnRyaWVzKGRpZmZlcmVuY2VzKS5tYXAoKFtwcm9wZXJ0eU5hbWUsIHsgYmVmb3JlLCBhZnRlciB9XSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChSb3csIHsga2V5OiBwcm9wZXJ0eU5hbWUgfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChDZWxsLCB7IHdpZHRoOiAxIC8gMyB9LCBwcm9wZXJ0eU5hbWUpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KENlbGwsIHsgY29sb3I6IFwicmVkXCIsIHdpZHRoOiAxIC8gMyB9LCBKU09OLnN0cmluZ2lmeShiZWZvcmUpIHx8ICd1bmRlZmluZWQnKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChDZWxsLCB7IGNvbG9yOiBcImdyZWVuXCIsIHdpZHRoOiAxIC8gMyB9LCBKU09OLnN0cmluZ2lmeShhZnRlcikgfHwgJ3VuZGVmaW5lZCcpKSk7XG4gICAgICAgICAgICB9KSkpKSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgUmVjb3JkRGlmZmVyZW5jZTtcbiIsImV4cG9ydCBjb25zdCBnZXRMb2dQcm9wZXJ0eU5hbWUgPSAocHJvcGVydHksIG1hcHBpbmcgPSB7fSkgPT4ge1xuICAgIGlmICghbWFwcGluZ1twcm9wZXJ0eV0pIHtcbiAgICAgICAgcmV0dXJuIHByb3BlcnR5O1xuICAgIH1cbiAgICByZXR1cm4gbWFwcGluZ1twcm9wZXJ0eV07XG59O1xuIiwiaW1wb3J0IHsgRm9ybUdyb3VwLCBMaW5rIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5pbXBvcnQgeyBWaWV3SGVscGVycyB9IGZyb20gJ2FkbWluanMnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGdldExvZ1Byb3BlcnR5TmFtZSB9IGZyb20gJy4uL3V0aWxzL2dldC1sb2ctcHJvcGVydHktbmFtZS5qcyc7XG5jb25zdCB2aWV3SGVscGVycyA9IG5ldyBWaWV3SGVscGVycygpO1xuY29uc3QgUmVjb3JkTGluayA9ICh7IHJlY29yZCwgcHJvcGVydHkgfSkgPT4ge1xuICAgIGlmICghcmVjb3JkPy5wYXJhbXMpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IHsgY3VzdG9tID0ge30gfSA9IHByb3BlcnR5O1xuICAgIGNvbnN0IHsgcHJvcGVydGllc01hcHBpbmcgPSB7fSB9ID0gY3VzdG9tO1xuICAgIGNvbnN0IHJlY29yZElkUGFyYW0gPSBnZXRMb2dQcm9wZXJ0eU5hbWUoJ3JlY29yZElkJywgcHJvcGVydGllc01hcHBpbmcpO1xuICAgIGNvbnN0IHJlc291cmNlSWRQYXJhbSA9IGdldExvZ1Byb3BlcnR5TmFtZSgncmVzb3VyY2UnLCBwcm9wZXJ0aWVzTWFwcGluZyk7XG4gICAgY29uc3QgcmVjb3JkVGl0bGVQYXJhbSA9IGdldExvZ1Byb3BlcnR5TmFtZSgncmVjb3JkVGl0bGUnLCBwcm9wZXJ0aWVzTWFwcGluZyk7XG4gICAgY29uc3QgcmVjb3JkSWQgPSByZWNvcmQucGFyYW1zW3JlY29yZElkUGFyYW1dO1xuICAgIGNvbnN0IHJlc291cmNlID0gcmVjb3JkLnBhcmFtc1tyZXNvdXJjZUlkUGFyYW1dO1xuICAgIGNvbnN0IHJlY29yZFRpdGxlID0gcmVjb3JkLnBhcmFtc1tyZWNvcmRUaXRsZVBhcmFtXTtcbiAgICBpZiAoIXJlY29yZElkIHx8ICFyZXNvdXJjZSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEZvcm1Hcm91cCwgbnVsbCxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChMaW5rLCB7IGhyZWY6IHZpZXdIZWxwZXJzLnJlY29yZEFjdGlvblVybCh7XG4gICAgICAgICAgICAgICAgYWN0aW9uTmFtZTogJ3Nob3cnLFxuICAgICAgICAgICAgICAgIHJlY29yZElkLFxuICAgICAgICAgICAgICAgIHJlc291cmNlSWQ6IHJlc291cmNlLFxuICAgICAgICAgICAgfSkgfSwgcmVjb3JkSWQpKSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgUmVjb3JkTGluaztcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuLy8gVVJMOiBodHRwOi8vbG9jYWxob3N0OjMwMDAvYWRtaW4vYXBpL3Jlc291cmNlcy9zdXBwbGllci9hY3Rpb25zL3NlYXJjaC9hbGljZT9zZWFyY2hQcm9wZXJ0eT1uYW1lXG4vLyBjb25zdCBjYWxsQXBpID0gKCkgPT4gYXBpLnNlYXJjaFJlY29yZHMoe3Jlc291cmNlSWQ6J3N1cHBsaWVyJyxzZWFyY2hQcm9wZXJ0eTonbmFtZScscXVlcnk6J2FsaWNlJ30pLnRoZW4oKHJlcykgPT4gY29uc29sZS5sb2coJ2NhbGxhcGknLHJlcykpXG4vLyBzZWFyY2hSZWNvcmRzIGhhcyA1MCBsaW1pdCByZXR1cm5lZCByZWNvcmRzIGRlZmluZWQgYnkgUHJpc21hIHRha2UgYXJndW1uZXQsIFVTRSByZXNvdXJjZUFjdGlvbiBpbnN0ZWFkIHRvIHNwZWNpZnkgdGFrZSBhcmd1bWVudCBhcyBhYXhpb3NQYXJhbXNcbi8vIGNvbnN0IGNhbGxBcGkgPSAoKSA9PiBhcGkuc2VhcmNoUmVjb3Jkcyh7cmVzb3VyY2VJZDonc3VwcGxpZXInLHNlYXJjaFByb3BlcnR5OidpZCcscXVlcnk6SlNPTi5zdHJpbmdpZnkoe2d0OjEwfSl9KS50aGVuKChyZXMpID0+IGNvbnNvbGUubG9nKCdyZXR1cm4gdmFsdWUgaXMgYXJyYXknLHJlcykpXG5cbmNvbnN0IE15SGVsbG9Db21wb25lbnQgPSAoKSA9PiA8cCBzdHlsZT17e3RleHRBbGlnbjonY2VudGVyJyxwYWRkaW5nVG9wOiczMHJlbScsZm9udFNpemU6JzVyZW0nfX0+SGVsbG8gQWRtaW5pc3RyYXRvcjwvcD5cblxuZXhwb3J0IGRlZmF1bHQgTXlIZWxsb0NvbXBvbmVudCIsIkFkbWluSlMuVXNlckNvbXBvbmVudHMgPSB7fVxuaW1wb3J0IFJlbGF0aW9uc1Nob3dQcm9wZXJ0eUNvbXBvbmVudCBmcm9tICcuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvcmVsYXRpb25zL2xpYi9jb21wb25lbnRzL1JlbGF0aW9uc1Nob3dQcm9wZXJ0eUNvbXBvbmVudCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuUmVsYXRpb25zU2hvd1Byb3BlcnR5Q29tcG9uZW50ID0gUmVsYXRpb25zU2hvd1Byb3BlcnR5Q29tcG9uZW50XG5pbXBvcnQgUmVsYXRpb25zRWRpdFByb3BlcnR5Q29tcG9uZW50IGZyb20gJy4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy9yZWxhdGlvbnMvbGliL2NvbXBvbmVudHMvUmVsYXRpb25zRWRpdFByb3BlcnR5Q29tcG9uZW50J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5SZWxhdGlvbnNFZGl0UHJvcGVydHlDb21wb25lbnQgPSBSZWxhdGlvbnNFZGl0UHJvcGVydHlDb21wb25lbnRcbmltcG9ydCBSZWxhdGlvbnNMaXN0UHJvcGVydHlDb21wb25lbnQgZnJvbSAnLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3JlbGF0aW9ucy9saWIvY29tcG9uZW50cy9SZWxhdGlvbnNMaXN0UHJvcGVydHlDb21wb25lbnQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlJlbGF0aW9uc0xpc3RQcm9wZXJ0eUNvbXBvbmVudCA9IFJlbGF0aW9uc0xpc3RQcm9wZXJ0eUNvbXBvbmVudFxuaW1wb3J0IEltcG9ydENvbXBvbmVudCBmcm9tICcuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvaW1wb3J0LWV4cG9ydC9saWIvY29tcG9uZW50cy9JbXBvcnRDb21wb25lbnQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkltcG9ydENvbXBvbmVudCA9IEltcG9ydENvbXBvbmVudFxuaW1wb3J0IEV4cG9ydENvbXBvbmVudCBmcm9tICcuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvaW1wb3J0LWV4cG9ydC9saWIvY29tcG9uZW50cy9FeHBvcnRDb21wb25lbnQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkV4cG9ydENvbXBvbmVudCA9IEV4cG9ydENvbXBvbmVudFxuaW1wb3J0IFVwbG9hZEVkaXRDb21wb25lbnQgZnJvbSAnLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9idWlsZC9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL1VwbG9hZEVkaXRDb21wb25lbnQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlVwbG9hZEVkaXRDb21wb25lbnQgPSBVcGxvYWRFZGl0Q29tcG9uZW50XG5pbXBvcnQgVXBsb2FkTGlzdENvbXBvbmVudCBmcm9tICcuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvdXBsb2FkL2J1aWxkL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvVXBsb2FkTGlzdENvbXBvbmVudCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuVXBsb2FkTGlzdENvbXBvbmVudCA9IFVwbG9hZExpc3RDb21wb25lbnRcbmltcG9ydCBVcGxvYWRTaG93Q29tcG9uZW50IGZyb20gJy4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvYnVpbGQvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9VcGxvYWRTaG93Q29tcG9uZW50J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5VcGxvYWRTaG93Q29tcG9uZW50ID0gVXBsb2FkU2hvd0NvbXBvbmVudFxuaW1wb3J0IFJlY29yZERpZmZlcmVuY2UgZnJvbSAnLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL2xvZ2dlci9saWIvY29tcG9uZW50cy9SZWNvcmREaWZmZXJlbmNlJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5SZWNvcmREaWZmZXJlbmNlID0gUmVjb3JkRGlmZmVyZW5jZVxuaW1wb3J0IFJlY29yZExpbmsgZnJvbSAnLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL2xvZ2dlci9saWIvY29tcG9uZW50cy9SZWNvcmRMaW5rJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5SZWNvcmRMaW5rID0gUmVjb3JkTGlua1xuaW1wb3J0IERhc2hib2FyZCBmcm9tICcuLi9kYXNoYm9hcmQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkRhc2hib2FyZCA9IERhc2hib2FyZCJdLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsInVzZUNhbGxiYWNrIiwiUmVhY3QiLCJjcmVhdGVDb250ZXh0IiwidXNlQ29udGV4dCIsImFwaSIsIkFwaUNsaWVudCIsInVzZVF1ZXJ5UGFyYW1zIiwidXNlTm90aWNlIiwidXNlRWZmZWN0IiwiUmVsYXRpb25Ob1JlY29yZHMiLCJ1c2VUcmFuc2xhdGlvbiIsIkluZm9Cb3giLCJUZXh0IiwiQWN0aW9uQnV0dG9uIiwiQnV0dG9uIiwiSWNvbiIsIlJlbGF0aW9uUmVjb3JkSW5MaXN0QWN0aW9ucyIsIkJveCIsIk1vZGFsIiwiUmVsYXRpb25SZWNvcmRJbkxpc3QiLCJUYWJsZVJvdyIsIlRhYmxlQ2VsbCIsIlBsYWNlaG9sZGVyIiwiQmFzZVByb3BlcnR5Q29tcG9uZW50IiwiUmVsYXRpb25SZWNvcmRzVGFibGUiLCJUYWJsZSIsIlJlY29yZHNUYWJsZUhlYWRlciIsIlRhYmxlQm9keSIsIk1lc3NhZ2VCb3giLCJTZWxlY3RBc3luYyIsIlJlbGF0aW9uUmVzb3VyY2VBY3Rpb25zIiwiQWRkSXRlbU1vZGFsQ29udGVudCIsInVzZU5hdmlnYXRlIiwidXNlTG9jYXRpb24iLCJWaWV3SGVscGVycyIsInVzZVNlbGVjdG9yIiwidXNlVGFicyIsIkxvYWRlciIsIk9uZVRvTWFueVJlbGF0aW9uUmVzb3VyY2VBY3Rpb25zIiwiT25lVG9NYW55UmVsYXRpb25SZWNvcmRzVGFibGUiLCJQYWdpbmF0aW9uIiwiTWFueVRvTWFueVJlbGF0aW9uUmVzb3VyY2VBY3Rpb25zIiwiTWFueVRvTWFueVJlbGF0aW9uUmVjb3Jkc1RhYmxlIiwiVGFicyIsIlRhYiIsIm1lbW8iLCJCYWRnZSIsIkltcG9ydENvbXBvbmVudCIsInJlc291cmNlIiwiZmlsZSIsInNldEZpbGUiLCJzZW5kTm90aWNlIiwiaXNGZXRjaGluZyIsInNldEZldGNoaW5nIiwib25VcGxvYWQiLCJ1cGxvYWRlZEZpbGUiLCJvblN1Ym1pdCIsImltcG9ydERhdGEiLCJGb3JtRGF0YSIsImFwcGVuZCIsIm5hbWUiLCJyZXNvdXJjZUFjdGlvbiIsIm1ldGhvZCIsInJlc291cmNlSWQiLCJpZCIsImFjdGlvbk5hbWUiLCJkYXRhIiwibWVzc2FnZSIsInR5cGUiLCJlIiwiY3JlYXRlRWxlbWVudCIsIm1hcmdpbiIsIm1heFdpZHRoIiwiZGlzcGxheSIsImp1c3RpZnlDb250ZW50IiwiZmxleERpcmVjdGlvbiIsIkRyb3Bab25lIiwiZmlsZXMiLCJvbkNoYW5nZSIsIm11bHRpcGxlIiwiRHJvcFpvbmVJdGVtIiwiZmlsZW5hbWUiLCJvblJlbW92ZSIsIm0iLCJvbkNsaWNrIiwiZGlzYWJsZWQiLCJ0aGlzIiwiZ2xvYmFsIiwiTUlMTElTRUNPTkRTX0lOX1dFRUsiLCJmb3JtYXR0ZXJzIiwibGlnaHRGb3JtYXR0ZXJzIiwibG9jYWxlIiwiZGVmYXVsdExvY2FsZSIsIm1pbWVUeXBlcyIsImpzb24iLCJjc3YiLCJ4bWwiLCJnZXRFeHBvcnRlZEZpbGVOYW1lIiwiZXh0ZW5zaW9uIiwiZm9ybWF0IiwiRGF0ZSIsIm5vdyIsIkV4cG9ydENvbXBvbmVudCIsImV4cG9ydERhdGEiLCJleHBvcnRlZERhdGEiLCJwYXJhbXMiLCJibG9iIiwiQmxvYiIsInNhdmVBcyIsInZhcmlhbnQiLCJFeHBvcnRlcnMiLCJtYXAiLCJwYXJzZXJUeXBlIiwia2V5IiwidG9VcHBlckNhc2UiLCJmbGF0IiwiRm9ybUdyb3VwIiwiTGFiZWwiLCJzdHlsZWQiLCJUYWJsZUhlYWQiLCJBZG1pblRhYmxlIiwiTGluayIsIk15SGVsbG9Db21wb25lbnQiLCJzdHlsZSIsInRleHRBbGlnbiIsInBhZGRpbmdUb3AiLCJmb250U2l6ZSIsIkFkbWluSlMiLCJVc2VyQ29tcG9uZW50cyIsIlJlbGF0aW9uc1Nob3dQcm9wZXJ0eUNvbXBvbmVudCIsIlJlbGF0aW9uc0VkaXRQcm9wZXJ0eUNvbXBvbmVudCIsIlJlbGF0aW9uc0xpc3RQcm9wZXJ0eUNvbXBvbmVudCIsIlVwbG9hZEVkaXRDb21wb25lbnQiLCJVcGxvYWRMaXN0Q29tcG9uZW50IiwiVXBsb2FkU2hvd0NvbXBvbmVudCIsIlJlY29yZERpZmZlcmVuY2UiLCJSZWNvcmRMaW5rIiwiRGFzaGJvYXJkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0lBQXFILE1BQU0sc0JBQXNCLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNBLGNBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNDLGlCQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxtQkFBbUJDLHNCQUFLLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFD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QUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLGdCQUFnQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsUUFBUSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxRQUFRLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLG1CQUFtQkgsc0JBQUssQ0FBQyxhQUFhLENBQUNnQixnQkFBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLGVBQWVoQixzQkFBSyxDQUFDLGFBQWEsQ0FBQ1ksb0JBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjWixzQkFBSyxDQUFDLGFBQWEsQ0FBQ2EsbUJBQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGNBQWNiLHNCQUFLLENBQUMsYUFBYSxDQUFDYyxpQkFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLGVBQWVkLHNCQUFLLENBQUMsYUFBYSxDQUFDQSxzQkFBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxlQUFlQSxzQkFBSyxDQUFDLGFBQWEsQ0FBQ2lCLGtCQUFLLENBQUMsQ0FBQyxDQUFDLGNBQWNqQixzQkFBSyxDQUFDLGFBQWEsQ0FBQ2EsbUJBQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBY2Isc0JBQUssQ0FBQyxhQUFhLENBQUNjLGlCQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7SUNBbC9ELE1BQU1JLHNCQUFvQixDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxtQkFBbUJsQixzQkFBSyxDQUFDLGFBQWEsQ0FBQ21CLHFCQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxjQUFjbkIsc0JBQUssQ0FBQyxhQUFhLENBQUNvQixzQkFBUyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxlQUFlcEIsc0JBQUssQ0FBQyxhQUFhLENBQUNvQixzQkFBUyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWNwQixzQkFBSyxDQUFDLGFBQWEsQ0FBQ3FCLHdCQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxjQUFjckIsc0JBQUssQ0FBQyxhQUFhLENBQUNzQiw2QkFBcUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBY3RCLHNCQUFLLENBQUMsYUFBYSxDQUFDb0Isc0JBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsY0FBY3BCLHNCQUFLLENBQUMsYUFBYSxDQUFDcUIsd0JBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGNBQWNyQixzQkFBSyxDQUFDLGFBQWEsQ0FBQ2UsNkJBQTJCLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7SUNBL3ZCLE1BQU1RLHNCQUFvQixDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUNsQixzQkFBYyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsbUJBQW1CTCxzQkFBSyxDQUFDLGFBQWEsQ0FBQ1EsbUJBQWlCLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxtQkFBbUJSLHNCQUFLLENBQUMsYUFBYSxDQUFDZ0IsZ0JBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsY0FBY2hCLHNCQUFLLENBQUMsYUFBYSxDQUFDd0Isa0JBQUssQ0FBQyxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjeEIsc0JBQUssQ0FBQyxhQUFhLENBQUN5QiwwQkFBa0IsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWN6QixzQkFBSyxDQUFDLGFBQWEsQ0FBQzBCLHNCQUFTLENBQUMsQ0FBQyxVQUFVLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsZUFBZTFCLHNCQUFLLENBQUMsYUFBYSxDQUFDa0Isc0JBQW9CLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7SUNBdDdCLE1BQU0sR0FBRyxDQUFDLElBQUlkLGlCQUFTLENBQVEsTUFBTSxZQUFZLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQ04sY0FBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDQSxjQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQ0EsY0FBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNBLGNBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDVyxzQkFBYyxFQUFFLENBQUNGLGVBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJSCxpQkFBUyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxtQkFBbUJKLHNCQUFLLENBQUMsYUFBYSxDQUFDZ0IsZ0JBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsZUFBZWhCLHNCQUFLLENBQUMsYUFBYSxDQUFDMkIsdUJBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxjQUFjM0Isc0JBQUssQ0FBQyxhQUFhLENBQUM0Qix3QkFBVyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYzVCLHNCQUFLLENBQUMsYUFBYSxDQUFDZ0IsZ0JBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsY0FBY2hCLHNCQUFLLENBQUMsYUFBYSxDQUFDYSxtQkFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsY0FBY2Isc0JBQUssQ0FBQyxhQUFhLENBQUNhLG1CQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLFNBQVMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOztJQ0FueUMsTUFBTWdCLHlCQUF1QixDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMvQixjQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUNXLHNCQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMs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QUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUNsQyxzQkFBYyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUNJLHNCQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUNWLGlCQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxjQUFjQyxzQkFBSyxDQUFDLGFBQWEsQ0FBQzBDLGlCQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsZUFBZTFDLHNCQUFLLENBQUMsYUFBYSxDQUFDMkMsZ0JBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjM0Msc0JBQUssQ0FBQyxhQUFhLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLGNBQWNBLHNCQUFLLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLHVDQUFjLGFBQWE0QyxVQUFJLENBQUMsOEJBQThCLENB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QUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxPQUFPLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLE9BQU8sSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBT0MsY0FBTSxFQUFFQSxjQUFNLENBQUMsTUFBTSxHQUFHQSxjQUFNLENBQUNBLGNBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLFFBQVEsRUFBRSxPQUFPLE1BQU0sRUFBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLFVBQVUsR0FBRyxpQkFBaUIsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsa0JBQWtCLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQywwQkFBMEIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENB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Q0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lB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QUFnQixHQUFHQSxtQkFBTXpILHNCQUFBLENBQUFxRSxhQUFBLENBQUEsR0FBQSxFQUFBO0lBQUdxRCxFQUFBQSxLQUFLLEVBQUU7SUFBQ0MsSUFBQUEsU0FBUyxFQUFDLFFBQVE7SUFBQ0MsSUFBQUEsVUFBVSxFQUFDLE9BQU87SUFBQ0MsSUFBQUEsUUFBUSxFQUFDLE1BQUE7SUFBTSxHQUFBO0lBQUUsQ0FBQSxFQUFDLHFCQUFzQixDQUFDOztJQ1B6SEMsT0FBTyxDQUFDQyxjQUFjLEdBQUcsRUFBRSxDQUFBO0lBRTNCRCxPQUFPLENBQUNDLGNBQWMsQ0FBQ0MsOEJBQThCLEdBQUdBLGdDQUE4QixDQUFBO0lBRXRGRixPQUFPLENBQUNDLGNBQWMsQ0FBQ0UsOEJBQThCLEdBQUdBLGdDQUE4QixDQUFBO0lBRXRGSCxPQUFPLENBQUNDLGNBQWMsQ0FBQ0csOEJBQThCLEdBQUdBLGdDQUE4QixDQUFBO0lBRXRGSixPQUFPLENBQUNDLGNBQWMsQ0FBQ2pGLGVBQWUsR0FBR0EsZUFBZSxDQUFBO0lBRXhEZ0YsT0FBTyxDQUFDQyxjQUFjLENBQUMxQixlQUFlLEdBQUdBLGVBQWUsQ0FBQTtJQUV4RHlCLE9BQU8sQ0FBQ0MsY0FBYyxDQUFDSSxtQkFBbUIsR0FBR0EsSUFBbUIsQ0FBQTtJQUVoRUwsT0FBTyxDQUFDQyxjQUFjLENBQUNLLG1CQUFtQixHQUFHQSxJQUFtQixDQUFBO0lBRWhFTixPQUFPLENBQUNDLGNBQWMsQ0FBQ00sbUJBQW1CLEdBQUdBLElBQW1CLENBQUE7SUFFaEVQLE9BQU8sQ0FBQ0MsY0FBYyxDQUFDTyxnQkFBZ0IsR0FBR0EsZ0JBQWdCLENBQUE7SUFFMURSLE9BQU8sQ0FBQ0MsY0FBYyxDQUFDUSxVQUFVLEdBQUdBLFVBQVUsQ0FBQTtJQUU5Q1QsT0FBTyxDQUFDQyxjQUFjLENBQUNTLFNBQVMsR0FBR0EsZ0JBQVM7Ozs7OzsiLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMCwxLDIsMyw0LDUsNiw3LDgsOSwxMCwxMSwxMiwxMywxNCwxNSwxNiwxNywxOCwxOSwyMCwyMSwyMiwyMywyNCwyNSwyNiwyNywyOCwyOSwzMCwzMSwzMiwzMywzNCwzNSwzNiwzNywzOCwzOSw0MCw0MSw0Miw0Myw0NCw0NSw0Niw0Nyw0OCw0OSw1MCw1MSw1Miw1Myw1NCw1NSw1Niw1Nyw1OCw1OSw2MCw2MSw2Miw2Myw2NCw2NSw2Nl19
