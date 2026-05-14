import jwt from 'jsonwebtoken'

const protect = async (req, res, next) => {
  let token

  token = req.headers.authorization

  if (!token) {
    return res.status(401).json({
      message: 'No Token',
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = decoded.id

    next()
  } catch (error) {
    res.status(401).json({
      message: 'Invalid Token',
    })
  }
}

export default protect