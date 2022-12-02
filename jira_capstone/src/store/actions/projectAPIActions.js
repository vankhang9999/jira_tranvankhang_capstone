import { history } from "../../App"
import { quanLyNguoiDungService } from "../../services/quanLyNguoidungService"
import { quanLyProjectService } from "../../services/quanLyProjectService"
import { notifiFunction } from "../../util/settings/Notification/nontificationCyber"
import { ProjectCategoryAction } from "./projectCategoryActions"

export const ProjectAPIAction={
  UpdateProjectAction:(DataUpdate,DataUpdateId)=>{
      return async(dispatch)=>{
        try{  
            const result = await quanLyProjectService.updateProject(DataUpdate,DataUpdateId)
            if(result.data.statusCode===200){
              notifiFunction('success','Update Project Not success!','')
              await dispatch(ProjectCategoryAction.GetProjectAllAction())
              // history.push('/projectmanagement')
            }
        }catch(error){
          notifiFunction('error','Update Project Not success!','')
        }
    }
  },
  DeleteProjectAction:(id)=>{
    return async(dispatch)=>{
      try{
        const result=await quanLyProjectService.deleteProject(id)
        if(result.data.statusCode===200){
          notifiFunction('success','DeleteProject is success!','')
          await dispatch(ProjectCategoryAction.GetProjectAllAction())
          // history.push('/projectmanagement')
        }
      }catch(error){
        notifiFunction('error','DeleteProject is not success!','')
      }
    }
  },
  AssignUserProjectAction:(user)=>{
    return async(dispatch)=>{
      try{
        const result=await quanLyNguoiDungService.assignUserProject(user)
        if(result.data.statusCode===200){
          notifiFunction('success','AssignUserProject is success!','')
          await dispatch(ProjectCategoryAction.GetProjectAllAction())
          // history.push('/projectmanagement')
        }
      }catch(err){
        notifiFunction('error','AssignUserProject Not success!','')
      }
    }
  },
  RemoveUserFromProject:(user)=>{
    return async(dispatch)=>{
      try{
        const result=await quanLyNguoiDungService.removeUserFromProject(user)
        if(result.data.statusCode===200){
          console.log('result',result.data.content)
          notifiFunction('success','RemoveUserFromProject is success!','')
          await dispatch(ProjectCategoryAction.GetProjectAllAction())
          // history.push('/projectmanagement')
        }
      }catch(err){
        notifiFunction('error','RemoveUserFromProject is Not success!','')
      }
    }
  }
}