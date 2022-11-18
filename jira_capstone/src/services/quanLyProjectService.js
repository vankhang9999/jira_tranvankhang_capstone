import { api } from "../constants/api"

export const quanLyProjectService={
  getProjectAll:()=>{
    return api.get(`ProjectCategory`)
  },
  CreateProjectJira:(projectData)=>{
    return api.post(`Project/createProject`,projectData)
  },
  getAllProject:()=>{
    return api.get(`Project/getAllProject`)
  }
}