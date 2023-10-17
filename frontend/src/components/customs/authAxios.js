import axios from "axios";

const authAxios = axios.create({
  // baseURL: 'http://localhost:8000',
  withCredentials: true, // withCredentials 설정 추가
  // headers: {
  //   "Content-Type": "application/json", // 필요한 헤더 추가
  //   "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImEiLCJzdWIiOjksImlhdCI6MTY5Mjc2ODY4OCwiZXhwIjoxNjkyNzcyMjg4fQ.dQtppO832CcA4n7dKNpIfPzZJLFrVwHoiwjVm5TEe8k"
  // },
});

export default authAxios;
