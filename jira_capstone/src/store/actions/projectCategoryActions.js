import { history } from "../../App"
import { quanLyProjectService } from "../../services/quanLyProjectService"
import { CREATEPROJECTJIRA, GET_ALL_PROJECT, GET_PROJECTCATEGORY_ALL } from "../types"

export const ProjectCategoryAction={
  getProjectCategoryAction:()=>{
    return async (dispatch)=>{
    try{
      const result = await quanLyProjectService.getProjectAll()
      if(result.data.statusCode===200){
        console.log('projectAll',result.data.content)
        dispatch({
          type:GET_PROJECTCATEGORY_ALL,
          payload:result.data.content
        })
      }

    }catch(err){
      console('err',err.response.data)
    }
    }
  },
  createProjectJiraAction:(createProjectData)=>{
    return async(dispatch)=>{
      try{
        const result= await quanLyProjectService.CreateProjectJira(createProjectData)
        if(result.data.statusCode===200){
          console.log('create',result.data.content)
          alert('Tạo mới thành công :)')
          dispatch({
            type:CREATEPROJECTJIRA,
            payload:result.data.content
          })
          history.push('/projectmanagement')
        }
      }catch(error){
        console.log('error',error.response.data)
        alert('Tạo mới thất bại :(')
      }
    }
  },
  GetProjectAllAction:()=>{
    return async(dispatch)=>{
      try{
        const result=await quanLyProjectService.getAllProject()
        if(result.data.statusCode===200){
          console.log('create',result.data.content)
          dispatch({
            type:GET_ALL_PROJECT,
            payload:result.data.content
          })
        }
      }catch(error){
        console.log('error',error.response.data)
        alert('Get all fail :(')
      }
    }
  }
}