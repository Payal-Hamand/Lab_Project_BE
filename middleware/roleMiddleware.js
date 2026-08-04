const authorizeRoles =
  (...roles) => {

    return (req, res, next) => {

      // Safety check

      if (!req.user) {

        return res.status(401).json({

          message:
            'Unauthorized'

        })
      }

      if (
        !roles.includes(
          req.user.role
        )
      ) {
        console.log(
          `Access Denied: User role ${req.user.role} is not authorized to access this route.`
        )

        return res.status(403).json({

          message:
            'Access Denied'

        })
      }

      next()
    }
  }

export default authorizeRoles