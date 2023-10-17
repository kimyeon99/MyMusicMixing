import { Box, Button, Center, Heading, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

import { useNavigate } from 'react-router-dom';
import { useAuth } from "../components/customs/useAuth";
import authAxios from "../components/customs/authAxios";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/user', {
                username: username,
                password: password
            });
            console.log('머야');
        } catch (error) {
            // 에러 처리
        }
    };


    async function handleLogin(e) {
        e.preventDefault();
        try {
            const response = await authAxios.post('http://localhost:4000/auth/login', {
                username: username,
                password: password
            });
            // 로그인 추가하고 싶은 곳
            login(response.data); // 로그인 정보 전달
            navigate('/'); // '/' 경로로 이동
        } catch (error) {
            console.log('Login Error', error);
            setLoginError('로그인에 실패했습니다'); // 로그인 실패 시 메시지 설정
            const formBox = document.querySelector(".form-box");
            formBox.classList.add("shake");
            setTimeout(() => {
                formBox.classList.remove("shake");
            }, 1000);
        }
    }

    return (
        <Center>
            <Box className="form-box" width="300px">
                <Heading as="h1" size="xl" color="teal.00" mb="3">로그인해주세요</Heading>
                <p>UserName</p>
                <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <p>Password</p>
                <Input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Box h="40px">
                    {loginError && <Text fontSize="md" color="red.500" pt="2">{loginError}</Text>}
                </Box>
                <Box>
                    <Button onClick={handleLogin}>Login</Button>
                    <Button onClick={handleSubmit}>Create Acount</Button>
                </Box>
            </Box>
        </Center>
    );
};

export default Login;
