import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import PageLeft from './componenet/RightLeft/PageLeft';
import PageRight from './componenet/RightLeft/PageRight';

import Register from './pages/LoginRegister/Register';
import Login from './pages/LoginRegister/Login';

function App() {

	const [checkWho, setCheckWho] = useState();

	useEffect(() => {
		check_Who();
	}, []);

	const check_Who = async () => {
		const token = Cookies.get("auth_token");
		if (token) {
			 const result = fetch("http://localhost:5000/auth/checkWho", {
				method: 'GET',
				headers: {
				  'Content-Type': 'application/json',
				},
				body: JSON.stringify(token),
			  })
			console.log(result);
		} else {
			Cookies.remove("auth_token");
		}
	}


	return (
		<div className='app'>
			{
				checkWho
					?
					<BrowserRouter>
						
					</BrowserRouter>
					:
					<BrowserRouter>
						<Routes>
							<Route path='/' element={<Login  />} />
							<Route path='/Register' element={<Register />} />
						</Routes>
					</BrowserRouter>
			}
		</div>
	);
}

export default App;
