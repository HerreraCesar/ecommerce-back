import {
    cartsDao as carts,
    ordersDao as orders,
    usersDao as users,
} from "../persistence/index.js";

import uniqid from "uniqid";

const getMessages = async (req, res) => {
    let user = await users.getByEmail(req.user.email);
    res.render("support", {user})
}

const postMessage = () => {
    
}

export {
    getMessages,
    postMessage
};