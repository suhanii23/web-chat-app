import { useEffect, useState, useContext } from "react";
import { Box, styled, Divider } from "@mui/material";
import { getUsers } from "../../../service/api";
import Conversation from "./Conversation";
import { AccountContext } from "../../../context/AccountProvider";

const Component = styled(Box)`
    overflow: overlay;
    height: 81vh;
`;



const Conversations = ({text}) => {

    const [users, setUsers] = useState([]);

    const {account} = useContext(AccountContext);

    useEffect(() => {

        const fetchData = async () => {
            let response = await getUsers();
            const filteredData = response.filter(user => user.name.toLowerCase().includes(text.toLowerCase()))
            setUsers(filteredData);
        }
        fetchData();
    }, [text]);


    return (
        <Component>
        {
            users.map(user => (
                user.sub !== account.sub &&
                <>
                    <Conversation user = {user}/>
                    <Divider />
                </>
                
            ))
        }
        </Component>
    )
}

export default Conversations;