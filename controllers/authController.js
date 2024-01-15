const { controllerWrapper } = require("../helpers")
const Users = require("../models/users")

const register = async (req, res) => {
  const createdUser = await Users.create(req.body)
  res.status(201).json(createdUser);
}

const login = async (req, res) => { 
  const w = await Users.call(req.body)
  res.json(w)
}

const logout = async (req, res) => { }

module.exports = {
  register: controllerWrapper(register),
  login: controllerWrapper(login),
  logout: controllerWrapper(logout)
}