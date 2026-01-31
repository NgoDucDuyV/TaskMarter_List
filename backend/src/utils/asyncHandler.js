export const asyncHandler = (fn) => {
    return async (req, res, next) => {
      try {
        const data = await fn(req, res, next);
        if (data !== undefined && !res.headersSent) {
          res.json(data);
        }
      } catch (error) {
        res.status(400).json({
          message: `${error.message}`,
        });
      }
    };
  };
  