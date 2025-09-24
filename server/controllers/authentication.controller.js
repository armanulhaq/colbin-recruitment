const registerController = (req, res) => {
    console.log(req.body);
    res.send("Register Successful");
};

const loginController = (req, res) => {
    console.log(req.body);
    res.send("Login Successful");
};

export { registerController, loginController };
