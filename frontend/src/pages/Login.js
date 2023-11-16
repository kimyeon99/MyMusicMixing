import { Box, Button, Center, Heading, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import '../css/Error.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../components/customs/useAuth";
import authAxios from "../components/customs/authAxios";
import styled from "@emotion/styled";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:4000/user', {
                username: username,
                password: password
            });
            setLoginError('Success !');
            const formBox = document.querySelector(".form-box");
            formBox.classList.add("shake");
            setTimeout(() => {
                formBox.classList.remove("shake");
            }, 1000);
        } catch (error) {
            if(error.response){
                setLoginError(error.response.data.message);
            } else if(error.request){
                setLoginError('서버로부터 응답이 없습니다.'); // 로그인 실패 시 메시지 설정
            } else{
                setLoginError('알 수 없는 오류가 발생하였습니다. 다시 시도해주세요.');
            }
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await authAxios.post('http://localhost:4000/auth/login', {
                username: username,
                password: password
            });
            login(response.data); // 로그인 정보 전달
            navigate('/'); // '/' 경로로 이동
        } catch (error) {
            if(error.response){
                setLoginError(error.response.data.message);
            } else if(error.request){
                setLoginError('서버로부터 응답이 없습니다.'); // 로그인 실패 시 메시지 설정
            } else{
                setLoginError('알 수 없는 오류가 발생하였습니다. 다시 시도해주세요.');
            }
            const formBox = document.querySelector(".form-box");
            formBox.classList.add("shake");
            setTimeout(() => {
                formBox.classList.remove("shake");
            }, 1000);
        }
    }

    return (
        <Center ml='auto' mr='auto' h="100vh" w="100%"
                style={{
                    background:
                        `-webkit-gradient(linear,left top,left bottom,from(transparent),to(rgba(0,0,0,.95))), #323232`
                }}>
            <Box className="form-box font_white" width="300px">
                <Center><Heading as="h1" size="xl" color="teal.00" mb="3">ログイン</Heading></Center>
                <p>UserName</p>
                <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <p>Password</p>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Center>
                    <Box h="40px">
                        {loginError && <Text fontSize="md" color="red.500" pt="2">{loginError}</Text>}
                    </Box>
                </Center>
                <Center gap={5}>
                    <Button onClick={handleLogin}>Login</Button>
                    <Button onClick={handleSubmit}>Create Acount</Button>
                </Center>
            </Box>
        </Center>

    );
};

export default Login;
