import React from 'react'

// URL: http://localhost:3000/admin/api/resources/supplier/actions/search/alice?searchProperty=name
// const callApi = () => api.searchRecords({resourceId:'supplier',searchProperty:'name',query:'alice'}).then((res) => console.log('callapi',res))
// searchRecords has 50 limit returned records defined by Prisma take argumnet, USE resourceAction instead to specify take argument as aaxiosParams
// const callApi = () => api.searchRecords({resourceId:'supplier',searchProperty:'id',query:JSON.stringify({gt:10})}).then((res) => console.log('return value is array',res))

const MyHelloComponent = () => <p style={{textAlign:'center',paddingTop:'30rem',fontSize:'5rem'}}>Hello Administrator</p>

export default MyHelloComponent