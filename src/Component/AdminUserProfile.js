import React, { useState, useEffect } from 'react';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper, 
    Button 
} from '@material-ui/core';

function AdminUserProfile() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUserList();
    }, []);

    function getUserList() {
        try {
            fetch('https://localhost:7131/api/Signup/GetSignup', {
                headers: {
                    // 'Authorization': `Bearer ${token}`,
                    // 'Content-Type': 'application/json'
                },
            })
            .then((response) => response.json())
            .then((data) => {
                setUsers(data);
            })
            .catch((error) => {
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h2 className="text-center mt-5">User Profile</h2>
            <TableContainer component={Paper}>
                <Table aria-label="user table">
                    <TableHead>
                        <TableRow>
                        <TableCell>Sr No</TableCell>
                            <TableCell>User ID</TableCell>
                            <TableCell>User Name</TableCell>
                            <TableCell>User Email</TableCell>
                            <TableCell>User Mobile</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user,index) => (
                            <TableRow key={user.signupid}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{user.signupid}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.mobile}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default AdminUserProfile;
