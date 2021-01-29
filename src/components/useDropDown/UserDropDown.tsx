import { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import UserService from '../../services/UserService'
import '../useDropDown/UserDropDown.css'


const userService = UserService();

const UserDropDown = () => {

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState({
        firstName: '',
        lastName: '',
        id: 0,
        email: '',
        password: '',
        username: '',
        userRole: '',
        tasks: {}
    })

    useEffect(() => {
        getAllUsers();
    }, [])

    const getAllUsers = () => {
        userService.getAllUsers().then((response) => {
            if(response && response.data){
                console.log(response.data)
                setUsers(response.data)
            }
        })
    }

    const handleSelect = (eventkey, event) => {
        event.persist();
        setSelectedUser(users[event.target.id])
    }

    const createFirstLastName = (firstName, lastName): String => {
        return `${firstName} ${lastName}`
    }

    return (
        <div className="dropDownButton">
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {selectedUser.firstName !== '' ? createFirstLastName(selectedUser.firstName, selectedUser.lastName) : 'Select A User'}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {users.map((user, index) => 
                        <Dropdown.Item key={user.id} value={index} id={index} onSelect={handleSelect}>{createFirstLastName(user.firstName, user.lastName)}</Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown>
        </div>

    )


}

export default UserDropDown;