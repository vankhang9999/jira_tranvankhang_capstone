import { history } from "../../App"
import { quanLyProjectService } from "../../services/quanLyProjectService"
import { notifiFunction } from "../../util/settings/Notification/nontificationCyber"
import { CREATEPROJECTJIRA, GET_ALL_PROJECT, GET_ALL_TASK, GET_PROJECTCATEGORY_ALL, GET_USER_BYID } from "../types"

export const ProjectCategoryAction={
  getProjectCategoryAction:()=>{
    return async (dispatch)=>{
    try{
      const result = await quanLyProjectService.getProjectAll()
      if(result.data.statusCode===200){
        notifiFunction('success','Get ProjectAll success!','')
        dispatch({
          type:GET_PROJECTCATEGORY_ALL,
          payload:result.data.content
        })
      }

    }catch(err){
      notifiFunction('error','Get ProjectAll Not success!','')
    }
    }
  },
  createProjectJiraAction:(createProjectData)=>{
    return async(dispatch)=>{
      try{
        const result= await quanLyProjectService.CreateProjectJira(createProjectData)
        if(result.data.statusCode===200){
          notifiFunction('success','Create Project success!','')
          dispatch({
            type:CREATEPROJECTJIRA,
            payload:result.data.content
          })
          history.push('/projectmanagement')
        }
      }catch(error){
        notifiFunction('error','Create Project Not success!','')
      }
    }
  },
  GetProjectAllAction:()=>{
    return async(dispatch)=>{
      try{
        const result=await quanLyProjectService.getAllProject()
        if(result.data.statusCode===200){
          notifiFunction('success','Get AllProject success!','')
          dispatch({
            type:GET_ALL_PROJECT,
            payload:result.data.content
          });
        }
      }catch(error){
        notifiFunction('error','Get AllProject Not success!','')
      }
    }
  }
}