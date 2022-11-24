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
              console.log('result',result.data.content)
              alert('done')
              await dispatch(ProjectCategoryAction.GetProjectAllAction())
              // history.push('/projectmanagement')
            }
        }catch(error){
          console.log('error',error.response.data)
          alert('Tạo mới thất bại :(')
        }
    }
  },
  DeleteProjectAction:(id)=>{
    return async(dispatch)=>{
      try{
        const result=await quanLyProjectService.deleteProject(id)
        if(result.data.statusCode===200){
          console.log('result',result.data.content)
          notifiFunction('success','DeleteProject is success!','')
          await dispatch(ProjectCategoryAction.GetProjectAllAction())
          // history.push('/projectmanagement')
        }
      }catch(error){
        notifiFunction('error','DeleteProject is not success!','')
        console.log('error',error.response.data)
      }
    }
  },
  AssignUserProjectAction:(user)=>{
    return async(dispatch)=>{
      try{
        const result=await quanLyNguoiDungService.assignUserProject(user)
        if(result.data.statusCode===200){
          console.log('result',result.data.content)
          notifiFunction('success','AssignUserProject is success!','')
          await dispatch(ProjectCategoryAction.GetProjectAllAction())
          // history.push('/projectmanagement')
        }
      }catch(err){
        console.log(err.response.data)
      }
    }
  }
}